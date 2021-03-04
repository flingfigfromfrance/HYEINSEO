/* 글씨 스트로크 길이 찾아오는 것 */
const logo = document.querySelectorAll("#logo path");

for(let i = 0; i < logo.length; i++){
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}
