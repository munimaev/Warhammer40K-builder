
var DA_CommandSquad = function(o) {
	this.unitName = 'DA_CommandSquad';
	this.price = 90;
	this.optionsDefault = [
		'DA_CommandSquad_Standart',
        'DA_CommandSquad_upgradeToCompanyChampion',
        'DA_CommandSquad_upgradeToApothecary',
        'DA_CommandSquad_AddMeltaBomb',
		'DA_CommandSquad_MeleeAndRangedWeapons',
		// 'DA_CommandSquad_HeavyWeapons',
		'DA_DedicatedFastTransport',
	];
	this.structureDefault = {
		'DA_Veteran' : 5,
	}
    this.defaultUnitWargear = [
    	'Chainsword',
    	'BoltPistol',
    	'FragGrenades',
    	'KrakGrenades',
    ];
	this.defaultSpecialRules = [
		'AndTheyShallKnowNoFear',
		'GrimResolve',
		'HonorOrDeath',
	];
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_CommandSquad.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_CommandSquad.prototype.constructor = DA_CommandSquad;
// Методы потомка 
DA_CommandSquad.prototype.visibleName = 'Command Squad';
DA_CommandSquad.prototype.pic = 'units_DA/SpaceMarinesCommandSquad.jpg';





var DA_CommandSquad_Standart = function(o) {
    this.defaultSubOptions = [
		'DA_Standart_CompanyStandart',
		'DA_Standart_ChapterBanner',
		'DA_Standart_SacredStandart',
    ]
    this.optionName = 'DA_CommandSquad_Standart';
    this.cost = 0;
    this.headerText = 'Один ветеран взять следующее';
    this.isModelCanGet =  function(m, superOption) {
        if (m.modelName !== 'DA_Veteran') {
            return false;
        }
    	for (var m1 in m.unit.models) {
    		for (var w in m.unit.models[m1].wargear) {
    			if (m.unit.models[m1].wargear[w].createBy === superOption) {
    				return false;
    			}
    		}
    	}
        for (var i in m.wargear) {
            if (m.wargear[i].createBy === superOption
                && m.wargear[i].wargearName !== 'emptySlot') {
                return false;
            }
        }
        return true;
    }

    AddFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_CommandSquad_Standart.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_CommandSquad_Standart.prototype.constructor = DA_CommandSquad_Standart;

DA_CommandSquad_Standart.prototype.canEnableWeapon = function(option,superOption){
    // option.superOption - DA_RangedWeapons_Boltgun 
    // 
    // console.log('---------------------------')
    // console.log(option)
    
    var superOption = option !== null ? option.superOption : superOption;
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) {
            if (this.unit.models[m].wargear[w].createBy.superOption == superOption.superOption) {    
                return false;
            }
        }
    }
    return true;
};



//==============================================================================




var DA_CommandSquad_upgradeToCompanyChampion = function(o) {
    this.optionName = 'DA_CommandSquad_upgradeToCompanyChampion';
    this.cost = 15;
    this.actionText = 'Один ветеран может быть улучшен до <b>Company Master</b> с заменой его Chainsword на Blade of Caliban и Combat Shield <i>за 15 очков</i>.';
    this.actionIcon = 'upgrade';
    OptionChek.apply(this, arguments);

}

// Унаследовать
DA_CommandSquad_upgradeToCompanyChampion.prototype = Object.create(OptionChek.prototype);

// Желательно и constructor сохранить
DA_CommandSquad_upgradeToCompanyChampion.prototype.constructor = DA_CommandSquad_upgradeToCompanyChampion;


DA_CommandSquad_upgradeToCompanyChampion.prototype.on  = function() {
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== 'structure' 
            || this.unit.models[i].modelName !== 'DA_Veteran'
            || this.unit.models[i].touchedByOptions.length !== 0) {
            continue;
        }
        this.unit.models.splice(i,1);
        this.unit.models.splice(0, 0, new DA_CompanyChampion({
            unit: this.unit,
            createBy: this
        }));
        this.unit.models[0].removeWargear({name:'Chainsword'});
        this.unit.models[0].addWargear({name:'CombatShield',createBy:this});
        this.unit.models[0].addWargear({name:'CombatShield',createBy:this});
        this.usedCount++;
        break;
    }
    
    this.iUpdated();
}


DA_CommandSquad_upgradeToCompanyChampion.prototype.off  = function() {
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== this) {
            continue;
        }
        this.unit.models.splice(i,1);
        this.unit.models.push(new DA_Veteran({
            unit: this.unit,
            createBy: 'structure'
        }));
        this.usedCount--;
        break;
    }
    this.iUpdated();
}






//==============================================================================




var DA_CommandSquad_upgradeToApothecary = function(o) {
    this.optionName = 'DA_CommandSquad_upgradeToApothecary';
    this.cost = 15;
    this.actionText = 'Один ветеран может быть улучшен до <b>Apothecary</b> c Nathecium <i>за 15 очков</i>.';
    this.actionIcon = 'upgrade';
    OptionChek.apply(this, arguments);

}

// Унаследовать
DA_CommandSquad_upgradeToApothecary.prototype = Object.create(OptionChek.prototype);

// Желательно и constructor сохранить
DA_CommandSquad_upgradeToApothecary.prototype.constructor = DA_CommandSquad_upgradeToApothecary;


DA_CommandSquad_upgradeToApothecary.prototype.on  = function() {
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== 'structure' 
            || this.unit.models[i].modelName !== 'DA_Veteran'
            || this.unit.models[i].touchedByOptions.length !== 0) {
            continue;
        }
        this.unit.models.splice(i,1);
        this.unit.models.splice(0, 0, new DA_Apothecary({
            unit: this.unit,
            createBy: this
        }));
        this.unit.models[0].addWargear({name:'Nathecium',createBy:this});
        this.usedCount++;
        break;
    }
    
    this.iUpdated();
}


DA_CommandSquad_upgradeToApothecary.prototype.off  = function() {
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== this) {
            continue;
        }
        this.unit.models.splice(i,1);
        this.unit.models.push(new DA_Veteran({
            unit: this.unit,
            createBy: 'structure'
        }));
        this.usedCount--;
        break;
    }
    this.iUpdated();
}






//==============================================================================


var DA_CommandSquad_AddMeltaBomb = function(o) {
    this.defaultSubOptions = [
        'DA_AddMeltaBomb_MeltaBomb',
        'DA_AddWargearShield_StormShield'
    ]
    this.optionName = 'DA_CommandSquad_AddMeltaBomb';
    this.cost = 0;
    this.headerText = 'Любой ветеран может взять следующее';
    this.isModelCanGet =  function(m, superOption) {
        if (m.modelName !== 'DA_Veteran'){
            return false;
        }
        for (var i in m.wargear) {
            if (m.wargear[i].createBy === superOption
                && m.wargear[i].wargearName !== 'emptySlot') {
                return false;
            }
        }
        return true;
    }

    AddFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_CommandSquad_AddMeltaBomb.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_CommandSquad_AddMeltaBomb.prototype.constructor = DA_CommandSquad_AddMeltaBomb;





//==============================================================================




var DA_CommandSquad_MeleeAndRangedWeapons = function(o) {
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
    this.optionName = 'DA_CommandSquad_MeleeAndRangedWeapons';
    this.cost = 0;
    this.headerText = 'Любой ветеран заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из cледующего';
    this.isWargearToChange = function(w,m) {

        if (m.modelName === 'DA_Veteran'
            && (w.wargearName == 'Boltgun' 
            || w.wargearName == 'BoltPistol' 
            || w.wargearType == 'MeleeWeapon'
            ) && w.createBy === m
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_CommandSquad_MeleeAndRangedWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_CommandSquad_MeleeAndRangedWeapons.prototype.constructor = DA_CommandSquad_MeleeAndRangedWeapons;



//==============================================================================






var DA_CommandSquad_SpecialWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_SpecialWeapons_Flamer',
        'DA_SpecialWeapons_MeltaGun',
        'DA_SpecialWeapons_GravGun',
        'DA_SpecialWeapons_PlasmsGun',
    ]
    this.optionName = 'DA_CommandSquad_SpecialWeapons';
    this.cost = 0;
    this.headerText = 'Любой ветеран заменить свой boltgun и/или оружие ближнего боя на одно из cледующего';
    this.isWargearToChange = function(w,m) {
        if (m.modelName === 'DA_Veteran'
            && (w.wargearName == 'Boltgun' 
                || w.wargearType == 'MeleeWeapon') 
            && w.createBy === m
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_CommandSquad_SpecialWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_CommandSquad_SpecialWeapons.prototype.constructor = DA_CommandSquad_SpecialWeapons;





//==============================================================================










//==============================================================================




//==============================================================================


