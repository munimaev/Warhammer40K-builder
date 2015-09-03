var DA_InterrogatorChaplain = function(o) {
	this.unitName = 'DA_InterrogatorChaplain';
	this.price = 110;
	this.optionsDefault = [
        'DA_MeleeWeapons_InterrogatorChaplain',
        'DA_RangedWeapons_InterrogatorChaplain',
        'DA_SpecilaIssueWargear',
        'DA_RelicsOfCliban',
        'DA_InterrogatorChaplain_Get',
        'DA_InterrogatorChaplain_Terminator',
        'DA_TerminatorWeapons_replaceStormBolter',
        'DA_TerminatorWeapons_powerWeaponReplace'
	];
	
	this.structureDefault = {
		'InterrogatorChaplain' : 1
	}
    this.defaultUnitWargear = [
        'BoltPistol',
        'CroziusArcanum',
        'FragGrenades',
        'KrakGrenades',
        'Rosarius'
    ];
	this.defaultSpecialRules = [
        'Deathwing',
        'Fear',
		'GrimResolve',
        'IndependentCharacter',
        'PreferredEnemy_ChaosSpaceMarine',
        'Zealot'
	];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_InterrogatorChaplain.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
DA_InterrogatorChaplain.prototype.constructor = DA_InterrogatorChaplain;
// Методы потомка 
DA_InterrogatorChaplain.prototype.visibleName = 'InterrogatorChaplain';




var DA_MeleeWeapons_InterrogatorChaplain = function(o) {
    this.optionName = 'DA_MeleeWeapons_InterrogatorChaplain';
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
DA_MeleeWeapons_InterrogatorChaplain.prototype = Object.create(DA_MeleeWeapons.prototype);
// Желательно и constructor сохранить
DA_MeleeWeapons_InterrogatorChaplain.prototype.constructor = DA_MeleeWeapons_InterrogatorChaplain;




var DA_RangedWeapons_InterrogatorChaplain = function(o) {
    this.optionName = 'DA_RangedWeapons_InterrogatorChaplain';
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
DA_RangedWeapons_InterrogatorChaplain.prototype = Object.create(DA_RangedWeapons.prototype);
// Желательно и constructor сохранить
DA_RangedWeapons_InterrogatorChaplain.prototype.constructor = DA_RangedWeapons_InterrogatorChaplain;




fabric_option_multiChange([{
    optionName: 'DA_InterrogatorChaplain_Get',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_InterrogatorChaplain_Get_PowerFist',
        cost: 25,
        addItems: ['PowerFist'],
    },{
        optionName: 'DA_InterrogatorChaplain_Get_Bike',
        cost: 20,
        addItems: ['SpaceMarineBike'],
    }]
},{
    optionName: 'DA_InterrogatorChaplain_Terminator',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_InterrogatorChaplain_Terminator_Armor',
        actionTextUp: 'Interrogator-Chaplain может заменить bolt pistol, frag grenades и krak grenades на <b>Terminator armour</b> <i>за 25 очков</i><br><small>Если Space marine bike или Power fist не взят. Interrogator-Chaplain в Terminator armour не может барть оружие из списка Ranged Weapon и списка Melee Weapon</small>',
        cost: 30,
        addItems: ['TerminatorArmour','StormBolter'],
        removeItems: ['BoltPistol','KrakGrenades','FragGrenades'],
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
    optionName: 'DA_TerminatorWeapons_replaceStormBolter',
    cost: 0,
    headerText: 'Interrogator-Chaplain в Terminator armour может заменить свой Storm bolter на одно из списка Terminator Weapon',
    defaultSubOptions: [{
        optionName: 'DA_InterrogatorChaplain_TerminatorWeapon_CombiMelta',
        cost: 5,
        removeItems: ['StormBolter'],
        addItems: ['CombiMelta'],
    },{
        optionName: 'DA_InterrogatorChaplain_TerminatorWeapon_CombiPlasma',
        cost: 5,
        removeItems: ['StormBolter'],
        addItems: ['CombiPlasma'],
    },{
        optionName: 'DA_InterrogatorChaplain_TerminatorWeapon_CombiFlamer',
        cost: 5,
        removeItems: ['StormBolter'],
        addItems: ['CombiFlamer'],
    },{
        optionName: 'DA_InterrogatorChaplain_TerminatorWeapon_LightnoingClaws',
        cost: 10,
        removeItems: ['StormBolter'],
        addItems: ['LightningClaws'],
    },{
        optionName: 'DA_InterrogatorChaplain_TerminatorWeapon_ThunderHammer',
        cost: 15,
        removeItems: ['StormBolter'],
        addItems: ['ThunderHammer'],
    }],
    isModelCanChange : [{
        type : 'ifThereIsHasItem',
        items : ['TerminatorArmour']
    }]
}]);



