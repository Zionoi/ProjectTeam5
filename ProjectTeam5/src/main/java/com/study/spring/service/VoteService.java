package com.study.spring.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.spring.domain.Friends;
import com.study.spring.domain.Vote;
import com.study.spring.domain.WalkingCourse;
import com.study.spring.repository.FriendsRepository;
import com.study.spring.repository.VoteRepository;
import com.study.spring.repository.WalkingCourseRepository;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private WalkingCourseRepository walkingCourseRepository;

    @Autowired
    private FriendsRepository friendsRepository;  // 친구 리포지토리

    @Autowired
    private MessageService messageService;  // 쪽지 서비스

    // 투표 생성하기
    @Transactional
    public Vote createVote(Vote vote) {
        // 받은 데이터 확인을 위한 로그 출력
        System.out.println("서비스 레이어에서 받은 투표 데이터: " + vote);

        // 필수 필드에 대한 유효성 검사 추가
        if (vote.getVoteEsntlId() == null || vote.getVoteEsntlId().isEmpty()) {
            throw new IllegalArgumentException("산책 코스가 선택되지 않았습니다.");
        }

        if (vote.getParticipantIds() == null) {
            vote.setParticipantIds(new ArrayList<>());
        }

        // 중복 제거를 위한 Set 사용
        List<String> uniqueParticipantIds = vote.getParticipantIds().stream()
                .distinct()
                .collect(Collectors.toList());
        vote.setParticipantIds(uniqueParticipantIds);

        // 산책로 투표 수 초기화
        Map<String, Integer> walkingCourseVoteCounts = vote.getVoteEsntlId().stream()
                .collect(Collectors.toMap(courseId -> courseId, courseId -> 0));  // 투표 수를 0으로 초기화

        vote.setWalkingCourseVoteCounts(walkingCourseVoteCounts);  // 산책로별 투표 수 설정

        // 투표 저장
        Vote savedVote = voteRepository.save(vote);

        // 참여자들에게 메시지 전송
        sendVoteCreatedMessages(vote, savedVote.getVoteId());

        return savedVote; // 저장된 투표 객체 반환
    }


    // 투표 쪽지 보내기
    private void sendVoteCreatedMessages(Vote vote, Long voteId) {
        String voteUrl = "/votes/" + voteId + "/vote";
        String messageContent = String.format(
            "투표 '%s'이(가) 생성되었습니다. 마감기한은 %s입니다.\n 투표하러 가기: %s",
            vote.getVoteTitle(), vote.getEndTime(), voteUrl
        );

        // 모든 참여자에게 메시지 전송
        List<String> recipientIds = vote.isOpenToAllFriends() ? getAllFriendIds(vote.getMemId()) : vote.getParticipantIds();
        for (String recipientId : recipientIds) {
            messageService.sendMessage(vote.getMemId(), recipientId, messageContent);
        }
    }

    // 친구 목록을 가져오는 메서드 (status가 '친구'인 관계만 가져옴)
    private List<String> getAllFriendIds(String memId) {
        List<Friends> friends = friendsRepository.findByMemberMemIdAndStatus(memId, "친구");
        return friends.stream()
                      .map(Friends::getFriendId)
                      .collect(Collectors.toList());
    }

    // 모든 산책로 가져오기
    public List<WalkingCourse> getAllWalkingCourses() {
        return walkingCourseRepository.findAll();
    }

    // 모든 친구 가져오기
    public List<Friends> getAllFriends() {
        return friendsRepository.findAll();
    }

    // 모든 투표 조회
    public List<Vote> getAllVotes() {
        return voteRepository.findAll();
    }

    // 특정 투표 조회
    public Optional<Vote> getVoteById(Long voteId) {
        return voteRepository.findById(voteId);
    }

    // 투표 종료
    @Transactional
    public Vote endVote(Long voteId) {
        Optional<Vote> optionalVote = voteRepository.findById(voteId);
        if (optionalVote.isPresent()) {
            Vote vote = optionalVote.get();
            vote.setEnded(true);  // 투표 종료 상태로 변경
            return voteRepository.save(vote);
        }
        throw new RuntimeException("투표를 찾을 수 없습니다.");
    }

    // 투표하기
    @Transactional
    public Map<String, Integer> vote(Long voteId, String courseId, String userId) {
        // 1. 해당 투표 조회
        Optional<Vote> voteOptional = getVoteById(voteId);
        if (!voteOptional.isPresent()) {
            throw new RuntimeException("Vote not found");
        }
        Vote vote = voteOptional.get();

        // 2. 투표가 종료되었는지 체크
        if (vote.isEnded()) {
            throw new RuntimeException("Vote has ended");
        }

        // 3. 이미 투표했는지 체크 (중복 투표 방지)
        if (vote.getVotedUserIds().contains(userId)) { // votedUserIds를 확인
            throw new RuntimeException("User has already voted");
        }

        // 4. 투표 수 업데이트 로직
        Map<String, Integer> voteCount = vote.getWalkingCourseVoteCounts();
        if (voteCount.containsKey(courseId)) {
            voteCount.put(courseId, voteCount.get(courseId) + 1);  // 기존 카운트에 1 추가
        } else {
            voteCount.put(courseId, 1);  // 처음 투표 시 1로 설정
        }

        // 5. 투표한 사용자를 votedUserIds에 추가하여 중복 투표 방지
        vote.getVotedUserIds().add(userId);

        // 6. 투표 정보 저장
        voteRepository.save(vote);

        // 7. 변경된 투표 수를 반환
        return voteCount;
    }

    @Transactional(readOnly = true)
    public List<Vote> getListMyVote(String memId) {
        List<Vote> votes = voteRepository.findByMemIdAndIsEnded(memId, false);
        // Force initialization of participantIds collection
        votes.forEach(vote -> vote.getParticipantIds().size());
        return votes;
    }

    public List<Vote> getListEndedMyVote(String memId) {
        return voteRepository.findByMemIdAndIsEnded(memId, true);
    }

    public List<Vote> getListInvitedVote(String memId) {
        return voteRepository.findActiveInvitedVotes(memId, false);
    }

    public List<Vote> getListEndedInvitedVote(String memId) {
        return voteRepository.findActiveInvitedVotes(memId, true);
    }
}
