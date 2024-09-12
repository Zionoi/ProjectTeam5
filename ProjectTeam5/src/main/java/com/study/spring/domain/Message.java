package com.study.spring.domain;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "message")
@EntityListeners(AuditingEntityListener.class)
public class Message {

    @Id
    @SequenceGenerator(
        name = "mSEQ",
        sequenceName = "M_SQ",
        allocationSize = 1
    )
    @GeneratedValue(generator = "mSEQ")
    private Long mNum;

    @Column(nullable = false)
    private String memId;  // 발신자 ID

    @NonNull
    @Column(nullable = false)
    private String friendId;  // 수신자 ID

    @NonNull
    @Column(nullable = false)
    private String mcontent;  // 메시지 내용

    @NonNull
    @Column(nullable = false)
    private LocalDateTime createSysdate;

    @Column(nullable = false)
    private int isReading = 1; // 읽음 여부 (1: 읽지 않음, 0: 읽음)

    @PrePersist
    public void prePersist() {
        this.createSysdate = LocalDateTime.now();
    }
}


