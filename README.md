# HomeTree - 너와 나만의 작은공간🌳

**HomeTree**는 소규모 지인들과 함께 미니홈페이지를 꾸밀 수 있는 웹 서비스입니다.  
뿌리로부터 연결된 가지들처럼, 유저들은 **HomeTree**를 통해 친한 지인들과 긴밀하게 연결될 수 있습니다.  
당신만의 공간에서 친구들과 소통하고, 개성을 표현해보세요!

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
  JWT 토큰을 발급하여 인증과 보안을 강화.
  
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

- **Frontend:** React, HTML, CSS, JavaScript  
- **Backend:** Spring Boot, JPA  
- **Database:** Oracle  
- **APIs:** FullCalendar API, 산책로 오픈소스 데이터, NAVER Map  
- **Libraries & Tools:** React-Draggable, React-ChartJS-2, Axios, React-Router-Dom, React-Slick  
- **Deployment:** AWS
- **Version Control:** GitHub  

---

## 📸 **HomeTree의 주요 화면**  

> 아래는 HomeTree의 대표적인 화면입니다.  

### 로그인 페이지  
<img src="https://github.com/user-attachments/assets/366b38f1-e693-41e5-bc04-8484bf69b934" width="66%" />

- **설명:** JWT 토큰을 발행하여 로그인기능 구현

- **트러블슈팅:**
  - 로컬스토리지에 아이디와 토큰을 저장하고 해당값을 참조하는 형태로 구현했으나 XSS공격에 취약하다는 점을 인지
  - 기존 로컬 스토리지에 토큰을 저장하던 방법에서 HttpOnly Cookie로 JWT 저장후 API 요청시 withCredentials:true 설정 및 서버단에서 쿠키를 확인하는 방법으로 XSS공격을 대비. 보안을 강화함.

---

### 메인 페이지  
<img src="https://github.com/user-attachments/assets/4142cc15-2694-490f-a62b-b8453ec8efee" width="66%" />

- **설명:**
  - 왼쪽 패널: 각 탭으로 이동할 수 있는 링크 포함
  - 가운데: 선택한 탭의 내용 표시
  - 오른쪽 패널: 친구 추가, 운세 뽑기 등의 기능 제공
 
  - **추후 업데이트:** 스티커저장방식을 로컬형식이 아닌 서버에 저장하는 형태로 바꾼후 친구가 친구에게 부착할 수 있는 형태로 구현할 예정

- **트러블슈팅:**
  - 나비 스티커 위치가 브라우저 크기에 따라 왜곡되는 문제 발생
  - 클릭 지점을 퍼센트 값으로 변환하여 상대 위치를 저장하도록 수정하여 해결
---

### 게시판  
<img src="https://github.com/user-attachments/assets/8eb01a91-cea6-400b-9594-275379e230bb" width="66%" />

- **설명:** 사진을 포함한 글 작성 가능
- **트러블슈팅:**
  - 사진 등록 후 바로 확인되지 않는 문제 발생
  - 정적 폴더에 사진이 저장이 되었던게 문제였고 정적폴더 외에 대신 별도 저장 폴더로 저장경로를 맵핑하여 실시간 반영

---

### 다이어리  
<img src="https://github.com/user-attachments/assets/323c3a18-75c5-4c0b-93fa-a775c237a637" width="66%" />

- **설명:** FullCalendar 라이브러리 기반 일기 작성 기능
- **추후 업데이트:** 산책로 투표를 통해 일정이 다이어리에 자동 업데이트될 예정
---

### 산책로 검색  
<img src="https://github.com/user-attachments/assets/e756c35f-0b59-457a-a176-1202f114c038" width="66%" />

- **설명:**
  - 오픈소스 데이터 활용
  - 지역 선택 시 해당 지역의 산책로 목록 제공 및 상세 정보 확인 가능

---

### 산책로 투표 및 결과 페이지  
<img src="https://github.com/user-attachments/assets/537758b8-667e-4b49-813d-0eb4e2aca31a" width="66%" />

- **설명:**
  - 투표 생성자는 산책을 함께 가고 싶은 친구들과 투표할 산책로를 선택하여 투표 진행 가능
  - 투표 권한이 있는 유저들이 모두 투표를 완료하면, 해당 페이지는 투표 결과를 보여주는 페이지로 변경됨
  - 결과는 **막대 그래프(React-ChartJS-2 활용)**를 이용하여 시각화됨
 
  - **트러블슈팅:**
    - 투표 데이터 저장 및 조회 시 발생하는 LazyInitializationException 문제 해결
    - @Transactional 적용 및 즉시 로딩(FetchType.EAGER) 설정을 통해 데이터 일관성 유지

   - **추후 업데이트:**
    - 투표 결과를 투표자들의 다이어리에 자동 업데이트하고, 쪽지를 발송하는 기능 추가 예정
    - 현재는 LazyInitializationException 문제를 도메인에 FetchType.EAGER 설정을 통해 해결했지만
      불필요한 데이터도 같이 불러와 성능 저하 이슈가 있음. DTO객체를 활용해 트랜잭션이 종료된 후에도 안전하게 데이터를 사용할 수 있도록 구현할 예정
---

### 맛집 검색  
<img src="https://github.com/user-attachments/assets/cb1dc3b4-4a71-494b-9e6b-2eeb619e1646" width="66%" />

- **설명:**
 - 네이버 지도 API 활용
  - 지역명만 입력해도 해당 지역의 맛집 리스트 표시
  - 선택한 식당들을 즐겨찾기 등록해둘수 있는 기능 구
---

### 방명록  
<img src="https://github.com/user-attachments/assets/8bef0f7d-d614-4f65-9691-45966db9452e" width="66%" />

- **설명:**
  - 친구가 방문하여 방명록을 남길 수 있는 기능
  - 남긴 친구의 이름을 클릭하면 해당 친구의 홈페이지로 이동하거나 쪽지 발송 가능
---

## 🔧 트러블슈팅

### 1. 게시판 사진 저장 후 실시간 표시 문제
- **문제:**  
  사용자가 게시판에 사진을 등록하면 해당 사진을 바로 확인할 수 없었고, 서버를 재시작해야 저장된 사진이 표시되는 문제가 발생.
  원인을 조사한 결과, 사진이 정적 폴더(static)에 저장되어 클라이언트가 실시간으로 파일을 렌더링할 수 없다는 것이 확인됨.

- **해결:**  
  정적 폴더(static) 대신 서버의 루트에 별도의 저장폴더를 생성하여 사진을 해당 폴더에 저장하도록 맵핑 경로를 새로 설정.
  이를 통해 사용자는 게시판에 사진을 등록한 후 서버 재시작 없이도 실시간으로 저장된 사진을 확인 가능.

---

### 2. 메인화면 나비 스티커 위치 조정 문제
- **문제:**  
  메인 페이지에서 스티커를 배치한 후 브라우저 크기를 조정하면 스티커 위치가 왜곡되는 현상 발생.  

- **해결:**  
  클릭 지점을 퍼센트 값으로 변환하여 상대 위치를 저장하도록 수정.  
  저장된 퍼센트 값을 기준으로 브라우저 크기와 상관없이 정확한 위치에 스티커를 렌더링하도록 구현.  

---

### 3. 산책로 투표 기능의 동시성 문제
- **문제:**  
  VoteService 클래스에서 투표 데이터를 저장하거나 조회하는 과정에서 예상치 못한 오류가 발생:
  - LazyInitializationException: Vote 엔티티의 participantIds 또는 voteEsntlId 필드와 같은 컬렉션 데이터에 접근할 때, 영속성 컨텍스트가 닫혀 데이터를 로드하지 못함.
  - @ElementCollection으로 관리되는 투표 수 컬렉션이 비동기 요청 처리 중 불일치 상태가 발생.

  이는 JPA의 영속성 컨텍스트 관리와 트랜잭션 범위가 제대로 설정되지 않아 데이터 일관성이 보장되지 않았기 때문.

- **해결:**  
  - 투표 관련 메서드에 @Transactional을 적용해 메서드 실행 동안 영속성 컨텍스트를 유지하고 데이터의 일관성을 보장.
  - 지연 로딩 문제를 해결하기 위해 데이터를 명시적으로 초기화하거나, 필요한 데이터만 즉시 로딩(FetchType.EAGER)으로 설정.

---

## ✨ 프로젝트 소감  

HomeTree 프로젝트를 통해 다양한 아이디어를 하나의 프로젝트에 담을 수 있었던 점이 가장 만족스러웠습니다. 초기 주제 선정 단계에서 논의되었던 여러 기능들을 버리지 않고 통합하면서, 자연스럽게 다양한 기술과 기능을 접해볼 수 있었고, 이를 통해 많은 성장을 할 수 있었습니다.

- **기술적 성장**  
  JWT 인증을 도입하며 보안에 대한 이해를 넓혔고, FullCalendar와 Chart.js 등의 라이브러리를 활용하면서 다양한 기능을 효과적으로 통합하는 방법을 배웠습니다.  
  또한, RESTful API와 React Router를 활용하여 원활한 데이터 흐름을 구축하는 것이 얼마나 중요한지 깨달았습니다.  

- **협업과 문제 해결**  
  협업 과정에서 코드 리뷰와 커뮤니케이션의 중요성을 실감했습니다. 초기에 업무 분담이 명확하지 않아 같은 페이지를 두 명의 팀원이 각각 구현하는 일이 발생했지만, 코드 리뷰를 통해 조기에 문제를 발견하여 불필요한 중복 작업을 방지할 수 있었습니다. 이를 계기로 협업 시 사전 기획과 역할 분담이 필수적이라는 점을 깨달았습니다.


- **향후 개선 방향**  
  투표 결과를 자동으로 다이어리에 반영하고, 사용자 간 소통 기능을 확장하는 등의 업데이트를 계획하고 있습니다.
  메인 페이지의 나비 스티커 부착을 본인이 하하는게 아닌 친구가 달아줄 수 있게 업데이트 할 예정입니다.
    


---
