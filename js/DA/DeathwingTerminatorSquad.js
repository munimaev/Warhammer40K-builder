
var DA_DeathwingTerminatorSquad = function(o) {
	this.unitName = 'DA_DeathwingTerminatorSquad';
	this.price = 200;
	this.optionsDefault = [
		'DA_DeathwingTerminatorSquad_addTerninator',
        'DA_DeathwingTerminatorSquad_ReplaceManyWeapon',
        'DA_DeathwingTerminatorSquad_ChangePowerFist',
        'DA_DeathwingTerminatorSquad_TerminatorHeavyWargearAll',
		'DA_PrediusRelicOfTheUnforgiven',
		'DA_DedicatedHeavyTransport',
	];
	this.structureDefault = {
        'DA_DeathwingSergant' : 1,
        'DA_DeathwingTerminator' : 4,
	}
    this.defaultUnitWargear = [
        'TerminatorArmour',
        'StormBolter',
        function (m) {
            if (m.modelName === 'DA_DeathwingSergant') {
                return 'PowerSword';
            } 
            else if (m.modelName === 'DA_DeathwingTerminator') {
                return 'PowerFist';
            }
            return false;
        },
    ];
	this.defaultSpecialRules = [
		'Deathwing',
		'GrimResolve',
		'SplitFire',
	];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_DeathwingTerminatorSquad.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_DeathwingTerminatorSquad.prototype.constructor = DA_DeathwingTerminatorSquad;
// Методы потомка 
DA_DeathwingTerminatorSquad.prototype.visibleName = 'Deathwing Terminator Squad';
DA_DeathwingTerminatorSquad.prototype.pic = 'units_DA/DeathwingTerminators.jpg';




//==============================================================================



WH_OptionAddModelFabric([{
    'optionName' : 'DA_DeathwingTerminatorSquad_addTerninator',
    'cost' : 40,
    'maxCountAdding' : 5,
    'modelToAdd' : 'DA_DeathwingTerminator',
    'funCanDisable' : function() {

        var modelsCount = 0;
        for (var m in this.unit.models) {
            for (var w in this.unit.models[m].wargear) {
                if (this.unit.models[m].wargear[w].createBy.hasOwnProperty('superOption')
                    &&
                    this.unit.models[m].wargear[w].createBy.superOption.hasOwnProperty('optionName')
                    && (this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_DeathwingTerminatorSquad_CicloneMissleLauncher'
                        ||
                        this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_DeathwingTerminatorSquad_TerminatorHeavyWargear')

                ) {    
                  modelsCount++;
                }
            }
        }
        if (modelsCount >= 2) {
            return false;
        }

        if (this.superOption.getCount() > 0) {
            return true;
        }
        return false;
    }
}]);




//==============================================================================










//==============================================================================





var DA_DeathwingTerminatorSquad_ReplaceManyWeapon = function(o) {
    this.defaultSubOptions = [
        'DA_DeathwingTerminatorSquad_ReplaceManyWeapon_LightningClaws',
        'DA_DeathwingTerminatorSquad_ReplaceManyWeapon_Hammer',
    ]
    this.optionName = 'DA_DeathwingTerminatorSquad_ReplaceManyWeapon';
    this.cost = 0;
    this.headerText = 'Любая модель может замерить все свое оружие на одно из следующего';
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DeathwingTerminatorSquad_ReplaceManyWeapon.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DeathwingTerminatorSquad_ReplaceManyWeapon.prototype.constructor = DA_DeathwingTerminatorSquad_ReplaceManyWeapon;



DA_DeathwingTerminatorSquad_ReplaceManyWeapon_LightningClaws = function() {
    this.optionName = 'DA_DeathwingTerminatorSquad_ReplaceManyWeapon_LightningClaws';
    this.cost = 0;
    this.removeItems = [
        'StormBolter',
        function(m) {
            if (m.modelName === 'DA_DeathwingSergant') {
                return 'PowerSword';
            } else if (m.modelName === 'DA_DeathwingTerminator') {
                return 'PowerFist';
            }
            return false;
        },
    ];
    this.addItems = ['LightningClaws','LightningClaws'];
    this.actionTextUp = 'Два <b>Lightning сlaws</b> <i>бесплатно</i>';
    // this.actionIconUp = actionIconUp;
    this.actionTextDown = 'Убрать два Lightning сlaws';
    // this.actionIconDown = actionIconDown;
    DA_RangedWeapons_Class.apply(this, arguments);
}
DA_DeathwingTerminatorSquad_ReplaceManyWeapon_LightningClaws.prototype = Object.create(DA_RangedWeapons_Class.prototype);
DA_DeathwingTerminatorSquad_ReplaceManyWeapon_LightningClaws.prototype.constructor =  DA_DeathwingTerminatorSquad_ReplaceManyWeapon_LightningClaws;



DA_DeathwingTerminatorSquad_ReplaceManyWeapon_Hammer = function() {
    this.optionName = 'DA_DeathwingTerminatorSquad_ReplaceManyWeapon_Hammer';
    this.cost = 0;
    this.removeItems = [
        'StormBolter',
        function(m) {
            if (m.modelName === 'DA_DeathwingSergant') {
                return 'PowerSword';
            } else if (m.modelName === 'DA_DeathwingTerminator') {
                return 'PowerFist';
            }
            return false;
        },
    ];
    this.addItems = ['StormShield','ThunderHammer'];
    this.actionTextUp = '<b>Storm shield</b> и <b>Thunder hammer</b> <i>за 10 очков</i>';
    // this.actionIconUp = actionIconUp;
    this.actionTextDown = 'actionTextDown';
    // this.actionIconDown = actionIconDown;
    DA_RangedWeapons_Class.apply(this, arguments);
}

DA_DeathwingTerminatorSquad_ReplaceManyWeapon_Hammer.prototype = Object.create(DA_RangedWeapons_Class.prototype);
DA_DeathwingTerminatorSquad_ReplaceManyWeapon_Hammer.prototype.constructor =  DA_DeathwingTerminatorSquad_ReplaceManyWeapon_Hammer;






//==============================================================================


var DA_DeathwingTerminatorSquad_ChangePowerFist = function(o) {
    this.defaultSubOptions = [
        'DA_DeathwingTerminatorSquad_ChangePowerFist_Chainfist',
    ]
    this.optionName = 'DA_DeathwingTerminatorSquad_ChangePowerFist';
    this.cost = 5;
    this.headerText = 'Любая модель может заменить свой Powerfist на Chainfist';
    this.isWargearToChange = function(w,m) {
        if (w.wargearName == 'PowerFist'
            && w.createBy === m
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DeathwingTerminatorSquad_ChangePowerFist.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DeathwingTerminatorSquad_ChangePowerFist.prototype.constructor = DA_DeathwingTerminatorSquad_ChangePowerFist;



DA_RangedWeaponsFabric([{
    'optionName'      : 'DA_DeathwingTerminatorSquad_ChangePowerFist_Chainfist',
    'optionNameInModel': 'Chainfist',
    'cost' : 5,
    'changeTo' : 'Chainfist',
    'actionTextUp' : '<b>Chainfist</b> <i>за 5 очков</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Chainfist.',
    // 'actionIconDown' : 'rewards1'
}]);




//==============================================================================





var DA_DeathwingTerminatorSquad_TerminatorHeavyWargearAll = function(o) {
    this.defaultSubOptions = [
        'DA_DeathwingTerminatorSquad_TerminatorHeavyWargear',
        'DA_DeathwingTerminatorSquad_CicloneMissleLauncher',
    ]
    this.optionName = 'DA_DeathwingTerminatorSquad_TerminatorHeavyWargearAll';
    this.cost = 0;
    this.headerText = 'За каждые 5 моделей в отряде одна модель может взять одно из спика Terminator Heavy Weapon';
    WH_OptionSuper.apply(this, arguments);
}
// Унаследовать
DA_DeathwingTerminatorSquad_TerminatorHeavyWargearAll.prototype = Object.create(WH_OptionSuper.prototype);
// Желательно и constructor сохранить
DA_DeathwingTerminatorSquad_TerminatorHeavyWargearAll.prototype.constructor = DA_DeathwingTerminatorSquad_TerminatorHeavyWargearAll;




var DA_DeathwingTerminatorSquad_TerminatorHeavyWargear = function(o) {
    this.defaultSubOptions = [
        'DA_TerminatorHeavyWargear_HeavyFlamer',
        'DA_TerminatorHeavyWargear_PlasmaCannon',
        'DA_TerminatorHeavyWargear_AssaultCannon',
    ]
    this.optionName = 'DA_DeathwingTerminatorSquad_TerminatorHeavyWargear';
    this.cost = 0;
    this.needChekEnambleEachTime =true;
    this.headerText = 'Заменить Strom bolter на одно из мледущего';
    this.isWargearToChange = function(w,m) {
        var modelCount = m.unit.models.length;
        for (var m1 in m.unit.models) {
            for (var w1 in m.unit.models[m1].wargear) {
                if (
                    m.unit.models[m1].wargear[w1].createBy
                    &&
                    m.unit.models[m1].wargear[w1].createBy.superOption
                    &&
                    (
                        m.unit.models[m1].wargear[w1].createBy.superOption === this
                        ||
                        m.unit.models[m1].wargear[w1].createBy.superOption.optionName === 'DA_DeathwingTerminatorSquad_CicloneMissleLauncher'
                    )
                ) {
                    modelCount-=5;
                }
            }
        }
        if (modelCount < 5) {
            return false;
        }


        if ((w.wargearName == 'StormBolter'
            ) && w.createBy === m
        ) {
            return true;
        }
        return false;
    }
    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DeathwingTerminatorSquad_TerminatorHeavyWargear.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DeathwingTerminatorSquad_TerminatorHeavyWargear.prototype.constructor = DA_DeathwingTerminatorSquad_TerminatorHeavyWargear;



var DA_DeathwingTerminatorSquad_CicloneMissleLauncher = function(o) {
    this.defaultSubOptions = [
        'DA_TerminatorHeavyWargear_CicloneMissleLauncher',
    ]
    this.optionName = 'DA_DeathwingTerminatorSquad_CicloneMissleLauncher';
    this.cost = 0;
    this.headerText = 'Без замены Storm bolter';
    this.isModelCanGet =  function(m, superOption) {

        var modelCount = m.unit.models.length;
        for (var m1 in m.unit.models) {
            for (var w1 in m.unit.models[m1].wargear) {
                if (
                    m.unit.models[m1].wargear[w1].createBy
                    &&
                    m.unit.models[m1].wargear[w1].createBy.superOption
                    &&
                    (
                        m.unit.models[m1].wargear[w1].createBy.superOption === this
                        ||
                        m.unit.models[m1].wargear[w1].createBy.superOption.optionName === 'DA_DeathwingTerminatorSquad_TerminatorHeavyWargear'
                    )
                ) {
                    modelCount-=5;
                }
            }
        }
        if (modelCount < 5) {
            return false;
        }
        for (var i in m.wargear) {
            if (m.wargear[i].createBy.superOption === superOption.superOption
                && m.wargear[i].wargearName !== 'emptySlot') {
                return false;
            }
        }
        return true;
    }

    AddFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DeathwingTerminatorSquad_CicloneMissleLauncher.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DeathwingTerminatorSquad_CicloneMissleLauncher.prototype.constructor = DA_DeathwingTerminatorSquad_CicloneMissleLauncher;



DA_RangedWeaponsFabric([

{
    optionName: 'DA_TerminatorHeavyWargear_HeavyFlamer',
    optionNameInModel: 'HeavyFlamer',
    cost: 10,
    changeTo : 'HeavyFlamer',
    actionTextUp: '<b>HeavyFlamer</b> <i>за 10 очков</i>',
    actionTextDown: 'Убрать HeavyFlamer',
}, {
    optionName: 'DA_TerminatorHeavyWargear_PlasmaCannon',
    optionNameInModel: 'PlasmaCannon',
    cost: 15,
    changeTo : 'PlasmaCannon',
    actionTextUp: '<b>PlasmaCannon</b> <i>за 15 очков</i>',
    actionTextDown: 'Убрать PlasmaCannon',
}, {
    optionName: 'DA_TerminatorHeavyWargear_AssaultCannon',
    optionNameInModel: 'AssaultCannon',
    cost: 20,
    changeTo : 'AssaultCannon',
    actionTextUp: '<b>AssaultCannon</b> <i>за 20 очков</i>',
    actionTextDown: 'Убрать AssaultCannon',
}, {
    optionName: 'DA_TerminatorHeavyWargear_CicloneMissleLauncher',
    optionNameInModel: 'CicloneMissleLauncher',
    cost: 25,
    changeTo : 'CicloneMissleLauncher',
    actionTextUp: '<b>CicloneMissleLauncher</b> <i>за 25 очков</i>',
    actionTextDown: 'Убрать CicloneMissleLauncher',
},

]);


//==============================================================================





var DA_DeathwingTerminatorSquad_PrediusRelicOfTheUnforgiven = function(o) {
    this.optionName = 'DA_DeathwingTerminatorSquad_PrediusRelicOfTheUnforgiven';
    this.cost = 15;
    this.actionText = 'Взять Predius Relic Of The Unforgiven <i>за 15 очков</i>';
    this.actionIcon = 'upgrade';
    OptionChek.apply(this, arguments);

}

// Унаследовать
DA_DeathwingTerminatorSquad_PrediusRelicOfTheUnforgiven.prototype = Object.create(OptionChek.prototype);

// Желательно и constructor сохранить
DA_DeathwingTerminatorSquad_PrediusRelicOfTheUnforgiven.prototype.constructor = DA_DeathwingTerminatorSquad_PrediusRelicOfTheUnforgiven;


DA_DeathwingTerminatorSquad_PrediusRelicOfTheUnforgiven.prototype.on  = function() {
    this.unit.defaultSpecialRules.push('PrediusRelicOfTheUnforgiven');    
    this.usedCount++;
    this.iUpdated();
}


DA_DeathwingTerminatorSquad_PrediusRelicOfTheUnforgiven.prototype.off  = function() {
    var ind = this.unit.defaultSpecialRules.indexOf('PrediusRelicOfTheUnforgiven');
    if(~ind) {
        this.unit.defaultSpecialRules.splice(ind,1);    
    }
    this.usedCount--;
    this.iUpdated();
}



//==============================================================================




