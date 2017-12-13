var tokenKey = "tokenInfo";
var token = sessionStorage.getItem(tokenKey);
var tasksList = [];

function printTasks(tasksList) {
    if(tasksList.length > 0){
        $('#task_list').empty();
    }
    else{
        return;
    }
    for (var i = 0; i < tasksList.length; i++) {
        $('#task_list').append('<li><input type="hidden" name="id_task" value=\"'+ tasksList[i]['Id'] +'\">' +
            '<input type="checkbox" name="task' + (i + 1) + '" value="a' + (i + 1) + '">' +
            '<div class = "task_this"> <h6>' + tasksList[i]['Text'] + '</h6>  </div> ' +
            '<input type = "button" value =" " class = "done"> ' +
            '<input type = "button" value =" " id = "edit_this" >' +
            ' <input type = "button" value =" " id = "remove_this"> </li>')
    }


}

function handleTasks(success) {
    if(success.length > 0){
        tasksList.length = 0;
    }
    else{
        return;
    }

    for (var i = 0; i < success.length; i++) {
        tasksList.push(success[i]);
    }
    printTasks(tasksList);
}

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

        CTM.getAllTasks(token, handleTasks,
            function (fail) {
                alert(fail);
            });
    });


    CTM.getAllTasks(token, handleTasks,
        function (fail) {
            alert(fail);
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
})