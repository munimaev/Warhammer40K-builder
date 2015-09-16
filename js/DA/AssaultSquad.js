
var DA_AssaultSquad = function(o) {
	this.unitName = 'DA_AssaultSquad';
	this.price = 70;
	this.optionsDefault = [
		'DA_AssaultSquad_addSpaceMarine',
		'DA_AssaultSquad_Jumppack',
		'DA_AssaultSquad_SpecialWeapons',
        'DA_AssaultSquad_ChainSword',
		'DA_upgradeSpaceMarineSergeantToVeteran',
		'DA_TacticalSquad_MeleeWeapons',
		'DA_AssaultSquad_AddMeltaBomb',
		'DA_AssaultSquade_DedicatedFastTransport',
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
	WH_Unit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_AssaultSquad.prototype = Object.create(WH_Unit_Infantry.prototype);
// Желательно и constructor сохранить
DA_AssaultSquad.prototype.constructor = DA_AssaultSquad;
// Методы потомка 
DA_AssaultSquad.prototype.visibleName = 'Assault Squad';

DA_AssaultSquad.prototype.pic = 'units_DA/AssaultSquad.jpg';

WH_OptionAddModelFabric([{
    'optionName' : 'DA_AssaultSquad_addSpaceMarine',
    'cost' : 14,
    'maxCountAdding' : 5,
    'modelToAdd' : 'DA_SpaceMarine',
}]);







//==============================================================================


var DA_AssaultSquad_Jumppack = function(o) {
    this.optionName = 'DA_AssaultSquad_Jumppack';
    this.cost = 3;
    this.actionText = 'Вест отряд может взять jump pack по 3 очка за модель.';
    this.actionIcon = 'upgrade';
    OptionChek.apply(this, arguments);

}

// Унаследовать
DA_AssaultSquad_Jumppack.prototype = Object.create(OptionChek.prototype);

// Желательно и constructor сохранить
DA_AssaultSquad_Jumppack.prototype.constructor = DA_AssaultSquad_Jumppack;


DA_AssaultSquad_Jumppack.prototype.on  = function() {
    for (var i in this.unit.models) {
        var hasItem = false;
        for (var w in this.unit.models[i].wargear) {
            if (this.unit.models[i].wargear[w].wargearName == 'JumpPack') {
                hasItem = true;
                break;
            }
        }
        if (!hasItem) {
            this.unit.models[i].addWargear({
                name: 'JumpPack',
                createBy: 'structure',
                model:this.unit.models[i]
            })
        }
        this.usedCount++;
    }
    this.unit.unitWargear.push('JumpPack')
    this.iUpdated();
}


DA_AssaultSquad_Jumppack.prototype.off  = function() {
    for (var i in this.unit.models) {
        for (var w in this.unit.models[i].wargear) {
            if (this.unit.models[i].wargear[w].wargearName == 'JumpPack') {
                this.unit.models[i].wargear.splice(w,1);
                break;
            }
        }
        this.usedCount--;
    }
    for (var i in this.unit.unitWargear) {
        if (this.unit.unitWargear[i] == 'JumpPack') {
            this.unit.unitWargear.splice(i,1);
            break;
        }
    }
    
    this.iUpdated();
}

DA_AssaultSquad_Jumppack.prototype.getAdditionalCost  = function() {
    var totalPaid = 0;
    for (var i in this.unit.models) {
        for (var w in this.unit.models[i].wargear) {
            if (this.unit.models[i].wargear[w].wargearName == 'JumpPack') {
                totalPaid += this.cost;
                break;
            }
        }
    }
    return totalPaid;
}

DA_AssaultSquad_Jumppack.prototype.isBlocked = function() {
    if (this.unit.dedicatedTransport !== null) {
        return true;
    }
    return false;
}



//==============================================================================


var DA_AssaultSquad_SpecialWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_AssaultSquade_SpecialWeapons_Flamer',
        'DA_AssaultSquade_SpecialWeapons_PlasmaPistol',
    ]
    this.optionName = 'DA_AssaultSquad_SpecialWeapons';
    this.cost = 0;
    this.headerText = 'До двух Space Marine могутзаменить свой boltgun на одно из следующего';
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_AssaultSquad_SpecialWeapons.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_AssaultSquad_SpecialWeapons.prototype.constructor = DA_AssaultSquad_SpecialWeapons;


DA_AssaultSquad_SpecialWeapons.prototype.canEnable = function(){
    var count = 0;
    for (var m1 in this.unit.models) {
        for (var w1 in this.unit.models[m1].wargear) {
            if (
                this.unit.models[m1].wargear[w1].createBy
                &&
                this.unit.models[m1].wargear[w1].createBy.optionName
                &&
                ~this.defaultSubOptions.indexOf(this.unit.models[m1].wargear[w1].createBy.optionName)
            ) {
                count++;
            }
        }
    }
    if (count >= 2) {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.canEnable.apply(this, arguments);;
};


DA_AssaultSquad_SpecialWeapons.prototype.isModelCanChange = function(m, superOption) {
    if (m.modelName != 'DA_SpaceMarine') {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)
}



DA_RangedWeaponsFabric([
{
    'optionName'      : 'DA_AssaultSquade_SpecialWeapons_Flamer',
    'cost' : 5,
    addItems : ['Flamer'],
    removeItems : ['Boltgun'],
},{
    'optionName'      : 'DA_AssaultSquade_SpecialWeapons_PlasmaPistol',
    'cost' : 15,
    addItems : ['PlasmaPistol'],
    removeItems : ['Boltgun'],
}
]);


//==============================================================================



var DA_AssaultSquad_ChainSword = function(o) {
    this.defaultSubOptions = [
        'DA_MeleeWeapons_ChainswordWithAnEviscerator',
    ]
    this.optionName = 'DA_AssaultSquad_ChainSword';
    this.cost = 0;
    this.headerText = 'За каждые пять моделей в отряде одна модель может заменить свой boltgun на одно из следующего:';
   
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_AssaultSquad_ChainSword.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_AssaultSquad_ChainSword.prototype.constructor = DA_AssaultSquad_ChainSword;




DA_AssaultSquad_ChainSword.prototype.canEnable = function(){
    var count = 0;
    for (var m1 in this.unit.models) {
        for (var w1 in this.unit.models[m1].wargear) {
            if (
                this.unit.models[m1].wargear[w1].createBy
                &&
                this.unit.models[m1].wargear[w1].createBy.optionName
                &&
                ~this.defaultSubOptions.indexOf(this.unit.models[m1].wargear[w1].createBy.optionName)
            ) {
                count++;
            }
        }
    }
    if (this.unit.models.length - count * 5 < 5) {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.canEnable.apply(this, arguments);;

};


//==============================================================================



var DA_AssaultSquad_AddMeltaBomb = function(o) {
    this.defaultSubOptions = [
        'DA_AddMeltaBomb_MeltaBomb',
        'DA_AddWargearShield_CombatShield'
    ]
    this.optionName = 'DA_AssaultSquad_AddMeltaBomb';
    this.cost = 0;
    this.headerText = 'Space Marine Sergant или Veteran Sergant взять следующее';  

    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_AssaultSquad_AddMeltaBomb.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_AssaultSquad_AddMeltaBomb.prototype.constructor = DA_AssaultSquad_AddMeltaBomb;


DA_AssaultSquad_AddMeltaBomb.prototype.isModelCanChange = function(m, superOption) {
    if (m.modelName !== 'DA_SpaceMarine_Sergant' && m.modelName !== 'DA_Veteran_Sergant') {
        return false;
    }
    return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)
}

//==============================================================================



var DA_AssaultSquade_DedicatedFastTransport = function(o) {
    this.headerText = 'Если jump pack  не были взяты, отряд может выбратьв качестве прикомандированного транспорта одно из следующего';
    this.optionName = 'DA_AssaultSquade_DedicatedFastTransport';
    this.defaultSubOptions = [
        'DA_DedicatedTransport_DropPod',
        'DA_DedicatedTransport_Rhino',
        'DA_DedicatedTransport_Razorback',
    ]
    DA_DedicatedTransport.apply(this, arguments);
}
// Унаследовать
DA_AssaultSquade_DedicatedFastTransport.prototype = Object.create(DA_DedicatedTransport.prototype);
// Желательно и constructor сохранить
DA_AssaultSquade_DedicatedFastTransport.prototype.constructor = DA_AssaultSquade_DedicatedFastTransport;

DA_AssaultSquade_DedicatedFastTransport.prototype.isBlocked = function() {
    if(~this.unit.unitWargear.indexOf('JumpPack')) {
        return true;
    }
    return false;
    
}