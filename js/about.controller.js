'use strict'

function renderAboutTxt(){
 
    const strHtmls=`<p>${makeLorem()}</p>`
    document.querySelector('.about-text').innerHTML = strHtmls
}