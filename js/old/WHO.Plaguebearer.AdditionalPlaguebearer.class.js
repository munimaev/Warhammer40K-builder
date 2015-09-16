// --------- Класс-потомок WH_OptionSuper -----------
var PlaguebearerAdditionalPlaguebearer = function(o) {
    this.defaultSubOptions = [
        'PlaguebearerAdditionalPlaguebearerAdd',
        'PlaguebearerAdditionalPlaguebearerRemove',
    ]
    this.optionName = 'PlaguebearerAdditionalPlaguebearer';
    this.oneAdditionalUnitCost = 9;
    this.usedCountMax = 10;
    this.headerText = 'Можно включить до десяти дополнительных чумоносцев по 9 очков за модель.';

    WH_OptionSuper.apply(this, arguments);
}

// Унаследовать
PlaguebearerAdditionalPlaguebearer.prototype = Object.create(WH_OptionSuper.prototype);

// Желательно и constructor сохранить
PlaguebearerAdditionalPlaguebearer.prototype.constructor = PlaguebearerAdditionalPlaguebearer;


PlaguebearerAdditionalPlaguebearer.prototype.canEnable = function (){
    if (this.unit.hasPlguer()) {
        for (var i in this.costsPointsChaosLesserRewards) {
            if (this.canEnableRewardsOfChaos(i)) {
                return true;
            }
        }
    }
    return false;
} 

PlaguebearerAdditionalPlaguebearer.prototype.canEnableRewardsOfChaos = function (name){
    var costs = this.costsPointsChaosLesserRewards;
    var total = this.totalPayedPointsRewardsOfChaos(); 
    if (this.pullPointsChaosLesserRewards - total >= costs[name]) {
        return true
    }
    return false;
}

PlaguebearerAdditionalPlaguebearer.prototype.totalPayedPointsRewardsOfChaos = function () {
    var costs = this.costsPointsChaosLesserRewards;
    var total = 0;
    for (var i in this.subOptions) {
        if (costs.hasOwnProperty(this.subOptions[i].optionName)) {
            total += this.subOptions[i].usedCount * costs[this.subOptions[i].optionName];
        }
    }
    return total;
}

PlaguebearerAdditionalPlaguebearer.prototype.getVisibleHeader = function() {
    var result = this.headerText;
    var count = this.getCount();
    if (count > 0) {
        result += ' Взято моделей: '+ count+'.';
    }
    return  result;
}



PlaguebearerAdditionalPlaguebearer.prototype.getCount = function() {
    var count = 0;
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy === this) {
            count++;
        }
    }
    return count;
}


PlaguebearerAdditionalPlaguebearer.prototype.update = function() {
    WH_Option.prototype.update.apply(this);
    this.$header.html(this.getVisibleHeader());
}

PlaguebearerAdditionalPlaguebearer.prototype.getAdditionalCost = function() {
    return this.getCount() * this.oneAdditionalUnitCost;
}