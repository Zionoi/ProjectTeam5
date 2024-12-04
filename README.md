# HomeTree - 너와 나만의 작은공간🌳

**HomeTree**는 소규모 지인들과 함께 미니홈페이지를 꾸밀 수 있는 웹 서비스입니다.  
뿌리로부터 연결된 가지들처럼, 유저들은 **HomeTree**를 통해 친한 지인들과 긴밀하게 연결될 수 있습니다.  
당신만의 공간에서 친구들과 소통하고, 개성을 표현해보세요!

---

## 📸 **HomeTree의 주요 화면**  

> 
> 아래는 HomeTree의 대표적인 화면입니다.  


### 로그인 페이지
![로그인인 페이지](https://github.com/user-attachments/assets/366b38f1-e693-41e5-bc04-8484bf69b934)

---

### 메인 페이지
![메인 페이지](https://github.com/user-attachments/assets/4142cc15-2694-490f-a62b-b8453ec8efee)

---

### 게시판
![게시판](https://github.com/user-attachments/assets/8eb01a91-cea6-400b-9594-275379e230bb)

---

### 다이어리
![HomeTreeDiary](https://github.com/user-attachments/assets/323c3a18-75c5-4c0b-93fa-a775c237a637)

---

### 산책로 검색
![HomeTreeWalking](https://github.com/user-attachments/assets/e756c35f-0b59-457a-a176-1202f114c038)

---

### 산책로 투표및 결과페이지
![HomeTreeWalkingVote](https://github.com/user-attachments/assets/537758b8-667e-4b49-813d-0eb4e2aca31a)

---

### 맛집 검색
![HomeTreeRestaurant](https://github.com/user-attachments/assets/cb1dc3b4-4a71-494b-9e6b-2eeb619e1646)

---

### 방명록
![HomeTreeGuestBook](https://github.com/user-attachments/assets/8bef0f7d-d614-4f65-9691-45966db9452e)

---



## 🔗 프로젝트 소개

- **프로젝트 이름:** HomeTree
- **프로젝트 목적:**  
  너와 나만의 공간을 만들어주는 **미니홈페이지** 서비스.  
  사용자는 자신의 홈페이지를 꾸미고, 친구들 홈페이지에 방문하며 서로의 개성을 공유할 수 있습니다.
  
- **프로젝트 의미:**  
  "HomeTree"는 뿌리에서 시작해 가지로 이어지는 나무처럼,  
  너와 나만의 작은 공간 홈트리를 통해 서로 연결될 수 있음을 상징합니다.

---

## 🧑‍🤝‍🧑 팀원 소개

| **팀장** : **김요한** | **팀원** : **임성훈**, **엄이슬**, **김주영**, **정승연** |

### **담당 기능**

- **로그인 기능**  
  JWT 토큰을 발급하여 로컬 스토리지에 저장하고, 인증과 보안을 강화.
  
- **유저별 홈페이지 할당 로직 구현**  
  로그인 정보 기반으로 유저별 홈페이지 구별 및 유저간 커뮤티케이션 환경 구현.

- **일일/토탈 방문자수 카운트**  
  Spring Boot의 `@Scheduled` 어노테이션을 활용하여 매일 자정에 방문자수를 초기화하고 DB에 저장.

- **메인 페이지 스티커 부착 기능**  
  웹페이지와 `div` 요소의 클릭 지점을 퍼센트 값으로 계산.  
  웹페이지나 `div` 크기가 변해도 스티커 위치가 정확히 유지되도록 구현.

- **다이어리 기능**  
  FullCalendar 라이브러리를 사용하여 사용자들이 일기를 작성하고 조회할 수 있는 기능 제공.

- **게시판 사진 등록 기능**  
  한 게시글에 여러 장의 사진을 저장할 수 있도록 구현.

- **산책로 추천 및 투표 기능**  
  지역 설정에 따라 산책로 목록을 제공하며, 친구들과 함께 투표 진행 가능.



---

## ⚙️ 기술 스택

- **Frontend:** React  
- **Backend:** Spring Boot (STS), JPA  
- **Database:** Oracle  
- **Deployment:** AWS

---
