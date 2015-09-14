// --------- Класс-потомок WH_OptionSuper -----------
var OptionCounter = function(o) {
	if (!o) {
		debugger;
	}
	if (!this.funEnable
		|| !this.funCanEnable
		|| !this.funDisable
		|| !this.funCanDisable
		|| !this.funIsNeedShow) {
		debugger;
	}

	this.optionNameInModel = this.optionNameInModel || '!!!';

    this.actionDownText  =  this.actionDownText || '-';

    WH_OptionSuper.apply(this, arguments);

	this.subOptions.push(new WH_Option({
		unit: this.unit,
		superOption: this,
		$link: this.$body,
		actionText: this.actionTextUp,
		canEnable : this.funCanEnable,
		enable: this.funEnable,
		actionIcon: this.actionIconUp
	}));

	this.subOptions.push(new WH_Option({
		unit: this.unit,
		superOption: this,
		$link: this.$body,
		actionText: this.actionTextDown,
		canEnable: this.funCanDisable,
		enable: this.funDisable,
		actionIcon: this.actionIconDown,
		defaultHide : true,
		isNeedShow: this.funIsNeedShow,
		enableIndicatorClass : 'WH_option_action_indicator--minus'
	}));

}

// Унаследовать
OptionCounter.prototype = Object.create(WH_OptionSuper.prototype);

// Желательно и constructor сохранить
OptionCounter.prototype.constructor = OptionCounter;

