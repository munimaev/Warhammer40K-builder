var DA_DropPod = function(o) {
	this.unitName = 'DA_DropPod';
	this.price = 35;
	this.optionsDefault = [
		'DA_DropPod_StormBolterReplace',
		'DA_DropPod_GetLocatorbeacon',
	];
	this.structureDefault = {
		'DropPod' : 1,
	}
    this.defaultUnitWargear = [
    ];
	this.defaultSpecialRules = [
		// 'DropPodAssault',
		// 'Immobile', 
		// 'InertialGuidanceSystem', 
	];
	WHUnit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_DropPod.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_DropPod.prototype.constructor = DA_DropPod;
// Методы потомка 
DA_DropPod.prototype.visibleName = 'Drop Pod';
DA_DropPod.prototype.price = 35;



//==============================================================================



var DA_DropPod_StormBolterReplace = function(o) {
    this.defaultSubOptions = [
        'DA_DropPod_StormBolterReplace_StormBolter',
        'DA_DropPod_StormBolterReplace_DeathwindLauncher'
    ]
    this.optionName = 'DA_DropPod_StormBolterReplace';
    this.cost = 0;
    this.headerText = 'Можно выбрать одно из следующего.';

    ReplaceFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DropPod_StormBolterReplace.prototype = Object.create(ReplaceFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DropPod_StormBolterReplace.prototype.constructor = DA_DropPod_StormBolterReplace;


ReplaceFromWargear_subOtion_fabric([
	{
		optionName : 'DA_DropPod_StormBolterReplace_StormBolter',
		actionText : 'Storm bolter бесплатно',
		autoSelectOption : true,
		funOn : function(){
		    this.superOption.allOff();
		    for (var u in this.unit.models) {
		        this.unit.models[u].addWargear({name:'StormBolter',createBy:this})
		    }
		    this.usedCount = 1;
		    this.iUpdated();
		}
	}, {
		optionName : 'DA_DropPod_StormBolterReplace_DeathwindLauncher',
		actionText : 'Deathwind launcher за 15 очков',
	    cost : 15,
		funOn : function(){
		    this.superOption.allOff();
		    for (var u in this.unit.models) {
		        this.unit.models[u].addWargear({name:'DeathwindLauncher',createBy:this})
		    }
		    this.usedCount = 1;
		    this.iUpdated();
		}
	}
]);




//==============================================================================


var DA_DropPod_GetLocatorbeacon = function(o) {
    this.defaultSubOptions = [
        'DA_DropPod_Locatorbeacon',
    ]
    this.optionName = 'DA_VeteranSquad_HeavyWeapons';
    this.cost = 0;
    this.headerText = 'Можно взять следующее';
    this.isModelCanGet =  function(m, superOption) {
        for (var i in m.wargear) {
            //Каждая подопция может быть взята отдельно
            if (m.wargear[i].createBy === superOption
                 && m.wargear[i].wargearName !== 'emptySlot'
            ) {
                return false;
            }
        }
        return true;
    }

    AddFromWargear_class.apply(this, arguments);
}

// Унаследовать
DA_DropPod_GetLocatorbeacon.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DropPod_GetLocatorbeacon.prototype.constructor = DA_DropPod_GetLocatorbeacon;



