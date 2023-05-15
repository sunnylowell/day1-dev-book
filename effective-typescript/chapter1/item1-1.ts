function throwErrorBeforeRefactor () {

    try {
        throw new Error('예외 발생'); // 에러 발생
    }
    catch(e: any) {
        if( e?.message ) {
            console.log('error::', e.message);
        }
    }
}
throwErrorBeforeRefactor();



function throwError () {

    try {
        throw new Error('예외 발생'); // 에러 발생
    }
    catch(e: unknown) {
        if( e instanceof Error ) {
            console.log('error::', e.message);
        }
    }
}
throwError();