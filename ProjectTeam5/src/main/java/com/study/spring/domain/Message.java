package com.study.spring.domain;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "messages")  // 데이터베이스에서 테이블 이름을 명시적으로 지정
public class Message {

    // 메시지 고유번호(시퀀스)
    @Id
    @SequenceGenerator(
        name = "mSEQ",
        sequenceName = "M_SQ",
        allocationSize = 1
    )
    @GeneratedValue(generator = "mSEQ")
    private Long mNum;

    // 발신자 (Member 엔티티와 연관)
    @ManyToOne(cascade = CascadeType.PERSIST)  // 또는 CascadeType.ALL
    @JoinColumn(name = "memId", nullable = false)  // 외래 키 설정
    private Member member;  // sender

    // 수신자의 ID
    @NonNull
    @Column(nullable = false)  // 수신자 필드가 null이 될 수 없도록 설정
    private String friendId;  // receiver

    // 메시지 내용
    @NonNull
    @Column(nullable = false)  // 내용이 null이 될 수 없으며, 최대 길이 1000자로 제한
    private String mContent;

    // 메시지 작성일
    @NonNull
    @Column(nullable = false)
    private LocalDateTime createSysdate;

    // 메시지 저장 시 작성일을 자동으로 설정
    @PrePersist
    public void prePersist() {
        this.createSysdate = LocalDateTime.now();
    }
}
