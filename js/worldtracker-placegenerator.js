let currentPlaces = [];
let previousPlaces = [];

function nothing() {
    return false;
}

function add() {
    let type = document.getElementById("type").value
    let lat = document.getElementById("lat").value
    let long = document.getElementById("long").value
    let title = document.getElementById("title").value
    let desc = document.getElementById("desc").value
    let visits = document.getElementById("visits").value
    visits = parseVisits(visits);

    let place = newPlace(
        type,lat,long,title,desc,visits
    )
    console.log(place)
    previousPlaces = [];
    previousPlaces.push(...currentPlaces);
    currentPlaces.push(place);
    display();
}

function newPlace(type, lat, lng, title, desc, visits) {
    return {
        type: type,
        latitude: lat,
        longitude: lng,
        title: title,
        description: desc,
        visits: visits
    }
}

function parseVisits(visits) {
    let v = [];

    let lines = visits.split("\n");
    console.log(lines)
    for (let line of lines) {
        let parts = line.split("#");
        console.log(parts)

        if(parts && parts.length >= 2) {
            v.push(newVisit(parts[0], parts[1]))
        }
    }
    return v;
}

function newVisit(date, info) {
    return {
        date: date,
        info: info
    }
}

function display() {
    let places = document.getElementById("places")
    places.textContent = JSON.stringify(currentPlaces, null, "\t");
}