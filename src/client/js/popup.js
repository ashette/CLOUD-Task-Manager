var tokenKey = "tokenInfo";
var token = sessionStorage.getItem(tokenKey);
var tasksList = [];
var flag = false;
var taskListId = -1;

function createCompleteTaskHtml(index, task) {
    let str = '<li id=\"' + index + '\">' +
        '<div class="inner">' +
        '<div class = "task_this"><h6 class="complete_task">' + task + '</h6></div> ' +
        '<input type = "button" value ="" id = "done"> ' +
        '<input type = "button" value ="" id= "edit_this" >' +
        '<input type = "button" value ="" id= "remove_this">' +
        '</div>' +
        '</li>';

    return str;
};


function createNotCompleteTaskHtml(index, task) {
    let str = '<li id=\"' + index + '\">' +
        '<div class="inner">' +
        '<div class = "task_this"><h6 class="not_complete_task">' + task + '</h6></div> ' +
        '<input type = "button" value ="" id = "done"> ' +
        '<input type = "button" value ="" id= "edit_this" >' +
        '<input type = "button" value ="" id= "remove_this"> ' +
        '</div>' +
        '</li>';

    return str;
};

function printTasks(tasksList) {
    if (tasksList.length > 0 || tasksList.length == 0) {
        $('#task_list').empty();
    }
    else {
        return;
    }

    let taskLine = "";

    for (var i = 0; i < tasksList.length; i++) {

        if (tasksList[i]['Complete'] == 1) {
            taskLine += createCompleteTaskHtml(i, tasksList[i]['Text']);
        } else {
            taskLine += createNotCompleteTaskHtml(i, tasksList[i]['Text']);
        }
    }
    $('#task_list').append(taskLine);

    $('.vertScroll').css("overflow-y", "");
    if ($('#task_list').height() < $('.vertScroll').height()) {
        $('.vertScroll').css("overflow-y", "none");
    }
    else {
        $('.vertScroll').css("overflow-y", "scroll");
    }
}

function getAddTask(task) {
    if (task == null) {
        return;
    }

    tasksList.push(task);

    printTasks(tasksList);
}

function getEditTask(id, task) {
    if (task == null) {
        return;
    }

    tasksList[id] = task;

    printTasks(tasksList);
}

function removeTask(id) {
    tasksList.splice(id, 1);
    printTasks(tasksList);
}

function getMakeCompleteTask(id, task) {
    if (task == null) {
        return;
    }

    tasksList[id] = task;

    printTasks(tasksList);
}


function handleTasks(data) {
    if (data.length > 0) {
        tasksList.length = 0;
    }
    else {
        return;
    }

    for (var i = 0; i < data.length; i++) {
        tasksList.push(data[i]);
    }

    printTasks(tasksList);
}

$(document).ready(function () {
    //Load user tasks
    CTM.getAllTasks(token, handleTasks,
        function (fail) {
            alert(fail);
        });

    //Edit task
    $('#task_list').on('click', '#edit_this', function (e) {
        e.preventDefault();
        taskListId = $(this).parent().parent().attr('id');

        $('#task').val(tasksList[taskListId]['Text']);
        flag = true;
    });

    //Remove task
    $('#task_list').on('click', '#remove_this', function (e) {
        e.preventDefault();
        let id = $(this).parent().parent().attr('id');

        CTM.deleteTask(token, tasksList[id]['Id'], function (success) {
            if (success == "") {
                console.log(id);
                removeTask(id);
            }
            console.log(success);
        }, function (fail) {
            alert(fail);
        });
    });

    //Make complete
    $('#task_list').on('click', '#done', function (e) {
        e.preventDefault();
        let id = $(this).parent().parent().attr('id');
        complete = 1;
        CTM.completeTask(token, tasksList[id]['Id'], complete, function (success) {
            getMakeCompleteTask(id, success);
        }, function (fail) {
            alert(fail);
        });
    });

    $('#task').click(function (e) {
        e.preventDefault();
        let button = document.getElementById("add_task");
        button.disabled = false;
    });

    // Add task
    $('#add_task').click(function (e) {
        e.preventDefault();
        this.disabled = true;
        let text = $('#task').val();
        let button = document.getElementById("add_task");
        if (text != "") {
            button.disabled = false;
        } else {
            button.disabled = true;
            return;
        }

        let complete = 0;

        if (!flag) {
            CTM.addTask(token, complete, text, function (success) {
                getAddTask(success);
                document.getElementById("task").value = "";
                button.disabled = false;
            }, function (fail) {
                alert(fail);
            });
        } else {
            CTM.editTask(token, tasksList[taskListId]['Id'], complete, $('#task').val(), function (success) {
                getEditTask(taskListId, success);
                flag = false;
                taskListId = -1;
                document.getElementById("task").value = "";
                button.disabled = false;
            }, function (fail) {
                alert(fail);
            });
        }

    });


    $('#button_remove_all').click(function (e) {
        e.preventDefault();
        CTM.deleteCompletedTasks(token, function (success) {
            CTM.getAllTasks(token, handleTasks,
                function (fail) {
                    alert(fail);
                });
        }, function (fail) {
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
