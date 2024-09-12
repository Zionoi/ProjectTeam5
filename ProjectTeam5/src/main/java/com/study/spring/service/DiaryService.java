package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Diary;
import com.study.spring.domain.Member;
import com.study.spring.repository.DiaryRepository;
import com.study.spring.repository.MemberRepository;

@Service
public class DiaryService {
	@Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private MemberRepository memberRepository; // Add this field

    public List<Diary> findByMemId(String memId) {
        return diaryRepository.findByMemId(memId);
    }

    public Diary createEvent(Diary event) {
        return diaryRepository.save(event);
    }

    public void deleteEvent(Long dnum) {
        diaryRepository.deleteById(dnum);
    }

    public Optional<Diary> getById(Long dnum) {
        return diaryRepository.findById(dnum);
    }

    public Diary findByDnumAndMemId(Long dnum, String memId) {
        // Find Member by memId
//        Optional<Member> member = memberRepository.findById(memId);
//        if (member.isPresent()) {
            // Use the Member object to find the Diary
            return diaryRepository.findByDnumAndMemId(dnum, memId).orElse(null);
//        }
//        return null;
    }
}
