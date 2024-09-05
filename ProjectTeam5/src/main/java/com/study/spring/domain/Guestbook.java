package com.study.spring.domain;

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
public class Guestbook {
	@Id
	@SequenceGenerator (
			name="gSEQ",
			sequenceName = "G_SQ",
			allocationSize = 1
			)	
	@GeneratedValue(generator="gSEQ")
	private Long gNum;
	
	@ManyToOne
    @JoinColumn(name = "memId") 
    private Member member;

	
	private String nickname;
	private String gContent;
}
