var keysList = document.querySelector("#keysList");
var copyAllBtn = document.querySelector("#copyAllBtn");
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
for (var i = 0; true; i++) {
	var key = urlParams.getAll("key")[i];
	console.log(key);
	if (key != null) {
		document.querySelector("#notFound").classList.add("d-none");
		keysList.innerHTML += `
<div class="d-flex mt-5">
	<input class="form-control text-left ml-2" type="text" value="${key}" style="direction: ltr !important;" data-rounded="auto" readonly>
	<button class="btn btn-warning copyKeyBtn" data-key="${key}" data-rounded="auto">کپی</button>
</div>
`;
	} else {
		break;
	}
	newElement();
	document.querySelectorAll(".copyKeyBtn").forEach(button => {
		button.addEventListener("click", (event) => {
			var key = event.target.getAttribute("data-key");
			navigator.clipboard.writeText(key).then( () => {
				addNotification("success", true, "کد در کلیپ بورد کپی شد.", "کد با موفقیت در کلیپ بورد کپی شد.");
			});
		});
	});
	copyAllBtn.classList.remove("d-none")
}
copyAllBtn.addEventListener("click", () => {
	var keys;
	document.querySelectorAll(".copyKeyBtn").forEach(button => {
		var key = button.getAttribute("data-key");
		if (!keys) {
			keys = `${key}`;
		} else {
			keys = `${keys}
${key}`;
		}
	});
	navigator.clipboard.writeText(keys).then( () => {
		setTimeout( () => {
			addNotification("info", true, "همۀ کدها کپی شدند.", "همۀ کدها با موفقیت در کلیپ بورد کپی شدند.");
		}, 1);
	});
});