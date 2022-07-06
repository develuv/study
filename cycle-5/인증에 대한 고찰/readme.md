# 여러분들의 인증은 안녕 하신가요?

목차
1. 우리에게 익숙한 인증.
2. OAuth에 대해서
2. 글로벌 테크 기업은 어떻게 자사 인증을 구현 했을까?
3. 도메인 정책 (유니버스 개념)
   - Google vs Youtube
   - Facebook vs instagram
   - Naver vs Band



<br />
<br />

# 1. 우리에게 익숙한 인증

##  STOVE

### 로그인

`Request`
```sh
POST https://member.onstove.com/auth/signin

// form data
user_id: stove1jjang@gmail.com
user_pwd: xxxxxxxx
forever: false
captcha_response: 
redirect_url: https://www.onstove.com/
inflow_path: NONE
game_no: 0
```


`Response`
```sh
// response header
set-cookie: HD=eyJhbGciOiJIUzI1NiJ9; Domain=.onstove.com; Path=/
set-cookie: PLD=eyJleHBpcmVfdGltZSI6MTY1NzEzOTQ1NDY3MSwibWVtYmVyX25vIjoxNzk2NDY1NiwiYXBwbGljYXRpb25fbm8iOjEwMDAyfQ; Domain=.onstove.com; Path=/
set-cookie: SIGN=dc00Qao2e1nBayCDANfD-dxEMxUMZDq3WZU3p76L8UGdSYMYTRYk59p6YPXKHaqsDg_0x9_hiNpqERFFf5YNlmSJDAjZsb8X-_pOPYsZBozPpngOZhDWlZJa-pNM9HiTcYabRNw5s5xnmVOeTIz-6BrkB-nRz6GoTbjugiqdFk9EUzCbbUce71POReNYi7VDXAeNmvmY7FoMrTWSwMHvtMemcTIYNjgbHHN6DuLKBVECQhVqYyVOL3iCjtzfxy24; Domain=.onstove.com; Path=/
set-cookie: RFT=dc00Qao2e1nBayCDANfD-dxEMxUMZDq3WZU3p76L8UGdSYMYTRYk59p6YPXKHaqsDg_0x9_hiNpqERFFf5YNlotrlNdj_QtlHkZBkLFamk9f0dKcDueG1g86rww693aStB6JFFaYKOannrodznuIpk9yU42lfzDbl3Ii-CPm0cHdzN6elZozLQGyQNFPqBDymLGzeZWkqxZbsxjUoHDCigQ7dg8T7UzIfL31lYPNE5o; Domain=.onstove.com; Path=/
set-cookie: SURT=dc00Qao2e1nBayCDANfD-dxEMxUMZDq3WZU3p76L8UGdSYMYTRYk59p6YPXKHaqsDg_0x9_hiNpqERFFf5YNlotrlNdj_QtlHkZBkLFamk9f0dKcDueG1g86rww693aStB6JFFaYKOannrodznuIpk9yU42lfzDbl3Ii-CPm0cHdzN6elZozLQGyQNFPqBDymLGzeZWkqxZbsxjUoHDCigQ7dg8T7UzIfL31lYPNE5o; Domain=.onstove.com; Path=/
set-cookie: FOREVER=N; Domain=.onstove.com; Expires=Wed, 06-Jul-2022 20:30:54 GMT; Path=/

// response body
```

<br />

(토근 발급 이후 API 호출시..)
1. axios request interceptor에서 `PLD`, `SIGN`, `HD` 이걸 cookie 가져옴
2. token 규칙에 맞게 셋팅하여, request header에 `authorization: Bearer ....` 추가함

<br />

### 프로필 정보
`Request`
```sh
GET https://auth.onstove.com/v1.0/common/session?properties=[%22country_cd%22,%22person_verify_yn%22,%22parent_verify_yn%22,%22user_id%22]&timestemp=1657117849085

:authority: auth.onstove.com
:method: GET
:path: /v1.0/common/session?properties=[%22country_cd%22,%22person_verify_yn%22,%22parent_verify_yn%22,%22user_id%22]&timestemp=1657117849085
:scheme: https
accept: application/json, text/plain, */*
accept-encoding: gzip, deflate, br
accept-language: ko,en;q=0.9,en-US;q=0.8,ko-KR;q=0.7
authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVfdGltZSI6MTY1NzEzOTQ1NDY3MSwibWVtYmVyX25vIjoxNzk2NDY1NiwiYXBwbGljYXRpb25fbm8iOjEwMDAyfQ.dc00Qao2e1nBayCDANfD-dxEMxUMZDq3WZU3p76L8UGdSYMYTRYk59p6YPXKHaqsDg_0x9_hiNpqERFFf5YNlmSJDAjZsb8X-_pOPYsZBozPpngOZhDWlZJa-pNM9HiTcYabRNw5s5xnmVOeTIz-6BrkB-nRz6GoTbjugiqdFk9EUzCbbUce71POReNYi7VDXAeNmvmY7FoMrTWSwMHvtMemcTIYNjgbHHN6DuLKBVECQhVqYyVOL3iCjtzfxy24
```

`Response`
```json
{"value":{"access_token":"eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVfdGltZSI6MTY1NzEzOTQ1NDY3MSwibWVtYmVyX25vIjoxNzk2NDY1NiwiYXBwbGljYXRpb25fbm8iOjEwMDAyfQ.dc00Qao2e1nBayCDANfD-dxEMxUMZDq3WZU3p76L8UGdSYMYTRYk59p6YPXKHaqsDg_0x9_hiNpqERFFf5YNlmSJDAjZsb8X-_pOPYsZBozPpngOZhDWlZJa-pNM9HiTcYabRNw5s5xnmVOeTIz-6BrkB-nRz6GoTbjugiqdFk9EUzCbbUce71POReNYi7VDXAeNmvmY7FoMrTWSwMHvtMemcTIYNjgbHHN6DuLKBVECQhVqYyVOL3iCjtzfxy24","expire_in":21599,"refresh_token":"dc00Qao2e1nBayCDANfD-dxEMxUMZDq3WZU3p76L8UGdSYMYTRYk59p6YPXKHaqsDg_0x9_hiNpqERFFf5YNlotrlNdj_QtlHkZBkLFamk9f0dKcDueG1g86rww693aStB6JFFaYKOannrodznuIpk9yU42lfzDbl3Ii-CPm0cHdzN6elZozLQGyQNFPqBDymLGzeZWkqxZbsxjUoHDCigQ7dg8T7UzIfL31lYPNE5o","game_no":null,"application_no":10002,"login_country_cd":"KR","provider_cd":"SO","region":"VIRGINIA","member":{"country_cd":"KR","user_id":"stove1jjang@gmail.com","member_no":17964656,"nickname":"지성이","person_verify_yn":"Y","parent_verify_yn":"N"}},"message":"OK","result":"000"}
```

<br />
<br />


##  WANTED

### 로그인

`Request`
```sh
POST https://www.wanted.co.kr/api/v3/auths
wanted-user-agent: user-web
wanted-user-country: KR
wanted-user-language: ko

{
 email: "sungkwang@wantedlab.com",
 password: "xxxxx",
 platform: "web",
}
```


`Response`
```json
{
    "user": {
        "comment": "",
        "username": "\uae40\uc131\uad11",
        "expected_salary": null,
        "is_signup": false,
        "fb_id": null,
        "linkedin": "",
        ....
        "mobile": "+821036823066",
        "accept_event_email": true,
        "annual": 4,
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YW50ZWQiLCJpYXQiOjE2NTcxMTg0MzUsInVzZXJfaWQiOjExNTYyNzMsImlzX2FkbWluIjp0cnVlfQ.pxdyT3Pan-FXYorrPPMTjggnutT14aNlDFvxA_MZpzw",
        .....
        ],
        "accept_terms_of_service": true
    }
}
```

**응답 받은 jwt를 js-cookie를 이용하여, 프론트에서 jwt cookie를 생성**

<br />

(토큰 발급 이후 API 호출시..)
1. axios request interceptor에서 `jwt` cookie 가져옴
2. request header에 `authorization: jwt ....` 추가함

<br />

### 알림 메세지 가져오기

`Request`
```
GET https://www.wanted.co.kr/api/chaos/notifications/v1/feed/status

authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YW50ZWQiLCJpYXQiOjE2NTcxMTg0MzUsInVzZXJfaWQiOjExNTYyNzMsImlzX2FkbWluIjp0cnVlfQ.pxdyT3Pan-FXYorrPPMTjggnutT14aNlDFvxA_MZpzw
cache-control: no-cache
cookie: uuid=3fcf-8140-283c-7c2d; _gcl_au=1.1.1757080434.1656389864; _fbp=fb.2.1656389864694.906526190; _vwo_uuid_v2=DD2894F1EE4B6F014C735E72BBCB18B70|46953b0dfc158c9c80539fe8d6106f19; _gaexp=GAX1.3.2NnSSEhtSeiazpeb-ojAbg.19231.1; _gid=GA1.3.359103706.1656899827; amp_00a215=-jy5XdC6ZXjattVqpA-kgo...1g73rqiir.1g73rqiir.e.9.n; __utmz=206863637.1656921010.10.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); ab.storage.deviceId.97672243-0e93-4d7d-890f-ea3507df4abe=%7B%22g%22%3A%22c31b988d-9ad5-9cdd-3b43-50c5774599ad%22%2C%22c%22%3A1646369322742%2C%22l%22%3A1657118307854%7D; ab.storage.userId.97672243-0e93-4d7d-890f-ea3507df4abe=%7B%22g%22%3A%221156273%22%2C%22c%22%3A1656921708276%2C%22l%22%3A1657118307854%7D; __utma=206863637.901555741.1656389865.1657110601.1657118310.16; __utmc=206863637; __utmt=1; clickKey=; profile_level=3; _dc_gtm_UA-62498866-1=1; _gat_UA-62498866-1=1; __utmb=206863637.4.10.1657118310; _ga=GA1.3.901555741.1656389865; remember_token=1156273|aa055cbc491ca909b4acc9ef08dc26c72afe4d44; session=eyJfZnJlc2giOnRydWUsIl9pZCI6eyIgYiI6Ik1HTTFPV1E1TkdNeU9UWmtOREJqWW1NNU5ESmxNak0wTXpneU5HSTBOVFE9In0sImlwIjoiMjcuMTE2LjE5Ny40MiIsImxhbmciOiJrbyIsInVzZXJfaWQiOiIxMTU2MjczIn0.FacwYw.-wBph3ZMBQJRBte6hasm2NH0KQA; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YW50ZWQiLCJpYXQiOjE2NTcxMTg0MzUsInVzZXJfaWQiOjExNTYyNzMsImlzX2FkbWluIjp0cnVlfQ.pxdyT3Pan-FXYorrPPMTjggnutT14aNlDFvxA_MZpzw; login_type=email; _ga_YKFMYZ2YXR=GS1.1.1657118310.20.1.1657118429.0; AWSALBTG=72ibB1m3wMMrh42GqpCFF+2Y0N66X83vx/8GQ10SxwkdOOjuAtvpqlskwzQLAffCmewD0aL9CYuSqoUfv/KP8Ei68YzrJYUofWBamWnj7Na45NBLF5Vuz+BItZ0Lbb7pFBg31pkm6Mly/6SUiwxoqhm9fuxeOGvJBJI9GjTnwvH6ITGI0PI=; AWSALBTGCORS=72ibB1m3wMMrh42GqpCFF+2Y0N66X83vx/8GQ10SxwkdOOjuAtvpqlskwzQLAffCmewD0aL9CYuSqoUfv/KP8Ei68YzrJYUofWBamWnj7Na45NBLF5Vuz+BItZ0Lbb7pFBg31pkm6Mly/6SUiwxoqhm9fuxeOGvJBJI9GjTnwvH6ITGI0PI=; AWSALB=2MKjnQUCkTlKWiUt7SrnIDGnaYPXEIwC5aICx0J/6SHWUusSZE1UNlOU8Sv4fOLRLVqvonvHCVmPCkXr1SpIybMF2Gwc7X98uQjXHfqP4IKANSQVbJBKNi0uqweH1ihZUMpxhBjWAfAfH94wCtSM1qrP7e1iGAIBzD4Km1VJK/Ewa+c81ig+az9y6Lw3Qw==; AWSALBCORS=2MKjnQUCkTlKWiUt7SrnIDGnaYPXEIwC5aICx0J/6SHWUusSZE1UNlOU8Sv4fOLRLVqvonvHCVmPCkXr1SpIybMF2Gwc7X98uQjXHfqP4IKANSQVbJBKNi0uqweH1ihZUMpxhBjWAfAfH94wCtSM1qrP7e1iGAIBzD4Km1VJK/Ewa+c81ig+az9y6Lw3Qw==; _ga_4XX1N5VVJ2=GS1.1.1657118310.18.1.1657118430.0; ab.storage.sessionId.97672243-0e93-4d7d-890f-ea3507df4abe=%7B%22g%22%3A%229d66f95a-ceeb-e986-122c-0883183e7b89%22%2C%22e%22%3A1657120231558%2C%22c%22%3A1657118307852%2C%22l%22%3A1657118431558%7D; wcs_bt=s_133d2f67e287:1657118431; utm=?t=1657118429376; amp_d08dcd=eiHqnJi5zm13QNW0hij9Sc.MTE1NjI3Mw==..1g79v5eh4.1g79v96p9.43.2e.6h; _dd_s=rum=2&id=89a01369-b904-4c8a-bf51-4205dddbf68f&created=1657118307619&expire=1657119332054
```


`Response`
```
{생략..}
```



## 현재 비효율적인 것.
1. API 요청시 header, cookie 같은 데이터를 중복으로 보내고 있다.
   - 1번 때문에 프론트에서 axios interceptor 로직이 꼭 필요하다.
2. 인증에서 토큰 정보가 변경 되었을때, 각각의 연동하는 서비스에서 변경이 발생한다.
   - stove 경우, access_token 조합 변경 된다든가 (HD.PLD.SIGN --> PLD.SIGN.HD)
   - wanted 경우, token의 만료타임이 변경 된다든가
3. 가장 큰 문제는 보안적인 측면! (`httpOnly`)

👉 보안적인 측면과 인증은 프론트(==연동 서비스)에 의존하고 있는 점이 문제!

<br />
<br />

### 이렇게 변화해야 하지 않을까? (== 방향성)
- 보안적인 측면을 최대한으로 끌어 올린다.
- 프론트에 의존하지 않아야 한다. (단일 책임 원칙)


<br />
<br />

> 왜 이렇게 되었을까? 고민...

<br />
<br />


# OAuth에 대해서 (== 상식을 살짝 넓히는 시간)
> OAuth 로고. 크리스 메시나가 설계함.
OAuth("Open Authorization")는 인터넷 사용자들이 비밀번호를 제공하지 않고 **👋 다른 웹사이트** 상의 자신들의 정보에 대해 웹사이트나 애플리케이션의 접근 권한을 부여할 수 있는 공통적인 수단으로서 사용되는, 접근 위임을 위한 개방형 표준이다.[1] 이 매커니즘은 여러 기업들에 의해 사용되는데, 이를테면 아마존,[2] 구글, 페이스북, 마이크로소프트, 트위터가 있으며 사용자들이 **👋 타사 애플리케이션이나 웹사이트의 계정에 관한 정보를 공유**할 수 있게 허용한다.
- 위키 피디아


> The OAuth 2.0 authorization framework enables a third-party
   application to obtain limited access to an HTTP service, either on
   behalf of a resource owner by orchestrating an approval interaction
   between the resource owner and the HTTP service, or by allowing the
   third-party application to obtain access on its own behalf.  This
   specification replaces and obsoletes the OAuth 1.0 protocol described
   in RFC 5849.

> OAuth 2.0 인증 프레임워크는 타사
   HTTP 서비스에 대한 제한된 액세스를 얻기 위한 애플리케이션
   승인 상호 작용을 조정하여 리소스 소유자를 대신하여
   리소스 소유자와 HTTP 서비스 간에 또는
   👋 타사 응용 프로그램이 자체적으로 액세스 권한을 얻습니다. 이것 사양은 설명된 OAuth 1.0 프로토콜을 대체하고 폐기합니다.
   RFC 5849 https://datatracker.ietf.org/doc/html/rfc6749

<br />

- 주목해야 할 단어 "타사"
![타사 뜻](./images/타사.png)


### 👉 서로 다른 두집단이 정보와 리소스를 안전하고 신뢰 할 수 있는 방법으로 공유할수 있게 해주는 방법을 (== 프로토콜)


<br />
<br />


## OAuth 탄생과 사용
- 2000 ~ 2006: Google, Yahoo, AOL, Amazon 각각 인증방식을 제작하여 사용
- 2007년: OAuth 1.0 탄생
- 2008년: 보안문제 해결한 OAuth 1.0 revision A
- 2010년: OAuth 1.0 프로토콜 IETF 표준안 발표
- 2012년: OAuth 2.0 draft
...



<br />

OAuth1.0에서 `access_token`의 개념이 생겼다!
![OAuth 1.0](./images/oauth1.png)


<br />

OAuth2.0 스펙문서에 보면 `access token`, `refresh token`의 개념 탑제 되었다.
![OAuth 2.0](./images/oauth2.png)


OAuth 2.0에서 웹에서 많이 사용되는 Authorization code 방식.

(중요하지 않음!) 많이 사용하는 방식

![OAuth 2.0](./images/authorization-code.png)

<br />
<br />
<br />


### OAuth 공급자들의 API를 살펴보자!

<br />

#### `Naver`
https://developers.naver.com/docs/login/devguide/devguide.md#5--%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%82%AC%EC%9A%A9%EC%9E%90-%ED%94%84%EB%A1%9C%ED%95%84-%EA%B0%B1%EC%8B%A0-%EB%B0%8F-%EC%9E%AC%EC%9D%B8%EC%A6%9D

접근 토큰(==로그인)에 대한 응답.

response body로 `JSON`!!?

![naver 개발자 센터](./images/naver-token-json.png)


<br />
본인 정보를 요청하는 API.

request header에 `Authorization`을 보내라고 한다!

![naver 개발자 센터](./images/authorization-header.png)


<br />
<br />

#### `Microsoft`

https://docs.microsoft.com/en-us/machine-learning-server/operationalize/how-to-manage-access-tokens

접근 토큰(==로그인)에 대한 응답.

response body로 `JSON`!!?
![ms 개발자 센터](./images/microsoft-token-json.png)


<br />
본인 정보를 요청하는 API를 호출 방법을 설명한다.

request header에 `Authorization`을 보내라고 한다!

![ms 개발자 센터](./images/microsoft-authorization-header.png)





## 🤔 자사의 인증도 이렇게 해야 할까?

<br />




# 글로벌 테크 기업은 자사 인증을 어떻게 구현했을까?
- google
- facebook
- naver






## Google
![Google](./images/google.png)

### 로그인 요청

`POST https://accounts.google.com/_/signin/challenge?hl=ko&TL=AM3QAYZwArTVuehKMDqCB2qNUynBK0ZQAYtX6pHPqLelSuvmIbPW49gJT7IAi409&_reqid=142137&rt=j`

```
ifkv: AU9NCcxr9cgQj49iu6WVi0ted3XUJqh2ZRukzougsA9QxGA9aUuGDAlYhu3cjhrOCvqp9_vMVJ6T
continue: https://www.google.com/
hl: ko
f.req: ["AEThLly9Jgnt5xlN91-5u7bMiX2ze-SpZ118dHRlNR1wnvgGiVHdffBsI-NVKrSVTXpq9-PdCUUCL5rIV27POfwsuxPXSZbaHoICAEPxevAF3fiY1gdECgH4_bThz6JFVmmntJUUKMQLqRe8vLHJvlu1E5oB6HIzXbIHvgT2s47N6WDRmYWdPc1UhWiGFaQCCl8LW_b5k9kQZyX0Zw9VfaiFg34xIqYilculBs6Nss4aim_FVS7t9qNBpzEE62zW0_zrzBwMfPeORk4cqpCxFz2hA8w9klaD9RE2aQjD03TjteNQBk-oAWko07ODdspsjfOT_-o0YX9GfkgZkZhvNuEcv6iD1WxtJyVpxKQDJibq4m8GIQadbsKyeOwkHy_V47NHSzm6CFEPVBNXzySb7lsq8YN1uG3OXgkZz8lSnAHPWKLO-ZbWcKMhpFO6OUaELBaVpcl7vyqVb828UzcAt_UcNyNkebbQwexCOKkloV9vDFmt1MC4p67kU1j3cge2rkA9UyTuzCU2Z3XCI4xnrFfEq6RyIyfJ51UsD6kEK5xXD6Moh6SIUMUKBuVtWP7CSq48d6WmtQQZmisjgnY2lpM-Ck3exAb2eV0Sp2EcLGByqaqpfmcvmPXAz2BdNvwXnaDUVm1YFASnR4y1u_BMGVXgvfgqeoVf4aJRI9XNjc9KeJWBFgr65t0iA7lAGzTer842edRLrsmQvUmB1k4rJVOE4NYHgAIATOTIKee9UFxvAnw6Ny4GUtxFe4c95DV9DlzIQohLSZHPej3yyzHidxUfUN98Vr_Lf2-Xy6TaaRz7pTdt7IZi_oIcH1wp60ZTknGvGZ25H4w9CFlhlINSFTwceLvFC4o7WcTacZgCnZdLI58m2Q44NC_R9uognr130KnJminCfgGPkH4iUzRqDpk6KByPGsC4YWqtJl9wou3ulptbVA158zc",null,1,null,[1,null,null,null,["qortkddj!234",null,true]]]
bgRequest: ["identifier","<M_9q_7ICAAZ_dfp3X3WN-u2s_s1wPqb0ACkAIwj8RogGFwAhUQO69DJkCRZJ4eErIsKxptezrxF1B1KlsOgcW9QKmc0AAABmnQAAAAOnAQdWBNbqvjnQxu3LMNhbPfpf5vokNZ3Ib9nHKdXGj_LpQ5sgK22eWahq74XA7Nscx4jxj05q6l1YpNl0KUiDy_nWwV5U80IymV4H1-RlXGxsnB8INRFL-4XWJ9RSLVqwRwsz-8IFnLDc_WzMD0R-dSDNZvu9E8-7UGmMz2IOXsWkHG-rvK3ddMfTg1ap1FPEIMkAnaTB-oaZV0fT3YZy6CEeQhjnc1PrTrxGXSbStZhICIB4H_sFNTYsiJnA6w_i95e4NsuZ4wJBcQPr8KanQcj-JXNG2uvVioJKqnPNQIcUSGldc3pak6djl2b-MHvENMHU5dIYm5QEIjsbxXc0I7z1Q3H0lb5OrrSy7LoUke9_WRv-pZRBz_zADM_20C5xgWwdl8fuFM-rc5krMS2YcxX1DEMvcRzST4bRIzqT3py2osIsCeA_5byKgN0ynbQc5-8h70K-4kXAoPEqcUR_6QJq4ReJnAEKBG9KFegzv6p2PVWIFtYzYQ12uf6y0G0oBcivG2a_O4riuYUF9co6yiFik5zM8q5f7HoQnlCXnuKvYaXSkHB-jvIOJOyGEMtpmnslH5pps5toAimuILSRdn4tIQpkV1e1ljIbtd90xCHBQCTP7Y0rhEEM3NaYUfJiW_GN89OmIqEYOz6k4yoTi4LaZSXFfMfkp2j8ubNG4YBDJt2Cj-Ic_QO-lfeolTeIlxci5OpsF2myLKQuCVT2XIQZu8hOR9Lj13kkbjLO_IGisMMrwiYRVoqOqUVBfcElE7_kjXFxQobVhaNGKWKlYNTmwShbuH3eyqEgJDHEMYqQuhECEvT7vq_1yIzQIRAMvz7YUpcc1DH_TWQaa5WXfCzS_f9uZrfSSmDyCfMoR3DPRvZuVXBxLZM-bQHdDD3pG4xA5AUskgYB-3HlI1Wk89M-w4cQTZDj2cHeK6dyKZGAVFy7LNSYBBF7g2zvMNULKi6yMOxgROP_rWW-GRqdBCMmgZViMqutlSMXa149I12oSCoa60h_SIyIaQm1SdxTBQQFJaXsEe4CvFKP_43MrzHg8JKGFfa5kn70GVGEABye6nxm2I_7CHWkpHj9ZnuHLd4mVtZgi8tMtDtn_7dcGdArDUibMvh0qmTtEDoz-A8XdfXx_YT2Va-uxBs7Cp88KbaGDnfSp-ldM7NRKdDyL5TW0sKxOJ_c90bo6nV2vMVr5Gq83MaLqjW4foOReYf7XI7m-1o4fwXjTJ1hlJF7s8b8i9wwreyaDPg9VShOFUcJIeFz0-iIPgw8l_gg3vAJjRYtrGAu7SdzhpFfwxatDXwS1RQBu_ktGfmHrgwFylqK2Qrma-BbcooLw1nYMsweM0975TDIVJVJQIezH7fAjAMid8TXTG4sCeNP7tcUTP0XVAz2-QY1YN52kCEBuZLT0erGUZpRMFIF4FnPdbN0tMZkDlb4HrNN6eG3JL3Ytr_GP3OUYpVvWmNasLhXbsbjINiI7hgq8RDdmN1GmawM8-nhJt10-6vWSgRkBhisFgINx3X9nTjP1H1FXOBLHr_WTe5I_dhFILZaH2yf_15T7UsYRExdnR-eznN5FxYfEfDTxHh-_nFEc1Ain93DPjPo_IJKXkn4pv1SUlFUjz1BUcVOc3uxfaCn-Cy9bYLaA2QKLqB6tMyU4aFU7g"]
bghash: OV_U9EP9DYggzdPphnrycBunNsdAC_7jFv4d6R4r208
azt: AFoagUW8OwycDycsGcQTFVp5BHl7gmVP9Q:1652323334193
cookiesDisabled: false
deviceinfo: [null,null,null,[],null,"KR",null,null,null,"GlifWebSignIn",null,[null,null,[],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[5,"77185425430.apps.googleusercontent.com",["https://www.google.com/accounts/OAuthLogin"],null,null,"a537d256-c782-491d-806a-149546b1c802",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,null,null,[],null,null,null,null,[]],null,null,null,null,null,null,[],null,null,null,null,[]],null,null,null,null,1,null,false,1,""]
gmscoreversion: undefined
checkConnection: youtube:442:0
checkedDomains: youtube
pstMsg: 1
```

<br />

### 로그인 응답
response header로 set-cookie로 인증정보를 내려주고,

response body에 특별한 데이터를 넘겨주지 않는다.

![Google](./images/google-login.png)

![Google](./images/google-login-response-body.png)

<br />
<br />

### 재밌는 사항!
Youtube와 로그인 연동을 위해, 

1. /CheckCookie 후,
2. https://accounts.youtube.com/accounts/SetSID 호출하여, .youtube.com 인증쿠키를 생성함

   - 이 역시 response header set-cookie
   - 이로인해, Google.com  <---> youtube.com  간 인증이 공유됨.


### 로그아웃 요청
`GET https://accounts.google.com/Logout?hl=ko&continue=https://www.google.com/&timeStmp=1652331319&secTok=.AG5fkS98t_AKG217OnEgE2LDafTeAXb7eQ&ec=GAdAmgQ`


### 로그아웃 응답
response body는 내용이 없고 response header에 set-cookie로 제어함

![Google](./images/google-logout-respose-body.png)


<br />
<br />
<br />

## Facebook

### 로그인 요청
`POST https://www.facebook.com/login/?privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNjUyMzIyNjQ0LCJjYWxsc2l0ZV9pZCI6MzgxMjI5MDc5NTc1OTQ2fQ%3D%3D`

```
jazoest: 2920
lsd: AVpZdAA7iBo
email: nanse84@gmail.com
login_source: comet_headerless_login
next: 
encpass: #PWD_BROWSER:5:1652322673:AY1QACBvnVUdmBYS6dMA7c92JcG9uUQMVyuaepTzeixwox9vRcRTdJIQ1QsehUaXeBpS3FKKrughoREZyUSxLLv5mBHGBD0qlQOfbXPhkWAs5jVhH7mHzfq+okDZ50TJWwKpy5ZmUXVR+DPWMA==
```



### 로그인 응답
response header로 set-cookie로 인증정보를 내려주고,
response body는 특별한 데이터를 넘겨주지 않는다.
![Facebook](./images/facebook-login-request-header.png)
![Facebook](./images/facebook-login-response-body.png)



response header
```
set-cookie: sb=_8J5YsxiUH0z4ezdT6GiLD8J; expires=Sat, 11-May-2024 02:31:13 GMT; Max-Age=63072000; path=/; domain=.facebook.com; secure; httponly; SameSite=None
set-cookie: c_user=100014225404727; expires=Fri, 12-May-2023 02:31:10 GMT; Max-Age=31535997; path=/; domain=.facebook.com; secure; SameSite=None
set-cookie: xs=19%3AjGh_ZWS7djsnEw%3A2%3A1652322674%3A-1%3A9246; expires=Fri, 12-May-2023 02:31:10 GMT; Max-Age=31535997; path=/; domain=.facebook.com; secure; httponly; SameSite=None
set-cookie: fr=0PiBrKKBSKJAe2AlF.AWVCq63BrqbD_crh1Cps5YcaQ60.BifHEO.5O.AAA.0.0.BifHFx.AWUTbwTGJzQ; expires=Wed, 10-Aug-2022 02:31:07 GMT; Max-Age=7775994; path=/; domain=.facebook.com; secure; httponly; SameSite=None
```


### 로그아웃 요청
`POST https://www.facebook.com/logout.php?button_location=settings&button_name=logout`


response body는 내용이 없고 response header에 set-cookie로 제어함

![Facebook](./images/facebook-logout-response-body.png)

<br />
<br />
<br />


## Naver
 
### 로그인 요청
`POST https://nid.naver.com/nidlogin.login`
```
localechange: 
dynamicKey: 405uNTE1_SSRGQvIUs2kmJ54kOJRwCZOdoMvmsv-YHzgYQX3EASOxgmQHkJb718aeQZs5q-xS73BFk6_dPhoCHGdw96fXO2_F41DRxLFKL8
encpw: a9bd8a9953905628e3cd7e8159cce62ecb43ff09981300e90d5611ebef57941fecc1a18dac7611779efd67a44c4c18a9aee23adf055dc591cf5f0c651d3a41f4a519195a5f73549985217136bc119273e2b4e7b6c6ab4f63daa33314973b18895df8b7a1c23ba606b5d40769860bb3db47cb6859db42c0bb81d898ab10fbe858
enctp: 1
svctype: 1
smart_LEVEL: -1
bvsd: {"uuid":"20c15fec-5ec6-4e09-87cc-0f1804b1244d-0","encData":"N4IghiBcIEwAwGMCMBWAZgUwQWhVgbNgCwZwCc2AHAOwI5xpKVxEBGSMRRAJtnCABoQrKCCQA6AMziigkAihowAGwDOGIdygBtUAEtRerUIiRtAXSEjIoU9pBwBAOzBP1lWZeFQ4AXyEK0HJa0C5uGB5yGIoq6kJoMWoY-vqiAA4A7nJ2Xta2Og5CuT7+8qLB5ULRkAAuAE4ArhogCZBKSb5e1fk24FBkA1b9g2WQA2SleX1jI9bjAcMTpa09q9Pz3jNkC1uTUD0bcyOB4757vaYHs4s7p0MXN5sbJwNnpQDm+9P2cAA+SNR8H8kJIYCh-kgkHI-jDfvwhH9qL9sPhfrIEb9KMisShob8yMiCbiMUjsEx-vCHPjkUgiL9qHisWSkQyMUz4PS8UhUWSCayqX9sDBJJjGciwb98HiCdhJEhORiZZJwWQ8aT8ODUGKhfKpYrkUQRRxtVx-sSqUyiJr0VTSZJUdy1TTUXqqUhBTACca2eL5ZDtTA-ZS-kyQaKScjwZJpTS-uaQ8jUTaE7hftGfbLfjBtSLsxm-TGyXCxcDtfLg5i4f8S8WI0WKwTSz6YTWofr663C-K87aabXe0Wewmm1SZeXO-nq+2C5Oh-S+22LQuy1mV+ml4OY3856HVxmYHul39138x1Oj+fh-3EVXF6eqxXUP9r5WkQ3-iKUWLyVQxTBSbSYooOCQrJtSRAHjqQEeiekq-MB4qwe68EyjAlBivgkGcE6mHinOBL4PKQrxnBMA8uhPpEKG-IJkQgpahi7pAsin4oHOsIVnaqIwDuBqoqChYoHSkg0ZWKLyhB2rMYahaEWivGgf8olMigx6wTKRDynKTqyki2H5iGOlkUpXZYoBGZRmWiLakiYEqWiXKCkaRmXvORZ3mJ47Ti+WIts2PkPiuj6+S+wqBSSB5+VSEodkIEmRf2B7UCKLbFJAkIoDs1DAZoUBcNQVRQJIZDKvEJRCAAVkV7pCAAFqIMDcMKlBkPgmkQRg+XcHRlAYOw+DUKwPDckQ+DREIBgPNAACyAD2ABeejKMoYAAPQoOIcAAAQABTTWACB6E4NSzaotUANxbQAksdGDKFt+0IFtADyADKW0ABpbe6AD6qA-dQACUW0AIJpGkygYAA6n1ADSeg1OtIlSPgu2wwAEgAKtNAAyAhbcoegANYYFtADiWBE7NwMAMK1XUs0ALYYKt7oSHAMhkCgEhtVtr1gEodR6Ej1Ao3I1ggFTciBJwuWQJQhXpWV6UwEInxmEgZDwAI7rMF49Ua1rjjusBXiTbgdGVVASBCET1tCMo9sgPNTuM6IDROETTizRkThyH7M0HTdNR3XIs3u573u+9kdggAACgAIgAYltABqegYBkGB1JAkBx7NdQ1GArCQ1tCezQgDTM8dW1JwXjNgDUudgODhMII3eizU4q1pNwaAAH692gAghwAHojQ+D33ch0wzzNbYnKfp5n2e5-nhfF6X5eV9XNS1-XjfN63ejtzUnfd5PQ8jxg48933U8JEIs9M3oVcL8nacZ1nOd5wXRcl6TbeVcMA1zrnUBuTdIAtwhifDuXc74DyvmPCe98h5yGmifBmqhZpoD3gAUW4O8Umi9P4rx-uvf+W8K7ANAQfSB0C25wIvqgvu19b6X2nkIGGrB4Z71YA0JaNRsBHXfknNef9N6AOobvfe4DD5QOPqfc+CCH5sJQYg6eXg0iiGoEQBAlAARgBQNQJArBKA8VpCgLWYAqLtwwHKDAY0NRyAAI6iGVBgJACA4AMDIGYsxYAPDcAGpIDAeASBcy1iCHsdRRBk1mrNd4pcboIHELtEGmMrpbUxlgWq3tlCJIzqoa6ThUmA37iDAAcmTHGeD0mZOybk-JhSMDFJSeIfGINpoJy2gAJTANwDAXcF4My2igSQPjpovTSCAmpW08FOHeEdDQ0zZk4y2kQcQSBAZyFUIkOIIAaj7OaA0Y5QgABuZyQBZDaLEZoo8dCOHaHEZ5GAvAAE8CggycNwFQpM5rezkCDIWKggUgvugAIRWggO2QhgV6BUFtdGfU6iZzBQi+6lSwB1AZlkOF4K+mzQ9oM7gD1MZbQhbNZQxgQDwsRQAVScCfWagyHqvRni-J6-M3Bso5Q0IW2c+UCrqFtSpaKhAUycBgc5EAJVDLqEs2VIBkXKHORgM+7c5AqrVRqsAoqMBNDkFdRmaQDpHKEDjelNMroJxBuTXpVSE54PQZg06OC97cuKa9bOehH4gABQdcOQg44qA7oCoQmMwC1SZkqzGehmZ7IjfG1p+qMiEobn7CNqL+EIFquq3lQhU7Z1+S4OQUMjrvG4BWxNIBy2LKrYs4pPY62VurVtaM5gzhAA"}
encnm: 100017581
locale: ko_KR
url: https://www.naver.com
id: 
pw: 
```



### 로그인 응답
response header로 set-cookie로 인증정보를 내려주고,
response body는 특별한 데이터를 넘겨주지 않는다
![Naver](./images/naver-login-response-header.png)
![Naver](./images/naver-login-response-body.png)

<br />
<br />

---

## 👉 프론트에 의존하지 않고, 인증서버 알아서 token을 관리할 수 있게 되었다.


---
## Cookie HttpOnly
> Cross-site 스크립팅 (XSS (en-US)) 공격을 방지하기 위해, HttpOnly쿠키는 JavaScript의 Document.cookie API에 접근할 수 없습니다; 그들은 서버에게 전송되기만 합니다. 예를 들어, 서버 쪽에서 지속되고 있는 세션의 쿠키는 JavaScript를 사용할 필요성이 없기 때문에 HttpOnly플래그가 설정될 것입니다

[HTTP 쿠키 - HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies#secure%EA%B3%BC_httponly_%EC%BF%A0%ED%82%A4)



### Google
![Google](./images/google-httponly.png)


### Facebook
![Facebook](./images/facebook-httponly.png)

### Naver
![Naver](./images/naver-httponly.png)


## 쿠키 탈취 예
![Xss](./images/xss.png)

[HTML escaping과 XSS 공격](https://isaac56.github.io/security/2021/09/05/HTML-escaping-XSS-type/)

[[XSS] 세션 가로채기(Session Hijacking)](https://pyj92.tistory.com/16)


<br />
<br />

## 👉 cookie httpOnly 속성을 줌으로서 보안성이 확 올라기게 됨!

---


<br />
<br />

## 글로벌 테크 기업의 인증 방향성
1. client단 id/pw 암호화,
2. refresh_token보다 도용탐지 기술을 더 디벨롭 하는 추세.
3. two factor.
4. 확실한 도메인 정리.

<br />
<br />

## 마무리
1. 인증 토큰을 cookie 기반으로 가게 되면, 의존관계 없이 인증에서 단일책임원칙이 완성 될 수 있음.
2. cookie에 httpOnly, Seacure, Samesite 속성을 사용하여 보안적인 측면을 높일 수 있음.

<br />

## iOS, Andorid도 cookie 기반 인증으로 구현될수 있다면?!

<br />

### reference
- 네이버 Oauth: https://d2.naver.com/helloworld/24942
- OAuth 2.0: https://datatracker.ietf.org/doc/html/rfc6749
- 인증 치트 시트: https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Authentication_Cheat_Sheet.md
- OAuth 치트 시트: https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets_draft/OAuth_Cheat_Sheet.md

