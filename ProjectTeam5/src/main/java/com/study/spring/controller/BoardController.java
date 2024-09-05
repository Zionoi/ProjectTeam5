package com.study.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.study.spring.domain.Board;
import com.study.spring.service.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	//board db에 한개 작성
	@PostMapping("/write")
	public String write(Board board, @RequestParam(value = "image", required = false) MultipartFile img) throws Exception {
	    
	    // 이미지가 있으면 처리, 없으면 그냥 넘어감
	    if (img != null && !img.isEmpty()) {
	        boardService.write(board, img);
	    } else {
	        boardService.write(board);  // 이미지가 없는 경우
	    }
	    
		return "작성완료";
	}
	
	//모든 board를 가져옴
	@GetMapping("/total")
	public List<Board> totalBoard(){
		List<Board> list = boardService.totalBoard();
		return list;
	}
	
	
	//특정 board 1개를 가져옴
	@GetMapping("/detail")
	public Board detailBoard(@RequestParam("bnum") Long bNum)
	{
		return boardService.detailBoard(bNum).get();
	}
}
