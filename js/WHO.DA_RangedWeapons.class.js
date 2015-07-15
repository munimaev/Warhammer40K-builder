var ChangeFromWargear_class = function(o) {

    // this.isWargearToChange = this.isWargearToChange || debugger;
    this.needChekEnambleEachTime =  this.needChekEnambleEachTime || false;
    this.isAdd = this.isAdd || false;
    WHOptionSuper.apply(this, arguments);
}

// Унаследовать
ChangeFromWargear_class.prototype = Object.create(WHOptionSuper.prototype);
// Желательно и constructor сохранить
ChangeFromWargear_class.prototype.constructor = ChangeFromWargear_class;


ChangeFromWargear_class.prototype.enableWeapon = function(option, superOption){
    //option - WHOption - on/off
    //option.superOption - DA_RangedWeapons_Boltgun 
    //option.superOption.superOption - DA_RangedWeapons / ChangeFromWargear_class / this 
    var superOption = option !== null ? option.superOption : superOption;
    if (this.canEnableWeapon(option, superOption)) {

        for (var m in this.unit.models) {
            for (var w =this.unit.models[m].wargear.length-1; w >= 0; w--) {
                if (this.isWargearToChange(this.unit.models[m].wargear[w], this.unit.models[m])) {
                    this.unit.models[m].wargear[w].readyToChange = {
                        name: superOption.changeTo,
                        createBy: superOption,
                        usedOption: superOption,
                    };
                    if (this.needChekEnambleEachTime) {
                        this.unit.models[m].wargear[w].readyToChange.needChekEnambleEachTime = true;
                    }
                } 
                else {
                    this.unit.models[m].wargear[w].readyToChange = null;
                    if (this.unit.models[m].wargear[w].wargearName == 'emptySlot' ) {
                        this.unit.models[m].wargear.splice(w,1);
                    }
                }
            }
        }
        this.unit.isShowModels = true;
        this.unit.$lModels.show();
        this.unit.updateModels();
        // this.iUpdated();
    }
};

ChangeFromWargear_class.prototype.canEnableWeapon = function(){
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) {
            if (this.isWargearToChange(this.unit.models[m].wargear[w], this.unit.models[m])) {
                return true;
            }
        }
    }
    return false;
};

ChangeFromWargear_class.prototype.disableWeapon = function(option){
    //option - WHOption 
    //option.superOption - RewardsOfChaosLesserRewards 
    //option.superOption.superOption - ChangeFromWargear_class 
    if (this.canDisableWeapon(option)) {

        for (var m in this.unit.models) {
            for (var w in this.unit.models[m].wargear) {
                if (
                    this.unit.models[m].wargear[w].createBy === option.superOption
                ) {
                    this.unit.models[m].wargear[w].readyToChange = this.unit.models[m].wargear[w].changedFrom;
                } 
                else {
                    this.unit.models[m].wargear[w].readyToChange = null;
                }
            }
        }
        this.unit.isShowModels = true;
        this.unit.$lModels.show();
        this.unit.updateModels();
        // this.iUpdated();
    }
};

ChangeFromWargear_class.prototype.canDisableWeapon = function(option){
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) {
            // console.log(this.unit.models[m].wargear[w].createBy === option.superOption)
            if (
                this.unit.models[m].wargear[w].createBy === option.superOption
            ) {
                return true;
            }
        }
    }
    return false;
};


ChangeFromWargear_class.prototype.getAdditionalCost = function() {
    var totalPaid = 0;
    for (var m in this.unit.models) {
        for (var w in this.unit.models[m].wargear) {
            // console.log(this.unit.models[m].wargear[w].createBy)
            if (
                this.unit.models[m].wargear[w].createBy.superOption === this
            ) {
                totalPaid += this.unit.models[m].wargear[w].createBy.cost;
            }
        }
    }
    return totalPaid;
}







//=========================



var AddFromWargear_class = function(o) {

    // this.isWargearToChange = this.isWargearToChange || debugger;
    this.needChekEnambleEachTime =  this.needChekEnambleEachTime || false;
    this.isAdd = this.isAdd || false;
    ChangeFromWargear_class.apply(this, arguments);
}

// Унаследовать
AddFromWargear_class.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
AddFromWargear_class.prototype.constructor = AddFromWargear_class;


AddFromWargear_class.prototype.canEnableWeapon = function(){
    for (var m in this.unit.models) {
        if (this.isModelCanGet(this.unit.models[m],this)) {
            return true;
        }
    }
    return false;
};

AddFromWargear_class.prototype.enableWeapon = function(option, superOption){
    //option - WHOption - on/off
    //option.superOption - DA_RangedWeapons_Boltgun 
    //option.superOption.superOption - DA_RangedWeapons / AddFromWargear_class / this 
    var superOption = option !== null ? option.superOption : superOption;
    if (this.canEnableWeapon(option, superOption)) {

        for (var m in this.unit.models) {


            for (var w in this.unit.models[m].wargear){
                // this.unit.models[m].wargear[w].readyToChange = null;
                if (this.unit.models[m].wargear[w].wargearName == 'emptySlot' ) {
                    this.unit.models[m].wargear.splice(w,1);
                }
            }

            if (this.isModelCanGet(this.unit.models[m], superOption)) {

                this.unit.models[m].addWargear({name:'emptySlot',createBy:this})

                this.unit.models[m].wargear[this.unit.models[m].wargear.length-1].readyToChange = {
                    name: superOption.changeTo,
                    createBy: superOption,
                    usedOption: superOption,
                };

                this.unit.models[m].wargear[this.unit.models[m].wargear.length-1].readyToChange.needChekEnambleEachTime = true;
                
            } 
            else {
                for (var w in this.unit.models[m].wargear){
                //     console.log(this.unit.models[m].wargear.wargearName);
                    this.unit.models[m].wargear[w].readyToChange = null;
                //     if (this.unit.models[m].wargear[w].wargearName == 'emptySlot' ) {
                //         this.unit.models[m].wargear.splice(w,1);
                //     }
                }
            }
        }
        this.unit.isShowModels = true;
        this.unit.$lModels.show();
        this.unit.updateModels();
        // this.iUpdated();
    }
};






var DA_AddWargearBomb = function(o) {
    this.defaultSubOptions = [
        'DA_AddWargearBomb_MeltaBomb'
    ]
    this.optionName = 'DA_AddWargearBomb';
    this.cost = 0;
    this.headerText = 'Любая модель взять следующее';
    this.isModelCanGet =  function(m, superOption) {
        for (var i in m.wargear) {
            console.log(m.wargear[i].wargearName)
            console.log(m.wargear[i].createBy === superOption)

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
DA_AddWargearBomb.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_AddWargearBomb.prototype.constructor = DA_AddWargearBomb;




var DA_AddWargearShield = function(o) {
    this.defaultSubOptions = [
        'DA_AddWargearShield_CombatShield',
        'DA_AddWargearShield_StormShield',
    ]
    this.optionName = 'DA_AddWargearShield';
    this.cost = 0;
    this.headerText = 'Любая модель взять следующее';
    this.isModelCanGet =  function(m, superOption) {
        for (var i in m.wargear) {
            console.log(m.wargear[i].wargearName)
            console.log(m.wargear[i].createBy === superOption, m.wargear[i].wargearName !== 'emptySlot')
            console.log(m.wargear[i].createBy,superOption)

            if (m.wargear[i].createBy.superOption === superOption.superOption
                && m.wargear[i].wargearName !== 'emptySlot') {
                return false;
            }
        }
        return true;
    }

    AddFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_AddWargearShield.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_AddWargearShield.prototype.constructor = DA_AddWargearShield;








// --------- Класс-потомок ChangeFromWargear_class -----------
var DA_RangedWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_RangedWeapons_Boltgun',
        'DA_RangedWeapons_StromBolter',
        'DA_RangedWeapons_CombiFlamer',
        'DA_RangedWeapons_CombiGrav',
        'DA_RangedWeapons_CombiMelta',
        'DA_RangedWeapons_CombiPlasma',
        'DA_RangedWeapons_GraviPistol',
        'DA_RangedWeapons_PlasmaPistol',
    ]
    this.optionName = 'DA_RangedWeapons';
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
DA_RangedWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_RangedWeapons.prototype.constructor = DA_RangedWeapons;





// --------- Класс-потомок ChangeFromWargear_class -----------
var DA_MeleeWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_MeleeWeapons_Chainsword',
        'DA_MeleeWeapons_LightningClaws',
        'DA_MeleeWeapons_PowerWeapon',
        'DA_MeleeWeapons_PowerFist',
        'DA_MeleeWeapons_ThunderHammer',
    ]
    this.optionName = 'DA_MeleeWeapons';
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
DA_MeleeWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_MeleeWeapons.prototype.constructor = DA_MeleeWeapons;




// --------- Класс-потомок ChangeFromWargear_class -----------
var DA_SpecialWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_SpecialWeapons_Flamer',
        'DA_SpecialWeapons_MeltaGun',
        'DA_SpecialWeapons_GravGun',
        'DA_SpecialWeapons_PlasmsGun',
    ]
    this.optionName = 'DA_SpecialWeapons';
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
DA_SpecialWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_SpecialWeapons.prototype.constructor = DA_SpecialWeapons;



DA_SpecialWeapons.prototype.canEnableWeapon = function(option,superOption){
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












// --------- Класс-потомок ChangeFromWargear_class -----------
var DA_HeavyWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_HeavyWeapons_HeavyBolter',
        'DA_HeavyWeapons_MultyMelta',
        'DA_HeavyWeapons_MissleLuauncher',
        'DA_HeavyWeapons_MissleLuauncherFlakk',
        'DA_HeavyWeapons_PlasmaCanon',
        'DA_HeavyWeapons_Lasanon',
        'DA_HeavyWeapons_GravCanonWithAmp',
    ]
    this.optionName = 'DA_HeavyWeapons';
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
DA_HeavyWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_HeavyWeapons.prototype.constructor = DA_HeavyWeapons;



DA_HeavyWeapons.prototype.canEnableWeapon = function(option,superOption){
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






var DA_VehicleEquipment = function(o) {
    this.defaultSubOptions = [
        'DA_HeavyWeapons_DozerBlade',
        'DA_HeavyWeapons_StromBolter',
        'DA_HeavyWeapons_ExtraArmour',
        'DA_HeavyWeapons_HunterKillerMissle',
    ]
    this.optionName = 'DA_HeavyWeapons';
    this.cost = 0;
    this.headerText = 'Любая модель взять следующее';
    this.isModelCanGet =  function(m, superOption) {
        for (var i in m.wargear) {
            if (m.wargear[i].createBy.superOption === superOption.superOption
                && m.wargear[i].wargearName !== 'emptySlot') {
                return false;
            }
        }
        return true;
    }

    AddFromWargear_class.apply(this, arguments);
}

// Унаследовать
DA_VehicleEquipment.prototype = Object.create(AddFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_VehicleEquipment.prototype.constructor = DA_VehicleEquipment;




//==============================================


// --------- Класс-потомок WHOption -----------
var DA_RangedWeapons_Class = function(o) {

    this.funCanEnable = function() {
        return this.superOption.superOption.canEnableWeapon(this);
    }

    this.funEnable = function() {
        return this.superOption.superOption.enableWeapon(this);
    }


    this.funCanDisable = function() {
        return this.superOption.superOption.canDisableWeapon(this);
    }

    this.funDisable = function() {
        return this.superOption.superOption.disableWeapon(this);   
    }

    this.funIsNeedShow = this.funCanDisable;

    OptionCounter.apply(this, arguments);

}

// Унаследовать
DA_RangedWeapons_Class.prototype = Object.create(OptionCounter.prototype);

// Желательно и constructor сохранить
DA_RangedWeapons_Class.prototype.constructor = DA_RangedWeapons_Class;







//==============================================


var DA_RangedWeaponsFabric = function(a) {
    for (var i in a) {
        window[a[i].optionName] = function() {
            var optionName =  a[i].optionName;
            var cost = a[i].cost;
            var changeTo = a[i].changeTo;
            var actionTextUp = a[i].actionTextUp;
            var actionIconUp = a[i].actionIconUp;
            var actionTextDown = a[i].actionTextDown;
            var actionIconDown = a[i].actionIconDown;
            return function() {

                this.optionName = optionName;
                this.cost = cost;
                this.changeTo = changeTo;
                this.actionTextUp = actionTextUp;
                this.actionIconUp = actionIconUp;
                this.actionTextDown = actionTextDown;
                this.actionIconDown = actionIconDown;

                DA_RangedWeapons_Class.apply(this, arguments);
            }
        }()
        window[a[i].optionName].prototype = Object.create(DA_RangedWeapons_Class.prototype);
        window[a[i].optionName].prototype.constructor =  window[a[i].optionName];
    }
}

DA_RangedWeaponsFabric([{
    'optionName'      : 'DA_RangedWeapons_Boltgun',
    'optionNameInModel': 'Boltgun',
    'cost' : 0,
    'changeTo' : 'Boltgun',
    'actionTextUp' : 'Boltgun бесплатно.',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Boltgun.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_StromBolter',
    'optionNameInModel': 'StromBolter',
    'cost' : 5,
    'changeTo' : 'StromBolter',
    'actionTextUp' : 'Strom Bolter за 5 очков.',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Strom Bolter.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_CombiFlamer',
    'optionNameInModel': 'CombiFlamer',
    'cost' : 10,
    'changeTo' : 'CombiFlamer',
    'actionTextUp' : 'Combi-Flamer за 10 очков.',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Combi-Flamer.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_CombiGrav',
    'optionNameInModel': 'CombiGrav',
    'cost' : 10,
    'changeTo' : 'CombiGrav',
    'actionTextUp' : 'Combi-Grav за 10 очков.',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Combi-Grav.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_CombiMelta',
    'optionNameInModel': 'CombiMelta',
    'cost' : 10,
    'changeTo' : 'CombiMelta',
    'actionTextUp' : 'Combi-Melta за 10 очков.',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Combi-Melta.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_CombiPlasma',
    'optionNameInModel': 'CombiPlasma',
    'cost' : 10,
    'changeTo' : 'CombiPlasma',
    'actionTextUp' : 'Combi-Plasma за 10 очков.',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Combi-Plasma.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_GraviPistol',
    'optionNameInModel': 'GraviPistol',
    'cost' : 15,
    'changeTo' : 'GraviPistol',
    'actionTextUp' : 'Gravi Pistol за 15 очков.',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Gravi Pistol.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_PlasmaPistol',
    'optionNameInModel': 'PlasmaPistol',
    'cost' : 15,
    'changeTo' : 'PlasmaPistol',
    'actionTextUp' : 'Plasma Pistol за 15 очков.',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Plasma Pistol.',
    // 'actionIconDown' : 'rewards1',
}, 



{
    'optionName': 'DA_MeleeWeapons_Chainsword',
    'optionNameInModel': 'Chainsword',
    'cost': 0,
    'changeTo': 'Chainsword',
    'actionTextUp': 'Chainsword за 0 очков.',
    'actionTextDown': 'Убрать Chainsword.'
}, {
    'optionName': 'DA_MeleeWeapons_LightningClaws',
    'optionNameInModel': 'LightningClaws',
    'cost': 15,
    'changeTo': 'LightningClaws',
    'actionTextUp': 'LightningClaws за 15 очков.',
    'actionTextDown': 'Убрать LightningClaws.'
}, {
    'optionName': 'DA_MeleeWeapons_PowerWeapon',
    'optionNameInModel': 'PowerWeapon',
    'cost': 15,
    'changeTo': 'PowerWeapon',
    'actionTextUp': 'PowerWeapon за 15 очков.',
    'actionTextDown': 'Убрать PowerWeapon.'
}, {
    'optionName': 'DA_MeleeWeapons_PowerFist',
    'optionNameInModel': 'PowerFist',
    'cost': 25,
    'changeTo': 'PowerFist',
    'actionTextUp': 'PowerFist за 25 очков.',
    'actionTextDown': 'Убрать PowerFist.'
}, {
    'optionName': 'DA_MeleeWeapons_ThunderHammer',
    'optionNameInModel': 'ThunderHammer',
    'cost': 30,
    'changeTo': 'ThunderHammer',
    'actionTextUp': 'ThunderHammer за 30 очков.',
    'actionTextDown': 'Убрать ThunderHammer.'
},




{
    'optionName': 'DA_SpecialWeapons_Flamer',
    'optionNameInModel': 'Flamer',
    'cost': 5,
    'changeTo': 'Flamer',
    'actionTextUp': 'Flamer за 5 очков',
    'actionTextDown': 'Убрать Flamer.'
}, {
    'optionName': 'DA_SpecialWeapons_MeltaGun',
    'optionNameInModel': 'MeltaGun',
    'cost': 10,
    'changeTo': 'MeltaGun',
    'actionTextUp': 'MeltaGun за 10 очков',
    'actionTextDown': 'Убрать MeltaGun.'
}, {
    'optionName': 'DA_SpecialWeapons_GravGun',
    'optionNameInModel': 'GravGun',
    'cost': 15,
    'changeTo': 'GravGun',
    'actionTextUp': 'GravGun за 15 очков',
    'actionTextDown': 'Убрать GravGun.'
}, {
    'optionName': 'DA_SpecialWeapons_PlasmsGun',
    'optionNameInModel': 'PlasmsGun',
    'cost': 15,
    'changeTo': 'PlasmsGun',
    'actionTextUp': 'PlasmsGun за 15 очков',
    'actionTextDown': 'Убрать PlasmsGun.'
},




{
    'optionName' : 'DA_HeavyWeapons_HeavyBolter',
    'optionNameInModel' : 'HeavyBolter',
    'cost' : 10,
    'changeTo' : 'HeavyBolter',
    'actionTextUp' : 'Heavy bolter за 10 очков',
    'actionTextDown' : 'Убрать Heavy bolter'
}, {
    'optionName' : 'DA_HeavyWeapons_MultyMelta',
    'optionNameInModel' : 'Multy-melta',
    'cost' : 10,
    'changeTo' : 'MultyMelta',
    'actionTextUp' : 'Multy-melta за 10 очков',
    'actionTextDown' : 'Убрать Multy-melta'
}, {
    'optionName' : 'DA_HeavyWeapons_MissleLuauncher',
    'optionNameInModel' : 'MissleLuauncher',
    'cost' : 15,
    'changeTo' : 'MissleLuauncher',
    'actionTextUp' : 'Missle luauncher с frag и krak ракетами за 15 очков',
    'actionTextDown' : 'Убрать Missle luauncher'
}, {
    'optionName' : 'DA_HeavyWeapons_MissleLuauncherFlakk',
    'optionNameInModel' : 'MissleLuauncherFlakk',
    'cost' : 25,
    'changeTo' : 'MissleLuauncherFlakk',
    'actionTextUp' : 'Missle luauncher с frag, krak и flakk ракетами за 25 очков',
    'actionTextDown' : 'Убрать MissleLuauncherFlakk'
}, {
    'optionName' : 'DA_HeavyWeapons_PlasmaCanon',
    'optionNameInModel' : 'PlasmaCanon',
    'cost' : 15,
    'changeTo' : 'PlasmaCanon',
    'actionTextUp' : 'Plasma canon за 15 очков',
    'actionTextDown' : 'Убрать Plasma canon'
}, {
    'optionName' : 'DA_HeavyWeapons_Lasanon',
    'optionNameInModel' : 'Lasanon',
    'cost' : 20,
    'changeTo' : 'Lasanon',
    'actionTextUp' : 'Lasanon за 20 очков',
    'actionTextDown' : 'Убрать Lasanon'
}, {
    'optionName' : 'DA_HeavyWeapons_GravCanonWithAmp',
    'optionNameInModel' : 'GravCanonWithAmp',
    'cost' : 35,
    'changeTo' : 'GravCanonWithAmp',
    'actionTextUp' : 'Grav-canon c grav-amp за 35 очков',
    'actionTextDown' : 'Убрать Grav-canon c grav-amp'
}, 


{
    'optionName' : 'DA_AddWargearBomb_MeltaBomb',
    'optionNameInModel' : 'MeltaBomb',
    'cost' : 5,
    'changeTo' : 'MeltaBomb',
    'actionTextUp' : 'Melta bomb за 5 очков',
    'actionTextDown' : 'Убрать Melta bomb'
},  {
    'optionName' : 'DA_AddWargearShield_CombatShield',
    'optionNameInModel' : 'CombatShield',
    'cost' : 5,
    'changeTo' : 'CombatShield',
    'actionTextUp' : 'Combat shield за 5 очков',
    'actionTextDown' : 'Убрать Combat shield'
},  {
    'optionName' : 'DA_AddWargearShield_StormShield',
    'optionNameInModel' : 'StormShield',
    'cost' : 10,
    'changeTo' : 'StormShield',
    'actionTextUp' : 'Storm shield за 10 очков',
    'actionTextDown' : 'Убрать Storm shield'
}, 

{
    'optionName' : 'DA_HeavyWeapons_DozerBlade',
    'optionNameInModel' : 'DozerBlade',
    'cost': 5,
    'changeTo' : 'DozerBlade',
    'actionTextUp' : 'DozerBlade за 5 очков.',
    'actionTextDown': 'Убрать DozerBlade'
}, {
    'optionName' : 'DA_HeavyWeapons_StromBolter',
    'optionNameInModel' : 'StromBolter',
    'cost': 5,
    'changeTo' : 'StromBolter',
    'actionTextUp' : 'StromBolter за 5 очков.',
    'actionTextDown': 'Убрать StromBolter'
}, {
    'optionName' : 'DA_HeavyWeapons_ExtraArmour',
    'optionNameInModel' : 'ExtraArmour',
    'cost': 5,
    'changeTo' : 'ExtraArmour',
    'actionTextUp' : 'ExtraArmour за 5 очков.',
    'actionTextDown': 'Убрать ExtraArmour'
}, {
    'optionName' : 'DA_HeavyWeapons_HunterKillerMissle',
    'optionNameInModel' : 'HunterKillerMissle',
    'cost': 5,
    'changeTo' : 'HunterKillerMissle',
    'actionTextUp' : 'HunterKillerMissle за 5 очков.',
    'actionTextDown': 'Убрать HunterKillerMissle'
}, 
]);
