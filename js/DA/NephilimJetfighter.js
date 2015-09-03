var DA_NephilimJetfighter = function(o) {
	this.unitName = 'DA_NephilimJetfighter';
	this.price = 170;
	this.optionsDefault = [
		'DA_NephilimJetfighter_replace_HeavyBolter',
	];
	this.structureDefault = {
		'NephilimJetfighter' : 1,
	}
    this.defaultUnitWargear = [
        'TwinLinkedHeavyBolter',
        'AvengerMegaBolter',
        'SixBlackswordMissiles',
    ];
	this.defaultSpecialRules = [
		'MissileLock',
		'Ravenwing', 
        'StrafingRun', 
        'UnrelentningHunter', 
	];
	WHUnit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_NephilimJetfighter.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_NephilimJetfighter.prototype.constructor = DA_NephilimJetfighter;
// Методы потомка 
DA_NephilimJetfighter.prototype.visibleName = 'Nephilim Jetfighter';
DA_NephilimJetfighter.prototype.price = 170;


//========================
// Option
//=========================


//==============================================================================


fabric_option_multiChange([
{
    optionName: 'DA_NephilimJetfighter_replace_HeavyBolter',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_NephilimJetfighter_replace_HeavyBolter_to_HeavyFlamer',
        cost: 5,
        actionTextUp : 'Можно заменить Avenger mega bolter на <b>Twin-linked lascannon</b> <i>за 5 очков</i>',
        removeItems: ['AvengerMegaBolter'],
        addItems: ['TwinLinkedLascannon'],
    }
    ],
}
]);