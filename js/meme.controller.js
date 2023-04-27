'use strict'

let gElCanvas
let gCtx
let gCurrMeme
let gStartPos
let gPressd = false

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    //  resizeCanvas()
    // renderMeme()
    renderGallery()
    addListeners()

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
    const { txt = 'help', size = 40, align = 'center', fillStyle = 'white', strokeStyle = 'black' } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeStyle
    gCtx.fillStyle = fillStyle
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    setLineSwitch()
    setLinePos({x,y})
}

function drawFocus() {
    
    console.log(hi)
}

function onHandlLine(ev) {
    ev.preventDefault
    handlLine(ev.target.value)
    renderMeme()
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
    const elColor = document.querySelector('.line-color')
    const currLineIdx = getCurrLineIdx()
    const { txt, color } = gCurrMeme.lines[currLineIdx]
    elTxt.value = txt
    elColor.value = color



}

function onSetLineColor(ev) {
    ev.preventDefault()
    const elColor = ev.target
    console.log(elColor.name, elColor.value)
    setLineColor(elColor)
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

//////////========>>>> 
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    addTextListeners()
}

function addTextListeners() {
    document.addEventListener("focus", drawFocus);
    document.addEventListener("blur", drawFocus);
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if(gCtx.isPointInPath(pos.x,pos.y)){
        drawFocus()
    }

    // console.log('pos:', pos)
    // console.log('Down')
    //Save the pos we start from
    gStartPos = pos
    gPressd = true
    // console.log(gPressd)
}

function onMove(ev) {
    if (!gStartPos || !gPressd) return
    const pos = getEvPos(ev)
    const currLineIdx = getCurrLineIdx()
    // console.log('move ', pos)

    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    gStartPos = pos
    // drawText(gMeme.lines[currLineIdx],dx,dy)
    // renderMeme()
}

function onUp() {
    // console.log('Up')
    gPressd = false
    // console.log(gPressd)
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // console.log('pos:', pos)
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        // console.log('ev.pageX:', ev.pageX)
        // console.log('ev.pageY:', ev.pageY)
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        // console.log('pos:', pos)
    }
    return pos
}
