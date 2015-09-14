
var DA_Rhino = function(o) {
	this.unitName = 'DA_Rhino';
	this.optionsDefault = [
		'DA_VehicleEquipment'
	];
	this.structureDefault = {
		'Rhino' : 1,
	}
    this.defaultUnitWargear = [
		'StormBolter',
		'Searchlight',
		'SmokeLounchers',
    ];
	this.defaultSpecialRules = [
		// 'Repair', 
	];
	WH_Unit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_Rhino.prototype = Object.create(WH_Unit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_Rhino.prototype.constructor = DA_Rhino;
// Методы потомка 
DA_Rhino.prototype.visibleName = 'Rhino';
DA_Rhino.prototype.price = 35;
DA_Rhino.prototype.pic = 'units_DA/SpaceMarineRhino.jpg';

