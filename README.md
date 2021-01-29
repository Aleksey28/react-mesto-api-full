# Проект "Место"

## Описание проекта

Цель проекта - дать возможность делиться своми впечатлениями в поездах, разделить свое видение различных мест и показать людям новые места.

## Используемы технологии

Фронтенд был реализован на HTML5, CSS3, JS и React. Структура проекта построена соглазно методологии БЭМ с подходом Nested.
Проект является адаптивным.

## Планы на будущее

1. Реализовать част
2. Добавить возможность комментировать фотографии
3. Поиск друзей

## Ссылка

https://mesto.aleksey.students.nomoredomains.monster


# "Mesto" (бэкенд)

## Описание API

Доступ к API осуществляется через URL: https://express.mesto.aleksey.students.nomoredomains.monster
 
### Auth
+ POST /signin - авторизовать пользователя
    + Input
        + email
        + password
    + Output
        + email
        + name
        + about
        + avatar

+ POST /signup - зарегистрировать пользователя
    + Input
        + email
        + password
    + Output
        + email
        + name
        + about
        + avatar

+ POST /signout - выход из системы

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
