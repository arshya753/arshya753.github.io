var home = window.location.origin;
var rounded = "lg";
var radius = ".3rem";
var root = document.querySelector("div#root");
if (navbar) {
	root.innerHTML = `
			<nav class="navbar navbar-expand-md fixed-top" data-theme-mode="navbar-mode">
				<div class="container-fluid">
					<a class="navbar-brand" href="${home}">خانه</a>
					<button class="navbar-toggler" type="button" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="navbar-collapse collapse">
						<ul class="navbar-nav ml-auto mb-2 mb-md-0" style="padding: .5rem 0;">
							<li class="nav-item">
								<a class="nav-link" href="${home}">خانه</a>
							</li>
							<li class="nav-item dropdown">
								<a class="nav-link dropdown-toggle" aria-expanded="false">کشویی</a>
								<ul class="dropdown-menu">
									<li>
										<a class="dropdown-item w-auto" href="#">عمل</a>
									</li>
									<li>
										<a class="dropdown-item w-auto" href="#">عملی دیگر</a>
									</li>
									<li>
										<a class="dropdown-item w-auto" href="#">یه چیز دیگه اینجا</a>
									</li>
								</ul>
							</li>
						</ul>
						<form role="search" class="d-flex">
							<input class="form-control ml-2" data-rounded="auto"type="search" id="search" placeholder="جستجو" aria-label="جستجو">
							<button class="btn btn-outline-success" data-rounded="auto" type="submit">جستجو</button>
						</form>
					</div>
				</div>
			</nav>${root.innerHTML}`;
}
if (footer) {
	root.innerHTML = `${root.innerHTML}
			<footer class="text-center pt-3 pb-1 mt-3" data-theme-mode="bg-mode">
				<h3>No &copy; 2024</h3>
			</footer>`
}
if (notifications) {
	root.innerHTML = `${root.innerHTML}
			<div class="notification-container"></div>
`;
}
if (backToUpBtn) {
	root.innerHTML = `${root.innerHTML}
			<button class="btn btn-shadow back-to-up-button d-none" data-theme-mode="btn-mode" data-rounded="auto">
				<span class="material-symbols-outlined">arrow_upward_alt</span>
			</button>
`;
}
if (colorThemes) {
	root.innerHTML = `${root.innerHTML}
			<div class="theme-colors rounded-lg">
				<div class="p-4">
					<p class="text-muted mb-0" aria-labelledby="bd-theme-text">
						<span class="material-symbols-outlined">palette</span>
						تم&zwnj;های رنگی
					</p>
					<div class="d-flex flex-row justify-content-between mb-4" id="theme-color">
						<button type="button" class="theme-color theme-color-purple active" data-theme-color-value="4" aria-pressed="true"></button>
						<button type="button" class="theme-color theme-color-blue" data-theme-color-value="1" aria-pressed="false"></button>
						<button type="button" class="theme-color theme-color-green" data-theme-color-value="2" aria-pressed="false"></button>
						<button type="button" class="theme-color theme-color-orange" data-theme-color-value="3" aria-pressed="false"></button>
						<button type="button" class="theme-color theme-color-red" data-theme-color-value="5" aria-pressed="false"></button>
					</div>
					<div class="btn-group text-center d-flex" id="theme-mode">
						<button type="button" class="btn btn-primary btn-sm active" data-rounded="auto-right-important" data-theme-mode-value="light" aria-pressed="true">روشن</button>
						<button type="button" class="btn btn-primary btn-sm" data-theme-mode-value="auto" aria-pressed="false">خودکار</button>
						<button type="button" class="btn btn-primary btn-sm" data-rounded="auto-left-important" data-theme-mode-value="dark" aria-pressed="false">تیره</button>
					</div>
				</div>
				<button class="theme-button btn btn-shadow" id="theme-button" type="button" aria-expanded="false" aria-label="Color theme (Light purple)">
					<span class="material-symbols-outlined">format_paint</span>
				</button>
			</div>`;
}
var main = document.querySelector("main");
if (navbar) {
	var nav = document.querySelector("nav");
	var navCollapse = nav.querySelector(".navbar-collapse");
	main.classList.remove("m-auto");
	main.classList.add("mx-auto");
	nav.querySelector(".navbar-toggler").addEventListener("click", () => {
		if (navCollapse.classList.contains("show")) {
			nav.querySelector(".navbar-toggler").setAttribute("aria-expanded", "false");
			navCollapse.style.height = `${navCollapse.scrollHeight}px`;
			navCollapse.classList.add("collapsing");
			navCollapse.classList.remove("collapse", "show");
			setTimeout( () => {
				navCollapse.style.height = "";
			}, 1);
			setTimeout( () => {
				navCollapse.classList.add("collapse");
				navCollapse.style.height = "";
			}, 350);
		} else if (!navCollapse.classList.contains("show")) {
			nav.querySelector(".navbar-toggler").setAttribute("aria-expanded", "true");
			navCollapse.classList.add("collapsing");
			navCollapse.classList.remove("collapse");
			navCollapse.style.height = `${navCollapse.scrollHeight}px`;
			setTimeout( () => {
				navCollapse.classList.remove("collapsing");
				navCollapse.classList.add("collapse");
				navCollapse.classList.add("show");
				navCollapse.style.height = "";
			}, 350);
		}
	});
} else {
	root.classList.add("mt-5");
}
var themeColors = document.querySelector(".theme-colors");
var themeButton = document.querySelector(".theme-button");
if (colorThemes) {
	themeButton.addEventListener("click", () => {
		themeColors.classList.toggle("shown");
		themeColors.classList.contains("shown") ? themeButton.setAttribute("aria-expanded", "true") : themeButton.setAttribute("aria-expanded", "false");
	});
	document.querySelectorAll("#theme-color [data-theme-color-value]").forEach( element => {
			element.addEventListener("click", () => {
			localStorage.setItem("theme-color", element.getAttribute("data-theme-color-value"));
  		  setTheme();
		});
	});
	document.querySelectorAll("#theme-mode [data-theme-mode-value]").forEach( element => {
		element.addEventListener("click", () => {
			localStorage.setItem("theme-mode", element.getAttribute("data-theme-mode-value"));
			setTheme();
   	 });
	});
}
function getPreferredThemeMode() {
	var storedThemeMode = localStorage.getItem("theme-mode");
	if (storedThemeMode === "dark" || storedThemeMode === "light") {
		return storedThemeMode;
	} else {
		localStorage.setItem("theme-mode", "auto")
		return "auto";
	}
}
setTheme();
function setTheme() {
	var storedThemeColor = localStorage.getItem("theme-color");
	if (+ storedThemeColor <= 5 && + storedThemeColor > 0) {
		var preferredThemeColor = storedThemeColor;
	} else {
		localStorage.setItem("theme-color", 4);
		var preferredThemeColor = 4;
	}
	var preferredThemeMode = getPreferredThemeMode();
	if (preferredThemeMode === "auto") {
		var themeMode = getAutoThemeMode();
	} else {
		var themeMode = preferredThemeMode;
	}
	var themeNumber = themeMode === "dark" ? preferredThemeColor : + preferredThemeColor + 5 ;
	document.querySelector("#theme-style").setAttribute("href", `${assets}/css/${themeNumber}.a1bd.css`);
	document.querySelectorAll("[data-theme-mode]").forEach(element => {
		element.classList.remove(`${element.getAttribute("data-theme-mode").replaceAll("mode", "dark")}`);
		element.classList.remove(`${element.getAttribute("data-theme-mode").replaceAll("mode", "light")}`);
		element.classList.add(`${element.getAttribute("data-theme-mode").replaceAll("mode", themeMode)}`);
	});
	if (colorThemes) {
		showActiveTheme(preferredThemeColor, preferredThemeMode);
		themeSwitcherLabel(preferredThemeColor, preferredThemeMode);
	}
}
function getAutoThemeMode() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function showActiveTheme(themeColor, themeMode) {
	document.querySelectorAll("#theme-color [data-theme-color-value]").forEach(
		element => {
			element.classList.remove("active");
			element.setAttribute("aria-pressed", "false");
		}
	);
	var themeColorBtn = document.querySelector(`#theme-color [data-theme-color-value="${themeColor}"]`);
	themeColorBtn.classList.add("active");
	themeColorBtn.setAttribute("aria-pressed", "true");
	document.querySelectorAll("#theme-mode [data-theme-mode-value]").forEach(
		element => {
			element.classList.remove("active");
			element.setAttribute("aria-pressed", "false");
		}
	);
	var themeModeBtn = document.querySelector(`#theme-mode [data-theme-mode-value="${themeMode}"]`);
	themeModeBtn.classList.add("active");
	themeModeBtn.setAttribute("aria-pressed", "true");
}
function themeSwitcherLabel(themeColor, themeMode) {
	if (themeMode === "light") {
		var modeName = "Light";
	} else if (themeMode === "dark") {
		var modeName = "Dark";
	} else if (themeMode === "auto") {
		var modeName = "Auto";
	} else {
		setTheme();
	}
	if (themeColor == 1) {
		var colorName = "blue"
	} else if (themeColor == 2) {
		var colorName = "green";
	} else if (themeColor == 3) {
		var colorName = "orange";
	} else if (themeColor == 4) {
		var colorName = "purple";
	} else if (themeColor == 5) {
		var colorName = "red";
	} else {
		setTheme();
	}
	var themeSwitcherLabel = `Toggle theme (${modeName} ${colorName})`;
	themeButton.setAttribute("aria-label", themeSwitcherLabel);
}
window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
	"change", () => {
		if (localStorage.getItem("theme-mode") === "auto") {
			setTheme();
		}
	}
);
if (document.querySelector("#time-date")) {
	timeDate();
}
function timeDate(i = false) {
	var weekday = new Date().toLocaleDateString("fa-IR", {weekday: "long"});
	var day = new Date().toLocaleDateString ("fa-IR", {day: "numeric"});
	var month = new Date().toLocaleDateString("fa-IR", {month: "long"});
	var year = new Date().toLocaleDateString ("fa-IR", {year: "numeric"});
	var hours = new Date().getHours();
	if (hours > 12) {
		var hours = hours - 12;
		var AmOrPm = "بعد از ظهر"; 
	} else if (hours === 0) {
		var hours = hours + 12;
		var AmOrPm = "قبل از ظهر";
	} else if (hours === 12) {
		var AmOrPm = "بعد از ظهر";
	} else {
		var AmOrPm = "قبل از ظهر";
	}
	var hours = PersianNumberToEnglishNumber(hours, true);
	var minutes = PersianNumberToEnglishNumber(addZero(new Date().getMinutes()), true);
	var seconds = PersianNumberToEnglishNumber(addZero(new Date().getSeconds()), true);
	if (i == false) {
		document.getElementById("time-date").innerHTML = `${weekday}، ${day} ${month} ${year} ساعت ${hours}:${minutes}:${seconds} ${AmOrPm}`;
		setTimeout(timeDate, 1000);
	} else if (i == true) {
		return `${weekday}، ${day} ${month} ${year} ساعت ${hours}:${minutes}:${seconds} ${AmOrPm}`;
	}
}
function addZero(i) {
	if (+ i < 10) {
		return `0${i}`;
	} else {
		return i;
	}
}
function PersianNumberToEnglishNumber(i, inserve = false) {
	var i = `${i}`;
	if (inserve === false) {
		var i = i.replaceAll("۱", "1");
		var i = i.replaceAll("۲", "2");
		var i = i.replaceAll("۳", "3");
		var i = i.replaceAll("۴", "4");
		var i = i.replaceAll("۵", "5");
		var i = i.replaceAll("۶", "6");
		var i = i.replaceAll("۷", "7");
		var i = i.replaceAll("۸", "8");
		var i = i.replaceAll("۹", "9");
		var i = i.replaceAll("۰", "0");
		return i;
	} else if (inserve === true) {
		var i = i.replaceAll("1", "۱");
		var i = i.replaceAll("2", "۲");
		var i = i.replaceAll("3", "۳");
		var i = i.replaceAll("4", "۴");
		var i = i.replaceAll("5", "۵");
		var i = i.replaceAll("6", "۶");
		var i = i.replaceAll("7", "۷");
		var i = i.replaceAll("8", "۸");
		var i = i.replaceAll("9", "۹");
		var i = i.replaceAll("0", "۰");
		return i;
	}
}
var backToUp = document.querySelector(".back-to-up-button");
if (backToUp) {
	backToUp.onclick = () => {
		document.documentElement.scrollTop = 0;
	}
}
window.addEventListener(
	"DOMContentLoaded", () => {
		setTimeout(
			() => {
				document.querySelector("div.loading").classList.add("d-none");
				document.querySelector("div#root").classList.remove("d-none");
				document.documentElement.scrollTop = localStorage.getItem("scroll");
			}, 100
		);
	}
);
document.querySelectorAll("[data-toggle-class]").forEach(
	element => {
		element.onclick = () => {
			element.classList.toggle(element.getAttribute("data-toggle-class"));
		}
	}
);
n = 0;
function addNotification(theme, filled, title, message) {
	var filled = filled === true ? " filled" : "";
	n = n + 1;
	id = `ntf${n}`;
	var notificationContainer = document.querySelectorAll(".notification-container").item(0);
	notificationContainer.innerHTML = `
<div class="notification notification-${theme}${filled} notification-enter" onClick="removeNotification('${id}')" id="${id}">
	<div class="notification-message">
		<div class="title">${title}</div>
		<div class="message">${message}</div>
	</div>
</div>
${notificationContainer.innerHTML}`;
	setTimeout( () => {
		document.querySelector(`#${id}`).classList.add("notification-enter-active");
	}, 1);
	notificationTimer(id)
}
function removeNotification(id) {
	var notification = document.querySelector(`#${id}`);
	if (notification) {
		notification.classList.remove("notification-enter-active", "notification-enter");
		notification.classList.add("notification-leave-active");
		setTimeout( () => {
			notification.classList.add("notification-leave");
		}, 1);
		setTimeout( () => {
			notification.remove();
		}, 400);
	}
}
function notificationTimer(id) {
	setTimeout(
		() => {
			removeNotification(id);
		}, 4000
	);
}
function openInNewTab(url) {
	window.open(url);
}
function newElement() {
	document.querySelectorAll("[data-rounded=auto]").forEach (round => {
		round.classList.add(`rounded-${rounded}`);
	});
	document.querySelectorAll("[data-rounded=auto-left]").forEach (round => {
		round.classList.add(`rounded-right-${rounded}`);
	});
	document.querySelectorAll("[data-rounded=auto-right]").forEach (round => {
		round.classList.add(`rounded-right-${rounded}`);
	});
	document.querySelectorAll("[data-rounded=auto-important]").forEach (round => {
		round.style.setProperty("border-radius", `${radius}`, "important");
	});
	document.querySelectorAll("[data-rounded=auto-left-important]").forEach (round => {
		round.style.setProperty("border-top-left-radius", `${radius}`, "important");
		round.style.setProperty("border-bottom-left-radius", `${radius}`, "important");
	});
	document.querySelectorAll("[data-rounded=auto-right-important]").forEach (round => {
		round.style.setProperty("border-top-right-radius", `${radius}`, "important");
		round.style.setProperty("border-bottom-right-radius", `${radius}`, "important");
	});
	document.querySelectorAll("[data-class-toggle-click]").forEach( element => {
		element.addEventListener("click", () => {
			var target = element.getAttribute("data-class-toggle-target");
			var classToggle = element.getAttribute("data-class-toggle-click");
			var type = element.getAttribute("data-class-toggle-type");
			if (type == "checkbox") {
				if (!document.querySelector(`#${element.getAttribute("for")}`).disabled) {
					if (!target) {
						element.classList.toggle(classToggle);
					} else {
						if (target.includes("element")) {
							element.querySelector(target.replace("element", "")).classList.toggle(classToggle);
						} else {
							document.querySelector(target).classList.toggle(classToggle);
						}
					}
					document.querySelector(`#${element.getAttribute("for")}`).checked = false;
				}
			} else {
				if (!target) {
					element.classList.toggle(classToggle);
				} else {
					if (target.includes("element")) {
						element.querySelector(target.replace("element", "")).classList.toggle(classToggle);
					} else {
						document.querySelector(target).classList.toggle(classToggle);
					}
				}
			}
		});
	});
	if (getPreferredThemeMode() === "auto") {
		var themeMode = getAutoThemeMode();
	} else {
		var themeMode = getPreferredThemeMode();
	}
	document.querySelectorAll("[data-theme-mode]").forEach(element => {
		element.classList.remove(`${element.getAttribute("data-theme-mode").replaceAll("mode", "dark")}`);
		element.classList.remove(`${element.getAttribute("data-theme-mode").replaceAll("mode", "light")}`);
		element.classList.add(`${element.getAttribute("data-theme-mode").replaceAll("mode", themeMode)}`);
	});
}
newElement();
function copy(i) {
	
}/*
console.owarn = console.warn;
console.warn = function(message) {
	setTimeout( () => {
		addNotification("warning", true, message, "");
	}, 1);
};
console.debug =  console.warn;
console.oerror = console.error;
console.error = function(message) {
	setTimeout( () => {
		addNotification("error", true, message, "");
	}, 1);
};
console.debug =  console.error;
console.oinfo = console.info;
console.info = function(message) {
	setTimeout( () => {
		addNotification("info", true, message, "");
	}, 1);
};
console.debug =  console.info;
console.olog = console.log;
console.log = function(message) {
	setTimeout( () => {
		addNotification("info", true, message, "");
	}, 1);
};
console.debug =  console.log;*/
document.querySelectorAll(".dropdown").forEach ( dropdown => {
	dropdown.querySelector(".dropdown-toggle").addEventListener("click", () => {
		if (dropdown.querySelector(".dropdown-toggle").classList.contains("show")) {
			dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
			dropdown.querySelector(".dropdown-toggle").classList.remove("show");
			dropdown.querySelector(".dropdown-menu").classList.remove("show");
		} else {
			dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "true");
			dropdown.querySelector(".dropdown-toggle").classList.add("show");
			dropdown.querySelector(".dropdown-menu").classList.add("show");
		}
	});
});
window.onclick = element => {
	if (colorThemes && element.target != document.querySelector("#theme-button") && element.target != document.querySelector("#theme-button span")) {
		themeColors.classList.remove("shown");
		themeButton.setAttribute("aria-expanded", "false");
	}
	document.querySelectorAll(".dropdown").forEach( dropdown => {
		if (element.target != dropdown.querySelector(".dropdown-toggle")) {
			dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
			dropdown.querySelector(".dropdown-toggle").classList.remove("show");
			dropdown.querySelector(".dropdown-menu").classList.remove("show");
		}
	});
	var navCollapse = document.querySelector("nav .navbar-collapse");
	if (navbar && element.target != nav.querySelector(".navbar-toggler") && element.target != nav.querySelector(".navbar-toggler span") && element.target != nav.querySelector(".form-control") && navCollapse.classList.contains("show")) {
		var hide = true;
		var navDropdown = nav.querySelectorAll(".dropdown-toggle");
		for (var i = 0; i < navDropdown.length; i++) {
			if (element.target == navDropdown.item(i)) {
				var hide = false;
			}
		}
		if (hide == true) {
			nav.querySelector(".navbar-toggler").setAttribute("aria-expanded", "false");
			navCollapse.style.height = `${nav.scrollHeight}px`;
			navCollapse.classList.add("collapsing");
			navCollapse.classList.remove("collapse", "show");
			setTimeout( () => {
				navCollapse.style.height = "";
			}, 1);
			setTimeout( () => {
				navCollapse.classList.add("collapse");
				navCollapse.style.height = "";
			}, 350);
		}
	}
}
window.onscroll = () => {
	if (colorThemes && themeColors.classList.contains("shown")) {
		themeColors.classList.remove("shown");
		themeButton.setAttribute("aria-expanded", "false");
	}
	document.querySelectorAll(".dropdown").forEach( dropdown => {
		dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
		dropdown.querySelector(".dropdown-toggle").classList.remove("show");
		dropdown.querySelector(".dropdown-menu").classList.remove("show");
	});
	var navCollapse = document.querySelector("nav .navbar-collapse");
	if (navbar && navCollapse.classList.contains("show")) {
		nav.querySelector(".navbar-toggler").setAttribute("aria-expanded", "false");
		navCollapse.style.height = `${nav.scrollHeight}px`;
		navCollapse.classList.add("collapsing");
		navCollapse.classList.remove("collapse", "show");
		setTimeout( () => {
			navCollapse.style.height = "";
		}, 1);
		setTimeout( () => {
			navCollapse.classList.add("collapse");
			navCollapse.style.height = "";
		}, 350);
	}
	var scrollTop = document.documentElement.scrollTop;
	var scrollHeight = document.documentElement.scrollHeight;
	localStorage.setItem("scroll", scrollTop);
	var scroll = document.querySelector("#scroll");
	if (scroll) {
		scroll.style.width = `${scrollTop / (scrollHeight - document.documentElement.offsetHeight) * 100}%`;
	}
	if (backToUp) {
		if (scrollTop > scrollHeight / 3) {
			backToUp.classList.remove("d-none");
		} else {
			backToUp.classList.add("d-none");
		}
	}
}