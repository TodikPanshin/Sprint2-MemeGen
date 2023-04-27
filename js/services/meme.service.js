'use strict'
const STORAGE_KEY='memeDB'


var gMeme = {
 selectedImgId: 2,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'I sometimes eat Falafel',
 size: 40,
 align: 'center',
 color: 'white'
 },
 {
 txt: 'you think this is air your breathing  now',
 size: 40,
 align: 'center',
 color: 'white'
 },
 {
 txt: 'test',
 size: 40,
 align: 'center',
 color: 'white'
 },
]
}

function getMeme(){
   return {
    img:getImgById(gMeme.selectedImgId),
    lines:gMeme.lines,
} 
}

function getImgById(imgIdx) {
    return gImgs.find(img => imgIdx === img.id)
}

function setImg(imgId){
    gMeme.selectedImgId=imgId
}

function setLineTxt(value){
gMeme.lines[gMeme.selectedLineIdx].txt=value
}

function setLineColor(value){
    gMeme.lines[gMeme.selectedLineIdx].color=value
}

function setLineSize(value){
    if(value==='line-size-up') gMeme.lines[gMeme.selectedLineIdx].size+=5
    else gMeme.lines[gMeme.selectedLineIdx].size-=5
}

function setLineSwitch(){
    if(gMeme.selectedLineIdx===gMeme.lines.length-1)return gMeme.selectedLineIdx=0
    gMeme.selectedLineIdx++
}

function getCurrLineIdx(){
    return gMeme.selectedLineIdx
}


function _createlines() {
        const lines = [
            _createline( ),
            _createline( ),
            _createline( ),
        ]
}

function _createline( ) {
    return {
        txt,
        size,
        align,
        color,
    }
}

function _createMeme( ) {
    return {
        selectedImgId,
        selectedLineIdx: 0,
        lines,
    }
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
} 