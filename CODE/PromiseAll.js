Promise.myAll = function (promises) {
  return new Promise((res, rej) => {
    if (promises.length === 0) {
      res([]);
    }

    let newArray = [];
    let count = 0;

    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(
        promises[i]
          .then((e) => {
            count++;
            newArray[i] = e;
            if (count === promises.length) {
              res(newArray);
            }
          })
          .catch((er) => {
            rej(er);
          }),
          
      );
    }
  });
};

Promise.myAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]).then(console.log);
