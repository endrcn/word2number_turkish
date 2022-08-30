const Word2Number = require("./lib/Word2Number");
const word2Number = new Word2Number();

console.log(word2Number.convert("iki yüz elli iki lira"));
console.log(word2Number.convert("sekizyüz on iki milyar üç yüz kırk dört milyon beşyüz yetmişikibin dörtyüz bir lira otuz iki kuruş"));
console.log(word2Number.convert("sıfır beşyüz otuzaltı beşyüzellibeş elli beş ellibeş"));