// --------- Класс-потомок WH_Option -----------
var WH_OptionSuper = function(o) {
    WH_Option.apply(this, arguments);
    this.subOptions = [];
    for (var i in this.defaultSubOptions) {
		this.subOptions.push(new window[this.defaultSubOptions[i]]({
			unit: this.unit,
			superOption: this,
			$link: this.$body
		}));
    }
}

// Унаследовать
WH_OptionSuper.prototype = Object.create(WH_Option.prototype);

// Желательно и constructor сохранить
WH_OptionSuper.prototype.constructor = WH_OptionSuper;

// Методы хранятся в прототипе
// WH_OptionSuper.prototype.enable  = function(n) {
// 	if ((!n && n !== 0) || n < 0 || this.subOptions.length-1 < n) {
// 		return false;
// 	}
// 	this.subOptions[n].enable();

// }
// WH_OptionSuper.prototype.disable  = function(n) {
// 	if ((!n && n !== 0) || n < 0 || this.subOptions.length-1 < n) {
// 		return false;
// 	}
// 	this.subOptions[n].disable();

// }