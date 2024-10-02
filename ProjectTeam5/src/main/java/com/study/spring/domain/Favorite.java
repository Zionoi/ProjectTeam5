package com.study.spring.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mem_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", referencedColumnName = "rNum")
    private Restaurant restaurant;

    private LocalDateTime favoriteDate;
    
    // 찜한 상태를 0과 1로 구분
    @Column(nullable = false)
    private boolean isFavorite;
}
