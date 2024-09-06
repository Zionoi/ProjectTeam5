package com.study.spring.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data 
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Diary {
	
    @Id
    @SequenceGenerator (
        name = "dSEQ",
        sequenceName = "D_SQ",
        allocationSize = 1
    )	
    @GeneratedValue(generator = "dSEQ")
    private Long dNum;
	
    @ManyToOne
    @JoinColumn(name = "memId") 
    private Member member;
	
    @NonNull
    @JsonProperty("dTitle")
    private String dTitle;

    @JsonProperty("dContent")
    private String dContent;
    
    @Column(name = "start_date")
    private LocalDateTime start;

    @Column(name = "end_date")
    private LocalDateTime end;

    @CreatedDate
    private LocalDateTime createDate;

    @LastModifiedDate
    private LocalDateTime updateDate;
}
