let passelem;
function setup() {
    noCanvas();
    let button = createButton("login");
    passelem = document.getElementById("pass");
    button.mouseClicked(check)
}

function check() {
    if (passelem.value == "4becca") {
        storeItem("jr27.slider.becca.unlocked", "allow");
        window.location.replace("index.html");
    }
}