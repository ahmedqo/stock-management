GO(document).load(function () {
	if (window.innerWidth < 767.98) {
		setTimeout(() => {
			GO("#sidebar").hide(500);
		}, 200);
	}
	GO.ajax({
		url: "../libs/check.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["loged_in"]) {
				type();
			} else {
				window.location.href = "../login/";
			}
		},
	});
});
window.onresize = function () {
	setTimeout(() => {
		if (window.innerWidth < 767.98) {
			GO("#sidebar").hide(500);
		} else {
			GO("#sidebar").show(500);
		}
	}, 200);
};
setTimeout(() => {
	GO(".alert")
		.find(".close")
		.click(function () {
			GO(".alert").parent().css({ display: "none" });
		});
	GO(".nav-trigger").click(function () {
		GO("#sidebar").toggle(500);
	});
}, 100);

let type = function () {
	GO.ajax({
		url: "../libs/getType.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			console.log(data["type"]);
			if (data["type"] !== "1") {
				setTimeout(() => {
					GO(".admin").css({ display: "none" });
				}, 200);
			}
		},
	});
};
