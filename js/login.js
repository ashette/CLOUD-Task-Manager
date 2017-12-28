


var tokenKey = "tokenInfo";
var user = getCookie("username");
var password = getCookie("password");
if (user || password){
    let email = getCookie("username");
    let password = getCookie("password");
    let loginInfo = CTM.login(email, password, function (success) {
        console.log(success);
        sessionStorage.setItem(tokenKey, success["access_token"]);
        console.log(success["access_token"]);
        document.location.href = 'popup.html';
    },function (fail) {
        alert(fail);
    });

}else
{
    $(document).ready(function () {

        $('#submitLogin').click(function (e) {
            e.preventDefault();
            let email = $('#emailLogin').val();
            let password = $('#passwordLogin').val();
            let loginInfo = CTM.login(email, password, function (success) {
                console.log(success);
                sessionStorage.setItem(tokenKey, success["access_token"]);
                console.log(success["access_token"]);
				//Здесь проверка на ответ сервера чтобы заблочить кнопку входа
				//здесь выводить ошибки - bad request не верный логин пароль
				//500
                setCookie("username", $('#emailLogin').val());
                setCookie("password", $('#passwordLogin').val());
                document.location.href = 'popup.html';
            },function (fail) {
                alert(fail);
            });
            // document.location.href = 'popup.html';
        });
    })
}

