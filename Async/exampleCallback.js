let buttonClick = document.getElementById("clicker");
buttonClick.addEventListener("click", function() {
	setTimeout(function() {
		window.open("https://www.google.com");
		setTimeout(function() {
			window.open("https://www.youtube.com");
			setTimeout(function() {
				window.open("https://www.somehting.com");
			},3000);
		},3000);
	},3000);
});