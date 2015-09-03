var DA_RavenwingDarkTalon = function(o) {
	this.unitName = 'DA_RavenwingDarkTalon';
	this.price = 160;
	this.optionsDefault = [
	];
	this.structureDefault = {
		'RavenwingDarkTalon' : 1,
	}
    this.defaultUnitWargear = [
        'HurricaneBolter',
        'HurricaneBolter',
        'RiftCannon',
        'StasisBomb'
    ];
	this.defaultSpecialRules = [
		'Ravenwing', 
        'StrafingRun', 
	];
	WHUnit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_RavenwingDarkTalon.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_RavenwingDarkTalon.prototype.constructor = DA_RavenwingDarkTalon;
// Методы потомка 
DA_RavenwingDarkTalon.prototype.visibleName = 'Ravenwing DarkTalon';
DA_RavenwingDarkTalon.prototype.price = 160;


//========================
// Option
//=========================


//==============================================================================
