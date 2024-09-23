package com.study.spring.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.study.spring.domain.Member;
import com.study.spring.repository.MemberRepository;

@Service
public class MemberService {
	@Autowired
	private MemberRepository memberRepository;
	
	private final String uploadDir = System.getProperty("user.dir") + "/uploadedFiles";

	//사진이 없는 경우 저장
	public void insertMember(Member member) {
		memberRepository.save(member);
	}

	//사진이 있는 경우
	public void insertMember(Member member, MultipartFile img) throws Exception{
        // 파일 저장 경로 설정
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();  // 디렉토리가 없으면 생성
        }

        String fileName = UUID.randomUUID().toString() + "_" + img.getOriginalFilename();
        File saveFile = new File(dir, fileName);
        img.transferTo(saveFile);

        // 파일 경로 저장
        member.setImgName(fileName);
        member.setImgPath("/files/" + fileName);

        memberRepository.save(member);
		
	}
	
    public List<Member> searchMembersByNickname(String keyword) {
        return memberRepository.findByNicknameContaining(keyword);
    }
    
    // 프로필 이미지를 저장하고 DB에 이미지 경로 업데이트
    public void saveProfileImage(String memId, MultipartFile profileImage, String comment) throws Exception {
        String fileName = UUID.randomUUID().toString() + "_" + profileImage.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + File.separator + fileName);

        
        // 기존 이미지 파일 삭제 로직 (이미지가 존재할 경우)
        Optional<Member> memberOptional = memberRepository.findById(memId);
        
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setComments(comment);
            if (member.getImgPath() != null) {
            	File oldFile = new File(uploadDir + File.separator + member.getImgName());
                if (oldFile.exists()) {
                    oldFile.delete(); // 기존 파일 삭제
                }
            }

            // 새 파일 저장
            Files.copy(profileImage.getInputStream(), filePath);

            // DB에 새 이미지 경로 업데이트
            member.setImgName(fileName);
            member.setImgPath("/files/" + fileName);
            memberRepository.save(member);
        } else {
            throw new IllegalArgumentException("해당 사용자를 찾을 수 없습니다.");
        }
    }

    //프로필 사진을 업로드하지 않고 코멘트만 변경
    public void updateComment(String memId, String comment) {
        Optional<Member> memberOptional = memberRepository.findById(memId);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setComments(comment);  // 코멘트 업데이트
            memberRepository.save(member);  // DB에 저장
        } else {
            throw new IllegalArgumentException("해당 사용자를 찾을 수 없습니다.");
        }
    }
    
    //memId로 맴버 객체를 찾는 서비스
    public Member getMemberById(String memId) {
        return memberRepository.findById(memId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));
    }

	public void updateGreeting(String memId, String greeting) {
		Member beforeMember = memberRepository.findById(memId).get();
		
		beforeMember.setGreeting(greeting);
		
		memberRepository.save(beforeMember);
		
	}

	public boolean checkId(String userId) {
		Optional<Member> member = memberRepository.findById(userId);
		if(member.isPresent())
			return true;
		else
			return false;
		
	}
	
	 // 방문자 수 업데이트
    public void updateMember(Member member) {
        memberRepository.save(member);  // 변경된 값을 저장
    }
    
    

	    
	// 친구 요청시 아이디 존재여부 
	public boolean checkIfMemberExists(String memId) {
	    return memberRepository.existsByMemId(memId);
	}
    //일일방문자 초기화
    public void resetDailyVisits() {
        // 모든 회원의 todayVisit을 0으로 초기화
        List<Member> allMembers = memberRepository.findAll();
        for (Member member : allMembers) {
            member.setTodayVisit(0L);
            memberRepository.save(member);  // 변경된 정보 저장
        }
    }
    
	public Member findId(String name, String birthday, String phone) {
		return memberRepository.findByNameAndBirthdayAndPhone(name, birthday, phone).get(0);
			
	}

	public boolean findPassword(String userId, String name, String birthday, String phone) {
		
		List<Member> list = memberRepository.findByMemIdAndNameAndBirthdayAndPhone(userId, name, birthday, phone);
		
		if(list.size() > 0)
			return true;
		else
			return false;
	}

	public boolean resetPassword(String memId, String pass) {
		
		Member member = memberRepository.findById(memId).get();
		member.setPass(pass);
		if(memberRepository.save(member) != null)
			return true;
		else 
			return false;

	}

	public void deleteImage(String memId) {
	    Member member = memberRepository.findById(memId).orElseThrow(() -> new IllegalArgumentException("Member not found"));

	    // imgPath에서 파일 경로 가져오기
	    String imgPath = member.getImgPath();
	    
	    // 이미지 경로가 존재할 경우
	    if (imgPath != null && !imgPath.isEmpty()) {
	        // 업로드된 파일의 실제 경로 (uploadedFiles/ 폴더 경로로 변환)
	        String realPath = System.getProperty("user.dir") + "/uploadedFiles" + imgPath.replace("/files/", "/");
	        
	        File file = new File(realPath);
	        if (file.exists()) {
	            if (file.delete()) {
	            } 
	        } 
	    }

	    // DB의 이미지 정보 삭제
	    member.setImgName("");
	    member.setImgPath("");

	    // 변경 사항 저장
	    memberRepository.save(member);
	}

	public void updateProfile(Member m) {
		Member member = memberRepository.findById(m.getMemId()).get();
		
		member.setNickname(m.getNickname());
		member.setEmail(m.getEmail());
		member.setName(m.getName());
		member.setPass(m.getPass());
		member.setPhone(m.getPhone());
		member.setAddress(m.getAddress());
		
		memberRepository.save(member);
		
		
	}

}
