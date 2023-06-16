const url = "https://live.alphatiming.co.uk/bukc.json";
//const url = "https://live.alphatiming.co.uk/bpec.json";
const compurl = "https://live.alphatiming.co.uk/bukc/competitors/"
//const compurl = "https://live.alphatiming.co.uk/bpec/competitors/"

const Astints = ["Kieran", "Dent", "Adam", "Will", "Alex", "Jake", "Jack", "Henry", "Kurt", "Brad", "Alex", "Jake", "Jack", "Henry"];
const Bstints = ["Middleton", "Cook", "Dan", "Ed", "Atkinson", "Erlam", "Milnes", "Blyth", "Elliott", "Heath", "Roman", "Spalton", "Atkinson", "Dan", "Middleton", "Milnes"]
const Cstints = ["Igor", "Kamran", "Adrian", "Luke", "Nicky", "Adrian", "Semir", "Igor", "Kamran", "Freya", "Anand", "Semir", "Vilius", "Vasalisa", "Rob", "Lewis"];
const Pstints = ["Kane", "Michael", "Ocean", "Kieran", "Tom", "Sam", "Will", "Kane", "Michael", "Ocean", "Kieran", "Tom", "Sam", "Will", "Kane"];

window.onload = () => {
    main();
    console.log("loaded")
}

let G_pitstopCutoffTime = 140000;
let G_showPitstops = false;
let G_competitorMap = {};
let G_helperOffset = 0;

async function getData(url) {
    let r;
    await fetch(url).then(data => data.json()).then(data=>r=data)
    return r;
}

function getSessionId(data) {
    return data["SessionId"];
}

function getCompetitors(data) {
    return data["Competitors"];
}

async function getCompetitorData(sessionId, competitorId) {
    if (!Number.isInteger(competitorId)) return (0, 0, 0);

    const thisurl = compurl + `${competitorId}.json?session_id=${sessionId}`
    let compdata;
    await getData(thisurl).then(
        data=>compdata=data
    );

    let laps = getCompetitors(compdata)[0]["Laps"];
    return laps;
}

function calculateStintProgress(laps) {
    let totalLaps = laps.length;
    let recentPit = 0;
    let numberOfPits = 0;
    let pitstopTimes = [];

    for (let i = totalLaps; i > 0; i--) {
        let laptime = parseInt(laps[i-1]["LapTime"])
        if (laptime > G_pitstopCutoffTime) {
            if (recentPit === 0) {
                recentPit = i;
            }
            numberOfPits++;
            pitstopTimes.push(laptime);
        }
    }
    let currentStintLaps = totalLaps - recentPit;
    return {recentPit, currentStintLaps, totalLaps, numberOfPits, pitstopTimes};
}

function determineCompetitors() {
    const teamParams = new URLSearchParams(window.location.search);
    const team1 = teamParams.get("t1");
    const team2 = teamParams.get("t2");
    const team3 = teamParams.get("t3");
    const team4 = teamParams.get("t4");

    let trackedCompetitors = [];

    if (team1 != null) {
        trackedCompetitors.push(team1);
    }

    if (team2 != null) {
        trackedCompetitors.push(team2);
    }

    if (team3 != null) {
        trackedCompetitors.push(team3);
    }

    if (team4 != null) {
        trackedCompetitors.push(team4);
    }

    if (trackedCompetitors.length === 0) {
        trackedCompetitors = ["Landow Nunder", "Bohemian BAPsody", "Lewis White and the 11 back markers"];
    }

    let style = document.createElement("style");
    style.innerHTML = `
    .lapcontainer {
      max-width: ${Math.floor(100/trackedCompetitors.length)}vw
    }
    `
    document.head.appendChild(style);

    return trackedCompetitors;
}

function determineParameters() {
    const teamParams = new URLSearchParams(window.location.search);

    const pitstopTime = teamParams.get("pst");
    if (pitstopTime != null) {
        G_pitstopCutoffTime = parseInt(pitstopTime);
    }

    const showPitstops = teamParams.get("showpst");
    if (showPitstops != null) {
        G_showPitstops = true;
    }

    const helperOffset = teamParams.get("hd");
    if (helperOffset != null) {
        G_helperOffset = parseInt(helperOffset);
    }
}

function determineHelpers(competitorId, stintNumber) {
    let helpers;

    switch(G_competitorMap[competitorId]) {
        case "Landow Nunder": {
            helpers = Astints;
            break;
        }
        case "Bohemian BAPsody": {
            helpers = Bstints;
            break;
        }
        case "Lewis white and the 11 back markers": {
            helpers = Cstints;
            break;
        }
        case "Speedophiles": {
            helpers = Pstints;
            break;
        }
        default: {
            helpers = Pstints;
            break;
        }
    }

    let max = helpers.length;

    return [helpers[stintNumber+1+G_helperOffset % max], helpers[(stintNumber+2+G_helperOffset) % max]]
}

// returns an object with sessionId and competitorIds
async function setup() {
    let basicData;
    await getData(url).then(
        data=>basicData=data
    );

    //console.log(basicData)
    let sessionId = getSessionId(basicData);
    let competitors = getCompetitors(basicData);

    //console.log(sessionId);
    //console.log(competitors);

    determineParameters();
    let trackedCompetitors = determineCompetitors();

    let returnData = {};
    returnData.competitors = [];

    //trackedCompetitors = ["test 1", "test 2", "test 3"]
    //trackedCompetitors = ["Team Tate", "MS JSR", "Red Racing"]

    let tempDict = {};

    for (let competitor of competitors) {
        //console.log(competitor["CompetitorName"])

        for (let trackedCompetitor of trackedCompetitors) {
            if (competitor["CompetitorName"] === trackedCompetitor) {
                //console.log("match")
                returnData.competitors.push({"name":competitor["CompetitorName"],"id": competitor["CompetitorId"]});
                tempDict[trackedCompetitor] = 1;
                G_competitorMap[competitor["CompetitorId"]] = trackedCompetitor;
            }
        }
    }

    for (let trackedCompetitor of trackedCompetitors) {
        if (!tempDict[trackedCompetitor]) {
            returnData.competitors.push({"name":trackedCompetitor, "id": "NA"})
        }
    }

    returnData.sessionId = sessionId;
    return returnData;
}

async function update(sessionId, competitors) {
    for (let competitor of competitors) {
        let compdata;
        await getCompetitorData(sessionId, competitor.id).then(data=> {
            compdata = data;
        })

        let {recentPit, currentStintLaps, totalLaps, numberOfPits, pitstopTimes} = calculateStintProgress(compdata);

        let display = document.getElementById(`${competitor.id}-lap`)
        display.textContent = `Pitted on L${recentPit}.\r\nCurrently L${totalLaps}.\r\nStint (${numberOfPits+1}) L${currentStintLaps}`;

        let pitstops = document.getElementById(`${competitor.id}-pitstops`);
        pitstops.innerHTML = "";

        let helpers = document.getElementById(`${competitor.id}-helpers`);
        let text = determineHelpers(competitor.id, numberOfPits);
        helpers.textContent = `Helpers: ${text[0]}, ${text[1]}`;

        let ul = document.createElement("ul");

        let i = 0;
        for (let pitstop of pitstopTimes) {
            let li = document.createElement("li");
            li.textContent = `P${++i} ${Math.floor(pitstop/60000)}:${(pitstop%60000)/1000}`;
            ul.appendChild(li);
        }
        pitstops.appendChild(ul);

        // console.log(recentPit);
        // console.log(totalLaps);
        // console.log(currentStintLaps);

        //console.log("updating competitor");
    }
}

async function main() {
    let sessionId, competitors;
    await setup().then(data => {
        sessionId = data.sessionId;
        competitors = data.competitors;
    })

    for (let i in competitors) {
        let container = document.createElement("div");
        let label = document.createElement("p");
        let lap = document.createElement("p");
        let pitstop = document.createElement("div");
        let helper = document.createElement("p")

        container.classList.add("lapcontainer");
        container.id = competitors[i]["id"];
        label.textContent = competitors[i]["name"];
        label.classList.add("label")
        lap.classList.add("lap");
        lap.id = `${competitors[i]["id"]}-lap`
        pitstop.id = `${competitors[i]["id"]}-pitstops`
        helper.id = `${competitors[i]["id"]}-helpers`


        //console.log(competitors[i]["name"]);

        container.appendChild(label);
        container.appendChild(lap);
        container.appendChild(helper);
        if (G_showPitstops) {
            container.appendChild(pitstop);
        }

        //document.body.appendChild(container);
        document.getElementById("meta").appendChild(container);


    }

    //console.log("here");

    // let laps;
    // await getCompetitorData(sessionId, competitors[0].id).then(
    //     data=>laps=data
    // );
    // //console.log(laps);
    //
    // let {recentPit, currentStintLaps, totalLaps} = calculateStintProgress(laps);
    // console.log(recentPit);
    // console.log(totalLaps);
    // console.log(currentStintLaps);

    await update(sessionId, competitors);
    setInterval(update, 20000, sessionId, competitors);

    //await update(sessionId, competitors);

    // console.log(sessionId);
    // console.log(competitors);

}