package com.study.spring.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.study.spring.domain.Board;
import com.study.spring.domain.Member;
import com.study.spring.repository.BoardRepository;
import com.study.spring.repository.MemberRepository;

@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;
    
    @Autowired
    private MemberRepository memberRepository;

    private final String uploadDir = System.getProperty("user.dir") + "/uploadedFiles";

    //사진이 있는 경우
    public void write(Board board, MultipartFile[] img, String memId) throws Exception {
    	Member member = memberRepository.findById(memId).get();
    	board.setMember(member);
    	
        // 파일 저장 경로 설정
        File dir = new File(uploadDir);
        List<String> path = new ArrayList<String>();
        List<String> name = new ArrayList<String>();
        if (!dir.exists()) {
            dir.mkdirs();  // 디렉토리가 없으면 생성
        }
        for(int i=0 ; i<img.length;i++) {
	        String fileName = UUID.randomUUID().toString() + "_" + img[i].getOriginalFilename();
	        File saveFile = new File(dir, fileName);
	        img[i].transferTo(saveFile);
	        path.add("/files/" + fileName);
	        name.add(fileName);
	        // 파일 경로 저장
	        System.out.println("보드서비스 여러장 업로드 board : " + img[i]+board);
        }
//        board.setImgName(fileName);
//        board.setImgPath("/files/" + fileName);
        board.setImgName(name);
        board.setImgPath(path);
        boardRepository.save(board);
    }
    
    //이미지가 없는 경우
    public void write(Board board, String memId) {
    	Member member = memberRepository.findById(memId).get();
    	board.setMember(member);
        boardRepository.save(board);
    }

    public List<Board> totalBoard(String memId) {
    	Member member = memberRepository.findById(memId).get();
        return boardRepository.findByMember(member);
    }

	public Optional<Board> detailBoard(Long bNum) {
		
		return boardRepository.findById(bNum);
		
	}
	
	public void deleteBoard(Long bnum) {
		boardRepository.deleteById(bnum);
		
	}

	//이미지가 없는 경우 수정
	public void updateBoard(Board board) {
		Board beforeBoard = boardRepository.findById(board.getBNum()).get();
		
		beforeBoard.setBTitle(board.getBTitle());
		beforeBoard.setBContent(board.getBContent());
		beforeBoard.setImgName(board.getImgName());
		beforeBoard.setImgPath(board.getImgPath());
		
		boardRepository.save(beforeBoard);
		
		
	}
	
	//이미지가 있는 경우 수정
	public void updateBoard(Board board, MultipartFile[] images) throws Exception {
	    Board beforeBoard = boardRepository.findById(board.getBNum()).get();

	    // 기존 데이터를 업데이트
	    beforeBoard.setBTitle(board.getBTitle());
	    beforeBoard.setBContent(board.getBContent());

	    // 이미지가 있으면 새 이미지 저장
	    if (images != null && images.length > 0) {
	        File dir = new File(uploadDir);
	        List<String> path = new ArrayList<>();
	        List<String> name = new ArrayList<>();
	        
	        if (!dir.exists()) {
	            dir.mkdirs();  // 디렉토리가 없으면 생성
	        }
	        
	        // 새 이미지 저장 및 경로 저장
	        for (MultipartFile image : images) {
	            String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
	            File saveFile = new File(dir, fileName);
	            image.transferTo(saveFile);
	            path.add("/files/" + fileName);
	            name.add(fileName);
	        }
	        
	        // 기존 이미지 대체 (기존 이미지를 덮어씌움)
	        beforeBoard.setImgName(name);
	        beforeBoard.setImgPath(path);
	    }

	    boardRepository.save(beforeBoard);
	}
	
}
