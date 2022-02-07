function nav(addr) {
    window.location.href = addr;
}

function reg(button, addr) {
    try {
        button.onclick = () => {
            nav(addr);
        }
    } catch {}
}

let back_button = document.getElementById("back-button");
let exam_button = document.getElementById("exam-button");
let work_button = document.getElementById("work-button");

reg(back_button, "index.html");
reg(exam_button, "leeds-exams.html");
reg(work_button, "leeds-work.html");