let pwds = ["jake", "joe"];

window.onload = () => {
    let curtain = document.createElement("div");
    curtain.style.zIndex = "100";
    curtain.style.backgroundColor = "#fff";
    curtain.style.height = "100vh";
    curtain.style.width = "100vw";
    curtain.style.position = "absolute";
    curtain.style.left = "0";
    curtain.style.top = "0";
    curtain.id = "hjasdasd";
    document.body.appendChild(curtain);

    let pwd = document.createElement("input");
    pwd.style.zIndex = "200";
    pwd.style.position = "absolute";
    pwd.style.left = "40vw";
    pwd.style.top = "48vh";
    pwd.id = "kasjdkjasd";
    document.body.appendChild(pwd);

    let go = document.createElement("button");
    go.style.zIndex = "200";
    go.style.position = "absolute";
    go.style.left = "47vw";
    go.style.top = "53vh";
    go.textContent = "Login";
    go.id = "jkasjldaksk"
    go.onclick = () => {

        let bx = document.getElementById("kasjdkjasd");
        console.log(bx);
        pwds.forEach((v) => {
            if (bx.value == v) {
                console.log("true");
                let pw = document.getElementById("hjasdasd");
                let lg = document.getElementById("jkasjldaksk");
                document.body.removeChild(pw);
                document.body.removeChild(bx);
                document.body.removeChild(lg);
            }
        })



    }
    document.body.appendChild(go);
}

function convertToApi(url) {
    console.log(url)
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

function downloadCSV(data, filename) {
    let csvcontent = "data:text/csv;charset=utf-8," + data;
    let encodedUri = encodeURI(csvcontent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename + ".csv")
    link.click();
}

function processData(res) {
    // let competitors = res.session.competitors;
    // let results = res.session.results;
    let competitors = res["session"]["competitors"];
    let results = res["session"]["results"];
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

function download() {
    let inputtext = document.getElementById("results-url").value;
    let links = inputtext.split("\n");
    let asOne = document.getElementById("as-one").checked;

    let apiLinks = []
    for (let i = 0; i < links.length; i++) {
        apiLinks.push(convertToApi(links[i]));
    }

    if (asOne) {
        downloadAsOne(apiLinks).then(r => {
            console.log({r});
        }).catch(err => {
            console.log(err)
        });
    }
}

async function downloadAsOne(links) {
    // let promises = []
    // for (let i = 0; i < links.length; i++) {
    //     promises.push(fetchAlphaLink(links[i]));
    // }
    //
    // let responses = await Promise.all(promises);
    // console.log(responses)

    return Promise.all(links.map(url =>
        fetch(url).then(resp=>resp.json())
    )).then(data => {

        let csvdata = "";

        for (let i = 0; i < data.length; i++) {
            csvdata += processData(data[i]);
        }

        downloadCSV(csvdata, "merged_results")
        console.log(csvdata);
    })

}

function fetchAlphaLink(url) {
    return new Promise((resolve) => {
        resolve(fetch(url).then(value => value.json()));
    });
}