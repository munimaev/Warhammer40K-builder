var DA_Vindicator = function(o) {
	this.unitName = 'DA_Vindicator';
	this.price = 120;
	this.optionsDefault = [
		'DA_Vindicator_addVindicator',
		'DA_Vindicator_MayTake',
		'DA_VehicleEquipment',
	];
	this.structureDefault = {
		'Vindicator' : 1,
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
DA_Vindicator.prototype = Object.create(WH_Unit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_Vindicator.prototype.constructor = DA_Vindicator;
// Методы потомка 
DA_Vindicator.prototype.visibleName = 'Vindicator';
DA_Vindicator.prototype.price = 120;
DA_Vindicator.prototype.pic = 'units_DA/SpaceMarinesVindicator.jpg';


//========================
// Option
//=========================


WH_OptionAddModelFabric([{
    'optionName' : 'DA_Vindicator_addVindicator',
    'cost' : 120,
    'maxCountAdding' : 2,
    'modelToAdd' : 'Vindicator',
}]);

//==============================================================================

fabric_option_multiChange([
{
    optionName: 'DA_Vindicator_MayTake',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_Vindicator_MayTake_SiegeShield',
        cost: 25,
        removeItems: [],
        actionTextUp: 'Любой Vindicator может взять <b>Siege shield</b> <i>по 10 очков за модель</i>',
        addItems: ['SiegeShield'],
    }, ]
}
]);