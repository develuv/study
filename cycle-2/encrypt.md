Encrypt


양방향 단방향 알고리즘
우선, 가장먼저 분류되는 방식은 양방향, 단방향 알고리즘이다. 간단하게 말해서 양방향 알고리즘은 암호화된 암호문을 복호화 할 수 있는 알고리즘을 의미한다. 반대로 단방향 알고리즘은 암호화는 수행하지만 절대로 복호화가 불가능한 알고리즘을 말한다. 양방향 알고리즘은 대표적으로 대킹키(비공개키) 방식과 비대칭키(공개키) 방식으로 나눠지며, 단방향은 Hash방식이 대표적이다.

양방향 알고리즘 : 암호화, 복호화 가능
단방향 알고리즘 : 암화화 가능, 복호화 불가


대칭키(비공개키) 비대칭키(공개키) 방식
양방향 암호화는 크게 대칭키(비공개키)와 비대칭키(공개키)방식으로 나눠진다. 대칭키 방식은 암호화, 복호화시 모두 동일한 키를 사용하고, 비대칭키(공개키)방식은 암호화 복호화에 서로 다른 키를 사용한다.
대칭키(비공개키) 방식
특징 : 암복호화에 서로 동일한 키가 사용되는 암호화 방식. 그래서 키를 비공개한다.
장점 : 속도가 빠르다.
단점 : 키 배송 위험성 존재하여 송신 측에서 수신측에 암호 키를 전달하는 과정에서 노출우려가 있다.
대표 : DES, AES

비대칭키(공개키) 방식
특징 : 암복호화에 서로 다른 키가 사용되는 암호화 방식. 하나의 키는 공개키로 사용.
장점 : 키 배송의 문제를 근본적으로 차단하여 안전성이 높다.
단점 : 대칭키(비공개키)방식에 비해서 느리다.
대표 : RSA



대칭키(비공개키)
대칭키(비공개키)는 사용하는 키와 복호화 할때 사용하는 키가 동일한 암호화 기법으로, 대개 암호화 알고리즘이라고 하면 대부분 이쪽을 가리킨다. 현재 사용되는 대칭형 암호화 알고리즘은 주로 파이스텔 네트워크(Feistel Network) / S-Box를 통하여 블럭 암호로 만들어지만 AES처럼 파이스텔 네트워크를 사용하지 않는 알고리즘도 있다. 이쪽은 라인달(Rijndael) 알고리즘이라는 비교적 새로운 알고리즘을 적용하고 있다.

현재 가장 보편적으로 쓰이는 암호화 방식은 현 미국 표준 방식인 AES. 128~256비트 키를 적용할수 있어 보안성이 뛰어나며 공개된 알고리즘이라 누구나 사용할 수 있다. 그 전에는 DES(Data Encryption Standard)라는 알고리즘이 1975년부터 사용되고 있었으나 너무 오래되어 취약점이 발견됨에 따라 이를 대체하기 위해 등장한 것이 바로 AES이다.

대칭형 암호는 훌륭한 암호화 방식이기는 하지만 결정적인 문제가 존재한다. 바로 '키 배송'에 관한 문제로, 어떻게든 송신 측에서는 수신 측에 암호 키를 전달해야만 하고, 이 키가 배송과정에서 털리면 아무리 뛰어난 암호화 알고리즘을 사용했더라도 속절없이 평문이 털리게 된다. 안전하게 평문을 전달하기 위해 만든 것이 암호문인데, 정작 키는 안전하게 전달할 방법이 없는 것. 이 키 배송에 대한 방법은 여러가지 방법이 연구되었지만 발상의 전환으로 키 배송 문제를 해결한 방식이 비대칭형 암호이다.


비대칭키(공개키)

비대칭형 암호는 이름 그대로 암호화 키와 복호화 키가 다르다. 암호화를 하면 하나의 키쌍이 생기고 이 두개의 키는 수학적으로 밀접한 관계를 가지고 있다. 두개의 키를 각각 키A, 키B라고 했을 때 키A로 암호화한 암호문은 키B로만 복호화 할수 있고 키B로 암호화한 암호문은 키A로만 복호화 할수 있다. 따라서 이중 하나의 키만 비밀로 보호하고(이를 '비밀키', '개인키'라고 한다) 다른 하나의 키는 공중에게 공개해도 관계가 없다(이를 '공개키'라고 부른다). 이렇게 둘 중 하나의 키는 반드시 공개되어야 통상적인 사용이 가능함으로 공개키 암호라고도 불린다. 공개키로 암호화한 암호문은 어차피 개인키를 가진 사람만이 풀어볼 수 있으므로 상호간에 공개키만 교환하고 상대의 공개키로 암호화를 해서 데이터를 교환하면 상대는 자신의 개인키로 복호화를 한다. 따라서 키 배송 문제는 근본적으로 발생하지 않는 것. 



하지만 비대칭형 암호는 암복호화가 대칭형 암호에 비해 현저하게 느리다는 문제점이 있다. 따라서 현실적으로는 비대칭형 암호를 이용해서 대칭형 암호의 키를 배송하고 실제 암호문은 대칭형 암호를 사용하는 식으로 상호보완적으로 이용하는 것이 일반적이다. 그리고 비대칭형 암호라고 약점이 없는 것은 아니어서 중간자 공격(MITM : Man In The Middle Attack)에는 취약하다. 해커가 중간에서 통신을 가로채어 수신자에게는 송신자인 척하고 송신자에게는 수신자인 척 해서 양쪽의 공개키와 실제 암호화에 사용되는 대칭키를 모두 얻어내는 기법.



또한 개인키-공개키 관계를 역이용해서 전자서명에 활용하기도 하는데, 특정한 문서를 개인키로 암호화해서 발송하면 이 문서는 해당 발신자의 공개키로만 복호화가 가능하다. 공개키이므로 아무나 열어볼 수는 있지만 해당 발신자의 공개키로만 열린다는 사실에서 이 문서가 해당 발신자에게서 온 것이라는 사실을 인증할 수 있는 것.



단방향 암호화 방식
평문을 암호문으로 암호화하는 것은 가능하지만 암호문을 평문으로 복호화하는 것은 불가능한 암호화 기법. 기본적으로 동일한 평문은 동일한 암호문으로 암호화되지만 이를 바탕으로 평문을 복원할수는 없다. 예를 들면 패스워드는 양방향 암호로 저장하는 것보다 단방향 암호로 저장하는 것이 안전하다. 암호화된 패스워드 목록이 털린다고 해도 이를 가지고 원래의 패스워드를 복원할 수 없고, 패스워드 자체를 검증할 때는 입력받은 값을 암호화해서 암호화한 값 끼리 비교하여 인증처리를 하곤한다. 

주로 Hash기법을 사용하며 최소한 SHA-256, 가능하면 SHA-3를 쓰는 것이 좋다. 나머지는 취약점이 발견된 상태며, 특히 MD5는 단시간 내에 충돌값을 찾아낼 수 있는 지경에 이르렀다. 패스워드 암호화에 아직도 MD-5를 사용하는 사이트가 있다면 즉시 탈퇴 처리해야한다.


