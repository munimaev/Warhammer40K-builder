var DA_DevastatorSquad = function(o) {
	this.unitName = 'DA_DevastatorSquad';
	this.price = 70;
	this.optionsDefault = [
		'DA_DevastatorSquad_addSpaceMarine',
		'DA_DevastatorSquad_HeavyWeapons',
		'DA_ArmoriumCherub',
		'DA_DevastatorSquad_upgradeToVeteran',
		'DA_DevastatorSquad_MeleeWeapons',
		'DA_DevastatorSquad_AddMeltaBomb',
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
        function (m) {
            if (m.modelName === 'DA_SpaceMarine_Sergant' || m.modelName === 'DA_Veteran_Sergant' ) {
                return 'Signum';
            } 
            return false;
        },
    ];
	this.defaultSpecialRules = [
		'AndTheyShallKnowNoFear',
		'CombatSquad', 
		'GrimResolve', 
	];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_DevastatorSquad.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
DA_DevastatorSquad.prototype.constructor = DA_DevastatorSquad;
// Методы потомка 
DA_DevastatorSquad.prototype.visibleName = 'Devastator Squad';


WHOptionAddModelFabric([{

    'optionName' : 'DA_DevastatorSquad_addSpaceMarine',
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
	            	&& (this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_DevastatorSquad_HeavyWeapons'
	            		||
	            		this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_DevastatorSquad_SpecialWeapons')

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


fabric_option_unitMayTake([
{
    optionName : 'DA_ArmoriumCherub',
    cost : 5,
    addItems : ['ArmoriumCherub'],
}
]);
//==============================================================================




var DA_DevastatorSquad_HeavyWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_HeavyWeapons_HeavyBolter',
        'DA_HeavyWeapons_MultiMelta',
        'DA_HeavyWeapons_MissleLuauncher',
        'DA_HeavyWeapons_MissleLuauncherFlakk',
        'DA_HeavyWeapons_PlasmaCannon',
        'DA_HeavyWeapons_Lascannon',
        'DA_HeavyWeapons_GravCannonWithAmp',
    ]
    this.optionName = 'DA_DevastatorSquad_HeavyWeapons';
    this.cost = 0;
    this.headerText = 'Heavy Weapons. Заменить свой boltgun на одно из следующего';
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_DevastatorSquad_HeavyWeapons.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DevastatorSquad_HeavyWeapons.prototype.constructor = DA_DevastatorSquad_HeavyWeapons;


DA_DevastatorSquad_HeavyWeapons.prototype.canEnable = function() {
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) { 
            if (this.unit.models[m].wargear[w].createBy.hasOwnProperty('superOption')
                &&
                this.unit.models[m].wargear[w].createBy.superOption.hasOwnProperty('optionName')
                &&
                this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_DevastatorSquad_HeavyWeapons'
            ) {   
                 return false;
            }
        }
    }

    return MultiChangeFromWargear_class.prototype.canEnable.apply(this,arguments)
}


DA_DevastatorSquad_HeavyWeapons.prototype.isModelCanChange = function(m, superOption) {
    if (m.modelName !== 'DA_SpaceMarine') {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)
}


//==============================================================================


var DA_DevastatorSquad_upgradeToVeteran = function(o) {
    this.optionName = 'DA_DevastatorSquad_upgradeToVeteran';
    this.cost = 10;
    this.actionText = 'Space Marine Sergant можно усовершенствовать до Veteran Sergant';
    this.actionIcon = 'upgrade';
    OptionChek.apply(this, arguments);

}

// Унаследовать
DA_DevastatorSquad_upgradeToVeteran.prototype = Object.create(OptionChek.prototype);

// Желательно и constructor сохранить
DA_DevastatorSquad_upgradeToVeteran.prototype.constructor = DA_DevastatorSquad_upgradeToVeteran;


DA_DevastatorSquad_upgradeToVeteran.prototype.on  = function() {
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== 'structure' 
        	|| this.unit.models[i].modelName !== 'DA_SpaceMarine_Sergant'
            || this.unit.models[i].touchedByOptions.length !== 0) {
            continue;
        }
        this.unit.models.splice(i,1);
        this.unit.models.splice(0, 0, new DA_Veteran_Sergant({
            unit: this.unit,
            createBy: this
        }));
        this.usedCount++;
        break;
    }
    
    this.iUpdated();
}


DA_DevastatorSquad_upgradeToVeteran.prototype.off  = function() {
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== this) {
            continue;
        }
        this.unit.models.splice(i,1);
        this.unit.models.splice(0, 0, new DA_SpaceMarine_Sergant({
            unit: this.unit,
            createBy: 'structure'
        }));
        this.usedCount--;
        break;
    }
    this.iUpdated();
}




//==============================================================================





var DA_DevastatorSquad_MeleeWeapons = function(o) {
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
    this.optionName = 'DA_DevastatorSquad_MeleeWeapons';
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
DA_DevastatorSquad_MeleeWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DevastatorSquad_MeleeWeapons.prototype.constructor = DA_DevastatorSquad_MeleeWeapons;





//==============================================================================




var DA_DevastatorSquad_AddMeltaBomb = function(o) {
    this.defaultSubOptions = [
        'DA_AddMeltaBomb_MeltaBomb'
    ]
    this.optionName = 'DA_DevastatorSquad_AddMeltaBomb';
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
DA_DevastatorSquad_AddMeltaBomb.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_DevastatorSquad_AddMeltaBomb.prototype.constructor = DA_DevastatorSquad_AddMeltaBomb;



//==============================================================================



