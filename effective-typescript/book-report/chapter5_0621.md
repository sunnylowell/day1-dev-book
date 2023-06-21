# 5장 any 다루기

## 들어가기에 앞서
타입스크립트의 트입 시스템은 선택적이고 점진적이기 때문에 정적이면서도 동적인 특성을 가진다. 따라서 타입스크립트는 프로그램의 일부분에만 타입 시스템을 적용할 수 있고, 점진적 마이그레이션이 가능하다.

## item 38: any 타입은 가능한 한 좁은 범위에만 사용하기
any 타입이 함수 바깥에 영향을 미치지 않도록 하자.
```
function f1() {
    const x: any = expressionReturningFoo();
    processBar(x);
    return x;   //함수의 return type 자체가 any가 됨
}   // 안좋은 예시

function f1() {
    const x = expressionReturningFoo();
    processBar(x as any);
    return x;   //x는 any 타입이 아님
}   //더 나은 예시
```

객체의 일부만 어떤 타입인지 모르는 경우, 객체 전체를 any 로 단언하지 말고 최소한의 범위에만 any 를 사용하자.
```
//config 객체 자체를 as any 로 단언하지말고, 특정 props 만 any 로 단언
const config: Config = {
    a: 1,
    b: 2,
    c: {
        key: value as any
    }
}
```

## item 39: any 를 구체적으로 변형해서 사용하기
any 는 모든타입을 (undefined, null까지도) 포함하기 떄문에 일반적인 상황에서는 any 보다 구체적으로 표현할 수 있는 타입이 존재할 것이다.
예를들면 any 보단 any[], {[key: string]: any}

{[key: string]: any} 대신 모든 기본형 타입(non-primitive)을 포함하는 object 타입을 사용할 수 있다.
참고로 object 타입은 객체의 키를 열거할 수는 있지만, 속성에 접근할 수는 없다.--> 속성에 접근하려고 하면, '{}'형식에 인덱스 시그니처가 없으므로 요소에 암시적으로 'any' 형식이 없습니다. 라는 에러 발생

## item 40: 함수 안으로 타입 단언문 감추기
함수의 모든 부분을 안전한 타입으로 구현하는 것이 이상적이지만, 불필요한 예외상황까지 고려해가며 타입정보를 힘들게 구성할 필요는 없다.
대신 제대로 된 타입이 정의된 함수 안으로 타입 단언문을 감추자.
호출하는 쪽에서 함수 내부에서 any 를 사용한지 모르도록 작성하면 된다. 