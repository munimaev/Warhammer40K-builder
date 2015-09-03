// --------- Класс-потомок WHOptionSuper -----------
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

    WHOptionSuper.apply(this, arguments);

	this.subOptions.push(new WHOption({
		unit: this.unit,
		superOption: this,
		$link: this.$body,
		actionText: this.actionTextUp,
		canEnable : this.funCanEnable,
		enable: this.funEnable,
		actionIcon: this.actionIconUp
	}));

	this.subOptions.push(new WHOption({
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
OptionCounter.prototype = Object.create(WHOptionSuper.prototype);

// Желательно и constructor сохранить
OptionCounter.prototype.constructor = OptionCounter;

