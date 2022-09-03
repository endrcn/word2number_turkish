const Word2Number = require("./lib/Word2Number");
const word2Number = new Word2Number();

// console.log(word2Number.convert("iki yüz elli iki lira"));
// console.log(word2Number.convert("sekizyüz on iki milyar üç yüz kırk dört milyon beşyüz yetmişikibin dörtyüz bir lira otuz iki kuruş"));
// console.log(word2Number.convert("sıfır beşyüz otuzaltı beşyüzellibeş elli beş ellibeş"));
// console.log(word2Number.convert("2 milyon 300 bin tl 290 gun"));
// console.log(word2Number.convert("2 bin - 300 bin tl ikiyüzdoksan gun"));
// console.log(word2Number.convert("21.12.2021"));
// console.log(word2Number.convert("oniki v sıfırdokuz v ikibinondokuz v tarihli v ekstra v borcum v ne v kadar"));
// console.log(word2Number.convert("oniki v sıfırdokuz v ikibinon sıfırdokuz v tarihli v ekstra v borcum v ne v kadar"));
// console.log(word2Number.convert("iki nokta on beş"));
// console.log(word2Number.convert("yüzaltmışyedi"));
// console.log(word2Number.convert("6 milyar beş yüz elli milyon iki yüz altı bin üç yüz atmış iki tl"));
console.log(word2Number.convert("6 milyar 999 bin 30 tl"));
