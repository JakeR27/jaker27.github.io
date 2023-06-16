//const url = "https://live.alphatiming.co.uk/bukc.json";
const url = "https://live.alphatiming.co.uk/bpec.json";
//const compurl = "https://live.alphatiming.co.uk/bukc/competitors/"
const compurl = "https://live.alphatiming.co.uk/bpec/competitors/"

window.onload = () => {
    main();
    console.log("loaded")
}

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

    for (let i = totalLaps; i > 0; i--) {
        let laptime = parseInt(laps[i-1]["LapTime"])
        if (laptime > 70000) {
            recentPit = i;
            break;
        }
    }
    let currentStintLaps = totalLaps - recentPit;
    return {recentPit, currentStintLaps, totalLaps};
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

    let trackedCompetitors = ["Llandow Nunder", "Bohemian BAPsody", "Lewis White and the 11 back markers"];
    let returnData = {};
    returnData.competitors = [];

    //trackedCompetitors = ["test 1", "test 2", "test 3"]
    trackedCompetitors = ["Team Tate", "MS JSR", "Red Racing"]

    for (let competitor of competitors) {
        //console.log(competitor["CompetitorName"])

        for (let trackedCompetitor of trackedCompetitors) {
            if (competitor["CompetitorName"] === trackedCompetitor) {
                //console.log("match")
                returnData.competitors.push({"name":competitor["CompetitorName"],"id": competitor["CompetitorId"]});
            }
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

        let {recentPit, currentStintLaps, totalLaps} = calculateStintProgress(compdata);

        let display = document.getElementById(`${competitor.id}-lap`)
        display.textContent = `Pitted on L${recentPit}.\r\nCurrently L${totalLaps}.\r\nStint L${currentStintLaps}`;

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

        container.classList.add("lapcontainer");
        container.id = competitors[i]["id"];
        label.textContent = competitors[i]["name"];
        label.classList.add("label")
        lap.classList.add("lap");
        lap.id = `${competitors[i]["id"]}-lap`


        //console.log(competitors[i]["name"]);

        container.appendChild(label);
        container.appendChild(lap);
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