package com.study.spring.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity
public class Message {
	@Id
	@SequenceGenerator (
			name="mSEQ",
			sequenceName = "m_SQ",
			allocationSize = 1
			)	
	@GeneratedValue(generator="mSEQ")
	private Long mNum;
	
	@ManyToOne
    @JoinColumn(name = "memId") 
    private Member member;
	
	private String mContent;
	private String createSysdate;
	private boolean isReading;
}
