package com.study.spring.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Fortune;
import com.study.spring.repository.FortuneRepository;

@Service
public class FortuneService {
	@Autowired
	FortuneRepository fortuneRepository;
	
    // 오늘의 운세를 랜덤으로 가져오는 메서드
    public Fortune getRandomFortune() {
        List<Fortune> fortunes = fortuneRepository.findAll();
        
        if (fortunes.isEmpty()) {
            throw new IllegalStateException("운세가 없습니다.");
        }
        
        Random random = new Random();
        int randomIndex = random.nextInt(fortunes.size()); // 0부터 fortunes.size() - 1 까지 랜덤 인덱스 생성
        return fortunes.get(randomIndex);
    }
}
