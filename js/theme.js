let cssroot = "/css/"
let themes = ["light.css", "dark.css"];
let state = 1;

const elem = document.getElementById("theme-checkbox");
elem.addEventListener("change", toggleTheme);

function toggleTheme() {
    let stylesheet = document.getElementById("css-theme");
    state = (state + 1) % 2; 
    stylesheet.setAttribute("href", `${cssroot}${themes[state]}`)
}