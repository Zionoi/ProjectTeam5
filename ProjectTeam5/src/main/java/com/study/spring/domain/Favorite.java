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

}
