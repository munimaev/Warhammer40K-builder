
var DA_DeathwingCommandSquad = function(o) {
	this.unitName = 'DA_DeathwingCommandSquad';
	this.price = 200;
	this.optionsDefault = [
		'DA_DeathwingCommandSquad_upgradeToDeathwingSergant',
        'DA_DeathwingCommandSquad_Standart',
        'DA_DeathwingCommandSquad_upgradeToDeathwingChampion',
        'DA_DeathwingCommandSquad_upgradeToDeathwingApothecary',
        'DA_DeathwingCommandSquad_ReplaceManyWeapon',
        'DA_DeathwingCommandSquad_ChangePowerFist',
        'DA_DeathwingCommandSquad_TerminatorHeavyWargearAll',
		'DA_DeathwingTerminatorSquad_PrediusRelicOfTheUnforgiven',
		'DA_DedicatedHeavyTransport',
	];
	this.structureDefault = {
        'DA_DeathwingTerminator' : 5,
	}
    this.defaultUnitWargear = [
        'TerminatorArmour',
        'StormBolter',
        'PowerFist'
    ];
	this.defaultSpecialRules = [
		'Deathwing',
		'GrimResolve',
		'SplitFire',
	];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_DeathwingCommandSquad.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_DeathwingCommandSquad.prototype.constructor = DA_DeathwingCommandSquad;
// Методы потомка 
DA_DeathwingCommandSquad.prototype.visibleName = 'Deathwing Command Squad';
DA_DeathwingCommandSquad.prototype.pic = 'units_DA/DeathwingCommand.jpg';





//==============================================================================




fabric_option_upgradeModel([
{
    optionName  : 'DA_DeathwingCommandSquad_upgradeToDeathwingSergant',
    cost        : 5,
    upgaredForm : 'DA_DeathwingTerminator',
    upgaredTo   : 'DA_DeathwingSergant',
    removeWargear : ['PowerFist'],
    addWargear  : ['PowerSword']
},
{
    optionName  : 'DA_DeathwingCommandSquad_upgradeToDeathwingApothecary',
    cost        : 5,
    upgaredForm : 'DA_DeathwingTerminator',
    upgaredTo   : 'DA_DeathwingApothecary',
    removeWargear : ['PowerFist'],
    addWargear : ['Nathecium'],
    isBlocked  : ['oneModelInArmy']
},
{
    optionName  : 'DA_DeathwingCommandSquad_upgradeToDeathwingChampion',
    cost        : 5,
    upgaredForm : 'DA_DeathwingTerminator',
    upgaredTo   : 'DA_DeathwingChampion',
    removeWargear : ['PowerFist','StormBolter'],
    addWargear  : ['HalberdOfCaliban'],
    isBlocked   : ['oneModelInArmy']
}
]);





//==============================================================================


var DA_DeathwingCommandSquad_ReplaceManyWeapon = function(o) {
    this.defaultSubOptions = [
        'DA_DeathwingCommandSquad_ReplaceManyWeapon_LightningClaws',
        'DA_DeathwingCommandSquad_ReplaceManyWeapon_Hammer'
    ]
    this.optionName = 'DA_DeathwingCommandSquad_ReplaceManyWeapon';
    this.cost = 0;
    this.headerText = 'Любая модель может заменить все свое оружие на одно из следующего';
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DeathwingCommandSquad_ReplaceManyWeapon.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DeathwingCommandSquad_ReplaceManyWeapon.prototype.constructor = DA_DeathwingCommandSquad_ReplaceManyWeapon;


DA_RangedWeaponsFabric([

{
    'optionName'      : 'DA_DeathwingCommandSquad_ReplaceManyWeapon_LightningClaws',
    'cost' : 0,
    addItems : ['LightningClaws','LightningClaws'],
    removeItems : [
        'StormBolter',
        function(m) {
            if (m.modelName === 'DA_DeathwingSergant') {
                return 'PowerSword';
            }
            return 'PowerFist';
        },
    ],
    isModelCanChange :  function(m, superOption) {
        if (m.modelName != 'DA_DeathwingTerminator') {
            return false;
        }
        return DA_RangedWeapons_Class.prototype.isModelCanChange.apply(this,arguments)
    },
    actionTextUp : 'Два <b>Lightning сlaws</b> <i>бесплатно</i>',
    actionTextDown : 'Убрать два Lightning сlaws'
},

{
    'optionName'      : 'DA_DeathwingCommandSquad_ReplaceManyWeapon_Hammer',
    'cost' : 20,
    addItems : ['StormShield','ThunderHammer'],
    removeItems : [
        'StormBolter',
        function(m) {
            if (m.modelName === 'DA_DeathwingSergant') {
                return 'PowerSword';
            }
            return 'PowerFist';
        },
    ],
    isModelCanChange :  function(m, superOption) {
        if (m.modelName != 'DA_DeathwingTerminator') {
            return false;
        }
        return DA_RangedWeapons_Class.prototype.isModelCanChange.apply(this,arguments)
    }
}

])


//==============================================================================



var DA_DeathwingCommandSquad_Standart = function(o) {
    this.defaultSubOptions = [
        'DA_Standart_DeathwingCompanyBanner',
        'DA_Standart_SacredStandart',
    ]
    this.optionName = 'DA_DeathwingCommandSquad_Standart';
    this.cost = 0;
    this.headerText = 'Один Deathwing Terminator в армии может взять';
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DeathwingCommandSquad_Standart.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DeathwingCommandSquad_Standart.prototype.constructor = DA_DeathwingCommandSquad_Standart;


DA_DeathwingCommandSquad_Standart.prototype.canEnable = function(){
    for (var a in this.unit.army.roster.armies) {
        for (var g in this.unit.army.roster.armies[a].structure) {
            for (var s in this.unit.army.roster.armies[a].structure[g].slots) {
                if (this.unit.army.roster.armies[a].structure[g].slots[s].unit !== null) {
                    for (var m in this.unit.army.roster.armies[a].structure[g].slots[s].unit.models) {                        
                        if (~this.unit.army.roster.armies[a].structure[g].slots[s].unit.models[m].hasWargear({name:'DeathwingCompanyBanner'})
                            || 
                            ~this.unit.army.roster.armies[a].structure[g].slots[s].unit.models[m].hasWargear({name:'SacredStandart'})
                        ) {
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
};

DA_DeathwingCommandSquad_Standart.prototype.isModelCanChange = function(m, superOption) {
    if (m.modelName != 'DA_DeathwingTerminator') {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)
}




//==============================================================================






var DA_DeathwingCommandSquad_ChangePowerFist = function(o) {
    this.defaultSubOptions = [
        'DA_DeathwingCommandSquad_ChangePowerFist_Chainfist'
    ]
    this.optionName = 'DA_DeathwingCommandSquad_ChangePowerFist';
    this.cost = 0;
    // this.headerText = 'Любая модель может заменить все свое оружие на одно из следующего';
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DeathwingCommandSquad_ChangePowerFist.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DeathwingCommandSquad_ChangePowerFist.prototype.constructor = DA_DeathwingCommandSquad_ChangePowerFist;



DA_RangedWeaponsFabric([{
    'optionName'      : 'DA_DeathwingCommandSquad_ChangePowerFist_Chainfist',
    'cost' : 5,
    'actionTextUp' : 'Любая модель может заменить свой Powerfist на <b>Chainfist</b> <i>за 5 очков</i>',
    addItems : ['Chainfist'],
    removeItems : ['PowerFist'],
    'actionIconUp' : 'PowerFist',
}]);




//==============================================================================



var DA_DeathwingCommandSquad_TerminatorHeavyWargearAll = function(o) {
    this.defaultSubOptions = [
        'DA_DeathwingCommandSquad_TerminatorHeavyWargear',
        'DA_DeathwingCommandSquad_CicloneMissleLauncher',
    ]
    this.optionName = 'DA_DeathwingCommandSquad_TerminatorHeavyWargearAll';
    this.cost = 0;
    this.headerText = 'Одна модель может взять одно из спика Terminator Heavy Weapon';
    WH_OptionSuper.apply(this, arguments);
}
// Унаследовать
DA_DeathwingCommandSquad_TerminatorHeavyWargearAll.prototype = Object.create(WH_OptionSuper.prototype);
// Желательно и constructor сохранить
DA_DeathwingCommandSquad_TerminatorHeavyWargearAll.prototype.constructor = DA_DeathwingCommandSquad_TerminatorHeavyWargearAll;


DA_DeathwingCommandSquad_TerminatorHeavyWargearAll.prototype.canEnable = function(){
    for (var m1 in this.unit.models) {
        for (var w1 in this.unit.models[m1].wargear) {
            if (
                this.unit.models[m1].wargear[w1].createBy
                &&
                this.unit.models[m1].wargear[w1].createBy.superOption
                &&
                ~this.defaultSubOptions.indexOf(this.unit.models[m1].wargear[w1].createBy.superOption.optionName)
            ) {
                return false;
            }
        }
    }
    return WH_OptionSuper.prototype.canEnable.apply(this, arguments);;
};


var DA_DeathwingCommandSquad_TerminatorHeavyWargear = function(o) {
    this.defaultSubOptions = [
        'DA_TerminatorHeavyWargear_HeavyFlamer',
        'DA_TerminatorHeavyWargear_PlasmaCannon',
        'DA_TerminatorHeavyWargear_AssaultCannon',
    ]
    this.optionName = 'DA_DeathwingCommandSquad_TerminatorHeavyWargear';
    this.cost = 0;
    this.headerText = 'Заменить Storm bolter на одно из мледущего';
    this.isModelCanGet =  function(m, superOption) {
        return this.canEnable();
    }

    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DeathwingCommandSquad_TerminatorHeavyWargear.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DeathwingCommandSquad_TerminatorHeavyWargear.prototype.constructor = DA_DeathwingCommandSquad_TerminatorHeavyWargear;





var DA_DeathwingCommandSquad_CicloneMissleLauncher = function(o) {
    this.defaultSubOptions = [
        'DA_TerminatorHeavyWargear_CicloneMissleLauncher',
    ]
    this.optionName = 'DA_DeathwingCommandSquad_CicloneMissleLauncher';
    this.cost = 0;
    this.headerText = 'Без замены Storm bolter';
    this.isModelCanGet =  function(m, superOption) {
        return this.canEnable();
    }

    AddFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DeathwingCommandSquad_CicloneMissleLauncher.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DeathwingCommandSquad_CicloneMissleLauncher.prototype.constructor = DA_DeathwingCommandSquad_CicloneMissleLauncher;






//==============================================================================

//==============================================================================


