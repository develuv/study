# Chapter 13. Payments

## create module

- 간단한 cli를 통해 바로 생성할 수 있습니다.

```bash
nest g module payment
```

- payment entity 를 생성해줍니다.

```ts
@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  @Field(() => String)
  @Column()
  transactionId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.payments)
  user: User;

  @RelationId((payment: Payment) => payment.user)
  userId: number;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;

  @Field(() => Number)
  @RelationId((payment: Payment) => payment.restaurant)
  restaurantId: number;
}
```

## create createPayment

- service와 resolver를 생성해줍니다.

```ts
// payment.service.ts
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
  ) {}
}

// payment.resolver.ts
@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}
}
```

- module에 entity와 provider를 설정해줍니다. 

```ts
@Module({
  imports: [TypeOrmModule.forFeature([Payment, RestaurantRepository])],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
```

- dto를 생성해줍니다.

```ts
// create-payment.dto.ts
@InputType()
export class CreatePaymentInput extends PickType(Payment, [
  'transactionId',
  'restaurantId',
]) {}

@ObjectType()
export class CreatePaymentOutput extends CoreOutput {}
```

- createPayment 함수를 service와 resolver에 추가하고 구현합니다.

```ts
// service.ts
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    private readonly restaurants: RestaurantRepository,
  ) {}

  async createPayment(
    owner: User,
    { transactionId, restaurantId }: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    try {
      const restaurant = await this.restaurants.findOneExist(restaurantId);

      if (restaurant.ownerId !== owner.id) {
        throw new Error('You are not allowed to do this.');
      }

      await this.payments.save(
        this.payments.create({
          transactionId,
          user: owner,
          restaurant,
        }),
      );

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || 'Could not create payment',
      };
    }
  }
}

// resolver.ts
@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreatePaymentOutput)
  @Role(['Owner'])
  async createPayment(
    @AuthUser() user: User,
    @Args('input') input: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(user, input);
  }
}
```

## get payments
- me query에서 eager를 설정해서 가져올 수 있지만 페이징이 되지 않고 항상 로드하기 때문에 무거워 질 수 있음

```ts
class User {
  @Field(() => [Payment])
  @OneToMany(() => Payment, (payment) => payment.user, {
    eager: true
  })
  payments: Payment[];
}
```

```json
{
  me{
    id
    email
    role
    payments{
      transactionId
    }
  }
}
```

- 별도로 분리하여 구현

```ts
// service.ts
@Injectable()
export class PaymentService {
  async getPayments(user: User): Promise<GetPaymentsOutput> {
    try {
      const payments = await this.payments.find({ user });

      return {
        ok: true,
        payments,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not found payments',
      };
    }
  }
}

// resolver.ts
@Resolver(() => Payment)
export class PaymentResolver {
  @Query(() => GetPaymentsOutput)
  @Role('Owner')
  async getPayments(@AuthUser() user: User): Promise<GetPaymentsOutput> {
    return this.paymentService.getPayments(user);
  }
}
```

## Task scheduler
- 정해진 시간에 맞추어 작업이 실행될 수 있도록 제공합니다.
- `node-cron` 패키지와 함께 통합하여 `@nestjs/schedule` 패키지를 제공합니다.

### Cron 이란?
> 소프트웨어 유틸리티 cron은 유닉스 계열 컴퓨터 운영 체제의 시간 기반 잡 스케줄러이다.

### nest에 적용
- 패키지를 설정하고 모듈만 import 시켜주면 설정 끝이다!
```bash
npm install --save @nestjs/schedule
npm install --save-dev @types/cron
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
})
export class AppModule {}
```

### Cron Jobs
[자세히보기](https://docs.nestjs.com/techniques/task-scheduling#declarative-cron-jobs)

- @Cron(Expression) 데코레이터를 제공한다.
- 정해놓은 규칙에 맞는 시간(Expression)마다 동작을 실행시킬 수 있다.

```
* * * * * *
| | | | | |
| | | | | 요일
| | | | 월
| | | 일
| | 시간
| 분
초 (선택)
```

```ts
class PaymentService {
  @Cron('* */30 9-17 * * *')
  check() {
    // 매일 9시에서 17시까지 30분 단위로 실행된다.
  }
  @Cron('* 30 11 * * 1-5')
  check() {
    // 월~금까지 11시 30분에 실행된다.
  }
}
```

### Interval
[자세히보기](https://docs.nestjs.com/techniques/task-scheduling#declarative-intervals)

- @Interval(Milliseconds) 데코레이터를 제공한다.
- 정해진 시간(Milliseconds)마다 동작을 실행시킨다.

```ts
class PaymentService {
  @Interval(10000)
  check() {
    // 10초마다 실행시킨다.
  }
}
```

### Timeout
[자세히보기](https://docs.nestjs.com/techniques/task-scheduling#declarative-timeouts)

- @Timeout(Milliseconds) 데코레이터를 제공한다.
- 정해진 시간(Milliseconds) 이후에 단 한번 실행된다.

```ts
class PaymentService {
  @Timeout(10000)
  check() {
    // 어플리케이션이 실행된 이후 10초 후 한번 실행된다.
  }
}
```

## Promoting & Scheduler

- 식당에 프로모션 여부 프로퍼티를 추가해줍니다.

```ts
export class Restaurant {
  @Field(() => Boolean)
  @Column({ default: false })
  isPromoted: boolean;

  @Field(() => Date)
  @Column({ nullable: true })
  promotedUntil?: Date;
}
```

- 결제를 한 후 식당 프로모션 정보를 업데이트 해줍니다.

```ts
// service.ts
@Injectable()
export class PaymentService {
  async createPayment(
    owner: User,
    { transactionId, restaurantId }: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    // ...
      await this.payments.save(
        this.payments.create({
          transactionId,
          user: owner,
          restaurant,
        }),
      );

      const date = new Date();
      date.setDate(date.getDate() + 7);
      restaurant.isPromoted = true;
      restaurant.promotedUntil = date;

      this.restaurants.save(restaurant);

      return {
        ok: true,
      };
    // ... 
  }
}
```

- 프로모션 종료를 자동화 시키기 위해 task scheduler interval을 이용하여 자동 업데이트 시켜줍니다.

```ts
// service.ts
@Injectable()
export class PaymentService {
  // ...
  @Interval(5000)
  async checkIsPromotingRestaurants() {
    const restaurants = await this.restaurants.find({
      isPromoted: true,
      promotedUntil: LessThan(new Date())
    });

    restaurants.forEach(async (restaurant) => {
      restaurant.isPromoting = false;
      restaurant.promotedUntil = null;
      await this.restaurants.save(restaurant);
    });
  }
}
```

## 백엔드 마무리!

```plain
계속되는 동일한 패턴을 강의로 계속 듣느라 모두 고생하셨습니다!
이로서 백엔드는 모두 완료되었습니다 🎉 🎉 🎉 🎉 고생하셨습니다 👏🏻 👏🏻 👏🏻 👏🏻
이제 프론트엔드 하러 고고! 🚀 🚀 🚀 🚀
```  