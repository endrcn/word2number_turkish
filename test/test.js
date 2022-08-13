const assert = require('chai').assert;
const path = require("path");
const word2Number = new (require("../lib/Word2Number"))();

describe(path.basename(__filename, '.js'), function () {

    it('2 milyon 300 bin tl 290 gun', function () {
        assert.equal(word2Number.convert("2 milyon 300 bin tl 290 gun", false).trim(), "2300000 tl 290 gun");
    });

    it('2 bin ve 300 bin tl 290 gun', function () {
        assert.equal(word2Number.convert("2 bin ve 300 bin tl 290 gunluk faiz hesaplama", false).trim(), "2000 ve 300000 tl 290 gunluk faiz hesaplama");
    });

    it('2 bin - 300 bin tl 290 gun', function () {
        assert.equal(word2Number.convert("2 bin - 300 bin tl 290 gunluk faiz hesaplama", false).trim(), "2000 - 300000 tl 290 gunluk faiz hesaplama");
    });

    it('2 bin - 300 bin tl ikiyüzdoksan gun', function () {
        assert.equal(word2Number.convert("2 bin - 300 bin tl ikiyüzdoksan gunluk faiz hesaplama", false).trim(), "2000 - 300000 tl 290 gunluk faiz hesaplama");
    });

    it('2milyon tl ikiyüzdoksan gun', function () {
        assert.equal(word2Number.convert("2milyon tl ikiyüzdoksan gunluk faiz hesaplama", false).trim(), "2000000 tl 290 gunluk faiz hesaplama");
    });

    it('iki yüz elli iki lira', function () {
        assert.equal(word2Number.convert("iki yüz elli iki lira", false).trim(), "252 lira");
    });

    it('3 milyon beş yüz bin tl"', function () {
        assert.equal(word2Number.convert("3 milyon beş yüz bin tl", false).trim(), "3500000 tl");
    });

    it('6 milyar tl', function () {
        assert.equal(word2Number.convert("6 milyar tl", false).trim(), "6000000000 tl");
    });

    it('6000000000 tl', function () {
        assert.equal(word2Number.convert("6000000000 tl", false).trim(), "6000000000 tl");
    });

    it('6 milyar beş yüz elli milyon iki yüz altı bin üç yüz atmış iki tl', function () {
        assert.equal(word2Number.convert("6 milyar beş yüz elli milyon iki yüz altı bin üç yüz atmış iki tl", false).trim(), "6550206362 tl");
    });

    it('5005', function () {
        assert.equal(word2Number.convert("5005", false).trim(), "5005");
    });

    it('2 milyon 300 bin tl 290 gun', function () {
        assert.equal(word2Number.convert("2 milyon 300 bin tl 290 gun", false).trim(), "2300000 tl 290 gun");
    });

    it('3 milyon beş yüz elli bin tl', function () {
        assert.equal(word2Number.convert("3 milyon beş yüz elli bin tl", false).trim(), "3550000 tl");
    });

    it('3 milyon 550000 tl', function () {
        assert.equal(word2Number.convert("3 milyon 550000 tl", false).trim(), "3550000 tl");
    });

    it('6 milyar 3550000 tl', function () {
        assert.equal(word2Number.convert("6 milyar 3550000 tl", false).trim(), "6003550000 tl");
    });

    it('3 milyon tl vadeli hesaplama', function () {
        assert.equal(word2Number.convert("3 milyon tl vadeli hesaplama", false).trim(), "3000000 tl vadeli hesaplama");
    });

    it('2 yıllık tl vadeli faiz', function () {
        assert.equal(word2Number.convert("2 yıllık tl vadeli faiz", false).trim(), "2 yıllık tl vadeli faiz");
    });

    it('999999999999999999', function () {
        assert.equal(word2Number.convert("999999999999999999", false).trim(), "999999999999999999");
    });

    it('2000000', function () {
        assert.equal(word2Number.convert("2000000", false).trim(), "2000000");
    });

    it('21.12.2021', function () {
        assert.equal(word2Number.convert("21.12.2021", false).trim(), "21.12.2021");
    });

    it('6 milyar 999 bin 30tl', function () {
        assert.equal(word2Number.convert("6 milyar 999 bin 30tl", false).trim(), "6000999030 tl");
    });

    it('1a1a1', function () {
        assert.equal(word2Number.convert("1a1a1", false).trim(), "1a1a1");
    });

    it('0', function () {
        assert.equal(word2Number.convert("0", false).trim(), "0");
    });

    it('05363858980', function () {
        assert.equal(word2Number.convert("05363858980", false).trim(), "05363858980");
    });

    it('536 385 8980', function () {
        assert.equal(word2Number.convert("536 385 8980", false).trim(), "536 385 8980");
    });

    it('0 536 385 8980', function () {
        assert.equal(word2Number.convert("0 536 385 8980", false).trim(), "0 536 385 8980");
    });

    // TODO: Bunlara bak!
    /* it('beşyüzotuzaltı v üçyüz v seksenbeş v seksendokuz v seksen', function () {
        assert.equal(word2Number.convert("beşyüzotuzaltı üçyüz seksenbeş seksendokuz seksen", false).trim(), "536 385 8980");
    }); */

    /* it('sıfır v beşyüzotuzaltı v üçyüz v seksenbeş v seksendokuz v seksen', function () {
        assert.equal(word2Number.convert("sıfır v beşyüzotuzaltı v üçyüz v seksenbeş v seksendokuz v seksen", false).trim(), "0 536 385 8980");
    }); */

    it('3d', function () {
        assert.equal(word2Number.convert("3d", false).trim(), "3d");
    });

    it('0289', function () {
        assert.equal(word2Number.convert("0289", false).trim(), "0 289");
    });

    it('012', function () {
        assert.equal(word2Number.convert("012", false).trim(), "0 12");
    });

    it('oniki v sıfırdokuz v ikibinondokuz v tarihli v ekstra v borcum v ne v kadar', function () {
        assert.equal(word2Number.convert("oniki v sıfırdokuz v ikibinondokuz v tarihli v ekstra v borcum v ne v kadar", false).trim(), "12 v 0dokuz v 2019 v tarihli v ekstra v borcum v ne v kadar");
    });

    it('merhaba, teşekkürler tekrar bekleriz.', function () {
        assert.equal(word2Number.convert("merhaba, teşekkürler tekrar bekleriz.", false).trim(), "merhaba, teşekkürler tekrar bekleriz.");
    });



    /* it('2 milyondan 200 günde ne kadar faiz alırım', function () {
        assert.equal(word2Number.convert("2 milyondan 200 günde ne kadar faiz alırım", false).trim(), "2000000 dan 200 günde ne kadar faiz alırım");
    }); */

})