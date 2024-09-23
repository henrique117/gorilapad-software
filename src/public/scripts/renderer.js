var rapidTriggerCheckbox = document.getElementById('rapid-trigger')
var continuousRapidTriggerCheckbox = document.getElementById('continuous-rapid-trigger')
var lowerActionPointSlider = document.getElementById('lower-action-point')
var upperActionPointSlider = document.getElementById('upper-action-point')
var saveButton = document.getElementById('save-button')

var lowerSliderValue = document.getElementById('lap-value');
var lowerProgressBar = document.getElementById('lap-filled-bg');
var upperSliderValue = document.getElementById('uap-value');
var upperProgressBar = document.getElementById('uap-filled-bg');

var keys = {
    key1: document.getElementById('key-1'),
    key2: document.getElementById('key-2'),
    key3: document.getElementById('key-3')
}

keys.key1.addEventListener('click', () => {
    handleKeys()
})
keys.key2.addEventListener('click', () => {
    handleKeys()
})
keys.key3.addEventListener('click', () => {
    handleKeys()
})

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

        keys.key1.innerHTML = data.Keys.Key1
        keys.key2.innerHTML = data.Keys.Key2
        keys.key3.innerHTML = data.Keys.Key3

        keys.key1.value = data.Keys.Key1
        keys.key2.value = data.Keys.Key2
        keys.key3.value = data.Keys.Key3

        handleLowerSlider()
        handleUpperSlider()
    })
}

function handleSaveButton() {
    window.api.saveData({ 
        RapidTrigger: rapidTriggerCheckbox.checked,
        ContinuousRapidTrigger: continuousRapidTriggerCheckbox.checked,
        LowerActionPoint: parseInt(lowerActionPointSlider.value),
        UpperActionPoint: parseInt(upperActionPointSlider.value),
        Keys: {
            Key1: keys.key1.value,
            Key2: keys.key2.value,
            Key3: keys.key3.value,
        }
    })
    window.api.openPopUpWindow('savedData.popUp')
}

function handleLowerSlider() {
    lowerSliderValue.innerHTML = `${(lowerActionPointSlider.value / 100)}mm`
    lowerProgressBar.style.width = `${lowerActionPointSlider.value / 4}%`
}

function handleUpperSlider() {
    upperSliderValue.innerHTML = `${(upperActionPointSlider.value / 100)}mm`
    upperProgressBar.style.width = `${upperActionPointSlider.value / 4}%`
}

function handleKeys() {
    window.api.openPopUpWindow('keyConfig.popUp')
}