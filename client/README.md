# CLOUD Task Manager

CLOUD Task Manager показывает возможности использования компонента CTMComponent в виде расширения для GoogleChrome.

## Характеристики файлов представлены ниже.


Название файла | Характеристика 
--- | ---
CTMComponent.js  | Компонент, содержащий в себе методы, позволяющие обрабатывать данные для взаимодействия с сервером
login.js| Отвечает за авторизацию пользователя
register.js| Отвечает за регистрацию пользователя
popup.js| Отвечает за основной функционал приложения
cookie.js| Содержит в себе методы для работы с файлами cookie
login.html, register.html,    popup.html | HTML-разметка
style.css,    style_login.css,    style_reqister.css  | Отвечает за стилевые особенности приложения

## Описание методов компонента.

###### Метод регистрации принимает следующие аргументы: 
* email - адрес электронной почты
* password - пароль
* confirmpassword - подтверждение пароля 
* handleSuccess - событие, реагирующие на успешное выполнение функции
* handleFail - событие, реагирующие на неуспешное выполнение функции
``` js
 this.register = function (email, password, confirmpassword, handleSuccess, handleFail){}
```
###### Метод авторизации:  

``` js
 this.login = function (login, password, handleSuccess, handleFail){}
```
###### Метод вывода всех задач пользователя:
* token - содержит в себе токен
``` js
this.getAllTasks = function (token, handleSuccess, handleFail){}
```
###### Метод добавления задачи:
* complete - статус выполнения задачи (true/false). По умолчанию - false
``` js
this.addTask = function (token, complete, text, handleSuccess, handleFail){}
```
###### Метод редактирования задачи: 
``` js
this.editTask = function (token, id, complete, text, handleSuccess, handleFail) {}
```
###### Метод удаления задачи:
``` js
this.deleteTask = function (token, id, handleSuccess, handleFail) {}
```
###### Метод изменения статуса задачи на выполненный:
``` js
this.completeTask = function (token, id, complete, handleSuccess, handleFail) {}
```
###### Метод удаления всех выполненных задач:
``` js
this.deleteCompletedTasks = function (token, handleSuccess, handleFail) {}
```
###### Метод выхода из системы:
``` js 
this.logOut = function (token, handleSuccess, handleFail) {}
```

## Установка
1. Скачайте архив из [репозитория](https://github.com/ashette/CLOUD-Task-Manager)
2. Разархивируйте файл с приложением
2. Откройте браузер Google Chrome
3. Откройте настройку "Управление расширениями"
4. Включите режим разработчика 
5. Нажмите на кнопку "Загрузить распакованное расширение"
6. Выберите папку с приложением и нажмите ОК
7. Готово! Справа на панеле с расширениями появится такой значок:  ![](https://pp.userapi.com/c840439/v840439245/3c0c1/R1cteF5DtX8.jpg)

## Разработчики
Студенты УлГТУ, гр. ПиБД-31, г. Ульяновск, 2017 г.


  
