/*
Create a simple investing game. You work by clicking on the 
screen and you can buy funds. Each fund gives you a little 
amount of money each second.

The game is supposed to be very slow.

With money you can buy help people.

Donation reward: Dividends increase by a small amount

Add a satisfying song for each click on the middle of the screen 
and clicks on each button.

TODO:
Add cookies to save the user values.

*/
function formatCurrency(value) {
    if (clickCost >= 10 || money >= 10) {
        decimals = 2;
    } else if (clickCost >= 1 || money >= 1) {
        decimals = 3;
    };

    const formattedAmount = value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals
    });
    
    return formattedAmount.substring(1);
};

function udMoneyText() {
    moneyText.textContent = formatCurrency(money);
};

function udClickCostText() {
    clickCostText.textContent = formatCurrency(clickCost);
};

function udClickValueText() {
    clickValueText.textContent = formatCurrency(clickValue);
};

function udDonatedText() {
    donatedText.textContent = formatCurrency(donated);
};

function udMpsText() {
    mpsText.textContent = formatCurrency(mps);
};

function udDividendYieldText() {
    lfdyText.textContent = formatCurrency(lfdy);
    sfdyText.textContent = formatCurrency(sfdy);
    pfdyText.textContent = formatCurrency(pfdy);
    hfdyText.textContent = formatCurrency(hfdy);
};

function buyFunds(fundPrice, dividendYield) {
    money -= fundPrice;
    mps += dividendYield;
    udMpsText();
    udMoneyText();
};

function donate(percentage, cValue, mpsValue) {
    donated += money * percentage;
    money -= money * percentage;
    clickValue += clickValue * cValue;
    mps += mpsValue;
    udMoneyText();
    udDonatedText();
};

function randomizeDy() {
    lfdy = Math.random() * (0.01 - 0.007) + 0.007;
    sfdy = Math.random() * (0.1 - 0.07) + 0.07;
    pfdy = Math.random() * (1 - 0.7) + 0.7;
    hfdy = Math.random() * (10 - 7) + 7;

    udDividendYieldText();
};

function playClickAudio() {
    if (soundOff) {
        return;
    };

    const audio = new Audio();
    audio.src = "click.mp3";
    audio.play();
};

function playButtonAudio() {
    if (soundOff) {
        return;
    };

    const audio = new Audio();
    audio.src = "purchase.mp3";
    audio.play();
};

function saveGame() {
    // Make cookie
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 90);

    document.cookie = `totalMoney=` + totalMoney + "; expires=" + expirationDate.toUTCString() + "; path=/";

    document.cookie = `money=` + money + "; expires=" + expirationDate.toUTCString() + "; path=/";

    document.cookie = `mps=` + mps + "; expires=" + expirationDate.toUTCString() + "; path=/";

    document.cookie = `donated=` + donated + "; expires=" + expirationDate.toUTCString() + "; path=/";

    document.cookie = `clickCost=` + clickCost + "; expires=" + expirationDate.toUTCString() + "; path=/";

    document.cookie = `clickValue=` + clickValue + "; expires=" + expirationDate.toUTCString() + "; path=/";

    document.cookie = `soundOff=` + soundOff + "; expires=" + expirationDate.toUTCString() + "; path=/";

};

function getCookie(cookieName) {
    // Read cookies
    if (!document.cookie) {
        if (cookieName == "clickValue") {
            return 0.01;
        }
        return 0;
    };

    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        if (cookie.startsWith(`${cookieName}=`)) {
            let cookieValue = cookie.substring(`${cookieName}=`.length, cookie.length);
            return Number(cookieValue);
        };
    };

    return 0;
};

// # Document variables
// Buttons
const fundBtns = document.querySelectorAll('[myattribute="fundBtns"]');
const donateBtns = document.querySelectorAll('[myattribute="donateBtns"]');
const buyClickBtn = document.querySelector("#buyClick");

// Money:
const moneyText = document.querySelector("#money");
const mpsText = document.querySelector("#mps");
const donatedText = document.querySelector("#donated");

// Dividend yield:
const lfdyText = document.querySelector("#lfdy");
const sfdyText = document.querySelector("#sfdy");
const pfdyText = document.querySelector("#pfdy");
const hfdyText = document.querySelector("#hfdy");

// Click
const clickCostText = document.querySelector("#clickCost");
const clickValueText = document.querySelector("#clickValue");

const middleScreen = document.querySelector("#middle");

// Sound
const disableSound = document.querySelector("#disableSound");

//# Script variables
// Money:
let totalMoney = getCookie("totalMoney");
let money = getCookie("money");
let mps = getCookie("mps");
let donated = getCookie("donated");

// Dividend yield:
let lfdy = 0.01;
let sfdy = 0.1;
let pfdy = 1;
let hfdy = 10;

// Fund prices:
const lfPrice = 50;
const sfPrice = 1000;
const pfPrice = 100000;
const hfPrice = 1000000;

// Click:
let clickCost = getCookie("clickCost");
let clickValue = getCookie("clickValue");

// How many decimals will be displayed as currency
let decimals = 4;

// Sound:
let soundOff = getCookie("soundOff");

middleScreen.addEventListener("click", () => {
    playClickAudio();
    totalMoney += clickValue;
    money += clickValue;
    udMoneyText();
});

window.addEventListener("keydown", () => {
    playClickAudio();
    totalMoney += clickValue;
    money += clickValue;
    udMoneyText();
});

disableSound.addEventListener("click", () => {
    soundOff = (soundOff == 0) ? 1 : 0;

    if (soundOff) {
        disableSound.style.backgroundColor = "#c8d0c8";
    } else {
        disableSound.style.backgroundColor = "#effdef";
    }
})

buyClickBtn.addEventListener("click", () => {
    if (money != 0 && money >= clickCost) {
        playButtonAudio();
        money -= clickCost;
        clickValue += 0.001;
        
        clickCost = totalMoney * 0.01;

        udMoneyText();
        udClickCostText();
        udClickValueText();
    };
});

fundBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        let str = btn.textContent.trim().substring(0, 3);
        
        switch (str) {
            case "Lib":
                if (money >= lfPrice) {
                    playButtonAudio();
                    buyFunds(lfPrice, lfdy);
                };
                break;
        
            case "Soc":
                if (money >= sfPrice) {
                    playButtonAudio();
                    buyFunds(sfPrice, sfdy);
                };
                break;
            
            case "Pub":
                if (money >= pfPrice) {
                    playButtonAudio();
                    buyFunds(pfPrice, pfdy);
                };
                break;
            
            case "Hum":
                if (money >= hfPrice) {
                    playButtonAudio();
                    buyFunds(hfPrice, hfdy);
                };
                break;
        };
    });
});

donateBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        let str = btn.textContent.trim();

        if (money <= 0) {
            return;
        } else if (money < 10000) {
            alert("You must have at least $10,000.00 in order to start donating.");
            return;
        };

        switch (str) {
            case "Donate 10%":
                playButtonAudio();
                donate(0.1, 0.01, 0.001);
                break;
            
            case "Donate 30%":
                playButtonAudio();
                donate(0.3, 0.03, 0.003);
                break;
            
            case "Donate 50%":
                playButtonAudio();
                donate(0.5, 0.05, 0.005);
                break;
            
            case "Donate 70%":
                playButtonAudio();
                donate(0.7, 0.07, 0.007);
                break;
            
            case "Donate 90%":
                playButtonAudio();
                donate(0.9, 0.09, 0.009);
                break;
        };
    });
});

setInterval(() => {
    money += mps;
    totalMoney += mps;
    udMoneyText();
    udMpsText();
    udClickCostText();
    udClickValueText();
    randomizeDy();
    saveGame();
}, 1000);