var DA_Librarian = function(o) {
	this.unitName = 'DA_Librarian';
	this.price = 65;
	this.optionsDefault = [
		'DA_Upgrade_ML1_to_ML2',
        'DA_Upgrade_ML1_to_ML3',
        'DA_Librarian_RangedWeapons',
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
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_Librarian.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
DA_Librarian.prototype.constructor = DA_Librarian;
// Методы потомка 
DA_Librarian.prototype.visibleName = 'Librarian';





fabric_option_unitMayTake([
{
    optionName : 'DA_Upgrade_ML1_to_ML2',
    cost : 25,
    removeItems : ['Psyker_ML1'],
    addItems : ['Psyker_ML2'],
},
{
    optionName : 'DA_Upgrade_ML1_to_ML3',
    cost : 50,
    removeItems : ['Psyker_ML1'],
    addItems : ['Psyker_ML3'],
}
]);




var DA_Librarian_RangedWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_RangedWeapons',
    ]
    this.optionName = 'DA_Librarian_RangedWeapons';
    this.cost = 0;
    WHOptionSuper.apply(this, arguments);
}
// Унаследовать
DA_Librarian_RangedWeapons.prototype = Object.create(WHOptionSuper.prototype);
// Желательно и constructor сохранить
DA_Librarian_RangedWeapons.prototype.constructor = DA_Librarian_RangedWeapons;

DA_Librarian_RangedWeapons.prototype.isBlocked = function(){
    if (~this.unit.models[0].hasWargear({name:'TerminatorArmour'})) {
        return true;
    }
    return false;
    return WHOptionSuper.prototype.canEnable.apply(this,arguments);
};



fabric_option_multiChange([{
    optionName: 'DA_Librarian_Get',
    cost: 0,
    // headerText: 'Один Ravenwing Black Knight в армии может взять одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_Librarian_Get_Bike',
        cost: 20,
        actionTextUp: 'Librarian может взять <b>Space marine bike</b> <i>за 20 очков</i>',
        addItems: ['SpaceMarineBike'],
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
    }]
},{
    optionName: 'DA_Librarian_Terminator_Weapon',
    cost: 0,
    headerText: 'Librarian в Terminator armour может взять одно из следующего',
    defaultSubOptions: [
        'DA_SpecilaIssueWargear_Auspex',
        'DA_SpecilaIssueWargear_CombatShield',
        'DA_SpecilaIssueWargear_MeltaBomb',
        'DA_SpecilaIssueWargear_DigitalWeapon',
        'DA_SpecilaIssueWargear_JumpPack',
        'DA_SpecilaIssueWargear_ConversionField',
    ],
    isModelCanChange : [{
        type : 'ifThereIsHasItem',
        items : ['TerminatorArmour']
    },{
        type: 'modelCanTakeOnlyOneSubotion',
    }]
}
]);
