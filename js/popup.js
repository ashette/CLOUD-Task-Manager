var tokenKey = "tokenInfo";
var token = sessionStorage.getItem(tokenKey);
var tasksList = [];
var flag = false;
var taskListId = -1;

function printTasks(tasksList) {
    if (tasksList.length > 0) {
        $('#task_list').empty();
    }
    else {
        return;
    }
    for (var i = 0; i < tasksList.length; i++) {



        if (tasksList[i]['Complete'] == 1) {
            $('#task_list').append('<li id=\"' + i + '\"><input type="checkbox" name="task' + (i + 1) + '" value="a' + (i + 1) + '">' +
                '<div class = "task_this"><h6 class="complete_task">' + tasksList[i]['Text'] + '</h6></div> ' +
                '<input type = "button" value ="" id = "done"> ' +
                '<input type = "button" value ="" id= "edit_this" >' +
                '<input type = "button" value ="" id= "remove_this"> </li>');
        } else {
            $('#task_list').append('<li id=\"' + i + '\"><input type="checkbox" name="task' + (i + 1) + '" value="a' + (i + 1) + '">' +
                '<div class = "task_this"><h6 class="not_complete_task">' + tasksList[i]['Text'] + '</h6></div> ' +
                '<input type = "button" value ="" id = "done"> ' +
                '<input type = "button" value ="" id= "edit_this" >' +
                '<input type = "button" value ="" id= "remove_this"> </li>');
        }

    }


}

function handleTasks(success) {
    if (success.length > 0) {
        tasksList.length = 0;
    }
    else {
        return;
    }

    for (var i = 0; i < success.length; i++) {
        tasksList.push(success[i]);
    }

    printTasks(tasksList);
}

$(document).ready(function () {

    $('#task_list').on('click', '#edit_this', function (e) {
        e.preventDefault();
        taskListId = $(this).parent().attr('id');

        $('#task').val(tasksList[taskListId]['Text']);
        flag = true;
    });


    $('#task_list').on('click', '#remove_this', function (e) {
        e.preventDefault();
        let id = $(this).parent().attr('id');

        CTM.deleteTask(token, tasksList[id]['Id'], function (success) {
            alert("Хоп Хэй");
        }, function (fail) {
            alert(fail);
        });

        CTM.getAllTasks(token, handleTasks,
            function (fail) {
                alert(fail);
            });
    });

    $('#task_list').on('click', '#done', function (e) {
        e.preventDefault();
        let id = $(this).parent().attr('id');
        complete = 1;
        CTM.completeTask(token, tasksList[id]['Id'], complete, function (success) {
            alert("Задание" + tasksList[id]['Id'] + "Выполнено");
        }, function (fail) {
            alert(fail);
        });

        CTM.getAllTasks(token, handleTasks,
            function (fail) {
                alert(fail);

            });
    });


    $('#add_task').click(function (e) {
        e.preventDefault();
        let text = $('#task').val();
        let complete = 0;
        if (!flag) {
            CTM.addTask(token, complete, text, function (success) {
                alert("Вы что-то добавили");
                console.log(success);
            }, function (fail) {
                alert(fail);
            });
        } else {
            CTM.editTask(token, tasksList[taskListId]['Id'], complete, $('#task').val(), function (success) {
                alert("Хоп Хэй");
                flag = false;
                taskListId = -1;
            }, function (fail) {
                alert(fail);
            });
        }
        CTM.getAllTasks(token, handleTasks,
            function (fail) {
                alert(fail);
            });
    });


    CTM.getAllTasks(token, handleTasks,
        function (fail) {
            alert(fail);
        });


	$('#button_remove_all').click(function (e) {
        e.preventDefault();
        CTM.deleteCompletedTasks(token, function (success) {
            alert("Вы удалили все выполненные задания");
        }, function (fail) {
            alert(fail);
        });
		
		CTM.getAllTasks(token, handleTasks,
            function (fail) {
                alert(fail);
            });
    });	
	
	
    $('#button_refresh').click(function (e) {
        e.preventDefault();
        let logOut = CTM.logOut(token, function (success) {
            alert("Вы вышли из системы");
            sessionStorage.removeItem(tokenKey);
            deleteCookie("username");
            deleteCookie("password");
            document.location.href = 'login.html';
        }, function (fail) {
            alert(fail);
        });
    });


});
