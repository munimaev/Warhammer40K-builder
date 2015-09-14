
var DA_ScoutSquad = function(o) {
	this.unitName = 'DA_ScoutSquad';
	this.price = 55;
	this.optionsDefault = [
		'DA_ScoutSquad_addScout',
		'DA_ScoutSquad_cloak',
		'DA_ScoutSquad_BolterRaplace',
		'DA_ScoutSquad_HeavyWeapons',
		'DA_ScoutSquad_upgradeToVeteran',
		'DA_TacticalSquad_MeleeRangedWeapons',
		'DA_ScoutSquad_AddMeltaBomb',
	];
	this.structureDefault = {
		'DA_Sсout_Sergant' : 1,
		'DA_Sсout' : 4,
	}
    this.defaultUnitWargear = [
    	'Boltgun',
    	'BoltPistol',
    	'FragGrenades',
    	'KrakGrenades',
    ];
	this.defaultSpecialRules = [
		'AndTheyShallKnowNoFear',
		'CombatSquad', 
		'GrimResolve',
		'Infiltrate',
		'MoveThroughCover',
		'Scout',
	];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_ScoutSquad.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_ScoutSquad.prototype.constructor = DA_ScoutSquad;
// Методы потомка 
DA_ScoutSquad.prototype.visibleName = 'Scout Squad';
DA_ScoutSquad.prototype.pic = 'units_DA/ScoutSquade.jpg';


WH_OptionAddModelFabric([{
    'optionName' : 'DA_ScoutSquad_addScout',
    'cost' : 11,
    'maxCountAdding' : 5,
    'modelToAdd' : 'DA_Sсout'
}]);



//==============================================================================


var DA_ScoutSquad_cloak = function(o) {
    this.optionName = 'DA_ScoutSquad_cloak';
    this.cost = 2;
    this.actionText = 'Вест отряд может взять плащи по 2 очка за модель.';
    this.actionIcon = 'upgrade';
    OptionChek.apply(this, arguments);

}

// Унаследовать
DA_ScoutSquad_cloak.prototype = Object.create(OptionChek.prototype);

// Желательно и constructor сохранить
DA_ScoutSquad_cloak.prototype.constructor = DA_ScoutSquad_cloak;


DA_ScoutSquad_cloak.prototype.on  = function() {
    for (var i in this.unit.models) {
    	var hasCloak = false;
        for (var w in this.unit.models[i].wargear) {
        	if (this.unit.models[i].wargear[w].wargearName == 'ScoutCloak') {
        		hasCloak = true;
        		break;
        	}
        }
        if (!hasCloak) {
        	this.unit.models[i].addWargear({
        		name: 'ScoutCloak',
        		createBy: 'structure',
        		model:this.unit.models[i]
        	})
        }
        this.usedCount++;
    }
    this.unit.unitWargear.push('ScoutCloak')
    this.iUpdated();
}


DA_ScoutSquad_cloak.prototype.off  = function() {
    for (var i in this.unit.models) {
        for (var w in this.unit.models[i].wargear) {
        	if (this.unit.models[i].wargear[w].wargearName == 'ScoutCloak') {
        		this.unit.models[i].wargear.splice(w,1);
        		break;
        	}
        }
        this.usedCount--;
    }
   	for (var i in this.unit.unitWargear) {
   		if (this.unit.unitWargear[i] == 'ScoutCloak') {
   			this.unit.unitWargear.splice(i,1);
   			break;
   		}
   	}
    
    this.iUpdated();
}

DA_ScoutSquad_cloak.prototype.getAdditionalCost  = function() {
	var totalPaid = 0;
    for (var i in this.unit.models) {
        for (var w in this.unit.models[i].wargear) {
        	if (this.unit.models[i].wargear[w].wargearName == 'ScoutCloak') {
        		totalPaid += this.cost;
        		break;
        	}
        }
    }
    return totalPaid;
}




//==============================================================================



var DA_ScoutSquad_BolterRaplace = function(o) {
    this.defaultSubOptions = [
        'DA_ScoutSquad_CloseCombatWeapon',
        'DA_ScoutSquad_SpaceMarineShotgun',
        'DA_ScoutSquad_SniperRifle',
    ]
    this.optionName = 'DA_ScoutSquad_BolterRaplace';
    this.cost = 0;
    this.headerText = 'Каждая модель в отряде может заменить свой boltgun на одно из следующего:';
    this.needChekEnambleEachTime = true;
    this.isWargearToChange = function(w,m) {
        if (w.wargearName == 'Boltgun' 
            && w.createBy === m
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_ScoutSquad_BolterRaplace.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_ScoutSquad_BolterRaplace.prototype.constructor = DA_ScoutSquad_BolterRaplace;


DA_RangedWeaponsFabric([

{
	optionName: 'DA_ScoutSquad_CloseCombatWeapon',
	optionNameInModel: 'Close combat weapon',
	cost: 0,
	changeTo: 'CloseCombatWeapon',
	actionTextUp: '<b>Close combat weapon</b> <i>бесплатно</i>.',
	actionTextDown: 'Удалить <b>Close combat weapon</b>'
}, {
	optionName: 'DA_ScoutSquad_SpaceMarineShotgun',
	optionNameInModel: 'Space marine shotgun',
	cost: 0,
	changeTo: 'SpaceMarineShotgun',
	actionTextUp: '<b>Space marine shotgun</b> <i>бесплатно</i>.',
	actionTextDown: 'Удалить <b>Space marine shotgun</b>'
}, {
	optionName: 'DA_ScoutSquad_SniperRifle',
	optionNameInModel: 'Sniper rifle',
	cost: 1,
	changeTo: 'SniperRifle',
	actionTextUp: '<b>Sniper rifle</b> <i>за 1 очко</i>.',
	actionTextDown: 'Удалить <b>Sniper rifle</b>'
},
]);





//==============================================================================



// --------- Класс-потомок ChangeFromWargear_class -----------
var DA_ScoutSquad_HeavyWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_ScouteSqude_HeavyWeapons_HeavyBolter',
        'DA_ScouteSqude_HeavyWeapons_HeavyBolterWithHellfireShells',
        'DA_HeavyWeapons_MissleLuauncher',
        'DA_HeavyWeapons_MissleLuauncherFlakk',
    ]
    this.optionName = 'DA_ScoutSquad_HeavyWeapons';
    this.cost = 0;
    this.headerText = 'Один скаут может заменить свой boltgun на одно из следующего:';
    this.needChekEnambleEachTime = true;
    this.isWargearToChange = function(w,m) {
        if (m.modelName == 'DA_Sсout'
            && w.wargearName == 'Boltgun'
            && w.createBy === m
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_ScoutSquad_HeavyWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_ScoutSquad_HeavyWeapons.prototype.constructor = DA_ScoutSquad_HeavyWeapons;

DA_ScoutSquad_HeavyWeapons.prototype.canEnableWeapon = function(option,superOption){
    // option.superOption - DA_RangedWeapons_Boltgun 
    // 
    // console.log('---------------------------')
    // console.log(option)
    var superOption = option !== null ? option.superOption : superOption;
    var models = this.unit.models.length;
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) {
            if (this.unit.models[m].wargear[w].createBy.superOption == superOption.superOption) {    
                return false;
            }
        }
    }
    return true;
};


DA_RangedWeaponsFabric([
{
    optionName : 'DA_ScouteSqude_HeavyWeapons_HeavyBolter',
    optionNameInModel : 'HeavyBolter',
    cost : 8,
    changeTo : 'HeavyBolter',
    actionTextUp : '<b>Heavy bolter</b> <i>за 8 очков</i>',
    actionTextDown : 'Убрать Heavy bolter'
}, {
    optionName : 'DA_ScouteSqude_HeavyWeapons_HeavyBolterWithHellfireShells',
    optionNameInModel : 'Heavy bolter with Hellfire shells',
    cost : 13,
    changeTo : 'HeavyBolterWithHellfireShells',
    actionTextUp : '<b>Heavy bolter with Hellfire shells</b> <i>за 13 очков</i>',
    actionTextDown : 'Убрать Heavy bolter with Hellfire shells'
}, 
]);


//==============================================================================




var DA_ScoutSquad_upgradeToVeteran = function(o) {
    this.optionName = 'DA_ScoutSquad_upgradeToVeteran';
    this.cost = 10;
    this.actionText = 'Scout Sergant можно усовершенствовать до Veteran Scout Sergant';
    this.actionIcon = 'upgrade';
    OptionChek.apply(this, arguments);

}

// Унаследовать
DA_ScoutSquad_upgradeToVeteran.prototype = Object.create(OptionChek.prototype);

// Желательно и constructor сохранить
DA_ScoutSquad_upgradeToVeteran.prototype.constructor = DA_ScoutSquad_upgradeToVeteran;


DA_ScoutSquad_upgradeToVeteran.prototype.on  = function() {
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== 'structure' 
        	|| this.unit.models[i].modelName !== 'DA_Sсout_Sergant'
            || this.unit.models[i].touchedByOptions.length !== 0) {
            continue;
        }
        this.unit.models.splice(i,1);
        this.unit.models.splice(0, 0, new DA_Veteran_Scout_Sergant({
            unit: this.unit,
            createBy: this
        }));
        this.usedCount++;
        break;
    }
    
    this.iUpdated();
}


DA_ScoutSquad_upgradeToVeteran.prototype.off  = function() {
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== this) {
            continue;
        }
        this.unit.models.splice(i,1);
        this.unit.models.splice(0, 0, new DA_Sсout_Sergant({
            unit: this.unit,
            createBy: 'structure'
        }));
        this.usedCount--;
        break;
    }
    this.iUpdated();
}






//==============================================================================



var DA_TacticalSquad_MeleeRangedWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_MeleeWeapons_Chainsword',
        'DA_MeleeWeapons_LightningClaws',
        'DA_MeleeWeapons_PowerWeapon',
        'DA_MeleeWeapons_PowerFist',
        'DA_MeleeWeapons_ThunderHammer',
        'DA_RangedWeapons_Boltgun',
        'DA_RangedWeapons_StormBolter',
        'DA_RangedWeapons_CombiFlamer',
        'DA_RangedWeapons_CombiGrav',
        'DA_RangedWeapons_CombiMelta',
        'DA_RangedWeapons_CombiPlasma',
        'DA_RangedWeapons_GraviPistol',
        'DA_RangedWeapons_PlasmaPistol',
    ]
    this.optionName = 'DA_TacticalSquad_MeleeRangedWeapons';
    this.cost = 0;
    this.headerText = 'Sсout Sergant или Veteran Sсout Sergant может заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из cледующего';
    this.isWargearToChange = function(w,m) {
        if ((w.wargearName == 'Boltgun' 
            || w.wargearName == 'BoltPistol' 
            || w.wargearType == 'MeleeWeapon'
            ) 
            && w.createBy === m
            && (m.modelName === 'DA_Veteran_Scout_Sergant'
            	|| m.modelName === 'DA_Sсout_Sergant')
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_TacticalSquad_MeleeRangedWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_TacticalSquad_MeleeRangedWeapons.prototype.constructor = DA_TacticalSquad_MeleeRangedWeapons;








//==============================================================================




var DA_ScoutSquad_AddMeltaBomb = function(o) {
    this.defaultSubOptions = [
        'DA_AddMeltaBomb_MeltaBomb'
    ]
    this.optionName = 'DA_ScoutSquad_AddMeltaBomb';
    this.cost = 0;
    this.headerText = 'Sсout Sergant или Veteran Sсout Sergant  взять следующее';
    this.isModelCanGet =  function(m, superOption) {
    	if (m.modelName === 'DA_Veteran_Scout_Sergant'
            || m.modelName === 'DA_Sсout_Sergant'
        ) {
	        for (var i in m.wargear) {
	            if (m.wargear[i].createBy === superOption
	                && m.wargear[i].wargearName !== 'emptySlot') {
	                return false;
	            }
	        }
	    }
	    else {
	    	return false;
	    }
        return true;
    }

    AddFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_ScoutSquad_AddMeltaBomb.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_ScoutSquad_AddMeltaBomb.prototype.constructor = DA_ScoutSquad_AddMeltaBomb;



//==============================================================================




