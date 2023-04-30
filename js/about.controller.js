'use strict'

function renderAboutTxt(){
 
    const strHtmls=`<p>${makeLorem()}</p>
    <img class="sleepy" src="/img/sleepy.jpg" alt="">`
    document.querySelector('.about-text').innerHTML = strHtmls
}