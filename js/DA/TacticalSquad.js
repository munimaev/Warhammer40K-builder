
var DA_TacticalSquad = function(o) {
	this.unitName = 'DA_TacticalSquad';
	this.price = 70;
	this.optionsDefault = [
		'DA_TacticalSquad_addSpaceMarine',
        'DA_TacticalSquad_SpecialAndHeavyWeapons',
		'DA_upgradeSpaceMarineSergeantToVeteran',
		'DA_TacticalSquad_MeleeWeapons',
		'DA_TacticalSquad_AddMeltaBomb',
		'DA_DedicatedFastTransport',
	];
	this.structureDefault = {
		'DA_SpaceMarine_Sergant' : 1,
		'DA_SpaceMarine' : 4,
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
	];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_TacticalSquad.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
DA_TacticalSquad.prototype.constructor = DA_TacticalSquad;
// Методы потомка 
DA_TacticalSquad.prototype.visibleName = 'Tactical Squad';


WHOptionAddModelFabric([{
    'optionName' : 'DA_TacticalSquad_addSpaceMarine',
    'cost' : 14,
    'maxCountAdding' : 5,
    'modelToAdd' : 'DA_SpaceMarine',
    'funCanDisable' : function() {

		var modelsCount = 0;
	    for (var m in this.unit.models) {
	        for (var w in this.unit.models[m].wargear) {
	            if (this.unit.models[m].wargear[w].createBy.hasOwnProperty('superOption')
	            	&&
	            	this.unit.models[m].wargear[w].createBy.superOption.hasOwnProperty('optionName')
	            	&& (this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_TacticalSquad_HeavyWeapons'
	            		||
	            		this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_TacticalSquad_SpecialWeapons')

	            ) {    
	              modelsCount++;
	            }
	        }
	    }
	    if (modelsCount >= 2) {
	    	return false;
	    }

	    if (this.superOption.getCount() > 0) {
	        return true;
	    }
	    return false;
    }
}]);





//==============================================================================



var DA_TacticalSquad_SpecialAndHeavyWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_TacticalSquad_SpecialWeapons',
        'DA_TacticalSquad_HeavyWeapons',
    ]
    this.optionName = 'DA_TacticalSquad_SpecialAndHeavyWeapons';
    this.cost = 0;
    this.headerText = 'Если в отряде меньше десяти моделей один Space Marine может оружие из списка Heavy Weapons или Special Weapons. Если в отряде 10 моделей одни Space Marine может взять оружие из Heavy Weapons, а дургой Space Marine может взять оружеие из Heavy Weapons';
    WHOptionSuper.apply(this, arguments);
}
// Унаследовать
DA_TacticalSquad_SpecialAndHeavyWeapons.prototype = Object.create(WHOptionSuper.prototype);
// Желательно и constructor сохранить
DA_TacticalSquad_SpecialAndHeavyWeapons.prototype.constructor = DA_TacticalSquad_SpecialAndHeavyWeapons;


DA_TacticalSquad_SpecialAndHeavyWeapons.prototype.canEnable = function(){
    
    var hasSpecial = false;
    var hasHeavy = false;
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) { 
            if (this.unit.models[m].wargear[w].createBy.hasOwnProperty('superOption')
                &&
                this.unit.models[m].wargear[w].createBy.superOption.hasOwnProperty('optionName')
            ) {  
                if (this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_TacticalSquad_SpecialWeapons'
                ) {   
                   hasSpecial = true;
                }
                if (this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_TacticalSquad_HeavyWeapons'
                ) {    
                   hasHeavy = true;
                } 
            }
        }
    }
    if (this.unit.models.length < 10) {
        if (hasSpecial || hasHeavy) {
            return false;
        } else {
            return MultiChangeFromWargear_class.prototype.canEnable.apply(this,arguments);
        }
    }
    else {
        if (hasSpecial && hasHeavy) {
            return false;
        } else {
            return MultiChangeFromWargear_class.prototype.canEnable.apply(this,arguments);
        }
    }
};


var DA_TacticalSquad_SpecialWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_SpecialWeapons_Flamer',
        'DA_SpecialWeapons_MeltaGun',
        'DA_SpecialWeapons_GravGun',
        'DA_SpecialWeapons_PlasmsGun',
    ]
    this.optionName = 'DA_TacticalSquad_SpecialWeapons';
    this.cost = 0;
    this.headerText = 'Special Weapon. Заменить свой boltgun на одно из следующего';
        
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_TacticalSquad_SpecialWeapons.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_TacticalSquad_SpecialWeapons.prototype.constructor = DA_TacticalSquad_SpecialWeapons;

DA_TacticalSquad_SpecialWeapons.prototype.canEnable = function() {
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) { 
            if (this.unit.models[m].wargear[w].createBy.hasOwnProperty('superOption')
                &&
                this.unit.models[m].wargear[w].createBy.superOption.hasOwnProperty('optionName')
                &&
                this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_TacticalSquad_SpecialWeapons'
            ) {   
                 return false;
            }
        }
    }

    return MultiChangeFromWargear_class.prototype.canEnable.apply(this,arguments)
}

DA_TacticalSquad_SpecialWeapons.prototype.isModelCanChange = function(m, superOption) {
    if (m.modelName !== 'DA_SpaceMarine') {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)
}



var DA_TacticalSquad_HeavyWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_HeavyWeapons_HeavyBolter',
        'DA_HeavyWeapons_MultiMelta',
        'DA_HeavyWeapons_MissleLuauncher',
        'DA_HeavyWeapons_MissleLuauncherFlakk',
        'DA_HeavyWeapons_PlasmaCannon',
        'DA_HeavyWeapons_Lascannon',
        'DA_HeavyWeapons_GravCannonWithAmp',
    ]
    this.optionName = 'DA_TacticalSquad_HeavyWeapons';
    this.cost = 0;
    this.headerText = 'Heavy Weapons. Заменить свой boltgun на одно из следующего';
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_TacticalSquad_HeavyWeapons.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_TacticalSquad_HeavyWeapons.prototype.constructor = DA_TacticalSquad_HeavyWeapons;


DA_TacticalSquad_HeavyWeapons.prototype.canEnable = function() {
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) { 
            if (this.unit.models[m].wargear[w].createBy.hasOwnProperty('superOption')
                &&
                this.unit.models[m].wargear[w].createBy.superOption.hasOwnProperty('optionName')
                &&
                this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_TacticalSquad_HeavyWeapons'
            ) {   
                 return false;
            }
        }
    }

    return MultiChangeFromWargear_class.prototype.canEnable.apply(this,arguments)
}


DA_TacticalSquad_HeavyWeapons.prototype.isModelCanChange = function(m, superOption) {
    if (m.modelName !== 'DA_SpaceMarine') {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)
}


//==============================================================================




//==============================================================================





var DA_TacticalSquad_MeleeWeapons = function(o) {
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
    this.optionName = 'DA_TacticalSquad_MeleeWeapons';
    this.cost = 0;
    this.headerText = 'Space Marine Sergant или Veteran Sergant может заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из cледующего';
    this.isWargearToChange = function(w,m) {
        if ((w.wargearName == 'Boltgun' 
            || w.wargearName == 'BoltPistol' 
            || w.wargearType == 'MeleeWeapon'
            ) 
            && w.createBy === m
            && (m.modelName === 'DA_SpaceMarine_Sergant'
            	|| m.modelName === 'DA_Veteran_Sergant')
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_TacticalSquad_MeleeWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_TacticalSquad_MeleeWeapons.prototype.constructor = DA_TacticalSquad_MeleeWeapons;





//==============================================================================




var DA_TacticalSquad_AddMeltaBomb = function(o) {
    this.defaultSubOptions = [
        'DA_AddMeltaBomb_MeltaBomb'
    ]
    this.optionName = 'DA_TacticalSquad_AddMeltaBomb';
    this.cost = 0;
    this.headerText = 'Любая модель взять следующее';
    this.isModelCanGet =  function(m, superOption) {
    	if (m.modelName === 'DA_SpaceMarine_Sergant'
            || m.modelName === 'DA_Veteran_Sergant'
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
DA_TacticalSquad_AddMeltaBomb.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_TacticalSquad_AddMeltaBomb.prototype.constructor = DA_TacticalSquad_AddMeltaBomb;



//==============================================================================



