var tokenKey = "tokenInfo";
var token = sessionStorage.getItem(tokenKey);

$(document).ready(function () {
    $('#add_task').click(function (e) {
        e.preventDefault();
		let text = $('#task').val();
		let complete = 0;
        CTM.addTask(token, complete, text, function (success) {
			alert(success);
			alert("Вы что-то добавили");
            console.log(success);
        }, function (fail) {
            alert(fail);
        });
		
		CTM.getAllTasks(token, function (success) {
            $('#task_list').html(success);
            console.log(success);
            for (var i = 0; i < success.length; i++) {
                $('#task_list').append('<li><input type="checkbox" name="task' + (i + 1) +'" value="a'+ (i + 1)+'"><div class = "task_this"> <h6>' + success[i]['Text'] + '</h6>  </div> <input type = "button" value =" " class = "done"> <input type = "button" value =" " id = "edit_this" > <input type = "button" value =" " id = "remove_this"> </li>')
            }
        },function (fail) {
            alert(fail);
        });
    });
	
		
	CTM.getAllTasks(token, function (success) {
		$('#task_list').html(success);
		console.log(success);
		for (var i = 0; i < success.length; i++) {
			$('#task_list').append('<li><input type="checkbox" name="task' + (i + 1) +'" value="a'+ (i + 1)+'"> <div class = "task_this"> <h6>' + success[i]['Text'] + '</h6> </div> <input type = "button" value =" " class = "done"> <input type = "button" value =" " id = "edit_this" > <input type = "button" value =" " id = "remove_this"> </li>')         
		}
	},function (fail) {
		alert(fail);
	});

	
	$('#button_refresh').click(function (e) {
        e.preventDefault();
        let logOut = CTM.logOut(token, function (success) {
			alert("Вы вышли из системы");
            sessionStorage.removeItem(tokenKey);
			document.location.href = 'login.html';
        },function (fail) {
            alert(fail);
        });
    });
})