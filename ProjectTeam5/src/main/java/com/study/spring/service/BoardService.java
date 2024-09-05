package com.study.spring.service;

import java.io.File;
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
    public void write(Board board, MultipartFile img) throws Exception {
        // 파일 저장 경로 설정
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();  // 디렉토리가 없으면 생성
        }

        String fileName = UUID.randomUUID().toString() + "_" + img.getOriginalFilename();
        File saveFile = new File(dir, fileName);
        img.transferTo(saveFile);

        // 파일 경로 저장
        board.setImgName(fileName);
        board.setImgPath("/files/" + fileName);

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
