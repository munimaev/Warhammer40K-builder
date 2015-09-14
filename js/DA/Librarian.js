var DA_Librarian = function(o) {
	this.unitName = 'DA_Librarian';
	this.price = 65;
	this.optionsDefault = [
		'DA_Upgrade_ML1_to_ML2',
        'DA_RangedWeapons_Librarian',
        'DA_SpecilaIssueWargear',
        'DA_RelicsOfCliban',
        'DA_Librarian_Get',
        'DA_Librarian_Terminator',
        'DA_Librarian_Terminator_Weapon'
	];
	
	this.structureDefault = {
		'Librarian' : 1
	}
    this.defaultUnitWargear = [
    	'BoltPistol',
    	'ForceWeapon',
    	'FragGrenades',
    	'KrakGrenades',
    	'PsychicHood',
    ];
    this.defaultSpecialRules = [
        'Deathwing',
        'GrimResolve', 
        'IndependentCharacter', 
        'Psyker_ML1',
    ];
    this.defaultDisciplines = [
        'Daemonology',
        'Divination', 
        'Interromancy', 
        'Pyromancy', 
        'Telekinesis', 
        'Telepathy',
    ];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_Librarian.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_Librarian.prototype.constructor = DA_Librarian;
// Методы потомка 
DA_Librarian.prototype.visibleName = 'Librarian';
DA_Librarian.prototype.pic = 'units_DA/Librarian.jpg';





fabric_option_unitMayTake([
{
    optionName : 'DA_Upgrade_ML1_to_ML2',
    cost : 25,
    removeItems : ['Psyker_ML1'],
    addItems : ['Psyker_ML2'],
},
]);





var DA_RangedWeapons_Librarian = function(o) {
    this.optionName = 'DA_RangedWeapons_Librarian';
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
    DA_RangedWeapons.apply(this, arguments);
}
// Унаследовать
DA_RangedWeapons_Librarian.prototype = Object.create(DA_RangedWeapons.prototype);
// Желательно и constructor сохранить
DA_RangedWeapons_Librarian.prototype.constructor = DA_RangedWeapons_Librarian;




fabric_option_multiChange([{
    optionName: 'DA_Librarian_Get',
    cost: 0,
    // headerText: 'Один Ravenwing Black Knight в армии может взять одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_Librarian_Get_Bike',
        cost: 20,
        actionTextUp: 'Librarian может взять <b>Space marine bike</b> <i>за 20 очков</i>',
        addItems: ['SpaceMarineBike'],
    }],
    isModelCanChange : [{
        type : 'ifThereIsNoItem',
        items : ['TerminatorArmour']
    }]
},{
    optionName: 'DA_Librarian_Terminator',
    cost: 0,
    // headerText: 'Librarian может взять следующего',
    defaultSubOptions: [{
        optionName: 'DA_Librarian_Terminator_Armor',
        actionTextUp: 'Librarian может заменить bolt pistol, frag grenades и krak grenades на <b>Terminator armour</b> <i>за 25 очков</i><br><small>Если Space marine bike не взят. Librarian в Terminator armour не может барть оружие из списка Ranged Weapon</small>',
        cost: 25,
        addItems: ['TerminatorArmour'],
        removeItems: ['BoltPistol','KrakGrenades','FragGrenades']
    }],
    canEnable : [{
        type:'hasWargearOfAnoterOption',
        optionName:['DA_RangedWeapons']
    }],
    isModelCanChange : [{
        type : 'ifThereIsNoItem',
        items : ['SpaceMarineBike']
    }],
    isBlocked : [{
        type:'hasWargearOfAnoterOption',
        optionName:[
            'DA_RangedWeapons_Librarian',
            'DA_Librarian_Terminator_Weapon'
        ],
    }]
},{
    optionName: 'DA_Librarian_Terminator_Weapon',
    cost: 0,
    headerText: 'Librarian в Terminator armour может взять одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_Librarian_Terminator_Weapon_StormBolter',
        cost: 5,
        addItems: ['StormBolter'],
    },{
        optionName: 'DA_Librarian_Terminator_Weapon_CombiFlamer',
        cost: 10,
        addItems: ['CombiFlamer'],
    },{
        optionName: 'DA_Librarian_Terminator_Weapon_CombiPlasma',
        cost: 10,
        addItems: ['CombiPlasma'],
    },{
        optionName: 'DA_Librarian_Terminator_Weapon_CombiMelta',
        cost: 10,
        addItems: ['CombiMelta'],
    },
    ],
    isModelCanChange : [{
        type : 'ifThereIsHasItem',
        items : ['TerminatorArmour']
    },{
        type: 'modelCanTakeOnlyOneSubotion',
    }]
}
]);
