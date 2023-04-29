'use strict'



function renderGallery() {
    const imgs = getImgs()
    const strHtmls = imgs.map(img =>
        `
    <img src=${img.url} alt='${img.keywords}' onclick="onImgSelect(${img.id})"  class="img-${img.id}"/>
    `
    )
    document.querySelector('.main-gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(imgId) {
    document.querySelector('.main-gallery-layout').classList.add('hidden')
    document.querySelector('.main-editor-layout').classList.remove('hidden')
    setImg(imgId)
    renderMeme()
    resizeCanvas()
}

function onGetRandomMeme() {
    const imgs = getImgs()
    setRandomMeme()
    onImgSelect(getRandomInt(1, imgs.length))
}

function renderKeyWordCunt() {
    const keywords = getKeyword()

    const strHtmls = keywords.map(keyword =>
        `<div class="keyword ${keyword}" value="${getKeywordValue(keyword)}"  onclick="onHandelKeyword('${keyword}')">${keyword}</div>
    `
    )
    document.querySelector('.keyword-container').innerHTML = strHtmls.join('')
    keywords.map(keyword => setKeywordSize(keyword))
}

function renderKeywordFilter(){
    const keywords= getKeyword()
    const strHtmls=keywords.map(keyword=>
        `<option value="${keyword}">
        `)
        document.querySelector('#keywords').innerHTML = strHtmls.join('')
}

function setKeywordSize(keyword) {
    const startingFontSize = window.getComputedStyle(document.body, null)
        .getPropertyValue('font-size')
        .slice(0, 2) * 1
    const add = 3
    const keywordSize = getKeywordValue(keyword)
    document.querySelector(`.${keyword}`).style.fontSize += startingFontSize+(keywordSize * add) + "px"
}

function onHandelKeyword(keyword) {
    setKeyWordMapValue(keyword)
    setFilterByKeyword(keyword)
    renderKeyWordCunt()
    renderGallery()
}

function onImgInput(ev) {
    loadImageFromInput(ev,renderMeme )
}

function onSetFilterByKeyword(ev){
    ev.preventDefault()
    const keyword=document.querySelector('.keywords-input')
    if(keyword.value)setFilterByKeyword(keyword.value)
    keyword.value=''
    renderGallery()
}

