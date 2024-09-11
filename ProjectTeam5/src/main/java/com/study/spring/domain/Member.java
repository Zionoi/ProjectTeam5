package com.study.spring.domain;

import org.springframework.data.annotation.CreatedDate;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
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
	private String createDate;
	
	//사진 추가 경로
	private String imgName;
	private String imgPath;	
	
	private String comments;
	
	//일일방문자수 (날짜변경시 0으로 초기화)
	private Long todayVisit;
	//토탈방문자수
	private Long totalVisit;
}
