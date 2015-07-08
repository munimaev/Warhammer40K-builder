// --------- Класс-потомок WHOptionSuper -----------
var PlaguebearerRewardsofChaos = function(o) {
    this.defaultSubOptions = [
        'RewardsOfChaosLesserRewards',
        'RewardsOfChaosGreaterRewards',
    ]
    this.optionName = 'PlaguebearerRewardsofChaos';
    this.cost = 0;
    this.usedCountMax = 100;
    this.headerText = 'Зачумленный может на 20 очков набрать демонических вознаграждений в любой комбинации';

    this.pullPoints = 20;

    WHOptionSuper.apply(this, arguments);

}

// Унаследовать
PlaguebearerRewardsofChaos.prototype = Object.create(WHOptionSuper.prototype);

// Желательно и constructor сохранить
PlaguebearerRewardsofChaos.prototype.constructor = PlaguebearerRewardsofChaos;


PlaguebearerRewardsofChaos.prototype.enableReward = function(option){
    //option - WHOption 
    //option.superOption - RewardsOfChaosLesserRewards 
    //option.superOption.superOption - PlaguebearerRewardsofChaos 
    if (this.canEnableReward(option)) {
        var hasOption = false;
        for (var m in this.unit.models) {
            if (this.unit.models[m].modelName == 'Plaguer') {
                for (var go in this.unit.models[m].getedOptions) {
                    if (this.unit.models[m].getedOptions[go].option == option.superOption) {

                        this.unit.models[m].getedOptions[go].count++;
                        hasOption = true;
                        break;
                    }
                }
                if (!hasOption) {
                    this.unit.models[m].getedOptions.push({
                        option: option.superOption,
                        count : 1
                    });
                }
                break;
            }
        }
        this.iUupdated();
    }
};

PlaguebearerRewardsofChaos.prototype.canEnableReward = function(option){
    var hasPlguer = false;
    var totalPaid = 0;
    for (var m in this.unit.models) {
        if (this.unit.models[m].modelName == 'Plaguer') {
            hasPlguer = true;
            for (var go in this.unit.models[m].getedOptions) {
                for (var so in this.subOptions) {
                    if (this.unit.models[m].getedOptions[go].option.superOption == this.subOptions[so].superOption
                        && this.unit.models[m].getedOptions[go].option.optionName == this.subOptions[so].optionName
                    ) {

                        totalPaid += this.subOptions[so].cost * this.unit.models[m].getedOptions[go].count;
                    }
                }
            }
            break;
        }
    }
    // console.log('hasPlguer',hasPlguer,this.pullPoints,totalPaid,option);
    if (hasPlguer && this.pullPoints - totalPaid >= option.superOption.cost) {
        // console.log('canEnableReward', true);
        return true;
    }  
    else {
        // console.log('canEnableReward', false);
        return false;
    }
};

PlaguebearerRewardsofChaos.prototype.disableReward = function(option){
    if (this.canDisableReward(option)) {
        for (var m in this.unit.models) {
            if (this.unit.models[m].modelName == 'Plaguer') {
                for (var go in this.unit.models[m].getedOptions) {
                    if (this.unit.models[m].getedOptions[go].option == option.superOption) {
                        this.unit.models[m].getedOptions[go].count--;
                        if (this.unit.models[m].getedOptions[go].count < 1) {
                            this.unit.models[m].getedOptions.splice(go,1);
                        }
                        break;
                    }
                }
                break;
            }
        }
        this.iUupdated();
    }
};

PlaguebearerRewardsofChaos.prototype.canDisableReward = function(option){
    var totalPaid = 0;
    var needen = 0;
    for (var m in this.unit.models) {
        if (this.unit.models[m].modelName == 'Plaguer') {
            for (var go in this.unit.models[m].getedOptions) {
                if (this.unit.models[m].getedOptions[go].option == option.superOption) {
                    return true;
                }
            }
        }
    }
    return false;
};


PlaguebearerRewardsofChaos.prototype.getAdditionalCost = function() {
    var totalPaid = 0;
    for (var m in this.unit.models) {
        if (this.unit.models[m].modelName == 'Plaguer') {
            for (var go in this.unit.models[m].getedOptions) {
                for (var so in this.subOptions) {
                    if (this.unit.models[m].getedOptions[go].option.superOption == this.subOptions[so].superOption
                        && this.unit.models[m].getedOptions[go].option.optionName == this.subOptions[so].optionName
                    ) {
                        totalPaid += this.subOptions[so].cost * this.unit.models[m].getedOptions[go].count;
                    }
                }
            }
            break;
        }
    }
    return totalPaid;
}
