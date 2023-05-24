## item15: 동적 데이터에 인덱스 시그니처 사용하기
- 인덱스 시그니처를 명시하여 유연하게 매핑을 표현할 수 있다.
- 키의 이름은 string 또는 number 또는 symbol, 값의 타입은 anything
- 단점
  - 잘못된 키를 포함해 모든 키를 허용
  - 빈 객체도 유효한 타입이 된다.
  - 키마다 다른 키를 가질 수 없다.
  - 자동완성 기능이 동작하지 않는다.
- 위의 단점에 따라 인덱스 시그니처는 동적 데이터를 표현할 때 사용한다.
- 안전한 접근을 위해 인덱스 시그니처의 값 타입에 undefined 를 추가하는 것을 고려해야한다. ([columnName: string]: string | undefined)
- 가능하면 매핑된 타입 같은 정확한 타입을 사용하는 것이 좋다.
  - Record 는 키 타입에 유연성을 제공하는 제네릭 타입. 
    - 재네릭으로 리터럴을 전달하는 예시
    ```
    type Vec3D = Record<'x' | 'y', number>;
    type Vec3D = {[k in 'x' | 'y' | 'z']: number};
    위 2개의 예시와 같이 정의 시 Type Vec3D = {x: number; y: number: z: number;}
    
    type ABC = {[k in 'a' | 'b' | 'c']: k extends 'b' ? string : number};
    위의 예시는 Type ABC = {a: number; b: string; c: number}
    ```
    
## item16: number 인덱스 시그니처 보다는 Array, 튜플, ArrayLike 를 사용하기
- 객체의 키가 number 형태이더라도 Object.keys 로 키를 나열해보면 키가 문자열로 출력된다. (인덱스들은 문자열로 변환되어 사용된다.)
- 배열을 순회할 때 for ... in 을 사용하면 key 가 string, number 로 실용적인 전환 허용이 되기 때문에 순회에 좋은 방법은 아니다. 또한, for-of 또는 for 루프에 비해 몇배나 느리다.
  ```
  const xs = [1,2,3];
  const keys = Object.keys(xs);
  for (const key in xs) {
      key;                //키는 string
      const x = xs[key];  //값은 number
  }
  ```
  
- 인덱스에 신경쓰지 않는다면, for ... of 를 사용하는 것이 더 좋다.
- 인덱스 타입이 중요하다면, forEach 를 사용하면 된다.
- 루프를 중간에 멈춰야한다면, for(;;) 를 사용 (break)
- 어떤 길이를 가지는 배열과 비슷한 형태의 튜플을 사용하고 싶다면, 타입스크립트의 ArrayLike 를 사용해라.
- 배열은 객체이므로 키는 숫자가 아니라 문자열이다.

## item17: 변경 관련된 오류 방지를 위해 readonly 사용하기
- 변경하지 않는다고 간주하고 코드를 짜면 문제가 발생할 수 있다. 이 문제는 readonly(접근 제어자)를 사용하여 해결할 수 있다.
  - 예제
    - ```arr: readonly number[]``` 이렇게 사용하면 arr의 prototype 함수 중 배열을 변경하는 pop 과 같은 함수는 모두 사용할 수 없다.
  - 변경 가능한 배열을 readonly 에 할당 가능, 반대는 불가능
  - const 와 readonly 의 차이
    - const 를 let 으로 변경하고 readonly 를 추가하면, 해당 변수를 가리키는 배열 (복사본) 을 자유롭게 변경할 수 있지만, 그 배열 자체는 변경하지 못하게 된다.
  - readonly 는 얕게 동작한다.
  ```
  interface Outer { inner: {x: number} };
  type T = Readonly<Outer>//  이렇게 적용 시 inner에만 readonly 가 적용되고, x에는 readonly 가 적용되지 않는다.
  ```

## item18: 매핑된 타입을 사용하여 값을 동기화하기
- 매핑된 타입을 사용해서 관련된 값과 타입을 동기화하도록 한다. 
  - 필요할 때만(값이 변경되었을 때만) 차트를 업데이트 하는 법. 타입체커가 동작하도록 소스를 짜자.
  ```
  const REQUIRES_UPDATE: {[k in kkkkeyof ScatterProps]: boolean} = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false, //onClick 이벤트는 변경을 감지할 필요가 없다.
  }
  function shouldUpdate( oldProps: ScatterProps, newProps: ScatterProps ) {
    let k: keyof ScatterProps;
    for(k in oldProps) {
      if(oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
        return true;
      }
    }
    return false; 
  }
  ```

## 후기
backoffice-next 개발 중 useForm 생성하여 antd Form 컴포넌트로 전달 시 Record 타입을 잘못된 방식으로 정의하여 신경쓰이는 부분이 있었는데 리팩토링 해야겠단 생각이 들었다.
ArrayLike?
- ArrayLike는 유사배열 객체이다. Array 와 다르게, 일반적으로 Array에서 사용할 수 있는 메소드는 없고, length 와 index 로만 접근이 가능하다. 그러므로 순회는 가능하다. 
배열의 length 를 0으로 비우는 것으로 배열을 빈배열로 만들 수 있다. >> [1,2,3].length = 0; // result: []


### 새로 배운 문법
```
type ABC = {[k in 'a' | 'b' | 'c']: k extends 'b' ? string : number};
위는 Type ABC = {a: number; b: string; c: number}
설명: k extends 'b' 는 k 라는 키가 'b'와 할당 호환이 가능한지 검사하고, 호환 가능하다면 문자열 타입을 , 그렇지 않다면 숫자타입을 할당하라는 의미.
따라서 여기서는 키가 b이면 string, 아니면 number로 값의 타입을 할당 
```