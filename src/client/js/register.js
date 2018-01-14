var tokenKey = "tokenInfo";
$(document).ready(function () {
    $('#submitRegister').click(function (e) {
        e.preventDefault();
        $('.progresbar_bg').css("display", "block");
        let email = $('#emailRegister').val();
        let password = $('#passwordRegister').val();
        let confirmPassword = $('#confirmPassRegister').val();
        CTM.register(email, password, confirmPassword, {
            400: function () {
                showError("Неправильно введены данные. Пароль не может содержать меньше 6 символов и состоять только из чисел");
                return;
            },
            500: function () {
                showError("Внутренняя ошибка сервера, повторите запрос позднее");
                return;
            }
        }, function (success) {
            $('.progresbar_bg').css("display", "none");
            alert('Регистрация пройдена');

            CTM.login(email, password,{}, function (success) {
                sessionStorage.setItem(tokenKey, success["access_token"]);
                document.location.href = 'popup.html';
            }, function (fail) {
                showError(fail);
            });

        }, function (fail) {
            showError('В процесе регистрации возникла ошибка');
        });
    });
})


function showError(textError) {
    $('.progresbar_bg').css("display", "none");
    $('#error_block').css("display", "inline-block");
    $('#error_msg_text').text(textError);
}