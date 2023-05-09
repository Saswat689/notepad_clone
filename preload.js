const { ipcRenderer,contextBridge } = require('electron')

let js_beautify
let html_beautify
let css_beautify

window.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('textarea')
    textarea.focus()

    ipcRenderer.on('data', (event, value) => {
        textarea.value = value
    })

    //format js
    ipcRenderer.on('formatjs', function (evt, message) {
        textarea.value = js_beautify(textarea.value)
    });

    //format css
    ipcRenderer.on('formatcss', function (evt, message) {
        textarea.value = css_beautify(textarea.value)
    });

    //format html
    ipcRenderer.on('formathtml', function (evt, message) {
        textarea.value = html_beautify(textarea.value)
    });
})

contextBridge.exposeInMainWorld('electronAPI', {
  updateData: (data) => ipcRenderer.send('updatedata', data),
  //exposing library functions to render
  js_beautify_global: (func) => {js_beautify = func},
  css_beautify_global: (func) => {css_beautify = func},
  html_beautify_global: (func) => {html_beautify = func},
})