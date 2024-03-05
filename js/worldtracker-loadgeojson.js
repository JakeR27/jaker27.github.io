let GEOS = [
    "231229-GoldenAcreParkCircular",
    "240112-KirkstallAbbey",
    "240203-SimonsideDoveCragCircular",
    "240217-HarewoodHouse",
]

let loadedGeos = [

]

function startupLoadGeos(map) {
    for (let geo of GEOS) {
        loadGeo(map,geo)
    }
}

function loadGeo(map,string) {
    fetchGeo(string).then(data => {
        loadedGeos.push(data)
        mapGeojson(map, data)
    })
}

async function fetchGeo(string) {
    return fetch("/geojson/" + string + ".geojson", {
        Method: 'GET'
    }).then(response => {
        return response.json();
    });
}