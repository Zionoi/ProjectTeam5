package com.study.spring.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Guestbook {
	@Id
	@SequenceGenerator (
			name="gSEQ",
			sequenceName = "G_SQ",
			allocationSize = 1
			)	
	@GeneratedValue(generator="gSEQ")
	private Long gbNum;
	private String memId;	//방명록이 달리는 페이지의 주인의 아이디
	private String nickname;	// 방명록을 다는 사람의 아이디
	private String gbContent;
	@CreatedDate
    private LocalDateTime createDate;
	@LastModifiedDate
    private LocalDateTime updateDate;
	
}
