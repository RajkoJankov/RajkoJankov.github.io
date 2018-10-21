let field;
let numResult;
let numbers1 = document.getElementsByTagName('input');
let numberArray = [], operatorArray = [], switch01 = 0;

// this function enter values from onclick buttons to input field
function numberButton(val) {
	if (document.getElementById("resultPath").value === "Cannot divide by zero" && switch01 === 1) {
		document.getElementById("resultPath").value = "";
		switch01 = 0;
		field.value = 0;
	}
	if (field.value.length === 12 && val !== "+" && val !== "-" && 
	val !== "*" && val !== "/" && val !== "=" && val !== "^") {
	} else {
		if (field.value === "0" && val >= 0 && val <= 9) {
			return field.value = val;
		} else if (field.value !== "0" && val >= 0 && val <= 9) {
			if (switch01 === 1) {
				switch01 = 0;
				return field.value = val;
			} else return field.value += val;
		} else if (val === "pow") {
			if (switch01 === 1 && document.getElementById("resultPath").value !== "") {
				operatorArray[operatorArray.length - 1] = "^";
				document.getElementById("resultPath").value = document.getElementById("resultPath").value.slice(0, 
				document.getElementById("resultPath").value.length -1);
				document.getElementById("resultPath").value += "^";
			} else if (switch01 === 1 && document.getElementById("resultPath").value === "") {
				document.getElementById("resultPath").value = field.value + " " + "^";
				numberArray.push(field.value);
				operatorArray.push("^");
			} else {
				document.getElementById("resultPath").value += " " + field.value + " " + "^";
				numberArray.push(field.value);
				operatorArray.push("^");
				return switch01 = 1;
			}
		} else if (val === "+" || val === "-" || val === "*" || val === "/") {
			if (switch01 === 1 && document.getElementById("resultPath").value !== "") {
				operatorArray[operatorArray.length - 1] = val;
				document.getElementById("resultPath").value = document.getElementById("resultPath").value.slice(0, 
				document.getElementById("resultPath").value.length -1);
				document.getElementById("resultPath").value += val;
			} else if (switch01 === 1 && document.getElementById("resultPath").value === "") {
				document.getElementById("resultPath").value = field.value + " " + val;
				numberArray.push(field.value);
				operatorArray.push(val);
			} else {
				document.getElementById("resultPath").value += " " + field.value + " " + val;
				numberArray.push(field.value);
				operatorArray.push(val);
				return switch01 = 1;
			}
		} else if (val === "=") {
			if (operatorArray !== []) {
				numberArray.push(field.value);
				numResult = parseFloat(numberArray[0]);
				document.getElementById("resultPath").value = "";
				for (let i = 1; i < numberArray.length; i++) {
					if (operatorArray[i - 1] === "+") {
						numResult = numResult + parseFloat(numberArray[i]);
					} else if (operatorArray[i - 1] === "-") {
						numResult = numResult - parseFloat(numberArray[i]);
					} else if (operatorArray[i - 1] === "*") {
						numResult = numResult * parseFloat(numberArray[i]);
					} else if (operatorArray[i - 1] === "^") {
						let tempResult = 1;
						let tempNumber1 = numResult;
						let tempNumber2 = parseInt(numberArray[i]);
						for (let count = 0; count < tempNumber2; count++) {
							tempResult *= tempNumber1;
					}
					numResult = tempResult;
					} else if (operatorArray[i - 1] === "/") {
						if (numberArray[i] === "0") {
							numResult = NaN;
							document.getElementById("resultPath").value = "Cannot divide by zero";
						} else {
							numResult = numResult / parseFloat(numberArray[i]);
						}
					} 
				} field.value = parseFloat(numResult.toFixed(9));
				numberArray = [];
				operatorArray = [];
				switch01 = 1;
			} else {
			}
		}
	}
}
		
//this function enter all numerical and special operator values from keyboard to input field 
function buttonPress(event) {
	const button1 = event.key;
	const button2 = event.keyCode;
	
	// this -for- checks if keyboard input matches the on screen buttons and "clicks" them
	for (let i = 2; i < numbers1.length; i++) { 
		if (event.key === numbers1[i].value && numbers1[i].value >= "0" && numbers1[i].value <= "9") {
			numbers1[i].setAttribute("id", "activeId");
			setTimeout(function(){numbers1[i].removeAttribute("id");}, 100);
		} else if (event.key === "." && numbers1[i].value === ".") {
			numbers1[i].setAttribute("id", "activeId");
			setTimeout(function(){numbers1[i].removeAttribute("id");}, 100);
		} else if (event.keyCode === 27 && numbers1[i].value === "c") {
			numbers1[i].setAttribute("id", "activeId");
			setTimeout(function(){numbers1[i].removeAttribute("id");}, 100);
		} else if (event.keyCode === 8 && numbers1[i].name === "backSpaceBtn") {
			numbers1[i].setAttribute("id", "activeId");
			setTimeout(function(){numbers1[i].removeAttribute("id");}, 100);
		} else if (event.key === numbers1[i].value && (numbers1[i].value === "+" || numbers1[i].value === "-" ||
			numbers1[i].value === "*" || numbers1[i].value === "/")) {
			numbers1[i].setAttribute("id", "activeId2");
			setTimeout(function(){numbers1[i].removeAttribute("id");}, 100);
		} else if (event.key === "^" && numbers1[i].value === "pow") {
			numbers1[i].setAttribute("id", "activeId2");
			setTimeout(function(){numbers1[i].removeAttribute("id");}, 100);
		} else if (event.keyCode === 13 && numbers1[i].value === "=") {
			numbers1[i].setAttribute("id", "activeId2");
			setTimeout(function(){numbers1[i].removeAttribute("id");}, 100);
		}
	}
	
	if (button2 === 9) {
		event.returnValue = false;
		return false;
	} else {}
	
	if (field.value.length === 12 && button1 !== "+" && button1 !== "-" && 
	button1 !== "*" && button1 !== "/" && button1 !== "^" && button2 !== 13 && button2 !== 8 && button2 !== 27) {
	} else {
		field.blur();
		if (button2 === 32) {
			event.returnValue = false;
			return false;
		}
		if (field.value === "0" && button1 >= 0 && button1 <= 9) {
			return field.value = button1;
		} else if (field.value !== "0" && button1 >= 0 && button1 <= 9) {
			if (switch01 === 1) {
				switch01 = 0;
				return field.value = button1;
			} else return field.value += button1;
		} else if (button2 === 8) {
			if (document.getElementById("resultPath").value === "Cannot divide by zero") {
				document.getElementById("resultPath").value = "";
				return field.value = 0;
			} else if (field.value.length === 1) {
				return field.value = 0;
			} else {
			return field.value = field.value.slice(0, field.value.length -1);
			}
		} else if (button2 === 27) {
			field.value = "0";
			document.getElementById("resultPath").value = "";
			numberArray = [];
			operatorArray = [];
			return switch01 = 0;
		} else if (field.value === "0" && button1 === ".") {
			if (switch01 === 1) {
			switch01 = 0;
			return field.value = "0.";
		} else return field.value = "0.";
		} else if (!/\./.test(field.value) && button1 === ".") {
			if (document.getElementById("resultPath").value === "Cannot divide by zero") {
				switch01 = 0;
				document.getElementById("resultPath").value = "";
				return field.value = "0.";
			} else if (switch01 === 1) {
				switch01 = 0;
				return field.value = "0.";
			} else return field.value += ".";
		} else if (button1 === "+" || button1 === "-" || button1 === "*" || button1 === "/" || button1 === "^") {
			if (switch01 === 1 && document.getElementById("resultPath").value !== "") {
				operatorArray[operatorArray.length - 1] = button1;
				document.getElementById("resultPath").value = document.getElementById("resultPath").value.slice(0, 
				document.getElementById("resultPath").value.length -1);
				document.getElementById("resultPath").value += button1;
			} else if (switch01 === 1 && document.getElementById("resultPath").value === "") {
				document.getElementById("resultPath").value = field.value + " " + button1;
				numberArray.push(field.value);
				operatorArray.push(button1);
			} else {
				document.getElementById("resultPath").value += " " + field.value + " " + button1;
				numberArray.push(field.value);
				operatorArray.push(button1);
				return switch01 = 1;
			}
		} else if (button2 === 13) { // this condition check for numOperators in span and store calculation result in numResult variable
			if (operatorArray !== []) {
				numberArray.push(field.value);
				numResult = parseFloat(numberArray[0]);
				document.getElementById("resultPath").value = "";
				for (let i = 1; i < numberArray.length; i++) {
					if (operatorArray[i - 1] === "+") {
						numResult = numResult + parseFloat(numberArray[i]);
					} else if (operatorArray[i - 1] === "-") {
						numResult = numResult - parseFloat(numberArray[i]);
					} else if (operatorArray[i - 1] === "*") {
						numResult = numResult * parseFloat(numberArray[i]);
					} else if (operatorArray[i - 1] === "^") {
						let tempResult = 1;
						let tempNumber1 = numResult;
						let tempNumber2 = parseInt(numberArray[i]);
						for (let count = 0; count < tempNumber2; count++) {
							tempResult *= tempNumber1;
					}
					numResult = tempResult;
					} else if (operatorArray[i - 1] === "/") {
						if (numberArray[i] === "0") {
							numResult = NaN;
							document.getElementById("resultPath").value = "Cannot divide by zero";
						} else {
							numResult = numResult / parseFloat(numberArray[i]);
						}
					} 
				} field.value = parseFloat(numResult.toFixed(9));
				numberArray = [];
				operatorArray = [];
				switch01 = 1;
			} else {
			}
		}
	}
}
		
//this function adds minus sign, decimal dot and clear option on mouse click 
function specialSigns(signet) {
	if (field === "0" && signet !== "clear") {
	} else if (field.value === "0" && signet === "plusMinus") {
		return field.value = "0";
	} else if (field.value === "0." && signet === "plusMinus") {
	} else if (signet === "plusMinus") {
		return field.value = -(field.value);
	} else if (signet === "clear") {
		field.value = "0";
		document.getElementById("resultPath").value = "";
		numberArray = [];
		operatorArray = [];
		return switch01 = 0;
	} else if (field.value === "0" && signet === ".") {
		if (switch01 === 1) {
			switch01 = 0;
			return field.value = "0.";
		} else {
			return field.value = "0.";
		}
	} else if (!/\./.test(field.value) && signet === ".") {
		if (document.getElementById("resultPath").value === "Cannot divide by zero") {
			switch01 = 0;
			document.getElementById("resultPath").value = "";
			return field.value = "0.";
		} else if (switch01 === 1) {
			switch01 = 0;
			return field.value = "0.";
		} else return field.value += ".";
	} else if (signet === "backSpaceBtn") {
		if (document.getElementById("resultPath").value === "Cannot divide by zero") {
			document.getElementById("resultPath").value = "";
			return field.value = 0;
		} else if (field.value.length === 1) {
			return field.value = 0;
		} else {
		return field.value = field.value.slice(0, field.value.length -1);
		}
	} 
}