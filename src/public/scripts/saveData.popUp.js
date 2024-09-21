const xIcon = document.getElementById('x-icon')

xIcon.addEventListener('click', () => {
    console.log('clickado')
    window.api.closePopUpWindow()
})