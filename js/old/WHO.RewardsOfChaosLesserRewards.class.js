// --------- Класс-потомок WHOption -----------
var RewardsOfChaosLesserRewards = function(o) {
    this.optionName = 'RewardsOfChaosLesserRewards';
    this.cost = 10;
    this.actionText = 'Низшие вознаграждения - 10 очков.';
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
RewardsOfChaosLesserRewards.prototype = Object.create(WHOption.prototype);

// Желательно и constructor сохранить
RewardsOfChaosLesserRewards.prototype.constructor = RewardsOfChaosLesserRewards;

RewardsOfChaosLesserRewards.prototype.canEnable = function () {
    if (!this.superOption.canEnable()) {
    	return false;
    }
    return this.superOption.canEnableRewardsOfChaos(this.optionName);
}

RewardsOfChaosLesserRewards.prototype.enable = function () {
    if (this.canEnable()) {
    	for (var i in this.unit.models) {
    		if (this.unit.models[i].modelName == 'Plaguer') {
    			this.unit.models[i].getedOptions.push('Lesser Rewards')
    		}
    	}
    	WHOption.prototype.enable.apply(this);
    }
}






