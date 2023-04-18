# Vercel 인프라로 프론트엔드 운영해보기


## 실습순서
- CRA로 SPA 프로젝트 생성해서, Vercel에 배포 해보기
- Branch 생성해서 새로운 버전 만들어보기
- PR 생성해서 (feature --> main)
- comment 사용해보기


## Vercel 설정 둘러보기
- settings
   - General
   - Domain
   - Integration
   - Git
   - Functions
   - Cron Jobs
   - Environment variables
   - Deployment protection


## Serverless란?
클라우드상에 있는 서버에서 소스코드를 동작하게 하는 개발 모듈
더 이상 개발자가 서버를 직접 구축하고 관리할 필요가 없음.
서버는 여전히 존재하지만, 더이상 우리가 머리아프게 생각해야 하는 것이 아니라,
클라우드에서 알아서 관리해줌. 



## 기존에 어떤 문제가?
개발자가 직접 서버를 관리
- SSR: AWS EC2, Elastic Beanstalk, ECS, Fargate, Docker, k8s
   - CPU, RAM 사용 / 트래픽
   - 소프트웨어 관리
   - 서버 모니터링
   - 스케일링 (확장)
   - 항상 운영 해야 함 ($비용)
- CSR: AWS Cloudfront, S3


## Serverless 특징
"serverless" computing (FaaS Function as a Service)

### 장점
- ~~CPU, RAM 사용 / 트래픽~~ 
- ~~소프트웨어 관리~~
- ~~서버 모니터링~~
- ~~스케일링 (확장)~~ --> 확장 쉬움
- ~~항상 운영 해야 함~~ --> 사용한 만큼 비용 측정

### 단점
- Cold Start: 처음 시작하는데 시간이 걸림
   - AWS 왈: Cold Start 비율 1%도 안됨! 걱정마삼. 캐싱 전략으로 극복할수도..!
- 리소스의 한계
   - 메모리의 한계: (128MB ~ 10,240MB)
   - timeout: 900sec




## 기존 Next.js에서 불가능 했던 것들
https://nextjs.org/docs/advanced-features/middleware



## Middleware





## edge-middleware
https://vercel.com/docs/concepts/functions/edge-middleware


## vercel limits
https://vercel.com/docs/concepts/limits/overview