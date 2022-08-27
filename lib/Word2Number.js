const Enum = require("./Enum");

class Word2Number {
    constructor() {
        this.magnitude = {
            "milyar": 1000000000,
            "milyon": 1000000,
            "bin": 1000
        }

        this.hundred = {
            "yüz": 100
        }

        this.digits = {
            "bir": 1,
            "iki": 2,
            "üç": 3,
            "dört": 4,
            "beş": 5,
            "altı": 6,
            "yedi": 7,
            "sekiz": 8,
            "dokuz": 9,
            "on": 10,
            "yirmi": 20,
            "otuz": 30,
            "kırk": 40,
            "elli": 50,
            "altmış": 60,
            "yetmiş": 70,
            "seksen": 80,
            "doksan": 90
        }

        this.zero = {
            "sıfır": 0
        }

        this.digitWords = Object.keys(this.digits);
        this.magnitudeWords = Object.keys(this.magnitude);
        this.hundredWords = Object.keys(this.hundred);
    }

    convert(text = "") {

        let words = this.splitSentenceToWords(text);
        let indexes = this.findNumbersIndexes(words);
        // console.log(indexes);
        for (let i = indexes.length - 1; i >= 0; i--) {
            let numberWords = words.slice(indexes[i].startIndex, indexes[i].endIndex + 1);
            let number = this.converToNumber(numberWords);
            words.splice(indexes[i].startIndex, indexes[i].endIndex + 1 - indexes[i].startIndex, number);
            // console.log(number);
        }

        return words.join(" ");
    }

    converToNumber(numberWords) {
        let totalValue = 0;
        let localValue = 0;

        for (let i = 0; i < numberWords.length; i++) {
            let word = numberWords[i];
            let numberType = this.getNumberType(word);
            if (numberType == Enum.NUMBER_TYPES.DIGIT) {
                localValue += this.getDigit(word);
            } else if (numberType == Enum.NUMBER_TYPES.HUNDRED) {
                localValue *= 100;
            } else if (numberType == Enum.NUMBER_TYPES.MAGNITUDE) {
                localValue *= this.getMagnitude(word);
                totalValue += localValue;
                localValue = 0;
            }

        }
        totalValue += localValue;
        return totalValue;
    }

    getDigit(word) {
        return this.digits[word];
    }

    getMagnitude(word) {
        return this.magnitude[word];
    }

    getNumberType(word) {
        if (this.digits[word]) return Enum.NUMBER_TYPES.DIGIT;
        if (this.hundred[word]) return Enum.NUMBER_TYPES.HUNDRED;
        if (this.magnitude[word]) return Enum.NUMBER_TYPES.MAGNITUDE;
    }

    __getDigitWordsRegex() {
        return new RegExp("(" + this.magnitudeWords.join("|") + "|" + this.digitWords.join("|") + "|" + this.hundredWords.join("|") + ")", "ig");
    }

    __getMagnitudeWordsRegex() {
        return new RegExp("(" + this.magnitudeWords.join("|") + "|" + this.hundredWords.join("|") + ")", "ig");
    }

    splitSentenceToWords(text) {
        return text.replace(this.__getDigitWordsRegex(), " $1 ").trim().replace(/\s{2,}/g, " ").split(" ");
    }

    findNumbersIndexes(words) {
        let digitWordsRegex = this.__getDigitWordsRegex();
        let magnitudeWordsRegex = this.__getMagnitudeWordsRegex();
        let indexes = [];
        let item = {};
        let lastMagnitudeValue = 0;
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            if (word.match(digitWordsRegex)) {

                if (!(item.startIndex >= 0)) {
                    item.startIndex = i;
                } else {
                    item.endIndex = i;
                }

            } else if (item.endIndex) {
                indexes.push(item);
                item = {};
            }
        }

        return indexes;
    }


}

module.exports = Word2Number;