var lowerSlider = document.getElementById('lower-action-point')
var lowerSliderValue = document.getElementById('lap-value')
var lowerProgressBar = document.getElementById('lap-filled-bg')

var upperSlider = document.getElementById('upper-action-point')
var upperSliderValue = document.getElementById('uap-value')
var upperProgressBar = document.getElementById('uap-filled-bg')

lowerSliderValue.innerHTML = `${(lowerSlider.value / 100)}mm`
upperSliderValue.innerHTML = `${(upperSlider.value / 100)}mm`

lowerProgressBar.style.width = `${lowerSlider.value / 4}%`
upperProgressBar.style.width = `${upperSlider.value / 4}%`

function handleLowerSlider() {
    lowerSliderValue.innerHTML = `${(lowerSlider.value / 100)}mm`
    lowerProgressBar.style.width = `${lowerSlider.value / 4}%`
}

function handleUpperSlider() {
    upperSliderValue.innerHTML = `${(upperSlider.value / 100)}mm`
    upperProgressBar.style.width = `${upperSlider.value / 4}%`
}