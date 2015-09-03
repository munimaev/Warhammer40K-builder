
var DA_RavenwingBlackKnights = function(o) {
	this.unitName = 'DA_RavenwingBlackKnights';
	this.price = 75;
	this.optionsDefault = [
		'DA_RavenwingBlackKnights_addRavenwing_Biker',
        'DA_RavenwingBlackKnights_replace_PlasmaTalon_toRavenwingGrenadeLouncher',
		'DA_RavenwingBlackKnights_Huntermaster_toPowerWaepon',
		'DA_RavenwingBlackKnights_Huntermaster_meltaBomb',
	];
	this.structureDefault = {
		'DA_Ravenwing_Huntmaster' : 1,
		'DA_Ravenwing_Black_Knight' : 2,
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
		'CombatSquad', 
        'GrimResolve', 
        'HitAndRun', 
        'Ravenwing', 
        'Scout', 
        'SkilledRider', 
	];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_RavenwingBlackKnights.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
DA_RavenwingBlackKnights.prototype.constructor = DA_RavenwingBlackKnights;
// Методы потомка 
DA_RavenwingBlackKnights.prototype.visibleName = 'Ravenwing Black Knights';

WHOptionAddModelFabric([{
    'optionName' : 'DA_RavenwingBlackKnights_addRavenwing_Biker',
    'cost' : 40,
    'maxCountAdding' : 7,
    'modelToAdd' : 'DA_Ravenwing_Black_Knight',
}]);





//==============================================================================


fabric_option_multiChange([
{
    optionName: 'DA_RavenwingBlackKnights_replace_PlasmaTalon_toRavenwingGrenadeLouncher',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_RavenwingBlackKnights_replace_PlasmaTalon_RavenwingGrenadeLouncher',
        cost: 0,
        removeItems: ['PlasmaTalon'],
        actionTextUp: 'За каждые три модели в отряде один Ravenwing Black Knight может заменить свой Plasms talon на <b>Ravenwing grenade louncher</b> <i>бесплатно</i>',
        addItems: ['RavenwingGrenadeLouncher'],
    }, ],
    canEnable: [{
        type: 'foreach',
        foreachCount: 3
    }],
    isModelCanChange: [{
        type: 'oneOfModelName',
        names: ['DA_Ravenwing_Black_Knight']
    }],
}, 
{
    optionName: 'DA_RavenwingBlackKnights_Huntermaster_toPowerWaepon',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_RavenwingBlackKnights_Huntermaster_PowerWaepon',
        cost: 12,
        removeItems: ['CorvusHammer'],
        actionTextUp: 'Ravenwing Huntmaster может заменить свой Corvus hammer на <b>PowerWeapon</b> <i>бесплатно</i>',
        addItems: ['PowerWeapon'],
    }, ],
    isModelCanChange: [{
        type: 'oneOfModelName',
        names: ['DA_Ravenwing_Huntmaster']
    }],
},
{
    optionName: 'DA_RavenwingBlackKnights_Huntermaster_meltaBomb',
    cost: 0,
    headerText : 'Ravenwing Huntmaster может взять следующее',
    defaultSubOptions: ['DA_AddMeltaBomb_MeltaBomb' ],
    isModelCanChange: [{
        type: 'oneOfModelName',
        names: ['DA_Ravenwing_Huntmaster']
    }],
}
]);


