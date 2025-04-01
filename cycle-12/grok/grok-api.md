# Grok api 통해 Deep Dive하기

> [코드 예제](https://github.com/dunz/grok-tuto/tree/main)

## 순서
1. 결제카드 등록하기
2. api 키 생성

## 모델
현재 제공하는 모델은 두가지가 있다
- `grok-2-1212`
  - 필터링되지 않은 통찰력과 원시 인텔리전스를 제공하는 당사의 주력 상품 LLM
- `grok-2-vision-1212`
 - 문서 및 사진과 같은 다양한 시각적 입력을 처리하는 데 탁월한 최신 이미지 이해LLM

> 두가지 모델 모두 100만 토큰당 in/output 비용 $2 / $10
> - openai 4o: $2.5 / $10
> - openai o1: $15 / $60
> - openai 4o: $75 / $150
> - claude 3.7 Sonnet: $3 / $15
> - claude 3.7 Opus: $15 / $75

아직 api용 grok3 모델은 comming soon

## Start
xAI API는 OpenAI 및 Anthropic SDK 모두와 호환되고.
단 세 줄의 코드만으로 Grok을 사용하도록 전환할 수 있다

```ts
import OpenAI from "openai";
    
const client = new OpenAI({
  apiKey: $XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

const completion = await client.chat.completions.create({
  model: "grok-2-latest",
  ...
});
```

### api 비용 청구 우선순위
1. 무료/프로모션 크레딧
2. 선불 크레딧
3. 월별 청구서 청구(청구서 지출 한도 > $0인 경우) (선불 크레딧 결제후 활성화 가능)

### 소비량을 계산하는 기본 단위 — 토큰
- 토큰은 모델 추론 및 가격 책정을 위한 프롬프트 크기의 기본 단위
- 하나 이상의 문자/기호로 구성
- 모델이 요청을 처리할 때 입력 프롬프트는 토크나이저를 통해 토큰 목록으로 분해
- 그런 다음 모델은 프롬프트 토큰을 기반으로 추론하고 완료 토큰을 생성
- 추론이 완료되면 완료 토큰이 집계되어 사용자에게 다시 전송되는 완료 응답

### Tokenizer
- xAI 콘솔에서 Tokenizer를 통해 토큰을 시각화하고 지정된 텍스트 프롬프트에 대한 총 토큰 수를 계산할 수 있다
- 토큰은 전체 단어 또는 더 작은 문자 조합 덩어리
- 단어가 흔할수록 전체 토큰일 가능성이 높아짐
- 모델에 따라 동일한 양의 토큰을 갖지 않을 수 있다

한글 토큰
<img width="1243" alt="스크린샷 2025-03-22 오후 2 42 32" src="https://github.com/user-attachments/assets/31751770-acf6-4155-a8ee-427c8a4adb1c" />

영문 토큰
<img width="1219" alt="스크린샷 2025-03-22 오후 2 42 39" src="https://github.com/user-attachments/assets/5364ebcb-be31-47e8-abbb-d942d7231bfb" />

### 토큰 사용량 확인
```ts
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: "<api key>",
    baseURL: "https://api.x.ai/v1",
});

const completion = await openai.chat.completions.create({
    model: "grok-2-latest",
    messages: [
        {
            role: "system",
            content:
                "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
        },
        {
            role: "user",
            content:
                "What is the meaning of life, the universe, and everything?",
        },
    ],
});

console.log(completion.usage);
```

각 완료 응답에는 프롬프트 및 완료 토큰 수를 자세히 설명하는 `usage` 개체가 있다
```json
"usage": {
  "prompt_tokens": 41,
  "completion_tokens": 87,
  "total_tokens": 128,
  "prompt_tokens_details": {
    "text_tokens": 41,
    "audio_tokens": 0,
    "image_tokens": 0,
    "cached_tokens": 0
  }
}
```

## Api Usage
- 각 모델에는 하나 이상의 입력 및 출력 기능이 있을 수 있다

### `text` input 모델의 예시

```json
[
  {
    "role": "system",
    "content": "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy."
  },
  {
    "role": "user",
    "content": "What is the meaning of life, the universe, and everything?"
  }
]
```

### `text` 및 `image` input 모델의 예시
```json
[
  {
    "role": "user",
    "content": [
      {
        "type": "image_url",
        "image_url": {
          "url": "data:image/jpeg;base64,<base64_image_string>",
          "detail": "high"
        },
      },
      {
        "type": "text",
        "text": "Describe what's in this image."
      }
    ]
  }
]

```

### 대표적 기능
- 스트림 응답
  - SSE(Server-Sent Envets)를 사용하여 스트리밍 응답으로 실시간 피드백을 제공하는 데 유용하며, 텍스트가 생성될 때 표시될 수 있도록 하여 사용자 상호 작용을 향상시킴
- 지연된 채팅 완료
  - 지연된 채팅 완료를 사용하면 채팅 완료를 생성하고, `response_id`를 받고, 나중에 응답을 검색할 수 있다. 결과는 24시간 이내에 정확히 한 번 요청할 수 있으며 그 이후에는 폐기
- 요청 병렬화
  - `AsyncOpenAI`를 사용하여 여러 요청을 동시에 보내 비동기적으로 일괄 처리하고 처리하여 전체 실행 시간을 크게 줄일 수 있다

## 이미지 생성
채팅과 다르게 이미지의 엔드포인트는 아래와 같다
- chat: https://api.x.ai/v1/chat/completions
- image: https://api.x.ai/v1/images/generations

**SDK 예시**
```ts
import os

from openai import OpenAI

XAI_API_KEY = os.getenv("XAI_API_KEY")
client = OpenAI(base_url="https://api.x.ai/v1", api_key=XAI_API_KEY)

response = client.images.generate(
  model="grok-2-image",
  prompt="A girl in a tree"
)

print(response.data[0].url)
```

`response.data` 응답
```ts
[
  {
    url: 'https://imgen.x.ai/xai-imgen/xai-tmp-imgen-7ff79884-6495-40f8-ad1d-9b86f4cb88cd.jpeg',
    revised_prompt: 'A high-resolution photograph of a young girl with long, curly brown hair sitting in a lush, green tree during the daytime. She is wearing a light summer dress and has a content expression on her face. The scene is set in a peaceful forest with other trees visible in the background, under a clear blue sky with a few clouds. The lighting is soft and natural, emphasizing the serene environment without any distracting elements. The focus is primarily on the girl, with the surrounding foliage providing a rich, natural backdrop.'
  }
]
```

![image](https://github.com/user-attachments/assets/c1cc7797-78f3-404e-b700-6c04d6562df2)

<변경된 프롬프트>
> A high-resolution photograph of a young girl with long, curly brown hair sitting in a lush, green tree during the daytime. She is wearing a light summer dress and has a content expression on her face. The scene is set in a peaceful forest with other trees visible in the background, under a clear blue sky with a few clouds. The lighting is soft and natural, emphasizing the serene environment without any distracting elements. The focus is primarily on the girl, with the surrounding foliage providing a rich, natural backdrop.


- 생성된 이미지는 jpg 형식
- `revised_prompt` 응답필드로 실제 요청시 전송된 개선 및 수정된 프롬프트를 확인할 수 있다
- 이미지 url이 아닌 `b64_json` 응답으로도 받을수 있음
- `n` 파라미터를 통해 여러 이미지 생성 요청 가능

## Function calling
xAI 모델을 외부 도구 및 시스템에 연결하여 AI 어시스턴트 및 다양한 통합을 구축

실제 호출 사례
- 축구 경기 결과 조회부터 실시간 위성 위치 데이터 가져오기에 이르기까지 다양한 작업을 위해 공개 API 호출
- 내부 데이터베이스 분석
- 웹 페이지 찾아보기
- 코드 실행
- 실제 세계와의 상호 작용(예: 항공권 예약, Tesla 자동차 문 열기, 로봇 팔 제어)

**<플로우>**
![image](https://github.com/user-attachments/assets/12e5e48a-ddf0-4918-a18b-9cfa1b5bbc65)

1. 함수를 정의 해둔다
2. 메시지와 함수정의 포함해 요청한다
3. 모델이 적절한 함수를 선택해서 응답한다
4. 선택한 함수를 직접 실행한 결과값을 이전 요청 메시지와 응답을 포함한 메시지 히스토리에 추가한다
5. 메시지 히스토리를 가지고 새로운 요청을 한다
6. 모델은 최종 응답을 한다
7. ... 응답에 tool_calls 가 있다면 위 동작을 반복할 수 있음


<예시>
```py
import json

from pydantic import BaseModel, Field
from typing import Literal

import os
from dotenv import load_dotenv
from openai import OpenAI

# .env 파일 로드
load_dotenv()
XAI_API_KEY = os.getenv("XAI_API_KEY")

# ============================================ tool 선언 부 ============================================ # 
# 함수 및 파라미터 정의
class TemperatureRequest(BaseModel):
    location: str = Field(description="The city and state, e.g. San Francisco, CA")
    unit: Literal["celsius", "fahrenheit"] = Field(
        "fahrenheit", description="Temperature unit"
    )

class CeilingRequest(BaseModel):
    location: str = Field(description="The city and state, e.g. San Francisco, CA")

def get_current_temperature(**kwargs):
    request = TemperatureRequest(**kwargs)
    temperature: int
    if request.unit.lower() == "fahrenheit":
        temperature = 59
    elif request.unit.lower() == "celsius":
        temperature = 15
    else:
        raise ValueError("unit must be one of fahrenheit or celsius")
    return {
        "location": request.location,
        "temperature": temperature,
        "unit": request.unit.lower(),
    }

def get_current_ceiling(**kwargs):
    request = CeilingRequest(**kwargs)
    return {
        "location": request.location,
        "ceiling": 15000,
        "ceiling_type": "broken",
        "unit": "ft",
    }


# JSON 스키마 생성
get_current_temperature_schema = TemperatureRequest.model_json_schema()
get_current_ceiling_schema = CeilingRequest.model_json_schema()

# Pydantic JSON 스키마를 사용한 매개변수 정의
tools_definition = [
    {
        "type": "function",
        "function": {
            "name": "get_current_temperature",
            "description": "Get the current temperature in a given location",
            "parameters": get_current_temperature_schema,
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_current_ceiling",
            "description": "Get the current cloud ceiling in a given location",
            "parameters": get_current_ceiling_schema,
        },
    },
]

tools_map = {
    "get_current_temperature": get_current_temperature,
    "get_current_ceiling": get_current_ceiling,
}


# ============================================ 메시지 전송 부 ============================================ #

client = OpenAI(
    api_key=XAI_API_KEY,
    base_url="https://api.x.ai/v1",
)

messages = [{"role": "user", "content": "What's the temperature like in San Francisco?"}]
response = client.chat.completions.create(
    model="grok-2-latest",
    messages=messages,
    tools=tools_definition,  # The dictionary of our functions and their parameters
    tool_choice="auto",
)

# tool_calls가 포함된 응답을 확인할 수 있다
# print(response.choices[0].message)

# ============================================ 추가 메시지 전송 부 ============================================ #

# 도구 호출을 포함한 보조 메시지를 메시지에 추가한다
messages.append(response.choices[0].message)

# 응답 본문에 도구 호출이 있는지 확인한다
# 또한 이것을 함수로 감싸서 코드를 더 깔끔하게 만들 수도 있다

if response.choices[0].message.tool_calls:
    for tool_call in response.choices[0].message.tool_calls:

        # Grok이 호출하려는 도구 함수 이름과 인수를 가져온다
        function_name = tool_call.function.name
        function_args = json.loads(tool_call.function.arguments)

        # 이전에 정의한 도구 함수 중 하나를 인수와 함께 호출한다
        result = tools_map[function_name](**function_args)

        # 도구 함수 호출의 결과를 채팅 메시지 기록에 추가한다
        # with "role": "tool"
        messages.append(
            {
                "role": "tool",
                "content": json.dumps(result),
                "tool_call_id": tool_call.id  # Grok의 응답에 제공된 tool_call.id
            }
        )

response = client.chat.completions.create(
    model="grok-2-latest",
    messages=messages,
    tools=tools_definition,
    tool_choice="auto"
)

print('history:: ', messages)
print(response.choices[0].message)

```

<메시지 히스토리>
```sh
[
  {'role': 'user', 'content': "What's the temperature like in San Francisco?"},
  ChatCompletionMessage(content='I am retrieving the current temperature in San Francisco.', refusal=None, role='assistant', annotations=None, audio=None, function_call=None, tool_calls=[ChatCompletionMessageToolCall(id='call_83661873', function=Function(arguments='{"location":"San Francisco, CA"}', name='get_current_temperature'), type='function')]),
  {'role': 'tool', 'content': '{"location": "San Francisco, CA", "temperature": 59, "unit": "fahrenheit"}', 'tool_call_id': 'call_83661873'}
]
```

<최종 응답>
```sh
ChatCompletionMessage(content="The current temperature in San Francisco is 59 degrees Fahrenheit. Is there anything else you'd like to know?", refusal=None, role='assistant', annotations=None, audio=None, function_call=None, tool_calls=None)
```

## Structured outputs
구조적 출력(Structured Outputs)은 API가 JSON 또는 사용자가 정의한 다른 스키마와 같은 구체적이고 조직화된 형식으로 응답을 반환할 수 있도록 하는 기능
자유 형식 텍스트를 가져오는 대신 일관되고 구문 분석하기 쉬운 데이터를 받을 수 있다

문서 구문 분석, 엔터티 추출 또는 보고서 생성과 같은 작업에 이상적이며 다음과 같은 도구를 사용하여 스키마를 정의할 수 있습니다
(`Pydantic` 또는 `Zod`는 데이터 유형, 제약 조건 및 구조를 적용)

- Structured Outputs의 일반적인 사용 사례는 원시 문서를 구문 분석하는 것
예를 들어, 인보이스에는 공급업체 세부 정보, 금액 및 날짜와 같은 구조화된 데이터가 포함되어 있지만
원시 텍스트에서 이 데이터를 추출하면 오류가 발생하기 쉽고 구조적 출력은 추출된 데이터가 사전 정의된 스키마와 일치하는지 확인함

### 1. 스키마 정의
```js
import { z } from "zod";

const CurrencyEnum = z.enum(["USD", "EUR", "GBP"]);

const LineItemSchema = z.object({
  description: z.string().describe("Description of the item or service"),
  quantity: z.number().int().min(1).describe("Number of units"),
  unit_price: z.number().min(0).describe("Price per unit"),
});

const AddressSchema = z.object({
  street: z.string().describe("Street address"),
  city: z.string().describe("City"),
  postal_code: z.string().describe("Postal/ZIP code"),
  country: z.string().describe("Country"),
});

const InvoiceSchema = z.object({
  vendor_name: z.string().describe("Name of the vendor"),
  vendor_address: AddressSchema.describe("Vendor's address"),
  invoice_number: z.string().describe("Unique invoice identifier"),
  invoice_date: z.string().date().describe("Date the invoice was issued"),
  line_items: z.array(LineItemSchema).describe("List of purchased items/services"),
  total_amount: z.number().min(0).describe("Total amount due"),
  currency: CurrencyEnum.describe("Currency of the invoice"),
})
```

### 2. 프롬프트 준비
**시스템 프롬프트**
- 시스템 프롬프트는 텍스트에서 송장 데이터를 추출하도록 모델에 지시
- 스키마가 별도로 정의되기 때문에 프롬프트는 출력 JSON에서 필수 필드를 명시적으로 지정하지 않고 작업에 집중할 수 있다

```
Given a raw invoice, carefully analyze the text and extract the relevant invoice data into JSON format.
// 원시 송장이 주어지면 텍스트를 신중하게 분석하고 관련 송장 데이터를 JSON 형식으로 추출합니다.
```

### 3. 요청
`response_format` 필드에 스키마를 전달

```js
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

...

const client = new OpenAI({
  apiKey: "<api key>",
  baseURL: "https://api.x.ai/v1",
});

const completion = await client.beta.chat.completions.parse({
  model: "grok-2-latest",
  messages: [
    { role: "system", content: "Given a raw invoice, carefully analyze the text and extract the invoice data into JSON format." },
    { role: "user", content: `
      Vendor: Acme Corp, 123 Main St, Springfield, IL 62704
      Invoice Number: INV-2025-001
      Date: 2025-02-10
      Items:
      - Widget A, 5 units, $10.00 each
      - Widget B, 2 units, $15.00 each
      Total: $80.00 USD
    ` },
  ],
  response_format: zodResponseFormat(InvoiceSchema, "invoice"),
});

const invoice = completion.choices[0].message.parsed;
console.log(invoice);
```

### 4. 타입안전을 보장한 출력
```json
{
  "vendor_name": "Acme Corp",
  "vendor_address": {
    "street": "123 Main St",
    "city": "Springfield",
    "postal_code": "62704",
    "country": "IL"
  },
  "invoice_number": "INV-2025-001",
  "invoice_date": "2025-02-10",
  "line_items": [
    {"description": "Widget A", "quantity": 5, "unit_price": 10.0},
    {"description": "Widget B", "quantity": 2, "unit_price": 15.0}
  ],
  "total_amount": 80.0,
  "currency": "USD"
}
```

## Fingerprint
- xAI API에 대한 각 요청에 대해 응답 본문에는 고유한 `system_fingerprint`값이 포함된다
- 이 지문은 백엔드 시스템 구성의 현재 상태에 대한 식별자 역할을 함
```
{..., "system_fingerprint":"fp_6ca29cf396"}
```
시스템을 자동화하여 토큰 사용량 및 기타 메트릭과 함께 `system_fingerprint`를 추적할 수 있다

### 용도
- 시스템 변경 모니터링 :
  - 시스템 지문은 백엔드 구성에 대한 버전 제어 역할을 함
  - 모델 매개 변수, 서버 설정 또는 기본 인프라와 같은 백엔드 시스템의 일부가 변경되면 지문도 변경됨
  - 이를 통해 개발자는 시간이 지남에 따라 시스템이 언제 어떻게 발전했는지 추적할 수 있고 이는 디버깅, 성능 최적화 및 API 응답의 일관성을 보장하는 데 매우 중요
- 보안 및 무결성:
  - 지문은 응답의 무결성을 보장하는 데 사용할 수 있다
  - 응답의 지문이 최근 시스템 구성을 기반으로 예상되는 지문과 일치하는 경우 전송 중에 데이터가 변조되지 않았는지 또는 서비스가 손상되지 않았는지 확인하는 데 도움이 됨
  - 지문은 시간이 지남에 따라 변경됨
- 규정 준수 및 감사:
  - 규제된 환경의 경우 이 지문은 감사 추적의 일부로 사용될 수 있으며, 규정 준수 목적으로 특정 구성이 사용된 시기를 보여줌

## Reference
- home: https://x.ai
- console: https://console.x.ai
- docs https://docs.x.ai
- tutorials: https://github.com/dunz/grok-tuto
