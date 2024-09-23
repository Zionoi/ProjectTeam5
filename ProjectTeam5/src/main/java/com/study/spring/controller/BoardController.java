package com.study.spring.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.study.spring.domain.Board;
import com.study.spring.service.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController {
	@Autowired
	private BoardService boardService;
	
//	//board db에 한개 작성
//	@PostMapping("/write")
//	public String write(Board board, @RequestParam(value = "image", required = false) MultipartFile img) throws Exception {
//	    
//	    // 이미지가 있으면 처리, 없으면 그냥 넘어감
//	    if (img != null && !img.isEmpty()) {
//	        boardService.write(board, img);
//	    } else {
//	        boardService.write(board);  // 이미지가 없는 경우
//	    }
//	    
//		return "작성완료";
//	}
	//board db에 여러개 작성
	@PostMapping("/write")
	public String write(Board board, 
	                    @RequestParam(value = "image", required = false) MultipartFile[] img,
	                    @RequestParam("memId") String memId) throws Exception {
	    System.out.println("Received board: " + board.toString());
	    System.out.println("Received memId: " + memId);
	    System.out.println("Received images: " + Arrays.toString(img));
	    
	    // 이미지가 있으면 처리, 없으면 그냥 넘어감
	    if (img != null && img.length > 0) {
	        boardService.write(board, img, memId);
	    } else {
	        boardService.write(board, memId);  // 이미지가 없는 경우
	    }

	    return "작성완료";
	}

	
	//모든 board를 가져옴
	@GetMapping("/total")
	public List<Board> totalBoard(@RequestParam("memId") String memberId){
		System.out.println("보드컨트롤러 리스트 서비스시작전" );
		List<Board> list = boardService.totalBoard(memberId);
		System.out.println("보드컨트롤러 리스트 서비스실행 후: " + list);
		return list;
	}
	
	
	//특정 board 1개를 가져옴
	@GetMapping("/detail")
	public Board detailBoard(@RequestParam("bNum") Long bNum)
	{
		System.out.println("보드 디테일 가져오기 bnum : " + bNum);
		return boardService.detailBoard(bNum).get();
	}
	
	
	@DeleteMapping("/delete/{bnum}")
	public String deleteBoard(@PathVariable Long bnum) {
		boardService.deleteBoard(bnum);
	    return "게시물이 삭제되었습니다.";
	}
	
	@PostMapping("/update")
	public String updateBoard(
			@ModelAttribute Board board,  // Board 객체로 묶어서 받음
	        @RequestParam(value = "image", required = false) MultipartFile[] newImages,
	        @RequestParam(value = "existingImageName", required = false) String[] oldImagesName,
	        @RequestParam(value = "existingImagePath", required = false) String[] oldImagesPath) throws Exception {
		
		System.out.println("컨트롤러newImages보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드 :" + newImages);
		System.out.println("컨트롤러oldImagesname보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드 :" + oldImagesName);
		System.out.println("컨트롤러oldImagespath보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드보드 :" + oldImagesPath);


        boardService.updateBoard(board, newImages, oldImagesName, oldImagesPath);
	    

	    return "업데이트 완료";
	}
	
}
