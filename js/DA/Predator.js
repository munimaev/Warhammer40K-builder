var DA_Predator = function(o) {
	this.unitName = 'DA_Predator';
	this.price = 75;
	this.optionsDefault = [
		'DA_Predator_addPredator',
		'DA_Predator_replace_Autocanon',
		'DA_Predator_Sponsons',
		'DA_VehicleEquipment',
	];
	this.structureDefault = {
		'Predator' : 1,
	}
    this.defaultUnitWargear = [
		'Autocannon',
		'Searchlight',
		'SmokeLounchers',
    ];
	this.defaultSpecialRules = [
		'Killshot',
		// 'CombatSquad', 
		// 'GrimResolve', 
	];
	WHUnit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_Predator.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_Predator.prototype.constructor = DA_Predator;
// Методы потомка 
DA_Predator.prototype.visibleName = 'Predator';
DA_Predator.prototype.price = 75;


//========================
// Option
//=========================


WHOptionAddModelFabric([{
    'optionName' : 'DA_Predator_addPredator',
    'cost' : 75,
    'maxCountAdding' : 2,
    'modelToAdd' : 'Predator',
}]);

//==============================================================================

fabric_option_multiChange([
{
    optionName: 'DA_Predator_replace_Autocanon',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_Predator_replace_Autocanon_to_TLLascannon',
        cost: 25,
        removeItems: ['Autocannon'],
        actionTextUp: 'Любой Predator может заменить Autocannon на <b>Twin-linked lascannon</b> <i>по 25 очков за модель</i>',
        addItems: ['TwinLinkedLascannon'],
    }, ]
},
{
    optionName: 'DA_Predator_Sponsons',
    cost: 0,
    headerText : 'Любой Predator может взять два боковых спонсона оба вооруженных один из следующего',
    defaultSubOptions: [{
        optionName: 'DA_Predator_Sponsons_HeavyBolter',
        cost: 20,
        removeItems: [],
        addItems: ['SponsonHeavyBolter','SponsonHeavyBolter'],
    }, {
        optionName: 'DA_Predator_Sponsons_Lascannon',
        cost: 40,
        removeItems: [],
        addItems: ['SponsonLascannon','SponsonLascannon'],
    }, ],
    isModelCanChange: [{
        type: 'modelCanTakeOnlyOneSubotion',
    }],
}
]);