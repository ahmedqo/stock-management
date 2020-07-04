let trigger = function () {
	GO("#sideBar").toggle(300);
};
let alertTrigger = function () {
	GO(".alert").parent().slideUp(300);
};
let alertClass = function (Class, Message) {
	GO(".alert").parent().slideDown(300);
	GO(".alert").removeClass("alert-danger");
	GO(".alert").removeClass("alert-success");
	GO(".alert").addClass(Class);
	GO(".alert").find("p").html(Message);
};

window.onresize = function () {
	if (window.innerWidth > 768) {
		GO("#sideBar").show(300);
	} else {
		GO("#sideBar").hide(300);
	}
};
window.onload = function () {
	check();
	let target = window.location.href.split("=")[1];
	if (!target) window.location.href = "home/";
	let page = {
		home: "Accieul",
		user: "Utilisateur",
		brand: "Marque",
		category: "Category",
		supplier: "Fournisseur",
		product: "Produit",
		order: "Commande",
		report: "Rapport",
	};
	let callBack = {
		home: homeDataDisplay,
		user: usersDataDisplay,
		brand: brandsDataDisplay,
		category: categoriesDataDisplay,
		supplier: suppliersDataDisplay,
		product: productsDataDisplay,
		order: ordersDataDisplay,
		report: reportDataDisplay,
	};
	GO("#" + target).addClass("icon-primary");
	showDisplay(target, page[target], callBack[target]);
	document.querySelectorAll(".nav").forEach((l) => {
		if (l.id === target) {
			document.querySelectorAll(".nav").forEach((l) => {
				l.classList.remove("icon-primary");
			});
			l.classList.add("icon-primary");
		}
		l.addEventListener("click", function () {
			document.querySelectorAll(".nav").forEach((l) => {
				l.classList.remove("icon-primary");
			});
			l.classList.add("icon-primary");
		});
	});
	if (window.innerWidth < 768) {
		GO("#sideBar").hide(300);
	}
};

let check = function () {
	GO.ajax({
		url: "libs/user/check.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["message"]["type"] === "Utilisateur") {
				GO("#user").remove();
				GO("#brand").remove();
				GO("#category").remove();
				GO("#supplier").remove();
				GO("#report").remove();
			}
		},
	});
};
let checks = function () {
	GO.ajax({
		url: "libs/user/check.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["message"]["type"] === "Utilisateur") {
				GO("#plus").remove();
				GO("#title").remove();
				GO(".row").remove();
			}
		},
	});
};
let checkss = function () {
	GO.ajax({
		url: "libs/user/check.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["message"]["type"] === "Utilisateur") {
				GO(".row").remove();
			}
		},
	});
};

let dataDisplay = function (target) {
	GO.ajax({
		url: "assets/data.json",
		method: "GET",
		success: function (data) {
			data = JSON.parse(data);
			GO("#data").html(data[target]["displayEntries"]);
		},
	});
};
let dataNew = function (target) {
	GO.ajax({
		url: "assets/data.json",
		method: "GET",
		success: function (data) {
			data = JSON.parse(data);
			GO("#data").html(data[target]["newEntries"]);
		},
	});
};
let dataEdit = function (target) {
	GO.ajax({
		url: "assets/data.json",
		method: "GET",
		success: function (data) {
			data = JSON.parse(data);
			GO("#data").html(data[target]["editEntries"]);
		},
	});
};
let showDisplay = function (target, page, callBack) {
	history.pushState({}, "", `./${target}`);
	document.title = page + " - List | GALININ";
	GO("#data").parent().addClass("position-relative");
	GO("#data").css({ width: "100%" });
	GO("#data").addClass("position-absolute");
	GO("#data").addClass("position-center");
	GO("#data").hide(500);
	setTimeout(() => {
		dataDisplay(target);
		GO("#data").show(500);
		setTimeout(() => {
			GO("#data").parent().removeClass("position-relative");
			GO("#data").css({ width: "" });
			GO("#data").removeClass("position-absolute");
			GO("#data").removeClass("position-center");
		}, 500);
	}, 500);
	if (typeof callBack === "function") callBack();
};
let showNew = function (target, page, callBack) {
	document.title = page + " - Nouveau | GALININ";
	GO("#data").parent().addClass("position-relative");
	GO("#data").css({ width: "100%" });
	GO("#data").addClass("position-absolute");
	GO("#data").addClass("position-center");
	GO("#data").hide(500);
	setTimeout(() => {
		dataNew(target);
		GO("#data").show(500);
		setTimeout(() => {
			GO("#data").parent().removeClass("position-relative");
			GO("#data").css({ width: "" });
			GO("#data").removeClass("position-absolute");
			GO("#data").removeClass("position-center");
		}, 500);
	}, 500);
	if (typeof callBack === "function") callBack();
};
let showEdit = function (target, page, callBack) {
	document.title = page + " - Modifier | GALININ";
	GO("#data").parent().addClass("position-relative");
	GO("#data").css({ width: "100%" });
	GO("#data").addClass("position-absolute");
	GO("#data").addClass("position-center");
	GO("#data").hide(500);
	setTimeout(() => {
		dataEdit(target);
		GO("#data").show(500);
		setTimeout(() => {
			GO("#data").parent().removeClass("position-relative");
			GO("#data").css({ width: "" });
			GO("#data").removeClass("position-absolute");
			GO("#data").removeClass("position-center");
		}, 500);
	}, 500);
	if (typeof callBack === "function") callBack();
};

let userTemplate = function (id, username, type, status) {
	let icon, Class;
	if (parseInt(status)) {
		status = "Active";
		icon = "GO-ban";
		Class = "success";
	} else {
		status = "Inactive";
		icon = "GO-checkbox";
		Class = "danger";
	}
	return `
		<tr>
			<td data-title="Pseudo">${username}</td>
			<td data-title="Type">${type}</td>
			<td data-title="Status">
				<span class="tag tag-${Class}">
					${status}
				</span>
			</td>
			<td data-title="Options">
				<button onclick="showEdit('user','Utilisateur',userDataDisplay(${id}));" class="icon icon-sm icon-bold">
					<i class="GO-edit"></i>
				</button>
				<button data-id="${id}" onclick="userStatus(this)" class="icon icon-sm icon-bold">
					<i class="${icon}"></i>
				</button>
			</td>
		</tr>
	`;
};
let brandTemplate = function (id, label, status) {
	let icon, Class;
	if (parseInt(status)) {
		status = "Active";
		icon = "GO-ban";
		Class = "success";
	} else {
		status = "Inactive";
		icon = "GO-checkbox";
		Class = "danger";
	}
	return `
		<tr>
			<td data-title="Libelle">${label}</td>
			<td data-title="Status">
				<span class="tag tag-${Class}">
					${status}
				</span>
			</td>
			<td data-title="Options">
				<button onclick="showEdit('brand','Marque',brandDataDisplay(${id}));" class="icon icon-sm icon-bold">
					<i class="GO-edit"></i>
				</button>
				<button data-id="${id}" onclick="brandStatus(this)" class="icon icon-sm icon-bold">
					<i class="${icon}"></i>
				</button>
			</td>
		</tr>
	`;
};
let categoryTemplate = function (id, label, status) {
	let icon, Class;
	if (parseInt(status)) {
		status = "Active";
		icon = "GO-ban";
		Class = "success";
	} else {
		status = "Inactive";
		icon = "GO-checkbox";
		Class = "danger";
	}
	return `
		<tr>
			<td data-title="Libelle">${label}</td>
			<td data-title="Status">
				<span class="tag tag-${Class}">
					${status}
				</span>
			</td>
			<td data-title="Options">
				<button onclick="showEdit('category','Categorie',categoryDataDisplay(${id}));" class="icon icon-sm icon-bold">
					<i class="GO-edit"></i>
				</button>
				<button data-id="${id}" onclick="categoryStatus(this)" class="icon icon-sm icon-bold">
					<i class="${icon}"></i>
				</button>
			</td>
		</tr>
	`;
};
let supplierTemplate = function (id, name, contact, address, status) {
	let icon, Class;
	if (parseInt(status)) {
		status = "Active";
		icon = "GO-ban";
		Class = "success";
	} else {
		status = "Inactive";
		icon = "GO-checkbox";
		Class = "danger";
	}
	return `
		<tr>
			<td data-title="Nom">${name}</td>
			<td data-title="Contact">${contact}</td>
			<td data-title="Adresse">${address}</td> 
			<td data-title="Status">
				<span class="tag tag-${Class}">
					${status}
				</span>
			</td>
			<td data-title="Options">
				<button onclick="showEdit('supplier','Fournisseur',supplierDataDisplay(${id}));" class="icon icon-sm icon-bold">
					<i class="GO-edit"></i>
				</button>
				<button data-id="${id}" onclick="supplierStatus(this)" class="icon icon-sm icon-bold">
					<i class="${icon}"></i>
				</button>
			</td>
		</tr>
	`;
};
let productTemplate = function (id, title, cost, profit, stock, sold, status) {
	let icon, Class;
	let price =
		parseFloat(cost) + (parseFloat(cost) * parseFloat(profit)) / 100;
	if (parseInt(status)) {
		status = "Active";
		icon = "GO-ban";
		Class = "success";
	} else {
		status = "Inactive";
		icon = "GO-checkbox";
		Class = "danger";
	}
	return `
		<tr>
			<td data-title="Titre">${title}</td>
			<td data-title="Cout">${cost}&nbsp;MAD</td> 
			<td data-title="Profit">${profit}%</td> 
			<td data-title="Prix">${price}&nbsp;MAD</td> 
			<td data-title="Stock">${stock}</td> 
			<td data-title="Vendu">${sold}</td> 
			<td data-title="Status">
				<span class="tag tag-${Class}">
					${status}
				</span>
			</td>
			<td data-title="Options" class='row'>
				<button onclick="showEdit('product','Produit',productDataDisplay(${id}));" class="icon icon-sm icon-bold">
					<i class="GO-edit"></i>
				</button>
				<button data-id="${id}" onclick="productStatus(this)" class="icon icon-sm icon-bold">
					<i class="${icon}"></i>
				</button>
			</td>
		</tr>
	`;
};
let orderTemplate = function (id, date, name, total, paid, status) {
	let icon, Class;
	if (parseInt(status)) {
		status = "Active";
		icon = "GO-ban";
		Class = "success";
	} else {
		status = "Inactive";
		icon = "GO-checkbox";
		Class = "danger";
	}
	return `
		<tr>
			<td data-title="Date">${date}</td>
			<td data-title="Nom">${name}</td>
			<td data-title="Total">${total}&nbsp;MAD</td> 
			<td data-title="Paye">${paid}&nbsp;MAD</td> 
			<td data-title="Status">
				<span class="tag tag-${Class}">
					${status}
				</span>
			</td>
			<td data-title="Options">
				<button onclick="showEdit('order','Commande',orderDataDisplay(${id}));" class="icon icon-sm icon-bold">
					<i class="GO-edit"></i>
				</button>
				<button onclick="showDisplay('payment','Paiement',paymentsDataDisplay(${id}));" class="icon icon-sm icon-bold">
					<i class="GO-case"></i>
				</button>
				<button onclick="orderPrint(${id})" class="icon icon-sm icon-bold">
					<i class="GO-print"></i>
				</button>
				<button data-id="${id}" onclick="orderStatus(this)" class="icon icon-sm icon-bold">
					<i class="${icon}"></i>
				</button>
			</td>
		</tr>
	`;
};
let itemTemplateNew = function (id, product, quantity, price) {
	return `
		<tr>
			<input type="hidden" name="productsNew[]" value="${id}">
			<input type="hidden" name="quantitiesNew[]" value="${quantity}">
			<input type="hidden" name="pricesNew[]" value="${price}">
			<td data-title="Produit">${product}</td>
			<td data-title="Prix">${price}&nbsp;MAD</td>
			<td data-title="Quantite">${quantity}</td>
			<td data-title="Total">${parseFloat(price) * parseInt(quantity)}&nbsp;MAD</td>
			<td data-title="Options"><span onclick="clearRow(this,'#totalNew')" class="icon icon-rounded icon-danger"><i class="GO-trash"></i></span></td>
		</tr>
	`;
};
let itemTemplateEdit = function (id, product, quantity, price) {
	return `
		<tr>
			<input type="hidden" name="productsEdit[]" value="${id}">
			<input type="hidden" name="quantitiesEdit[]" value="${quantity}">
			<input type="hidden" name="pricesEdit[]" value="${price}">
			<td data-title="Produit">${product}</td>
			<td data-title="Prix">${price}&nbsp;MAD</td>
			<td data-title="Quantite">${quantity}</td>
			<td data-title="Total">${parseFloat(price) * parseInt(quantity)}&nbsp;MAD</td>
			<td data-title="Options"><span onclick="clearRow(this,'#totalEdit')" class="icon icon-rounded icon-danger"><i class="GO-trash"></i></span></td>
		</tr>
	`;
};
let orderPrintTemplate = function (d1, d2, d3, d4, d5, data) {
	return `
		<div class="block justify-content-between align-items-center horizontal-fluid">
			<div class="col-5">
				<h1 class="title-six">GALINI Technologie</h1>
				<h3>46. Avenue Okba, N°2, Agdal, Rabat</h3>
				<h3>contact@galinitech.com</h3>
				<h3>06.08.48.16.44</h3>
			</div>
			<div class="col-2">
				<img src="assets/logo-lg.png" style="display: block; width: 100%;" />
			</div>
		</div>
		<div style="width: 100%; padding: 100px;"></div>
		<div class="title-one txt-center">Facture Commande</div>
		<div class="break-one"></div>
		<div class="block horizontal-fluid">
			<div class="col-12">
				<table class="table has-border horizontal-fluid txt-center">
					<thead>
						<tr>
							<td style="font-weight: bolder;">Date</td>
							<td style="font-weight: bolder;">Nom</td>
							<td style="font-weight: bolder;">Contact</td>
							<td style="font-weight: bolder;">Adresse</td>
							
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>${d1}</td>
							<td>${d2}</td>
							<td>${d3}</td>
							<td>${d4}</td>
						<tr>
					</tbody>
				</table>
			</div>
			<div class="break-six"></div>
			<div class="col-12">
				<table class="table has-border horizontal-fluid txt-center">
					<thead>
						<tr>
							<td style="font-weight: bolder;">Produits</td>
							<td style="font-weight: bolder;">Prix</td>
							<td style="font-weight: bolder;">Quantite</td>
							<td style="font-weight: bolder;">Total</td>
						</tr>
					</thead>
					<tbody>${data}</tbody>
					<tfoot>
						<tr>
							<td colspan="3" style="font-size: 20px;padding: 6px 10px;font-weight: bolder;">Montant Total</td>
							<td style="padding: 4px 10px;font-size: 18px;">${d5}&nbsp;MAD</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	`;
};
let paymentTemplate = function (id, amount, type, status, date) {
	let icon, Class;
	if (parseInt(status)) {
		status = "Active";
		icon = "GO-ban";
		Class = "success";
	} else {
		status = "Inactive";
		icon = "GO-checkbox";
		Class = "danger";
	}
	return `
		<tr>
			<td data-title="Date">${date}</td>
			<td data-title="Montant">${amount}&nbsp;MAD</td>
			<td data-title="Type">${type}</td> 
			<td data-title="Status">
				<span class="tag tag-${Class}">
					${status}
				</span>
			</td>
			<td data-title="Options">
				<button onclick="paymentPrint(${id})" class="icon icon-sm icon-bold">
					<i class="GO-print"></i>
				</button>
				<button data-id="${id}" onclick="paymentStatus(this)" class="icon icon-sm icon-bold">
					<i class="${icon}"></i>
				</button>
			</td>
		</tr>
	`;
};
let paymentPrintTemplate = function (d1, d2, d3, d4, d5, d6, d7, d8) {
	return `
		<div class="block justify-content-between align-items-center horizontal-fluid">
			<div class="col-5">
				<h1 class="title-six">GALINI Technologie</h1>
				<h3>46. Avenue Okba, N°2, Agdal, Rabat</h3>
				<h3>contact@galinitech.com</h3>
				<h3>06.08.48.16.44</h3>
			</div>
			<div class="col-2">
				<img src="assets/logo-lg.png" style="display: block; width: 100%;" />
			</div>
		</div>
		<div style="width: 100%; padding: 100px;"></div>
		<div class="title-one txt-center">Recu Paiement</div>
		<div class="break-one"></div>
		<div class="block horizontal-fluid">
			<div class="col-12">
				<table class="table has-border horizontal-fluid txt-center">
					<thead>
						<tr>
							<td style="font-weight: bolder;width:33.33%">Nom</td>
							<td style="font-weight: bolder;width:33.33%">Contact</td>
							<td style="font-weight: bolder;width:33.33%">Adresse</td>
							
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>${d1}</td>
							<td>${d2}</td>
							<td>${d3}</td>
						<tr>
					</tbody>
				</table>
			</div>
			<div class="break-six"></div>
			<div class="col-12">
				<table class="table has-border horizontal-fluid txt-center">
					<thead>
						<tr>
							<td style="font-weight: bolder;width:33.33%">Montant Total</td>
							<td style="font-weight: bolder;width:33.33%">Montant Paye</td>
							<td style="font-weight: bolder;width:33.33%">Montant Rest</td>
							
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>${d4}&nbsp;MAD</td>
							<td>${d5}&nbsp;MAD</td>
							<td>${parseFloat(d4) - parseFloat(d5)}&nbsp;MAD</td>
						<tr>
					</tbody>
				</table>
			</div>
			<div class="break-six"></div>
			<div class="col-12">
				<table class="table has-border horizontal-fluid txt-center">
					<thead>
						<tr>
							<td style="font-weight: bolder;width:33.33%">Date Paiement</td>
							<td style="font-weight: bolder;width:33.33%">Type Paiement</td>
							<td style="font-weight: bolder;width:33.33%">Montant</td>
							
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>${d6}</td>
							<td>${d7}</td>
							<td>${d8}&nbsp;MAD</td>
						<tr>
					</tbody>
				</table>
			</div>
		</div>
	`;
};
let reportPrintTemplate = function (
	d1,
	d2,
	d3,
	d4,
	d5,
	d6,
	data1,
	data2,
	data3,
	data4,
	data5
) {
	return `
		<div class="block justify-content-between align-items-center horizontal-fluid">
			<div class="col-5">
				<h1 class="title-six">GALINI Technologie</h1>
				<h3>46. Avenue Okba, N°2, Agdal, Rabat</h3>
				<h3>contact@galinitech.com</h3>
				<h3>06.08.48.16.44</h3>
			</div>
			<div class="col-2">
				<img
					src="assets/logo-lg.png"
					style="display: block; width: 100%;"
				/>
			</div>
		</div>
		<div style="width: 100%; padding: 100px;"></div>
		<div class="title-one txt-center">Rapport Generale</div>
		<div class="break-one"></div>
		<div class="block justify-content-center">
			<div class="col-6 sm-12 md-12">
				<p class="title-six margin-bottom-six">Total En Caisse</p>
				<div class="col-12" style="border: 1px solid black;">
					<div
						class="block justify-content-between align-items-center"
					>
						<div class="col-max">
							<i
								class="GO-case txt-bold"
								style="font-size: 3rem;"
							></i>
						</div>
						<div class="col-max">
							<span
								id="paidMoneyReport"
								class="tag tag-lg tag-blank tag-bold"
								>${d1}</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="col-6 sm-12 md-12">
				<p class="title-six margin-bottom-six">Somme Total</p>
				<div class="col-12" style="border: 1px solid black;">
					<div
						class="block justify-content-between align-items-center"
					>
						<div class="col-max">
							<i
								class="GO-wallet txt-bold"
								style="font-size: 3rem;"
							></i>
						</div>
						<div class="col-max">
							<span
								id="sumMoneyReport"
								class="tag tag-lg tag-blank tag-bold"
								>${d2}</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="col-6 sm-12 md-12">
				<p class="title-six margin-bottom-six">
					Commandes En Cours
				</p>
				<div class="col-12" style="border: 1px solid black;">
					<div
						class="block justify-content-between align-items-center"
					>
						<div class="col-max">
							<i
								class="GO-cart txt-bold"
								style="font-size: 3rem;"
							></i>
						</div>
						<div class="col-max">
							<span
								id="currentOrdersReport"
								class="tag tag-lg tag-blank tag-bold"
								>${d3}</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="col-6 sm-12 md-12">
				<p class="title-six margin-bottom-six">Commandes Annuler</p>
				<div class="col-12" style="border: 1px solid black;">
					<div
						class="block justify-content-between align-items-center"
					>
						<div class="col-max">
							<i
								class="GO-help txt-bold"
								style="font-size: 3rem;"
							></i>
						</div>
						<div class="col-max">
							<span
								id="canceledOrdersReport"
								class="tag tag-lg tag-blank tag-bold"
								>${d4}</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="col-6 sm-12 md-12">
				<p class="title-six margin-bottom-six">Total Produits</p>
				<div class="col-12" style="border: 1px solid black;">
					<div
						class="block justify-content-between align-items-center"
					>
						<div class="col-max">
							<i
								class="GO-boxes txt-bold"
								style="font-size: 3rem;"
							></i>
						</div>
						<div class="col-max">
							<span
								id="currentProductsReport"
								class="tag tag-lg tag-blank tag-bold"
								>${d5}</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="col-6 sm-12 md-12">
				<p class="title-six margin-bottom-six">Stock Faible</p>
				<div class="col-12" style="border: 1px solid black;">
					<div
						class="block justify-content-between align-items-center"
					>
						<div class="col-max">
							<i
								class="GO-dolly txt-bold"
								style="font-size: 3rem;"
							></i>
						</div>
						<div class="col-max">
							<span
								id="lowProductsReport"
								class="tag tag-lg tag-blank tag-bold"
								>${d6}</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="break-four"></div>
				<p class="title-four margin-bottom-six">
					Résumé des performances
				</p>
				<table class="table has-border horizontal-fluid txt-center">
					<thead>
						<tr>
							<td>Produits</td>
							<td>Quantite</td>
							<td>Total</td>
						</tr>
					</thead>
					<tbody id="performanceReport">
						${data1}
					</tbody>
				</table>
			</div>
			<div class="col-12">
				<div class="break-four"></div>
				<p class="title-four margin-bottom-six">
					Résumé des ventes
				</p>
				<table class="table has-border horizontal-fluid txt-center">
					<thead>
						<tr>
							<td>Date</td>
							<td>Nom</td>
							<td>Total</td>
							<td>Payer</td>
							<td>Status</td>
						</tr>
					</thead>
					<tbody id="orderReport">
						${data2}
					</tbody>
				</table>
			</div>
			<div class="col-12">
				<div class="break-four"></div>
				<p class="title-four margin-bottom-six">
					Résumé des Prouits
				</p>
				<table class="table has-border horizontal-fluid txt-center">
					<thead>
						<tr>
							<td>Titre</td>
							<td>Marque</td>
							<td>Categorie</td>
							<td>Fournisseur</td>
							<td>Cout</td>
							<td>Profit</td>
							<td>Stock</td>
							<td>Status</td>
						</tr>
					</thead>
					<tbody id="productReport">
						${data3}
					</tbody>
				</table>
			</div>
			<div class="col-12">
				<div class="break-four"></div>
				<p class="title-four margin-bottom-six">
					Résumé des Fournisseur
				</p>
				<table class="table has-border horizontal-fluid txt-center">
					<thead>
						<tr>
							<td>Nom</td>
							<td>Status</td>
						</tr>
					</thead>
					<tbody id="supplierReport">
						${data4}
					</tbody>
				</table>
			</div>
			<div class="col-12">
				<div class="break-four"></div>
				<p class="title-four margin-bottom-six">
					Résumé des stocks faible
				</p>
				<table class="table has-border horizontal-fluid txt-center">
					<thead>
						<tr>
							<td>Titre</td>
							<td>Stock</td>
						</tr>
					</thead>
					<tbody id="stockReport">
						${data5}
					</tbody>
				</table>
			</div>
		</div>
		<script src="scripts/GO.1.0.js"></script>
		<script>
			setTimeout(() => {
				GO(".tag").removeClass("tag-success");
				GO(".tag").removeClass("tag-danger");
				GO(".tag").addClass("tag-blank");
				GO(".tag").addClass("tag-bold");
			},500)
		</script>
	`;
};

let homeDataDisplay = function () {
	sumMoney("#sumMoney");
	paidMoney("#paidMoney");
	currentOrders("#currentOrders");
	canceledOrders("#canceledOrders");
	currentProducts("#currentProducts");
	lowProducts("#lowProducts");
};
let profile = function () {
	GO.ajax({
		url: "libs/user/profile.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				let row = data["message"];
				setTimeout(() => {
					GO("#usernameEdit").val(row[1]);
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let profileEdit = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#usernameEdit").val()) {
		GO("#usernameEdit").css({ "border-color": "" });
	} else {
		GO("#usernameEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/user/profileEdit.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};

let usersDataDisplay = function () {
	GO.ajax({
		url: "libs/user/getAll.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="4" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								userTemplate(
									row[0],
									row[1],
									row[3],
									row[4]
								)
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let userDataDisplay = function (e) {
	GO.ajax({
		url: "libs/user/getter.php",
		method: "POST",
		data: {
			id: e,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				let row = data["message"];
				setTimeout(() => {
					GO("#idEdit").val(row[0]);
					GO("#usernameEdit").val(row[1]);
					Array.from(
						document.getElementById("typeEdit").options
					).forEach((op) => {
						if (op.value === row[3]) {
							op.selected = "selected";
						}
					});
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let userDataNew = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#usernameNew").val()) {
		GO("#usernameNew").css({ "border-color": "" });
	} else {
		GO("#usernameNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#passwordNew").val()) {
		GO("#passwordNew").css({ "border-color": "" });
	} else {
		GO("#passwordNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#typeNew").val() !== "none") {
		GO("#typeNew").css({ "border-color": "" });
	} else {
		GO("#typeNew").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/user/setter.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
				GO("#usernameNew").val("");
				GO("#passwordNew").val("");
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let userDataEdit = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#usernameEdit").val()) {
		GO("#usernameEdit").css({ "border-color": "" });
	} else {
		GO("#usernameEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/user/reset.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let userStatus = function (e) {
	let status = GO(e).parent().prev().text();
	if (status === "Active") {
		status = 0;
	} else {
		status = 1;
	}
	GO.ajax({
		url: "libs/user/status.php",
		method: "POST",
		data: {
			id: GO(e).attr("data-id"),
			status: status,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				usersDataDisplay();
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let userSearch = function (l, s) {
	GO.ajax({
		url: "libs/user/search.php",
		method: "POST",
		data: {
			labelSearch: l,
			statusSearch: s,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="4" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								userTemplate(
									row[0],
									row[1],
									row[3],
									row[4]
								)
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};

let getBrands = function (e, i) {
	GO.ajax({
		url: "libs/brand/getAll.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					if (data["message"] !== true) {
						if (typeof i !== null) {
							Array.from(data["message"]).forEach(
								(row) => {
									if (row[0] === i) {
										GO(e).append(
											`<option value="${row[0]}" selected>${row[1]}</option>`
										);
									} else {
										if (parseInt(row[2])) {
											GO(e).append(
												`<option value="${row[0]}">${row[1]}</option>`
											);
										}
									}
								}
							);
						} else {
							Array.from(data["message"]).forEach(
								(row) => {
									if (parseInt(row[2])) {
										GO(e).append(
											`<option value="${row[0]}">${row[1]}</option>`
										);
									}
								}
							);
						}
					}
				}, 500);
			}
		},
	});
};
let brandsDataDisplay = function () {
	GO.ajax({
		url: "libs/brand/getAll.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="3" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								brandTemplate(row[0], row[1], row[2])
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let brandDataDisplay = function (e) {
	GO.ajax({
		url: "libs/brand/getter.php",
		method: "POST",
		data: {
			id: e,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				let row = data["message"];
				setTimeout(() => {
					GO("#idEdit").val(row[0]);
					GO("#labelEdit").val(row[1]);
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let brandDataNew = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#labelNew").val()) {
		GO("#labelNew").css({ "border-color": "" });
	} else {
		GO("#labelNew").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/brand/setter.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
				GO("#labelNew").val("");
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let brandDataEdit = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#labelEdit").val()) {
		GO("#labelEdit").css({ "border-color": "" });
	} else {
		GO("#labelEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/brand/reset.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let brandStatus = function (e) {
	let status = GO(e).parent().prev().text();
	if (status === "Active") {
		status = 0;
	} else {
		status = 1;
	}
	GO.ajax({
		url: "libs/brand/status.php",
		method: "POST",
		data: {
			id: GO(e).attr("data-id"),
			status: status,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				brandsDataDisplay();
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let brandSearch = function (l, s) {
	GO.ajax({
		url: "libs/brand/search.php",
		method: "POST",
		data: {
			labelSearch: l,
			statusSearch: s,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="3" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								brandTemplate(row[0], row[1], row[2])
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};

let getCategories = function (e, i) {
	GO.ajax({
		url: "libs/category/getAll.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					if (data["message"] !== true) {
						if (typeof i !== null) {
							Array.from(data["message"]).forEach(
								(row) => {
									if (row[0] === i) {
										GO(e).append(
											`<option value="${row[0]}" selected>${row[1]}</option>`
										);
									} else {
										if (parseInt(row[2])) {
											GO(e).append(
												`<option value="${row[0]}">${row[1]}</option>`
											);
										}
									}
								}
							);
						} else {
							Array.from(data["message"]).forEach(
								(row) => {
									if (parseInt(row[2])) {
										GO(e).append(
											`<option value="${row[0]}">${row[1]}</option>`
										);
									}
								}
							);
						}
					}
				}, 500);
			}
		},
	});
};
let categoriesDataDisplay = function () {
	GO.ajax({
		url: "libs/category/getAll.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="3" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								categoryTemplate(row[0], row[1], row[2])
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let categoryDataDisplay = function (e) {
	GO.ajax({
		url: "libs/category/getter.php",
		method: "POST",
		data: {
			id: e,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				let row = data["message"];
				setTimeout(() => {
					GO("#idEdit").val(row[0]);
					GO("#labelEdit").val(row[1]);
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let categoryDataNew = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#labelNew").val()) {
		GO("#labelNew").css({ "border-color": "" });
	} else {
		GO("#labelNew").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/category/setter.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
				GO("#labelNew").val("");
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let categoryDataEdit = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#labelEdit").val()) {
		GO("#labelEdit").css({ "border-color": "" });
	} else {
		GO("#labelEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/category/reset.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let categoryStatus = function (e) {
	let status = GO(e).parent().prev().text();
	if (status === "Active") {
		status = 0;
	} else {
		status = 1;
	}
	GO.ajax({
		url: "libs/category/status.php",
		method: "POST",
		data: {
			id: GO(e).attr("data-id"),
			status: status,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				categoriesDataDisplay();
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let categorySearch = function (l, s) {
	GO.ajax({
		url: "libs/category/search.php",
		method: "POST",
		data: {
			labelSearch: l,
			statusSearch: s,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="3" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								categoryTemplate(row[0], row[1], row[2])
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};

let getSuppliers = function (e, i) {
	GO.ajax({
		url: "libs/supplier/getAll.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					if (data["message"] !== true) {
						if (typeof i !== null) {
							Array.from(data["message"]).forEach(
								(row) => {
									if (row[0] === i) {
										GO(e).append(
											`<option value="${row[0]}" selected>${row[1]}</option>`
										);
									} else {
										if (parseInt(row[4])) {
											GO(e).append(
												`<option value="${row[0]}">${row[1]}</option>`
											);
										}
									}
								}
							);
						} else {
							Array.from(data["message"]).forEach(
								(row) => {
									if (parseInt(row[4])) {
										GO(e).append(
											`<option value="${row[0]}">${row[1]}</option>`
										);
									}
								}
							);
						}
					}
				}, 500);
			}
		},
	});
};
let suppliersDataDisplay = function () {
	GO.ajax({
		url: "libs/supplier/getAll.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="5" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								supplierTemplate(
									row[0],
									row[1],
									row[2],
									row[3],
									row[4]
								)
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let supplierDataDisplay = function (e) {
	GO.ajax({
		url: "libs/supplier/getter.php",
		method: "POST",
		data: {
			id: e,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				let row = data["message"];
				setTimeout(() => {
					GO("#idEdit").val(row[0]);
					GO("#nameEdit").val(row[1]);
					GO("#contactEdit").val(row[2]);
					GO("#addressEdit").val(row[3]);
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let supplierDataNew = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#nameNew").val()) {
		GO("#nameNew").css({ "border-color": "" });
	} else {
		GO("#nameNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#contactNew").val()) {
		GO("#contactNew").css({ "border-color": "" });
	} else {
		GO("#contactNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#contactNew").valid("phone")) {
		GO("#contactNew").css({ "border-color": "" });
	} else {
		GO("#contactNew").css({ "border-color": "red" });
		alertClass("alert-danger", "Contact Must Be A Valid Phone Number");
	}
	if (GO("#addressNew").val()) {
		GO("#addressNew").css({ "border-color": "" });
	} else {
		GO("#addressNew").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/supplier/setter.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
				GO("#nameNew").val("");
				GO("#contactNew").val("");
				GO("#addressNew").val("");
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let supplierDataEdit = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#nameEdit").val()) {
		GO("#nameEdit").css({ "border-color": "" });
	} else {
		GO("#nameEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#contactEdit").val()) {
		GO("#contactEdit").css({ "border-color": "" });
	} else {
		GO("#contactEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#contactEdit").valid("phone")) {
		GO("#contactEdit").css({ "border-color": "" });
	} else {
		GO("#contactEdit").css({ "border-color": "red" });
		alertClass("alert-danger", "Contact Must Be A Valid Phone Number");
	}
	if (GO("#addressEdit").val()) {
		GO("#addressEdit").css({ "border-color": "" });
	} else {
		GO("#addressEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/supplier/reset.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let supplierStatus = function (e) {
	let status = GO(e).parent().prev().text();
	if (status === "Active") {
		status = 0;
	} else {
		status = 1;
	}
	GO.ajax({
		url: "libs/supplier/status.php",
		method: "POST",
		data: {
			id: GO(e).attr("data-id"),
			status: status,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				suppliersDataDisplay();
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let supplierSearch = function (l, s) {
	GO.ajax({
		url: "libs/supplier/search.php",
		method: "POST",
		data: {
			labelSearch: l,
			statusSearch: s,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="5" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								supplierTemplate(
									row[0],
									row[1],
									row[2],
									row[3],
									row[4]
								)
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};

let getproducts = function (e, i) {
	GO.ajax({
		url: "libs/product/getAll.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					if (data["message"] !== true) {
						if (typeof i !== null) {
							Array.from(data["message"]).forEach(
								(row) => {
									if (row[0] === i) {
										GO(e).append(
											`<option value="${row[0]}" selected>${row[4]}</option>`
										);
									} else {
										if (parseInt(row[10])) {
											GO(e).append(
												`<option value="${row[0]}">${row[4]}</option>`
											);
										}
									}
								}
							);
						} else {
							Array.from(data["message"]).forEach(
								(row) => {
									if (parseInt(row[10])) {
										GO(e).append(
											`<option value="${row[0]}">${row[4]}</option>`
										);
									}
								}
							);
						}
					}
				}, 500);
			}
		},
	});
};
let getproduct = function (e, callBack) {
	GO.ajax({
		url: "libs/product/getter.php",
		method: "POST",
		data: {
			id: e,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				callBack(data["message"]);
			}
		},
	});
};
let productsDataDisplay = function () {
	GO.ajax({
		url: "libs/product/getAll.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="8" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								productTemplate(
									row[0],
									row[4],
									row[5],
									row[6],
									row[8],
									row[9],
									row[10]
								)
							);
						});
						checks();
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let productDataDisplay = function (e) {
	GO.ajax({
		url: "libs/product/getter.php",
		method: "POST",
		data: {
			id: e,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				let row = data["message"];
				setTimeout(() => {
					GO("#idEdit").val(row[0]);
					getBrands("#brandEdit", row[1]);
					getCategories("#categoryEdit", row[2]);
					getSuppliers("#supplierEdit", row[3]);
					GO("#titleEdit").val(row[4]);
					GO("#costEdit").val(row[5]);
					GO("#profitEdit").val(row[6]);
					GO("#quantityEdit").val(row[7]);
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let productDataNew = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#titleNew").val()) {
		GO("#titleNew").css({ "border-color": "" });
	} else {
		GO("#titleNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#brandNew").val() !== "none") {
		GO("#brandNew").css({ "border-color": "" });
	} else {
		GO("#brandNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#categoryNew").val() !== "none") {
		GO("#categoryNew").css({ "border-color": "" });
	} else {
		GO("#categoryNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#supplierNew").val() !== "none") {
		GO("#supplierNew").css({ "border-color": "" });
	} else {
		GO("#supplierNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#costNew").val()) {
		GO("#costNew").css({ "border-color": "" });
	} else {
		GO("#costNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#profitNew").val()) {
		GO("#profitNew").css({ "border-color": "" });
	} else {
		GO("#profitNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#quantityNew").val()) {
		GO("#quantityNew").css({ "border-color": "" });
	} else {
		GO("#quantityNew").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/product/setter.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
				GO("#titleNew").val("");
				GO("#costNew").val("");
				GO("#profitNew").val("");
				GO("#quantityNew").val("");
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let productDataEdit = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#titleEdit").val()) {
		GO("#titleEdit").css({ "border-color": "" });
	} else {
		GO("#titleEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#costEdit").val()) {
		GO("#costEdit").css({ "border-color": "" });
	} else {
		GO("#costEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#profitEdit").val()) {
		GO("#profitEdit").css({ "border-color": "" });
	} else {
		GO("#profitEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#quantityEdit").val()) {
		GO("#quantityEdit").css({ "border-color": "" });
	} else {
		GO("#quantityEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/product/reset.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let productStatus = function (e) {
	let status = GO(e).parent().prev().text();
	if (status === "Active") {
		status = 0;
	} else {
		status = 1;
	}
	GO.ajax({
		url: "libs/product/status.php",
		method: "POST",
		data: {
			id: GO(e).attr("data-id"),
			status: status,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				productsDataDisplay();
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let productSearch = function (l, s) {
	GO.ajax({
		url: "libs/product/search.php",
		method: "POST",
		data: {
			labelSearch: l,
			statusSearch: s,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="8" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								productTemplate(
									row[0],
									row[4],
									row[5],
									row[6],
									row[8],
									row[9],
									row[10]
								)
							);
						});
						checkss();
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let productData = function () {
	setTimeout(() => {
		getBrands("#brandNew");
		getCategories("#categoryNew");
		getSuppliers("#supplierNew");
	}, 500);
};

let ordersDataDisplay = function () {
	GO.ajax({
		url: "libs/order/getAll.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="6" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								orderTemplate(
									row[0],
									row[1],
									row[2],
									row[5],
									row[6],
									row[7]
								)
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let orderDataDisplay = function (e) {
	GO.ajax({
		url: "libs/order/getter.php",
		method: "POST",
		data: {
			id: e,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				let row = data["message"];
				setTimeout(() => {
					GO("#idEdit").val(row[0]);
					GO("#nameEdit").val(row[2]);
					GO("#contactEdit").val(row[3]);
					GO("#addressEdit").val(row[4]);
					GO("#totalEdit").val(row[5]);
					itemsDataDisplay(row[0]);
					orderDataE();
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let orderDataNew = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#nameNew").val()) {
		GO("#nameNew").css({ "border-color": "" });
	} else {
		GO("#nameNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#contactNew").val()) {
		GO("#contactNew").css({ "border-color": "" });
	} else {
		GO("#contactNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#addressNew").val()) {
		GO("#addressNew").css({ "border-color": "" });
	} else {
		GO("#addressNew").css({ "border-color": "red" });
		valid = true;
	}
	if (parseFloat(GO("#totalNew").val()) > 0) {
		GO("#totalNew").css({ "border-color": "" });
	} else {
		GO("#totalNew").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/order/setter.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
				GO("#nameNew").val("");
				GO("#contactNew").val("");
				GO("#addressNew").val("");
				GO("#cartNew").html("");
				GO("#totalNew").val("0");
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let orderDataEdit = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#nameEdit").val()) {
		GO("#nameEdit").css({ "border-color": "" });
	} else {
		GO("#nameEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#contactEdit").val()) {
		GO("#contactEdit").css({ "border-color": "" });
	} else {
		GO("#contactEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#addressEdit").val()) {
		GO("#addressEdit").css({ "border-color": "" });
	} else {
		GO("#addressEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (parseFloat(GO("#totalEdit").val()) > 0) {
		GO("#totalEdit").css({ "border-color": "" });
	} else {
		GO("#totalEdit").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/order/reset.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let orderStatus = function (e) {
	let status = GO(e).parent().prev().text();
	if (status === "Active") {
		status = 0;
	} else {
		status = 1;
	}
	GO.ajax({
		url: "libs/order/status.php",
		method: "POST",
		data: {
			id: GO(e).attr("data-id"),
			status: status,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				ordersDataDisplay();
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let orderSearch = function (l, s) {
	GO.ajax({
		url: "libs/order/search.php",
		method: "POST",
		data: {
			labelSearch: l,
			statusSearch: s,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="6" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								orderTemplate(
									row[0],
									row[1],
									row[2],
									row[5],
									row[6],
									row[7]
								)
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let orderDataN = function () {
	setTimeout(() => {
		getproducts("#productNew");
	}, 500);
	setTimeout(() => {
		itemRowN();
	}, 1000);
};
let orderDataE = function () {
	setTimeout(() => {
		getproducts("#productEdit");
	}, 500);
	setTimeout(() => {
		itemRowE();
	}, 1000);
};
let orderPrint = function (e) {
	GO.ajax({
		url: "libs/order/print.php",
		method: "POST",
		data: { id: e },
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				let rows = "";
				Array.from(data["message"]).forEach((row) => {
					rows += `<tr><td>${row[5]}</td><td>${row[6]}&nbsp;MAD</td><td>${row[7]}</td><td>${row[8]}&nbsp;MAD</td></tr>`;
				});
				let body = GO("body").html();
				GO("body").html(
					orderPrintTemplate(
						data["message"][0][0],
						data["message"][0][1],
						data["message"][0][2],
						data["message"][0][3],
						data["message"][0][4],
						rows
					)
				);
				setTimeout(() => {
					window.print();
					GO("body").html(body);
				}, 500);
			}
		},
	});
};

let itemsDataDisplay = function (e) {
	GO.ajax({
		url: "libs/item/getAll.php",
		method: "POST",
		data: {
			id: e,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#cartEdit").html("");
					Array.from(data["message"]).forEach((row) => {
						getproduct(row[2], function (data) {
							GO("#cartEdit").append(
								itemTemplateEdit(
									row[2],
									data[4],
									row[4],
									row[3],
									"#totalEdit"
								)
							);
						});
					});
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let itemRowN = function () {
	GO("#cartbtnNew").click(function (event) {
		event.preventDefault();
		let productId = GO("#productNew").val();
		let quantity = GO("#quantityNew").val();
		if (quantity) {
			GO("#quantityNew").css({ "border-color": "" });
			getproduct(productId, function (row) {
				if (parseInt(quantity) <= parseInt(row[8])) {
					GO("#quantityNew").css({ "border-color": "" });
					let price =
						parseFloat(row[5]) +
						(parseFloat(row[5]) * parseFloat(row[6])) / 100;
					GO("#cartNew").append(
						itemTemplateNew(row[0], row[4], quantity, price)
					);
					GO("#totalNew").val(
						parseFloat(GO("#totalNew").val()) +
							price * parseInt(quantity)
					);
				} else {
					GO("#quantityNew").css({ "border-color": "red" });
					alertClass(
						"alert-danger",
						`Only ${row[8]} ${row[4]} Available Right Now`
					);
				}
			});
		} else {
			GO("#quantityNew").css({ "border-color": "red" });
		}
	});
};
let itemRowE = function () {
	GO("#cartbtnEdit").click(function (event) {
		event.preventDefault();
		let productId = GO("#productEdit").val();
		let quantity = GO("#quantityEdit").val();
		if (quantity) {
			GO("#quantityEdit").css({ "border-color": "" });
			getproduct(productId, function (row) {
				if (parseInt(quantity) <= parseInt(row[8])) {
					GO("#quantityEdit").css({ "border-color": "" });
					let price =
						parseFloat(row[5]) +
						(parseFloat(row[5]) * parseFloat(row[6])) / 100;
					GO("#cartEdit").append(
						itemTemplateEdit(row[0], row[4], quantity, price)
					);
					GO("#totalEdit").val(
						parseFloat(GO("#totalEdit").val()) +
							price * parseInt(quantity)
					);
				} else {
					GO("#quantityEdit").css({ "border-color": "red" });
					alertClass(
						"alert-danger",
						`Only ${row[8]} ${row[4]} Available Right Now`
					);
				}
			});
		} else {
			GO("#quantityEdit").css({ "border-color": "red" });
		}
	});
};
let clearRow = function (e, i) {
	let val =
		parseFloat(GO(i).val()) - parseFloat(GO(e).parent().prev().text());
	GO(i).val(val);
	GO(e).parent().parent().remove();
};

let setOrder = function () {
	let e = GO("#idOrder").val();
	setTimeout(() => {
		GO("#idNew").val(e);
	}, 1000);
};
let paymentsDataDisplay = function (e) {
	GO.ajax({
		url: "libs/payment/getAll.php",
		method: "POST",
		data: {
			id: e,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					setTimeout(() => {
						GO("#idOrder").val(e);
					}, 500);
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="5" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								paymentTemplate(
									row[0],
									row[2],
									row[3],
									row[4],
									row[5]
								)
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let paymentDataNew = function (e, f) {
	e.preventDefault();
	let valid = false;
	if (GO("#amountNew").val()) {
		GO("#amountNew").css({ "border-color": "" });
	} else {
		GO("#amountNew").css({ "border-color": "red" });
		valid = true;
	}
	if (GO("#typeNew").val() !== "none") {
		GO("#typeNew").css({ "border-color": "" });
	} else {
		GO("#typeNew").css({ "border-color": "red" });
		valid = true;
	}
	if (valid) {
		alertClass("alert-danger", "All Fields Are Required");
		return;
	}
	GO.ajax({
		url: "libs/payment/setter.php",
		method: "POST",
		data: new FormData(f),
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				alertClass("alert-success", data["message"]);
				GO("#amountNew").val("");
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let paymentStatus = function (e) {
	let status = GO(e).parent().prev().text();
	if (status === "Active") {
		status = 0;
	} else {
		status = 1;
	}
	GO.ajax({
		url: "libs/payment/status.php",
		method: "POST",
		data: {
			id: GO(e).attr("data-id"),
			order: GO("#idOrder").val(),
			status: status,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				paymentsDataDisplay(GO("#idOrder").val());
				alertClass("alert-success", data["message"]);
			} else {
				alertClass("alert-danger", data["message"]);
			}
		},
	});
};
let paymentSearch = function (l, s) {
	GO.ajax({
		url: "libs/payment/search.php",
		method: "POST",
		data: {
			labelSearch: l,
			statusSearch: s,
		},
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#resultBlock").html("");
					if (data["message"] === true) {
						GO("#resultBlock").append(
							`<tr><td data-title="Results" colspan="5" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#resultBlock").append(
								paymentTemplate(
									row[0],
									row[2],
									row[3],
									row[4],
									row[5]
								)
							);
						});
					}
				}, 500);
			} else {
				alertClass("alert-danger");
				GO(".alert").find("p").html(data["message"]);
			}
		},
	});
};
let paymentPrint = function (e) {
	GO.ajax({
		url: "libs/payment/print.php",
		method: "POST",
		data: { id: e },
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				let body = GO("body").html();
				GO("body").html(
					paymentPrintTemplate(
						data["message"][0],
						data["message"][1],
						data["message"][2],
						data["message"][3],
						data["message"][4],
						data["message"][5],
						data["message"][6],
						data["message"][7]
					)
				);
				setTimeout(() => {
					window.print();
					GO("body").html(body);
				}, 500);
			}
		},
	});
};

let reportDataDisplay = function () {
	sumMoney("#sumMoneyReport");
	paidMoney("#paidMoneyReport");
	currentOrders("#currentOrdersReport");
	canceledOrders("#canceledOrdersReport");
	currentProducts("#currentProductsReport");
	lowProducts("#lowProductsReport");
	performance();
	orders();
	products();
	suppliers();
	lowStocks();
};
let reportPrint = function () {
	let body = GO("body").html();
	let data = reportPrintTemplate(
		GO("#paidMoneyReport").text(),
		GO("#sumMoneyReport").text(),
		GO("#currentOrdersReport").text(),
		GO("#canceledOrdersReport").text(),
		GO("#currentProductsReport").text(),
		GO("#lowProductsReport").text(),
		GO("#performanceReport").html(),
		GO("#orderReport").html(),
		GO("#productReport").html(),
		GO("#supplierReport").html(),
		GO("#stockReport").html()
	);
	GO("body").html(data);
	setTimeout(() => {
		window.print();
		GO("body").html(body);
	}, 500);
};

let performance = function () {
	GO.ajax({
		url: "libs/report/performance.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#performanceReport").html("");
					if (data["message"] === true) {
						GO("#performanceReport").append(
							`<tr><td data-title="Results" colspan="3" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#performanceReport").append(`<tr>
							<td data-title="Produit">${row[0]}</td>
							<td data-title="Produit">${row[1]}</td>
							<td data-title="Produit">${
								parseFloat(row[1]) *
								(parseFloat(row[2]) +
									(parseFloat(row[2]) *
										parseFloat(row[3])) /
										100)
							}&nbsp;MAD</td>
						</tr>`);
						});
					}
				}, 500);
			}
		},
	});
};
let orders = function () {
	GO.ajax({
		url: "libs/report/orders.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#orderReport").html("");
					if (data["message"] === true) {
						GO("#orderReport").append(
							`<tr><td data-title="Results" colspan="5" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							let status;
							if (parseInt(row[4])) {
								status =
									"<span class='tag tag-success'>Active</span>";
							} else {
								status =
									"<span class='tag tag-danger'>Inactive</span>";
							}
							GO("#orderReport").append(`<tr>
							<td data-title="Date">${row[0]}</td>
							<td data-title="Nom">${row[1]}</td>
							<td data-title="Total">${row[2]}&nbsp;MAD</td>
							<td data-title="Payer">${row[3]}&nbsp;MAD</td>
							<td data-title="Status">${status}</td>
						</tr>`);
						});
					}
				}, 500);
			}
		},
	});
};
let products = function () {
	GO.ajax({
		url: "libs/report/products.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#productReport").html("");
					if (data["message"] === true) {
						GO("#productReport").append(
							`<tr><td data-title="Results" colspan="8" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							let status;
							if (parseInt(row[7])) {
								status =
									"<span class='tag tag-success'>Active</span>";
							} else {
								status =
									"<span class='tag tag-danger'>Inactive</span>";
							}
							GO("#productReport").append(`<tr>
							<td data-title="Title">${row[0]}</td>
							<td data-title="Marque">${row[1]}</td>
							<td data-title="Categorie">${row[2]}</td>
							<td data-title="Fournisseur">${row[3]}</td>
							<td data-title="Cout">${row[4]}&nbsp;MAD</td>
							<td data-title="Profit">${row[5]}%</td>
							<td data-title="Stock">${row[6]}</td>
							<td data-title="Status">${status}</td>
						</tr>`);
						});
					}
				}, 500);
			}
		},
	});
};
let suppliers = function () {
	GO.ajax({
		url: "libs/report/suppliers.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#supplierReport").html("");
					if (data["message"] === true) {
						GO("#supplierReport").append(
							`<tr><td data-title="Results" colspan="2" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							let status;
							if (parseInt(row[1])) {
								status =
									"<span class='tag tag-success'>Active</span>";
							} else {
								status =
									"<span class='tag tag-danger'>Inactive</span>";
							}
							GO("#supplierReport").append(`<tr>
							<td data-title="Nom">${row[0]}</td>
							<td data-title="Status">${status}</td>
						</tr>`);
						});
					}
				}, 500);
			}
		},
	});
};
let lowStocks = function () {
	GO.ajax({
		url: "libs/report/lowStocks.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO("#stockReport").html("");
					if (data["message"] === true) {
						GO("#stockReport").append(
							`<tr><td data-title="Results" colspan="2" style="font-size:20px">No Data Found</td></tr>`
						);
					} else {
						Array.from(data["message"]).forEach((row) => {
							GO("#stockReport").append(`<tr>
							<td data-title="Nom">${row[0]}</td>
							<td data-title="Status">${row[1]}</td>
						</tr>`);
						});
					}
				}, 500);
			}
		},
	});
};
let sumMoney = function (e) {
	GO.ajax({
		url: "libs/report/sumMoney.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO(e).html(data["message"][0] + " MAD");
				}, 500);
			}
		},
	});
};
let paidMoney = function (e) {
	GO.ajax({
		url: "libs/report/paidMoney.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO(e).html(data["message"][0] + " MAD");
				}, 500);
			}
		},
	});
};
let currentOrders = function (e) {
	GO.ajax({
		url: "libs/report/currentOrders.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO(e).html(data["message"][0]);
				}, 500);
			}
		},
	});
};
let canceledOrders = function (e) {
	GO.ajax({
		url: "libs/report/canceledOrders.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO(e).html(data["message"][0]);
				}, 500);
			}
		},
	});
};
let currentProducts = function (e) {
	GO.ajax({
		url: "libs/report/currentProducts.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO(e).html(data["message"][0]);
				}, 500);
			}
		},
	});
};
let lowProducts = function (e) {
	GO.ajax({
		url: "libs/report/lowProducts.php",
		method: "POST",
		success: function (data) {
			data = JSON.parse(data);
			if (data["type"] === "Success") {
				setTimeout(() => {
					GO(e).html(data["message"][0]);
				}, 500);
			}
		},
	});
};
