// --------- Класс-потомок WHOptionSuper -----------
var OptionChek = function(o) {
    WHOption.apply(this, arguments);
	var _this = this;
}

// Унаследовать
OptionChek.prototype = Object.create(WHOption.prototype);

// Желательно и constructor сохранить
OptionChek.prototype.constructor = OptionChek;

OptionChek.prototype.enable = function() {
	if (this.canEnable()) {
	    if (this.usedCount < 1) {
	        this.on();
	    }
	    else {
	        this.off();
	    }
	}
}

OptionChek.prototype.update = function() {
    WHOption.prototype.update.apply(this, arguments);
    // console.log('this.usedCount',this.usedCount)
    if (this.usedCount > 0) {
    	this.setIsUsed(true);
    }
    else {
    	this.setIsUsed(false);
    }
}

OptionChek.prototype.on = function() {
	if (this.canEnable()) {
		this.usedCount++;
	}
}
OptionChek.prototype.off = function() {
	if (this.canEnable()) {
		this.usedCount--;
	}
}



