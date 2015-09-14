var DA_RavenwingLandSpeederVengeance = function(o) {
	this.unitName = 'DA_RavenwingLandSpeederVengeance';
	this.price = 50;
	this.optionsDefault = [
		'DA_RavenwingLandSpeederVengeance_replace_HeavyBolter',
	];
	this.structureDefault = {
		'RavenwingLandSpeederVengeance' : 1,
	}
    this.defaultUnitWargear = [
        'HeavyBolter',
        'PlasmaStormBattary',
    ];
	this.defaultSpecialRules = [
		'DeepStrike',
		'Ravenwing', 
	];
	WH_Unit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_RavenwingLandSpeederVengeance.prototype = Object.create(WH_Unit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_RavenwingLandSpeederVengeance.prototype.constructor = DA_RavenwingLandSpeederVengeance;
// Методы потомка 
DA_RavenwingLandSpeederVengeance.prototype.visibleName = 'Ravenwing Landspeeder Vengeance';
DA_RavenwingLandSpeederVengeance.prototype.price = 50;
DA_RavenwingLandSpeederVengeance.prototype.pic = 'units_DA/LandspeederVengeance.jpg';


//========================
// Option
//=========================



//==============================================================================


fabric_option_multiChange([
{
    optionName: 'DA_RavenwingLandSpeederVengeance_replace_HeavyBolter',
    cost: 0,
    headerText : 'Может заменить Heavy bolter на одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_RavenwingLandSpeederVengeance_replace_HeavyBolter_to_AssaultCannon',
        cost: 15,
        removeItems: ['HeavyBolter'],
        addItems: ['AssaultCannon'],
    }],
}
]);