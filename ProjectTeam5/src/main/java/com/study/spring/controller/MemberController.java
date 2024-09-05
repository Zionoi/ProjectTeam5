package com.study.spring.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.study.spring.domain.Member;
import com.study.spring.repository.MemberRepository;
import com.study.spring.service.MemberService;
import com.study.spring.util.JwtUtil;

@RestController
@CrossOrigin(origins = "http://localhost:3003") // CORS 설정
@RequestMapping("/member")
public class MemberController {
	
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
    private MemberRepository memberRepository;
	
   @PostMapping("/signup")
    public String signup(@RequestBody Member member, @RequestParam(value = "image", required = false) MultipartFile img) throws Exception {
	   
	    // 이미지가 있으면 처리, 없으면 그냥 넘어감
	    if (img != null && !img.isEmpty()) {
	    	memberService.insertMember(member, img);
	    } else {
	    	 memberService.insertMember(member);   // 이미지가 없는 경우
	    }
        
        return "User registered successfully"; // 등록 성공 메시지
    }

    @PostMapping("/login")
    public List<Object> login(@RequestBody Member loginRequest) {
    	
        Optional<Member> member = memberRepository.findById(loginRequest.getMemId()); // 사용자 조회
        System.out.println("loginRequest :" + loginRequest);
        
        if (member.isPresent() && member.get().getPass().equals(loginRequest.getPass())) {
            List<Object> list = new ArrayList<>();  // ArrayList로 초기화
            
            // JwtUtil을 사용하여 JWT 생성
            String token = JwtUtil.generateToken(member.get().getMemId());
            System.out.println("token :" + token);
            
            // 리스트에 토큰과 아이디를 추가
            list.add(token);
            list.add(member.get().getMemId());
            
            return list; // JWT와 아이디가 담긴 리스트 반환
        }
        
        return Collections.singletonList("Invalid credentials"); // 잘못된 인증 정보
    }	

    
    @GetMapping("/search")
    public List<Member> searchMembers(@RequestParam("keyword") String keyword) {
        return memberService.searchMembersByNickname(keyword);
    }

}
