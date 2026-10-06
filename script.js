let player = {
    name: "",
    background: "student",
    money: 100000,
    style: "purple",
    reputation: 50,
    drama: 10,
    relationships: 50
};


/* =========================
   SCREEN NAVIGATION
========================= */

function showCharacterCreation() {

    document.getElementById("landing")
        .classList.remove("active");

    document.getElementById("characterCreation")
        .classList.add("active");
}


/* =========================
   CHARACTER STYLE
========================= */

function changeStyle(style) {

    player.style = style;

    const body = document.querySelector(".body");

    if (style === "purple") {
        body.style.background = "#6d183f";
    }

    if (style === "gold") {
        body.style.background = "#a67c31";
    }

    if (style === "pink") {
        body.style.background = "#b74e75";
    }

    if (style === "blue") {
        body.style.background = "#315b76";
    }

    showToast("✨ Style updated!");
}


/* =========================
   BACKGROUND
========================= */

function selectBackground(type) {

    player.background = type;

    const money = {
        student: 100000,
        worker: 250000,
        entrepreneur: 350000,
        wealthy: 700000
    };

    player.money = money[type];

    showToast(
        "Background selected! Starting with ₦" +
        player.money.toLocaleString()
    );
}


/* =========================
   ENTER CITY
========================= */

function enterCity() {

    const nameInput =
        document.getElementById("playerName");

    if (!nameInput.value.trim()) {

        showToast("Please enter your name first 👀");

        return;
    }

    player.name = nameInput.value.trim();

    document.getElementById("displayName")
        .textContent = player.name;

    document.getElementById("money")
        .textContent = player.money.toLocaleString();

    document.getElementById("backgroundText")
        .textContent =
        capitalize(player.background) +
        " • New in Gist City";


    document.getElementById("characterCreation")
        .classList.remove("active");

    document.getElementById("city")
        .classList.add("active");

    showToast(
        "Welcome to Gist City, " +
        player.name +
        " 👀"
    );
}


/* =========================
   HELP ME OUT
========================= */

function openHelpModal() {

    document
        .getElementById("helpModal")
        .classList.add("show");
}


function closeHelpModal() {

    document
        .getElementById("helpModal")
        .classList.remove("show");
}


function createHelpRequest() {

    const amount =
        Number(document.getElementById("helpAmount").value);

    const reason =
        document.getElementById("helpReason").value;

    if (!amount || !reason) {

        showToast(
            "Tell the city how much you need and why 😭"
        );

        return;
    }

    closeHelpModal();

    showToast(
        "💸 Your Help Me Out request is now live!"
    );
}


/* =========================
   SEND MONEY
========================= */

function sendHelp(amount) {

    if (player.money < amount) {

        showToast(
            "You're too broke to help 😭"
        );

        return;
    }

    player.money -= amount;

    player.reputation += 3;

    updateMoney();

    showToast(
        "❤️ You sent ₦" +
        amount.toLocaleString() +
        " GIST to Amaka!"
    );
}


/* =========================
   ANONYMOUS
========================= */

function investigate() {

    player.drama += 5;

    showToast(
        "🕵🏽 You decided to investigate..."
    );

    setTimeout(() => {

        showToast(
            "👀 Someone saw Amaka leaving the party with a stranger."
        );

    }, 2200);
}


/* =========================
   GIST REACTION
========================= */

function react(type) {

    player.drama += 3;

    showToast(
        type + " You joined the gist 👀"
    );
}


/* =========================
   STORY CHOICES
========================= */

function chooseStory(choice) {

    if (choice === "friendly") {

        player.relationships += 5;

        showToast(
            "😊 Your neighbour likes your friendliness."
        );
    }


    if (choice === "cold") {

        player.reputation += 2;

        showToast(
            "😐 Your neighbour thinks you're private."
        );
    }


    if (choice === "gossip") {

        player.drama += 10;

        showToast(
            "👀 Ohhh... you asked for the gist."
        );

        setTimeout(() => {

            showToast(
                "🤫 Apparently somebody in your building is hiding something."
            );

        }, 2200);
    }
}


/* =========================
   MONEY UPDATE
========================= */

function updateMoney() {

    document.getElementById("money")
        .textContent =
        player.money.toLocaleString();
}


/* =========================
   TOAST
========================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}


/* =========================
   CAPITALIZE
========================= */

function capitalize(text) {

    return text.charAt(0).toUpperCase() +
        text.slice(1);
}
