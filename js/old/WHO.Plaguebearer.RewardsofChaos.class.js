// --------- Класс-потомок WH_OptionSuper -----------
var PlaguebearerRewardsofChaos = function(o) {
    this.defaultSubOptions = [
        'RewardsOfChaosLesserRewards',
        'RewardsOfChaosLesserRewardsDisable',
        'RewardsOfChaosGreaterRewards',
        'RewardsOfChaosGreaterRewardsDisable',
    ]
    this.optionName = 'PlaguebearerRewardsofChaos';
    this.cost = 0;
    this.usedCountMax = 100;
    this.headerText = 'Зачумленный может на 20 очков набрать демонических вознаграждений в любой комбинации';

    this.pullPointsChaosLesserRewards = 20;
    this.costsPointsChaosLesserRewards = {
        'RewardsOfChaosLesserRewards': 10,
        'RewardsOfChaosGreaterRewards': 20
    };
    WH_OptionSuper.apply(this, arguments);
}

// Унаследовать
PlaguebearerRewardsofChaos.prototype = Object.create(WH_OptionSuper.prototype);

// Желательно и constructor сохранить
PlaguebearerRewardsofChaos.prototype.constructor = PlaguebearerRewardsofChaos;


PlaguebearerRewardsofChaos.prototype.canEnable = function (){
    if (this.unit.hasPlguer()) {
        for (var i in this.costsPointsChaosLesserRewards) {
            if (this.canEnableRewardsOfChaos(i)) {
                return true;
            }
        }
    }
    return false;
} 

PlaguebearerRewardsofChaos.prototype.canEnableRewardsOfChaos = function (name){
    var costs = this.costsPointsChaosLesserRewards;
    var total = this.totalPayedPointsRewardsOfChaos(); 
    if (this.pullPointsChaosLesserRewards - total >= costs[name]) {
        return true
    }
    return false;
}

PlaguebearerRewardsofChaos.prototype.canDisableRewardsOfChaos = function (name){
    var costs = this.costsPointsChaosLesserRewards;
    for (var i in this.subOptions) {
        if (costs.hasOwnProperty(this.subOptions[i].optionName) 
            && this.subOptions[i].optionName==name
            && this.subOptions[i].usedCount * costs[this.subOptions[i].optionName] > 0) {
            return true;
        }
    }
    return false;
}

PlaguebearerRewardsofChaos.prototype.totalPayedPointsRewardsOfChaos = function () {
    var costs = this.costsPointsChaosLesserRewards;
    var total = 0;
    for (var i in this.subOptions) {
        if (costs.hasOwnProperty(this.subOptions[i].optionName)) {
            total += this.subOptions[i].usedCount * costs[this.subOptions[i].optionName];
        }
    }
    return total;
}
