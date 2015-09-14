var DA_CompanyMaster = function(o) {
	this.unitName = 'DA_CompanyMaster';
	this.price = 90;
	this.optionsDefault = [
        'DA_CompanyMaster_Get',
        'DA_MeleeWeapons_CompanyMaster',
        'DA_RangedWeapons_CompanyMaster',
        'DA_SpecilaIssueWargear',
        'DA_RelicsOfCliban',
        'DA_CompanyMaster_Terminator',
        'DA_CompanyMaster_replacePowerSword',
        'DA_CompanyMaster_TerminatorWeapons_replaceStormBolter',
	];
	
	this.structureDefault = {
		'CompanyMaster' : 1
	}
    this.defaultUnitWargear = [
        'BoltPistol',
        'Chainsword',
        'FragGrenades',
        'KrakGrenades',
        'IronHalo'
    ];
	this.defaultSpecialRules = [
        'Deathwing',
		'GrimResolve',
        'IndependentCharacter',
	];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_CompanyMaster.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_CompanyMaster.prototype.constructor = DA_CompanyMaster;
// Методы потомка 
DA_CompanyMaster.prototype.visibleName = 'Company master';
DA_CompanyMaster.prototype.pic = 'units_DA/CompanyMaster.jpg';


var DA_MeleeWeapons_CompanyMaster = function(o) {
    this.optionName = 'DA_MeleeWeapons_CompanyMaster';
    this.headerText = 'Может заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из списка Melee Weapons';
    this.isWargearToChange = function(w,m) {
        if (~m.hasWargear({'name':'TerminatorArmour'})) {
            return false;
        }
        if ((w.wargearName == 'Boltgun' 
            || w.wargearName == 'BoltPistol' 
            || w.wargearType == 'PowerWeapon'
            || w.wargearType == 'MeleeWeapon' 
            ) && w.createBy === m
        ) {
            return true;
        }
        return false;
    }
    DA_MeleeWeapons.apply(this, arguments);
}
// Унаследовать
DA_MeleeWeapons_CompanyMaster.prototype = Object.create(DA_MeleeWeapons.prototype);
// Желательно и constructor сохранить
DA_MeleeWeapons_CompanyMaster.prototype.constructor = DA_MeleeWeapons_CompanyMaster;




var DA_RangedWeapons_CompanyMaster = function(o) {
    this.optionName = 'DA_RangedWeapons_CompanyMaster';
    this.headerText = 'Может заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из списка Ranged Weapons';
    this.isWargearToChange = function(w,m) {
        if (~m.hasWargear({'name':'TerminatorArmour'})) {
            return false;
        }
        if ((w.wargearName == 'Boltgun' 
            || w.wargearName == 'BoltPistol' 
            || w.wargearType == 'MeleeWeapon'
            ) && w.createBy === m
        ) {
            return true;
        }
        return false;
    }

    DA_RangedWeapons.apply(this, arguments);
}
// Унаследовать
DA_RangedWeapons_CompanyMaster.prototype = Object.create(DA_RangedWeapons.prototype);
// Желательно и constructor сохранить
DA_RangedWeapons_CompanyMaster.prototype.constructor = DA_RangedWeapons_CompanyMaster;




fabric_option_multiChange([{
    optionName: 'DA_CompanyMaster_Change',
    cost: 0,    
    headerText: 'Может заменить свой Chainsword на одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_CompanyMaster_Change_RelicBlade',
        cost: 25,
        removeItems: ['Chainsword'],
        addItems: ['RelicBlade'],
    }]
},{
    optionName: 'DA_CompanyMaster_Get',
    cost: 0,
    headerText: 'Может взять следующее',
    defaultSubOptions: [{
        optionName: 'DA_CompanyMaster_Get_StormShield',
        cost: 15,
        addItems: ['StormShield'],
    },{
        optionName: 'DA_CompanyMaster_Get_ArtificerArmor',
        cost: 20,
        addItems: ['ArtificerArmor'],
    }]
},{
    optionName: 'DA_CompanyMaster_Terminator',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_CompanyMaster_Terminator_Armor',
        actionTextUp: 'Company Master может заменить bolt pistol, frag grenades и krak grenades на <b>Terminator armour</b> и <b>Power sword</b> <i>за 25 очков</i><br><small>Company Master в Terminator armour не может барть оружие из списка Ranged Weapon и списка Melee Weapon</small>',
        cost: 30,
        addItems: ['TerminatorArmour','StormBolter','PowerSword'],
        removeItems: ['BoltPistol','Chainsword','KrakGrenades','FragGrenades'],
    }],
    canEnable : [{
        type:'hasWargearOfAnoterOption',
        optionName:['DA_RangedWeapons','DA_MeleeWeapons']
    }],
    isModelCanChange : [{
        type : 'ifThereIsNoItem',
        items : ['SpaceMarineBike','PowerFist']
    }],
    isBlocked : [{
        type:'hasWargearOfAnoterOption',
        optionName:[
            'DA_MeleeWeapons',
            'DA_RangedWeapons',
            'DA_TerminatorWeapons_replaceStormBolter',
            'DA_TerminatorWeapons_powerWeaponReplace'
        ],
    }]

},{
    optionName: 'DA_CompanyMaster_replacePowerSword',
    cost: 0,
    headerText: 'Company Master в Terminator armour может заменить свой Power sword на одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_CompanyMaster_replacePowerSword_PowerSword',
        cost: 10,
        removeItems: ['PowerSword'],
        addItems: ['RelicBlade'],
    }],
    isModelCanChange : [{
        type : 'ifThereIsHasItem',
        items : ['TerminatorArmour']
    }]
},{
    optionName: 'DA_CompanyMaster_TerminatorWeapons_replaceStormBolter',
    cost: 0,
    headerText: 'Company Master в Terminator armour может заменить свой Storm bolter на одно из списка Terminator Weapon',
    defaultSubOptions: [{
        optionName: 'DA_CompanyMaster_TerminatorWeapon_CombiMelta',
        cost: 5,
        removeItems: ['StormBolter'],
        addItems: ['CombiMelta'],
    },{
        optionName: 'DA_CompanyMaster_TerminatorWeapon_CombiPlasma',
        cost: 5,
        removeItems: ['StormBolter'],
        addItems: ['CombiPlasma'],
    },{
        optionName: 'DA_CompanyMaster_TerminatorWeapon_CombiFlamer',
        cost: 5,
        removeItems: ['StormBolter'],
        addItems: ['CombiFlamer'],
    },{
        optionName: 'DA_CompanyMaster_TerminatorWeapon_LightnoingClaws',
        cost: 10,
        removeItems: ['StormBolter'],
        addItems: ['LightningClaws'],
    },{
        optionName: 'DA_CompanyMaster_TerminatorWeapon_ThunderHammer',
        cost: 15,
        removeItems: ['StormBolter'],
        addItems: ['ThunderHammer'],
    }],
    isModelCanChange : [{
        type : 'ifThereIsHasItem',
        items : ['TerminatorArmour']
    }]
}]);



