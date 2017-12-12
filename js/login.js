


var tokenKey = "tokenInfo";
if (getCookie("username")){
		document.location.href = 'popup.html';
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
			setCookie("username", $('#emailLogin').val(), 60);
			document.location.href = 'popup.html';
        },function (fail) {
            alert(fail);
        });
        // document.location.href = 'popup.html';
    });
})
	}
function setCookie (name, value, expires) {
      document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires : "");
}
function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}
