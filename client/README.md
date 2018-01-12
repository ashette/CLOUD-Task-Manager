 # CLOUD Task Manager 

CLOUD Task Manager - это расширение для Google Chrome, позволяющее работать со списком задач удаленно. 

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

## Как использовать компонент

Прежде всего подключите файл компонента к вашему проекту

```html
<script type="text/javascript" src="js/CTMComponent.js"></script>
```

После подключения файла получить доступ к его методам можно через переменную CTM

```js
CTM.login(login, password, statusCodeResponses, handleSuccess, handleFail)
```

Подключение к серверу происходт автоматически при вызове методов. 
Строка подключения определена в файле компонента
Чтобы начать взаимодействие с сервером в первую очередь необходимо 
зарегистрировать пользователя на сервере с помощью метода register

```js
CTM.register(email, password, confirmPassword, {},
        function (success) {
            
        }, function (fail) {
            
        });
```

После этого необходимо для дальнейшего использования функций необходимо
получить токен возвращаемый сервером. 
Метод login производит авторизацию пользователя в на сервере, 
при усперной авторизации сервер возвращает токен.
```js
CTM.login(email, password,{},
        function (success) {
            console.log(success["access_token"]);
        }, function (fail) {
                    
        });
```

Полный ответ возвращаемый сервером:
```text
     access_token: "u3XOCYV91f2P6odbceNIY_BnkfSpN7gQwzknsRi_.......0iRPlHYNMEES9",
     token_type: "bearer",
     expires_in: 1209599,
     userName: "metanit22@mail.ru",
     .issued: "Sat, 07 Mar 2015 21:42:16 GMT",
     .expires: "Sat, 21 Mar 2015 21:42:16 GMT"
```

В дальнейшем данный токен необходимо отправлять во все методы работы с задачами.
Описание данных методов представлено ниже

## Описание методов компонента.

###### Метод регистрации принимает следующие аргументы: 
* email - строка с адресом электронной почты
* password - строка пароля
* confirmpassword - строка с подтверждением пароля
* statusCodeResponses - структура обрабатывающая ошибки сервера
* handleSuccess - событие, реагирующие на успешное выполнение функции
* handleFail - событие, реагирующие на неуспешное выполнение функции
```js
 CTM.register(email, password, confirmpassword, statusCodeResponses, handleSuccess, handleFail){}
```
###### Метод авторизации:  
* login - строка с адресом электронной почты
* password - строка пароля
* statusCodeResponses - структура обрабатывающая ошибки сервера
* handleSuccess - событие, реагирующие на успешное выполнение функции
* handleFail - событие, реагирующие на неуспешное выполнение функции
```js
 CTM.login(login, password, statusCodeResponses, handleSuccess, handleFail)
```
###### Метод вывода всех задач пользователя:
* token - строка с токеном
* handleSuccess - событие, реагирующие на успешное выполнение функции
* handleFail - событие, реагирующие на неуспешное выполнение функции
```js
CTM.getAllTasks(token, handleSuccess, handleFail)
```
###### Метод добавления задачи:
* token - строка с токеном
* complete - статус выполнения задачи (true/false). По умолчанию - false
* handleSuccess - событие, реагирующие на успешное выполнение функции
* handleFail - событие, реагирующие на неуспешное выполнение функции
```js
CTM.addTask(token, complete, text, handleSuccess, handleFail)
```
###### Метод редактирования задачи: 
* token - строка с токеном
* id - id задачи
* complete - статус выполнения задачи (true/false). По умолчанию - false
* text - строка с текстом задачи
* handleSuccess - событие, реагирующие на успешное выполнение функции
* handleFail - событие, реагирующие на неуспешное выполнение функции
```js
CTM.editTask(token, id, complete, text, handleSuccess, handleFail) 
```
###### Метод удаления задачи:
* token - строка с токеном
* id - id задачи
* handleSuccess - событие, реагирующие на успешное выполнение функции
* handleFail - событие, реагирующие на неуспешное выполнение функции
```js
CTM.deleteTask(token, id, handleSuccess, handleFail)
```
###### Метод изменения статуса задачи на выполненный:
* token - строка с токеном
* id - id задачи
* complete - статус выполнения задачи (true/false). По умолчанию - false
* handleSuccess - событие, реагирующие на успешное выполнение функции
* handleFail - событие, реагирующие на неуспешное выполнение функции
```js
CTM.completeTask(token, id, complete, handleSuccess, handleFail)
```
###### Метод удаления всех выполненных задач:
* token - строка с токеном
* handleSuccess - событие, реагирующие на успешное выполнение функции
* handleFail - событие, реагирующие на неуспешное выполнение функции
```js
CTM.deleteCompletedTasks(token, handleSuccess, handleFail)
```
###### Метод выхода из системы:
* token - строка с токеном
* handleSuccess - событие, реагирующие на успешное выполнение функции
* handleFail - событие, реагирующие на неуспешное выполнение функции
```js
CTM.logOut(token, handleSuccess, handleFail)
```

Более подробное описание данных возвращаемых сервером описано 
в классе работы с [задачами](https://github.com/ashette/CLOUD-Task-Manager/blob/dev/server/Controllers/TaskController.cs)
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
