function GO(selector) {
	"use strict";
	self = {};
	function Selector() {
		let type, el;
		let list = [];
		if (typeof selector !== "string") {
			type = "o";
			el = selector;
		} else {
			type = selector.split("")[0];
			el = selector.substring(1);
		}
		if (type === "#") {
			list.push(document.getElementById(el));
		} else if (type === ".") {
			list = document.getElementsByClassName(el);
		} else if (type === ":") {
			list = document.getElementsByName(el);
		} else if (type === "o") {
			if (selector.length) {
				list = selector;
			} else {
				list.push(selector);
			}
		} else {
			list = document.getElementsByTagName(selector);
		}
		if (list.length === 0) {
			throw new Error(`GO("${selector}") Not Found In The DOM`);
		}
		list = Array.from(list);
		return list;
	}
	self.selector = new Selector();
	self.val = function (value) {
		if (typeof value === "undefined") {
			if (self.selector[0].tagName === "SELECT") {
				return self.selector[0].options[
					self.selector[0].selectedIndex
				].value;
			} else {
				return self.selector[0].value;
			}
		} else if (typeof value === "string" || typeof value === "number") {
			self.selector.forEach((sel) => {
				sel.value = value;
			});
		} else {
			throw new Error(
				`GO("${selector}").val(...) accept String or Null as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.text = function (value) {
		if (typeof value === "undefined") {
			if (self.selector[0].tagName === "SELECT") {
				return self.selector[0].options[
					self.selector[0].selectedIndex
				].text;
			} else {
				return self.selector[0].innerText;
			}
		} else if (typeof value === "string") {
			self.selector.forEach((sel) => {
				sel.innerText = value;
			});
		} else {
			throw new Error(
				`GO("${selector}").text(...) accept String or Null as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.attr = function (name, value) {
		if (typeof name === "string") {
			if (typeof value === "undefined") {
				if (self.selector[0].getAttribute(name)) {
					return self.selector[0].getAttribute(name);
				} else {
					return false;
				}
			} else {
				self.selector.forEach((sel) => {
					sel.setAttribute(name, value);
				});
			}
		} else {
			throw new Error(
				`GO("${selector}").attr(...) accept String as first argument not ${typeof name}`
			);
		}
		return self;
	};
	self.removeAttr = function (value) {
		if (typeof value === "string") {
			self.selector.forEach((sel) => {
				sel.removeAttribute(value);
			});
		} else {
			throw new Error(
				`GO("${selector}").removeAttr(...) accept String as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.hasAttr = function (value) {
		if (typeof value === "string") {
			if (self.selector[0].getAttribute(value)) {
				return true;
			} else {
				return false;
			}
		} else {
			throw new Error(
				`GO("${selector}").hasAttr(...) accept String as argument not ${typeof value}`
			);
		}
	};
	self.html = function (value) {
		if (typeof value === "undefined") {
			return self.selector[0].innerHTML;
		} else if (typeof value === "string") {
			self.selector.forEach((sel) => {
				sel.innerHTML = value;
			});
		} else {
			throw new Error(
				`GO("${selector}").html(...) accept String or Null as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.find = function (value) {
		let type = value.split("")[0];
		let ele = value.substring(1);
		let childs = [];
		for (let i = 0; i < self.selector.length; i++) {
			for (let j = 0; j < self.selector[i].children.length; j++) {
				if (type === "#") {
					if (self.selector[i].children[j].id === ele) {
						childs.push(self.selector[i].children[j]);
					}
				} else if (type === ".") {
					if (
						self.selector[i].children[j].classList.contains(
							ele
						)
					) {
						childs.push(self.selector[i].children[j]);
					}
				} else if (type === ":") {
					if (self.selector[i].children[j].name === ele) {
						childs.push(self.selector[i].children[j]);
					}
				} else {
					if (
						self.selector[i].children[j].tagName ===
						value.toUpperCase()
					) {
						childs.push(self.selector[i].children[j]);
					}
				}
			}
		}
		if (childs.length === 0) {
			throw new Error(
				`GO("${selector}").find("${value}") Not Found In The DOM`
			);
		}
		return new GO(childs);
	};
	self.append = function (value) {
		if (typeof value === "string") {
			self.selector.forEach((sel) => {
				sel.insertAdjacentHTML("beforeend", value);
			});
		} else {
			throw new Error(
				`GO("${selector}").append(...) accept String as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.appendChild = function (value) {
		if (typeof value === "object") {
			self.selector.forEach((sel) => {
				sel.append(value);
			});
		} else {
			throw new Error(
				`GO("${selector}").appendChild(...) accept Object as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.prepend = function (value) {
		if (typeof value === "string") {
			self.selector.forEach((sel) => {
				sel.insertAdjacentHTML("afterbegin", value);
			});
		} else {
			throw new Error(
				`GO("${selector}").prepend(...) accept String as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.prependChild = function (value) {
		if (typeof value === "object") {
			self.selector.forEach((sel) => {
				sel.prepend(value);
			});
		} else {
			throw new Error(
				`GO("${selector}").prependChild(...) accept Object as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.replace = function (value) {
		if (typeof value === "string") {
			self.selector.forEach((sel) => {
				sel.replaceWith(value);
			});
		} else {
			throw new Error(
				`GO("${selector}").replace(...) accept String as argument not ${typeof value}`
			);
		}
		return;
	};
	self.replaceChild = function (value) {
		if (typeof value === "object") {
			self.selector.forEach((sel) => {
				sel.replaceWith(value);
			});
		} else {
			throw new Error(
				`GO("${selector}").replaceChild(...) accept Object as argument not ${typeof value}`
			);
		}
		return;
	};
	self.remove = function (value) {
		self.selector.forEach((sel) => {
			if (value) {
				sel.parentNode.removeChild(value);
			} else {
				sel.parentNode.removeChild(sel);
			}
		});
		return;
	};
	self.removeChild = function (value) {
		if (typeof value === "object") {
			self.selector.forEach((sel) => {
				sel.parentNode.removeChild(value);
			});
		} else {
			throw new Error(
				`GO("${selector}").removeChild(...) accept Object as argument not ${typeof value}`
			);
		}
		return;
	};
	self.addClass = function (value) {
		if (typeof value === "string") {
			self.selector.forEach((sel) => {
				sel.classList.add(value);
			});
		} else {
			throw new Error(
				`GO("${selector}").addClass(...) accept String as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.removeClass = function (value) {
		if (typeof value === "string") {
			self.selector.forEach((sel) => {
				sel.classList.remove(value);
			});
		} else {
			throw new Error(
				`GO("${selector}").removeClass(...) accept String as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.hasClass = function (value) {
		if (typeof value === "string") {
			return self.selector[0].classList.contains(value);
		} else {
			throw new Error(
				`GO("${selector}").removeClass(...) accept String as argument not ${typeof value}`
			);
		}
	};
	self.css = function (value) {
		if (typeof value === "object") {
			self.selector.forEach((sel) => {
				for (let j in value) {
					sel.style[j] = value[j];
				}
			});
		} else if (typeof value === "string") {
			let style = getComputedStyle(self.selector[0]);
			return style[value];
		} else if (typeof value === "undefined") {
			return self.selector[0].getAttribute("style");
		} else {
			throw new Error(
				`GO("${selector}").css(...) accept String, Object or Null as argument not ${typeof value}`
			);
		}
		return self;
	};
	self.valid = function (value) {
		let valid = {
			email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
			zipcode: /^[0-9]{5}$/,
		};
		if (typeof value === "string") {
			let exists = false;
			for (let i in valid) {
				if (i === value) {
					exists = true;
				}
			}
			if (exists) {
				return RegExp(valid[value]).test(self.val());
			} else {
				throw new Error(
					`GO("${selector}").valid(...) Type Of Validation "${value}" Not Found`
				);
			}
		} else {
			throw new Error(
				`GO("${selector}").valid(...) accept String as argument not ${typeof value}`
			);
		}
	};
	self.next = function () {
		return GO(self.selector[0].nextElementSibling);
	};
	self.prev = function () {
		return GO(self.selector[0].previousElementSibling);
	};
	self.parent = function () {
		return GO(self.selector[0].parentElement);
	};
	self.fadeIn = function (t) {
		if (typeof t === "number" || typeof t === "undefined") {
			self.selector.forEach((sel) => {
				GO(sel).css({
					display: GO(sel).attr("data-display"),
					transition: `opacity ${t}ms ease`,
					opacity: "0",
				});
				setTimeout(() => {
					GO(sel).css({
						opacity: GO(sel).attr("data-opacity"),
					});
				}, 1);
				setTimeout(() => {
					GO(sel).css({
						display: "",
						transition: "",
						opacity: "",
					});
					GO(sel).removeAttr("data-height");
					GO(sel).removeAttr("data-width");
					GO(sel).removeAttr("data-display");
					GO(sel).removeAttr("data-opacity");
					GO(sel).removeAttr("data-padding-top");
					GO(sel).removeAttr("data-padding-right");
					GO(sel).removeAttr("data-padding-bottom");
					GO(sel).removeAttr("data-padding-left");
				}, t);
			});
		} else {
			throw new Error(
				`GO("${selector}").fadeIn(...) accept Int as argument not ${typeof t}`
			);
		}
		return self;
	};
	self.fadeOut = function (t) {
		if (typeof t === "number" || typeof t === "undefined") {
			self.selector.forEach((sel) => {
				GO(sel).attr("data-height", GO(sel).css("height"));
				GO(sel).attr("data-width", GO(sel).css("width"));
				GO(sel).attr("data-display", GO(sel).css("display"));
				GO(sel).attr("data-opacity", GO(sel).css("opacity"));
				GO(sel).attr(
					"data-padding-top",
					GO(sel).css("padding-top")
				);
				GO(sel).attr(
					"data-padding-right",
					GO(sel).css("padding-right")
				);
				GO(sel).attr(
					"data-padding-bottom",
					GO(sel).css("padding-bottom")
				);
				GO(sel).attr(
					"data-padding-left",
					GO(sel).css("padding-left")
				);
				GO(sel).css({
					transition: `opacity ${t}ms ease`,
				});
				setTimeout(() => {
					GO(sel).css({
						opacity: "0",
					});
				}, 1);
				setTimeout(() => {
					GO(sel).css({
						display: "none",
						opacity: "",
					});
				}, t);
			});
		} else {
			throw new Error(
				`GO("${selector}").fadeOut(...) accept Int as argument not ${typeof t}`
			);
		}
		return self;
	};
	self.fadeToggle = function (t) {
		if (self.css("display") === "none") {
			self.fadeIn(t);
		} else {
			self.fadeOut(t);
		}
		return self;
	};
	self.slideDown = function (t) {
		if (typeof t === "number" || typeof t === "undefined") {
			self.selector.forEach((sel) => {
				GO(sel).css({
					display: GO(sel).attr("data-display"),
					transition: `height ${t}ms ease,padding ${t}ms ease`,
					overflow: "hidden",
					height: 0,
					"padding-top": 0,
					"padding-bottom": 0,
				});
				setTimeout(() => {
					GO(sel).css({
						height: GO(sel).attr("data-height"),
						"padding-top": GO(sel).attr("data-padding-top"),
						"padding-bottom": GO(sel).attr(
							"data-padding-bottom"
						),
						"padding-left": GO(sel).attr("data-padding-left"),
						"padding-right": GO(sel).attr(
							"data-padding-right"
						),
					});
				}, 1);
				setTimeout(() => {
					GO(sel).css({
						display: "",
						transition: "",
						overflow: "",
						height: "",
						"padding-top": "",
						"padding-bottom": "",
						"padding-left": "",
						"padding-right": "",
					});
					GO(sel).removeAttr("data-height");
					GO(sel).removeAttr("data-width");
					GO(sel).removeAttr("data-display");
					GO(sel).removeAttr("data-opacity");
					GO(sel).removeAttr("data-padding-top");
					GO(sel).removeAttr("data-padding-right");
					GO(sel).removeAttr("data-padding-bottom");
					GO(sel).removeAttr("data-padding-left");
				}, t);
			});
		} else {
			throw new Error(
				`GO("${selector}").slideDown(...) accept Int as argument not ${typeof t}`
			);
		}
		return self;
	};
	self.slideUp = function (t) {
		if (typeof t === "number" || typeof t === "undefined") {
			self.selector.forEach((sel) => {
				GO(sel).attr("data-height", GO(sel).css("height"));
				GO(sel).attr("data-width", GO(sel).css("width"));
				GO(sel).attr("data-display", GO(sel).css("display"));
				GO(sel).attr("data-opacity", GO(sel).css("opacity"));
				GO(sel).attr(
					"data-padding-top",
					GO(sel).css("padding-top")
				);
				GO(sel).attr(
					"data-padding-right",
					GO(sel).css("padding-right")
				);
				GO(sel).attr(
					"data-padding-bottom",
					GO(sel).css("padding-bottom")
				);
				GO(sel).attr(
					"data-padding-left",
					GO(sel).css("padding-left")
				);
				GO(sel).css({
					transition: `height ${t}ms ease,padding ${t}ms ease`,
					overflow: "hidden",
					height: GO(sel).css("height"),
				});
				setTimeout(() => {
					GO(sel).css({
						height: "0",
						"padding-top": "0",
						"padding-bottom": "0",
						"padding-left": "0",
						"padding-right": "0",
					});
				}, 1);
				setTimeout(() => {
					GO(sel).css({
						display: "none",
						transition: "",
						overflow: "",
						height: "",
						"padding-top": "",
						"padding-bottom": "",
						"padding-left": "",
						"padding-right": "",
					});
				}, t);
			});
		} else {
			throw new Error(
				`GO("${selector}").slideUp(...) accept Int as argument not ${typeof t}`
			);
		}
		return self;
	};
	self.slideToggle = function (t) {
		if (self.css("display") === "none") {
			self.slideDown(t);
		} else {
			self.slideUp(t);
		}
		return self;
	};
	self.show = function (t) {
		if (typeof t === "number" || typeof t === "undefined") {
			self.selector.forEach((sel) => {
				GO(sel).css({
					display: GO(sel).attr("data-display"),
					transition: `opacity ${t}ms ease,width ${t}ms ease,height ${t}ms ease,padding ${t}ms ease`,
					overflow: "hidden",
					opacity: "0",
					width: "0",
					height: "0",
					"padding-top": "0",
					"padding-right": "0",
					"padding-bottom": "0",
					"padding-left": "0",
				});
				setTimeout(() => {
					GO(sel).css({
						opacity: GO(sel).attr("data-opacity"),
						height: GO(sel).attr("data-height"),
						width: GO(sel).attr("data-width"),
						"padding-top": GO(sel).attr("data-padding-top"),
						"padding-right": GO(sel).attr(
							"data-padding-right"
						),
						"padding-bottom": GO(sel).attr(
							"data-padding-bottom"
						),
						"padding-left": GO(sel).attr("data-padding-left"),
					});
				}, 1);
				setTimeout(() => {
					GO(sel).css({
						display: "",
						transition: "",
						overflow: "",
						opacity: "",
						width: "",
						height: "",
						"padding-top": "",
						"padding-right": "",
						"padding-bottom": "",
						"padding-left": "",
					});
					GO(sel).removeAttr("data-height");
					GO(sel).removeAttr("data-width");
					GO(sel).removeAttr("data-display");
					GO(sel).removeAttr("data-opacity");
					GO(sel).removeAttr("data-padding-top");
					GO(sel).removeAttr("data-padding-right");
					GO(sel).removeAttr("data-padding-bottom");
					GO(sel).removeAttr("data-padding-left");
				}, t);
			});
		} else {
			throw new Error(
				`GO("${selector}").show(...) accept Int as argument not ${typeof t}`
			);
		}
		return self;
	};
	self.hide = function (t) {
		if (typeof t === "number" || typeof t === "undefined") {
			self.selector.forEach((sel) => {
				GO(sel).attr("data-height", GO(sel).css("height"));
				GO(sel).attr("data-width", GO(sel).css("width"));
				GO(sel).attr("data-display", GO(sel).css("display"));
				GO(sel).attr("data-opacity", GO(sel).css("opacity"));
				GO(sel).attr(
					"data-padding-top",
					GO(sel).css("padding-top")
				);
				GO(sel).attr(
					"data-padding-right",
					GO(sel).css("padding-right")
				);
				GO(sel).attr(
					"data-padding-bottom",
					GO(sel).css("padding-bottom")
				);
				GO(sel).attr(
					"data-padding-left",
					GO(sel).css("padding-left")
				);
				GO(sel).css({
					transition: `opacity ${t}ms ease,width ${t}ms ease,height ${t}ms ease,padding ${t}ms ease`,
					height: GO(sel).css("height"),
					width: GO(sel).css("width"),
					"padding-top": GO(sel).css("padding-top"),
					"padding-right": GO(sel).css("padding-right"),
					"padding-bottom": GO(sel).css("padding-bottom"),
					"padding-left": GO(sel).css("padding-left"),
					overflow: "hidden",
				});
				setTimeout(() => {
					GO(sel).css({
						opacity: "0",
						padding: "0",
						height: "0",
						width: "0",
					});
				}, 1);
				setTimeout(() => {
					GO(sel).css({
						display: "none",
						opacity: "",
						height: "",
						width: "",
						padding: "",
					});
				}, t);
			});
		} else {
			throw new Error(
				`GO("${selector}").hide(...) accept Int as argument not ${typeof t}`
			);
		}
		return self;
	};
	self.toggle = function (t) {
		if (self.css("display") === "none") {
			self.show(t);
		} else {
			self.hide(t);
		}
		return self;
	};
	self.on = function (event, callback) {
		if (typeof event === "string") {
			if (typeof callback === "function") {
				self.selector.forEach((sel) => {
					sel.addEventListener(event, callback);
				});
			} else {
				throw new Error(
					`GO("${selector}").on(...) accept Function as second argument not ${typeof callback}`
				);
			}
		} else {
			throw new Error(
				`GO("${selector}").on(...) accept String as first argument not ${typeof event}`
			);
		}
		return self;
	};
	self.hover = function (callback_in, callback_out) {
		if (typeof callback_in === "function") {
			if (typeof callback_out === "function") {
				self.selector.forEach((sel) => {
					sel.addEventListener("mouseover", callback_in);
					sel.addEventListener("mouseout", callback_out);
				});
			} else {
				throw new Error(
					`GO("${selector}").hover(...) accept Function as second argument not ${typeof callback_out}`
				);
			}
		} else {
			throw new Error(
				`GO("${selector}").hover(...) accept Function as first argument not ${typeof callback_in}`
			);
		}
		return self;
	};
	self.load = function (callback) {
		if (typeof callback === "function") {
			self.selector.forEach((sel) => {
				sel.onreadystatechange = callback;
			});
		} else {
			throw new Error(
				`GO("${selector}").load(...) accept Function as argument not ${typeof callback}`
			);
		}
		return self;
	};
	self.ready = function (callback) {
		let readyEventHandlersInstalled = false;
		if (typeof callback === "function") {
			self.selector.forEach((sel) => {
				if (sel.readyState === "complete") {
					setTimeout(callback, 1);
				} else if (!readyEventHandlersInstalled) {
					if (sel.addEventListener) {
						sel.addEventListener(
							"DOMContentLoaded",
							callback,
							false
						);
						window.addEventListener("load", callback, false);
					} else {
						sel.attachEvent(
							"onreadystatechange",
							readyStateChange
						);
						window.attachEvent("onload", callback);
					}
					readyEventHandlersInstalled = true;
				}
			});
		} else {
			throw new Error(
				`GO("${selector}").ready(...) accept Function as argument not ${typeof callback}`
			);
		}
		return self;
	};
	self.click = function (callback) {
		if (typeof callback === "function") {
			self.selector.forEach((sel) => {
				sel.addEventListener("click", callback);
			});
		} else {
			throw new Error(
				`GO("${selector}").click(...) accept Function as argument not ${typeof callback}`
			);
		}
		return self;
	};
	self.change = function (callback) {
		if (typeof callback === "function") {
			self.selector.forEach((sel) => {
				sel.onchange = callback;
			});
		} else {
			throw new Error(
				`GO("${selector}").change(...) accept Function as argument not ${typeof callback}`
			);
		}
		return self;
	};
	self.submit = function (callback) {
		if (typeof callback === "function") {
			self.selector.forEach((sel) => {
				sel.onsubmit = callback;
			});
		} else {
			throw new Error(
				`GO("${selector}").submit(...) accept Function as argument not ${typeof callback}`
			);
		}
		return self;
	};
	self.each = function (callback) {
		if (typeof callback === "function") {
			self.selector.forEach((sel) => {
				callback(sel);
			});
		} else {
			throw new Error(
				`GO("${selector}").each(...) accept Function as argument not ${typeof callback}`
			);
		}
		return self;
	};
	self.include = function (target) {
		if (typeof target === "string") {
			self.selector.forEach((sel) => {
				GO.ajax({
					url: target,
					method: "GET",
					success: function (data) {
						GO(sel).html(data);
					},
				});
			});
		} else {
			throw new Error(
				`GO("${selector}").include(...) accept String as argument not ${typeof target}`
			);
		}
		return self;
	};
	return self;
}
GO.ajax = function ({ url, method, data, progress, success, xhr }) {
	let XHR = new XMLHttpRequest();
	if (typeof xhr === "function") {
		xhr(XHR);
	}
	XHR.upload.onprogress = function (e) {
		if (typeof progress === "function") {
			progress(e);
		}
	};
	XHR.onload = function () {
		if (this.status === 200) {
			if (typeof success === "function") {
				success(this.responseText);
			}
		}
	};
	if (
		typeof method === "undefined" ||
		method.localeCompare("get", undefined, { sensitivity: "accent" }) ===
			0
	) {
		method = "GET";
	} else if (
		method.localeCompare("post", undefined, { sensitivity: "accent" }) ===
		0
	) {
		method = "POST";
	}
	let form;
	if (method === "POST") {
		if (data instanceof FormData) {
			form = data;
		} else if (data instanceof Object) {
			form = new FormData();
			for (d in data) {
				form.append(d, data[d]);
			}
		}
	} else if (method === "GET") {
		form = "";
		for (d in data) {
			form += `&${d}=${data[d]}`;
		}
		form = form.substring(1);
		url = url + "?" + form;
		form = "";
	}
	XHR.open(method, url, true);
	XHR.send(form);
};
GO.uploadBox = function ({ selector, type, image }) {
	const el = document.querySelector(selector);
	const name = GO(selector).attr("name");
	const cls = selector.substring(1);
	const id = GO(selector).attr("id");
	let Display = "";
	if (typeof image === "string") {
		Display = '<img src="' + image + '">';
	}
	let container = document.createElement("div");
	let content = `
			<input type="file" name="${name}" id="${id}" />
			<span class="uploadbox-trigger"></span>
			<span class="uploadbox-display">${Display}</span>
		`;
	container.setAttribute("class", cls + " uploadbox " + type);
	container.innerHTML = content;
	el.replaceWith(container);
	document.querySelector(`.${cls} span.uploadbox-trigger`).style.display =
		"none";
	let input = document.querySelector(`#${id}`);
	let display = document.querySelector(`.${cls} .uploadbox-display`);
	let cancel = document.querySelector(`.${cls} span.uploadbox-trigger`);
	input.addEventListener("change", () => {
		let image = `<img src="${URL.createObjectURL(
			event.target.files[0]
		)}">`;
		display.innerHTML = image;
		cancel.style.display = "block";
	});
	cancel.addEventListener("click", function () {
		this.style.display = "none";
		display.innerHTML = Display;
		input.type = "text";
		input.type = "file";
	});
};
GO.accordion = function (target) {
	setTimeout(() => {
		GO(target).find(".accordion-panel").slideUp();
	}, 500);
	GO(target)
		.find(".accordion-button")
		.click(function () {
			this.classList.toggle("active");
			GO(this).next().slideToggle(500);
		});
};
GO.slider = function (target, time, height) {
	let slides = document.querySelectorAll(target + " .slider-slide");
	let dots = document.querySelectorAll(target + " .slider-controll .dot");
	let prev = document.querySelector(target + " .slider-controll .prev");
	let next = document.querySelector(target + " .slider-controll .next");
	let index = 0;
	let ds = [];
	dots[index].classList.add("active");
	slides[index].style["pointer-events"] = "all";
	slides[index].style["opacity"] = "1";
	slides[index].style["position"] = "relative";
	if (dots.length <= 1) {
		document.querySelector(target + " .slider-controll").style.display =
			"none";
	}
	dots.forEach((dot) => {
		ds.push(dot);
	});
	let hideslides = function () {
		slides.forEach((slide) => {
			slide.style["pointer-events"] = "none";
			slide.style["opacity"] = "0";
			slide.style["position"] = "";
		});
	};
	let removedot = function () {
		dots.forEach((dot) => {
			dot.classList.remove("active");
		});
	};
	let Next = function () {
		if (index < slides.length - 1) {
			removedot();
			hideslides();
			dots[index + 1].classList.add("active");
			slides[index + 1].style["pointer-events"] = "all";
			slides[index + 1].style["opacity"] = "1";
			slides[index + 1].style["position"] = "relative";
			index++;
		} else {
			removedot();
			hideslides();
			index = 0;
			dots[index].classList.add("active");
			slides[index].style["pointer-events"] = "all";
			slides[index].style["opacity"] = "1";
			slides[index].style["position"] = "relative";
		}
	};
	let Prev = function () {
		if (index > 0) {
			removedot();
			hideslides();
			dots[index - 1].classList.add("active");
			slides[index - 1].style["pointer-events"] = "all";
			slides[index - 1].style["opacity"] = "1";
			slides[index - 1].style["position"] = "relative";
			index--;
		} else {
			removedot();
			hideslides();
			index = slides.length - 1;
			dots[index].classList.add("active");
			slides[index].style["pointer-events"] = "all";
			slides[index].style["opacity"] = "1";
			slides[index].style["position"] = "relative";
		}
	};
	dots.forEach((dot) => {
		dot.addEventListener("click", function () {
			hideslides();
			removedot();
			dots[ds.indexOf(dot)].classList.add("active");
			slides[ds.indexOf(dot)].style["pointer-events"] = "all";
			slides[ds.indexOf(dot)].style["opacity"] = "1";
			slides[ds.indexOf(dot)].style["position"] = "relative";
			index = ds.indexOf(dot);
		});
	});
	next.addEventListener("click", function () {
		Next();
	});
	prev.addEventListener("click", function () {
		Prev();
	});
	if (typeof time !== "undefined" && typeof time === "number") {
		setInterval(() => {
			Next();
		}, time);
	}
};
GO.timer = function ({ target, Class, hours, minutes, seconds }) {
	let spanh = document.createElement("span");
	let spanm = document.createElement("span");
	let spans = document.createElement("span");
	let spanbreak1 = document.createElement("span");
	let spanbreak2 = document.createElement("span");
	spanh.setAttribute("id", "timer-hours");
	spanm.setAttribute("id", "timer-minutes");
	spans.setAttribute("id", "timer-seconds");
	spanh.setAttribute("class", "icon");
	spanm.setAttribute("class", "icon");
	spans.setAttribute("class", "icon");
	spanbreak1.setAttribute("class", "tag tag-sm tag-blank");
	spanbreak2.setAttribute("class", "tag tag-sm tag-blank");
	if (Class) {
		clh = spanh.getAttribute("class");
		clm = spanm.getAttribute("class");
		cls = spans.getAttribute("class");
		clh = clh + " " + Class;
		clm = clm + " " + Class;
		cls = cls + " " + Class;
		spanh.setAttribute("class", clh);
		spanm.setAttribute("class", clm);
		spans.setAttribute("class", cls);
	}
	document.querySelector(target).appendChild(spanh);
	document.querySelector(target).appendChild(spanbreak1);
	document.querySelector(target).appendChild(spanm);
	document.querySelector(target).appendChild(spanbreak2);
	document.querySelector(target).appendChild(spans);
	setInterval(() => {
		if (seconds < 1) {
			seconds = 60;
			minutes--;
		}
		if (minutes < 1) {
			minutes = 59;
			hours--;
		}
		if (hours < 1) {
			hours = 00;
		}
		seconds--;
		if (hours.toString().length < 2) {
			spanh.innerText = "0" + hours;
		} else {
			spanh.innerText = hours;
		}
		if (minutes.toString().length < 2) {
			spanm.innerText = "0" + minutes;
		} else {
			spanm.innerText = minutes;
		}
		if (seconds.toString().length < 2) {
			spans.innerText = "0" + seconds;
		} else {
			spans.innerText = seconds;
		}
	}, 1000);
};
GO.getNum = function (string) {
	if (typeof string === "string") {
		return string.match(/\d/g).join("");
	} else {
		throw new Error("you must inser a string");
	}
};
GO.var = function (name, value) {
	if (typeof name === "string") {
		if (typeof value === "undefined") {
			if (localStorage.getItem(name)) {
				return localStorage.getItem(name);
			} else {
				return false;
			}
		} else {
			localStorage.setItem(name, value);
			return true;
		}
	} else {
		throw new Error(
			`GO("${selector}").attr(...) accept String as first argument not ${typeof name}`
		);
	}
};
GO.removeVar = function (name) {
	if (typeof name === "string") {
		if (localStorage.removeItem(name)) {
			return true;
		} else {
			return false;
		}
	} else {
		throw new Error(
			`GO("${selector}").attr(...) accept String as first argument not ${typeof name}`
		);
	}
};
GO.hasVar = function (name) {
	if (typeof name === "string") {
		if (localStorage.getItem(name)) {
			return true;
		} else {
			return false;
		}
	} else {
		throw new Error(
			`GO("${selector}").attr(...) accept String as first argument not ${typeof name}`
		);
	}
};
GO.template = function (target, callback) {
	fetch(target)
		.then(function (resp) {
			return resp.json();
		})
		.then(function (data) {
			let main = document.createElement("main");
			main.setAttribute("id", "main");
			GO("body").appendChild(main);
			data.forEach((el) => {
				let element = document.createElement(el.type);
				GO(element).attr("id", el.name);
				if (el.class) {
					let old = "";
					if (GO(element).attr("class")) {
						old = GO(element).attr("class");
					}
					GO(element).addClass(old + el.class);
				}
				if (el.type === "header") {
					GO("body").prependChild(element);
				} else if (el.type === "footer") {
					GO("body").appendChild(element);
				} else {
					GO("main").appendChild(element);
				}
				GO("#" + el.name).include(el.link);
			});
			setTimeout(() => {
				callback();
			}, 100);
		});
};
GO.fetch = function (target, callback) {
	fetch(target)
		.then(function (resp) {
			return resp.json();
		})
		.then(function (data) {
			callback(data);
		});
};
