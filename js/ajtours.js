function saveObject(key, value) {
    let json = JSON.stringify(value);
    console.log({json});
    localStorage.setItem(key, json);
}

function loadObject(key) {
    let obj = localStorage.getItem(key);
    let parsed = JSON.parse(obj);
    if (parsed === undefined) {
        return {};
    }
    return parsed;
}

function constructPlace(name, category, lat, long) {
    return {
        "id": generateUUID(),
        "name": name,
        "category": category,
        "latitude": lat,
        "longitude": long
    }
}

function constructVisit(placeid, start, end, notes) {
    return {
        "id": generateUUID(),
        "placeid": placeid,
        "start": start,
        "end": end,
        "notes": notes
    }
}

function constructPlaceList(places) {
    return {
        "placelist": [...places]
    }
}

function constructVisitList(visits) {
    return {
        "visitlist": [...visits]
    }
}

function newPlaceCallback() {
    let name = document.getElementById("new-place-name").value;
    let category = document.getElementById("new-place-cat").value;
    let lat = document.getElementById("new-place-lat").value;
    let long = document.getElementById("new-place-lng").value;

    if (name == "") return;
    if (lat == "") return;
    if (long == "") return;

    let convertedLat = parseFloat(lat);
    let convertedLong = parseFloat(long);

    if (convertedLat === NaN) return;
    if (convertedLong === NaN) return;

    let place = constructPlace(name, category, convertedLat, convertedLong);

    let placelist;
    let currentPlaces;
    try {
        placelist = loadObject("places");
        currentPlaces = placelist["placelist"];
        currentPlaces.push(place);
        placelist = placelist = constructPlaceList([...currentPlaces]);
    } catch (error) {
        placelist = constructPlaceList([place]);
        currentPlaces = placelist["placelist"];
    }
    saveObject("places", placelist);
    updateSelectBox(currentPlaces);
}

function newVisitCallback() {
    let placeid = document.getElementById("record-place-id").value;
    let start = document.getElementById("record-place-start").value;
    let end = document.getElementById("record-place-end").value;
    let notes = document.getElementById("record-place-notes").value;

    if (placeid == "") return;
    if (start == "") return;
    if (end == "") return;

    let visit = constructVisit(placeid, start, end, notes);

    let visitlist;
    let currentVisits;
    try {
        visitlist = loadObject("visits");
        currentVisits = visitlist["visitlist"];
        currentVisits.push(visit);
        visitlist = visitlist = constructVisitList([...currentVisits]);
    } catch (error) {
        visitlist = constructVisitList([visit]);
        currentVisits = visitlist["visitlist"];
    }
    saveObject("visits", visitlist);
}

function constructPlaceOption(place) {
    let newOption = document.createElement("option")
    newOption.value = place["id"];
    newOption.text = place["name"];
    return newOption;
}

function updateSelectBox(placelist) {
    console.log({placelist})

    let dropdown = document.getElementById("record-place-id");
    
    let options = placelist.map(item => constructPlaceOption(item));
    dropdown.replaceChildren(...options);
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function constructGeojson(placelist, visitlist) {
    let featureList = [];

    for (const place of placelist) {
        var placevisits = visitlist.filter(visit => visit["placeid"] === place["id"]);
        var geoFeature = constructGeojsonFeature(
            place["name"], 
            place["latitude"],
            place["longitude"],
            place["category"],
            placevisits
        )
        featureList.push(geoFeature);
    }

    return {
        "type": "FeatureCollection",
        "features": featureList
    }
}

function constructGeojsonFeature(name, lat, long, category, visits) {

    console.log({lat, long});

    let formattedVisits = visits.map(visit => `${visit["start"]} - ${visit["end"]}: ${visit["notes"]}`);
    let desc = formattedVisits.join("<br>");

    return {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [lat, long]
        },
        "properties": {
            "title": name,
            "description": desc,
            "category": category
        }
    }
}

function generateGeoCallback() {
    let visits = loadObject("visits");
    let places = loadObject("places");

    console.log("1");

    if (visits === null) return;
    if (visits === undefined) return;
    if (places === null) return;
    if (places === undefined) return;

    console.log("2");

    let visitlist = visits["visitlist"];
    let placelist = places["placelist"];

    console.log("3");

    let geo = constructGeojson(placelist, visitlist);

    console.log("4");
    console.log({geo});

    let geoText = JSON.stringify(geo, null, 2);

    document.getElementById("geo-out").innerText = geoText;

    console.log("5");

    populateMap(geo);
}

function populateMap(geojson) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamJzMjciLCJhIjoiY20xbWd6dGp0MGs2bDJxcXZ5OTd0bjBkZSJ9.zyDCx2BBmq2adVKv8DGnWA';

    // styles:
    // mapbox://styles/mapbox/standard
    // mapbox://styles/mapbox/light-v11
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/standard',
        center: [-1, 53],
        zoom: 3
    });

    // add markers to map
    for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = `marker marker-${feature.properties.category}`;

        console.log("here");

        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                    `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                )
            )
        .addTo(map);
    }
}