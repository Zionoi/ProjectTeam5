package com.study.spring.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;


@Data
@Entity
public class Board {
	
	@Id
	@SequenceGenerator (
			name="bSEQ",
			sequenceName = "B_SQ",
			allocationSize = 1
			)	
	@GeneratedValue(generator="bSEQ")
	private Long bNum;
	
	@ManyToOne
    @JoinColumn(name = "memId") 
    private Member member;
	
	@NonNull
	private String bTitle;
	private String bContent;
	@CreatedDate
	private String createDate;
	@LastModifiedDate
	private String updateData;
	private String imgName;
	private String imgPath;
	
}
