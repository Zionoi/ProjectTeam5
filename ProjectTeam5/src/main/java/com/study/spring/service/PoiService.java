package com.study.spring.service;

import org.springframework.beans.factory.annotation.Value;  // @Value 사용
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PoiService {

    private final RestTemplate restTemplate;

    @Value("${tmap.api.key}")  // application.properties 또는 환경변수에서 가져옴
    private String appKey;

    public PoiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getRestaurants(String searchKeyword, int page) {
        String url = "https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=" + searchKeyword +
                     "&page=" + page +
                     "&searchType=all&count=20&resCoordType=WGS84GEO&multiPoint=N&searchtypCd=A&reqCoordType=WGS84GEO&poiGroupYn=N";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");

        // appKey를 설정 파일에서 가져옴
        headers.set("appKey", appKey);

        // appKey 값 로그로 출력 (확인용)
        System.out.println("Using appKey: " + appKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }
    
    // 음식점 순위와 분석 데이터를 받아오는 메서드
    public String getRestaurantRankings(String area, String foodType) {
        String url = "https://apis.openapi.sk.com/tmap/pois?version=1&area=" + area +
                     "&foodType=" + foodType + "&count=10&sort=rank";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.set("appKey", appKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }
}
