
var DA_RavenwingCommandSquad = function(o) {
	this.unitName = 'DA_RavenwingCommandSquad';
	this.price = 120;
	this.optionsDefault = [
		'DA_RavenwingCommandSquad_addRavenwing_Biker',
        'DA_RavenwingCommandSquad_Standart',
        'DA_RavenwingCommandSquad_PlasmaTalon_to_RavenwingGrenadeLouncher',
        'DA_RavenwingCommandSquad_upgradeToRavenwingApothecary',
        'DA_RavenwingCommandSquad_upgradeToRavenwingChampion'
	];
	this.structureDefault = {
		'DA_Ravenwing_Black_Knight' : 3,
	}
    this.defaultUnitWargear = [
    	'BoltPistol',
        'PlasmaTalon',
        'CorvusHammer',
    	'FragGrenades',
    	'KrakGrenades',
        'TeleportHommer',
    ];
	this.defaultSpecialRules = [
		'AndTheyShallKnowNoFear',
        'GrimResolve',
        'HonourOrDeath (Champion Only)',
        'HitAndRun', 
        'Ravenwing', 
        'Scout', 
        'SkilledRider', 
	];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_RavenwingCommandSquad.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_RavenwingCommandSquad.prototype.constructor = DA_RavenwingCommandSquad;
// Методы потомка 
DA_RavenwingCommandSquad.prototype.visibleName = 'Ravenwing Command Squad';
DA_RavenwingCommandSquad.prototype.pic = 'units_DA/RavenwingCommand.jpg';

WH_OptionAddModelFabric([{
    'optionName' : 'DA_RavenwingCommandSquad_addRavenwing_Biker',
    'cost' : 40,
    'maxCountAdding' : 3,
    'modelToAdd' : 'DA_Ravenwing_Black_Knight',
}]);





//==============================================================================


fabric_option_multiChange([{
    optionName: 'DA_RavenwingCommandSquad_Standart',
    cost: 0,
    headerText: 'Один Ravenwing Black Knight в армии может взять одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_RavenwingCommandSquad_Standart_RavenwingCompanyBanner',
        cost: 20,
        actionTextUp: '',
        addItems: ['RavenwingCompanyBanner'],
    }, {
        optionName: 'DA_RavenwingCommandSquad_Standart_SacredStandart',
        cost: 35,
        actionTextUp: '',
        addItems: ['SacredStandart'],
    }, ],
    canEnable: [{
        type: 'onNameInArmuMayTakeOneFrom',
        name: 'DA_Ravenwing_Black_Knight'
    }],
    isModelCanChange: [{
        type: 'oneOfModelName',
        names: ['DA_Ravenwing_Black_Knight']
    }],
}, {
    optionName: 'DA_RavenwingCommandSquad_PlasmaTalon_to_RavenwingGrenadeLouncher',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_RavenwingCommandSquad_PlasmaTalon_to_RavenwingGrenadeLouncher_sub',
        cost: 0,
        removeItems: ['PlasmaTalon'],
        actionTextUp: 'До двух Ravenwing Black Knight могут заменить свои Plasma talon на <b>Ravenwing grenade louncher</b> <i>бесплатно</i>',
        addItems: ['RavenwingGrenadeLouncher'],
    }, ],
    canEnable: [{
        type: 'upTo',
        upTo: 2
    }],
    isModelCanChange: [{
        type: 'oneOfModelName',
        names: ['DA_Ravenwing_Black_Knight']
    }],
}]);



fabric_option_upgradeModel([{
    optionName: 'DA_RavenwingCommandSquad_upgradeToRavenwingApothecary',
    cost: 30,
    upgaredForm: 'DA_Ravenwing_Black_Knight',
    upgaredTo: 'DA_Ravenwing_Apothecary',
    addWargear: ['Nathecium'],
    isBlocked: ['oneModelInArmy']
}, {
    optionName: 'DA_RavenwingCommandSquad_upgradeToRavenwingChampion',
    cost: 5,
    upgaredForm: 'DA_Ravenwing_Black_Knight',
    upgaredTo: 'DA_Ravenwing_Champion',
    removeWargear: ['CorvusHammer'],
    addWargear: ['BladeOfCaliban'],
    isBlocked: ['oneModelInArmy']
}]);