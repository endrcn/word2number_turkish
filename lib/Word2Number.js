class Word2Number {
    constructor() {
        this.magnitute = {
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
            "on": 10
        }

        this.zero = {
            "sıfır": 0
        }

        this.digitWords = Object.keys(this.digits);
        this.magnituteWords = Object.keys(this.magnitute);
    }

    convert(text = "") {
        let totalValue = 0;
        let words = text.replace(new RegExp("(" + this.magnituteWords.join("|") + "|" + this.digitWords.join("|") + ")", "ig"), " $1 ").replace(/\s{2,}/g, " ").split(" ");
        for (let i = words.length - 1; i >= 0; i--) {
            let word = words[i];
            console.log(word);
            if (this.magnituteWords.includes(word)) {
                let localValue = 0;
                let j = i - 1;
                // TODO: Burada ağırlık konusu ele alınmalıdır. Örn: bin den önce gelen yüz ifadesi varsa onun da işleme düzgün dahil olması sağlanmalı.
                while (j >= 0 && !this.magnituteWords.includes(words[j])) {
                    localValue += this.digits[words[j]];
                    console.log(words[j], localValue, totalValue);
                    j--;
                }
                i = j+1;

                totalValue += localValue * this.magnitute[word];
                console.log(word, localValue, totalValue);

            } else if (this.digitWords.includes(word)) {
                totalValue += this.digits[word];
                console.log(word, "-", totalValue);
            }
        }

        console.log(totalValue);
    }
}

module.exports = Word2Number;