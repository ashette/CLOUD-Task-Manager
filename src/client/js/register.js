var tokenKey = "tokenInfo";
var eer;
$(document).ready(function () {
    $('#submitRegister').click(function (e) {
        e.preventDefault();
        $('.progresbar_bg').css("display", "block");
        let email = $('#emailRegister').val();
        let password = $('#passwordRegister').val();
        let confirmPassword = $('#confirmPassRegister').val();
        CTM.register(email, password, confirmPassword, {
            400: function (err) {
                showError(extractError(err));
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

function extractError(error) {
    if(error.responseJSON.ModelState[""]["0"]){
        return error.responseJSON.ModelState[""]["0"];
    }

    if(error.responseJSON.ModelState["model.Password"]["0"]){
        return error.responseJSON.ModelState["model.Password"]["0"];
    }
}

function showError(textError) {
    $('.progresbar_bg').css("display", "none");
    $('#error_block').css("display", "inline-block");
    $('#error_msg_text').text(textError);
}