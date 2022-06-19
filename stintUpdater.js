let recentLap;
let recentPitLap;

const COMP_NAME = "Leeds A"
const STINT_LEN = 70

let getRecentLap = function() {
    let table = document.getElementsByClassName("at-table_body")[0].children[0]; 
    recentLap = table.children[0].textContent
}

let getPitLap = function() {
    let table = document.getElementsByClassName("at-table_body")[0]
    for (let i = 0; i < table.children.length; i++) {
        let timeStr = table.children[i].children[2].textContent;
        let mins = timeStr.split(":")[0]
        if (mins > 1) {
            recentPitLap = table.children[i].children[0].textContent; return;
        }
    }

}

let calculateLaps = function() {
    completedLaps = parseInt(recentLap) - parseInt(recentPitLap);
}

let updateCompetitorName = function() {
    let elem = document.getElementsByClassName("at-competitor_name")[0];
    elem.textContent = `${COMP_NAME} --- ${completedLaps}/${STINT_LEN}`;
}

let updater = function() {
    getRecentLap();
    getPitLap();
    calculateLaps();
    updateCompetitorName();
}

setInterval(updater, 1000);