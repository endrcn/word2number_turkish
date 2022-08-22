class Word2Number {
    constructor() {
        this.magnitude = {
            "milyar": 100000000,
            "milyon": 1000000,
            "bin": 1000,
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
    }


    /* Algoritma
    1. Sayı olan kelimelerin bütün olarak index'lerini belirle.
    2. Magnitude olanları bir önceki magnitude olana kadar ayır.
    3. Her bir magnitude alt dizisinin sayısal karşılığını çıkar.
    4. Tüm magnitude alt dizilerini birleştir.
    5. Sayıyı cümlede olması gereken yere yerleştir.
    6. Bu işlemleri tüm sayılar için tekrarla.
    */
    convert(text = "") {

        let words = this.splitSentenceToWords(text);
        let indexes = this.findNumbersIndexes(words, this.__getDigitWordsRegex());

        for (let i = 0; i < indexes.length; i++) {
            let numberWords = words.slice(indexes[i].startIndex, indexes[i].endIndex + 1);
            this.converToNumber(numberWords);
        }

        /* for (let i = words.length - 1; i >= 0; i--) {
            let word = words[i];
            console.log(word);
            if (this.magnitudeWords.includes(word)) {
                let localValue = 0;
                let j = i - 1;
                // TODO: Burada ağırlık konusu ele alınmalıdır. Örn: "bin" den önce gelen "yüz" ifadesi varsa onun da işleme düzgün dahil olması sağlanmalı.
                while (j >= 0 && !this.magnitudeWords.includes(words[j])) {
                    localValue += this.digits[words[j]];
                    console.log(words[j], localValue, totalValue);
                    j--;
                }
                i = j + 1;

                totalValue += localValue * this.magnitude[word];
                console.log(word, localValue, totalValue);

            } else if (this.digitWords.includes(word)) {
                totalValue += this.digits[word];
                console.log(word, "-", totalValue);
            }
        }

        console.log(totalValue); */
    }

    converToNumber(numberWords) {
        let indexes = this.extractMagnitudes(numberWords);

        console.log(numberWords);
        console.log(indexes);
        let totalValue = 0;
        //TODO: Bu kısım çalışmıyor! Güncellemelisin
        for (let i = 0; i < indexes.length; i++) {
            let magIndex = indexes[i].index;
            console.log("magIndex", magIndex);
            let localValue = 0;
            for (let j = magIndex+1; j < magIndex; j++) {
                let word = numberWords[j];
                let number = this.getDigit(word);
                console.log("number", number);
                localValue += number;
            }
            localValue *= indexes[i].value;
            console.log(localValue);
        }


    }

    getDigit(word) {
        return this.digits[word];
    }

    getMagnitude(word) {
        return this.magnitude[word];
    }

    extractMagnitudes(numberWords) {
        let magnitudeRgx = new RegExp("(" + this.magnitudeWords.join("|") + ")", "ig");
        let indexes = [];
        for (let i = 0; i < numberWords.length; i++) {
            let word = numberWords[i];
            let match = word.match(magnitudeRgx);
            if (match) {
                indexes.push({
                    index: i,
                    value: this.getMagnitude(match[0])
                })
            }
        }

        return indexes;

    }

    __getDigitWordsRegex() {
        return new RegExp("(" + this.magnitudeWords.join("|") + "|" + this.digitWords.join("|") + ")", "ig");
    }

    splitSentenceToWords(text) {
        return text.replace(this.__getDigitWordsRegex(), " $1 ").trim().replace(/\s{2,}/g, " ").split(" ");
    }

    findNumbersIndexes(words, rgx) {
        let indexes = [];
        let item = {};
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            if (word.match(rgx)) {
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