window.addEventListener('DOMContentLoaded', () => {
    const rapidTriggerCheckbox = document.getElementById('rapid-trigger')
    const actionPointRange = document.getElementById('action-point')
    const saveButton = document.getElementById('save-button')
  
    const keyInputs = Array.from(document.getElementsByClassName('key-input'))

    const loadSettings = async () => {
      const settings = await window.electronAPI.loadFromStore()
  
      if (settings) {
        rapidTriggerCheckbox.checked = settings.rapidTrigger || false
        actionPointRange.value = settings.actionPoint || 0
  
        if (settings.keys) {
          settings.keys.forEach((key, index) => {
            if (keyInputs[index]) {
              keyInputs[index].value = key
            }
          })
        }
      }
    }
  
    const saveSettings = () => {
      const rapidTrigger = rapidTriggerCheckbox.checked
      const actionPoint = parseInt(actionPointRange.value, 10)
  
      const keys = keyInputs.map(input => input.value)
  
      window.electronAPI.saveToStore({
        rapidTrigger,
        actionPoint,
        keys,
      })
    }
  
    loadSettings()
  
    saveButton.addEventListener('click', saveSettings)
  });
  