# USER AUTHENTICATION

## 인증(Authencitation)과 인가(Authorization) 차이점


### 인증이란?
클라이언트가 자신이 주장하는 사용자와 같은 사용자 인지 확인하는 과정
- 로그인하는 절차


### 인가란?
권한부여, 클라이언트가 하고자 하는 작업이 해당 클라이언트에게 허가된 작업인지를 확인하는 과정
- 로그인 후 관리자나 일반 사용자인지를 구분하는 절차



## privatekey

### 생성
https://randomkeygen.com/
여기서 
`CodeIgniter Encryption Keys - Can be used for any other 256-bit key requirement.` 키를 가져다씀. 

- Q: 임의로 생성한거 쓰면 안되는가? (테스트 필요)


### JwtModule에서 privatekey를 사용하는 방식
- ConfigService

```
return jwt.sign({ id: userId }, this.configService.get("PRIVATE_KEY"));
```


- JwtModule에서 주입하는 방식
```
JwtModule.forRoot({
    privateKey: process.env.PRIVATE_KEY,
}),
... (생략)

return jwt.sign({ id: userId }, this.options.privateKey);
```

## Module 생성

### Dynamic
설정을 받을수 있게 처리하는 모듈.
(결과적으로 Static 모듈이 됨.)
```
xxxModule.forRoot({
    xxx: xxxx
})
```
`.forRoot`는 컨밴션이기 때문에 지켜줘야함.



```
@Module({})
@Global() // 1. 다른곳에서 사용이 가능함
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS, // service에서 inject 할때 쓰는 네임값
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService], // 2. 다른곳에서 사용이 가능함
    };
  }
}

```

service를 만들어줄때 cli를 사용.
`nest g s jwt`


### Static
어떠한 설정도 적용되어 있지 않는 모듈

```
UsersModule,
```

## midleware
https://docs.nestjs.com/middleware
express와 동일함
request, response, next가 있음

2가지 생성하는 방법이 있음
1. Applying middleware
   1. `NestMiddleware` 인터페이스를 구현하는 방법
   2. 사용법: `AppModule` 에서 `NestModule`을 구현해야함
    ```
    export class AppModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
            consumer
            .apply(JwtMiddleware)
            .forRoutes({ 
                path: '/graphql', 
                method: RequestMethod.POST });
        }
    }
    ```
2. Functional middleware
```
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};
```

main.ts
```
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```


### 멋졌던 코딩
```
if ('x-jwt' in req.headers) {
```


의아한점
jwtService에서 userService를 접근할때, userModule에 exports userService만 해줬는데 접근이 가능했음.