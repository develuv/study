12 ORDER SUBSCRIPTIONS



# 강의내용

배달기사가 주문한 음식을 자기가 배달 하겠다고 이벤트를 구독하고 이벤트를 받아 배달을 시작하고 완료 하여 이벤트를 업데이트 할 수 있다.



# Test 계정

점주 : owner@test.com/123

 : client@test.com/123

배달원 : delivery@test.com/123



# 주문 과정



점주가 주문이 들어오는지 구독한다

<span style="color:orange">pendingOrders</span>



손님이 음식을 주문한다

createOder

주문한 음식의 상태를 구독한다(점주, 손님, 배달원?)

<span style="color:orange">orderUpdates({id})</span>

점주가 'Cooking' 상태 변경한다

editOrder



배달원 결정

takeOrder

배달원이 음식 조리 완료되었는지 구독한다

<span style="color:orange">cookedOrders</span>



점주가 'Cooked' 상태 변경

editOrder



배달원이 배달 'PickedUp'  상태 변경

editOrder



배달원이 배달 'Delivered'  상태 변경

editOrder



# 강의내용



## socket을 할용한 이벤트 구독

graphql-subscriptions 설치



Socket 프로토콜을 사용하기 위한 설정

```javascript
GraphQLModule.forRoot({
  installSubscriptionHandlers: true, //socket 프로토콜을 사용하는 서버를 활성화하여 이벤트 구독을 가능하게 함
  autoSchemaFile: true,
  context: ({ req, connection }) => {
    if (req) { //ws 프로토콜에는 req가 없어서 분기 처리
      return { user: req['user'] };
    } else {
      console.log(connection);
    }
  },
}),
```



이벤트 구독

```javascript
const pubsub = new PubSub();

@Subscription(returns => String)
hotPotatos() {
  return pubsub.asyncIterator('hotPotatos');
}
```



이벤트 전송

```javascript
@Mutation(returns => Boolean)
potatoReady() {
 pubsub.publish('hotPotatos', {
 	 readyPotato: 'YOur potato is ready. love you.',
 });
 return true;
}
```



## Role별로 권한 적용

```javascript
const token = gqlContext.token;
if (token) {
  const decoded = this.jwtService.verify(token.toString());
  if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
    const { user } = await this.userService.findById(decoded['id']);
    if (user) {
      gqlContext['user'] = user;
      if (roles.includes('Any')) {
        return true;
      }
      return roles.includes(user.role);
    }
  }
}
```



## PubSub 글로벌로

이벤트 구독관리를 하는 pubSub는 글로벌로 하나만 존재해야 전체 서비스의 subscription을 어떤 resolver든 호출 할 수 있다

common.module.ts

```javascript
import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from './common.constants';

@Module({})
const pubsub = new PubSub();

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: pubsub,
    },
  ],
  exports: [PUB_SUB],
})
```



## 실제 주문 subscription & resolver



subscriptions

```javascript
//점주가 새로운 주문이 들어오는지 구독한다
@Subscription(returns => Order, {
  //filters: (payload, args, context)
  filter: ({ pendingOrders: { ownerId } }, _, { user }) => { //pendigOrders는 NEW_PENDING_ORDER publish할때 보내주는 값
    return ownerId === user.id; //내 가게에 주문이 들어온 것만 필터
  },
  /*
  Order를 리턴해야 함으로 order를 뽑는 resolve
  subscription{
    pendingOrders{
      id
    }
  }
  */
  resolve: ({ pendingOrders: { order } }) => order, 
})
@Role(['Owner'])
pendingOrders() {
  return this.pubSub.asyncIterator(NEW_PENDING_ORDER);
}
//새로운 주문이 들어올때
//order.service -> createOrder함수에서 publish


//배달원은 조리완료 이벤트를 구독한다
@Subscription(returns => Order)
@Role(['Delivery'])
cookedOrders() {
  return this.pubSub.asyncIterator(NEW_COOKED_ORDER);
}
//음식 status가 Cooked일때
//order.service -> editOrder함수에서 publish


//누구든 주문 정보가 업데이트 되는 것을 구독한다(단 필터로 이벤트를 받을지 거른다)
@Subscription(returns => Order, {
  filter: (
    { orderUpdates: order }: { orderUpdates: Order },
              { input }: { input: OrderUpdatesInput },
  { user }: { user: User },
    ) => {
      if ( //해당 주문의 배달원,주문자,점주가 아니면 업데이트 정보를 받지 않는다
        order.driverId !== user.id &&
        order.customerId !== user.id &&
        order.restaurant.ownerId !== user.id
      ) {
        return false;
      }
      return order.id === input.id; //내가 구독한 주문인 경우에만 정보 받기(배달원이면 내가 배달하겠다고 정한 메뉴에 대한 정보만 업데이트)
    },
})
  @Role(['Any'])
orderUpdates(@Args('input') orderUpdatesInput: OrderUpdatesInput) {
  return this.pubSub.asyncIterator(NEW_ORDER_UPDATE);
}
```



mutation

```javascript
//상태 변경시 NEW_COOKED_ORDER, NEW_ORDER_UPDATE 이벤트 publish
@Mutation(returns => EditOrderOutput)
@Role(['Any'])
async editOrder(
  @AuthUser() user: User,
  @Args('input') editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.ordersService.editOrder(user, editOrderInput);
}

//배달원이 정해졌을때 NEW_ORDER_UPDATE로 배달원 정보 publish
@Mutation(returns => TakeOrderOutput)
@Role(['Delivery'])
takeOrder(
  @AuthUser() driver: User,
  @Args('input') takeOrderInput: TakeOrderInput,
  ): Promise<TakeOrderOutput> {
    return this.ordersService.takeOrder(driver, takeOrderInput);
}
```

