// let hashMap=[
//     {logo:'A',logoType:'text',url:'https://bilibili.com'},
//     {logo: './images/bilibili-logo.png',logoType:'image',url:'https://bilibili.com'}
// ]

let hashMap = JSON.parse(localStorage.getItem('x')) || [
    {logo: 'B', url: 'https://bilibili.com'},
    {logo: 'B', url: 'https://bilibili.com'}
]
const simplifyUrl = function (url) {
    return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '')
}
const render = function () {
    $('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        let $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($('li.last'))
        $li.on('click', () => {
            window.open(node.url, '_self')
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addSiteButton').on('click', () => {
    let url = window.prompt('你要添加的网址是？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})
window.onbeforeunload = () => {
    localStorage.setItem('x', JSON.stringify(hashMap))
}
$(document).on('keypress', (e) => {
    if (document.activeElement !== document.querySelector('input')) {
        let {key} = e
        for (let i = 0; i < hashMap.length; i++) {
            if (hashMap[i].logo.toLowerCase() === key) {
                window.open(hashMap[i].url, '_self')
            }
        }
    }
})

