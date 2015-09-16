var DA_Whirlwind = function(o) {
	this.unitName = 'DA_Whirlwind';
	this.price = 65;
	this.optionsDefault = [
		'DA_Whirlwind_addWhirlwind',
		'DA_VehicleEquipment',
	];
	this.structureDefault = {
		'Whirlwind' : 1,
	}
    this.defaultUnitWargear = [
		'DemolisherCannon',
		'Searchlight',
		'SmokeLounchers',
    ];
	this.defaultSpecialRules = [
		'LinebreakerBombardment',
		// 'CombatSquad', 
		// 'GrimResolve', 
	];
	WH_Unit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_Whirlwind.prototype = Object.create(WH_Unit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_Whirlwind.prototype.constructor = DA_Whirlwind;
// Методы потомка 
DA_Whirlwind.prototype.visibleName = 'Whirlwind';
DA_Whirlwind.prototype.price = 65;
DA_Whirlwind.prototype.pic = 'units_DA/SpaceMarinesWhirlwind.jpg';


//========================
// Option
//=========================


WH_OptionAddModelFabric([{
    'optionName' : 'DA_Whirlwind_addWhirlwind',
    'cost' : 65,
    'maxCountAdding' : 2,
    'modelToAdd' : 'Whirlwind',
}]);

//==============================================================================
