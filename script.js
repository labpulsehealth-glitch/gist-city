/* =========================================
   GIST CITY
   Game Engine v0.2
========================================= */

const defaultGame = {
  money: 100000,
  happiness: 75,
  reputation: 50,
  drama: 10,
  energy: 100,
  career: 0,
  relationships: 50,

  amakaTrust: 65,
  danielTrust: 50,

  evidence: [],
  inventory: [],

  helpRaised: 21000,

  playerType: "student"
};

let game = JSON.parse(
  localStorage.getItem("gistCityGame")
) || defaultGame;


/* =========================================
   SAVE GAME
========================================= */

function saveGame() {
  localStorage.setItem(
    "gistCityGame",
    JSON.stringify(game)
  );

  updateUI();
}


/* =========================================
   SCREEN NAVIGATION
========================================= */

function showScreen(screenId) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(screenId);

  if (target) {
    target.classList.add("active");
  }

  document.getElementById("mainNav").classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (screenId === "jobs") {
    renderJobs();
  }

  if (screenId === "gist") {
    renderGist();
  }

  updateUI();
}


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {
  document.getElementById("mainNav")
    .classList.toggle("open");
}


/* =========================================
   TOAST
========================================= */

function toast(message) {

  const box = document.getElementById("toast");

  box.textContent = message;
  box.classList.add("show");

  setTimeout(() => {
    box.classList.remove("show");
  }, 2800);
}


/* =========================================
   FORMAT MONEY
========================================= */

function money(amount) {

  return "₦" + Number(amount).toLocaleString("en-NG");
}


/* =========================================
   UPDATE UI
========================================= */

function updateUI() {

  const values = {
    homeMoney: money(game.money),
    homeHappiness: game.happiness + "%",
    homeReputation: game.reputation,
    homeDrama: game.drama,

    walletAmount: money(game.money),

    energyValue: game.energy,
    careerValue: game.career,
    relationshipValue: game.relationships,

    reputationValue: game.reputation,

    amakaTrust: game.amakaTrust,
    danielTrust: game.danielTrust,

    helpRaised: money(game.helpRaised)
  };

  Object.keys(values).forEach(id => {

    const element = document.getElementById(id);

    if (element) {
      element.textContent = values[id];
    }

  });

  const amakaBar =
    document.getElementById("amakaBar");

  if (amakaBar) {
    amakaBar.style.width =
      Math.max(0, Math.min(100, game.amakaTrust)) + "%";
  }

  const danielBar =
    document.getElementById("danielBar");

  if (danielBar) {
    danielBar.style.width =
      Math.max(0, Math.min(100, game.danielTrust)) + "%";
  }

  const helpProgress =
    document.getElementById("helpProgress");

  if (helpProgress) {

    const percentage =
      (game.helpRaised / 50000) * 100;

    helpProgress.style.width =
      Math.min(100, percentage) + "%";
  }

  const evidenceCount =
    document.getElementById("evidenceCount");

  if (evidenceCount) {
    evidenceCount.textContent =
      game.evidence.length + " / 4";
  }
}


/* =========================================
   CHARACTER / STORY START
========================================= */

function chooseStory(type) {

  const amounts = {
    student: 100000,
    worker: 250000,
    business: 350000,
    wealthy: 700000
  };

  const names = {
    student: "Student Life",
    worker: "Working Class",
    business: "Entrepreneur",
    wealthy: "Wealthy Family"
  };

  game.playerType = type;
  game.money = amounts[type];

  saveGame();

  toast(
    `You chose ${names[type]}. You start with ${money(amounts[type])}.`
  );

  setTimeout(() => {
    showScreen("jobs");
  }, 900);
}


/* =========================================
   JOB SYSTEM
========================================= */

const jobs = [

  {
    id: "tutor",
    icon: "📚",
    title: "Private Tutor",
    description: "Teach a student after school.",
    pay: 15000,
    energy: 15,
    career: 4
  },

  {
    id: "designer",
    icon: "🎨",
    title: "Graphic Designer",
    description: "Create flyers and social media designs.",
    pay: 25000,
    energy: 20,
    career: 6
  },

  {
    id: "customer",
    icon: "💬",
    title: "Customer Support",
    description: "Help customers solve their problems.",
    pay: 18000,
    energy: 15,
    career: 5
  },

  {
    id: "vendor",
    icon: "🛍️",
    title: "Market Vendor",
    description: "Sell products at Market Square.",
    pay: 22000,
    energy: 18,
    career: 5
  },

  {
    id: "content",
    icon: "📱",
    title: "Content Creator",
    description: "Create content and grow your audience.",
    pay: 30000,
    energy: 25,
    career: 8
  },

  {
    id: "developer",
    icon: "💻",
    title: "Junior Developer",
    description: "Build websites and digital products.",
    pay: 40000,
    energy: 30,
    career: 10
  }
];


function renderJobs() {

  const container =
    document.getElementById("jobsList");

  if (!container) return;

  container.innerHTML = jobs.map(job => `

    <div class="job-card">

      <div class="job-icon">${job.icon}</div>

      <h3>${job.title}</h3>

      <p>${job.description}</p>

      <p class="job-pay">
        +${money(job.pay)}
      </p>

      <p>
        Energy: -${job.energy}
      </p>

      <button
        class="small-btn"
        onclick="workJob('${job.id}')">
        Work
      </button>

    </div>

  `).join("");
}


function workJob(jobId) {

  const job =
    jobs.find(j => j.id === jobId);

  if (!job) return;

  if (game.energy < job.energy) {

    toast(
      "You're too tired. Rest before working again."
    );

    return;
  }

  game.money += job.pay;
  game.energy -= job.energy;
  game.career += job.career;
  game.happiness += 2;

  game.happiness =
    Math.min(100, game.happiness);

  saveGame();

  toast(
    `You worked as a ${job.title} and earned ${money(job.pay)}.`
  );
}


/* =========================================
   REST
========================================= */

function rest() {

  game.energy += 30;
  game.energy = Math.min(100, game.energy);

  game.happiness += 5;
  game.happiness = Math.min(100, game.happiness);

  saveGame();

  toast("You rested. Energy restored.");
}


/* =========================================
   FAMILY
========================================= */

function callMum() {

  game.happiness += 5;
  game.relationships += 4;

  game.happiness =
    Math.min(100, game.happiness);

  game.relationships =
    Math.min(100, game.relationships);

  document.getElementById("mumMessage").textContent =
    '"Okay my child. Take care of yourself and call me again later."';

  saveGame();

  toast("You called Mum. She is happy.");
}


function helpSibling() {

  if (game.money < 5000) {

    toast(
      "You don't have enough GIST money."
    );

    return;
  }

  game.money -= 5000;
  game.relationships += 5;
  game.happiness += 2;

  saveGame();

  toast(
    "You sent your sibling ₦5,000."
  );
}


function replyAunty() {

  game.drama += 3;

  saveGame();

  toast(
    "You replied politely. Aunty Bisi still has questions."
  );
}


/* =========================================
   RELATIONSHIPS
========================================= */

function talkToAmaka() {

  game.amakaTrust += 5;
  game.relationships += 3;

  game.amakaTrust =
    Math.min(100, game.amakaTrust);

  saveGame();

  toast(
    "You spent time with Amaka. Trust increased."
  );
}


function talkToDaniel() {

  game.danielTrust += 5;
  game.relationships += 3;

  game.danielTrust =
    Math.min(100, game.danielTrust);

  saveGame();

  toast(
    "Daniel appreciated the conversation."
  );
}


/* =========================================
   HELP ME OUT
========================================= */

function contribute(amount) {

  if (game.money < amount) {

    toast(
      "You don't have enough GIST money to contribute."
    );

    return;
  }

  if (game.helpRaised >= 50000) {

    toast(
      "This request has already been completed."
    );

    return;
  }

  game.money -= amount;
  game.helpRaised += amount;

  if (game.helpRaised >= 50000) {

    game.helpRaised = 50000;

    game.reputation += 10;

    toast(
      "You helped Amaka complete her rent request! ❤️"
    );

  } else {

    game.reputation += 2;

    toast(
      `You contributed ${money(amount)} to Amaka's request.`
    );
  }

  saveGame();
}


/* =========================================
   ANONYMOUS SYSTEM
========================================= */

function anonymousAction(action) {

  if (action === "investigate") {

    toast(
      "You decided not to believe the message blindly."
    );

    setTimeout(() => {
      showScreen("investigation");
    }, 700);

    return;
  }

  if (action === "ignore") {

    game.drama -= 2;
    game.drama = Math.max(0, game.drama);

    saveGame();

    toast(
      "You ignored the anonymous message."
    );

    return;
  }

  if (action === "reply") {

    game.drama += 2;

    saveGame();

    toast(
      "You replied anonymously. The sender has not revealed themselves."
    );
  }
}


/* =========================================
   INVESTIGATION
========================================= */

function collectEvidence(number) {

  if (game.evidence.includes(number)) {

    toast(
      "You already checked this clue."
    );

    return;
  }

  game.evidence.push(number);

  const result =
    document.getElementById("investigationResult");

  const clues = {

    1:
      "You found a message showing that Amaka received a mysterious call at 10:42 PM.",

    2:
      "Daniel says he saw someone leave with Amaka's handbag.",

    3:
      "Amaka becomes defensive and says the bag was a gift.",

    4:
      "The guest list shows that an unknown guest signed in under a fake name."
  };

  result.style.display = "block";

  result.innerHTML =
    `<strong>New clue:</strong><br>${clues[number]}`;

  if (game.evidence.length >= 4) {

    setTimeout(() => {

      result.innerHTML += `
        <br><br>
        <strong>Investigation complete.</strong>
        You now have enough evidence to decide what to do.
        <br><br>

        <button class="small-btn"
          onclick="confrontAmaka()">
          Confront Amaka
        </button>
      `;

    }, 500);
  }

  saveGame();
}


function confrontAmaka() {

  if (game.evidence.length < 4) {

    toast(
      "You need all four pieces of evidence first."
    );

    return;
  }

  game.amakaTrust -= 10;
  game.drama += 8;
  game.reputation += 5;

  game.amakaTrust =
    Math.max(0, game.amakaTrust);

  saveGame();

  toast(
    "Amaka finally reveals part of the truth. But there is more to the story..."
  );
}


/* =========================================
   EXPOSED
========================================= */

function exposedChoice(choice) {

  if (choice === "defend") {

    game.amakaTrust += 8;
    game.reputation += 2;

    toast(
      "You defended Amaka. Maybe there is more to the story."
    );
  }

  if (choice === "investigate") {

    toast(
      "You chose evidence over gossip."
    );

    showScreen("investigation");

    return;
  }

  if (choice === "share") {

    game.drama += 10;
    game.reputation -= 3;

    toast(
      "You shared the gist. Now everyone knows."
    );
  }

  if (choice === "ignore") {

    game.drama -= 2;

    toast(
      "You stayed out of the drama."
    );
  }

  game.drama =
    Math.max(0, game.drama);

  game.reputation =
    Math.max(0, game.reputation);

  saveGame();
}


/* =========================================
   MARKET
========================================= */

function buyItem(name, price) {

  if (game.money < price) {

    toast(
      "You don't have enough GIST money."
    );

    return;
  }

  if (game.inventory.includes(name)) {

    toast(
      `You already own ${name}.`
    );

    return;
  }

  game.money -= price;

  game.inventory.push(name);

  game.happiness += 4;

  game.happiness =
    Math.min(100, game.happiness);

  saveGame();

  toast(
    `You bought ${name}.`
  );
}


/* =========================================
   GIST FEED
========================================= */

function renderGist() {

  const feed =
    document.getElementById("gistFeed");

  if (!feed) return;

  const stories = [

    {
      icon: "🔥",
      title: "Someone in Palm Heights just bought a mansion.",
      text: "Nobody knows where the money came from."
    },

    {
      icon: "🫂",
      title: "34 players contributed to Ada's rent.",
      text: "The community reached her target in less than an hour."
    },

    {
      icon: "👀",
      title: "Someone is pretending to be broke.",
      text: "But their shopping history tells another story."
    },

    {
      icon: "🎓",
      title: "Drama at Gist University.",
      text: "Two friends may no longer be speaking after a party."
    }
  ];

  feed.innerHTML = stories.map(story => `

    <article class="gist-item">

      <span style="font-size:1.5rem">
        ${story.icon}
      </span>

      <h3>${story.title}</h3>

      <p>${story.text}</p>

      <small>Just now · Gist City</small>

    </article>

  `).join("");
}


/* =========================================
   RESET GAME
========================================= */

function resetGame() {

  const confirmReset =
    confirm(
      "Are you sure you want to reset your GIST CITY game?"
    );

  if (!confirmReset) return;

  localStorage.removeItem("gistCityGame");

  game = {
    ...defaultGame,
    evidence: [],
    inventory: []
  };

  saveGame();

  showScreen("home");

  toast("Your GIST CITY story has restarted.");
}


/* =========================================
   INITIALISE
========================================= */

renderJobs();
renderGist();
updateUI();
