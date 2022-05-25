// const url = "https://results.alphatiming.co.uk/bukc/2022/10/s/10074/"

function convertToApi(url) {
    const URLin = new URL(url);
    let URLout = URLin.protocol + "//" + URLin.host
    URLout += "/api/v1"
    URLout += URLin.pathname.replace("/s/", "/sessions/")
    return URLout
}

function convertToFilename(url) {
    const URLin = new URL(url);
    let URLout = URLin.pathname;
    URLout = URLout.replace("/\//g", "-");
    return URLout
}

function download() {

    let inputtext = document.getElementById("results-url").value;
    console.log(inputtext)

    let links = inputtext.split("\n");
    console.log(links);

    let asOne = document.getElementById("as-one").checked;

    if (asOne) {
        downloadLinks(links);
    } else {
        for (let i = 0; i < links.length; i++) {
            let apistring = convertToApi(links[i])
            downloadLink(apistring);
        }
    }



    // let apistring = convertToApi(inputtext)
    // console.log(apistring)



}

function downloadLinks(urls) {
    let csvcontent = "data:text/csv;charset=utf-8,";
    let retrieved = 0;
    for (let i = 0; i < urls.length; i++) {
        console.log("Retrieving: " + urls[i]);
        retrieveData(urls[i]).then(res => {
            csvcontent += processData(res);
            retrieved += 1;
            console.log("Retrieved: " + urls[i]);
        })
    }

    while (retrieved < urls.length) {
        // wait
    }

    let encodedUri = encodeURI(csvcontent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", convertToFilename(urls[i]) + ".csv")
    link.click();

}

function downloadLink(url) {
    retrieveData(url).then(res => {

        console.log(res)

        let csvcontent = "data:text/csv;charset=utf-8," + processData(res);
        let encodedUri = encodeURI(csvcontent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", convertToFilename(url) + ".csv")
        link.click();

        //console.log(csvstring);
    })
}

function processData(res) {
    let competitors = res.session.competitors;
    let results = res.session.results;
    let csvstring = "";

    for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < competitors.length; j++) {
            if (results[i].scid == competitors[j].scid) {
                let str = `${results[i].p},${results[i].gpts},${competitors[j].na},${competitors[j].tdn}\n`
                //console.log(str)
                csvstring = csvstring.concat(str)
                // console.log(`#${results[i].p} gaining ${results[i].gpts} pts is ${competitors[j].tdn} for ${competitors[j].na}`)
            }
        }
    }
    return csvstring
}

async function retrieveData(url) {
    const response = await fetch(url, {
        method: "GET"
    });
    return response.json();
}
//console.log(convertToApi(url));