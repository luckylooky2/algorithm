// 대소문자 바꾸기 : 구현, 문자열
const buffer = require("fs").readFileSync(0);

console.log(
  buffer
    .map((c) => (c < 91 ? c + 32 : c - 32))
    .toString()
    .slice(0, -1)
);

// 1. require("fs").readFileSync(0);
// - input: 123, output: <Buffer 31 32 33 0a>
// 2. "utf-8" encoding을 하면 문자열로 변환됨. 즉, toString() 메서드를 사용할 필요가 없어짐
// 3. trim이 필요한 이유는 마지막의 개행이 있을 수도 있기 때문
// 4. "utf-8" 이나 toString을 하지 않으면, 위처럼 ascii code로 처리가 가능
