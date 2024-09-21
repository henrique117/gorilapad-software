var rapidTriggerCheckbox = document.getElementById('rapid-trigger')
var continuousRapidTriggerCheckbox = document.getElementById('continuous-rapid-trigger')
var lowerActionPointSlider = document.getElementById('lower-action-point')
var upperActionPointSlider = document.getElementById('upper-action-point')
var saveButton = document.getElementById('save-button')

var lowerSliderValue = document.getElementById('lap-value');
var lowerProgressBar = document.getElementById('lap-filled-bg');
var upperSliderValue = document.getElementById('uap-value');
var upperProgressBar = document.getElementById('uap-filled-bg');

window.addEventListener('DOMContentLoaded', () => {
    handleLoadData()
})

saveButton.addEventListener('click', handleSaveButton)

function handleLoadData() {
    window.api.requestData()
    window.api.onReceiveData((data) => {
        rapidTriggerCheckbox.checked = data.RapidTrigger || false
        continuousRapidTriggerCheckbox.checked = data.ContinuousRapidTrigger || false

        lowerActionPointSlider.value = data.LowerActionPoint !== undefined ? data.LowerActionPoint: 200
        upperActionPointSlider.value = data.UpperActionPoint !== undefined ? data.UpperActionPoint: 200

        handleLowerSlider()
        handleUpperSlider()
    })
}

function handleSaveButton() {
    window.api.saveData({ 
        RapidTrigger: rapidTriggerCheckbox.checked,
        ContinuousRapidTrigger: continuousRapidTriggerCheckbox.checked,
        LowerActionPoint: parseInt(lowerActionPointSlider.value),
        UpperActionPoint: parseInt(upperActionPointSlider.value)
    })
    window.api.openPopUpWindow('savedData.popUp')
}

function handleLowerSlider() {
    console.log('lower slider funfando', lowerActionPointSlider.value)
    lowerSliderValue.innerHTML = `${(lowerActionPointSlider.value / 100)}mm`
    lowerProgressBar.style.width = `${lowerActionPointSlider.value / 4}%`
}

function handleUpperSlider() {
    console.log('upper slider funfando', upperActionPointSlider.value)
    upperSliderValue.innerHTML = `${(upperActionPointSlider.value / 100)}mm`
    upperProgressBar.style.width = `${upperActionPointSlider.value / 4}%`
}