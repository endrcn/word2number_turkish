const Enum = {
    NUMBER_TYPES: {
        "ZERO": 0,
        "DIGIT": 1,
        "TEN": 10,
        "HUNDRED": 100,
        "MAGNITUDE": 1000,
        "NUMBER": 2
    }
};

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
            "dokuz": 9
        }

        this.tens = {
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

        this.decimalSplitter = {
            "nokta": ".",
            "virgül": ","
        }

        this.digitWords = Object.keys(this.digits);
        this.tenWords = Object.keys(this.tens);
        this.magnitudeWords = Object.keys(this.magnitude);
        this.hundredWords = Object.keys(this.hundred);
        this.zeroWords = Object.keys(this.zero);
        this.decimalSplitterWords = Object.keys(this.decimalSplitter);
    }

    convert(text = "") {
        text = this.putSynonyms(text);
        let words = this.splitSentenceToWords(text);
        let indexes = this.findNumbersIndexes(words);
        for (let i = indexes.length - 1; i >= 0; i--) {
            let numberWords = words.slice(indexes[i].startIndex, indexes[i].endIndex + 1);
            let number = this.converToNumber(numberWords);
            words.splice(indexes[i].startIndex, indexes[i].endIndex + 1 - indexes[i].startIndex, number);
        }

        let sentence = words.join(" ");

        sentence = this.putDecimalSplitters(sentence);

        return sentence;
    }

    converToNumber(numberWords) {
        let totalValue = 0;
        let localValue = 0;
        let zeroNumber = "";
        for (let i = 0; i < numberWords.length; i++) {
            let word = numberWords[i];
            let numberType = this.getNumberType(word);
            if (numberType == Enum.NUMBER_TYPES.ZERO) {
                zeroNumber = "0";
            } else if (numberType == Enum.NUMBER_TYPES.NUMBER) {
                localValue += parseInt(word);
            } else if (numberType == Enum.NUMBER_TYPES.DIGIT || numberType == Enum.NUMBER_TYPES.TEN) {
                localValue += this.getDigit(word);
            } else if (numberType == Enum.NUMBER_TYPES.HUNDRED) {
                if (localValue == 0) localValue = 1;
                localValue *= 100;
            } else if (numberType == Enum.NUMBER_TYPES.MAGNITUDE) {
                if (localValue == 0) localValue = 1;
                localValue *= this.getMagnitude(word);
                totalValue += localValue;
                localValue = 0;
            }

        }
        totalValue += localValue;
        return zeroNumber + totalValue;
    }

    getDigit(word) {
        return this.digits[word] || this.tens[word];
    }

    getMagnitude(word) {
        return this.magnitude[word];
    }

    getNumberType(word) {
        if (this.zero[word] == 0) return Enum.NUMBER_TYPES.ZERO;
        if (this.digits[word]) return Enum.NUMBER_TYPES.DIGIT;
        if (this.tens[word]) return Enum.NUMBER_TYPES.TEN;
        if (this.hundred[word]) return Enum.NUMBER_TYPES.HUNDRED;
        if (this.magnitude[word]) return Enum.NUMBER_TYPES.MAGNITUDE;
        if (this.isNumeric(word)) {
            return Enum.NUMBER_TYPES.NUMBER;
        }
    }

    __getDigitWordsRegex() {
        return new RegExp("(" + this.zeroWords.join("|") + "|" + this.magnitudeWords.join("|") + "|" + this.digitWords.join("|") + "|" + this.hundredWords.join("|") + "|" + this.tenWords.join("|") + "|(?:\\s|^)[0-9]+(?:\\s|$)" + ")", "ig");
    }

    __getDecimalSplitterRegex() {
        return new RegExp("[0-9]+(\\s+(?:" + this.decimalSplitterWords.join("|") + ")\\s+)[0-9]+", "gi");
    }

    getDecimalSplitterValue(word) {
        return this.decimalSplitter[word];
    }

    __getMagnitudeWordsRegex() {
        return new RegExp("(" + this.magnitudeWords.join("|") + "|" + this.hundredWords.join("|") + ")", "ig");
    }

    splitSentenceToWords(text) {
        return text.replace(this.__getDigitWordsRegex(), " $1 ").trim().replace(/\s{2,}/g, " ").split(" ");
    }

    findNumbersIndexes(words) {
        let digitWordsRegex = this.__getDigitWordsRegex();
        let indexes = [];
        let item = {};
        let lastNumberType = -1;
        let numberLength = -1;
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let numberType = this.getNumberType(word);
            if (word.match(digitWordsRegex)) {
                if (lastNumberType == Enum.NUMBER_TYPES.NUMBER && this.checkNumberDigit(numberLength, numberType)) {
                    if (!(item.startIndex >= 0)) {
                        item.startIndex = i;
                    } else {
                        item.endIndex = i;
                    }
                } else if (lastNumberType != -1 && (this.isNumberDigitBigger(lastNumberType, numberType) || numberType == Enum.NUMBER_TYPES.ZERO)) { // Şu anki sayının basamağı, bir önceki sayının basamağından büyük. Demek ki yeni sayı başlamış, ayırmalısın.
                    if (!(item.endIndex >= 0)) {
                        item.endIndex = item.startIndex;
                    }
                    indexes.push(item);
                    item = {};
                    item.startIndex = i;
                } else {
                    if (!(item.startIndex >= 0)) {
                        item.startIndex = i;
                    } else {
                        item.endIndex = i;
                    }

                }
            } else if (item.endIndex >= 0) {
                indexes.push(item);
                item = {};
            } else if (item.startIndex >= 0) {
                item.endIndex = item.startIndex;
                indexes.push(item);
                item = {};
            }
            lastNumberType = numberType || -1;

            if (numberType == Enum.NUMBER_TYPES.NUMBER) {
                numberLength = word.length;
            } else {
                numberLength = 0;
            }

        }

        if (item.endIndex >= 0 && item.startIndex >= 0) {
            indexes.push(item);
        }

        return indexes;
    }

    isNumberDigitBigger(lastNumberType, currentNumberType) {
        if (currentNumberType == lastNumberType) {
            return true;
        } else if (currentNumberType > lastNumberType) {
            if (currentNumberType == Enum.NUMBER_TYPES.HUNDRED && lastNumberType == Enum.NUMBER_TYPES.DIGIT) {
                return false;
            }
            if (currentNumberType == Enum.NUMBER_TYPES.MAGNITUDE) return false;

            return true;
        }

        return false;
    }

    isNumeric(word) {
        return /[0-9]+/.test(word);
    }

    checkNumberDigit(numberLength, currentNumberType) {
        if (numberLength == 1 && currentNumberType == Enum.NUMBER_TYPES.HUNDRED) return true;
        if (numberLength >= 1 && numberLength <= 3 && currentNumberType == Enum.NUMBER_TYPES.MAGNITUDE) return true;
        return false;
    }

    putDecimalSplitters(text = "") {
        return text.replace(this.__getDecimalSplitterRegex(), (input, splitterWord) => {
            return input.replace(splitterWord, this.getDecimalSplitterValue(splitterWord.trim()));
        })
    }

    createSynonyms() {
        return {
            "bir": ["b[iİıI]+r"],
            "iki": ["[iİıI]+k[ıIiİ]+"],
            "üç": ["[üÜ][çÇcC]", "[uU][cC]"],
            "dört": ["d[oOöÖ]rt"],
            "altı": ["alt[ıIiİ]"],
            "yedi": ["yed[iİıI]"],
            "sekiz": ["sek[iİıI]z"],
            "yirmi": ["y[iİıI]rm[iİıI]"],
            "altmış": ["al*tm[iİıI][sSşŞ]"],
            "yetmiş": ["yetm[iİıI][sSşŞ]"],
            "yüz": ["y[üÜuU]z"],
            "bin": ["b[iİıI]n"],
            "milyon": ["m[iİıI]lyon"],
            "milyar": ["m[iİıI]lyar"]
        }
    }

    putSynonyms(text = "") {
        let sentence = text + "";
        let synonyms = this.createSynonyms();

        for (let key in synonyms) {
            sentence = sentence.replace(new RegExp("(" + synonyms[key].join("|") + ")", "gi"), (input) => {
                return key;
            });
        }

        return sentence;
    }

}