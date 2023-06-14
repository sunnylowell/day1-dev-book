## item34: 부정확한 타입보다는 미완성 타입을 사용하기
* 일반적으로 타입이 구체적일수록 버그를 더 많이 잡고 타입스크립트가 제공하는 도구를 사용할 수 있게 되지만, 타입 선언의 정밀도를 높이는 일에는 주의를 기울여야한다. 잘못된 타입은 없는 것보다 못할 수 있으니.
* 잘못된 타입정의는 as any 를 추가하여 타입체커를 무시해야하는 경우를 야기할 수 있다.
* 기억할 것
  * 배열 첫번째 요소 타입만 정의하는 방법
  ```
  type CallException = [FnName, ...any[]]
  ```
* 타입정보를 구체적으로 만들 수록 오류 메시지와 자동 완성 기능에 주의를 기울여야한다.


## item35: 데이터가 아닌, API 와 명세를 보고 타입 만들기
* 파일 형식, api, 명세 등 우리가 다루는 타입 중 최소한 몇개는 프로젝트 외부에서 비롯된 것이며, 이런 경우엔 타입을 직접 작성하지 않고 자동으로 생성할 수 있다.
* 예시 데이터가 아닌, 명세를 참고해 타입을 작성해야한다. 눈 앞에 있는 데이터들만 고려하게 되므로 예기치 않게 오류가 발생할 수 있다.
* geoJSON 에서 제공하는 Feature 타입은 도형의 모음(collection)인지, 도형인지에 따라 내부 속성이 다를 수 있다. 이럴 땐 if 문을 사용하여 속성 여부 체크를 추가하는 것이 좋다.
  ```
  import {Feature} from 'geojson';
  function calculatedBoundingBox(f: Feature) {
    //...
    const helper = (coords: any[]) => { //내용... }
    const {geometry} = f;
    if(geometry) {
        if(geometry.type === 'GeometryCollection') {
            throw new Error('GeometryCollections are not supported');
        }
        helper(geometry.coordinates);
    }
    //...
  }
  ```
* 위와 같은 예시에서 한단계 나아가 조건을 분기하여 forEach 문으로 재귀로 호출하여 helper 함수를 호출할 수 있다.

* apollo 는 GraphQL 쿼리를 타입스크립트 타입으로 변환해 주는 도구이다.


* 느낀점 
  * antd 컴포넌트 사용 시 react-hook-form 과 함께 사용하면서 antd 컴포넌트를 한번 더 감싸는 코드가 추가되었는데, antd 컴포넌트에 전달할 수 있는 style 와 같은 정의되어있는 요소들을 사용하지 않고 필요한 요소들만 직접 타입을 작성하여 추가되어있는 코드가 있어 수정해보면 좋을 것 같다. 
  * apollo 가 //api.github.com/graphql 로부터 스키마를 얻어 graphql 의 response 에 __엔티티명이 있었다는 내부적인 동작 방식을 알게 되어 좋았다. (어디서 __typename 이 들어오는 건지 살피지 않았었음.)
* 실제로 graphql 사용 시 apollo sandbox 를 통해서 정의되어있는 요소들을 체크박스를 통해 추가하여 쿼리문을 만들 수 있어서 아주 편리하다. sort 의 정렬 순이 "DESC" | "ASC" 까지도 자동완성된다.


## item36: 해당 분야의 용어로 타입 이름 짓기
* 일반적인 용어보다는 구체적인 용어로 대체한다. example ) 동물에 대한 타입을 정의 시 name 보다는 commonName, endanger 보다는 동물 보호 등급에 대한 IUCN 의 표준 분류체계인 conservationStatus 타입으로 정의하기
* 모든 분야에는 주제를 설명하기 위한 전문 용어들이 있다.
* 글쓰기와 다르게, 동의어를 사용하지 말라.



## item37: 공식 명칭에는 상표 붙이기
* 값을 구분하기 위해 공식 명칭이 필요하다면 상표를 붙이는 것을 고려해야한다. ( {_brand: 'sorted''} )
* string 이나 number 와 같은 내장타입도 상표화할 수 있다.
  ```
  type Meter = number & {_brand: 'meters'};
  ```
* 상표기법은 타입시스템에서 동작하지만, 런타임에 상표를 검사하는 것과 동일한 효과를 얻을 수 있다.

* 느낀점 : 이해를 100% 다하지 못한 것 같아 맑은 정신으로 다시한번 읽어봐야할 것 같다..