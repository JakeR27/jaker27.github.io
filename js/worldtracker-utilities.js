const Categories = {
    UNKNOWN: 0,
    HOME: 1,
    ACTIVITY: 2,
    STAYOVER: 3,
    VISIT: 4,
    TRANSPORT: 5,
    TRANSPORT_LOCAL: 6,
}

const MarkerIcons = [
    unknownIcon, // default unknown
    homeIcon, // default home
    kartingIcon, // default activity
    cheapHotelIcon, // default stayover
    unknownIcon, // default visit
    planeIcon, // default transport
]

const GeoFeatureGroups = [
    new L.FeatureGroup(),
]

const FeatureGroups = [
    new L.FeatureGroup(),
    new L.FeatureGroup(),
    new L.FeatureGroup(),
    new L.FeatureGroup(),
    new L.FeatureGroup(),
    new L.FeatureGroup(),
    new L.FeatureGroup(),
]

// if display is true, will be shown
const MarkerGroupZoomLevels = [
    {display: (zoom) => {return zoom > 8}}, //unknown
    {display: (zoom) => {return zoom > 4}}, //home
    {display: (zoom) => {return zoom > 9}}, //activity
    {display: (zoom) => {return zoom > 6}}, //stayover
    {display: (zoom) => {return zoom > 8}}, //visit
    {display: (zoom) => {return zoom > 7}}, //transport
    {display: (zoom) => {return zoom >12}}, //transport_local
]

function mapPoint(map, category, latLong, data, img) {

    let icon = img ?? MarkerIcons[category] ?? unknownIcon;

    let marker = L.marker([latLong.lat, latLong.long], {icon: icon}).addTo(map).bindPopup(data);
    FeatureGroups[category].addLayer(marker);

}

var geoStyle = {
    "color": "#749800",
    "weight": 4,
    "opacity": 1,
    "dashArray": 10,
};

function mapGeojson(map, geo, geocategory) {
    console.log({geo, map})
    let geofeature = L.geoJSON(geo, {style: geoStyle}).addTo(map)
    GeoFeatureGroups[0].addLayer(geofeature);
}


// Things need to have a view level
//  View level determines when it should be shown on the map (as seen in MarkerGroupZoomLevels)
//  View function should default to category
//    But can be overridden by other view level function OR custom function (takes number in, returns bool)
// transport should generally be:
// local, regional, national, international
// >= 14, >= 10   , >= 8    , >= 6


// Markers should have tags
//   Option to select one specific tag and only show those markers
//   A tag should be added for people that were there, aka jake, abby, ruby, millie, john, etc.
//   A tag should be added for locality level (local, regional etc as above)
