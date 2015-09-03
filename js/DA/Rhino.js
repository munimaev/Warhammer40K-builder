
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
	WHUnit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_Rhino.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_Rhino.prototype.constructor = DA_Rhino;
// Методы потомка 
DA_Rhino.prototype.visibleName = 'Rhino';
DA_Rhino.prototype.price = 35;

