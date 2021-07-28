const git = [
    {
        sectionName: 'Настройка и конфигурация',
        articles: [
            {
                articleName: 'git init',
                shortDescription: 'Инициализация локального репозитория в текущем каталоге',
                description: ['Инициализирует локальный репозиторий. Создает в текущем каталоге новый подкаталог с именем .git, который содержит все необходимые файлы репозитория (структуру git репозитория).'],
                source: [],
            },
            {
                articleName: 'git config',
                shortDescription: 'Используется для установки настроек репозитория',
                description: [
                    'Используется для установки настроек репозитория',
                    { code: 'git config --system', description: 'общесистемные настройки' },
                    { code: 'git config --global', description: 'настройки на уровне конкретного пользователя' },
                    { code: 'git config --local', description: 'настройки на уровне конкретного проекта' },
                ],
                source: ['one', 'two'],
            },
        ],
    }
]