var Sableclaws = function(o) {
	this.unitName = 'Sableclaws';
	this.price = 200;
	this.optionsDefault = [
	];
	
	this.structureDefault = {
		'Sableclaw' : 1
	}
    this.defaultUnitWargear = [
        'TwinLinkedAssaultCannon',
        'TwinLinkedHeavyBolter',
        'IronHalo',
        'RavenSword',
    ];
    this.defaultSpecialRules = [
        'DeepStrike',
        'GrimResolve',
        'Ravenwing',
        'Scout',
        'SkilledRider',
    ];
    this.defaultWarlordTrait = [
        'RapidManoevre'
    ];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
Sableclaws.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
Sableclaws.prototype.constructor = Sableclaws;
// Методы потомка 
Sableclaws.prototype.visibleName = 'Sableclaw';
Sableclaws.prototype.unique = ['Sammaels','Sableclaws'];
Sableclaws.prototype.pic = 'units_DA/LandspeederVengeance.jpg';


