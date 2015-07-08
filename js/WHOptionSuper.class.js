// --------- Класс-потомок WHOption -----------
var WHOptionSuper = function(o) {
    WHOption.apply(this, arguments);
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
WHOptionSuper.prototype = Object.create(WHOption.prototype);

// Желательно и constructor сохранить
WHOptionSuper.prototype.constructor = WHOptionSuper;

// Методы хранятся в прототипе
// WHOptionSuper.prototype.enable  = function(n) {
// 	if ((!n && n !== 0) || n < 0 || this.subOptions.length-1 < n) {
// 		return false;
// 	}
// 	this.subOptions[n].enable();

// }
// WHOptionSuper.prototype.disable  = function(n) {
// 	if ((!n && n !== 0) || n < 0 || this.subOptions.length-1 < n) {
// 		return false;
// 	}
// 	this.subOptions[n].disable();

// }