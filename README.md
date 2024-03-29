# word2number_turkish

[![NPM version](https://img.shields.io/npm/v/word2number_turkish.svg)](https://www.npmjs.com/package/word2number_turkish)

It is a Javascript library that converts numbers written with words to digits.

## Installation

```
npm install --save word2number_turkish
```

## Usage in Backend

```js
const word2Number = require("word2number_turkish");
console.log(word2Number.convert("yüzaltmışyedi"));
```

You can extract numbers' indexes from sentences.

```js
const word2Number = require("word2number_turkish");
let words = word2Number.splitSentenceToWords("sekizyüz on iki milyar üç yüz kırk dört milyon beşyüz yetmişikibin dörtyüz bir lira otuz iki kuruş");
console.log(word2Number.findNumbersIndexes(words));
// Output: [ { startIndex: 0, endIndex: 17 }, { startIndex: 19, endIndex: 20 } ]
```

## Usage in Frontend

Put the script(client/word2number_turkish.js) between the head tags in your website. After that you can use the library.

```html
<script src="./client/word2number_turkish.js"></script>
<script>
    const word2Number = new Word2Number();
    console.log(word2Number.convert("yüzyetmişiki lira on iki nokta üç kuruş"));
</script>
```

The word2number_turkish library was developed using ES6 classes.

## Test

https://endrcn.github.io/word2number_turkish/

## To Do

- [x] Handling all written numbers.
- [x] Handling phone numbers.
- [x] Handling zero number.
- [x] Handling numbers that next to each other.
- [x] Handling both numeric and written numbers.
- [x] Handling Dates.
- [x] Handling Decimal numbers.
- [x] Fuzzy matching.
- [x] Handling half numbers.

### Unit Test Status

**Total**: 54

52 success, 2 fail

![96%](https://progress-bar.dev/96)

### Known Issues
- [ ] "26FZ6A" is changed to "0 26fz 6 a"
- [ ] "2bin60" is changed to "2 bin60"

## Author

**Ender CAN**

- <https://github.com/endrcn>
- <https://twitter.com/endrcn>

## License

Open sourced under the [MIT license](LICENSE).
