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
    @SequenceGenerator(
        name = "fSEQ", // 시퀀스 이름
        sequenceName = "F_SQ", // 시퀀스 정의
        allocationSize = 1 // 시퀀스 할당 크기 설정
    )
    @GeneratedValue(generator = "fSEQ") // 자동 생성된 값으로 설정
    private Long fNum; // 친구 관계의 고유 번호

    @ManyToOne
    @JoinColumn(name = "mem_id") // 테이블의 'mem_id'와 매핑 (SQL의 컬럼명에 맞춤)
    private Member member;

    @NonNull
    private String friendId; // 친구 요청을 받은 회원의 ID

    @NonNull
    private String status; // 요청 상태: '대기(pending)', '수락(accepted)', '거절(rejected)', 
}
