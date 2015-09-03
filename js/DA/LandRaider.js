var DA_LandRaider = function(o) {
	this.unitName = 'DA_LandRaider';
	this.price = 250;
	this.optionsDefault = [
		'DA_VehicleEquipment',
		'DA_LandRaider_addWeapon'
	];
	this.structureDefault = {
		'LandRaider' : 1,
	}
    this.defaultUnitWargear = [
		'TwinLinkedHeavyBolter',
		'TwinLinkedLascannon',
		'TwinLinkedLascannon',
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
DA_LandRaider.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_LandRaider.prototype.constructor = DA_LandRaider;
// Методы потомка 
DA_LandRaider.prototype.visibleName = 'Land raider';
DA_LandRaider.prototype.price = 250;


//========================
// Option
//=========================


//==============================================================================





var DA_LandRaider_addWeapon = function(o) {
    this.defaultSubOptions = [
        'DA_LandRaider_addWeapon_MultiMelta',
    ]
    this.optionName = 'DA_LandRaider_addWeapon';
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
DA_LandRaider_addWeapon.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_LandRaider_addWeapon.prototype.constructor = DA_LandRaider_addWeapon;


DA_RangedWeaponsFabric([{
    'optionName'      : 'DA_LandRaider_addWeapon_MultiMelta',
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






