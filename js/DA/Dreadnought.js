var DA_Dreadnoughts = function(o) {
	this.unitName = 'DA_Dreadnoughts';
	this.price = 100;
	this.optionsDefault = [
		'DA_ScoutSquad_addDreadnought',
		'DA_Dreadnoughts_DreadnoughrWeapon',
		'DA_Dreadnoughts_ReplaceFist',
		'DA_DreadnughtEquipment',
		'DA_Dreadnought_DedicatedTransport',
	];
	this.structureDefault = {
		'DA_Dreadnought' : 1,
	}
    this.defaultUnitWargear = [
    	'MultiMelta',
    	'PowerFistWithBuildInHeavyBolter',
        'Searchlight',
        'SmokeLounchers',
    ];
	this.defaultSpecialRules = [
		'AssaultVehicle',
		'PowerOfTheMashineSpirit', 
	];
	WH_Unit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_Dreadnoughts.prototype = Object.create(WH_Unit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_Dreadnoughts.prototype.constructor = DA_Dreadnoughts;
// Методы потомка 
DA_Dreadnoughts.prototype.visibleName = 'Dreadnought';
DA_Dreadnoughts.prototype.pic = 'units_DA/SpaceMarineDreadnought.jpg';
DA_Dreadnoughts.prototype.price = 35;



//==============================================================================


WH_OptionAddModelFabric([{
    'optionName' : 'DA_ScoutSquad_addDreadnought',
    'cost' : 100,
    'maxCountAdding' : 2,
    'modelToAdd' : 'DA_Dreadnought',
    'funCanEnable' : function() {
    	if (this.unit.dedicatedTransport) {
    		return false;
    	}
	    return WH_OptionAdditionalModel.prototype.canEnable(this, arguments)
    }
}]);


//==============================================================================





var DA_Dreadnoughts_DreadnoughrWeapon = function(o) {
    this.defaultSubOptions = [
        'DA_DreadnoughrWeapon_TwinLinkedAutoCannon',
        'DA_DreadnoughrWeapon_TwinLinkedHeavyBolter',
        'DA_DreadnoughrWeapon_TwinLinkedHeavyFlamer',
        'DA_DreadnoughrWeapon_PlasmaCannon',
        'DA_DreadnoughrWeapon_AssaultCannon',
        'DA_DreadnoughrWeapon_TwinLinkedLascannon',
    ]
    this.optionName = 'DA_Dreadnoughts_DreadnoughrWeapon';
    this.cost = 0;
    this.headerText = 'Любая модель может заменить Multi-Melta на одно из мледющего';
    this.isWargearToChange = function(w,m) {

        if (w.wargearName == 'MultiMelta'
            && w.createBy === m
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_Dreadnoughts_DreadnoughrWeapon.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_Dreadnoughts_DreadnoughrWeapon.prototype.constructor = DA_Dreadnoughts_DreadnoughrWeapon;


DA_RangedWeaponsFabric([

{
    'optionName'      : 'DA_DreadnoughrWeapon_TwinLinkedAutoCannon',
    'optionNameInModel' : 'TwinLinkedAutoCannon',
    'cost' : 5,
    'changeTo' : 'TwinLinkedAutoCannon',
    'actionTextUp' : '<b>TwinLinkedAutoCannon</b> <i>за 5 очков</i>',
    'actionTextDown' : 'Удалить TwinLinkedAutoCannon'
}, {
    'optionName'      : 'DA_DreadnoughrWeapon_TwinLinkedHeavyBolter',
    'optionNameInModel' : 'TwinLinkedHeavyBolter',
    'cost' : 5,
    'changeTo' : 'TwinLinkedHeavyBolter',
    'actionTextUp' : '<b>TwinLinkedHeavyBolter</b> <i>за 5 очков</i>',
    'actionTextDown' : 'Удалить TwinLinkedHeavyBolter'
}, {
    'optionName'      : 'DA_DreadnoughrWeapon_TwinLinkedHeavyFlamer',
    'optionNameInModel' : 'TwinLinkedHeavyFlamer',
    'cost' : 5,
    'changeTo' : 'TwinLinkedHeavyFlamer',
    'actionTextUp' : '<b>TwinLinkedHeavyFlamer</b> <i>за 5 очков</i>',
    'actionTextDown' : 'Удалить TwinLinkedHeavyFlamer'
}, {
    'optionName'      : 'DA_DreadnoughrWeapon_PlasmaCannon',
    'optionNameInModel' : 'PlasmaCannon',
    'cost' : 5,
    'changeTo' : 'PlasmaCannon',
    'actionTextUp' : '<b>PlasmaCannon</b> <i>за 5 очков</i>',
    'actionTextDown' : 'Удалить PlasmaCannon'
}, {
    'optionName'      : 'DA_DreadnoughrWeapon_AssaultCannon',
    'optionNameInModel' : 'AssaultCannon',
    'cost' : 10,
    'changeTo' : 'AssaultCannon',
    'actionTextUp' : '<b>AssaultCannon</b> <i>за 10 очков</i>',
    'actionTextDown' : 'Удалить AssaultCannon'
}, {
    'optionName'      : 'DA_DreadnoughrWeapon_TwinLinkedLascannon',
    'optionNameInModel' : 'TwinLinkedLascannon',
    'cost' : 15,
    'changeTo' : 'TwinLinkedLascannon',
    'actionTextUp' : '<b>TwinLinkedLascannon</b> <i>за 15 очков</i>',
    'actionTextDown' : 'Удалить TwinLinkedLascannon'
}, 

]);




//==============================================================================




var DA_Dreadnoughts_ReplaceFist = function(o) {
    this.defaultSubOptions = [
        'DA_DreadnoughrWeapon_ReplaceFist_MissleLuauncher',
        'DA_DreadnoughrWeapon_ReplaceFist_TwinLinkedAutoCannon',
        'DA_DreadnoughrWeapon_ReplaceFist_PowerFistWithBuildInHeavyFlamer',
    ]
    this.optionName = 'DA_Dreadnoughts_ReplaceFist';
    this.cost = 0;
    this.headerText = 'Любая модель может заменить Power fist with build in Heavy-Bolter на одно из мледющего';
    this.isWargearToChange = function(w,m) {

        if (w.wargearName == 'PowerFistWithBuildInHeavyBolter'
            && w.createBy === m
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_Dreadnoughts_ReplaceFist.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_Dreadnoughts_ReplaceFist.prototype.constructor = DA_Dreadnoughts_ReplaceFist;




DA_RangedWeaponsFabric([

{
    'optionName'      : 'DA_DreadnoughrWeapon_ReplaceFist_MissleLuauncher',
    'optionNameInModel' : 'MissleLuauncher',
    'cost' : 10,
    'changeTo' : 'MissleLuauncher',
    'actionTextUp' : '<b>MissleLuauncher</b> <i>за 10 очков</i>',
    'actionTextDown' : 'Убрать MissleLuauncher'
}, {
    'optionName'      : 'DA_DreadnoughrWeapon_ReplaceFist_TwinLinkedAutoCannon',
    'optionNameInModel' : 'TwinLinkedAutoCannon',
    'cost' : 15,
    'changeTo' : 'TwinLinkedAutoCannon',
    'actionTextUp' : '<b>TwinLinkedAutoCannon</b> <i>за 15 очков</i>',
    'actionTextDown' : 'Убрать TwinLinkedAutoCannon'
}, {
    'optionName'      : 'DA_DreadnoughrWeapon_ReplaceFist_PowerFistWithBuildInHeavyFlamer',
    'optionNameInModel' : 'PowerFistWithBuildInHeavyFlamer',
    'cost' : 10,
    'changeTo' : 'PowerFistWithBuildInHeavyFlamer',
    'actionTextUp' : '<b>PowerFistWithBuildInHeavyFlamer</b> <i>за 10 очков</i>',
    'actionTextDown' : 'Убрать PowerFistWithBuildInHeavyFlamer'
}, 

]);
//==============================================================================





var DA_DreadnughtEquipment = function(o) {
    this.defaultSubOptions = [
        'DA_DreadnoughtEquipment_ExtraArmour',
    ]
    this.optionName = 'DA_DreadnughtEquipment';
    this.cost = 0;
    this.headerText = 'Можно взять следующее';
    this.isModelCanGet =  function(m, superOption) {
        for (var i in m.wargear) {
            //Каждая подопция может быть взята отдельно
            if (m.wargear[i].createBy === superOption
                 && m.wargear[i].wargearName !== 'emptySlot'
            ) {
                return false;
            }
        }
        return true;
    }

    AddFromWargear_class.apply(this, arguments);
}

// Унаследовать
DA_DreadnughtEquipment.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DreadnughtEquipment.prototype.constructor = DA_VehicleEquipment;


DA_RangedWeaponsFabric([
{
    'optionName' : 'DA_DreadnoughtEquipment_ExtraArmour',
    'optionNameInModel' : 'ExtraArmour',
    'cost': 10,
    'changeTo' : 'ExtraArmour',
    'actionTextUp' : '<b>ExtraArmour</b> <i>за 10 очков.</i>',
    'actionTextDown': 'Убрать ExtraArmour'
}
]);






//==============================================================================

var DA_Dreadnought_DedicatedTransport = function(o) {
	this.headerText = 'Если в отряде нет дополнительных Dreadnout, отряд может выбрать в качестве прикомандированного транспорта одно из следующего';
	this.optionName = 'DA_Dreadnought_DedicatedTransport';
    this.defaultSubOptions = [
        'DA_Dreadnought_DedicatedTransport_DropPod'
    ]
    OptionSelect.apply(this, arguments);
}
// Унаследовать
DA_Dreadnought_DedicatedTransport.prototype = Object.create(OptionSelect.prototype);
// Желательно и constructor сохранить
DA_Dreadnought_DedicatedTransport.prototype.constructor = DA_Dreadnought_DedicatedTransport;


var DA_Dreadnought_DedicatedTransport_DropPod = function(o) {
	this.optionName = 'DA_Dreadnought_DedicatedTransport_DropPod';
	this.actionText = '<b>Drop Pod</b> за <i>' + DA_DropPod.prototype.price+'</i>';
	this.dedicatedUnitName = 'DA_DropPod';
    DedicatedTransport_suboption.apply(this, arguments);

}
// Унаследовать
DA_Dreadnought_DedicatedTransport_DropPod.prototype = Object.create(DedicatedTransport_suboption.prototype);
// Желательно и constructor сохранить
DA_Dreadnought_DedicatedTransport_DropPod.prototype.constructor = DA_Dreadnought_DedicatedTransport_DropPod;

DA_Dreadnought_DedicatedTransport_DropPod.prototype.canEnable = function() {
	if (this.unit.models.length > 1) {
		return false;
	}
	return DedicatedTransport_suboption.prototype.canEnable.apply(this, arguments)
	
}


//==============================================================================


