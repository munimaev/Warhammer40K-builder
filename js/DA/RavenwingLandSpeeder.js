var DA_RavenwingLandSpeeder = function(o) {
	this.unitName = 'DA_RavenwingLandSpeeder';
	this.price = 50;
	this.optionsDefault = [
		'DA_RavenwingLandSpeeder_addRavenwingLandSpeeder',
		'DA_RavenwingLandSpeeder_replace_HeavyBolter',
		'DA_RavenwingLandSpeeder_mayTake',
	];
	this.structureDefault = {
		'RavenwingLandSpeeder' : 1,
	}
    this.defaultUnitWargear = [
		'HeavyBolter',
    ];
	this.defaultSpecialRules = [
		'DeepStrike',
		'Ravenwing', 
		'AntiGravUpwash', 
	];
	WH_Unit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_RavenwingLandSpeeder.prototype = Object.create(WH_Unit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_RavenwingLandSpeeder.prototype.constructor = DA_RavenwingLandSpeeder;
// Методы потомка 
DA_RavenwingLandSpeeder.prototype.visibleName = 'Ravenwing lanspeeder';
DA_RavenwingLandSpeeder.prototype.price = 50;
DA_RavenwingLandSpeeder.prototype.pic = 'units_DA/DarkAngelsLandSpeeder.jpg';


//========================
// Option
//=========================


WH_OptionAddModelFabric([{
    'optionName' : 'DA_RavenwingLandSpeeder_addRavenwingLandSpeeder',
    'cost' : 50,
    'maxCountAdding' : 4,
    'modelToAdd' : 'RavenwingLandSpeeder',
}]);

//==============================================================================


fabric_option_multiChange([
{
    optionName: 'DA_RavenwingLandSpeeder_replace_HeavyBolter',
    cost: 0,
    headerText : 'Любой Ravenwing land speeder может заменить Heavy bolter на одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_RavenwingLandSpeeder_replace_HeavyBolter_to_HeavyFlamer',
        cost: 0,
        removeItems: ['HeavyBolter'],
        addItems: ['HeavyFlamer'],
    }, {
        optionName: 'DA_RavenwingLandSpeeder_replace_HeavyBolter_to_MultiMelta',
        cost: 10,
        removeItems: ['HeavyBolter'],
        addItems: ['MultiMelta'],
    }, ],
    isModelCanChange: [{
        type: 'modelCanTakeOnlyOneSubotion',
    }],
},
{
    optionName: 'DA_RavenwingLandSpeeder_mayTake',
    cost: 0,
    headerText : 'Любой Ravenwing land speeder может взять одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_RavenwingLandSpeeder_mayTake_HeavyBolter',
        cost: 5,
        addItems: ['HeavyBolter'],
    },{
        optionName: 'DA_RavenwingLandSpeeder_mayTake_HeavyFlamer',
        cost: 5,
        addItems: ['HeavyFlamer'],
    }, {
        optionName: 'DA_RavenwingLandSpeeder_mayTake_MultiMelta',
        cost: 15,
        addItems: ['MultiMelta'],
    },{
        optionName: 'DA_RavenwingLandSpeeder_mayTake_AssaultCannon',
        cost: 20,
        addItems: ['AssaultCannon'],
    },{
        optionName: 'DA_RavenwingLandSpeeder_mayTake_TyphoonMissleLauncher',
        cost: 25,
        addItems: ['TyphoonMissleLauncher'],
    }, ],
    isModelCanChange: [{
        type: 'modelCanTakeOnlyOneSubotion',
    }],
}
]);