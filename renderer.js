const textarea = document.querySelector('textarea')

textarea.addEventListener('input',(event) => {
    window.electronAPI.updateData(event.target.value)
})

window.electronAPI.js_beautify_global(js_beautify)
window.electronAPI.css_beautify_global(css_beautify)
window.electronAPI.html_beautify_global(html_beautify)
