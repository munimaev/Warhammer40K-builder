var DA_Chaplain = function(o) {
	this.unitName = 'DA_Chaplain';
	this.price = 90;
	this.optionsDefault = [
        'DA_MeleeWeapons',
        'DA_RangedWeapons',
        'DA_SpecilaIssueWargear',
        'DA_Chaplain_Get'
	];
	
	this.structureDefault = {
		'Chaplain' : 1
	}
    this.defaultUnitWargear = [
        'BoltPistol',
        'CroziusArcanum',
        'FragGrenades',
        'KrakGrenades',
        'Rosarius'
    ];
	this.defaultSpecialRules = [
		'GrimResolve',
        'IndependentCharacter',
        'Zealot'
	];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_Chaplain.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
DA_Chaplain.prototype.constructor = DA_Chaplain;
// Методы потомка 
DA_Chaplain.prototype.visibleName = 'Chaplain';





fabric_option_multiChange([{
    optionName: 'DA_Chaplain_Get',
    cost: 0,
    // headerText: 'Один Ravenwing Black Knight в армии может взять одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_Chaplain_Get_Bike',
        cost: 20,
        actionTextUp: 'Chaplain может взять <b>Space marine bike</b> <i>за 20 очков</i>',
        addItems: ['SpaceMarineBike'],
    }]
}]);



var DA_Chaplain_MeleeWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_MeleeWeapons_Chainsword',
        'DA_MeleeWeapons_LightningClaws',
        'DA_MeleeWeapons_PowerWeapon',
        'DA_MeleeWeapons_PowerFist',
        'DA_MeleeWeapons_ThunderHammer',
    ]
    this.optionName = 'DA_Chaplain_MeleeWeapons';
    this.cost = 0;
    this.headerText = 'Chaplain может заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из cледующего';
    this.isWargearToChange = function(w,m) {
        if ((w.wargearName == 'Boltgun' 
            || w.wargearName == 'BoltPistol' 
            || w.wargearType == 'MeleeWeapon'
            ) && w.createBy === m
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_Chaplain_MeleeWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_Chaplain_MeleeWeapons.prototype.constructor = DA_Chaplain_MeleeWeapons;


