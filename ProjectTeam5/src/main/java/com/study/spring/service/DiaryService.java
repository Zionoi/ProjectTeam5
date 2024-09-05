package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Board;
import com.study.spring.domain.Diary;
import com.study.spring.repository.DiaryRepository;

@Service
public class DiaryService {
	@Autowired
	private DiaryRepository diaryRepository;

	public void write(Diary diary) {
		diaryRepository.save(diary);
	}

	public List<Diary> totalBoard() {
		return diaryRepository.findAll();
	}

	public Optional<Diary> detailDiary(Long dNum) {
		
		return diaryRepository.findById(dNum);
	}
	
}
