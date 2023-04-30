'use strict'
const MEMES_KEY = 'memesDB'



var randomLines = ['I sometimes eat Falafel', 'you think this is air your breathing  now', 'this is funny', 'i know css', 'test',]

var gMemes
var gMeme = _createMeme()

function setRandomMeme() {
    gMeme = _createMeme(_createlines(getRandomInt(1, 3)))
    gMeme.lines.forEach(line => {
        line.txt = randomLines[getRandomInt(0, randomLines.length)]
        line.size = getRandomInt(30, 60)
        line.fillStyle = getRandomColor()
        line.strokeStyle = getRandomColor()
    })

}

function getMeme() {
    return {
        img: getImgById(gMeme.selectedImgId),
        lines: gMeme.lines,
    }
}

function getImgById(imgIdx) {
    if(imgIdx==='user')return
    return gImgs.find(img => imgIdx === img.id)
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(value) {
    gMeme.lines[gMeme.selectedLineIdx].txt = value
}

function setLineColor(colorEv) {
    if (colorEv.name === 'lineFillStyle') {
        gMeme.lines[gMeme.selectedLineIdx].fillStyle = colorEv.value
    }
    else gMeme.lines[gMeme.selectedLineIdx].strokeStyle = colorEv.value
}

function setLineSize(value) {
    if (value === 'line-size-up') gMeme.lines[gMeme.selectedLineIdx].size += 5
    else gMeme.lines[gMeme.selectedLineIdx].size -= 5
}

function setLineAlignment(value) {
    if (value === 'right') gMeme.lines[gMeme.selectedLineIdx].align = 'right'
    if (value === 'center') gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    if (value === 'left') gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function setLineSwitch() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) return gMeme.selectedLineIdx = 0
    gMeme.selectedLineIdx++
}

function getCurrLineIdx() {
    return gMeme.selectedLineIdx
}

function setLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}

function handlLine(value) {
    if (value === 'add') {

        if (gMeme.lines.length === 1) {
            gMeme.lines.push(_createline())
            setLineIdx(gMeme.lines.length - 1)
            setLinePos({ x: 200, y: 350 })
        }
        else if (gMeme.lines.length === 2) {
            gMeme.lines.push(_createline())
            setLineIdx(gMeme.lines.length - 1)
            setLinePos({ x: 200, y: 200 })
        }
        else if (gMeme.lines.length > 2) {
            gMeme.lines.push(_createline())
            setLineIdx(gMeme.lines.length - 1)
            setLinePos({ x: 200, y: gMeme.lines[gMeme.lines.length - 2].pos.y + 50 })
        }
    }
    else if (value === 'delete' || gMeme.lines.length) {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        setLineIdx(0)
    }
    if (!gMeme.lines.length) {
        gMeme.lines.push(_createline())
        setLineIdx(0)
        setLinePos({ x: 200, y: 50 })
    }
}

function setLinePos(pos, idx = gMeme.selectedLineIdx) {
    gMeme.lines[idx].pos = pos

}

function moveLinePos(pos) {
    console.log(pos)
    gMeme.lines[gMeme.selectedLineIdx].pos.x += pos.dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += pos.dy
    // console.log(gMeme.lines[gMeme.selectedLineIdx].pos)
}

function saveCurrMeme(currmeme) {
    gMeme.imgUrl = currmeme
    gMemes = loadFromStorage(MEMES_KEY)
    if (!gMemes || !gMemes.length) {
        gMemes = []
        gMemes.push(gMeme)
    }
    else gMemes.push(gMeme)
    _saveMemesToStorage()
    console.log(gMemes)

}

function _createlines(num = 1) {
    const lines = []
    for (let i = 0; i < num; i++) {
        lines.push(_createline())
    }
    return lines
}

function _createline() {
    return {
        txt: 'add meme text',
        size: 40,
        width: 0,
        pos: {},
        align: 'center',
        fillStyle: '#FFFFFF',
        strokeStyle: '#000000',
    }
}

function _createMeme(lines = _createlines()) {
    return {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines,
    }
}

function _saveMemesToStorage() {
    saveToStorage(MEMES_KEY, gMemes)
} 
