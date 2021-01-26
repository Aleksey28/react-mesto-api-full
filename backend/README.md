# "Mesto" (бэкенд)

## Описание API

В данный момент не реализована публикация в интернете и API доступный при развертывании на локальной машине через url http://localhost/
 
### User

+ GET /users - получить список пользователей
    + Output
        + list of users
            + name
            + about
            + avatar

+ GET /users/:id - получить пользователя по ID
    + Output
        + name
        + about
        + avatar

+ POST /users - получить пользователя по ID
    + Input
        + name
        + about
        + avatar
    + Output
        + name
        + about
        + avatar

+ PACTH /users/me - обновить данные пользователя
    + Input
        + name
        + about
    + Output
        + name
        + about
        + avatar
        
+ PACTH /users/me/avatar - обновить аватар пользователя
    + Input
        + avatar
    + Output
        + name
        + about
        + avatar

### Сards

+ GET /cards - получить список карточек
    + Output
        + list of cards
            + name
            + link
            + owner
            + likes[]
            + createdAt

+ POST /cards - создать новую карточку
    + Input
        + name
        + link
    + Output
        + name
        + link
        + owner
        + likes[]
        + createdAt

+ DELETE /cards/:cardId - удалить карточку по ID
    + Output
        + name
        + link
        + owner
        + likes[]
        + createdAt

+ PUT /cards/:cardId/likes - лайкнуть карточку
    + Output
        + name
        + link
        + owner
        + likes[]
        + createdAt

+ DELETE /cards/:cardId/likes - удалить лайк карточки
    + Output
        + name
        + link
        + owner
        + likes[]
        + createdAt


## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload


## Используемы технологии

Данный проект был реализован на Node.js, Express.js, JS и MongoDB согласно технологии Rest API.

## Планы на будущее

1. Реализовать регистрацию пользователей
2. Реализовать авторизацию и выдачу токенов
3. Опубликовать базу данных
