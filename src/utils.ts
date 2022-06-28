// export const onStatistic = () => {
//   let startTime = 0;

//   const originalOpen = XMLHttpRequest.prototype.open;

//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   XMLHttpRequest.prototype.open(function (...args: any[]) {
//     startTime = Date.now();
//     // eslint-disable-next-line consistent-this
//     const xhr = this as XMLHttpRequest;

//     const originalOnready = this.prototype.onreadystatechange;

//     xhr.prototype.onreadystatechange = function (...readyStateArgs: any[]) {
//       if (xhr.readyState === 4) {
//         const totalTime = Date.now() - startTime;
//         console.log(`totalTime:${totalTime}`);
//       }
//       originalOnready(...readyStateArgs);
//     };

//     originalOpen.apply(xhr, args);
//   });
// };
