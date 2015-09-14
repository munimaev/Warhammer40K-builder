
var DA_DeathwingKnightSquad = function(o) {
	this.unitName = 'DA_DeathwingKnightSquad';
	this.price = 235;
	this.optionsDefault = [
		'DA_DeathwingKnightSquad_addKinght',
		'DA_DeathwingTerminatorSquad_PrediusRelicOfTheUnforgiven',
		'DA_DedicatedHeavyTransport',
	];
	this.structureDefault = {
        'DA_DeathwingKnightMaster' : 1,
        'DA_DeathwingKnight' : 4,
	}
    this.defaultUnitWargear = [
        'TerminatorArmour',
        'StormBolter',
        function (m) {
            if (m.modelName === 'DA_DeathwingSergant') {
                return 'PowerSword';
            } 
            else if (m.modelName === 'DA_DeathwingTerminator') {
                return 'PowerFist';
            }
            return false;
        },
    ];
	this.defaultSpecialRules = [
		'Deathwing',
		'GrimResolve',
        'HammerOfWrath',
        'PrecisionStrike',
        'FortressOfShields',
	];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_DeathwingKnightSquad.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_DeathwingKnightSquad.prototype.constructor = DA_DeathwingKnightSquad;
// Методы потомка 
DA_DeathwingKnightSquad.prototype.visibleName = 'Deathwing Knight Squad';
DA_DeathwingKnightSquad.prototype.pic = 'units_DA/DeathwingKnight.jpg';




//==============================================================================

WH_OptionAddModelFabric([{
    'optionName' : 'DA_DeathwingKnightSquad_addKinght',
    'cost' : 45,
    'maxCountAdding' : 5,
    'modelToAdd' : 'DA_DeathwingKnight',
}]);



//==============================================================================





