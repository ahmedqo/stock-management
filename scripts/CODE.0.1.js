GO("#add").css({ display: "none" });
GO("#edit").css({ display: "none" });
GO("#showAdd").click(function () {
	GO("#list").css({ display: "none" });
	GO("#add").css({ display: "" });
});
GO("#hideAdd").click(function () {
	GO("#add").css({ display: "none" });
	GO("#list").css({ display: "" });
});
GO("#hideEdit").click(function () {
	GO("#edit").css({ display: "none" });
	GO("#list").css({ display: "" });
});
