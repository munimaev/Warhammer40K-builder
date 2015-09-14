
var DA_RavenwingAttackBikeSquad = function(o) {
	this.unitName = 'DA_RavenwingAttackBikeSquad';
	this.price = 45;
	this.optionsDefault = [
        'DA_RavenwingAttackBikeSquad_addRavenwing_Attack_Bike',
        'DA_Ravenwing_Attack_Bike_replace',
	];
	this.structureDefault = {
		'DA_Ravenwing_Attack_Bike' : 1,
	}
    this.defaultUnitWargear = [
    	'BoltPistol',
        'HeavyBolter',
    	'FragGrenades',
    	'KrakGrenades',
        'SpaceMarineBike',
        'TeleportHommer'
    ];
	this.defaultSpecialRules = [
		'AndTheyShallKnowNoFear',
		'CombatSquad', 
        'GrimResolve', 
        'HitAndRun', 
        'Ravenwing', 
        'Scout', 
	];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_RavenwingAttackBikeSquad.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_RavenwingAttackBikeSquad.prototype.constructor = DA_RavenwingAttackBikeSquad;
// Методы потомка 
DA_RavenwingAttackBikeSquad.prototype.visibleName = 'Ravenwing Attack Bike Squad';
DA_RavenwingAttackBikeSquad.prototype.pic = 'units_DA/DarkAngelsAttackBike.jpg';



WH_OptionAddModelFabric([{
    'optionName' : 'DA_RavenwingAttackBikeSquad_addRavenwing_Attack_Bike',
    'cost' : 45,
    'maxCountAdding' : 2,
    'modelToAdd' : 'DA_Ravenwing_Attack_Bike',
}]);





//==============================================================================





var DA_Ravenwing_Attack_Bike_replace = function(o) {
    this.defaultSubOptions = [
        'DA_Ravenwing_Attack_Bike_replace_MultiMelta',
    ]
    this.optionName = 'DA_Ravenwing_Attack_Bike_replace';
    this.cost = 0;
    this.headerText = 'Ravenwing Attack Bike может заменить свой heavy bolter на одно из следующего';
        
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_Ravenwing_Attack_Bike_replace.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_Ravenwing_Attack_Bike_replace.prototype.constructor = DA_Ravenwing_Attack_Bike_replace;

DA_Ravenwing_Attack_Bike_replace.prototype.isModelCanChange = function(m, superOption) {
    if (m.modelName !== 'DA_Ravenwing_Attack_Bike') {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)
}

