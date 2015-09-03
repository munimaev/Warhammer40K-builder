var DA_LandRaiderCrusader = function(o) {
	this.unitName = 'DA_LandRaiderCrusader';
	this.price = 250;
	this.optionsDefault = [
		'DA_VehicleEquipment',
		'DA_LandRaiderCrusader_addWeapon'
	];
	this.structureDefault = {
		'LandRaider' : 1,
	}
    this.defaultUnitWargear = [
		'TwinLinkedAssaultCannon',
		'HurricaneBolter',
		'HurricaneBolter',
		'FragAssaultCannon',
		'Searchlight',
		'SmokeLounchers',
    ];
	this.defaultSpecialRules = [
		// 'AndTheyShallKnowNoFear',
		// 'CombatSquad', 
		// 'GrimResolve', 
	];
	WHUnit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_LandRaiderCrusader.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_LandRaiderCrusader.prototype.constructor = DA_LandRaiderCrusader;
// Методы потомка 
DA_LandRaiderCrusader.prototype.visibleName = 'Land raider crusader';
DA_LandRaiderCrusader.prototype.price = 250;


//========================
// Option
//=========================


//==============================================================================





var DA_LandRaiderCrusader_addWeapon = function(o) {
    this.defaultSubOptions = [
        'DA_LandRaiderCrusader_addWeapon_MultiMelta',
    ]
    this.optionName = 'DA_LandRaiderCrusader_addWeapon';
    this.cost = 0;
    // this.headerText = 'следующее';
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
DA_LandRaiderCrusader_addWeapon.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_LandRaiderCrusader_addWeapon.prototype.constructor = DA_LandRaiderCrusader_addWeapon;


DA_RangedWeaponsFabric([{
    'optionName'      : 'DA_LandRaiderCrusader_addWeapon_MultiMelta',
    'optionNameInModel': 'Multi-melta',
    'cost' : 10,
    'changeTo' : 'MultiMelta',
    'actionTextUp' : 'Можно взять <b>Multi-melta</b> <i>за 10 очков</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Multi-melta.',
    // 'actionIconDown' : 'rewards1',
}

]);


//==============================================================================





