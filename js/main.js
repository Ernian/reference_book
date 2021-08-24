let $main = document.getElementById('main'),
    $mainMenu = document.getElementById('main-menu'),
    $mainMenuList = null,
    $mainContent = document.getElementById('main-content');

const appData = {}

renderMainMenu(mainMenu)
prepareData(mainMenu)

function renderMainMenu(menu) {
    let $menu = document.createElement('ul')
    $menu.classList.add('main-menu-list')
    menu.forEach(item => {
        $menu.innerHTML += `<li class="main-menu-list__item" data-key="${item.key}">${item.pointName}</li>`
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
    if (data[key].length === 0) {
        $mainContent.innerHTML = '<h2 style="user-select: none">Раздел находится в разработке</h2>'
        return
    }
    data[key].forEach(item => {
        let $container = document.createElement('section')
        $container.classList.add('section')
        let $header = document.createElement('h2')
        $header.classList.add('section__name')
        $header.innerHTML = item.sectionName
        $container.append($header)

        if (item.articles && item.articles.length > 0) {
            item.articles.forEach(article => {
                let $article = document.createElement('article')
                $article.classList.add('hide')
                if (article.articleName) {
                    let $articleName = document.createElement('h3')
                    $articleName.classList.add('section__article__name')
                    $articleName.innerHTML = article.articleName
                    $article.append($articleName)
                }
                if (article.shortDescription) {
                    let $shortDescription = document.createElement('p')
                    $shortDescription.classList.add('section__short-description')
                    $shortDescription.innerHTML = article.shortDescription
                    $article.append($shortDescription)
                }
                if (article.description && article.description.length > 0) {
                    let $description = document.createElement('ul')
                    $description.classList.add('section__description')
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
                        let $link = `<a href="${item.path}" class="source__link" target="_blank">${item.name}</a>`
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

function selectMenuItem(event) {
    if (!$mainMenuList){
        $mainMenuList = document.querySelectorAll('.main-menu-list__item')
    }    
    if (event.target.classList.contains('main-menu-list__item_active')){
        return
    } else {      
        $mainMenuList.forEach(item => {
            if (item.classList.contains('main-menu-list__item_active')){
                item.classList.remove('main-menu-list__item_active')
            }
        })
        event.target.classList.add('main-menu-list__item_active')
    }
}

function showAndHideArticles (event) {
    const section = event.target.parentNode.querySelectorAll('article')
    section.forEach(item => {
        item.classList.toggle('hide')
        item.classList.toggle('section__article')
    })
}

$mainMenu.addEventListener('click', event => {
    if (event.target.classList.contains('main-menu-list__item')) {
        clearMainContent()
        renderData(appData, $mainContent, event.target.dataset.key)
        selectMenuItem(event)
    }
})

$mainContent.addEventListener('click', event => {
    if (event.target.classList.contains('section__name')) {
        showAndHideArticles(event)
    }
})