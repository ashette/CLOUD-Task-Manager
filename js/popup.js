var tokenKey = "tokenInfo";
$(document).ready(function () {
    $('#add_task').click(function (e) {
        e.preventDefault();
		let token = sessionStorage.getItem(tokenKey);
		let text = $('#task').val();
		let complete = 0;
        CTM.addTask(token, complete, text, function (success) {
			alert(success);
			alert("Вы что-то добавили");
            console.log(success);
        }, function (fail) {
            alert(fail);
        });
    });
	
    $('#button_done_all').click(function (e) {
        e.preventDefault();
		let token = sessionStorage.getItem(tokenKey);
        CTM.getAllTasks(token, function (success) {
			alert(success);
            console.log(success);                                              
			for (var i = 0; i < data.length; i++) { 
				$('#task_list').append('<li><input type="checkbox" name="task' + (i + 1) +'" value="a'+ (i + 1)+'"> <h6>' + data[i]['Text'] + '</h6></li>') 
			}  
        },function (fail) {
            alert(fail);
        });
    });
	
	$('#button_refresh').click(function (e) {
        e.preventDefault();
        let logOut = CTM.logOut(function (success) {
            console.log(success);
            sessionStorage.removeItem(tokenKey, success["access_token"]);
			document.location.href = 'login.html';
        },function (fail) {
            alert(fail);
        });
    });
})