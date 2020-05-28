export const genernrateRandomArray = () => {
  let array = [];
  let size = Math.floor(Math.random() * 101) + 4;

  for (let i = 0; i < size; ++i) {
    let randomNum = Math.floor(Math.random() * 1000) + 10;
    array[i] = randomNum;
  }
  //   let nullval = Math.floor(Math.random() * 10);
  //   for (let i = 0; i < size / nullval; ++i) {
  //     let ranIdx = Math.floor(Math.random() * size);
  //     array[ranIdx] = null;
  //   }
  return array;
};

export const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};
