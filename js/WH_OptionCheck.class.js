// --------- Класс-потомок WH_OptionSuper -----------
var OptionChek = function(o) {
    WH_Option.apply(this, arguments);
	var _this = this;
	this.enableIndicatorMinusClass = 'WH_option_action_indicator--minus';
}

// Унаследовать
OptionChek.prototype = Object.create(WH_Option.prototype);

// Желательно и constructor сохранить
OptionChek.prototype.constructor = OptionChek;

OptionChek.prototype.canEnable = function() {
    if (this.isBlocked()) {
        return false;
    }
    return WH_Option.prototype.canEnable(this, arguments)
}


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
    WH_Option.prototype.update.apply(this, arguments);
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


WH_Option.prototype.showEnableIndicator = function() {
	if (this.usedCount > 0) {
	    this.$indicator.removeClass(this.enableIndicatorClass);
	    this.$indicator.addClass(this.enableIndicatorMinusClass);
	} else {
	    this.$indicator.removeClass(this.enableIndicatorMinusClass);
	    this.$indicator.addClass(this.enableIndicatorClass);
	}
}


