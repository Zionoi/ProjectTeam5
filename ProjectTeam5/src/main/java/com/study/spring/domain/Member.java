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
	
}
