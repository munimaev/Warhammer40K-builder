// --------- Класс-потомок WHOption -----------
var RewardsOfChaosGreaterRewardsDisable = function(o) {
    this.optionName = 'RewardsOfChaosGreaterRewardsDisable';
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
RewardsOfChaosGreaterRewardsDisable.prototype = Object.create(WHOption.prototype);

// Желательно и constructor сохранить
RewardsOfChaosGreaterRewardsDisable.prototype.constructor = RewardsOfChaosGreaterRewardsDisable;

RewardsOfChaosGreaterRewardsDisable.prototype.canEnable = function () {
	return true;
}

RewardsOfChaosGreaterRewardsDisable.prototype.enable = function () {
	for (var i in this.unit.models) {
		if (this.unit.models[i].modelName == 'Plaguer') {
			var ind = this.unit.models[i].getedOptions.indexOf('Greater Rewards');
			if (ind >= 0) {
				this.unit.models[i].getedOptions.splice(ind,1);
				for (var o in this.superOption.superOption) {
					if (this.superOption.superOption[o].optionName == 'RewardsOfChaosGreaterRewards') {
						this.superOption.superOption[o].usedCount--;
					}
				}
				this.iUupdated();
			}
		}
	}
}



RewardsOfChaosGreaterRewardsDisable.prototype.isNeedShow = function() {
	for (var i in this.unit.models) {
	console.log(this.unit.models[i].modelName == 'Plaguer'
			, ~this.unit.models[i].getedOptions.indexOf('Greater Rewards'))
		if (this.unit.models[i].modelName == 'Plaguer'
			&& ~this.unit.models[i].getedOptions.indexOf('Greater Rewards') ){
			return true;
		}
	}
	return false;
}



