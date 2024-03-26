let map;
let latlonginfo;


function createMap() {
    map = L.map('map').setView([53.8, -1.55], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        detectRetina: true,
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    latlonginfo = L.control();

    latlonginfo.jbsdata = {lat: 0, lng: 0, zoom: 0}

    latlonginfo.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        return this._div;
    };

    latlonginfo.settingsButtonHandler = function( ) {
        alert("not implemented yet");
    }

// method that we will use to update the control based on feature properties passed
    latlonginfo.updateLocation = function (props) {
        this.jbsdata.lat = props.lat;
        this.jbsdata.lng = props.lng;

        this.updateHtml();
    };

    latlonginfo.updateZoom = function (props) {
        this.jbsdata.zoom = props.zoom;

        this.updateHtml();
    };

    latlonginfo.updateHtml = function () {
        this._div.innerHTML = '<h4>Location</h4>' +
            '<b>Latitude:</b>  ' + this.jbsdata.lat.toFixed(5) + '<br />'
            + '<b>Longitude:</b> ' + this.jbsdata.lng.toFixed(5) + '<br />'
            + '<b>Zoom</b>: ' + this.jbsdata.zoom + "</br>"
            + '<button onclick="latlonginfo.settingsButtonHandler()">Map Settings</button>';
    }

    latlonginfo.addTo(map);
    GeoFeatureGroups[0].addTo(map);

    for (let category in Categories) {
        map.removeLayer(FeatureGroups[Categories[category]]);
    }
    zoomCallback();

}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function attachListeners() {
    // noinspection SpellCheckingInspection
    map.on('zoomend', zoomCallback );
    map.on('contextmenu', function(ev){
        let latlng = map.mouseEventToLatLng(ev.originalEvent);
        latlonginfo.updateLocation(latlng)
        copyToClipboard(`latitude: ${latlng.lat.toFixed(5)}, longitude: ${latlng.lng.toFixed(5)},`)

        map.removeLayer(GeoFeatureGroups[0]);
    });

    map.on('mousemove', function(ev){
        let latlng = map.mouseEventToLatLng(ev.originalEvent);
        latlonginfo.updateLocation(latlng)
        // copyToClipboard(`latitude: ${latlng.lat}, longitude: ${latlng.lng},`)
    });
    map.on('zoom', function(ev){
        latlonginfo.updateZoom({zoom: map.getZoom()})
    });
}

function zoomCallback() {

    console.log(map.getZoom());

    let zoom = map.getZoom();

    for (let category in Categories) {
        if (MarkerGroupZoomLevels[Categories[category]].display(zoom)) {
            map.addLayer(FeatureGroups[Categories[category]]);
        } else {
            map.removeLayer(FeatureGroups[Categories[category]]);
        }
    }

}

function mapSavedPlaces() {
    for (let place of PLACES) {

        let popupData = "";
        popupData += `<b>${place.title ?? "MISSING TITLE"}</b><br>`;
        popupData += `${place.description ?? "MISSING DESC"}`;

        if (place.visits && place.visits.length > 0) {
            popupData += "<ul>";
            for (let visit of place.visits) {
                popupData += `<li>${visit.date}: ${visit.info}</li>`;
            }
            popupData += "</ul>";
        }

        mapPoint(map, place.type, {lat: place.latitude, long: place.longitude}, popupData, place.icon);
    }
}

createMap();
attachListeners();
mapSavedPlaces();
startupLoadGeos(map);

