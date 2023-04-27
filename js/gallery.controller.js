'use strict'

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
var gImgs = [
    {id:1 , url: 'img/1.jpg', keywords: ['evil','politics']},
    {id:2 , url: 'img/2.jpg', keywords: ['cute', 'dog']},
    {id:3 , url: 'img/3.jpg', keywords: ['cute', 'dog','kid']},
    {id:4 , url: 'img/4.jpg', keywords: ['funny', 'cat']},
    {id:5 , url: 'img/5.jpg', keywords: ['funny', 'kid']},
    {id:6 , url: 'img/6.jpg', keywords: ['funny', 'alien']},
    {id:7 , url: 'img/7.jpg', keywords: ['funny', 'kid']},
    {id:8 , url: 'img/8.jpg', keywords: ['funny', 'man']},
    {id:9 , url: 'img/9.jpg', keywords: ['funny', 'kid']},
    {id:10 , url: 'img/10.jpg', keywords: ['funny', 'politics']},
    {id:11 , url: 'img/11.jpg', keywords: ['angry', 'man']},
    {id:12 , url: 'img/12.jpg', keywords: ['man']},
    {id:13 , url: 'img/13.jpg', keywords: ['happy', 'man','movie']},
    {id:14 , url: 'img/14.jpg', keywords: ['movie', 'man']},
    {id:15 , url: 'img/15.jpg', keywords: ['movie', 'man']},
    {id:16 , url: 'img/16.jpg', keywords: ['funny', 'man','movie']},
    {id:17 , url: 'img/17.jpg', keywords: ['evil', 'politics']},
    {id:18 , url: 'img/18.jpg', keywords: ['animation', 'movie']},
]



function renderGallery(){
    
    const strHtmls =gImgs.map(img=> 
    `
    <img src=${img.url} alt='${img.keywords}' onclick="onImgSelect(${img.id})"  class="img-${img.id}"/>
    `
    )
    document.querySelector('.main-gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(imgId){
    // console.log(imgId)
    document.querySelector('.main-gallery').classList.add('hidden')
    document.querySelector('.main-editor-layout').classList.remove('hidden')
    setImg(imgId)
    renderMeme()
    resizeCanvas()
}

