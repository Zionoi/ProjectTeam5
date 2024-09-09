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
import com.study.spring.repository.BoardRepository;

@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;

    private final String uploadDir = System.getProperty("user.dir") + "/uploadedFiles";

    //사진이 있는 경우
    public void write(Board board, MultipartFile[] img) throws Exception {
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
    public void write(Board board) {

        boardRepository.save(board);
    }

    public List<Board> totalBoard() {
        return boardRepository.findAll();
    }

	public Optional<Board> detailBoard(Long bNum) {
		
		return boardRepository.findById(bNum);
		
	}
}
