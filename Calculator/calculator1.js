var field = "";
var numResult;
// this function enter values from onclick buttons to one of input fields
function numberButton(val) {
	if (field == "") {
		alert("You need to click on a field before entering numbers");
	} else if (field.value.length >= 15 && val != "+" && val != "-" && 
	val != "*" && val != "/" && val != "=") {
	} else {
		if (field.value == "" && val == '0') {
			return field.value = '0';
		} else if (field.value == "0" && val >= 0 && val <= 9) {
			return field.value = val;
		} else if (field.value != "0" && val >= 0 && val <= 9) {
			return field.value += val;
		} else if (val == "+" || val == "-" || val == "*" || val == "/") {
			if (!/\val/.test(document.getElementById("numOperators"))) {
				event.preventDefault();
				document.getElementById("numOperators").innerHTML = val;
				field = document.getElementById("secondNumber");
			}
		} else if (val == "=") {
			if (document.getElementById("firstNumber").value != "" && document.getElementById("secondNumber").value != ""
			&& document.getElementById("numOperators").innerText != "") {
				if (document.getElementById("numOperators").innerText == "+") {
					numResult = Number(document.getElementById("firstNumber").value) + 
					Number(document.getElementById("secondNumber").value);
				} else if (document.getElementById("numOperators").innerText == "-") {
					numResult = document.getElementById("firstNumber").value - 
					document.getElementById("secondNumber").value;
				} else if (document.getElementById("numOperators").innerText == "*") {
					numResult = document.getElementById("firstNumber").value * 
					document.getElementById("secondNumber").value;
				} else { 
					if (document.getElementById("secondNumber").value == "0") {
						alert("User input denied: Cannot divide by zero...");
					} else {
					numResult = document.getElementById("firstNumber").value /
					document.getElementById("secondNumber").value;
					}
				}
				document.getElementById("result").value = parseFloat(numResult.toFixed(9));
			} else {
				alert("Enter numbers in both field and add operator ex. + - * or /");
			}
		}
	}
}
		
//this function enter all numerical and special operator values from keyboard to input fields 
function buttonPress(event) {
	var button1 = event.key;
	if (field == "") {
		alert("You need to click on a field before entering numbers");
	} else if (field.value.length == 15 && button1 != "+" && button1 != "-" && 
	button1 != "*" && button1 != "/" && event.keyCode != 13 && event.keyCode != 8) {
	} else {
		field.blur();
		if (event.keyCode == 32) {
			event.returnValue = false;
			return false;
		}
		if (field.value == "" && button1 == 0) {
			field.value = button1;
		} else if (field.value == "0" && button1 >= 0 && button1 <= 9) {
			return field.value = button1;
		} else if (button1 >= 0 && button1 <= 9){
			return field.value += button1;
		} else if (event.keyCode == 8) {
			return field.value = field.value.slice(0, field.value.length -1);
		} else if (event.keyCode == 27) {
			document.getElementById("firstNumber").value = "";
			document.getElementById("secondNumber").value = "";
			document.getElementById("numOperators").innerHTML = "";
			document.getElementById("result").value = "0";
			return field = document.getElementById("firstNumber");
		} else if (event.keyCode == 9) {
			if (field == document.getElementById("firstNumber")) {
				field = document.getElementById("secondNumber");
				field.focus();
				event.preventDefault();
			} else {
				field = document.getElementById("firstNumber");
				field.focus();
				event.preventDefault();
			}
		} else if (field.value == "" && button1 == ".") {
			return field.value = "0.";
		} else if (!/\./.test(field.value) && button1 == ".") {
			return field.value += ".";
		} else if (button1 == "+" || button1 == "-" || button1 == "*" || button1 == "/") {
			if (!/\button1/.test(document.getElementById("numOperators"))) {
				document.getElementById("numOperators").innerHTML = button1;
				if (field == document.getElementById("firstNumber")) {
					field = document.getElementById("secondNumber");
				} else {
					field = document.getElementById("firstNumber");
				}
			}
		} else if (event.keyCode == 13) { // this condition check for numOperators in span and store calculation result in numResult variable
			if (document.getElementById("firstNumber").value != "" && document.getElementById("secondNumber").value != ""
			    && document.getElementById("numOperators").innerText != "") {
				if (document.getElementById("numOperators").innerText == "+") {
					numResult = Number(document.getElementById("firstNumber").value) + 
					Number(document.getElementById("secondNumber").value);
				} else if (document.getElementById("numOperators").innerText == "-") {
					numResult = document.getElementById("firstNumber").value - 
					document.getElementById("secondNumber").value;
				} else if (document.getElementById("numOperators").innerText == "*") {
					numResult = document.getElementById("firstNumber").value * 
					document.getElementById("secondNumber").value;
				} else { 
					if (document.getElementById("secondNumber").value == "0") {
						alert("User input denied: Cannot divide by zero...");
					} else {
					numResult = document.getElementById("firstNumber").value /
					document.getElementById("secondNumber").value;
					}
				}
				document.getElementById("result").value = parseFloat(numResult.toFixed(10));
			} else {
					alert("Enter numbers in both field and add operator ex. + - * or /");
			}
		}
	}
}
		
//this function adds minus sign, decimal dot and clear option on mouse click 
function specialSigns(signet) {
	if (field == "") {
		alert("You need to click on a field before entering numbers");
	} else {
		if (field.value == "" && signet == "plusMinus") {
			return field.value = "";
		} else if (field.value == "0." && signet == "plusMinus") {
		} else if (signet == "plusMinus") {
			return field.value = -(field.value);
		} else if (signet == "clear") {
			document.getElementById("firstNumber").value = "";
			document.getElementById("secondNumber").value = "";
			document.getElementById("numOperators").innerHTML = "";
			document.getElementById("result").value = "0";
			return field = document.getElementById("firstNumber");
		} else if (field.value == "" && signet == ".") {
			return field.value = "0.";
		} else if (!/\./.test(field.value) && signet == ".") {
			return field.value += ".";
		} else if (signet == "backSpaceBtn") {
			return field.value = field.value.slice(0, field.value.length -1);
		}
	} 
}