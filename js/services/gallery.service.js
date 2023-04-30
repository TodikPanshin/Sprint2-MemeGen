'use strict'
const IMGS_KEY = 'imgsDB'

var gImgs 
var gKeywordSearchCountMap
var gFilterKeyword


_creategImgs()
_createKeywordSearchCountMap()

function getImgs() {

    let imgs = gImgs.filter(img => {
        return img.keywords.includes(gFilterKeyword)
    })
    gFilterKeyword = ''
    if (!imgs || !imgs.length) imgs = gImgs
    return imgs
}

function getKeyword() {
    const keywords = Object.keys(gKeywordSearchCountMap)
    return keywords
}

function setKeyWordMapValue(keyword) {
    gKeywordSearchCountMap[keyword]++
}

function getKeywordValue(keyword) {
    return gKeywordSearchCountMap[keyword]
}

function setFilterByKeyword(value) {
    gFilterKeyword = value
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function setUplodedimgs(img) {
    let upImg = _createImg(img)
    gImgs.push(upImg)
    _saveImgsToStorage()
    _createKeywordSearchCountMap()
    
}

function _createKeywordSearchCountMap() {
    const keywords = gImgs.reduce((acc, img) => {
        acc.push(...img.keywords)
        return acc
    }, [])

    const KeywordCountMap = keywords.reduce((acc, keyword) => {
        acc[keyword] = acc[keyword] ? acc[keyword] + 1 : 1
        return acc
    }, {})
    gKeywordSearchCountMap = KeywordCountMap
}

function _getNextId() {
   let id= gImgs[gImgs.length-1].id
   return id+1
}


function _creategImgs() {
    gImgs = loadFromStorage(IMGS_KEY)
    if (!gImgs || !gImgs.length) {
        gImgs = [
            { id: 1, url: 'img/1.jpg', keywords: ['evil', 'politics'] },
            { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },
            { id: 3, url: 'img/3.jpg', keywords: ['cute', 'dog', 'kid'] },
            { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
            { id: 5, url: 'img/5.jpg', keywords: ['funny', 'kid'] },
            { id: 6, url: 'img/6.jpg', keywords: ['funny', 'alien'] },
            { id: 7, url: 'img/7.jpg', keywords: ['funny', 'kid'] },
            { id: 8, url: 'img/8.jpg', keywords: ['funny', 'man'] },
            { id: 9, url: 'img/9.jpg', keywords: ['funny', 'kid'] },
            { id: 10, url: 'img/10.jpg', keywords: ['funny', 'politics'] },
            { id: 11, url: 'img/11.jpg', keywords: ['angry', 'man'] },
            { id: 12, url: 'img/12.jpg', keywords: ['man'] },
            { id: 13, url: 'img/13.jpg', keywords: ['happy', 'man', 'movie'] },
            { id: 14, url: 'img/14.jpg', keywords: ['movie', 'man'] },
            { id: 15, url: 'img/15.jpg', keywords: ['movie', 'man'] },
            { id: 16, url: 'img/16.jpg', keywords: ['funny', 'man', 'movie'] },
            { id: 17, url: 'img/17.jpg', keywords: ['evil', 'politics'] },
            { id: 18, url: 'img/18.jpg', keywords: ['animation', 'movie'] },
        ]
    }
    _saveImgsToStorage()
}

function _createImg(url, keywords = ['user-upload']) {
    return {
        id: _getNextId(),
        url:url.src,
        keywords,
    }
}

function _saveImgsToStorage() {
    saveToStorage(IMGS_KEY, gImgs)
}


