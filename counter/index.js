const titleMap = new Map([
    [1000, "Beginner"],
    [2000, "Intermediate"],
    [5000, "Advanced"],
    [7000, "Serious"],
    [10000, "Impressive"],
    [20000, "Master"],
    [30000, "Grandmaster"],
    [50000, "Indefatigable"],
    [70000, "Cheater"],
    [100000, "Bot"],
    [250000, "Flabbergaster"],
    [500000, "Supernatural"],
    [750000, "=^O"],
    [1000000, "END"]
]);

const counterText = document.querySelector("#counterText");
const title = document.querySelector("#title");

let counter = getCookie("counter");

// This is done so that the page starts with the last number saved
counter -= 1;
increment();

window.addEventListener("click", increment);

function increment() {
    counter += 1;
    counterText.textContent = counter;
    if (titleMap.has(counter)) {
        title.textContent = titleMap.get(counter);
    }
    setCookie();
}

function setCookie() {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Cookie expires in 7 days
    document.cookie = `counter=${counter}; expires=${expirationDate.toUTCString()};`;
}

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

// Created on 25/05/2023