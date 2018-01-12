var tokenKey = "tokenInfo";
var user = getCookie("username");
var password = getCookie("password");
if (user || password) {
    let email = getCookie("username");
    let password = getCookie("password");
    let loginInfo = CTM.login(email, password, function (success) {
        console.log(success);
        sessionStorage.setItem(tokenKey, success["access_token"]);
        console.log(success["access_token"]);
        document.location.href = 'popup.html';
    }, function (fail) {
        alert(fail);
    });

}
else {
    $(document).ready(function () {

        $('#submitLogin').click(function (e) {
            e.preventDefault();
            let email = $('#emailLogin').val();
            let password = $('#passwordLogin').val();
            CTM.login(email, password,
                {
                    400: function () {
                        showError("Неправильно введен логин/пароль");
                        $('#emailLogin').val('');
                        $('#passwordLogin').val('');
                        return;
                    },
                    500: function () {
                        showError("Внутренняя ошибка сервера, повторите запрос позднее");
                        return;
                    }
                },
                function (success) {
                    sessionStorage.setItem(tokenKey, success["access_token"]);

                    let ch = $("#checkboxMe").attr("checked");
                    if ($("#checkboxMe").prop("checked")) {
                        setCookie("username", $('#emailLogin').val(), 7);
                        setCookie("password", $('#passwordLogin').val(), 7);
                    }
                    document.location.href = 'popup.html';
                }, function (fail) {
                    showError('При авторизации возникла ошибка');
                });
        });
    })
}

function showError(textError) {
    $('#error_block').css("display", "block");
    $('.error_msg').val(textError);
}