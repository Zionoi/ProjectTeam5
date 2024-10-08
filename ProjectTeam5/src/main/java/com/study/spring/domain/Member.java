package com.study.spring.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Member {
	@Id
	private String memId;
	@NonNull
	private String pass;
	@NonNull
	private String nickname;
	private String name;
	private String phone;
	private String birthday;
	private String email;
	private String address;
	private String gender;
	@CreatedDate
	private LocalDateTime createDate;
	
	//사진 추가 경로
	private String imgName;
	private String imgPath;	
	
	//코멘트
	private String comments;
	//인삿말
	private String greeting;
	
	//친구목록 공개여부
	private boolean friendListOpen;
	
	//일일방문자수 (날짜변경시 0으로 초기화)
	private Long todayVisit;
	//토탈방문자수
	private Long totalVisit;
	
	//사진 추가 경로
	private String homeImgName;
	private String homeImgPath;	
}
