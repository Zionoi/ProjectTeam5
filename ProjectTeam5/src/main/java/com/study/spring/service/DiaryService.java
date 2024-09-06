package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Diary;
import com.study.spring.repository.DiaryRepository;
import com.study.spring.repository.MemberRepository;

@Service
public class DiaryService {
	@Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private MemberRepository memberRepository; // Add this field

    public List<Diary> getAllEvents() {
        return diaryRepository.findAll();
    }

    public Diary createEvent(Diary event) {
        return diaryRepository.save(event);
    }

    public void deleteEvent(Long dNum) {
        diaryRepository.deleteById(dNum);
    }

    public Optional<Diary> getById(Long dNum) {
        return diaryRepository.findById(dNum);
    }

    public Diary getDiaryBydNum(Long dNum) {
        // Find Member by memId
//        Optional<Member> member = memberRepository.findById(memId);
//        if (member.isPresent()) {
            // Use the Member object to find the Diary
            return diaryRepository.findBydNum(dNum).orElse(null);
//        }
//        return null;
    }
}
