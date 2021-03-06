var Belials = function(o) {
	this.unitName = 'Belials';
	this.price = 190;
	this.optionsDefault = [
		'BelialsWeaponReplace'
	];
	
	this.structureDefault = {
		'Belial' : 1
	}
    this.defaultUnitWargear = [
    	'TerminatorArmour',
    	'StormBolter',
    	'SwordOfSilence',
    	'IronHalo',
    	'TeleportHommer',
    ];
	this.defaultSpecialRules = [
		'Deathwing',
		'GrimResolve', 
		'IndependentCharacter', 
		'MarkedForRetribution', 
		'TacticalPrecision',
	];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
Belials.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
Belials.prototype.constructor = Belials;
// Методы потомка 
Belials.prototype.visibleName = 'Belial';
Belials.prototype.unique = ['Belials'];
Belials.prototype.pic = 'units_DA/Belials.jpg';





var BelialsWeaponReplace = function(o) {
	this.headerText = 'Можно заменить StormBolter и Sword Of Silence на одно из следующего';
	this.optionName = 'BelialsWeaponReplace';
    this.defaultSubOptions = [
        'Belial_WeaponReplaceClaws',
        'Belial_WeaponReplaceHammer',
    ]
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
BelialsWeaponReplace.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
BelialsWeaponReplace.prototype.constructor = BelialsWeaponReplace;




DA_RangedWeaponsFabric([
{
    optionName: 'Belial_WeaponReplaceClaws',
    cost: 5,
    removeItems : ['StormBolter','SwordOfSilence'],
    addItems : ['LightningClaws','LightningClaws'],
},
{
    optionName: 'Belial_WeaponReplaceHammer',
    cost: 5,
    removeItems : ['StormBolter','SwordOfSilence'],
    addItems : ['ThunderHammer','StormShield'],
}
]);

