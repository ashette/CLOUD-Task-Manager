function setCookie (name, value, exday) {
 var d = new Date();
 d.setTime(d.getTime() + (exday*24*60*60*1000));
 var expires = "expires="+ d.toUTCString(); 
 document.cookie = name + "=" + value + ";" + expires + ";path=/";
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
function deleteCookie (name) {
    document.cookie = name + "=" + "" + "" ;
}
