// --------- Класс-потомок WH_Option -----------
var RewardsOfChaosLesserRewards = function(o) {
    this.optionName = 'RewardsOfChaosLesserRewards';
    this.cost = 10;


    this.optionNameInModel = 'Lesser Reward';

    this.actionTextUp = 'Низшие вознаграждения - 10 очков';
    this.actionIconUp = 'rewards1';

    this.funCanEnable = function() {
        return this.superOption.superOption.canEnableReward(this);
    }

    this.funEnable = function() {
        return this.superOption.superOption.enableReward(this);
    }




    this.actionTextDown  = 'Удалить низшие возгараждаение.';
    this.actionIconDown = 'rewards1';

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
RewardsOfChaosLesserRewards.prototype = Object.create(OptionCounter.prototype);

// Желательно и constructor сохранить
RewardsOfChaosLesserRewards.prototype.constructor = RewardsOfChaosLesserRewards;



