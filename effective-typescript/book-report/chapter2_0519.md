## item9: 타입 단언보다는 타입 선언 사용하기
map 결과값의 타입을 지정하기 위해서 아래와 같이 사용하는 것이 가장 직관적임
```
interface Person {
    name: string;
}
const people = ['lowell', 'sunny'].map((name): Person => ({name}))
```


타입 단언이 꼭 필요한 경우
- 타입체커가 추론한 타입보다 내가 판단하는 타입이 더 정확한 경우. example) dom 엘리먼트에 대해서는 타입스크립트보다 내가 더 잘 알고있는 경우
```
document.querySelector('#myButton').addEventListener('click', e=> {
  e.currentTarget// EventTarget
  const button = e.currentTarget as HTMLButtonElement;  // button 타입 HTMLButtonElement
})
```

- !을 이용해서 null 이 아님을 단언하는 경우
``` const el = document.getElementById('foo')!;```

- 타입 단언문으로 임의의 타입 간 변환을 할 수는 없다. A가 B의 부분집합인 경우에 타입 단언문을 사용해 변환할 수 있다. 예를 들어 위의 코드에서 HTMLButtonElement 는 EventTarget의 서브타입이기 때문에(HTMLButtonElement의 요소들이 EventTarget 요소들을 모두 포함한다.) 타입 단언이 가능하다. 이 오류를 해결하기 위해 unknown 을 사용한다
```const el = document.body as unknown as Person;```

## item10: 객체 래퍼 타입 피하기
- string 으로 정의된 문자에 대해서 charAt 과 같은 메소드를 제공하는 것은 '기본형'인 string 이 메서드를 가지고 있는 것이 아니다. 메서드를 가지는 String 객체 타입이 정의되어있고, javascript 에서 '기본형'과 '객체' 타입이 자유롭게 변환된다. String 객체로 래핑하고 메서드를 호출하고 래핑한 객체를 버리는 형식이다.
- string 객체는 오직 자기 자신하고만 동일하다
example)
```
new String("hello") === new String("hello") // false
"hello" === new String("hello") //false
```

- null과 undefined 에는 객체 래퍼가 없다.
- string 은 String 에 할당할 수 있지만, String 은 string 에 할당할 수 없다. (기본형 타입은 객체래퍼에 할당할 수 있다.) 그러므로 타입 정의 시 String 대신 string , Number 대신 number 을 사용하자.
- 객체타입을 사용해도 좋은 경우
  - new 없이 사용하는 경우 (기본형을 생성하기 때문에 사용해도 좋다.)
  ```typeof BigInt(1234)```

## item11: 잉여 속성 체크의 한계 인지하기

- 잉여속성 체크란? 타입이 명시된 변수에 객체 리터럴을 할당할 때 해당 타입의 속성이 있는지, 그리고 그 외의 속성이 없는지 확인한다.
```
interface Room {
    numDoors: number;
    ceilingHeightFt: number;
}
const r1: Room = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present',
}   // 오류, 잉여속성 체크는 할당 가능 검사와는 별도의 과정임.

const obj = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present',
}
const r2: Room = obj; //    정상, 임시 변수를 도입하면 잉여 속성 체크가 동작하지 않습니다.
```


- 공통속성 체크는 잉여속성 체크와 다르게, 약한 타입과 관련된 할당문마다 수행된다.
- 잉여속성 체크는 구조적 타이핑 시스템에서 허용되는 속성 이름의 오타 같은 실수를 잡는 데 효과적이다. 타입체커가 수행하는 일반적인 구조적 할당 가능성 체크와 역할이 다르다.
- 잉여속성의 한계점
  - 선택적 필드를 포함하는 Options({title: string}) 와 같은 타입에 유용한 반면, 적용 범위도 매우 제한적이며 오직 객체 리터럴에만 적용된다. 이러한 한계점을 인지하고 잉여 속성체크와 일반적인 타입체크를 구분해야한다. 

## 기억하기
- 몽키패치:런타임에 프로그램의 어떤 기능을 수정해서 사용하는 기법 (prototype 변경)
- 넓은 타입: 범위가 넓은 타입. example
```
interface Options { title: string; darkMode?: boolean };
const o1: Options = document; //    document 가 title 속성을 가지고 있기 때문에 정상할당
```

## 후기
객체 래퍼 타입의 동작 방식에 대하여 설명해주는 부분이 뜻깊었다. (객체의 prototype 메소드 사용 시 기본형을 String 객체로 래핑하고, 메소드를 호출하고 래핑한 객체를 버리는 동작방식)