var Asmodais = function(o) {
	this.unitName = 'Asmodais';
	this.price = 140;
	this.optionsDefault = [
	];
	
	this.structureDefault = {
		'Asmodai' : 1
	}
    this.defaultUnitWargear = [
        'BoltPistol',
        'CroziusArcanum',
        'FragGrenades',
        'KrakGrenades',
        'Rosarius',
        'BladesOfReason'
    ];
	this.defaultSpecialRules = [
		'Deathwing',
		'GrimResolve', 
		'Fear', 
		'IndependentCharacter', 
		'PreferredEnemy_ChaosSpaceMarine',
        'Zealot',
        'MasterOfRepentance'
	];
    this.defaultWarlordTrait = [
        'TheHunt'
    ];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
Asmodais.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
Asmodais.prototype.constructor = Asmodais;
// Методы потомка 
Asmodais.prototype.visibleName = 'Asmodai';
Asmodais.prototype.unique = ['Asmodais'];

Asmodais.prototype.pic = 'units_DA/Asmodai.jpg';



