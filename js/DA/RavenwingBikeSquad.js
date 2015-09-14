
var DA_RavenwingSquad = function(o) {
	this.unitName = 'DA_RavenwingSquad';
	this.price = 75;
	this.optionsDefault = [
		'DA_RavenwingSquad_addRavenwing_Biker',
        'DA_RavenwingSquad_BoltPistolChange_toChainsword',
        'DA_RavenwingSquad_BoltPistolChange',
		'DA_upgradeRavenwingSergeantToVeteran',
		'DA_RavenwingSquad_SergeantWeapon',
		'DA_RavenwingSquad_AddMeltaBomb',
        'DA_RavenwingSquad_addRavenwing_Attack_Bike',
        'DA_Ravenwing_Attack_Bike_replace',
	];
	this.structureDefault = {
		'DA_Ravenwing_Sergeant' : 1,
		'DA_Ravenwing_Biker' : 2,
	}
    this.defaultUnitWargear = [
    	'BoltPistol',
    	'FragGrenades',
    	'KrakGrenades',
        'SpaceMarineBike',
        function(m) {
            if (m.modelName === 'DA_Ravenwing_Attack_Bike') {
                return 'HeavyBolter';
            }
            return false;
        }
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
DA_RavenwingSquad.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_RavenwingSquad.prototype.constructor = DA_RavenwingSquad;
// Методы потомка 
DA_RavenwingSquad.prototype.visibleName = 'Ravenwing Squad';
DA_RavenwingSquad.prototype.pic = 'units_DA/BikeSquad.jpg';


WH_OptionAddModelFabric([{
    'optionName' : 'DA_RavenwingSquad_addRavenwing_Biker',
    'cost' : 25,
    'maxCountAdding' : 3,
    'modelToAdd' : 'DA_Ravenwing_Biker',
}]);

WH_OptionAddModelFabric([{
    'optionName' : 'DA_RavenwingSquad_addRavenwing_Attack_Bike',
    'cost' : 45,
    'maxCountAdding' : 1,
    'modelToAdd' : 'DA_Ravenwing_Attack_Bike',
}]);





//==============================================================================



var DA_RavenwingSquad_BoltPistolChange_toChainsword = function(o) {
    this.defaultSubOptions = [
        'DA_RavenwingSquad_BoltPistolChange_Chainsword',
    ]
    this.optionName = 'DA_RavenwingSquad_BoltPistolChange_toChainsword';
    this.cost = 0;
    this.headerText = 'Любая модель может заменить свой bolt pistol на одно из следующего';
        
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_RavenwingSquad_BoltPistolChange_toChainsword.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_RavenwingSquad_BoltPistolChange_toChainsword.prototype.constructor = DA_RavenwingSquad_BoltPistolChange_toChainsword;



var DA_RavenwingSquad_BoltPistolChange = function(o) {
    this.defaultSubOptions = [
        'DA_RavenwingSquad_BoltPistolChange_Flamer',
        'DA_RavenwingSquad_BoltPistolChange_MeltaGun',
        'DA_RavenwingSquad_BoltPistolChange_GravGun',
        'DA_RavenwingSquad_BoltPistolChange_PlasmsGun',
    ]
    this.optionName = 'DA_RavenwingSquad_BoltPistolChange';
    this.cost = 0;
    this.headerText = 'До двух Ravenwing Biker могут заменить свой bolt pistol на одно из следующего';
        
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_RavenwingSquad_BoltPistolChange.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_RavenwingSquad_BoltPistolChange.prototype.constructor = DA_RavenwingSquad_BoltPistolChange;

DA_RavenwingSquad_BoltPistolChange.prototype.canEnable = function() {
    var count = 0;
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) { 
            if (this.unit.models[m].wargear[w].createBy.hasOwnProperty('superOption')
                &&
                this.unit.models[m].wargear[w].createBy.superOption.hasOwnProperty('optionName')
                &&
                this.unit.models[m].wargear[w].createBy.superOption.optionName == 'DA_RavenwingSquad_BoltPistolChange'
            ) {  
                console.log(count)
                if (++count >= 2) {
                    return false;
                }
            }
        }
    }

    return MultiChangeFromWargear_class.prototype.canEnable.apply(this,arguments)
}

DA_RavenwingSquad_BoltPistolChange.prototype.isModelCanChange = function(m, superOption) {
    if (m.modelName !== 'DA_Ravenwing_Biker') {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)
}

DA_RangedWeaponsFabric([

{
    optionName : 'DA_RavenwingSquad_BoltPistolChange_Chainsword',
    cost : 5,
    removeItems : ['BoltPistol'],
    addItems : ['Chainsword'],
},{
    optionName : 'DA_RavenwingSquad_BoltPistolChange_Flamer',
    cost : 5,
    removeItems : ['BoltPistol'],
    addItems : ['Flamer'],
},{
    optionName : 'DA_RavenwingSquad_BoltPistolChange_MeltaGun',
    cost : 10,
    removeItems : ['BoltPistol'],
    addItems : ['MeltaGun'],
},{
    optionName : 'DA_RavenwingSquad_BoltPistolChange_GravGun',
    cost : 15,
    removeItems : ['BoltPistol'],
    addItems : ['GravGun'],
},{
    optionName : 'DA_RavenwingSquad_BoltPistolChange_PlasmsGun',
    cost : 15,
    removeItems : ['BoltPistol'],
    addItems : ['PlasmsGun'],
},

]);

//==============================================================================


var DA_RavenwingSquad_SergeantWeapon = function(o) {
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
    this.optionName = 'DA_RavenwingSquad_SergeantWeapon';
    this.cost = 0;
    this.headerText = 'Ravenwing Sergeant или Ravenwing Veteran Sergeant может заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из cледующего';
    this.isWargearToChange = function(w,m) {
        if ((w.wargearName == 'Boltgun' 
            || w.wargearName == 'BoltPistol' 
            || w.wargearType == 'MeleeWeapon'
            ) 
            && w.createBy === m
            && (m.modelName === 'DA_Ravenwing_Sergeant'
            	|| m.modelName === 'DA_Ravenwing_Veteran_Sergeant')
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_RavenwingSquad_SergeantWeapon.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_RavenwingSquad_SergeantWeapon.prototype.constructor = DA_RavenwingSquad_SergeantWeapon;







//==============================================================================




var DA_RavenwingSquad_AddMeltaBomb = function(o) {
    this.defaultSubOptions = [
        'DA_AddMeltaBomb_MeltaBomb'
    ]
    this.optionName = 'DA_RavenwingSquad_AddMeltaBomb';
    this.cost = 0;
    this.headerText = 'Space Marine Sergant или Veteran Sergant взять следующее';  

    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_RavenwingSquad_AddMeltaBomb.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_RavenwingSquad_AddMeltaBomb.prototype.constructor = DA_RavenwingSquad_AddMeltaBomb;


DA_RavenwingSquad_AddMeltaBomb.prototype.isModelCanChange = function(m, superOption) {
    if (m.modelName !== 'DA_Ravenwing_Sergeant' && m.modelName !== 'DA_Ravenwing_Veteran_Sergeant') {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)


}

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
    console.log(m)
    if (m.modelName !== 'DA_Ravenwing_Attack_Bike') {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)
}

DA_RangedWeaponsFabric([

{
    optionName : 'DA_Ravenwing_Attack_Bike_replace_MultiMelta',
    cost : 10,
    removeItems : ['HeavyBolter'],
    addItems : ['MultiMelta'],
}
]);
