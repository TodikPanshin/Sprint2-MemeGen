'use strict'

let gElCanvas
let gCtx
let gCurrMeme

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    //  resizeCanvas()
    // renderMeme()
    renderGallery()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}


function renderMeme() {
    const elImg = new Image()
    const currMeme = getMeme()
    let lineHeight = 50
    gCurrMeme = currMeme
    // console.log(gCurrMeme)
    elImg.src = currMeme.img.url

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gCurrMeme.lines.map((line, idx) => {
            if (idx === 0) drawText(line, 200, 50)
            if (idx === 1) drawText(line, 200, 350)
            if (idx === 2) drawText(line, 200, 200)
            if (idx > 2) drawText(line, 200, lineHeight += 50)
        })
    }
}

function drawText(line, x, y) {
    const { txt = 'help', size = 40, align = 'center', color = 'white' } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}


function onSetLineTxt(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('.user-text')

    if (elTxt.value) {
        setLineTxt(elTxt.value)
        renderMeme()
    }
}

function onHandleSwitch(ev) {
    if (ev) ev.preventDefault()
    const elTxt = document.querySelector('.user-text')
    const elColor=document.querySelector('.line-color')
    const currLine=getCurrLineIdx()
    const { txt , color } = gCurrMeme.lines[currLine]
    elTxt.value = txt
    elColor.value=color



}

function onSetLineColor(ev) {
    ev.preventDefault()
    const elColor = ev.target
    console.log(elColor.value)
    setLineColor(elColor.value)
    renderMeme()
}

function onSetLineSize(ev) {
    ev.preventDefault()
    const elsize = ev.target
    setLineSize(elsize.value)
    renderMeme()
}

function onSetLineSwitch() {
    setLineSwitch()
    onHandleSwitch()
}