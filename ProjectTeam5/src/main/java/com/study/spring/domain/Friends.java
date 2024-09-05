package com.study.spring.domain;

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
public class Friends {
	@Id
	@SequenceGenerator (
			name="fSEQ",
			sequenceName = "F_SQ",
			allocationSize = 1
			)	
	@GeneratedValue(generator="fSEQ")
	private Long fNum;
	@ManyToOne
    @JoinColumn(name = "memId") 
    private Member member;
	@NonNull
	private String friendId;

}
