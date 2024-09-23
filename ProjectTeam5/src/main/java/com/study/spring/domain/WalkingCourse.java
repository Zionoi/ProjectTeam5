package com.study.spring.domain;


import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class WalkingCourse {

    @Id
    @Column(name = "ESNTL_ID", length = 50, nullable = false)
    private String esntlId;  // 고유ID

    @Column(name = "WLK_COURS_FLAG_NM", length = 200)
    private String walkCourseFlagName;  // 산책경로구분명

    @Column(name = "WLK_COURS_NM", length = 200)
    private String walkCourseName;  // 산책경로명

    @Column(name = "COURS_DC", length = 4000)
    private String courseDescription;  // 경로설명

    @Column(name = "SIGNGU_NM", length = 200)
    private String signguName;  // 시군구명

    @Column(name = "COURS_LEVEL_NM", length = 200)
    private String courseLevelName;  // 경로레벨명

    @Column(name = "COURS_LT_CN", length = 500)
    private String courseLengthContent;  // 경로길이내용

    @Column(name = "COURS_DETAIL_LT_CN", length = 500)
    private String courseDetailLengthContent;  // 경로상세길이내용

    @Column(name = "ADIT_DC", length = 4000)
    private String additionalDescription;  // 추가설명

    @Column(name = "COURS_TIME_CN", length = 500)
    private String courseTimeContent;  // 경로시간내용

    @Column(name = "OPTN_DC", length = 500)
    private String optionDescription;  // 옵션설명

    @Column(name = "TOILET_DC", length = 500)
    private String toiletDescription;  // 화장실설명

    @Column(name = "CVNTL_NM", length = 200)
    private String convenienceFacilityName;  // 편의시설명

    @Column(name = "LNM_ADDR", length = 200)
    private String address;  // 지번주소

    @Column(name = "COURS_SPOT_LA", length = 20)
    private String courseSpotLatitude;  // 경로지점위도

    @Column(name = "COURS_SPOT_LO", length = 20)
    private String courseSpotLongitude;  // 경로지점경도
}
