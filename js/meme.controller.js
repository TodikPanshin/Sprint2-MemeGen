'use strict'

let gElCanvas
let gCtx
let gStartPos
let gPressd = false
let firstload = true
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
     resizeCanvas()
    // renderMeme()
    renderGallery()
    renderKeyWordCunt()
    renderKeywordFilter()
    addListeners()
    renderAboutTxt()
}

function onOpenGallery() {
    const elGallery = document.querySelector('.main-gallery-layout')
    const elEditor = document.querySelector('.main-editor-layout')
    const elAbout = document.querySelector('.main-about-layout')
    const elMemes = document.querySelector('.main-saved-memes-layout')

    if (!elEditor.classList.contains('hidden')) elEditor.classList.add('hidden')
    if (!elMemes.classList.contains('hidden')) elMemes.classList.add('hidden')
    if (!elAbout.classList.contains('hidden')) elAbout.classList.add('hidden')
    if (elGallery.classList.contains('hidden')) elGallery.classList.remove('hidden')

}

function onOpenMemes() {
    const elGallery = document.querySelector('.main-gallery-layout')
    const elEditor = document.querySelector('.main-editor-layout')
    const elAbout = document.querySelector('.main-about-layout')
    const elMemes = document.querySelector('.main-saved-memes-layout')

    if (!elEditor.classList.contains('hidden')) elEditor.classList.add('hidden')
    if (!elAbout.classList.contains('hidden')) elAbout.classList.add('hidden')
    if (!elGallery.classList.contains('hidden')) elGallery.classList.add('hidden')
    if (elMemes.classList.contains('hidden')) elMemes.classList.remove('hidden')
}

function onOpenAbout() {
    const elGallery = document.querySelector('.main-gallery-layout')
    const elEditor = document.querySelector('.main-editor-layout')
    const elMemes = document.querySelector('.main-saved-memes-layout')
    const elAbout = document.querySelector('.main-about-layout')

    if (!elGallery.classList.contains('hidden')) elGallery.classList.add('hidden')
    if (!elEditor.classList.contains('hidden')) elEditor.classList.add('hidden')
    if (!elMemes.classList.contains('hidden')) elMemes.classList.add('hidden')
    if (elAbout.classList.contains('hidden')) elAbout.classList.remove('hidden')
}

function onReset() {
    window.location.reload()
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
    elImg.src = currMeme.img.url
    // console.log(currMeme)    
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        if (firstload) {
            currMeme.lines.map((line, idx) => {

                if (idx === 0) {
                    drawText(line, 200, 50, idx)
                    setLinePos({ x: 200, y: 50 }, idx)
                }
                if (idx === 1) {
                    drawText(line, 200, 350, idx)
                    setLinePos({ x: 200, y: 350 }, idx)
                }
                if (idx === 2) {
                    drawText(line, 200, 200, idx)
                    setLinePos({ x: 200, y: 200 }, idx)
                }
                if (idx > 2) {
                    drawText(line, 200, lineHeight += 50)
                    setLinePos({ x: 200, y: lineHeight }, idx)
                }
                // drawTest(test1,100,100)
            })
            firstload = false
        }
        else {
            currMeme.lines.map((line) => { drawText(line, line.pos.x, line.pos.y) })
        }
        onSelectCurrLine()
    }
}

function drawText(line, x, y,) {
    const { txt = 'help', size = 40, align = 'center', fillStyle = 'white', strokeStyle = 'black' } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeStyle
    gCtx.fillStyle = fillStyle
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align
    gCtx.textBaseline = 'bottom'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onHandlLine(ev) {
    ev.preventDefault()
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

function onSelectCurrLine(ev) {
    if (ev) ev.preventDefault()
    const currMeme = getMeme()
    const elTxt = document.querySelector('.user-text')
    const elfillStyle = document.querySelector('.line-fill-style')
    const elStrokeStyle = document.querySelector('.line-stroke-style')

    const currLineIdx = getCurrLineIdx()
    const { txt, fillStyle, strokeStyle } = currMeme.lines[currLineIdx]

    elTxt.value = txt
    elfillStyle.value = fillStyle
    elStrokeStyle.value = strokeStyle

    setMarkLine(currMeme.lines[currLineIdx])
}

function setMarkLine(line) {

    const { txt, pos, size } = line
    let txtSize = gCtx.measureText(txt)
    // console.log(test)
    // console.log(pos)
    gCtx.strokeRect(pos.x - txtSize.actualBoundingBoxLeft - 5, pos.y - size, txtSize.width + 5, size + 5)

}

function onSetLineColor(ev) {
    ev.preventDefault()
    const elColor = ev.target
    // console.log(elColor.name, elColor.value)
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
    onSelectCurrLine()
}

function onSetLineAlignment(ev) {
    ev.preventDefault()
    const elAlign = ev.target
    setLineAlignment(elAlign.value)
    renderMeme()
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()

    elLink.href = data
    elLink.download = 'meme'
}

function onSaveCurrMeme() {
    saveCurrMeme()
}

//////////========>>>> listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // addTextListeners()
    
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
    const currMemeLines = getMeme().lines
    const clickedLineIdx = currMemeLines.findIndex((line) => {
        let txtSize = gCtx.measureText(line.txt)
        return pos.x >= line.pos.x - txtSize.actualBoundingBoxLeft - 5 && pos.x <= txtSize.width + 5
            && pos.y >= line.pos.y - line.size && pos.y <= line.pos.y + 5
    })
    console.log(clickedLineIdx)
    if (clickedLineIdx >= 0) {
        gStartPos = pos
        gPressd = true
        setLineIdx(clickedLineIdx)
        // console.log(getCurrLineIdx())
        renderMeme()
    }
}

function onMove(ev) {
    if (!gStartPos || !gPressd) return
    const pos = getEvPos(ev)
    // console.log('move ', pos)

    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    // console.log(dx,dy)
    moveLinePos({ dx, dy })
    gStartPos = pos
    renderMeme()
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




/////////////////////>>>>>>>>>>>>>>>>>>>>test stuff
function drawFocus() {
    console.log('hi')
    renderMeme()
}

function drawTest(el, x, y) {
    const active = document.activeElement === el;
    const width = 300;
    const height = 300;

    // text
    gCtx.fillStyle = active ? 'green' : 'black';
    gCtx.fillText(el.textContent, x, y);

    // Define clickable area
    gCtx.beginPath();
    gCtx.rect(x, y, width, height);

    // Draw focus ring, if appropriate
    gCtx.drawFocusIfNeeded(el);
}


