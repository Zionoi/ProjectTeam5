package com.study.spring.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtil {

    // HS256 알고리즘에 대한 비밀 키를 생성합니다.
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long EXPIRATION_TIME = 86400000L; // 1일(밀리초 단위)

    // JWT 토큰을 생성합니다.
    public static String generateToken(String userId) {
        return Jwts.builder()
                   .setSubject(userId) // 사용자 이름을 주제로 설정
                   .setIssuedAt(new Date()) // 현재 시간을 발행 시간으로 설정
                   .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // 만료 시간을 설정
                   .signWith(SECRET_KEY) // 비밀 키로 서명
                   .compact(); // JWT 토큰을 생성
    }

    // JWT 토큰의 유효성을 검증합니다.
    public static boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // 비밀 키로 파싱
                .build()
                .parseClaimsJws(token); // 토큰을 파싱하여 검증
            return true;
        } catch (Exception e) {
            return false; // 예외가 발생하면 유효하지 않은 토큰
        }
    }

    // JWT 토큰에서 사용자 이름을 추출합니다.
    public static String getUsername(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(SECRET_KEY) // 비밀 키로 파싱
                   .build()
                   .parseClaimsJws(token) // 토큰을 파싱
                   .getBody()
                   .getSubject(); // 주제(사용자 이름)를 반환
    }
}
