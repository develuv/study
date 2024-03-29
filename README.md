# Study

Study & Discuss Project ✏️

## Ground Rules

- cycle : 1 week (수요일)
- 자유로운 주제 혹은 관심 주제 중 부담없는 선에서 준비
- 발표자는 한주까지 연기 가능
- 적극적 토론 지향
- 스터디 하루전 전 내용 공유하기
- 5인이상 풀리면 주변 맛집에서 저녁먹고 이후 스터디 하기
- 스터디 타임라인을 만들자
  - 저녁: 7시 ~8시
  - 스터디: 8시 ~ 10시
  - 잡담: 10시 ~ 11시

## Subject Of Interest

- 클린 코드
  - Cycle.1 2021.04.07(수) - 클린코드 - 희준
- 디자인 패턴
  - [Cycle.2 2021.06.17(목) - 디자인패턴 Iterator, Adapter - 재섭](cycle-2/design-patterns)
  - [Cycle.3 2021.11.18(목) - Software design pattern - 재섭](https://github.com/develuv/study/blob/main/cycle-3/design-patterns/README.md)
- 리팩토링
  - [Cycle.1 2021.04.16(금) - IDE를 활용하여 리팩토링 전략 실습 - 재섭](cycle-1/study-4/study-4-refactoring.md)
- 뒤로가기
  - Cycle.2 2021.05.14(금) - 뒤로가기 상태 유지에 대한 고찰 - 성광
  - Cycle.2 2021.06.03(목) - 뒤로가기 상태 유지에 대한 고찰2 - 성광
- Typescript
  - [Cycle.1 2021.03.17(수) - Typescript 얕은 정리 - 동주](cycle-1/study-1-typescript.md)
- D3
  - [Cycle.1 2021.03.30(화) - D3 얕은 정리리 - 상훈](cycle-1/study-2-d3.md)
- Dart
  - [Cycle.8 Dart 빠르게 알아보기](https://www.notion.so/Dart-ef83b4a99f9c4865a38329891995b573)
- React
  - [Cycle.1 2021.04.22(목) - React Tutorial - 성광](cycle-1/react-tutorial/README.md)
  - [Cycle.3 2021.10.29(목) - react-hook-form - 상훈](https://github.com/develuv/study/tree/main/cycle-3/react-hook-form)
  - [Cycle.3 2021.11.11(목) - react-cra - 희준](https://github.com/develuv/study/tree/main/cycle-3/react-cra)
  - [Cycle.8 미래 지향적인 프론트 아키텍쳐 구축 - 성광](https://github.com/develuv/study/tree/main/cycle-8/%EB%AF%B8%EB%9E%98-%EC%A7%80%ED%96%A5%EC%A0%81%EC%9D%B8-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%EA%B5%AC%EC%B6%95)
- React Query
  - [Cycle.2 2021.06.23(화) - React Query - 희준](cycle-2/react-async)
- WebRTC
  - [Cycle.2 2021.05.25(화) - 성광님도 한번 보면 무릎을 탁칠 WebRTC 문서를 작성해 보자 - 상훈](cycle-2/webrtc/webrtc.md)
- Vite
  - [Cycle.2 2021.06.08(화) - Vite알아보고 스캐폴딩 구성하기 - 동주](cycle-2/vite)
- UI Components
  - [Cycle.3 2021.10.07(수) - 캘린더 만들고 Date Picker 기능 구현 실습 - 동주](https://github.com/dunz/date-picker)
- Tdd
- Docker
- Aws
  - [Cycle.3 2021.10.12(화) - Github & AWS Codepipeline을 이용한 CICD 구성 리뷰 - 진영](https://github.com/camp-son/aws-sample-repo)
- GraphQL
- Functional programming
- ngrok
- Lerna
- Yarn workspace
  - [Cycle.3 2021.10.21(목) - yarn workspace - 성광](https://github.com/develuv/study/tree/main/cycle-3/yarn-workspace)
- Yarn berry
- Github actions


<details>
 <summary><h2>Cycle.8</h2> <h6>2023.07.05 ~</h6></summary>
 <div> 
   
> 성광 - 동주 - 상훈 - 희준 - 진영 - 재섭
- [미래 지향적인 프론트 아키텍쳐 구축 - 성광](https://github.com/develuv/study/tree/main/cycle-8/%EB%AF%B8%EB%9E%98-%EC%A7%80%ED%96%A5%EC%A0%81%EC%9D%B8-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%EA%B5%AC%EC%B6%95)
- [Dart 빠르게 알아보기](https://www.notion.so/Dart-ef83b4a99f9c4865a38329891995b573)
 </div>
</details>


<details>
  <summary><h2>Cycle.4</h2></summary>
  <div>

> 진영 - 성광 - 동주 - 재섭 - 상훈 - 재섭

#### Section 4. User CRUD By 진영
1. NestJS에서 throw로 예외를 방출하지 않고 객체로 만들어서 반환하는데, Exception을 만들어서 처리할 수 있을까?
  - Exception 상태 코드 정의와 구조를 잘 짜면 Error를 확장하여 throw 하는 방향으로 갈 수 있을 것 같다. 
  - [Example feature/custom-exception](https://github.com/camp-son/nuber-eats-backend/tree/feature/custom-exception)

2. Entity에 대한 로직을 서비스가 아닌 모델에서 처리하는 부분이 인상 깊었다.
  - typeorm에서 쿼리를 처리(CUD)할 때 전/후처리를 할 수 있도록 데코레이터를 제공하고 있다. (Insert, Remove, Update)
  - Repository를 통해 데이터를 조회를 했을 때 해당 Entity를 반환해줘서 Entity에 대한 비지니스 로직 메서드를 작성하고 사용할 수 있다.

3. Resolver와 Service의 반환 타입을 맞출 수 있지 않을까?
  - `output.dto.ts` 공통 반환 클래스를 생성하였고, 각 Input, Output에 대해 클래스를 생성하게 되는데 Resolver와 Service의 반환 타입을 맞출 수 있지 않을까 하는 생각이 들었다.
  - Q. 타입을 맞추지 않는다면 어떤 경우가 있을까?
    
  </div>
</details>


<details>
 <summary><h2>Cycle.3</h2> <h6>2021.10.07 ~ 2021.11.18</h6></summary>
 <div>
   
> 동주 - 진영 - 성광 - 상훈 - 희준 - 재섭
- [Cycle.3 2021.10.07(목) - 캘린더 만들고 Date Picker 기능 구현 실습 - 동주](https://github.com/dunz/date-picker)
- [Cycle.3 2021.10.14(목) - Github & AWS Codepipeline을 이용한 CICD 구성 리뷰 - 진영](https://github.com/camp-son/aws-sample-repo)
- [Cycle.3 2021.10.21(목) - yarn workspace - 성광](https://github.com/develuv/study/tree/main/cycle-3/yarn-workspace)
- [Cycle.3 2021.10.29(목) - react-hook-form - 상훈](https://github.com/develuv/study/tree/main/cycle-3/react-hook-form)
- [Cycle.3 2021.11.11(목) - react-cra - 희준](https://github.com/develuv/study/tree/main/cycle-3/react-cra)
- [Cycle.3 2021.11.18(목) - Software design pattern - 재섭](https://github.com/develuv/study/blob/main/cycle-3/design-patterns/README.md)

   ### 회고 [Mirro보드 바로가기](   https://miro.com/welcomeonboard/bUU5eXo0NHYzaWIzWG5lcnA0Q2xaSGRYaFlRc0k3QzVhSlZXMEVURE5RRmZwVU1NYTRHNzB2TDhYM2RHeXVoWnwzMDc0NDU3MzU3ODIxMTMwMjky?invite_link_id=611719735886)
   
   #### [회고란?](https://medium.com/@nanse84/%ED%9A%8C%EA%B3%A0%EB%9E%80-25833157cad6)

![세번째 스터디 사이클 회고](./images/cycle-3.png)
   
 </div>
</details>


<details>
 <summary><h2>Cycle.2</h2> <h6>2021.05.14 ~ 2021.06.23</h6></summary>
 <div>
   
> 성광 - 상훈 - 성광 - 동주 - 희준
- Cycle.2 2021.05.14(금) - 뒤로가기 상태 유지에 대한 고찰 - 성광
- [Cycle.2 2021.05.25(화) - 성광님도 한번 보면 무릎을 탁칠 WebRTC 문서를 작성해 보자 - 상훈](cycle-2/webrtc/webrtc.md)
- Cycle.2 2021.06.03(목) - 뒤로가기 상태 유지에 대한 고찰2 - 성광
- [Cycle.2 2021.06.08(화) - Vite알아보고 스캐폴딩 구성하기 - 동주](cycle-2/vite)
- [Cycle.2 2021.06.17(목) - 디자인패턴 Iterator, Adapter - 재섭](cycle-2/design-patterns)
- [Cycle.2 2021.06.23(화) - React Query - 희준](cycle-2/react-async)

   ### 회고 [Mirro보드 바로가기](   https://miro.com/welcomeonboard/T0V0UkVOMnpVY0VrNDBwamZxcjh3U1gyZVJHT09reGhZVTFvYk1xS2tzbDVGSGNCbTF1TWxqYWF2c01CZ1hwZXwzMDc0NDU3MzU3ODIzMjkyNTY2)

![두번째 스터디 사이클 회고](./images/cycle-2.png)

 </div>
</details>


<details>
 <summary><h2>Cycle.1</h2> <h6>2021.03.17 ~ 2021.04.22</h6></summary>
 <div>
   
> 동주 - 상훈 - 희준 - 재섭 - 성광
- [Cycle.1 2021.03.17(수) - Typescript 얕은 정리 - 동주](cycle-1/study-1-typescript.md)
- [Cycle.1 2021.03.30(화) - D3 얕은 정리 - 상훈](cycle-1/study-2-d3.md)
- Cycle.1 2021.04.07(수) - 클린코드 - 희준
- [Cycle.1 2021.04.16(금) - IDE를 활용하여 리팩토링 전략 실습 - 재섭](cycle-1/study-4/study-4-refactoring.md)
- [Cycle.1 2021.04.22(목) - React Tutorial - 성광](cycle-1/react-tutorial/README.md)

### 회고 [Mirro보드 바로가기](https://miro.com/welcomeonboard/0p2xKh9fze1t2bho1E5rNOcK2NzPnS3ceGoorPJPCtI4RrMuxbQZvHs1kU4OsncU)

- Try

  - 계속 스터디 모임 유지하자
  - 재섭이형은 웬만하면 실습 스터디로 준비
  - 모노레포 저장소(러나, yarn워크스페이스) 활용성 스터디해봐도 좋을듯, 공용 저장소는 꾸준히 관리

- Action

  - 스터디 하루전 전 내용 공유하기
  - 5인이상 풀리면 주변 맛집에서 저녁먹고 이후 스터디 하기
  - 스터디 타임라인을 만들자
    - 저녁: 7시 ~8시
    - 스터디: 8시 ~ 10시
    - 잡담: 10시 ~ 11시

  ![첫번째 스터디 사이클 회고](./images/cycle-1.png)
   </div>
  </details>




