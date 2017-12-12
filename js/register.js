


$(document).ready(function () {
    $('#submitRegister').click(function (e) {
        e.preventDefault();
        let email = $('#emailRegister').val();
        let password = $('#passwordRegister').val();
        let confirmPassword = $('#confirmPassRegister').val();
		CTM.register(email, password, confirmPassword, function (success) {
            alert(success);
			console.log(success);
			//document.location.href = 'login.html';
        }, function (fail) {
            alert(fail);
			console.log(fail);
        });
        // document.location.href = 'login.html';
    });
})

