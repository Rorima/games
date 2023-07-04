// You can make this code more efficient using only one setInterval

const dividends = document.querySelector("#dividends");
const fundPrice = document.querySelector("#fundPrice");
const money = document.querySelector("#money");

let dividendsID;
let fundPriceID;
let moneyID;

let d = 0;
let f = 0;
let m = 0;

moneyID = setInterval(() => {
    let value = m += d;
    updateMoney(value);
}, 1000);

function updateMoney(value) {
    money.textContent = `Money: $${value.toFixed(2)}`;
};

fundPriceID = setInterval(() => {
    let randomValue = Math.random() * (100 - 70) + 70;
    f = randomValue;
    updateFundPrice(randomValue);
}, 1000);

function updateFundPrice(value) {
    fundPrice.textContent = `Funds: $${value.toFixed(2)}`
};

dividendsID = setInterval(() => {
    let randomValue = Math.random();
    d = randomValue;
    updateDividends(randomValue);
}, 1000);

function updateDividends(value) {
    dividends.textContent = `Dividends: $${value.toFixed(2)}`;
};