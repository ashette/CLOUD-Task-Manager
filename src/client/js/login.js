var tokenKey = "tokenInfo";
var user = getCookie("username");
var password = getCookie("password");
if (user || password) {

    $('.progresbar_bg').css("display", "block");

    let email = getCookie("username");
    let password = getCookie("password");

    CTM.login(email, password,{}, function (success) {
        sessionStorage.setItem(tokenKey, success["access_token"]);
        document.location.href = 'popup.html';
    }, function (fail) {
        showError(fail);
    });
}
else {
    $(document).ready(function () {

        $('#submitLogin').click(function (e) {
            e.preventDefault();
            $('.progresbar_bg').css("display", "block");
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
    $('.progresbar_bg').css("display", "none");
    $('#error_block').css("display", "inline-block");
    $('#error_msg_text').text(textError);
}