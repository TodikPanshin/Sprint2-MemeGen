'use strict'
const STORAGE_KEY='memeDB'
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}];

var gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'I sometimes eat Falafel',
 size: 40,
 align: 'center',
 color: 'white'
 }
 ]
}

function getMeme(){
   return {
    img:getImg(gMeme.selectedImgId),
    line:gMeme.lines[gMeme.selectedLineIdx] ,
} 
}

function getImg(imgIdx) {
    return gImgs.find(img => imgIdx === img.id)
}

function setLineTxt(value){
gMeme.lines[gMeme.selectedLineIdx].txt=value
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