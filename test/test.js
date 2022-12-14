const assert = require('chai').assert;
const path = require("path");
const word2Number = new (require("../lib/Word2Number"))();

describe(path.basename(__filename, '.js'), function () {

    it('2 milyon 300 bin tl 290 gun', function () {
        assert.equal(word2Number.convert("2 milyon 300 bin tl 290 gun"), "2300000 tl 290 gun");
    });

    it('2 bin ve 300 bin tl 290 gun', function () {
        assert.equal(word2Number.convert("2 bin ve 300 bin tl 290 gunluk faiz hesaplama"), "2000 ve 300000 tl 290 gunluk faiz hesaplama");
    });

    it('2 bin - 300 bin tl 290 gun', function () {
        assert.equal(word2Number.convert("2 bin - 300 bin tl 290 gunluk faiz hesaplama"), "2000 - 300000 tl 290 gunluk faiz hesaplama");
    });

    it('2 bin - 300 bin tl ikiyüzdoksan gun', function () {
        assert.equal(word2Number.convert("2 bin - 300 bin tl ikiyüzdoksan gunluk faiz hesaplama"), "2000 - 300000 tl 290 gunluk faiz hesaplama");
    });

    it('2milyon tl ikiyüzdoksan gun', function () {
        assert.equal(word2Number.convert("2milyon tl ikiyüzdoksan gunluk faiz hesaplama"), "2000000 tl 290 gunluk faiz hesaplama");
    });

    it('iki yüz elli iki lira', function () {
        assert.equal(word2Number.convert("iki yüz elli iki lira"), "252 lira");
    });

    it('3 milyon beş yüz bin tl"', function () {
        assert.equal(word2Number.convert("3 milyon beş yüz bin tl"), "3500000 tl");
    });

    it('6 milyar tl', function () {
        assert.equal(word2Number.convert("6 milyar tl"), "6000000000 tl");
    });

    it('6000000000 tl', function () {
        assert.equal(word2Number.convert("6000000000 tl"), "6000000000 tl");
    });

    it('6 milyar beş yüz elli milyon iki yüz altı bin üç yüz atmış iki tl', function () {
        assert.equal(word2Number.convert("6 milyar beş yüz elli milyon iki yüz altı bin üç yüz atmış iki tl"), "6550206362 tl");
    });

    it('5005', function () {
        assert.equal(word2Number.convert("5005"), "5005");
    });

    it('2 milyon 300 bin tl 290 gun', function () {
        assert.equal(word2Number.convert("2 milyon 300 bin tl 290 gun"), "2300000 tl 290 gun");
    });

    it('3 milyon beş yüz elli bin tl', function () {
        assert.equal(word2Number.convert("3 milyon beş yüz elli bin tl"), "3550000 tl");
    });

    it('3 milyon 550000 tl', function () {
        assert.equal(word2Number.convert("3 milyon 550000 tl"), "3550000 tl");
    });

    it('6 milyar 3550000 tl', function () {
        assert.equal(word2Number.convert("6 milyar 3550000 tl"), "6003550000 tl");
    });

    it('3 milyon tl vadeli hesaplama', function () {
        assert.equal(word2Number.convert("3 milyon tl vadeli hesaplama"), "3000000 tl vadeli hesaplama");
    });

    it('2 yıllık tl vadeli faiz', function () {
        assert.equal(word2Number.convert("2 yıllık tl vadeli faiz"), "2 yıllık tl vadeli faiz");
    });

    it('999999999999999999', function () {
        assert.equal(word2Number.convert("999999999999999999"), "999999999999999999");
    });

    it('2000000', function () {
        assert.equal(word2Number.convert("2000000"), "2000000");
    });

    it('21.12.2021', function () {
        assert.equal(word2Number.convert("21.12.2021"), "21.12.2021");
    });

    it('6 milyar 999 bin 30 tl', function () {
        assert.equal(word2Number.convert("6 milyar 999 bin 30 tl"), "6000999030 tl");
    });

    it('1a1a1', function () {
        assert.equal(word2Number.convert("1a1a1"), "1a1a1");
    });

    it('0', function () {
        assert.equal(word2Number.convert("0"), "0");
    });

    it('05355555555', function () {
        assert.equal(word2Number.convert("05355555555"), "05355555555");
    });

    it('535 555 5555', function () {
        assert.equal(word2Number.convert("535 555 5555"), "535 555 5555");
    });

    it('0 535 555 5555', function () {
        assert.equal(word2Number.convert("0 535 555 5555"), "0 535 555 5555");
    });

    it('3d', function () {
        assert.equal(word2Number.convert("3d"), "3d");
    });

    it('0289', function () {
        assert.equal(word2Number.convert("0289"), "0289");
    });

    it('012', function () {
        assert.equal(word2Number.convert("012"), "012");
    });

    it('oniki v sıfırdokuz v ikibinondokuz v tarihli v ekstra v borcum v ne v kadar', function () {
        assert.equal(word2Number.convert("oniki v sıfırdokuz v ikibinondokuz v tarihli v ekstra v borcum v ne v kadar"), "12 v 09 v 2019 v tarihli v ekstra v borcum v ne v kadar");
    });

    it('oniki v sıfırdokuz v ikibinon sıfırdokuz v tarihli v ekstra v borcum v ne v kadar', function () {
        assert.equal(word2Number.convert("oniki v sıfırdokuz v ikibinon sıfırdokuz v tarihli v ekstra v borcum v ne v kadar"), "12 v 09 v 2010 09 v tarihli v ekstra v borcum v ne v kadar");
    });

    it('merhaba, teşekkürler tekrar bekleriz.', function () {
        assert.equal(word2Number.convert("merhaba, teşekkürler tekrar bekleriz."), "merhaba, teşekkürler tekrar bekleriz.");
    });

    it('iki nokta on beş', function () {
        assert.equal(word2Number.convert("iki nokta on beş"), "2.15");
    });

    it('yüzyirmibeş nokta iki yüz elli iki', function () {
        assert.equal(word2Number.convert("yüzyirmibeş nokta iki yüz elli iki"), "125.252");
    });

    it('yüz kırk bir', function () {
        assert.equal(word2Number.convert("yüz kırk bir"), "141");
    });

    it('bin yüz atmış üç', function () {
        assert.equal(word2Number.convert("bin yüz atmış üç"), "1163");
    });

    it('bin dörtyüz altmış yedi', function () {
        assert.equal(word2Number.convert("bin dörtyüz altmış yedi"), "1467");
    });

    it('on sekiz buçuk', function () {
        assert.equal(word2Number.convert("on sekiz buçuk"), "18.5");
    });

    it('yüzonbir buçuk', function () {
        assert.equal(word2Number.convert("yüzonbir buçuk"), "111.5");
    });

    it('2 milyondan 200 günde ne kadar faiz alırım', function () {
        assert.equal(word2Number.convert("2 milyondan 200 günde ne kadar faiz alırım"), "2000000 dan 200 günde ne kadar faiz alırım");
    });

    it('2 milyardan üç milyona 200 günde ne kadar faiz alırım', function () {
        assert.equal(word2Number.convert("2 milyardan üç milyona 200 günde ne kadar faiz alırım"), "2000000000 dan 3000000 a 200 günde ne kadar faiz alırım");
    });

    it('bir nokta iki', function () {
        assert.equal(word2Number.convert("bir nokta iki"), "1.2");
    });

    it('iki nokta on', function () {
        assert.equal(word2Number.convert("iki nokta on"), "2.10");
    });

    it('yetmis bes', function () {
        assert.equal(word2Number.convert("yetmis bes"), "75");
    });

    it('ben binali', function () {
        assert.equal(word2Number.convert("ben binali"), "ben binali");
    });

    it('yüz yirmi dokuz ve iki yüz elli olmadı yedi', function () {
        assert.equal(word2Number.convert("yüz yirmi dokuz ve iki yüz elli olmadı yedi"), "129 ve 250 olmadı 7");
    });

    it('Onikisifirikiikibiniki', function () {
        assert.equal(word2Number.convert("Onikisifirikiikibiniki"), "12 02 2002");
    });

    it('üççyüzbintl', function () {
        assert.equal(word2Number.convert("üççyüzbintl"), "300000 tl");
    });

    it('üççüzbintl', function () {
        assert.equal(word2Number.convert("üççüzbintl"), "300000 tl");
    });

    it('dörtüzikibintl', function () {
        assert.equal(word2Number.convert("dörtüzikibintl"), "402000 tl");
    });

    it('sıfırikiikibiniki', function () {
        assert.equal(word2Number.convert("sıfırikiikibiniki"), "02 2002");
    });

    it('26FZ6A', function () {
        assert.equal(word2Number.convert("26FZ6A"), "26fz6a");
    });

    it('2yüz', function () {
        assert.equal(word2Number.convert("2yüz"), "200");
    });

    it('2bin60', function () {
        assert.equal(word2Number.convert("2bin60"), "2060");
    });

})