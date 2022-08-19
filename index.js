const axios = require("axios")
const express = require("express")
const cheerio = require("cheerio")
const app = express()
const port = 3000

async function döviz() {
let dolaralis;
let dolarsatis;
let dolaryenilenme;
let euroalis;
let eurosatis;
let euroyenilenme;
let altinalis;
let altinsatis;
let altinyenilenme;

let response = await axios.get("https://dovizborsa.com/doviz/")
let data = response.data
const $ = cheerio.load(data);

const dolartable = $('#\\34 35-1 > span.-g2.-d2._d2._x19');
dolartable.each(function() {
    let title = $(this).text();
    dolaralis = title;
});
const dolaralistable = $('#\\34 35-1 > span.-g3.-d3._d3._x19');
dolaralistable.each(function() {
    let title = $(this).text();
    dolarsatis = title;
});
const dolaryenilenmeable = $('#\\34 35-1 > span.-g5.-tm._tm.__c1');
dolaryenilenmeable.each(function() {
    let title = $(this).text();
    dolaryenilenme = title;
});

const eurotable = $('#\\32 00-1 > span.-g2.-d2._d2._x19');
eurotable.each(function() {
    let title = $(this).text();
    euroalis = title;
});
const euro2table = $('#\\32 00-1 > span.-g3.-d3._d3._x19');
euro2table.each(function() {
    let title = $(this).text();
    eurosatis = title;
});
const euro3table = $('#\\32 00-1 > span.-g5.-tm._tm.__c1');
euro3table.each(function() {
    let title = $(this).text();
    euroyenilenme = title;
});

let response2 = await axios.get("https://dovizborsa.com/altin")
let data2 = response2.data
const $2 = cheerio.load(data2);

const altin1table = $2('#\\37 51-1 > span.-g2.-d2._d2._x19');
altin1table.each(function() {
    let title = $(this).text();
    altinalis = title;
});
const altin2table = $2('#\\37 51-1 > span.-g3.-d3._d3._x19');
altin2table.each(function() {
    let title = $(this).text();
    altinsatis = title;
});
const altin3table = $2('#\\37 51-1 > span.-g5.-tm._tm.__c1');
altin3table.each(function() {
    let title = $(this).text();
    altinyenilenme = title;
});

return {
    "dolar" : {"alis" : dolaralis , "satis" : dolarsatis , "yenilenme" : dolaryenilenme},
    "euro" : {"alis" : euroalis , "satis" : eurosatis , "yenilenme" : euroyenilenme},
    "graltin" : {"alis" : altinalis , "satis" : altinsatis , "yenilenme" : altinyenilenme}
    }
}

app.get("/doviz", async (req, res) => {
    let data = await döviz()
    res.send(data)
})

app.listen(port, () => {
    console.log(`Started http://localhost:${port}`)
})