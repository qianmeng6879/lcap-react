const myCallable = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("1"); // 返回成功结果
        }, 1000);
    });
};

const getResult = () => {
    console.log(0);
    const result = myCallable();
    console.log(result);
    console.log(2);
    return result
};

console.log(getResult())
