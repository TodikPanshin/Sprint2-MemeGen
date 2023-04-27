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
 fillStyle: 'white',
 strokeStyle:'black',
 },
 {
 txt: 'you think this is air your breathing  now',
 size: 40,
 align: 'center',
 fillStyle: 'white',
 strokeStyle:'black',
 },
 {
 txt: 'test',
 size: 40,
 align: 'center',
 fillStyle: 'white',
 strokeStyle:'black',
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

function setLineColor(colorEv){
    if(colorEv.name==='lineFillStyle'){
    gMeme.lines[gMeme.selectedLineIdx].fillStyle=colorEv.value
    }
    else gMeme.lines[gMeme.selectedLineIdx].strokeStyle=colorEv.value
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

function handlLine(value){
    if(value==='add'){
        gMeme.lines.push(_createline( ))}
        else if(value==='delete'){
            gMeme.lines.splice(gMeme.selectedLineIdx, 1)}
    }

function setLinePos(pos){
    gMeme.lines[gMeme.selectedLineIdx].pos=pos
}

function _createlines() {
        const lines = [
            _createline( ),
            _createline( ),
            _createline( ),
        ]
}

function _createline() {
    return {
        txt:'add meme text',
        size:40,
        align:'center',
        color:'white',
        strokeStyle:'black',
        pos,
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
