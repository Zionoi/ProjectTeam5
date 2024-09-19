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
    private Double rating;  	  // 평점 (숫자로 변경)

    private Integer rank;         // 음식점 순위
    private String area;          // 지역 정보 (시군구, 읍면동)
    private String foodType;      // 음식 종류 (한식, 중식 등)
    private Integer rankChange;   // 순위 변동
    private Double visitorRatio;  // 방문객 비율
    private Integer callCount;    // 통화 고객 수
}
