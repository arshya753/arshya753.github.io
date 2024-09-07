var games = [
	{
		name: "Stone Age",
		img: "https://cdn.hamsterkombat.io/stone_age/image.webp",
		appToken: "e68b39d2-4880-4a31-b3aa-0393e7df10c7", 
		promoId: "e68b39d2-4880-4a31-b3aa-0393e7df10c7",
		delay: 20000,
		attempts: 8
	},
	{
		name: "Tile Trio",
		img: "https://cdn.hamsterkombat.io/tile_trio/image.webp",
		appToken: "04ebd6de-69b7-43d1-9c4b-04a6ca3305af", 
		promoId: "04ebd6de-69b7-43d1-9c4b-04a6ca3305af",
		delay: 20000,
		attempts: 8
	},
	{
		name: "Fluff Crusade",
		img: "https://cdn.hamsterkombat.io/fluff/image.webp",
		appToken: "112887b0-a8af-4eb2-ac63-d82df78283d9", 
		promoId: "112887b0-a8af-4eb2-ac63-d82df78283d9",
		delay: 15000,
		attempts: 8
	},
	{
		name: "Mow and Trim",
		img: "https://cdn.hamsterkombat.io/mow_trim/image.webp",
		appToken: "ef319a80-949a-492e-8ee0-424fb5fc20a6", 
		promoId: "ef319a80-949a-492e-8ee0-424fb5fc20a6",
		delay: 20000,
		attempts: 10
	},
	{
		name: "Train Miner",
		img: "https://cdn.hamsterkombat.io/train_miner/image.webp",
		appToken: "82647f43-3f87-402d-88dd-09a90025313f",
		promoId: "c4480ac7-e178-4973-8061-9ed5b2e17954",
		delay: 9000,
		attempts: 15
	},
	{
		name: "Chain Cube 2048",
		img: "https://cdn.hamsterkombat.io/chain_cube/image.webp",
		appToken: "d1690a07-3780-4068-810f-9b5bbf2931b2",
		promoId: "b4170868-cef0-424f-8eb9-be0622e8e8e3",
		delay: 20000,
		attempts: 5
	},
	{
		name: "Merge Away",
		img: "https://cdn.hamsterkombat.io/merge_away/image.webp",
		appToken: "8d1cc2ad-e097-4b86-90ef-7a27e19fb833",
		promoId: "dc128d28-c45b-411c-98ff-ac7726fbaea4",
		delay: 21000,
		attempts: 9
	},
	{
		name: "Zoopolis",
		img: "https://cdn.hamsterkombat.io/zoopolis/image.webp",
		appToken: "b2436c89-e0aa-4aed-8046-9b0515e1c46b",
		promoId: "b2436c89-e0aa-4aed-8046-9b0515e1c46b",
		delay: 10000,
		attempts: 10
	},
	{
		name: "Twerk Race 3D",
		img: "https://cdn.hamsterkombat.io/twerk/image.webp",
		appToken: "61308365-9d16-4040-8bb0-2f4a4c69074c",
		promoId: "61308365-9d16-4040-8bb0-2f4a4c69074c",
		delay: 20000,
		attempts: 12
	},
	{
		name: "Polysphere",
		img: "https://cdn.hamsterkombat.io/polysphere/image.webp",
		appToken: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71", 
		promoId: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71",
		delay: 15000,
		attempts: 18
	}
];
var showNumberOfKeys = document.querySelector("#showNumberOfKeys");
var startBtn = document.querySelector("#startBtn");
var numberOfKeys = document.querySelector("#numberOfKeys");
var progressLog = document.querySelector("#progressLog");
var keysList = document.querySelector("#keysList");
var gamesSelect = document.querySelector("#gamesSelect");
var copyAllBtn = document.querySelector("#copyAllBtn");
var logCon = document.querySelector("#logCon");
var attempts = document.querySelector("#attempts");
var generateMoreKeysBtn = document.querySelector("#generateMoreKeysBtn");
var customDelay = document.querySelector("#customDelay");
var percentage = document.querySelector("#percentage");
var viewLink = document.querySelector("#viewLink");
function keysNum() {
	var keysNum = + localStorage.getItem("keysNum");
	if (keysNum > 0) {
		return keysNum;
	} else {
		localStorage.setItem("keysNum", 0);
		return 0;
	}
}
for (var i = 1; i < keysNum() + 1; i++) {
	var key = localStorage.getItem(`key${i}`);
	if (key != null) {
		recoverKeys(i);
		document.querySelectorAll(".copyKeyBtn").forEach(button => {
			button.addEventListener("click", (event) => {
				var key = event.target.getAttribute("data-key");
				navigator.clipboard.writeText(key).then( () => {
					addNotification("success", true, "کد در کلیپ بورد کپی شد.", "کد با موفقیت در کلیپ بورد کپی شد.");
				});
			});
		});
		copyAllBtn.classList.remove("d-none");
	} else {
		break;
	}
}
function clearKeys() {
	keysList.innerHTML = "";
	viewLink.value = "https://arshya753.github.io/tools/hamster-kombat/keygen/view/?";
	copyAllBtn.classList.add("d-none");
	for (var i = 1; i < keysNum() + 1; i++) {
		if (key != null) {
			localStorage.removeItem(`key${i}`);
		} else {
			localStorage.removeItem("keysNum");
			break;
		}
	}
}
function recoverKeys(i) {
	var key = localStorage.getItem(`key${i}`);
	viewLink.value += `key=${key}&`;
	keysList.innerHTML = `
<div class="d-flex mt-5">
	<input class="form-control text-left ml-2" type="text" value="${key}" style="direction: ltr !important;" data-rounded="auto" readonly>
	<button class="btn btn-warning copyKeyBtn" data-key="${key}" data-rounded="auto">کپی</button>
</div>
` + keysList.innerHTML;
	newElement();
}
for (var i = 0; i < games.length; i++) {
	gamesSelect.innerHTML = ` ${gamesSelect.innerHTML}
	<input type="checkbox" id="game${i}" class="d-none">
	<label for="game${i}" class="col" data-class-toggle-click="border-warning" data-class-toggle-target="element.card" data-class-toggle-type="checkbox" style="cursor: pointer;">
		<div class="card rounded-lg h-100 shadow-sm border" data-game="${i}">
			<img class="rounded-lg bd-placeholder-img card-img-top w-auto mx-2" src="${games[i].img}" alt="${games[i].name}">
			<div class="card-body">${games[i].name}</div>
		</div>
	</label>
`;
}
newElement();
async function login(clientId, appToken) {
	var response = await fetch("https://api.gamepromo.io/promo/login-client", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			appToken,
			clientId,
			clientOrigin: "deviceid"
		})
	});
	if (!response.ok) {
		throw new Error("Failed to login");
	}
	var data = await response.json();
	return data.clientToken;
}
async function emulateProgress(clientToken, promoId) {
	var response = await fetch("https://api.gamepromo.io/promo/register-event", {
	method: "POST",
		headers: {
			"Authorization": `Bearer ${clientToken}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			promoId,
			eventId: generateUUID(),
			eventOrigin: "undefined"
		})
	});
	if (!response.ok) {
		return false;
	}
	var data = await response.json();
	return data.hasCode;
}
async function generateKey(clientToken, promoId) {
	var response = await fetch("https://api.gamepromo.io/promo/create-code", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${clientToken}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				promoId
			})
	});
	if (!response.ok) {
		throw new Error("Failed to generate key");
	}
	var data = await response.json();
	return data.promoCode;
}
function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};
progress = 0;
function updateProgress(addProgress = 0, message = "", setProgress = false) {
	if (setProgress == false) {
		progress = progress + addProgress;
	} else {
		progress = addProgress;
	}
	var progressBar = document.querySelector("#progressBar");
	progressBar.style.width = `${parseInt(progress)}%`;
	percentage.innerText = `${parseInt(progress)}%`;
	progressLog.innerText = message;
};
async function startGeneration(selectedGames) {
	if (localStorage.getItem("developer_mode") === "true") {
		timer(true);
	}
	disableOrEnable(true);
	var progressBar = document.querySelector("#progressBar");
	var keyCount = parseInt(numberOfKeys.value);
	var game = games[selectedGames[0]];
	selectedGames.shift();
	attempts.innerHTML = `۰ از ${game.attempts}`;
	var keys = await Promise.all(Array.from({ length: keyCount }, async () => {
		var timestamp = Date.now();
		var randomNumbers = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join("");
		var clientId = `${timestamp}-${randomNumbers}`;
		var clientToken;
		try {
			clientToken = await login(clientId, game.appToken);
		} catch (error) {
			addNotification("error", true, "ورود ناموفق", error.message);
			return null;
		}
		for (var i = 0; i < game.attempts; i++) {
			if (localStorage.getItem("developer_mode") === "true") {
				await new Promise(resolve => setTimeout(resolve, customDelay.value));
			} else {
				await new Promise(resolve => setTimeout(resolve, game.delay));
			}
			var hasCode = await emulateProgress(clientToken, game.promoId);
			if (hasCode) {
				break;
			}
			updateProgress(100 / game.attempts / keyCount / selectedGamesLength, "در حال انجام...");
			attempts.innerHTML = `${i + 1} از ${game.attempts}`;
		}
		try {
			var key = await generateKey(clientToken, game.promoId);
			return key;
		} catch (error) {
			addNotification("error", true, "ایجاد کلید ناموفق بود", error.message);
			return null;
		}
	}));
	for (var i = 0; i < keys.length; i ++) {
		if (keys[i] != null) {
			localStorage.setItem(`key${keysNum() + 1}`, keys[i]);
			localStorage.setItem("keysNum", keysNum() + 1);
			viewLink.value += `key=${keys[i]}&`;
			keysList.innerHTML = `
<div class="d-flex mt-5">
	<input class="form-control text-left ml-2" type="text" value="${keys[i]}" style="direction: ltr !important;" data-rounded="auto" readonly>
	<button class="btn btn-warning copyKeyBtn" data-key="${keys[i]}" data-rounded="auto">کپی</button>
</div>
${keysList.innerHTML}`;
		}
	}
	newElement();
	copyAllBtn.classList.remove("d-none");
	document.querySelectorAll(".copyKeyBtn").forEach(button => {
		button.addEventListener("click", (event) => {
			var key = event.target.getAttribute("data-key");
			navigator.clipboard.writeText(key);
			addNotification("success", true, "کد در کلیپ بورد کپی شد.", "کد با موفقیت در کلیپ بورد کپی شد.");
		});
	});
	if (selectedGames[0]) {
		updateProgress(100 / selectedGamesLength, "در حال شروع ...");
		startGeneration(selectedGames);
	} else {
		if (localStorage.getItem("developer_mode") === "true") {
			timer(false);
		}
		updateProgress(100, "تکمیل شد.", true);
		progressBar.classList.remove("progress-bar-animated");
		progressBar.classList.add("bg-success");
		progressBar.classList.remove("bg-info");
		generateMoreKeysBtn.classList.remove("d-none");
	}
};
function disableOrEnable(i = false) {
	gamesSelect.querySelectorAll("input").forEach( element => {
		element.disabled = i;
	});
	startBtn.disabled = i;
	numberOfKeys.disabled = i;
	customDelay.disabled = i;
	var progressBar = document.querySelector("#progressBar");
	if (i) {
		gamesSelect.querySelectorAll("label").forEach( element => {
			element.style.cursor = "";
		});
		logCon.classList.remove("d-none");
		progressBar.parentElement.classList.remove("d-none");
		attempts.classList.remove("d-none");
		percentage.classList.remove("d-none");
	} else {
		gamesSelect.querySelectorAll("label").forEach( element => {
			element.style.cursor = "pointer";
		});
		generateMoreKeysBtn.classList.add("d-none");
		logCon.classList.add("d-none");
		progressBar.parentElement.classList.add("d-none");
		attempts.classList.add("d-none");
		percentage.classList.add("d-none");
		updateProgress(0, "در حال شروع", true);
		progressBar.classList.add("progress-bar-animated");
		progressBar.classList.remove("bg-success");
		progressBar.classList.add("bg-info");
	}
}
startBtn.addEventListener("click", () => {
	selectedGames = Array.from(gamesSelect.querySelectorAll("label .card.border-warning")).map(element => element.getAttribute("data-game"));
	selectedGamesLength = selectedGames.length;
	if (selectedGamesLength == 0) {
		addNotification("warning", true, "بازی&zwnj;ها را انتخاب کنید.", "بازی&zwnj;ها را انتخاب نکردید.")
	} else {
		startGeneration(selectedGames);
	}
});
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
	navigator.clipboard.writeText(keys);
	addNotification("success", true, "همۀ کدها کپی شدند.", "همۀ کدها با موفقیت در کلیپ بورد کپی شدند.");
});
if (localStorage.getItem("developer_mode") === "true") {
	developer_mode();
}
function developer_mode() {
	if (localStorage.getItem("developer_mode") !== "true") {
		var pass = prompt("Enter developer password:");
		if (pass === "AA753") {
			localStorage.setItem("developer_mode", "true");
		} else {
			console.error(false);
		}
	}
	if (localStorage.getItem("developer_mode") === "true") {
		customDelay.parentElement.classList.remove("d-none");
		document.querySelector("#timer").classList.remove("d-none");
	}
}
function timer(start = true) {
	if (start == true) {
		document.querySelector("#startTime").innerHTML = timeDate(true);
	} else if (start == false) {
		document.querySelector("#finishTime").innerHTML = timeDate(true);
	}
}
viewLink.addEventListener("click", () => {
	openInNewTab(viewLink.value);
})
document.querySelector("#copyViewLink").addEventListener("click", () => {
	navigator.clipboard.writeText(viewLink.value);
	addNotification("success", true, "لینک کدها کپی شد.", "لینک کدها با موفقیت در کلیپ بورد کپی شد.");
})
numberOfKeys.addEventListener("change", () => {
	showNumberOfKeys.innerHTML = numberOfKeys.value;
})
