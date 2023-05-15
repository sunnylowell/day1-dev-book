/**
 * item4: 구조적 타이핑에 익숙해지기
 */


/**
 * 예제 1
 */
interface StaffInterface {

    id: number;
    name: string;
    phone: string;
    createdAt: Date;
}

interface StaffInterfaceAntdTable {

    id: number;
    name: string;
    phone: string;
    createdAt: Date;
    className: string;
    colSpan?: number;
}

interface DiffInterface {

    brand: string;
}

function structuralTypingExample( param: StaffInterface ) {
    console.log('staff phone::', param.phone);
    console.log('staffInfo name::', param.name);
    console.log('staffInfo createdAt::', param.createdAt);
}

const staff: StaffInterfaceAntdTable = {
    id: 1,
    name: '황선영',
    phone: '010-0000-0000',
    createdAt: new Date('2023-05-16'),
    className: 'blue',
};

const notStaff: DiffInterface = {
    brand: 'KIRKLAND'
}
structuralTypingExample(staff);

structuralTypingExample(notStaff);  //에러발생

