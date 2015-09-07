var Sammaels = function(o) {
	this.unitName = 'Sammaels';
	this.price = 200;
	this.optionsDefault = [
	];
	
	this.structureDefault = {
		'Sammael' : 1
	}
    this.defaultUnitWargear = [
        'BoltPistol',
        'PlasmaCannon',
        'TwinLinkedStormBolter',
        'FragGrenades',
        'KrakGrenades',
        'IronHalo',
        'TeleportHommer',
    ];
    this.defaultSpecialRules = [
        'EternalWarrior',
        'Fearless',
        'GrimResolve',
        'Hatred_ChaosSpaceMarine',
        'HitAndRun',
        'IndependentCharacter', 
        'Ravenwing',
        'Scout',
        'SkilledRider',
        'SwiftVengeance',
    ];
    this.defaultWarlordTrait = [
        'RapidManoevre'
    ];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
Sammaels.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
Sammaels.prototype.constructor = Sammaels;
// Методы потомка 
Sammaels.prototype.visibleName = 'Sammael';
Sammaels.prototype.unique = ['Sammaels','Sableclaws'];
Sammaels.prototype.pic = 'units_DA/Sammaels.jpg';



