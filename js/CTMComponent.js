var CTMComponent = function () {
    let domainName = 'http://lab.group.1.b2bfamily.com';

    this.register = function (email, password, confirmpassword, handleSuccess, handleFail) {
        let data = {
            Email: email,
            Password: password,
            ConfirmPassword: confirmpassword
        };

        $.ajax({
            type: 'POST',
            url: domainName + '/api/Account/Register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (data) {
                handleSuccess('Регистрация пройдена');
            },
            fail: function (data) {
                handleFail('В процесе регистрации возникла ошибка');
            }
        });
    };

    /*
     variable data contains:
     access_token: "u3XOCYV91f2P6odbceNIY_BnkfSpN7gQwzknsRi_.......0iRPlHYNMEES9",
     token_type: "bearer",
     expires_in: 1209599,
     userName: "metanit22@mail.ru",
     .issued: "Sat, 07 Mar 2015 21:42:16 GMT",
     .expires: "Sat, 21 Mar 2015 21:42:16 GMT"
     */
    this.login = function (login, password, handleSuccess, handleFail) {
        let loginData = {
            grant_type: 'password',
            username: login,
            password: password
        };

        $.ajax({
            type: 'POST',
            url: domainName + '/Token',
            data: loginData,
            success: function (data) {
                handleSuccess(data);
            },
            fail: function (data) {
                handleFail('При логине возникла ошибка');
            }
        });
    };

    this.getAllTasks = function (token, handleSuccess, handleFail) {
        $.ajax({
            type: 'GET',
            url: domainName + '/api/Task/GetAll',	
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) {
                handleSuccess(data);
            },
            fail: function (data) {
                handleFail(data);
            }
        });
    };
	
	this.addTask = function (token, complete, text, handleSuccess, handleFail) {
        let datatask = {
			Complete: complete,
			Text: text
		};
		
		$.ajax({
            type: 'POST',
            url: domainName + '/api/Task/Add',	
            data: datatask,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) { //в data записываетсы то что вернет сервер
                handleSuccess(data);
            },
            fail: function (data) {
                handleFail(data);
            }
        });
    };
	
	this.editTask = function (token, id, complete, text, handleSuccess, handleFail) {
        let datatask = {
			Id:id,
			Complete: complete,
			Text: text
		};
		
		$.ajax({
            type: 'POST',
            url: domainName + '/api/Task/Edit',	
            data: datatask,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) { //в data записываетсы то что вернет сервер
                handleSuccess(data);
            },
            fail: function (data) {
                handleFail(data);
            }
        });
    };
	
	
	this.deleteTask = function (token, id, handleSuccess, handleFail) {
        let datatask = {
			Id:id
		};		
		$.ajax({
            type: 'POST',
            url: domainName + '/api/Task/Delete',	
            data: datatask,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) { //в data записываетсы то что вернет сервер
                handleSuccess(data);
            },
            fail: function (data) {
                handleFail(data);
            }
        });
    };
	
	this.logOut = function (token, handleSuccess, handleFail) {
		
		$.ajax({
            type: 'POST',
            url: domainName + '/api/Account/Logout',	
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) {
                handleSuccess(data);
            },
            fail: function (data) {
                handleFail(data);
            }
        });
    };
}

window.CTM = new CTMComponent();