function nav(addr) {
    window.location.href = addr;
}

let edu_button = document.getElementById("education-button");
let crs_button = document.getElementById("courses-button");
let wrk_button = document.getElementById("work-button");
let bck_button = document.getElementById("back-button");

try {
    edu_button.onclick = () => {
        window.location.href = "uni.html"
    }
} catch {}

try {
    crs_button.onclick = () => {
        window.location.href = "courses.html"
    }
} catch {}

try {
    wrk_button.onclick = () => {
        window.location.href = "work.html"
    }
} catch {}

try {
    bck_button.onclick = () => {
        window.location.href = "index.html"
    }
} catch {}