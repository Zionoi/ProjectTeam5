package com.study.spring.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "restaurant")
public class Restaurant {

    @Id
    @SequenceGenerator(
    		name = "rSEQ", 
    		sequenceName = "R_SQ", 
    		allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rSEQ")
    private Long rNum;            // 고유 ID (시퀀스로 생성)

    private String rName;         // 맛집 이름
    private String rAddress;      // 주소
    private String category;      // 카테고리
    private String imageUrl;      // 이미지 경로

    private Long likeCount;       // 좋아요 수
}