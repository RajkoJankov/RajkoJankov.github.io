let buttonClick = document.getElementById("clicker");
buttonClick.addEventListener("click", function() {
	setTimeout(function() {
		document.getElementById("demo").innerHTML = "1";
		setTimeout(function() {
			document.getElementById("demo").innerHTML = "2";
			setTimeout(function() {
				document.getElementById("demo").innerHTML = "3";
			},1000);
		},1000);
	},1000);
});