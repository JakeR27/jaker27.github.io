let icalUrl = "http://p110-caldav.icloud.com/published/2/MTYwNzI5OTA2ODgxNjA3MnXxe25H7yDeha7-D7XBc0Kr4CzBQ_H7BJd7ti9g4LS1ri1l_4NgkpJRxQgl_nOXEVrn4n1PS8ZCypwDhf6390I";
const corsProxyUrl = 'http://ec2-18-130-87-165.eu-west-2.compute.amazonaws.com:8080/' + icalUrl;
let eventList;

let eventObjects = [];
let currentEventIndex = 0;



window.onload = function () {
    console.log("loaded");
    eventList = document.getElementsByClassName("list")[0];



    if (checkAccess()) {
        showEvents();
        addControlHandlers();

        fetch(corsProxyUrl)
            .then((response) => response.text())
            .then((data) => parseEvents(data));
    } else {
        alert("showing access")
        showAccess();
        addAccessHandler();
    }


}

function addControlHandlers() {
    let next = document.getElementById("next");
    next.addEventListener("click", function (event) {
        displayNextEvent();
    });

    let prev = document.getElementById("prev");
    prev.addEventListener("click", function (event) {
        displayPrevEvent();
    });
}

function showEvents() {
    document.getElementById("upcoming").classList.remove("hidden");
}

function showAccess() {
    document.getElementById("access").classList.remove("hidden");
}



function parseEvents(data) {
    let lines;

    let eventName = "EV_NAME";
    let eventDateStart = "EV_DATE_START";
    let eventDateEnd = "EV_DATE_END";
    let eventLocation = "EV_LOCATION";
    let eventDescription = "";
    let eventUid = "EV_UID";

    function evData() {
        return eventName + "\n" + eventDateStart + " -> " + eventDateEnd + "\n" + eventLocation + "\n" + eventDescription + "\n" + eventUid;
    }

    function recordEvent() {
        eventObjects.push({
            name: eventName,
            dateStart: eventDateStart,
            dateEnd: eventDateEnd,
            location: eventLocation,
            description: eventDescription,
            uid: eventUid
        });
    }
    function evReset() {
        eventName = "EV_NAME";
        eventDateStart = "EV_DATE_START";
        eventDateEnd = "EV_DATE_END";
        eventLocation = "EV_LOCATION";
        eventDescription = "";
        eventUid = "EV_UID";
    }


    lines = data.split("\n")
    for (const line of lines) {
        if (line.startsWith("END:VEVENT")) {
            // appendEventToList(evData())
            recordEvent();
        }
        if (line.startsWith("BEGIN:VEVENT")) {
            evReset();
        }
        if (line.startsWith("SUMMARY:")) {
            eventName = line.substring(8);
        }
        if (line.startsWith("DTSTART;")) {
            eventDateStart = parseDate(line.substring(8));
        }
        if (line.startsWith("DTEND;")) {
            eventDateEnd = parseDate(line.substring(6));
        }
        if (line.startsWith("LOCATION:")) {
            eventLocation = parseLocation(line.substring(9));
        }
        if (line.startsWith("DESCRIPTION:")) {
            eventDescription = line.substring(12);
        }
        if (line.startsWith("UID:")) {
            eventUid = line.substring(4);
        }
    }

    eventObjects.sort((a, b) => (a.dateStart > b.dateStart) ? 1 : -1);
    currentEventIndex = determineNextEventFromDate();
    displayCurrentEvent();
    return;


    for (const event of eventObjects) {
        appendEventToList(event);
    }
}

function determineNextEventFromDate() {
    if (eventObjects.length === 0) {
        return -1;
    }

    let index = 1;
    let now = new Date();
    for (const eventObject of eventObjects) {
        if (eventObject.dateStart < now.getTime()) {
            index++;
        }
    }
    if (index >= eventObjects.length) {
        index = eventObjects.length - 1;
    }
    return index-1;
}

function displayCurrentEvent() {
    if (currentEventIndex === -1) return;

    let event = eventObjects[currentEventIndex];
    let name = document.getElementById("tour-name");
    let start = document.getElementById("tour-start");
    let end = document.getElementById("tour-end");
    let location = document.getElementById("tour-location");
    let description = document.getElementById("tour-description");

    name.innerHTML = event.name;
    start.innerHTML = new Date(event.dateStart).toDateString();
    end.innerHTML = new Date(event.dateEnd).toDateString();
    location.innerHTML = event.location;
    description.innerHTML = event.description;

    let currentPage = document.getElementById("current-tour-page");
    let totalPage = document.getElementById("total-tour-page");
    currentPage.innerHTML = currentEventIndex+1;
    totalPage.innerHTML = eventObjects.length;

    let avatar = document.getElementById("tour-avatar-img");

    if (event.name.includes("Tour JA")) {
        avatar.src = "taj.png";
    } else if (event.name.includes("Tour AJ")) {
        avatar.src = "atj.png";
    } else {
        avatar.src = "tatj.png";
    }

    let rootStyle = document.querySelector(":root");
    let c = cyrb128(event.uid)[0] % 256;

    let oldc = rootStyle.style.getPropertyValue("--anim-color-2")
    console.log(oldc);
    //rootStyle.style.setProperty("--anim-color-1", `hsl(${c}, 75%, 80%)`);
    rootStyle.style.setProperty("--anim-color-2", `hsl(${c}, 75%, 80%)`);
    rootStyle.style.setProperty("--anim-color-3", `hsl(${c}, 75%, 80%)`);
    rootStyle.style.setProperty("--anim-color-1", `${oldc}`);
}

function displayNextEvent() {
    currentEventIndex++;
    if (currentEventIndex > eventObjects.length - 1) {
        currentEventIndex = eventObjects.length - 1;
    }
    displayCurrentEvent();
}

function displayPrevEvent() {
    currentEventIndex--;
    if (currentEventIndex < 0) {
        currentEventIndex = 0;
    }
    displayCurrentEvent();
}

function appendEventToList(event) {
    let item = document.createElement("pre")

    let text;
    for (const key in event) {
        if (Object.hasOwnProperty.call(event, key)) {
            const element = event[key];
            text += element + "\n";
        }
    }

    item.innerHTML = text;
    eventList.appendChild(item);
}

function parseDate(date) {
    let parts = date.split(":");
    date = parts[1];
    let year = date.substring(0, 4);
    let month = date.substring(4, 6);
    let day = date.substring(6, 8);
    let hour = date.substring(9, 11);
    let minute = date.substring(11, 13);
    let second = date.substring(13, 15);
    let iso = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + ".000Z";
    return Date.parse(iso);
}

function parseLocation(location) {
    location = location.replaceAll("\\n", " ");
    return location.replaceAll("\\", "");
}

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}