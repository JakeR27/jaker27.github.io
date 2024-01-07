const ICON_SIZE = 16 * 2;
const ICON_WIDTH = (ICON_SIZE * (3.0/4.0));
const ICON_WIDTH2 = (ICON_SIZE * (9.0/8.0));

function flameIcon(difficulty) {
    return `<img class='mx-2 svg-${useColor(difficulty)}-subtle' style='height:4rem;' src='img/flame.svg' alt='flame icon'>`
}
function timerIcon(difficulty) {
    return `<svg class='mx-2 svg-${useColor(difficulty)}' xmlns="http://www.w3.org/2000/svg" height="${ICON_SIZE}" width="${ICON_WIDTH}" viewBox="0 0 384 512"><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zM96 64V75c0 25.5 10.1 49.9 28.1 67.9L192 210.7l67.9-67.9c18-18 28.1-42.4 28.1-67.9V64H96zm0 384H288V437c0-25.5-10.1-49.9-28.1-67.9L192 301.3l-67.9 67.9c-18 18-28.1 42.4-28.1 67.9v11z"/></svg>`;
}

function guessIcon(difficulty) {
    return `<svg class='mx-2 svg-${useColor(difficulty)}' xmlns="http://www.w3.org/2000/svg" height="${ICON_SIZE}" width="${ICON_SIZE}" viewBox="0 0 512 512"><path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>`;
}

function vetoIcon(difficulty) {
    return `<svg class='mx-2 svg-${useColor(difficulty)}' xmlns="http://www.w3.org/2000/svg" height="${ICON_SIZE}" width="${ICON_SIZE}" viewBox="0 0 512 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"/></svg>`;
}

function touchIcon(difficulty, scale=1) {
    return `<svg class='mx-2 svg-${useColor(difficulty)}' xmlns="http://www.w3.org/2000/svg" height="${ICON_SIZE*scale}" width="${ICON_SIZE*scale}" viewBox="0 0 512 512"><path d="M256 0c-25.3 0-47.2 14.7-57.6 36c-7-2.6-14.5-4-22.4-4c-35.3 0-64 28.7-64 64V261.5l-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5L106.5 437c48 48 113.1 75 181 75H296h8c1.5 0 3-.1 4.5-.4c91.7-6.2 165-79.4 171.1-171.1c.3-1.5 .4-3 .4-4.5V160c0-35.3-28.7-64-64-64c-5.5 0-10.9 .7-16 2V96c0-35.3-28.7-64-64-64c-7.9 0-15.4 1.4-22.4 4C303.2 14.7 281.3 0 256 0zM240 96.1c0 0 0-.1 0-.1V64c0-8.8 7.2-16 16-16s16 7.2 16 16V95.9c0 0 0 .1 0 .1V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96c0 0 0 0 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16v55.9c0 0 0 .1 0 .1v80c0 13.3 10.7 24 24 24s24-10.7 24-24V160.1c0 0 0-.1 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16V332.9c-.1 .6-.1 1.3-.2 1.9c-3.4 69.7-59.3 125.6-129 129c-.6 0-1.3 .1-1.9 .2H296h-8.5c-55.2 0-108.1-21.9-147.1-60.9L52.7 315.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L119 336.4c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V96c0-8.8 7.2-16 16-16c8.8 0 16 7.1 16 15.9V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96.1z"/></svg>`;
}

function talkIcon(difficulty, scale=1) {
    return `<svg class='mx-2 svg-${useColor(difficulty)}' xmlns="http://www.w3.org/2000/svg" height="${ICON_SIZE*scale}" width="${ICON_SIZE*scale}" viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg>`;
}

function watchIcon(difficulty, scale=1) {
    return `<svg class='mx-2 svg-${useColor(difficulty)}' xmlns="http://www.w3.org/2000/svg" height="${ICON_SIZE*scale}" width="${ICON_WIDTH2*scale}" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>`;
}

let NUM_MILD_TO_PROGRESS = 6;
let NUM_MODERATE_TO_PROGRESS = 4;
let players = [];
let playerCommands = {};
let currentPlayerNum = 0;
let currentDifficulty = "mild";
let commandsInPlay = [];
let started = false;

document.addEventListener("touchend", touchHandler, false);

function touchHandler(ev) {
    if (!started) return;

    nextCard();
}

function reset() {
    players = [];
    playerCommands = {};
    currentPlayerNum = 0;
    currentDifficulty = "mild";
    commandsInPlay = [];
}

function newPlayer(name) {
    players.push(name);
    playerCommands[name] = [];
}

function start() {
    currentPlayerNum = 0;
    commandsInPlay = JSON.parse(JSON.stringify(commands));
    started = true;
    setCard(new Command("Welcome to the game", "The game is simple. You will be given a card. You and your partner must complete the card. Failing to complete a card may reward your partner with a task. The task has the same limit as the original card. Try to match the difficulty of the task with the levels below:<br><br> Pink - Easy<br>Purple - Medium<br>Red - Hard", "none", "watch touch talk", "mild"))
}

function countDifficultyCommands(playerNum, difficulty) {
    let player = players[playerNum];
    let count = 0;
    for (let command of playerCommands[player]) {
        if (command.difficulty === difficulty) {
            count++;
        }
    }
    return count;
}

function nextCard() {
    // make it the next player's turn
    currentPlayerNum = (currentPlayerNum+1) % players.length;

    // check if we need to progress the difficulty
    if (countDifficultyCommands(currentPlayerNum, "moderate") >= NUM_MODERATE_TO_PROGRESS) {
        setNewDifficulty("hot");
    } else if (countDifficultyCommands(currentPlayerNum, "mild") >= NUM_MILD_TO_PROGRESS) {
        setNewDifficulty("moderate");
    }

    //get the next command / card and set it
    let command = decideNextCommand(currentPlayerNum, currentDifficulty);
    //remove the command from play
    commandsInPlay = removeItemOnce(commandsInPlay, command)

    // record command, so we can go back or count it
    playerCommands[players[currentPlayerNum]].push(command);
    setCard(command);
}

function decideNextCommand(playerNum, difficulty) {
    let player = players[playerNum];
    let difficultyCommands = commandsInPlay.filter(command => command.difficulty === difficulty);

    if (difficultyCommands.length === 0) {
        console.error("run out of cards");
    }

    return difficultyCommands[Math.floor(Math.random() * difficultyCommands.length)];
}

function useColor(difficulty) {
    switch (difficulty) {
        case "mild": return "mild";
        case "moderate": return "moderate";
        case "hot": return "hot";
        case "crazy": return "crazy";
    }
}

function setNewDifficulty(difficulty) {
    currentDifficulty = difficulty;
}

function setCard(command) {
    let playerElement = document.getElementById("player");
    playerElement.innerHTML = players[currentPlayerNum];

    let titleElement = document.getElementById("command-title");
    titleElement.innerHTML = command.name;

    let descriptionElement = document.getElementById("command-desc");
    descriptionElement.innerHTML = command.description;

    let limitElement = document.getElementById("command-limit");
    limitElement.innerHTML = command.limit;
    if (command.limit === "none") limitElement.innerHTML = ""; // don't show anything for this command

    let limitIconElement = document.getElementById("command-limit-icon");
    limitIconElement.innerHTML = limitIcon(command.limit);

    let actionIconElement = document.getElementById("command-action-icon");
    actionIconElement.innerHTML = actionIcon(command.action);

    setCardColor(command.difficulty);
    setCardDifficultyIndicator(command.difficulty);
}

function limitIcon(limitString) {
    if (limitString.toString().includes("minute")) {
        return timerIcon(currentDifficulty);
    }
    if (limitString.toString().includes("guess")) {
        return guessIcon(currentDifficulty);
    }
    if (limitString.toString().includes("veto")) {
        return vetoIcon(currentDifficulty);
    }
    if (limitString.toString().includes("none")) {
        return "";
    }
}

function actionIcon(actionString) {
    let icons = "";

    if (actionString.toString().includes("watch")) {
        icons += watchIcon(currentDifficulty, 2);
    }
    if (actionString.toString().includes("touch")) {
        icons += touchIcon(currentDifficulty, 2);
    }
    if (actionString.toString().includes("talk")) {
        icons += talkIcon(currentDifficulty, 2);
    }
    return icons;
}

function setCardColor(difficulty) {
    let card = document.getElementById("card");
    resetColor(card);
    card.classList.add("border-" + useColor(difficulty));
    card.classList.add("bg-" + useColor(difficulty));

    let cardHeader = document.getElementById("header");
    resetColor(cardHeader);
    cardHeader.classList.add("bg-" + useColor(difficulty));

    let cardBody = document.getElementById("body");
    resetColor(cardBody);
    cardBody.classList.add("bg-" + useColor(difficulty) + "-subtle");

    let cardFooter = document.getElementById("footer");
    resetColor(cardFooter);
    cardFooter.classList.add("bg-" + useColor(difficulty));
}

function setCardDifficultyIndicator(difficulty) {
    let footer = document.getElementById("footer");

    let ctr = 0;
    switch (difficulty) {
        case "mild": ctr = 1; break;
        case "moderate": ctr = 2; break;
        case "hot": ctr = 3; break;
        case "crazy": ctr = 4; break;
    }

    footer.innerHTML = flameIcon(difficulty).repeat(ctr);
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function resetColor(element) {
    element.classList.remove("bg-mild");
    element.classList.remove("bg-moderate");
    element.classList.remove("bg-hot");
    element.classList.remove("bg-crazy");
    element.classList.remove("bg-mild-subtle");
    element.classList.remove("bg-moderate-subtle");
    element.classList.remove("bg-hot-subtle");
    element.classList.remove("bg-crazy-subtle");
    element.classList.remove("border-mild");
    element.classList.remove("border-moderate");
    element.classList.remove("border-hot");
    element.classList.remove("border-crazy");
}