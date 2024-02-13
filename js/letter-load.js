function load() {
    for (let i = 0; i < letters.length; i++) {
        addEnvelope(letters[i].id, letters[i].title)
    }

    let envs = document.getElementsByClassName('envelope')

    for (let i = 0; i < envs.length; i++) {
        envs[i].addEventListener('click', function() {
            displayLetter(envs[i].getAttribute("data-id"))
        })
    }
}

function addEnvelope(id, title) {
    let envs = document.getElementById('envelope-container')
    envs.innerHTML +=
        `<div class="envelope" data-id=${id}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
            </svg>
            <p>${title}</p>
        </div>`
}

function displayLetter(id) {
    console.log("displayLetter: " + id);

    let letterExists = false;
    let letter = null;
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].id === parseInt(id)) {
            letterExists = true;
            letter = letters[i];
        }
    }
    if (!letterExists) return;

    let header = document.getElementById("letter-header")
    header.innerHTML = `<h1 class="title">${letter.title}</h1>
            <h4>${letter.date}</h4>`;

    let content = document.getElementById("letter-content")
    let newContent = "";
    for (let i = 0; i < letter.content.length; i++) {
        newContent += `<p>${letter.content[i]}</p>`;
    }
    content.innerHTML = newContent;
    content.innerHTML = content.innerHTML + `<p>${letter.signoff}<br><span class="signature">${letter.signature}</span></p>`;

    jump("letter-header");
}

function jump(h){
    let top = document.getElementById(h).offsetTop; //Getting Y of target element
    window.scrollTo(0, top-40);                        //Go there directly or some transition
}

load();