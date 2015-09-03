var DA_LandRaiderRedeemer = function(o) {
	this.unitName = 'DA_LandRaiderRedeemer';
	this.price = 240;
	this.optionsDefault = [
		'DA_VehicleEquipment',
		'DA_LandRaiderRedeemer_addWeapon'
	];
	this.structureDefault = {
		'LandRaider' : 1,
	}
    this.defaultUnitWargear = [
		'TwinLinkedAssaultCannon',
		'FlammerstormCannon',
		'FlammerstormCannon',
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
DA_LandRaiderRedeemer.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_LandRaiderRedeemer.prototype.constructor = DA_LandRaiderRedeemer;
// Методы потомка 
DA_LandRaiderRedeemer.prototype.visibleName = 'Land raider redeemer';
DA_LandRaiderRedeemer.prototype.price = 240;


//========================
// Option
//=========================


//==============================================================================





var DA_LandRaiderRedeemer_addWeapon = function(o) {
    this.defaultSubOptions = [
        'DA_LandRaiderRedeemer_addWeapon_MultiMelta',
    ]
    this.optionName = 'DA_LandRaiderRedeemer_addWeapon';
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
DA_LandRaiderRedeemer_addWeapon.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_LandRaiderRedeemer_addWeapon.prototype.constructor = DA_LandRaiderRedeemer_addWeapon;


DA_RangedWeaponsFabric([{
    'optionName'      : 'DA_LandRaiderRedeemer_addWeapon_MultiMelta',
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





