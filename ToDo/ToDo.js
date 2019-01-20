function currentDate() {
	let today = new Date(),
		dd = today.getDate(),
		mm = today.getMonth() + 1,
		yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	} 
	if (mm < 10) {
		mm = '0' + mm;
	}
	
	today = dd + '/' + mm + '/' + yyyy;
	return today;
}

let tasks = [];

function remover() {
	let tempHolder = (this.parentNode).parentNode.rowIndex;
	tasks.splice(tempHolder - 1,1);
	for (let i = 0; i < tasks.length; i++){
		tasks[i]["Task Number"] = i + 1;
	}
	if (tasks.length > 0) {
		document.querySelector("#toDoList").removeChild(document.querySelector("#toDoList").firstChild);
		document.querySelector("#toDoList").appendChild(tableBuilder(tasks));
	} else {
		document.querySelector("#toDoList").removeChild(document.querySelector("#toDoList").firstChild);
		document.getElementById("message").classList.remove("empty");
	}
}

function tableBuilder(data) {
	let table = document.createElement("table");
	let	taskFields = Object.keys(data[0]);
	let	headerRow = document.createElement("tr");
	taskFields.forEach(function(taskField){
		let headerCell = document.createElement("th");
		headerCell.textContent = taskField;
		headerRow.appendChild(headerCell);
	});
	table.appendChild(headerRow);
	
	data.forEach(function(object) {
		let row = document.createElement("tr");
		taskFields.forEach(function(taskField){
			let cell = document.createElement("td");
			cell.textContent = object[taskField];
			row.appendChild(cell);
		});
		table.appendChild(row);
	});
	for (let i = 1, row; row = table.rows[i]; i++) {
		let tdChecker = document.createElement("input");
		tdChecker.type = "checkbox";
		tdChecker.classList.add("checkerBox");
	
		let taskDelete = document.createElement("img");
		taskDelete.src = "../images/recyclebin.png";
		taskDelete.style.height= "18px";
		taskDelete.style.width= "18px";
		taskDelete.addEventListener("click", remover);
		taskDelete.classList.add("taskDeleteImg");
		
		row.cells[4].setAttribute("id","row"+i+"cell");
		row.cells["row"+i+"cell"].appendChild(tdChecker);
		row.cells["row"+i+"cell"].appendChild(taskDelete);
	}
	return table;
}
	
function addTask() {
	if (document.getElementById("taskName").value === "") {
		document.getElementById("taskName").classList.add("alertColor");
		document.getElementById("taskName").placeholder = "Enter a task name first";
		setTimeout(function() {
			document.getElementById("taskName").classList.remove("alertColor");
			document.getElementById("taskName").placeholder = "Name your task";
		}, 2000);
	} else {
		if (tasks.length === 0) {
			document.getElementById("message").classList.add("empty");
		}
	
		tasks.push({
			"Task Number": tasks.length + 1,
			"Task Name": document.getElementById("taskName").value,
			"Date Added": currentDate(),
			"Due On": "",
			Actions: ""
		});
		if(document.querySelector("#toDoList").hasChildNodes()){
			document.querySelector("#toDoList").removeChild(document.querySelector("#toDoList").firstChild);
		}
		document.querySelector("#toDoList").appendChild(tableBuilder(tasks));
	}
	document.getElementById("taskName").value = "";
}