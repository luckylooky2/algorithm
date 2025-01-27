// Serca : 구현
const n = +require("fs").readFileSync(0, "utf8").trim();
const string = ` @@@   @@@ 
@   @ @   @
@    @    @
@         @
 @       @ 
  @     @  
   @   @   
    @ @    
     @     `;
const answer = [];

for (let i = 0; i < n; i++) {
  answer.push(string);
}
console.log(answer.join("\n"));
