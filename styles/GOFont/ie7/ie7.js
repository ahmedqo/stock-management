/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'GOFont\'">' + entity + '</span>' + html;
	}
	var icons = {
		'GO-arrow-down': '&#xe900;',
		'GO-arrow-left': '&#xe901;',
		'GO-arrow-right': '&#xe902;',
		'GO-arrow-up': '&#xe903;',
		'GO-badge': '&#xe904;',
		'GO-ban': '&#xe905;',
		'GO-bell': '&#xe906;',
		'GO-box': '&#xe907;',
		'GO-boxes': '&#xe908;',
		'GO-briefcase': '&#xe909;',
		'GO-calendar': '&#xe90a;',
		'GO-cart': '&#xe90b;',
		'GO-case': '&#xe90c;',
		'GO-chain': '&#xe90d;',
		'GO-chart': '&#xe90e;',
		'GO-chart-pie': '&#xe90f;',
		'GO-checkbox': '&#xe910;',
		'GO-cog': '&#xe911;',
		'GO-cube': '&#xe912;',
		'GO-dolly': '&#xe913;',
		'GO-download': '&#xe914;',
		'GO-edit': '&#xe915;',
		'GO-eye': '&#xe916;',
		'GO-facebook': '&#xe917;',
		'GO-facotry': '&#xe918;',
		'GO-file': '&#xe919;',
		'GO-folder': '&#xe91a;',
		'GO-folder-open': '&#xe91b;',
		'GO-fuel': '&#xe91c;',
		'GO-gearbox': '&#xe91d;',
		'GO-glasses': '&#xe91e;',
		'GO-grid': '&#xe91f;',
		'GO-grid-large': '&#xe920;',
		'GO-help': '&#xe921;',
		'GO-home': '&#xe922;',
		'GO-id': '&#xe923;',
		'GO-info': '&#xe924;',
		'GO-instagram': '&#xe925;',
		'GO-lamp': '&#xe926;',
		'GO-list': '&#xe927;',
		'GO-loop': '&#xe928;',
		'GO-map-marker': '&#xe929;',
		'GO-minus': '&#xe92a;',
		'GO-paper-plane': '&#xe92b;',
		'GO-pen': '&#xe92c;',
		'GO-persons': '&#xe92d;',
		'GO-phone': '&#xe92e;',
		'GO-piggy-bank': '&#xe92f;',
		'GO-pin': '&#xe930;',
		'GO-plus': '&#xe931;',
		'GO-print': '&#xe932;',
		'GO-question': '&#xe933;',
		'GO-recharge': '&#xe934;',
		'GO-save': '&#xe935;',
		'GO-share': '&#xe936;',
		'GO-shopping-bag': '&#xe937;',
		'GO-sign-in': '&#xe938;',
		'GO-sign-out': '&#xe939;',
		'GO-snow-flake': '&#xe93a;',
		'GO-tag': '&#xe93b;',
		'GO-th-large': '&#xe93c;',
		'GO-times': '&#xe93d;',
		'GO-trash': '&#xe93e;',
		'GO-upload': '&#xe93f;',
		'GO-wallet': '&#xe940;',
		'GO-wheel': '&#xe941;',
		'GO-arrow-down-circle': '&#xe942;',
		'GO-arrow-left-circle': '&#xe943;',
		'GO-arrow-right-circle': '&#xe944;',
		'GO-arrow-up-circle': '&#xe945;',
		'GO-badge-circle': '&#xe946;',
		'GO-ban-circle': '&#xe947;',
		'GO-bell-circle': '&#xe948;',
		'GO-box-circle': '&#xe949;',
		'GO-boxes-circle': '&#xe94a;',
		'GO-briefcase-circle': '&#xe94b;',
		'GO-calendar-circle': '&#xe94c;',
		'GO-cart-circle': '&#xe94d;',
		'GO-case-circle': '&#xe94e;',
		'GO-chain-circle': '&#xe94f;',
		'GO-chart-circle': '&#xe950;',
		'GO-chart-pie-circle': '&#xe951;',
		'GO-checkbox-circle': '&#xe952;',
		'GO-cog-circle': '&#xe953;',
		'GO-cube-circle': '&#xe954;',
		'GO-dolly-circle': '&#xe955;',
		'GO-download-circle': '&#xe956;',
		'GO-edit-circle': '&#xe957;',
		'GO-eye-circle': '&#xe958;',
		'GO-facebook-circle': '&#xe959;',
		'GO-factory-circle': '&#xe95a;',
		'GO-file-circle': '&#xe95b;',
		'GO-folder-circle': '&#xe95c;',
		'GO-folder-open-circle': '&#xe95d;',
		'GO-fuel-circle': '&#xe95e;',
		'GO-gearbox-circle': '&#xe95f;',
		'GO-glasses-circle': '&#xe960;',
		'GO-grid-circle': '&#xe961;',
		'GO-grid-large-circle': '&#xe962;',
		'GO-help-circle': '&#xe963;',
		'GO-home-circle': '&#xe964;',
		'GO-id-circle': '&#xe965;',
		'GO-info-circle': '&#xe966;',
		'GO-instagram-circle': '&#xe967;',
		'GO-lamp-circle': '&#xe968;',
		'GO-list-circle': '&#xe969;',
		'GO-loop-circle': '&#xe96a;',
		'GO-map-marker-circle': '&#xe96b;',
		'GO-minus-circle': '&#xe96c;',
		'GO-paper-plane-circle': '&#xe96d;',
		'GO-pen-circle': '&#xe96e;',
		'GO-persons-circle': '&#xe96f;',
		'GO-phone-circle': '&#xe970;',
		'GO-piggy-bank-circle': '&#xe971;',
		'GO-pin-circle': '&#xe972;',
		'GO-plus-circle': '&#xe973;',
		'GO-print-circle': '&#xe974;',
		'GO-question-circle': '&#xe975;',
		'GO-recharge-circle': '&#xe976;',
		'GO-save-circle': '&#xe977;',
		'GO-share-circle': '&#xe978;',
		'GO-shopping-bag--circle': '&#xe979;',
		'GO-sign-in-circle': '&#xe97a;',
		'GO-sign-out-circle': '&#xe97b;',
		'GO-snow-flake-circle': '&#xe97c;',
		'GO-tag-circle': '&#xe97d;',
		'GO-th-large-circle': '&#xe97e;',
		'GO-times-circle': '&#xe97f;',
		'GO-trash-circle': '&#xe980;',
		'GO-upload-circle': '&#xe981;',
		'GO-wallet-circle': '&#xe982;',
		'GO-wheel-circle': '&#xe983;',
		'GO-arrow-down-square': '&#xe984;',
		'GO-arrow-left-square': '&#xe985;',
		'GO-arrow-right-square': '&#xe986;',
		'GO-arrow-up-square': '&#xe987;',
		'GO-badge-square': '&#xe988;',
		'GO-ban-square': '&#xe989;',
		'GO-bell-square': '&#xe98a;',
		'GO-boxes-square': '&#xe98b;',
		'GO-box-square': '&#xe98c;',
		'GO-briefcase-square': '&#xe98d;',
		'GO-calendar-square': '&#xe98e;',
		'GO-cart-square': '&#xe98f;',
		'GO-case-square': '&#xe990;',
		'GO-chain-square': '&#xe991;',
		'GO-chart-pie-square': '&#xe992;',
		'GO-chart-square': '&#xe993;',
		'GO-checkbox-square': '&#xe994;',
		'GO-cog-square': '&#xe995;',
		'GO-cube-square': '&#xe996;',
		'GO-dolly-square': '&#xe997;',
		'GO-download-square': '&#xe998;',
		'GO-edit-square': '&#xe999;',
		'GO-eye-square': '&#xe99a;',
		'GO-facebook-square': '&#xe99b;',
		'GO-factory-square': '&#xe99c;',
		'GO-file-square': '&#xe99d;',
		'GO-folder-open-square': '&#xe99e;',
		'GO-folder-square': '&#xe99f;',
		'GO-fuel-square': '&#xe9a0;',
		'GO-gearbox-square': '&#xe9a1;',
		'GO-glasses-square': '&#xe9a2;',
		'GO-grid-large-square': '&#xe9a3;',
		'GO-grid-square': '&#xe9a4;',
		'GO-help-square': '&#xe9a5;',
		'GO-home-square': '&#xe9a6;',
		'GO-id-square': '&#xe9a7;',
		'GO-info-square': '&#xe9a8;',
		'GO-instagram-square': '&#xe9a9;',
		'GO-lamp-square': '&#xe9aa;',
		'GO-list-square': '&#xe9ab;',
		'GO-loop-square': '&#xe9ac;',
		'GO-map-marker-square': '&#xe9ad;',
		'GO-minus-square': '&#xe9ae;',
		'GO-paper-plane-square': '&#xe9af;',
		'GO-pen-square': '&#xe9b0;',
		'GO-persons-square': '&#xe9b1;',
		'GO-phone-square': '&#xe9b2;',
		'GO-piggy-bank-square': '&#xe9b3;',
		'GO-pin-square': '&#xe9b4;',
		'GO-plus-square': '&#xe9b5;',
		'GO-print-square': '&#xe9b6;',
		'GO-question-square': '&#xe9b7;',
		'GO-recharge-square': '&#xe9b8;',
		'GO-save-square': '&#xe9b9;',
		'GO-share-square': '&#xe9ba;',
		'GO-shopping-bag-square': '&#xe9bb;',
		'GO-sign-in-square': '&#xe9bc;',
		'GO-sign-out-square': '&#xe9bd;',
		'GO-snow-flake-square': '&#xe9be;',
		'GO-tag-square': '&#xe9bf;',
		'GO-th-large-square': '&#xe9c0;',
		'GO-times-square': '&#xe9c1;',
		'GO-trash-square': '&#xe9c2;',
		'GO-upload-square': '&#xe9c3;',
		'GO-wallet-square': '&#xe9c4;',
		'GO-wheel-square': '&#xe9c5;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/GO-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
