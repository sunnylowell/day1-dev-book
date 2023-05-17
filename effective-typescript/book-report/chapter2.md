## item6: 편집기를 사용하여 타입 시스템 탐색하기

타입스크립트를 설치하면 실행 가능한 두가지
- tsc(ts 컴파일러)
- tsserver(단독으로 실행할 수 있는 타입스크립트 서버)
  - 일반적으로 편집기의  언어서비스를 사용하는데, ts 서버에서 언어서비스를 제공하도록 사용하는 것이 좋다.
- 타입스크립트가 동작을 어떻게 모델링하는지 알기 위해 타입 선언 파일을 찾아보는 방법을 터득해야한다.


## item7: 타입이 값들의 집합이라고 생각하기
- '할당 가능한 값들의 집합(범위  라고도함)' 이 타입이라고 생각하면 된다.
- 가장 잡은 집합은 공집합이며, 타입스크립트에서 never 타입이다. 아무 값도 할당할 수 없음.
- 한가지 값만 포함하는 타입은 '유닛타입' 이라고 한다.(=리터럴 타입)
- 유니온 타입은 값 집합들의 합집합을 일컫는다. (or = 합집합)
- 타입체커의 역할은 하나의 집합이 다른 집합의 부분 집합인지 검사하는 것이다.
- 인터섹션(교집합) 타입의 값은 각 타입 내의 속성을 모두 포함하는 것이 일반적이다. (and=교집합)
  ```
  interface Person {
    name: string;
  }
  interface Lifespan {
    birth: Date;
    death: Date;
  }
  type PersonSpan = Person & Lifespan;// 이렇게 정의 시 PersonSpan은 name, birth, death 세가지 속성을 다 가지고 있다.
  ```
  
- 서브타입: 어떤 집합이 다른 집합의 부분집합이다. 아래 예제 코드에서 PersonSpan 은 Person 타입의 서브타입니다.
```
interface Person {
    name: string;
}
interface PersonSpan extends Person {
    birth: Date;
}
```

##item 8: 타입 공간과 값 공간의 심벌 구분하기
- 타입스크립트의 symbol 은 타입공간이나 값 공간 중의 한 곳에 존재한다. 속하는 공간에 따라 다른 것을 나타낼 수 있다. 한 심벌이 타입인지 값인지는 어떤 형태로 쓰이는지 문맥을 살펴 알아내야한다.
  - 일반적으로 type 이나 interface, :, as 뒤에 오는 심벌은 타입
  - const 나 let, = 선언 뒤에 오는 심벌은 값이다.
  - instanceof 는 런타임 연산자이고, 값에 대해 연산하기 떄문에 ```instanceof  Cylinder``` 는 타입이 아니라 함수를 참조한다.
- 클래스나 enum 은 상황에 따라 타입과 값 두가지 모두 가능한 예약어이다.
  - class 키워드는 값과 타입 두가지로 모두 사용될 수 있기 떄문에 클래스에 대한 typeof 는 상황에 따라 다르게 동작한다.-> 런타임에서는 "function"으로, type에서는 typeof 로 동작한다.
- javascript 에선 (string, number, boolean, undefined, function, object) 총 6개의 런타임 타입만이 존재한다.
- 값으로 쓰이는 this 는 javascript 의 this 키워드이다. 타입으로 쓰이는 this 는 '다형성 this' 라고 불리는 this 의 타입스크립트 타입이다. 서브클래스의 메서드 체인을 구현할 때 유용하다.


## 후기
### 또 헷갈리기 전에 써놓기. 

```type K = keyof (Person | Lifespan)```
- 설명: 합집합이라서, keyof 를 하면 name, birth, death 세가지 속성을 모두 가지고 있을 것 같지만, Person | Lifespan 은 세가지 값이 전부 있을수도, 없을 수도 있다. 공통적인 속성이 없다. 그래서 never... 공집합.

```keyof (A&B) = (keyof A) | (keyof B)```
```keyof (A|B) = (keyof A) & (keyof B)```

### 아직도 헷갈리는 부분
A extends B 했을 때 A가 B의 서브타입인것. props 만 보면 A가 B의 props 들을 포함하고 있는데, A가 B의 부분집합인 것이 헷갈린다.  

  
    




