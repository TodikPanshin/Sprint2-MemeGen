'use strict'

renderGallery()
function renderGallery(){
    const strHtmls = `
    <img src="img/1.jpg" alt="" />
    <img src="img/2.jpg" alt="" />
    `
    document.querySelector('.main-gallery').innerHTML = strHtmls
}