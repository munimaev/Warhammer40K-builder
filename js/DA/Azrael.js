var Azraels = function(o) {
	this.unitName = 'Azraels';
	this.price = 215;
	this.optionsDefault = [
	];
	
	this.structureDefault = {
		'Azrael' : 1
	}
    this.defaultUnitWargear = [
        'MasterCraftedCombiPlasma',
        'BoltPistol',
        'FragGrenades',
        'KrakGrenades',
        'SwordOfSecrets',
        'LionHelm'
    ];
	this.defaultSpecialRules = [
		'Deathwing',
		'FeelNoPain', 
		'GrimResolve',
        'IndependentCharacter',
        'MasterTactican',
        'RitesOfBattle',
        'SupremeStrategist'
	];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
Azraels.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
Azraels.prototype.constructor = Azraels;
// Методы потомка 
Azraels.prototype.visibleName = 'Azrael';
Azraels.prototype.unique = ['Azraels'];




