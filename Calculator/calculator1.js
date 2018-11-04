let field;
let numResult;
let numbers1 = document.getElementsByTagName('input');
let numberArray = [], operatorArray = [], switch01 = 0;

// this function enter values from onclick buttons to input field
function numberButton(val) {
	if (document.getElementById("resultPath").value === "Cannot divide by zero" && switch01 === 1) {
		document.getElementById("resultPath").value = "";
		numberArray = [];
		operatorArray = [];
		switch01 = 0;
		field.value = "0";
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
				numberArray.push(parseFloat(field.value));
				operatorArray.push("^");
			} else {
				document.getElementById("resultPath").value += " " + field.value + " " + "^";
				numberArray.push(parseFloat(field.value));
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
				numberArray.push(parseFloat(field.value));
				operatorArray.push(val);
			} else {
				document.getElementById("resultPath").value += " " + field.value + " " + val;
				numberArray.push(parseFloat(field.value));
				operatorArray.push(val);
				return switch01 = 1;
			}
		} else if (val === "=") {
			let tempNumberArray = [], tempOpArray = [], currentOperator = "";
			if (operatorArray !== []) {
				let sampleArray = ["^","*","/","+","-"];
				numberArray.push(parseFloat(field.value));
				numResult = "";
				document.getElementById("resultPath").value = "";
				for (let i = 0; i < sampleArray.length; i++) {
					for (let j = 0; j < numberArray.length; j++) {
						if (operatorArray[j] === sampleArray[i]) {
							if (operatorArray[j] === "^") {
								if (operatorArray[j] === currentOperator) {
									numResult = Math.pow(numResult, numberArray[j + 1]);
									currentOperator = operatorArray[j + 1];
									tempNumberArray[tempNumberArray.length - 1] = numResult;
								} else if (currentOperator !== "") {
									tempOpArray.push(currentOperator);
									numResult = Math.pow(numberArray[j], numberArray[j + 1]);
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								} else if (currentOperator === "") {
									numResult = Math.pow(numberArray[j], numberArray[j + 1]);
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								}
							} else if (operatorArray[j] === "*") {
								if (operatorArray[j] === currentOperator) {
									numResult = numResult * numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray[tempNumberArray.length - 1] = numResult;
								} else if (currentOperator !== "") {
									tempOpArray.push(currentOperator);
									numResult = numberArray[j] * numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								} else if (currentOperator === "") {
									numResult = numberArray[j] * numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								}
							} else if (operatorArray[j] === "/") {
								if (numberArray[j + 1] === 0) {
									document.getElementById("resultPath").value = "Cannot divide by zero";
									switch01 = 1;
									return field.value = NaN;
								} else if (operatorArray[j] === currentOperator) {
									numResult = numResult / numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray[tempNumberArray.length - 1] = numResult;
								} else  if (currentOperator !== ""){
									tempOpArray.push(currentOperator);
									numResult = numberArray[j] / numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								} else if (currentOperator === "") {
									numResult = numberArray[j] / numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								}
							} else if (operatorArray[j] === "+") {
								if (operatorArray[j] === currentOperator) {
									numResult = numResult + numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray[tempNumberArray.length - 1] = numResult;
								} else if (currentOperator !== "") {
									tempOpArray.push(currentOperator);
									numResult = numberArray[j] + numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								} else if (currentOperator === "") {
									numResult = numberArray[j] + numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								}
							} else if (operatorArray[j] === "-") {
								if (operatorArray[j] === currentOperator) {
									numResult = numResult - numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray[tempNumberArray.length - 1] = numResult;
								} else if (currentOperator !== "") {
									tempOpArray.push(currentOperator);
									numResult = numberArray[j] - numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								} else if (currentOperator === "") {
									numResult = numberArray[j] - numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								}
							}
						} else if (currentOperator !== ""){
							tempOpArray.push(currentOperator);
							currentOperator = "";
						} else if (currentOperator === "") {
							tempNumberArray.push(numberArray[j]);
							tempOpArray.push(operatorArray[j]);
						}
					} 
					numberArray = tempNumberArray;
					operatorArray = tempOpArray;
					tempNumberArray = [];
					tempOpArray = [];
				}
				field.value = numResult;
				numberArray = [];
				operatorArray = [];
				switch01 = 1;	
			}
		}
	}
}
		
//this function enter all numerical and special operator values from keyboard to input field 
function buttonPress(event) {
	const button1 = event.key;
	const button2 = event.keyCode;
	
	if (document.getElementById("resultPath").value === "Cannot divide by zero" && switch01 === 1) {
		document.getElementById("resultPath").value = "";
		numberArray = [];
		operatorArray = [];
		switch01 = 0;
		field.value = "0";
	}
	
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
				numberArray.push(parseFloat(field.value));
				operatorArray.push(button1);
			} else {
				document.getElementById("resultPath").value += " " + field.value + " " + button1;
				numberArray.push(parseFloat(field.value));
				operatorArray.push(button1);
				return switch01 = 1;
			}
		} else if (button2 === 13) { // this condition check for operators in order of importance and does the equasion
			let tempNumberArray = [], tempOpArray = [], currentOperator = "";
			if (operatorArray !== []) {
				let sampleArray = ["^","*","/","+","-"];
				numberArray.push(parseFloat(field.value));
				numResult = "";
				document.getElementById("resultPath").value = "";
				for (let i = 0; i < sampleArray.length; i++) {
					for (let j = 0; j < numberArray.length; j++) {
						if (operatorArray[j] === sampleArray[i]) {
							if (operatorArray[j] === "^") {
								if (operatorArray[j] === currentOperator) {
									numResult = Math.pow(numResult, numberArray[j + 1]);
									currentOperator = operatorArray[j + 1];
									tempNumberArray[tempNumberArray.length - 1] = numResult;
								} else if (currentOperator !== "") {
									tempOpArray.push(currentOperator);
									numResult = Math.pow(numberArray[j], numberArray[j + 1]);
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								} else if (currentOperator === "") {
									numResult = Math.pow(numberArray[j], numberArray[j + 1]);
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								}
							} else if (operatorArray[j] === "*") {
								if (operatorArray[j] === currentOperator) {
									numResult = numResult * numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray[tempNumberArray.length - 1] = numResult;
								} else if (currentOperator !== "") {
									tempOpArray.push(currentOperator);
									numResult = numberArray[j] * numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								} else if (currentOperator === "") {
									numResult = numberArray[j] * numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								}
							} else if (operatorArray[j] === "/") {
								if (numberArray[j + 1] === 0) {
									document.getElementById("resultPath").value = "Cannot divide by zero";
									switch01 = 1;
									return field.value = NaN;
								} else if (operatorArray[j] === currentOperator) {
									numResult = numResult / numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray[tempNumberArray.length - 1] = numResult;
								} else  if (currentOperator !== ""){
									tempOpArray.push(currentOperator);
									numResult = numberArray[j] / numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								} else if (currentOperator === "") {
									numResult = numberArray[j] / numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								}
							} else if (operatorArray[j] === "+") {
								if (operatorArray[j] === currentOperator) {
									numResult = numResult + numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray[tempNumberArray.length - 1] = numResult;
								} else if (currentOperator !== "") {
									tempOpArray.push(currentOperator);
									numResult = numberArray[j] + numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								} else if (currentOperator === "") {
									numResult = numberArray[j] + numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								}
							} else if (operatorArray[j] === "-") {
								if (operatorArray[j] === currentOperator) {
									numResult = numResult - numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray[tempNumberArray.length - 1] = numResult;
								} else if (currentOperator !== "") {
									tempOpArray.push(currentOperator);
									numResult = numberArray[j] - numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								} else if (currentOperator === "") {
									numResult = numberArray[j] - numberArray[j + 1];
									currentOperator = operatorArray[j + 1];
									tempNumberArray.push(numResult);
								}
							}
						} else if (currentOperator !== ""){
							tempOpArray.push(currentOperator);
							currentOperator = "";
						} else if (currentOperator === "") {
							tempNumberArray.push(numberArray[j]);
							tempOpArray.push(operatorArray[j]);
						}
					} 
					numberArray = tempNumberArray;
					operatorArray = tempOpArray;
					tempNumberArray = [];
					tempOpArray = [];
				}
				field.value = numResult;
				numberArray = [];
				operatorArray = [];
				switch01 = 1;	
			} else {}
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