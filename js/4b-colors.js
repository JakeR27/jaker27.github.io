let COLORS = ["#ebce2b", "#db8917", "#96cde6", "#ba1c60", "#c0bd7f", "#7f7e80", "#5fa641", "#d485b2", "#4277b6", "#df8461", "#463397", "#e1a11a", "#e8e948", "#92ae31", "#d32b1e"];

let COLOR;
let _currentColourHue = 0;
let _colorStepAmount = 35;

function getNewColor() {
    _currentColourHue += _colorStepAmount;
    if (_currentColourHue >= 360) {
        _currentColourHue -= 360;
    }
    _updateColor();
}

function getPreColor() {
    _currentColourHue -= _colorStepAmount;
    if (_currentColourHue < 0) {
        _currentColourHue += 360;
    }
    _updateColor();
}

function _updateColor() {
    colorMode(HSL);
    COLOR = color(_currentColourHue, 70, 70);
}