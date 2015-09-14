// --------- Класс-потомок WH_Option -----------
var RewardsOfChaosGreaterRewards = function(o) {
    this.optionName = 'RewardsOfChaosGreaterRewards';
    this.cost = 20;
    this.actionText = 'Высшие вознаграждения - 20 очков';
    WH_Option.apply(this, arguments);
    
    var _this = this;
    this.$action.click(function(){
        var __this = _this;
        return function(){
            __this.enable();
        }
    }())
}

// Унаследовать
RewardsOfChaosGreaterRewards.prototype = Object.create(WH_Option.prototype);

// Желательно и constructor сохранить
RewardsOfChaosGreaterRewards.prototype.constructor = RewardsOfChaosGreaterRewards;

RewardsOfChaosGreaterRewards.prototype.canEnable = function () {
    if (!this.superOption.canEnable()) {
    	return false;
    }
    return this.superOption.canEnableRewardsOfChaos(this.optionName);
}

RewardsOfChaosGreaterRewards.prototype.enable = function () {
    if (this.canEnable()) {
    	for (var i in this.unit.models) {
    		if (this.unit.models[i].modelName == 'Plaguer') {
    			this.unit.models[i].getedOptions.push('Greater Rewards')
    		}
    	}
    	WH_Option.prototype.enable.apply(this);
    }
}




