


var tokenKey = "tokenInfo";
$(document).ready(function () {
    $('#submitLogin').click(function (e) {
        e.preventDefault();
        let email = $('#emailLogin').val();
        let password = $('#passwordLogin').val();
        let loginInfo = CTM.login(email, password, function (success) {
            console.log(success);
            sessionStorage.setItem(tokenKey, success["access_token"]);
            console.log(success["access_token"]);
			document.location.href = 'popup.html';
        },function (fail) {
            alert(fail);
        });
        // document.location.href = 'popup.html';
    });
})