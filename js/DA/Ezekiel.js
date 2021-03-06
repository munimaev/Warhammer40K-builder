var Ezekiels = function(o) {
	this.unitName = 'Ezekiel';
	this.price = 65;
	this.optionsDefault = [
	];
	
	this.structureDefault = {
		'Ezekiel' : 1
	}
    this.defaultUnitWargear = [
        'MasterCraftedBoltPistol',
        'MasterCraftedForceSword',
        'FragGrenades',
        'KrakGrenades',
        'PsychicHood',
        'BookOfSalvation',
    ];
    this.defaultSpecialRules = [
        'Deathwing',
        'GrimResolve', 
        'IndependentCharacter', 
        'Psyker_ML3',
    ];
    this.defaultDisciplines = [
        'Daemonology',
        'Divination', 
        'Interromancy', 
        'Pyromancy', 
        'Telekinesis', 
        'Telepathy',
    ];
    this.defaultWarlordTrait = [
        'CourageOfTheFirstLegion'
    ];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
Ezekiels.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
Ezekiels.prototype.constructor = Ezekiels;
// Методы потомка 
Ezekiels.prototype.visibleName = 'Ezekiel';
Ezekiels.prototype.unique = ['Ezekiel'];
Ezekiels.prototype.pic = 'units_DA/Ezekiel.jpg';



