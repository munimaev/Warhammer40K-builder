var DA_RavenwingDarkshroud = function(o) {
	this.unitName = 'DA_RavenwingDarkshroud';
	this.price = 80;
	this.optionsDefault = [
		'DA_RavenwingDarkshroud_replace_HeavyBolter',
	];
	this.structureDefault = {
		'RavenwingDarkshroud' : 1,
	}
    this.defaultUnitWargear = [
		'HeavyBolter',
    ];
	this.defaultSpecialRules = [
		'DeepStrike',
		'Ravenwing', 
        'Scout', 
        'Shrouded', 
        'IconOfOldCaliban', 
	];
	WH_Unit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_RavenwingDarkshroud.prototype = Object.create(WH_Unit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_RavenwingDarkshroud.prototype.constructor = DA_RavenwingDarkshroud;
// Методы потомка 
DA_RavenwingDarkshroud.prototype.visibleName = 'Ravenwing Darkshroud';
DA_RavenwingDarkshroud.prototype.price = 80;
DA_RavenwingDarkshroud.prototype.pic = 'units_DA/Darkshroud.jpg';


//========================
// Option
//=========================


//==============================================================================


fabric_option_multiChange([
{
    optionName: 'DA_RavenwingDarkshroud_replace_HeavyBolter',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_RavenwingDarkshroud_replace_HeavyBolter_to_HeavyFlamer',
        cost: 15,
        actionTextUp : 'Можно заменить Heavy bolter на <b>Assault cannon</b> <i>за 15 очков</i>',
        removeItems: ['HeavyBolter'],
        addItems: ['AssaultCannon'],
    }
    ],
}
]);