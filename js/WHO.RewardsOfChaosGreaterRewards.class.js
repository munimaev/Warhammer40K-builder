// --------- Класс-потомок WHOption -----------
var RewardsOfChaosGreaterRewards = function(o) {
    this.optionName = 'RewardsOfChaosGreaterRewards';
    this.cost = 20;

    this.optionNameInModel = 'Greater Reward';
    
    this.actionTextUp = 'Высшие вознаграждения - 20 очков';
    this.actionIconUp = 'rewards2';

    this.funCanEnable = function() {
        return this.superOption.superOption.canEnableReward(this);

    }

    this.funEnable = function() {
        return this.superOption.superOption.enableReward(this);

    }


    this.actionTextDown = 'Удалить высшее возгараждаение.';
    this.actionIconDown = 'rewards2';

    this.funCanDisable = function() {
        return this.superOption.superOption.canDisableReward(this);

    }

    this.funDisable = function() {
        return this.superOption.superOption.disableReward(this);

    }
    this.funIsNeedShow = this.funCanDisable;

    OptionCounter.apply(this, arguments);
    
}

// Унаследовать
RewardsOfChaosGreaterRewards.prototype = Object.create(OptionCounter.prototype);

// Желательно и constructor сохранить
RewardsOfChaosGreaterRewards.prototype.constructor = RewardsOfChaosGreaterRewards;

// RewardsOfChaosGreaterRewards.prototype.canEnable = function () {
//     if (!this.superOption.canEnable()) {
//     	return false;
//     }
//     return this.superOption.canEnableRewardsOfChaos(this.optionName);
// }

// RewardsOfChaosGreaterRewards.prototype.enable = function () {
//     if (this.canEnable()) {
//     	for (var i in this.unit.models) {
//     		if (this.unit.models[i].modelName == 'Plaguer') {
//     			this.unit.models[i].getedOptions.push('Greater Rewards')
//     		}
//     	}
//     	WHOption.prototype.enable.apply(this);
//     }
// }




