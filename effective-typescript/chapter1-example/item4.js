"use strict";
/**
 * item4: 구조적 타이핑에 익숙해지기
 *
 * backoffice next가 server 와 client 사이에서 interface 를 공유하는 구조인데,
 * 이를 이용해서 구조적 타이핑의 또 다른 확장예제를 만들어보고 싶었으나
 * client 에서의 table data 들은 interface 를
 */
function structuralTypingExample(param) {
    console.log('staff phone::', param.phone);
    console.log('staffInfo name::', param.name);
    console.log('staffInfo createdAt::', param.createdAt);
}
const staff = {
    id: 1,
    name: '황선영',
    phone: '010-0000-0000',
    createdAt: new Date('2023-05-16'),
    className: 'blue',
};
const notStaff = {
    brand: 'KIRKLAND'
};
structuralTypingExample(staff);
//structuralTypingExample(notStaff);  //에러발생
