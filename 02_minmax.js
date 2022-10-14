"use strict";
process.stdin.resume();
process.stdin.setEncoding("utf-8");
let inputString = "";
let currentLine = 0;
process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});
process.stdin.on("end", function () {
  inputString = inputString.split("\n");
  main();
});
function readLine() {
  return inputString[currentLine++];
}
/*
 * Complete the 'miniMax' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
////////////////////////////////////////
function miniMax(arr) {
  //input: five integers
  //1 <= arr[i] <= 10^9
  let min = arr[0];
  let max = arr[0];
  let sum = 0;

  arr.forEach((element) => {
    //could skip first element
    if (element < min) min = element;
    if (element > max) max = element;
    sum = sum + element;
  });
  const maxSum = sum - min;
  const minSum = sum - max;
  const result = `${minSum} ${maxSum}`;
  console.log(result);
  return result;
}
////////////////////////////////////////
function main() {
  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));
  miniMax(arr);
}
