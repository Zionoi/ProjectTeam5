package com.study.spring.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.study.spring.domain.Member;
import com.study.spring.repository.MemberRepository;
import com.study.spring.service.MemberService;
import com.study.spring.util.JwtUtil;

//@CrossOrigin(origins = "http://localhost:3000") // CORS 설정
@RestController
@RequestMapping("/member")
public class MemberController {
	
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
    private MemberRepository memberRepository;
	
	
	//회원가입 떄 아이디가 이미 존재하는지 체크
	@GetMapping("/checkId")
	public boolean checkId(@RequestParam("userId") String userId) {
		
		
		if(memberService.checkId(userId))
			return true;
		else 
			return false;
	}
	 	
	@PostMapping("/signup")
	public String signup(
		    @RequestPart("member") Member member,  // 회원 정보를 JSON으로 받음
		    @RequestPart(value = "image", required = false) MultipartFile img  // 이미지 파일은 Multipart로 받음
		) throws Exception {
			member.setTodayVisit(0L);
			member.setTotalVisit(0L);
		    // 이미지가 있으면 처리, 없으면 그냥 넘어감
		    if (img != null && !img.isEmpty()) {
		        memberService.insertMember(member, img);
		    } else {
		        memberService.insertMember(member);   // 이미지가 없는 경우
		    }

		    return "성공하였습니다."; // 등록 성공 메시지
		}

    @PostMapping("/login")
    public List<String> login(@RequestBody Member loginRequest) {
    	
        Optional<Member> member = memberRepository.findById(loginRequest.getMemId()); // 사용자 조회
        System.out.println("loginRequest :" + loginRequest);
        
        if (member.isPresent() && member.get().getPass().equals(loginRequest.getPass())) {
            List<String> list = new ArrayList<>();  // ArrayList로 초기화
            
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
    
 // 프로필 사진 업로드 및 갱신
    @PostMapping("/upload")
    public String uploadProfileImage(
        @RequestParam(value = "profileImage", required = false) MultipartFile profileImage, // 이미지가 선택되지 않을 수 있으므로 required=false
        @RequestParam("memId") String memId,
        @RequestParam("comment") String comment
    ) {
        try {
            // 이미지가 있으면 처리하고, 없으면 코멘트만 업데이트
            if (profileImage != null && !profileImage.isEmpty()) {
                // 이미지가 있으면 이미지를 저장하고 코멘트도 업데이트
                memberService.saveProfileImage(memId, profileImage, comment);
            } else {
                // 이미지가 없을 때는 코멘트만 업데이트
                memberService.updateComment(memId, comment);
            }
            return "프로필 사진 및 코멘트가 성공적으로 변경되었습니다.";
        } catch (Exception e) {
            e.printStackTrace();
            return "프로필 사진 및 코멘트 수정 중 오류가 발생했습니다.";
        }
    }
    // 프로필 사진 업로드 및 갱신
    @DeleteMapping("/deleteImage")
    public String deleteImage(@RequestParam String memId) {
    	memberService.deleteImage(memId);
    	
    	return "프로필 이미지 삭제가 완료되었습니다.";
    	
    }
    

    // 사용자 정보 가져오기
    //const [memId, setMemId] = useState(localStorage.getItem('id'));
    @GetMapping("/get/{memId}")
    public Member getMember(@PathVariable String memId) {
        return memberService.getMemberById(memId);
    }
    
    // 인삿말을 수정하는 컨트롤러
    @PostMapping("/greeting")
    public String updateGreeting(@RequestParam("memId") String memId, @RequestParam("greeting") String greeting ) {
    	
    	memberService.updateGreeting(memId, greeting);
    	
    	return "인삿말 수정 완료";
    }
    
    //방문자 수 증가
    @GetMapping("/visitCountUp/{memId}")  // userId를 경로에서 받아옴
    public void visitCountUp(@PathVariable("memId") String memId) {
    	System.out.println("컨트롤러 비짓트 카운트업 memId: " + memId);
        // 회원 정보 가져오기
        Member member = memberService.getMemberById(memId);
        // todayVisit과 totalVisit 값 증가
        member.setTodayVisit(member.getTodayVisit() + 1);
        member.setTotalVisit(member.getTotalVisit() + 1);
        
        // 변경된 정보를 저장
        memberService.updateMember(member);
    }
    
 // 매일 자정에 실행 (cron 표현식: 초, 분, 시, 일, 월, 요일)
    @Scheduled(cron = "0 15 13 * * *")
    public void resetDailyVisits() {
        memberService.resetDailyVisits();
    }
    
    
    // 친구 아이디 존재 여부 확인 엔드포인트
    @GetMapping("/exists")
    public boolean checkMemberExists(@RequestParam String memId) {
        return memberService.checkIfMemberExists(memId);
    }

    //아이디를 찾는 컨트롤러
    @GetMapping("/findId")
    public Member findId(@RequestParam("name") String name,
    					 @RequestParam("birthday") String birthday,
    					 @RequestParam("phone") String phone) {
    	
    	Member member = memberService.findId(name, birthday, phone);
    	
    	return member;
    }
    //비밀번호를 찾는 컨트롤러
    @GetMapping("/findPassword")
    public boolean findPassword(@RequestParam("userId") String userId,
    							@RequestParam("name") String name,
    							@RequestParam("birthday") String birthday,
    							@RequestParam("phone") String phone) {
    	
    	if(memberService.findPassword(userId, name, birthday, phone))
    		return true;
    	else
    		return false;
    }
    //비밀번호 재설정
    @PostMapping("/resetPassword")
    public String resetPassword(@RequestParam("memId") String memId,
    							@RequestParam("pass") String pass) {
    	if(memberService.resetPassword(memId, pass))
    		return "success";
    	else
    		return "실패";
    }
    
    @PostMapping("/updateProfile")
    public String updateProfile(@RequestBody Member m) {
    	memberService.updateProfile(m);
    	
    	return "success";
    }
    
}
