
var DA_VeteranSquad = function(o) {
	this.unitName = 'DA_VeteranSquad';
	this.price = 90;
	this.optionsDefault = [
		'DA_VeteranSquad_addVeteran',
		'DA_RangedWeapons',
		'DA_VeteranSquad_MeleeWeapons',
		'DA_VeteranSquad_SpecialWeapons',
		'DA_VeteranSquad_HeavyWeapons',
		'DA_VeteranSquad_AddMeltaBomb',
		'DA_AddWargearShield',
		'DA_DedicatedFastTransport',
	];
	this.structureDefault = {
		'DA_Veteran_Sergant' : 1,
		'DA_Veteran' : 4,
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
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_VeteranSquad.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_VeteranSquad.prototype.constructor = DA_VeteranSquad;
// Методы потомка 
DA_VeteranSquad.prototype.visibleName = 'Company Veteran Squad';
DA_VeteranSquad.prototype.pic = 'units_DA/VeteransSquad.jpg';



//==============================================================================


WH_OptionAddModelFabric([{
    'optionName' : 'DA_VeteranSquad_addVeteran',
    'cost' : 18,
    'maxCountAdding' : 5,
    'modelToAdd' : 'DA_Veteran',
}]);



//==============================================================================




var DA_VeteranSquad_SpecialWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_SpecialWeapons_Flamer',
        'DA_SpecialWeapons_MeltaGun',
        'DA_SpecialWeapons_GravGun',
        'DA_SpecialWeapons_PlasmaGun',
    ]
    this.optionName = 'DA_VeteranSquad_SpecialWeapons';
    this.cost = 0;
    this.headerText = 'За каждые пять моделей в отряде один Ветеран может заменить свой boltgun или Melee weapon одно из следующего:';
    this.needChekEnambleEachTime = true;
    this.isWargearToChange = function(w,m) {
        if (m.modelName == 'DA_Veteran'
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
DA_VeteranSquad_SpecialWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_VeteranSquad_SpecialWeapons.prototype.constructor = DA_VeteranSquad_SpecialWeapons;



DA_VeteranSquad_SpecialWeapons.prototype.canEnableWeapon = function(option,superOption){
    // option.superOption - DA_RangedWeapons_Boltgun 
    // 
    // console.log('---------------------------')
    // console.log(option)
    var superOption = option !== null ? option.superOption : superOption;
    var models = this.unit.models.length;
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) {
            if (this.unit.models[m].wargear[w].createBy.superOption == superOption.superOption) {    
               models -= 5;
            }
        }
    }

    if (models >= 5 ) {
        return ChangeFromWargear_class.prototype.canEnableWeapon.apply(this,arguments);
    }
    else {
        return false;
    }
};



//==============================================================================



// --------- Класс-потомок ChangeFromWargear_class -----------
var DA_VeteranSquad_HeavyWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_HeavyWeapons_HeavyBolter',
        'DA_HeavyWeapons_MultiMelta',
        'DA_HeavyWeapons_MissleLuauncher',
        'DA_HeavyWeapons_MissleLuauncherFlakk',
        'DA_HeavyWeapons_PlasmaCannon',
        'DA_HeavyWeapons_Lascannon',
        'DA_HeavyWeapons_GravCannonWithAmp',
    ]
    this.optionName = 'DA_VeteranSquad_HeavyWeapons';
    this.cost = 0;
    this.headerText = 'Один Ветеран может заменить свой boltgun на одно из следующего:';
    this.needChekEnambleEachTime = true;
    this.isWargearToChange = function(w,m) {
        if (m.modelName == 'DA_Veteran'
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
DA_VeteranSquad_HeavyWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_VeteranSquad_HeavyWeapons.prototype.constructor = DA_VeteranSquad_HeavyWeapons;



DA_VeteranSquad_HeavyWeapons.prototype.canEnableWeapon = function(option,superOption){
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



//==============================================================================




var DA_VeteranSquad_MeleeWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_MeleeWeapons_Chainsword',
        'DA_MeleeWeapons_LightningClaws',
        'DA_MeleeWeapons_PowerWeapon',
        'DA_MeleeWeapons_PowerFist',
        'DA_MeleeWeapons_ThunderHammer',
    ]
    this.optionName = 'DA_VeteranSquad_MeleeWeapons';
    this.cost = 0;
    this.headerText = 'Любая модель может заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из cледующего';
    this.isWargearToChange = function(w,m) {
        if ((w.wargearName == 'Boltgun' 
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
DA_VeteranSquad_MeleeWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_VeteranSquad_MeleeWeapons.prototype.constructor = DA_VeteranSquad_MeleeWeapons;




//==============================================================================





var DA_VeteranSquad_AddMeltaBomb = function(o) {
    this.defaultSubOptions = [
        'DA_AddMeltaBomb_MeltaBomb'
    ]
    this.optionName = 'DA_VeteranSquad_AddMeltaBomb';
    this.cost = 0;
    this.headerText = 'Любая модель взять следующее';
    this.isModelCanGet =  function(m, superOption) {
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
DA_VeteranSquad_AddMeltaBomb.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_VeteranSquad_AddMeltaBomb.prototype.constructor = DA_VeteranSquad_AddMeltaBomb;



//==============================================================================

