// --------- Класс-потомок WHOption -----------
var RewardsOfChaosLesserRewardsDisable = function(o) {
    this.optionName = 'RewardsOfChaosLesserRewardsDisable';
    this.cost = 0;
    this.actionText = 'Удалить низшее вознаграждение';
    this.defaultHide = false;
    WHOption.apply(this, arguments);

    var _this = this;
    this.$action.click(function(){
        var __this = _this;
        return function(){
            __this.enable();
        }
    }())
}

// Унаследовать
RewardsOfChaosLesserRewardsDisable.prototype = Object.create(WHOption.prototype);

// Желательно и constructor сохранить
RewardsOfChaosLesserRewardsDisable.prototype.constructor = RewardsOfChaosLesserRewardsDisable;

RewardsOfChaosLesserRewardsDisable.prototype.canEnable = function () {
	return true;
}

RewardsOfChaosLesserRewardsDisable.prototype.enable = function () {
	for (var i in this.unit.models) {
		if (this.unit.models[i].modelName == 'Plaguer') {
			console.log(this.unit.models[i].getedOptions);
			var ind = this.unit.models[i].getedOptions.indexOf('Lesser Rewards');
			if (ind >= 0) {
				this.unit.models[i].getedOptions.splice(ind,1);
				for (var o in this.superOption.superOption) {
					if (this.superOption.superOption[o].optionName == 'RewardsOfChaosLesserRewards') {
						this.superOption.superOption[o].usedCount--;
					}
				}
				this.iUupdated();
			}
		}
	}
}



RewardsOfChaosLesserRewardsDisable.prototype.isNeedShow = function() {
	for (var i in this.unit.models) {
	console.log(this.unit.models[i].modelName == 'Plaguer'
			, ~this.unit.models[i].getedOptions.indexOf('Lesser Rewards'))
		if (this.unit.models[i].modelName == 'Plaguer'
			&& ~this.unit.models[i].getedOptions.indexOf('Lesser Rewards') ){
			return true;
		}
	}
	return false;
}



