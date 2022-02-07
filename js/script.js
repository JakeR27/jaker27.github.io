function vw() { return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) }
function vh() { return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) }

let trackingMouse = false;
let startMousePos = {x: 0, y: 0}
let scrollLeft;
let sliderContainer = document.getElementById("sliders");

let leftArrow = document.getElementById("nav-button-left");
let rightArrow = document.getElementById("nav-button-right");

let currentSlide;

let arrowHoverStatus = {left: false, right: false}

leftArrow.addEventListener("mouseenter", () => {
    arrowHoverStatus.left = true;
})
leftArrow.addEventListener("mouseleave", () => {
    arrowHoverStatus.left = false;
})

rightArrow.addEventListener("mouseenter", () => {
    arrowHoverStatus.right = true;
})
rightArrow.addEventListener("mouseleave", () => {
    arrowHoverStatus.right = false;
})

window.addEventListener("mousedown", (e) => {

    if (arrowHoverStatus.left) {
        setSlide(currentSlide-1);
        console.log("left here")
        return;
    }
    if (arrowHoverStatus.right) {
        setSlide(currentSlide+1);
        return;
    }

    trackingMouse = true;
    startMousePos.x = e.pageX - sliderContainer.offsetLeft;
    scrollLeft = sliderContainer.scrollLeft;
    sliderContainer.classList.add("active");
})

window.addEventListener("mousemove", (e) => {
    if (!trackingMouse) return;
    e.preventDefault();
    const x = e.pageX - sliderContainer.offsetLeft;
    const walk = 1.5 * (x - startMousePos.x);
    sliderContainer.scrollLeft = scrollLeft - walk;
    console.log({walk, sc: sliderContainer.scrollLeft})
})

window.addEventListener("mouseup", () => {
    if (!trackingMouse) return;
    trackingMouse = false;

    sliderContainer.classList.remove("active");

    let slideIndex = Math.round(sliderContainer.scrollLeft / vw());
    console.log(slideIndex);

    let timePeriod = 2000;
    let animationStartTime = Date.now();
    let p1 = sliderContainer.scrollLeft;
    //let p2 = slideIndex * vw;

    // let timeElapsedPercentage = 0;
    // while (!trackingMouse && timeElapsedPercentage <= 1) {
    //     timeElapsedPercentage = timeSince(animationStartTime, timePeriod)
    //     let easeValue = easeFunction(timeElapsedPercentage);
    //     sliderContainer.scrollLeft = p1 + (p2 - p1) * easeValue;
    //     console.log({timeElapsedPercentage, sl: sliderContainer.scrollLeft, easeValue})
    // }

    setSlide(slideIndex);

})

function setSlide(index) {
    if (index < 0) index = 0;
    if (index > 2) index = 2;
    currentSlide = index;

    let pos = index * vw();
    sliderContainer.scrollLeft = pos;

    for (let i = 0; i < 3; i++) {
        let elements = document.querySelectorAll(`.year-${i+1}`)
        elements.forEach((element) => {
            if (i == index) {
                element.classList.add("active")
            } else {
                element.classList.remove("active")
            }

        })
    }

    switch (currentSlide) {
        case 0: leftArrow.classList.add("invisible"); break;
        case 1:  {
                    leftArrow.classList.remove("invisible");
                    rightArrow.classList.remove("invisible");
                    break;
        }
        case 2: rightArrow.classList.add("invisible"); break;
    }
}

function easeFunction(t) {
    let a = t;
    return a*a*a*a*a;
}

function timeSince(timeMillis, timePeriod) {
    return Math.round(100 * (Date.now() - timeMillis) / timePeriod) / 100;
}