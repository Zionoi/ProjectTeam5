package com.study.spring.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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

}
