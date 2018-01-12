$(document).ready(function () {
    $('#submitRegister').click(function (e) {
        e.preventDefault();
        let email = $('#emailRegister').val();
        let password = $('#passwordRegister').val();
        let confirmPassword = $('#confirmPassRegister').val();
        CTM.register(email, password, confirmPassword, {
            400: function () {
                showError("Неправильно введены данные");
                return;
            },
            500: function () {
                showError("Внутренняя ошибка сервера, повторите запрос позднее");
                return;
            }
        }, function (success) {
            alert('Регистрация пройдена');
        }, function (fail) {
            showError('В процесе регистрации возникла ошибка');
        });
    });
})


function showError(textError) {
    $('#error_block').css("display", "block");
    $('.error_msg').val(textError);
}