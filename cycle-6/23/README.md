# 21. Payment

### 요약

**21.2 Paddle Integration part One**

1. paddle.js import

```tsx
  <Helmet>
    <title>
      {data?.myRestaurant.restaurant?.name || "Loading..."} | Nuber Eats
    </title>
    <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
  </Helmet>
```

2. 지불 버튼에 paddle api를 연동한다. 
   - Paddle.Setup : 페이지에서 Paddle을 초기화합니다.
   - Paddle.Checkout : 체크아웃화면을 여는 메인 패들 기능

```tsx
const { data: userData } = useMe();
const triggerPaddle = () => {
  if (userData?.me.email) {
    // @ts-ignore
    window.Paddle.Setup({ vendor: 31465 });
    // @ts-ignore
    window.Paddle.Checkout.open({
      product: 638793,
      email: userData.me.email,
    });
  }
};

...
<span
  onClick={triggerPaddle}
  className=" cursor-pointer text-white bg-lime-700 py-3 px-10"
>
  Buy Promotion
</span>
```

### 참고
https://developer.paddle.com/reference/ZG9jOjI1MzU0MDY4-windows-sdk-setup
https://developer.paddle.com/reference/5e0171ec215eb-checkout-parameters

**21.3 Paddle Integration part Two**

```tsx
    const CREATE_PAYMENT_MUTATION = gql`
      mutation createPayment($input: CreatePaymentInput!) {
        createPayment(input: $input) {
          ok
          error
        }
      }
    `;
```

onCompleted을 사용하여 서버 처리 완료 이후, 동작 정의
```tsx
  const onCompleted = (data: createPayment) => {
    if (data.createPayment.ok) {
      alert("Your restaurant is being promoted!");
    }
  };

  const [createPaymentMutation, { loading }] = useMutation<
    createPayment,
    createPaymentVariables
  >(CREATE_PAYMENT_MUTATION, {
    onCompleted,
  });
```

successCallback 옵션을 사용하여 결재 성공 이후, 지면의 후처리
```tsx
window.Paddle.Checkout.open({
  product: 666,
  email: userData.me.email,
  successCallback: (data: any) => {
    createPaymentMutation({
      variables: {
        input: {
          transactionId: data.checkout.id,
          restaurantId: +id,
        },
      },
    });
  },
});
```
