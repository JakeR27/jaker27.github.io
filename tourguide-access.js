function validateAccess() {
    let elem = document.getElementById("key");
    if (elem.value==="AlwaysYours") {
        setCookie("access", "true", 1);
        window.location.reload();
    }
}

function checkAccess() {
    let access = getCookie("access");
    return access === "true";
}

function addAccessHandler() {
    let elem = document.getElementById("key");
    elem.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            validateAccess();
        }
    });
    let button = document.getElementById("confirm");
    button.addEventListener("click", function(event) {
        validateAccess();
    });
}