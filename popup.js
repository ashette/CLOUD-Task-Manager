function calculate(e){
  var result = document.getElementById("result");  
  if (e.keyCode == 13){
	var v = document.getElementById("expression").value.trim();	
	var ex = new Expression("");	
		
	if (v != ""){
		try
		{
		    ex.Expression(v); 
			result.innerText = "= " + ex.Evaluate();
		}
		catch(e){
			result.innerText = "= ошибка в выражении";	
		}
	}
  }
  else result.innerText = "";
}

document.addEventListener('DOMContentLoaded', function() {
    var expr = document.getElementById('expression');    
	expr.addEventListener('keyup', calculate);
});

