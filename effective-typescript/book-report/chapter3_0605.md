## Item25: 비동기 코드에는 콜백 대신 async 함수 사용하기
es2015는 콜백지옥을 극복하기 위해 프로미스 개념을 도입하였다.
es2017 에서는 async 와 await 을 도입하여 콜백지옥을 더욱 간단하게 처리할 수 있게 되었다.
async 함수 내에서 await 중인 promise 가 reject 되면 예외를 던지므로, 일반적인 try/catch 구문을 사용할 수 있다.
```
aasync function fetchPages() {
  try {
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    //  ...
  }
  catch(e) {
    //...
  }
}
```
콜백보다 프로미스가 코드를 작성하기 쉬우며, 타입을 추론하기 쉬운 두가지 장점이 있다.
Promise.rase 도 타입추론과 잘맞는다.
    - api 호출에 timeout 을 걸기위해 아래와 같은 패턴을 많이 사용한다.
    - fetchWithTimeout 의 반환타입은 Promise<Response | never> 이지만 never(공집합)와의 유니온은 의미가 없으므로 Promise<Response>로 추론된다.
    ```
    function timeout(millis: number): Promise<never> {
        return new Promise((resolve, reject) => {
        setTimeout(() => reject('timeout'), millis);
        })
    }
    async function fetchWithTimeout(url: string, ms: number) {
    return Promise.race([fetch(url), timeout(ms)]);
    }
    ```
async 함수에서 promise 를 반환하면 또 다른 프로미스로 래핑되지 않는다. (Promise<Promise<T>> 가 아닌 Promise<T> 로 반환된다.)
내부에서 호출하는 함수가 프로미스를 반환한다면, 통일성 있게 async 로 선언하는 것이 좋다. (일관적인 동작을 강제하게 된다.)

## Item 26: 타입 추론에 문맥이 어떻게 사용되는 지 이해하기
값을 변수로 분리해내면, 타입스크립트는 할당 시점에 타입을 추론한다. 이로인해 예를 들면 아래와 같은 문제가 있다.
```
type Language = 'JavasSript' | 'TypeScript';
function setLanguage(language: Language) {/* ... */}
let language = 'JavaScript';// 여기서 string 형으로 추론되므로 아래에서 함수에 인수로 전달 시 string 을 Language 형식에 참조할 수 없다는 에러가 뜬다.
setLanguage(language)
```
문제해결: 이 때는 language 를 const 로 정의하면 'JavaScript'로 추론이 가능하여 에러가 나지 않는다.

튜플 사용시에도 위와 같은 문제가 있다. (또는 객체 사용 시에도 같은 해결방법 적용 가능)
```
function panTo(where: [number, number]) {
  /**/
}
const loc = [10,20];    //loc 은 string[] 로 타입추론 되므로
panTo(loc); // 인수로 loc 을 전달 시 에러가 발생한다.
```
문제해결
    - loc 할당 시 loc 에 타입을 정의한다.
    - as const 로 deeply 상수라고 정의한다. (const 는 단지 얕은 상수이지만 as const 를 사용하여 내부까지 상수라는 사실을 타입스크립트에게 알려줄 수 있다.)

as const 의 단점
타입 정의에 실수가 있다면 오류는 타입정의가 아닌, 호출되는 곳에서 발생한다. (여러겹 중첩된 객체에서 오류가 발생 시 근본적인 원인을 파악하기 어렵다)

## Item 27: 함수형 기법과 라이브러리로 타입 흐름 유지하기
언더스코어는 주로 일반적인 유틸리티 함수를 제공하는 데 초점을 맞추었고, 이러한 노력을 바탕으로 lodash 가 만들어졌다.
Ramda 같은 최근의 라이브러리는 함수형 프로그래밍의 개념을 javascript 세계에 도입하고 있다.
이러한 라이브러리들의 일부 기능 (map, flatMap, filter, reduce) 는 순수 javascript 로 구현되어있다.

lodash zipObject 함수: 키와 값 배열로 취합해서 객체로 만들어준다.

Dictionary 는 lodash 의 타입별칭이다. ( Dictionary<string> 은 {[key:string]: string} 또는 Record<string, string> 과 동일하다. )

lodash 의 _.map 은 콜백을 전달하는 대신 속성의 이름을 전달할 수 있다. (내장된 Array.prototype.map 에 비해 좋은점)
```
_.map(allPlayers, 'name');  //  player의 name 속성들만 가져올 수 있다.
```

결론: 내장된 함수형 기법들과 lodash 같은 라이브러리에 타입정보가 잘 유지되는 것은 우연이 아니다. 따라서 라이브러리를 사용할 때 타입정보가 유지되는 점을 활용해야 타입스크립트의 목적을 달성할 수 있다.