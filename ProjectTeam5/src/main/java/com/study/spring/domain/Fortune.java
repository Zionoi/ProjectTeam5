package com.study.spring.domain;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity
public class Fortune {
    @Id
    @SequenceGenerator (
        name = "ftSEQ",
        sequenceName = "FT_SQ",
        allocationSize = 1
    )	
    @GeneratedValue(generator = "ftSEQ")
    private Long ftNum;
    
    private String fortuneText;
}
