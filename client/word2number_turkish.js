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

        this.currencies = ["tl", "dolar", "usd", "euro", "eur", "sterlin", "yuan", "ruble", "altın"];

        this.suffixes = ["de", "da", "te", "ta", "den", "dan", "ten", "tan", "e", "a", "ü", "u"];

        this.digitWords = Object.keys(this.digits);
        this.tenWords = Object.keys(this.tens);
        this.magnitudeWords = Object.keys(this.magnitude);
        this.hundredWords = Object.keys(this.hundred);
        this.zeroWords = Object.keys(this.zero);
        this.decimalSplitterWords = Object.keys(this.decimalSplitter);
    }

    convert(sentence = "") {
        let text = sentence.toLocaleLowerCase("tr-TR") + ""; // For cloning
        text = this.putSynonyms(text);
        let words = this.splitSentenceToWords(text);
        let indexes = this.findNumbersIndexes(words);
        for (let i = indexes.length - 1; i >= 0; i--) {
            let numberWords = words.slice(indexes[i].startIndex, indexes[i].endIndex + 1);
            let number = this.__converToNumber(numberWords);
            words.splice(indexes[i].startIndex, indexes[i].endIndex + 1 - indexes[i].startIndex, number);
        }

        sentence = words.join(" ");

        sentence = this.putDecimalSplitters(sentence);

        return sentence;
    }

    __converToNumber(numberWords) {
        let totalValue = 0;
        let localValue = 0;
        let zeroNumber = "";
        if (numberWords.length == 1 && this.getNumberType(numberWords[0]) == Enum.NUMBER_TYPES.NUMBER) {
            return numberWords[0];
        } else {
            for (let i = 0; i < numberWords.length; i++) {
                let word = numberWords[i];
                let numberType = this.getNumberType(word);
                if (numberType == Enum.NUMBER_TYPES.ZERO) {
                    zeroNumber = "0";
                } else if (numberType == Enum.NUMBER_TYPES.NUMBER) {
                    localValue += parseFloat(word);
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
        return new RegExp("(?:(?:^|\\s)(" + this.zeroWords.join("|") + "|" + this.magnitudeWords.join("|") + "|" + this.digitWords.join("|") + "|" + this.hundredWords.join("|") + "|" + this.tenWords.join("|") + "|[0-9]+" + ")(?:\\s|$))", "ig");
    }

    __getDigitWordsForSplit() {
        return new RegExp("(" + this.zeroWords.map(w => w + this.__getSuffixWordsRegex()).join("|") + "|" + this.magnitudeWords.map(w => w + this.__getSuffixWordsRegex()).join("|") + "|" + this.digitWords.map(w => w + this.__getSuffixWordsRegex()).join("|") + "|" + this.hundredWords.map(w => w + this.__getSuffixWordsRegex()).join("|") + "|" + this.tenWords.map(w => w + this.__getSuffixWordsRegex()).join("|") + "|[0-9]+" + this.__getSuffixWordsRegex() + "|(?:\\s|^)[0-9]+(?:\\s|$)" + ")", "ig");
    }

    __getSuffixWordsRegex() {
        return "(?=" + this.zeroWords.join("|") + "|" + this.magnitudeWords.join("|") + "|" + this.digitWords.join("|") + "|" + this.hundredWords.join("|") + "|" + this.tenWords.join("|") + "|" + this.currencies.join("|") + "|" + this.suffixes.map(x => x + "(?:$|\\s)").join("|") + "|(?:\\s|^)[0-9]+(?:\\s|$)" + ")";
    }

    __getDecimalSplitterRegex() {
        return new RegExp("[0-9]+(\\s+(?:" + this.decimalSplitterWords.join("|") + ")\\s+)[0-9]+", "gi");
    }

    getDecimalSplitterValue(word) {
        return this.decimalSplitter[word];
    }

    getHalfNumberRegex() {
        return /\s*b+u+[cCçÇ]+u+k+/gi;
    }

    __getMagnitudeWordsRegex() {
        return new RegExp("(" + this.magnitudeWords.join("|") + "|" + this.hundredWords.join("|") + ")", "ig");
    }

    splitSentenceToWords(text) {
        return text.replace(this.__getDigitWordsForSplit(), " $1 ").trim().replace(/\s{2,}/g, " ").split(" ");
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
        } else if (item.startIndex >= 0) {
            item.endIndex = item.startIndex;
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
        let sentence = text.replace(this.__getDecimalSplitterRegex(), (input, splitterWord) => {
            return input.replace(splitterWord, this.getDecimalSplitterValue(splitterWord.trim()));
        });

        sentence = sentence.replace(this.getHalfNumberRegex(), (input) => {
            return ".5";
        })

        return sentence;
    }

    createSynonyms() {
        return {
            "üç yüz": ["[uUüÜ]+[çÇcC]+[çÇcC]+[üÜuU]+z+"],
            "dört yüz": ["d+[öÖoO]+r+t+[uUüÜ]+z+"],
            "beş yüz": ["b+e+[şŞsS]+[sSşŞ]+[üÜuU]+z+"],
            "sekiz yüz": ["s+e+k+[iİıI]+z+[üÜuU]+z+"],
            "dokuz yüz": ["d+o+k+u+z+[üÜ]+z+"],
            "sıfır": ["s+[ıIiİ]+f+[ıIiİ]+r+"],
            "bir": ["b+[iİıI]+r+"],
            "iki": ["[iİıI]+k+[ıIiİ]+"],
            "üç": ["[üÜ]+[çÇcC]+", "[uU]+[cC]+"],
            "dört": ["d+[oOöÖ]+r+t+"],
            "beş": ["b+[€e]+[sSşŞ]"],
            "altı": ["a+l+t+[ıIiİ]+"],
            "yedi": ["y+e+d+[iİıI]+"],
            "sekiz": ["s+e+k+[iİıI]+z+"],
            "dokuz": ["d+o+k+u+z+"],
            "on": ["o+n+"],
            "yirmi": ["y+[iİıI]+r+m+[iİıI]+"],
            "otuz": ["o+t+u+z+"],
            "kırk": ["k+[ıIiİ]+r+k+"],
            "elli": ["e+l+l+[ıIiİ]+"],
            "altmış": ["a+l*t+m+[iİıI]+[sSşŞ]+"],
            "yetmiş": ["y+et+m+[iİıI]+[sSşŞ]+"],
            "seksen": ["s+e+k+s+e+n+"],
            "doksan": ["d+o+k+s+a+n+"],
            "yüz": ["y+[üÜuU]+z+"],
            "bin": ["b+[iİıI]+n+"],
            "milyon": ["m+[iİıI]+l+y+o*n+"],
            "milyar": ["m+[iİıI]+l+y+a*r+"]
        }
    }

    putSynonyms(text = "") {
        let sentence = text + "";
        let synonyms = this.createSynonyms();

        /*  sentence = text.replace(/(.+)(\1)/g, (input, gr) => { // Arka arkaya tekrar eden sayılar birbirinden ayrıldı.
             return gr + " " + gr;
         }) */

        for (let key in synonyms) {
            sentence = sentence.replace(new RegExp("(" + synonyms[key].join("|") + ")\\1", "gi"), (input, gr) => {
                return key + " " + key;
            })
                .replace(new RegExp("(" + synonyms[key].join("|") + ")", "gi"), (input) => {
                    return key;
                });
        }

        return sentence;
    }

}