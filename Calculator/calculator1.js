let field = "";
let numResult;
// this function enter values from onclick buttons to one of input fields
function numberButton(val) {
	document.getElementById("errorMsg").innerHTML = "";
	document.getElementById("result").value = "";
	if (field === "" && val >= 0 && val <= 9) {
		document.getElementById("errorMsg").innerHTML = "You need to click on an input field before you can enter numbers"
	} else if (field.value.length === 15 && val !== "+" && val !== "-" && 
	val !== "*" && val !== "/" && val !== "=" && val !== "^") {
	} else {
		if (field.value === "" && val === "0") {
			return field.value = "0";
		} else if (field.value === "0" && val >= 0 && val <= 9) {
			return field.value = val;
		} else if (field.value !== "0" && val >= 0 && val <= 9) {
			return field.value += val;
		} else if (val === "pow") {
			document.getElementById("numOperators").innerHTML = "^";
		} else if (val === "+" || val === "-" || val === "*" || val === "/") {
				document.getElementById("numOperators").innerHTML = val;
		} else if (val === "=") {
			if (document.getElementById("firstNumber").value !== "" && document.getElementById("secondNumber").value !== ""
			&& document.getElementById("numOperators").innerText !== "") {
				if (document.getElementById("numOperators").innerText === "+") {
					numResult = Number(document.getElementById("firstNumber").value) + 
					Number(document.getElementById("secondNumber").value);
				} else if (document.getElementById("numOperators").innerText === "-") {
					numResult = document.getElementById("firstNumber").value - 
					document.getElementById("secondNumber").value;
				} else if (document.getElementById("numOperators").innerText === "*") {
					numResult = document.getElementById("firstNumber").value * 
					document.getElementById("secondNumber").value;
				} else if (document.getElementById("numOperators").innerText === "^") {
					let tempResult = 1;
					let tempNumber1 = document.getElementById("firstNumber").value;
					let tempNumber2 = document.getElementById("secondNumber").value;
					for (let count = 0; count < tempNumber2; count++) {
						tempResult *= tempNumber1;
					}
					numResult = tempResult;
				} else { 
					if (document.getElementById("secondNumber").value === "0") {
						document.getElementById("errorMsg").innerHTML = "User input denied: Can not divide by zero";
						numResult = "";
					} else {
					numResult = document.getElementById("firstNumber").value /
					document.getElementById("secondNumber").value;
					}
				}
				document.getElementById("result").value = parseFloat(numResult.toFixed(9));
			} else {
				document.getElementById("errorMsg").innerHTML = "Enter numbers in both fields and add operator ex. + - * or /"
			}
		}
	}
}
		
//this function enter all numerical and special operator values from keyboard to input fields 
function buttonPress(event) {
	const button1 = event.key;
	const button2 = event.keyCode;
	document.getElementById("errorMsg").innerHTML = "";
	document.getElementById("result").value = "";
	
	if (field === "" && (button1 >= 0 || button1 <= 9)) {
		document.getElementById("errorMsg").innerHTML = "You need to click on an input field before you can enter numbers"
	} else if (field === "" &&  button2 === 9) {
		event.returnValue = false;
		return false;
	} else {}
	
	if (field.value.length === 15 && button1 !== "+" && button1 !== "-" && 
	button1 !== "*" && button1 !== "/" && button1 !== "^" && button2 !== 13 && button2 !== 8 && button2 !== 27) {
	} else {
		field.blur();
		if (button2 === 32) {
			event.returnValue = false;
			return false;
		}
		if (field.value === "" && button1 === 0) {
			field.value = button1;
		} else if (field.value === "0" && button1 >= 0 && button1 <= 9) {
			return field.value = button1;
		} else if (button1 >= 0 && button1 <= 9){
			return field.value += button1;
		} else if (button2 === 8) {
			return field.value = field.value.slice(0, field.value.length -1);
		} else if (button2 === 27) {
				event.preventDefault();
				document.getElementById("firstNumber").value = "";
				document.getElementById("secondNumber").value = "";
				document.getElementById("numOperators").innerHTML = "";
				document.getElementById("result").value = "";
				return field = "";
		} else if (button2 === 9) {
			if (field == document.getElementById("firstNumber")) {
				field = document.getElementById("secondNumber");
				field.focus();
				event.preventDefault();
			} else {
				field = document.getElementById("firstNumber");
				field.focus();
				event.preventDefault();
			}
		} else if (field.value === "" && button1 === ".") {
			return field.value = "0.";
		} else if (!/\./.test(field.value) && button1 === ".") {
			return field.value += ".";
		} else if (button1 === "+" || button1 === "-" || button1 === "*" || button1 === "/" || button1 === "^") {
			document.getElementById("numOperators").innerHTML = button1;
		} else if (button2 === 13) { // this condition check for numOperators in span and store calculation result in numResult variable
			if (document.getElementById("firstNumber").value !== "" && document.getElementById("secondNumber").value !== ""
			    && document.getElementById("numOperators").innerText !== "") {
				if (document.getElementById("numOperators").innerText === "+") {
					numResult = Number(document.getElementById("firstNumber").value) + 
					Number(document.getElementById("secondNumber").value);
				} else if (document.getElementById("numOperators").innerText === "-") {
					numResult = document.getElementById("firstNumber").value - 
					document.getElementById("secondNumber").value;
				} else if (document.getElementById("numOperators").innerText === "*") {
					numResult = document.getElementById("firstNumber").value * 
					document.getElementById("secondNumber").value;
				} else if (document.getElementById("numOperators").innerText === "^") {
					let tempResult = 1;
					let tempNumber1 = document.getElementById("firstNumber").value;
					let tempNumber2 = document.getElementById("secondNumber").value;
					for (let count = 0; count < tempNumber2; count++) {
						tempResult *= tempNumber1;
					}
					numResult = tempResult;
				} else { 
					if (document.getElementById("secondNumber").value === "0") {
						document.getElementById("errorMsg").innerHTML = "User input denied: Can not divide by zero";
						numResult = "";
					} else {
					numResult = document.getElementById("firstNumber").value /
					document.getElementById("secondNumber").value;
					}
				}
				document.getElementById("result").value = parseFloat(numResult.toFixed(10));
			} else {
				document.getElementById("errorMsg").innerHTML = "Enter numbers in both fields and add operator ex. + - * or / ";
			}
		}
	}
}
		
//this function adds minus sign, decimal dot and clear option on mouse click 
function specialSigns(signet) {
	document.getElementById("errorMsg").innerHTML = "";
	if (field === "" && signet !== "clear") {
	} else if (field.value === "" && signet === "plusMinus") {
		return field.value = "";
	} else if (field.value === "0." && signet === "plusMinus") {
	} else if (signet === "plusMinus") {
		return field.value = -(field.value);
	} else if (signet === "clear") {
		document.getElementById("firstNumber").value = "";
		document.getElementById("secondNumber").value = "";
		document.getElementById("numOperators").innerHTML = "";
		document.getElementById("result").value = "";
		return field = "";
	} else if (field.value === "" && signet === ".") {
		return field.value = "0.";
	} else if (!/\./.test(field.value) && signet === ".") {
		return field.value += ".";
	} else if (signet === "backSpaceBtn") {
		return field.value = field.value.slice(0, field.value.length -1);
	} 
}