'use strict'


function renderSavedMemes() {
    const memes = loadFromStorage('memesDB')
    if(!memes)return alert('no memes')
}