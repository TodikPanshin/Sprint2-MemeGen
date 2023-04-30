'use strict'


function renderSavedMemes() {
    const memes = loadFromStorage('memesDB')
    let strHtmls = `<h2>no memes saved</h2>`
    if (!memes) { return document.querySelector('.saved-memes-container').innerHTML = strHtmls }
    else {
        
        strHtmls = memes.map((meme) => {
            let img = new Image
            img.src=meme.imgUrl
        img.onload = () => {
                `
    <img src="${meme.imgUrl}" alt="sadnes"
    `
         }} )
            document.querySelector('.saved-memes-container').innerHTML = strHtmls.join('')
        }}

    
