'use strict'

let gElCanvas
let gCtx
let gCurrMeme

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    //  resizeCanvas()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}


function renderMeme() {
    const elImg = new Image()
    const currMeme = getMeme()
    gCurrMeme=currMeme
    elImg.src = currMeme.img.url

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gCurrMeme.line,200, 50)
    }
}


function drawText(line, x, y) {
   const {txt='help',size=40,align='center',color='white'}=line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}


function onSetLineTxt(ev){
    ev.preventDefault()
    const elTxt=document.querySelector('.user-text')
    
    if(elTxt.value) setLineTxt(elTxt.value)
    elTxt.value=''
    renderMeme()
}