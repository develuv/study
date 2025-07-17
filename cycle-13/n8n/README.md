# n8n 자동화 실습

###  n8n 이란

n8n은 다양한 애플리케이션과 서비스 간의 워크플로우를 자동화하는 데 사용되는 오픈 소스 플랫폼

### n8n의 특징

- 오픈 소스: 무료로 사용이 가능하며, 필요에 따라 소스 코드를 수정하거나 기능을 확장 가능. 자체 호스팅을 통해 데이터 보안을 강화할 수 있다는 장점
- 노코드/로우코드 플랫폼: 코딩 경험이 없는 사용자도 쉽게 워크플로우를 설계할 수 있도록 시각적인 인터페이스를 제공
- 다양한 서비스 통합: 400개 이상의 앱 및 서비스와의 연동을 지원, 이메일, 소셜 미디어, CRM, 데이터베이스 등 다양한 도구들을 연결할 수 있음
- 확장성 및 사용자 정의: JavaScript 코드 삽입 또는 사용자 정의 노드 개발을 통해 복잡한 로직을 구현하고 기능을 확장할 수 있음



### n8n의 주요 기능 및 장점

- 시각적 워크플로우 빌더: 드래그 앤 드롭 인터페이스를 통해 워크플로우를 직관적으로 구성하고 관리 가능
- 다양한 노드 지원: Gmail, Slack, Notion 등 다양한 애플리케이션과의 통합을 위한 노드를 제공
- 데이터 변환 및 처리: 데이터 필터링, 가공, 변환 등 다양한 데이터 처리 기능을 제공
- 트리거 및 웹훅: 특정 이벤트 발생 시 워크플로우를 자동으로 실행할 수 있도록 지원
- 에러 처리 및 디버깅: 워크플로우 실행 중 발생하는 오류를 감지하고 해결할 수 있는 기능을 제공
- AI 기능: AI 플랫폼과의 연동을 통해 텍스트 분석, 자연어 처리, AI 에이전트 구축 등 AI 기반 워크플로우를 구축 가능



### n8n 설치 및 실행

Docker를 이용한 설치: Docker를 사용하여 n8n을 쉽고 빠르게 설치하고 관리 가능

```
docker run -it --rm -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n 명령어를 사용하여 Docker 컨테이너로 n8n을 실행할 수 있음

Node.js를 이용한 설치: Node.js 환경에서 npm을 사용하여 n8n을 직접 설치할 수 있음

npm install -g n8n 명령어를 사용하여 n8n을 설치하고, n8n 명령어로 실행할 수 있음
```
클라우드 서비스 사용: n8n Cloud와 같은 유료 클라우드 서비스를 이용하여 간편하게 n8n을 사용할 수도 있음



### n8n 활용 예시

- Gmail → Slack 자동 알림: 특정 조건의 이메일 수신 시 Slack으로 자동 알림을 전송하는 워크플로우
- Google Sheets → Notion 데이터 자동 입력: Google Sheets에 입력된 데이터를 Notion 데이터베이스에 자동으로 등록하는 워크플로우
- AI 고객 응대 자동화: 고객 문의 티켓을 수신하여 AI가 분석하고 자동으로 응답을 생성하는 시스템
- 소셜 미디어 자동화: 블로그 포스팅 알림, 인스타그램 게시물 예약 등 소셜 미디어 관련 작업을 자동화
- 웹 크롤링 및 데이터 분석: 웹사이트에서 데이터를 추출하고, GPT를 이용하여 요약 및 텍스트 분석을 수행하여 결과를 자동으로 전송하는 워크플로우



### n8n vs 다른 자동화 도구

n8n은 Zapier, Make(Integromat) 등 다른 자동화 도구들과 비교했을 때 다음과 같은 차이점을 가짐
<img width="915" height="264" alt="image" src="https://github.com/user-attachments/assets/d84e46b6-0190-4843-a328-58544fff3ef1" />



### 간단한 설치 과정

#### n8n 스타터 킷으로 로컬에 설치하여 빠르게 시작

https://github.com/n8n-io/self-hosted-ai-starter-kit 

```
git clone <https://github.com/n8n-io/self-hosted-ai-starter-kit.git>
cd self-hosted-ai-starter-kit
docker compose up
```

### 자체 호스팅

자체 호스팅 후보 목록

- https://fly.io/ 
- https://render.com/ 
- https://railway.com/ 
- https://www.coolify.io/  

<img width="1349" height="343" alt="image" src="https://github.com/user-attachments/assets/0a5aa10b-2dbc-4447-b4a2-199b493e8c70" />


### http://fly.io  로 n8n 셀프호스팅 하기

#### fly cli 설치하기

```
brew install flyctl
```

#### fly 프로젝트 초기화

```
mkdir n8n
cd n8n
flyctl launch --no-deploy # 배포 없이 초기화
```

#### 생성된 toml 파일에 n8n 구성 추가

```
# fly.toml app configuration file generated for n8n-dunz on 2025-05-05T16:23:50+09:00
#
# See <https://fly.io/docs/reference/configuration/> for information about how to use this file.
#

app = 'n8n-dunz'
primary_region = 'nrt'  # 일본 도쿄 리전

[build]
  image = 'docker.n8n.io/n8nio/n8n:latest'  # n8n 도커 공식 이미지

[env]
  EXECUTIONS_DATA_MAX_AGE = '60'
  EXECUTIONS_DATA_PRUNE = 'true'
  GENERIC_TIMEZONE = 'Asia/Seoul'
  N8N_EDITOR_BASE_URL = '<https://n8n-dunz.fly.dev'>
  N8N_HOST = 'n8n-dunz.fly.dev'
  N8N_PORT = '5678'
  N8N_PROTOCOL = 'https'
  N8N_SECURE_COOKIE = 'true'
  WEBHOOK_URL = '<https://n8n-dunz.fly.dev'>

[[mounts]]
  source = 'n8n_data'
  destination = '/home/node/.n8n'

[http_service]
  internal_port = 5678
  force_https = true
  auto_stop_machines = 'stop'
  auto_start_machines = true
  min_machines_running = 1

[[vm]]
  memory = '512'  # n8n은 최소 512는 되어야 돌아감
  cpu_kind = 'shared'
  cpus = 1
```

#### fly 볼륨 추가

```
flyctl volumes list --app n8n-dunz
```

#### fly 배포

```
flyctl deploy
```



## Workflow

### 유튜브 숏츠 자동 발행 워크플로우

#### 툴

- Google Sheets
- Youtube
- LLM(Large Language Model)
- https://creatomate.com/ 
- http://fal.ai 
 - TTS(Text-to-Speech): elevenlabs turbo 2.5
 - T2I(Text-to-Image): recraft v3
 - I2V(Image-to-Video): kiling 1.6
 - Text-to-SFX: elevenlabs soud-effects



### 작업 실행

1. 숏츠 기획 프롬프트

```
너는 자동화 유튜브 쇼츠 콘텐츠 기획 전문가야.
저작권에 문제가 없는 고전 이야기 • 역사 • 신화 • 민담 • 철학적 딜레마 등을 바탕으로 5가지 주제를 추천해줘.

출력 형식:
- 코드 블록(```) 안에 탭(\t) 으로 정확히 구분된 텍스트를 제공해줘
- 각 행은 다음 순서로: Subject, Narration, Status, Caption, Publish
- 헤더 없이, 바로 데이터 행만 5개 제공

지침:
- Subject: 후킹 요소를 넣어 5~7단어 이내로 작성
- Narration: 30초 분량(약 60~70단어)의 나레이션
- Status: 항상 준비
- Caption: 10줄 분량의 심층 부연 설명, 줄바꿈 없이 셀 하나에 들어가도록 작성
- Publish: 항상 대기중
```

2. 나온 결과물 구글 시트에 추가하기

3. n8n 에서 구글 시트 get row 로 가져오기
  - google drive, google, sheets api 사용 활성화
   - https://console.cloud.google.com/apis/library?inv=1&invt=AbyUTA&project=n8nproject-458807 

4. 가져올 시트를 선택후 필터 추가
 - Status가 준비인것 필터 추가
 - return on first matching row 옵션 추가

5. 나레이션 생성을 위한 elevenlabs api 호출
```
Method: POST
URL: <https://queue.fal.run/fal-ai/elevenlabs/tts/turbo-v2.5>

Header1:
Name: Authorization
Value: Key $FAL_AI_API_KEY

Header2:
Name: Content-Type
Value: application/json

JSON:
{
  "text": "{{ $json.Narration }}",
  "language_code": "ko"
}
```
- http://fal.ai : https://fal.ai/  - 멀티모달 모델을 웹이나 API를 통해 바로 사용할
 - https://fal.ai/models/fal-ai/elevenlabs/tts/turbo-v2.5 
 - elevenlabs 의 turbo 2.5 모델 사용 (호출당 0.01달러 차감)
 - 추후 가격 최적화를 위해 elevenlabs api 를 직접 연동하는것을 고려(초기 1달러 제공)
  - 학습용/테스트용: http://Fal.ai  경유 사용도 무방
  - 서비스/제품화 목적: ElevenLabs API 직접 사용하는 것이 훨씬 좋음 (비용, 성능, 유연성 면에서 유리)

- api 키와 헤더 및 바디를 설정

6. wait 노드로 초 지정하여 음성 생성 기다리기
7. 생성한 나레이션 음성 가져오기
```
Method: GET
URL: <https://queue.fal.run/fal-ai/elevenlabs/requests/{{> $json.request_id }}
```
8. 이미지 영상 생성하기

- Basic llm chain 노드 사용
 - 모델, output 형식 지정
```
// prompt

주어진 스크립트에 따라 매우 몰입감 있고 영화적인 장면 프롬프트를 5장 생성해 주세요.

요구사항:
1. 생생하고 감각적인 동작 중심 묘사를 사용할 것 (예: 움켜잡다, 밀치다, 달리다, 쓰러지다 등)
2. 스크립트에 따라 논리적인 순서로 전개될 것
3. 평범한 일상보다는 독특하고 극적이며 시각적으로 강렬한 장면 위주로 구성 할 것
4. 몰입감을 높이기 위해 시네마틱 샷 등의 키워드를 포함할 것
5. 각 프롬프트는 200자 이내로 상세하게 작성
6. 큰따옴표("")는 사용하지 않음
7. 프롬프트는 영어로 생성함
```
9. 이미지 생성을 위한 나레이션으로 장면 생성용 프롬프트 5개 생성하기
 - gemini 2.5 flash 모델 사용
 - output 으로 Item List Output Parser 사용

10. 만든 프롬프트로 이미지 생성 api 호출 (Recraft)
```
Method: POST
URL: <https://queue.fal.run/fal-ai/recraft-v3>

Header1:
Name: Authorization
Value: Key $FAL_AI_API_KEY

Header2:
Name: Content-Type
Value: application/json

JSON:
{
  "prompt": "{{ $json.text }}",
  "image_size": "portrait_16_9",
  "style": "digital_illustration/neon_calm"
}
```
11. api 응답 대기를 위한 delay 주기

12. 이미지 url 가져오기
```
Method: GET
URL: <https://queue.fal.run/fal-ai/recraft-v3/requests/{{> $json.request_id
```
13. 영상 생성하기
```
Method: POST
URL: <https://queue.fal.run/fal-ai/kling-video/v1.6/standard/image-to-video>

Header1:
Name: Authorization
Value: Key $FAL_AI_API_KEY

Header2:
Name: Content-Type
Value: application/json

JSON:
{
  "prompt": "{{ $( 'Image Prompt').item.json.text }}",
  "image_url": "{{ $json.images[0].url }}",
  "duration": "5",
  "aspect_ratio": "9:16",
  "negative_prompt": "blur, distort, and low quality"
}
```
14. 영상 생성시까지 대기하기

15. 영상 주소 가져왹
```
Method:
GET
URL: <https://queue.fal.run/fal-ai/kling-video/requests/{{> $json.request_id }}
```
16. 효과음 프롬프트 생성
```
// prompt
이미지 프롬프트에 어울리는 효과음을 생성해주세요.

요구사항 :
1. 결과물은 영어로 5-10 단어로 간결하게 생성할 것
2. 큰따옴표("")는 사용하지 않음
3. 사람의 목소리가 생성될 가능성이 있는 프롬프트가 나와서는 안 됨
4. 프롬프트는 영어로 생성함
5. Only Plain Text

예시:
A howling desert wind sweeping across the dunes

이미지 프롬프트:
{{ $('Image Prompt').item.json.text }}
```
17. 효과음 생성
```
Method: POST
URL: <https://queue.fal.run/fal-ai/elevenlabs/sound-effects>

Header1:
Name: Authorization
Value: Key $FAL_AI_API_KEY

Header2:
Name: Content-Type
Value: application/json

JSON:
{
  "text": "{{ $json.text }}",
  "duration_seconds": "5"
}
```
18. 효과음 생성 대기

19. 효과음 가져오기

20. 3개의 input merge 하기
 - 총 11개의 아이템으로 머지

21. Aggregate 하기
 - 11개의 input을 1개의 output으로 합침

22. field edit 하기
 - creatomate 에 호출할때 필요한 인자 구성
```
{
  "scene1": "{{ $json.data[1].video.url }}",
  "scene2": "{{ $json.data[2].video.url }}",
  "scene3": "{{ $json.data[3].video.url }}",
  "scene4": "{{ $json.data[4].video.url }}",
  "scene5": "{{ $json.data[5].video.url }}",
  "sound1": "{{ $json.data[6].audio.url }}",
  "sound2": "{{ $json.data[7].audio.url }}",
  "sound3": "{{ $json.data[8].audio.url }}",
  "sound4": "{{ $json.data[9].audio.url }}",
  "sound5": "{{ $json.data[10].audio.url }}",
  "narration": "{{ $json.data[0].audio.url }}"
} 
```
23. creatomate 템플릿 만들기
```
{
  "output_format": "mp4",
  "width": 1080,
  "height": 1920,
  "frame_rate": "30 fps",
  "elements": [
    {
      "id": "31f4c807-79b9-43df-b19d-ae6287702fbe",
      "name": "Composition1",
      "type": "composition",
      "track": 1,
      "time": 0,
      "elements": [
        {
          "id": "fb46fa9b-6df3-408c-b246-bbda7770a700",
          "name": "scene1",
          "type": "video",
          "track": 1,
          "time": 0,
          "duration": null,
          "width": 1080,
          "height": 1920,
          "source": "",
          "dynamic": true
        },
        {
          "id": "299b0b17-d2ed-4e17-b048-8cc7191b74c6",
          "name": "audio1",
          "type": "audio",
          "track": 2,
          "time": 0,
          "duration": null,
          "source": "",
          "dynamic": true
        }
      ]
    },
    {
      "id": "d567cdeb-3496-4c1a-abdd-5c49ede973db",
      "name": "Composition2",
      "type": "composition",
      "track": 1,
      "duration": 5,
      "elements": [
        {
          "id": "cf53edb6-744a-49ca-86a2-51c18c53cb5d",
          "name": "scene2",
          "type": "video",
          "track": 1,
          "time": 0,
          "duration": null,
          "width": 1080,
          "height": 1920,
          "source": "",
          "dynamic": true
        },
        {
          "id": "23068365-2862-4832-80d9-88a9a38ea478",
          "name": "audio2",
          "type": "audio",
          "track": 2,
          "time": 0,
          "duration": null,
          "source": "",
          "dynamic": true
        }
      ]
    },
    {
      "id": "8c435d6b-42f9-42ae-bb27-442209135a73",
      "name": "Composition3",
      "type": "composition",
      "track": 1,
      "elements": [
        {
          "id": "d53c7075-47d6-4008-a25f-3af3be01d1e7",
          "name": "scene3",
          "type": "video",
          "track": 1,
          "time": 0,
          "duration": null,
          "width": 1080,
          "height": 1920,
          "source": "",
          "dynamic": true
        },
        {
          "id": "c81653a9-f21d-48b8-a773-493ec6872360",
          "name": "audio3",
          "type": "audio",
          "track": 2,
          "time": 0,
          "duration": null,
          "source": "",
          "dynamic": true
        }
      ]
    },
    {
      "id": "bdc13248-7b5d-43e4-a683-e359bfe2dbab",
      "name": "Composition4",
      "type": "composition",
      "track": 1,
      "elements": [
        {
          "id": "50327005-ea46-4c18-b996-9de1d7667431",
          "name": "scene4",
          "type": "video",
          "track": 1,
          "time": 0,
          "duration": null,
          "width": 1080,
          "height": 1920,
          "source": "",
          "dynamic": true
        },
        {
          "id": "326019de-b935-41d9-bbd8-4bbfe9f6b475",
          "name": "audio4",
          "type": "audio",
          "track": 2,
          "time": 0,
          "duration": null,
          "source": "",
          "dynamic": true
        }
      ]
    },
    {
      "id": "bded53b4-b93c-43b7-8e37-7fed5b47573e",
      "name": "Composition5",
      "type": "composition",
      "track": 1,
      "elements": [
        {
          "id": "1733d369-fe54-41bf-8448-8220f4a1af86",
          "name": "scene5",
          "type": "video",
          "track": 1,
          "time": 0,
          "duration": null,
          "width": 1080,
          "height": 1920,
          "source": "",
          "dynamic": true
        },
        {
          "id": "b909ee5d-6743-497b-a66e-f2139e96716c",
          "name": "audio5",
          "type": "audio",
          "track": 2,
          "time": 0,
          "duration": null,
          "source": "",
          "dynamic": true
        }
      ]
    },
    {
      "id": "1b4181d2-c566-431a-bbd8-e31f731f55b4",
      "name": "narration",
      "type": "audio",
      "track": 2,
      "time": 0,
      "source": "",
      "dynamic": true
    },
    {
      "id": "8d31bdad-193f-4538-9729-ca9d83d40406",
      "name": "subtitle",
      "type": "text",
      "track": 3,
      "time": 0,
      "y": "70.1132%",
      "width": "93.0002%",
      "height": "17.5593%",
      "font_family": "Noto Sans KR Bold",
      "background_color": "#000000",
      "transcript_source": "narration",
      "transcript_color": "#ffffff",
      "fill_color": "#ffffff",
      "stroke_color": "#000000",
      "stroke_width": 2,
      "clip": true
    }
  ]
}
```
24. curl 로 api 호출 json 구성
 - creatomate api key 추가(Bearer 토큰)
 - json 인자값에 이전에 받은 소스 추가
```
curl -X POST <https://api.creatomate.com/v1/renders> \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer 8a9d8c5842ca4298ac2cb234f6d07b9f715f99785183bb94b3f749d43a88d87bc1840711296916c13c3233b2daf19323" \
     -d '{
  "template_id": "04240e6b-542c-4e1a-ad19-5bc85fae2b49",
  "modifications": {
    "scene1.source": "",
    "audio1.source": "",
    "scene2.source": "",
    "audio2.source": "",
    "scene3.source": "",
    "audio3.source": "",
    "scene4.source": "",
    "audio4.source": "",
    "scene5.source": "",
    "audio5.source": "",
    "narration.source": ""
  }
}'
```
25. 구글 시트에 완성된 url 업데이트
 - google sheet node 사용
 - map each column manualy row_number
 - 초반에 가져온 구글시트 row number 지정
 - status "생성완료" 처리



### 이후 발행 프로세스
<img width="1132" height="781" alt="image" src="https://github.com/user-attachments/assets/2d6f0c68-1454-4dd8-a291-bc625f381209" />

1. 스케쥴 트리거 추가
2. 구글 시트 url 가져오기
3. url 호출
4. 유튜브 업로드
  - youtube v3 api 활성화 후 범위 설정필요
<img width="1728" height="963" alt="image" src="https://github.com/user-attachments/assets/ef893853-61a7-4b29-9fde-b62bbfd7177f" />


5. 업로드된 영상에 코멘트 달기
```
Method: POST
URL: <https://www.googleapis.com/youtube/v3/commentThreads?part=snippet>

Authentication: Youtube OAuth2 API

Name: Content-Type
Value: application/json

JSON:
{
  "snippet": {
    "videoId": "{{ $json.uploadId }}",
    "topLevelComment": {
      "snippet": {
        "textOriginal": "{{ $( 'Download Video').item.json.Caption }}"
      }
    }
  }
}
```


## 참고
- https://www.youtube.com/@sihyun_adventure/videos 



## 끝

n8n은 노코드/로우코드 방식으로 다양한 앱과 서비스를 연결하여 워크플로우를 자동화하고, 특히 AI 기능과의 연동을 통해 더욱 스마트한 업무 처리를 가능하게 하고 

반복적인 작업을 줄이고 효율을 극대화하고 싶다면, n8n은 최고의 선택이 될 것



