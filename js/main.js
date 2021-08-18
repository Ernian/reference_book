let $main = document.getElementById('main'),
    $mainMenu = document.getElementById('main-menu'),
    $mainContent = document.getElementById('main-content');

const appData = {}

renderMainMenu(mainMenu)
prepareData(mainMenu)

function renderMainMenu(menu) {
    let $menu = document.createElement('ul')
    $menu.classList.add('main-menu-list')
    menu.forEach(item => {
        $menu.innerHTML += `<li class="main-menu-list__item link" data-key="${item.key}">${item.pointName}</li>`
    })
    $mainMenu.append($menu)
}

function prepareData(menu) {
    menu.forEach(item => {
        appData[item.key] = eval(item.key)
    })
}

function clearMainContent() {
    $mainContent.innerHTML = ''
}

function renderData(data, root, key = '') {
    data[key].forEach(item => {
        let $container = document.createElement('section')
        $container.classList.add('section')
        let $header = document.createElement('h3')
        $header.classList.add('section-name', 'aaa')
        $header.innerHTML = item.sectionName
        $container.append($header)

        if (item.articles && item.articles.length > 0) {
            item.articles.forEach(article => {
                let $article = document.createElement('article')
                if (article.articleName) {
                    let $articleName = document.createElement('p')
                    $articleName.classList.add('article-name')
                    $articleName.innerHTML = article.articleName
                    $article.append($articleName)
                }
                if (article.shortDescription) {
                    let $shortDescription = document.createElement('p')
                    $shortDescription.classList.add('short-description')
                    $shortDescription.innerHTML = article.shortDescription
                    $article.append($shortDescription)
                }
                if (article.description && article.description.length > 0) {
                    let $description = document.createElement('ul')
                    $description.classList.add('description')
                    article.description.forEach(item => {
                        let $point = document.createElement('li')
                        if (item.code && item.description) {
                            let $code = `<span class="code">${item.code}</span>`
                            let $description = `<span class="description">${item.description}</span>`
                            $point.insertAdjacentHTML('beforeend', $code)
                            $point.insertAdjacentHTML('beforeend', $description)
                        } else {
                            let $description = `<span class="description">${item}</span>`
                            $point.insertAdjacentHTML('beforeend', $description)
                        }
                        $description.append($point)
                    })
                    $article.append($description)
                }
                if (article.source && article.source.length > 0) {
                    let $source = document.createElement('ul')
                    $source.classList.add('source')
                    article.source.forEach(item => {
                        let $point = document.createElement('li')
                        let $link = `<a href="${item}" target="_blank">Источник</a>`
                        $point.insertAdjacentHTML('beforeend', $link)
                        $source.append($point)
                    })
                    $article.append($source)
                }
                $container.append($article)
            })
        }
        root.append($container)
    })
}

$mainMenu.addEventListener('click', event => {
    if (event.target.classList.contains('link')) {
        clearMainContent()
        renderData(appData, $mainContent, event.target.dataset.key)
    }
})