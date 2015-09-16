var ChangeFromWargear_class = function(o) {

    // this.isWargearToChange = this.isWargearToChange || debugger;
    this.needChekEnambleEachTime =  this.needChekEnambleEachTime || false;
    this.isAdd = this.isAdd || false;
    WH_OptionSuper.apply(this, arguments);
}

// Унаследовать
ChangeFromWargear_class.prototype = Object.create(WH_OptionSuper.prototype);
// Желательно и constructor сохранить
ChangeFromWargear_class.prototype.constructor = ChangeFromWargear_class;


ChangeFromWargear_class.prototype.enableWeapon = function(option, superOption){
    //option - WH_Option - on/off
    //option.superOption - DA_RangedWeapons_Boltgun 
    //option.superOption.superOption - DA_RangedWeapons / ChangeFromWargear_class / this 
    var superOption = option !== null ? option.superOption : superOption;
    if (this.canEnableWeapon(option, superOption)) {

        for (var m in this.unit.models) {
            this.unit.models[m].readyToChange = null;
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
    //option - WH_Option 
    //option.superOption - RewardsOfChaosLesserRewards 
    //option.superOption.superOption - ChangeFromWargear_class 
    if (this.canDisableWeapon(option)) {
        var wargearToChange = [];
        for (var m in this.unit.models) {
            this.unit.models[m].readyToChange = null;
            for (var w in this.unit.models[m].wargear) {
                if (
                    this.unit.models[m].wargear[w].createBy === option.superOption
                ) {
                    this.unit.models[m].wargear[w].readyToChange = this.unit.models[m].wargear[w].changedFrom;
                    wargearToChange.push(this.unit.models[m].wargear[w]);
                } 
                else {
                    this.unit.models[m].wargear[w].readyToChange = null;
                }
            }
        }
        this.unit.isShowModels = true;
        this.unit.$lModels.show();
        this.unit.updateModels();
        if (wargearToChange.length === 1) {
            wargearToChange[0].click();
        }
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
    //option - WH_Option - on/off
    //option.superOption - DA_RangedWeapons_Boltgun 
    //option.superOption.superOption - DA_RangedWeapons / AddFromWargear_class / this 
    //
    var superOption = option !== null ? option.superOption : superOption;
    if (this.canEnableWeapon(option, superOption)) {
        var modelsHoCanGet = [];
        for (var m in this.unit.models) {
            this.unit.models[m].readyToChange = null;
            for (var w in this.unit.models[m].wargear){
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

                modelsHoCanGet.push(this.unit.models[m].wargear[this.unit.models[m].wargear.length-1]);
                
            }
            else {
                for (var w in this.unit.models[m].wargear){
                    this.unit.models[m].wargear[w].readyToChange = null;
                }
            }
        }


        this.unit.isShowModels = true;
        this.unit.$lModels.show();
        this.unit.updateModels();
        if (modelsHoCanGet.length === 1) {
            modelsHoCanGet[0].click();
        }
        // this.iUpdated();
    }
};






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
        'DA_RangedWeapons_StormBolter',
        'DA_RangedWeapons_CombiFlamer',
        'DA_RangedWeapons_CombiGrav',
        'DA_RangedWeapons_CombiMelta',
        'DA_RangedWeapons_CombiPlasma',
        'DA_RangedWeapons_GraviPistol',
        'DA_RangedWeapons_PlasmaPistol',
    ]
    this.optionName = this.optionName || 'DA_RangedWeapons';
    this.cost = 0;
    this.headerText = this.headerText || 'Любая модель может заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из списка Ranged Weapons';
    this.isWargearToChange = this.isWargearToChange || function(w,m) {
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


var DA_MeleeWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_MeleeWeapons_Chainsword',
        'DA_MeleeWeapons_LightningClaws',
        'DA_MeleeWeapons_PowerWeapon',
        'DA_MeleeWeapons_PowerFist',
        'DA_MeleeWeapons_ThunderHammer',
    ]
    this.optionName = this.optionName || 'DA_MeleeWeapons';
    this.cost = 0;
    this.headerText = this.headerText || 'Любая модель может заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из списка Melee Weapons';
    this.isWargearToChange  = this.isWargearToChange || function(w,m) {
        if ((w.wargearName == 'Boltgun' 
            || w.wargearName == 'BoltPistol' 
            || w.wargearType == 'PowerWeapon'
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


var DA_RelicsOfCliban_Replasced = function(o) {
    this.defaultSubOptions = [
        'DA_RelicsOfCliban_FoeSmitter',
        'DA_RelicsOfCliban_LionsRoar',
        'DA_RelicsOfCliban_MaceOfRedemption',
        'DA_RelicsOfCliban_MonsterSlayerOfCaliban',
    ]
    this.optionName = 'DA_RelicsOfCliban_Replasced';
    this.cost = 0;
    this.headerText = 'Модель может заменить свое одно оружие на одно из следующего';
    this.isWargearToChange = function(w,m) {
        if ((w.wargearType == 'RangedWeapon' 
            || w.wargearType == 'MeleeWeapon' 
            || w.wargearType == 'PowerWeapon'
            ) && w.createBy === m
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_RelicsOfCliban_Replasced.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_RelicsOfCliban_Replasced.prototype.constructor = DA_RelicsOfCliban_Replasced;



var DA_RelicsOfCliban_Add = function(o) {
    this.headerText = 'Модель может взять следующе';
    this.optionName = 'DA_RelicsOfCliban_Add';
    this.defaultSubOptions = [
        'DA_RelicsOfCliban_ShroudOfHeroes',
        'DA_RelicsOfCliban_TheEyeOfTheUnseen',
    ]
    MultiChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_RelicsOfCliban_Add.prototype = Object.create(MultiChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_RelicsOfCliban_Add.prototype.constructor = DA_RelicsOfCliban_Add;




var DA_RelicsOfCliban = function(o) {
    this.headerText = 'В армии может быть толкьо один экземпляр предмета из списка Relics of Cliban';
    this.optionName = 'DA_RelicsOfCliban';
    this.defaultSubOptions = [
        'DA_RelicsOfCliban_Replasced',
        'DA_RelicsOfCliban_Add',
    ]
    WH_OptionSuper.apply(this, arguments);
}
// Унаследовать
DA_RelicsOfCliban.prototype = Object.create(WH_OptionSuper.prototype);
// Желательно и constructor сохранить
DA_RelicsOfCliban.prototype.constructor = DA_RelicsOfCliban;





var DA_TerminatorWeapons_powerWeaponReplace = function(o) {
    this.defaultSubOptions = [
        'DA_TerminatorWeapons_powerWeaponReplace_LightningClaws',
        'DA_TerminatorWeapons_powerWeaponReplace_StormShield',
        'DA_TerminatorWeapons_powerWeaponReplace_PowerFist',
        'DA_TerminatorWeapons_powerWeaponReplace_Chainfist',
        'DA_TerminatorWeapons_powerWeaponReplace_ThunderHammer',
    ]
    this.optionName = 'DA_TerminatorWeapons_powerWeaponReplace';
    this.cost = 0;
    this.headerText = 'Модель в Terminator armour может заменить power weapon на одно из списка Terminator Weapon.';
    this.isWargearToChange = function(w,m) {
        if (~m.hasWargear({name:'TerminatorArmour'})) {
            if ( w.wargearType == 'PowerWeapon') {
                return true;
            }
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_TerminatorWeapons_powerWeaponReplace.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_TerminatorWeapons_powerWeaponReplace.prototype.constructor = DA_TerminatorWeapons_powerWeaponReplace;





// var DA_VehicleEquipment = function(o) {
//     this.defaultSubOptions = [
//         'DA_VehicleEquipment_DozerBlade',
//         'DA_VehicleEquipment_StormBolter',
//         'DA_VehicleEquipment_ExtraArmour',
//         'DA_VehicleEquipment_HunterKillerMissle',
//     ]
//     this.optionName = 'DA_VehicleEquipment';
//     this.cost = 0;
//     this.headerText = 'Можно взять следующее';
//     this.isModelCanGet =  function(m, superOption) {
//         for (var i in m.wargear) {
//             //Каждая подопция может быть взята отдельно
//             if (m.wargear[i].createBy === superOption
//                  && m.wargear[i].wargearName !== 'emptySlot'
//             ) {
//                 return false;
//             }
//         }
//         return true;
//     }

//     AddFromWargear_class.apply(this, arguments);
// }

// // Унаследовать
// DA_VehicleEquipment.prototype = Object.create(AddFromWargear_class.prototype);
// // Желательно и constructor сохранить
// DA_VehicleEquipment.prototype.constructor = DA_VehicleEquipment;


fabric_option_multiChange([
{
    optionName: 'DA_VehicleEquipment',
    cost: 0,
    headerText : 'Любая модель может взять следующее',
    defaultSubOptions: [
        'DA_VehicleEquipment_DozerBlade',
        'DA_VehicleEquipment_StormBolter',
        'DA_VehicleEquipment_ExtraArmour',
        'DA_VehicleEquipment_HunterKillerMissle',
    ],
}
]);

//==============================================


DA_RangedWeaponsFabric([{
    'optionName'      : 'DA_RangedWeapons_Boltgun',
    'optionNameInModel': 'Boltgun',
    'cost' : 0,
    'changeTo' : 'Boltgun',
    'actionTextUp' : '<b>Boltgun</b> <i>бесплатно.</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Boltgun.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_StormBolter',
    'optionNameInModel': 'StormBolter',
    'cost' : 5,
    'changeTo' : 'StormBolter',
    'actionTextUp' : '<b>Strom Bolter</b> <i>за 5 очков.</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Strom Bolter.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_CombiFlamer',
    'optionNameInModel': 'CombiFlamer',
    'cost' : 10,
    'changeTo' : 'CombiFlamer',
    'actionTextUp' : '<b>Combi-Flamer</b> <i>за 10 очков.</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Combi-Flamer.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_CombiGrav',
    'optionNameInModel': 'CombiGrav',
    'cost' : 10,
    'changeTo' : 'CombiGrav',
    'actionTextUp' : '<b>Combi-Grav</b> <i>за 10 очков.</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Combi-Grav.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_CombiMelta',
    'optionNameInModel': 'CombiMelta',
    'cost' : 10,
    'changeTo' : 'CombiMelta',
    'actionTextUp' : '<b>Combi-Melta</b> <i>за 10 очков.</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Combi-Melta.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_CombiPlasma',
    'optionNameInModel': 'CombiPlasma',
    'cost' : 10,
    'changeTo' : 'CombiPlasma',
    'actionTextUp' : '<b>Combi-Plasma</b> <i>за 10 очков.</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Combi-Plasma.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_GraviPistol',
    'optionNameInModel': 'GraviPistol',
    'cost' : 15,
    'changeTo' : 'GraviPistol',
    'actionTextUp' : '<b>Gravi Pistol</b> <i>за 15 очков.</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Gravi Pistol.',
    // 'actionIconDown' : 'rewards1',
},{
    'optionName'      : 'DA_RangedWeapons_PlasmaPistol',
    'optionNameInModel': 'PlasmaPistol',
    'cost' : 15,
    'changeTo' : 'PlasmaPistol',
    'actionTextUp' : '<b>Plasma Pistol</b> <i>за 15 очков.</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить Plasma Pistol.',
    // 'actionIconDown' : 'rewards1',
}, 


{
    optionName : 'DA_AddMeltaBomb_MeltaBomb',
    cost : 5,
    changeTo : 'MeltaBomb',
    addItems: ['MeltaBomb'],
},

{
    'optionName': 'DA_MeleeWeapons_Chainsword',
    'optionNameInModel': 'Chainsword',
    'cost': 0,
    'changeTo': 'Chainsword',
    'actionTextUp': '<b>Chainsword</b> <i>бесплатно</i>.',
    'actionTextDown': 'Убрать Chainsword.'
}, {
    optionName: 'DA_MeleeWeapons_ChainswordWithAnEviscerator',
    cost: 25,
    addItems: ['ChainswordWithAnEviscerator'],
    removeItems: ['Boltgun'],
    'actionTextUp': '<b>Chainsword with an eviscerator</b> <i>за 25 очков</i>.',
}, {
    'optionName': 'DA_MeleeWeapons_LightningClaws',
    'optionNameInModel': 'LightningClaws',
    'cost': 15,
    'changeTo': 'LightningClaws',
    'actionTextUp': '<b>LightningClaws</b> <i>за 15 очков</i>.',
    'actionTextDown': 'Убрать LightningClaws.'
}, {
    'optionName': 'DA_MeleeWeapons_PowerWeapon',
    'optionNameInModel': 'PowerWeapon',
    'cost': 15,
    'changeTo': 'PowerWeapon',
    'actionTextUp': '<b>PowerWeapon</b> <i>за 15 очков</i>.',
    'actionTextDown': 'Убрать PowerWeapon.'
}, {
    'optionName': 'DA_MeleeWeapons_PowerFist',
    'optionNameInModel': 'PowerFist',
    'cost': 25,
    'changeTo': 'PowerFist',
    'actionTextUp': '<b>PowerFist</b> <i>за 25 очков</i>.',
    'actionTextDown': 'Убрать PowerFist.'
}, {
    'optionName': 'DA_MeleeWeapons_ThunderHammer',
    'optionNameInModel': 'ThunderHammer',
    'cost': 30,
    'changeTo': 'ThunderHammer',
    'actionTextUp': '<b>ThunderHammer</b> <i>за 30 очков</i>.',
    'actionTextDown': 'Убрать ThunderHammer.'
},



{
    optionName: 'DA_SpecialWeapons_Flamer',
    cost: 5,
    changeTo: 'Flamer',
    removeItems : ['Boltgun'],
}, {
    optionName: 'DA_SpecialWeapons_MeltaGun',
    cost: 10,
    changeTo: 'MeltaGun',
    removeItems : ['Boltgun'],
}, {
    optionName: 'DA_SpecialWeapons_GravGun',
    cost: 15,
    changeTo: 'GravGun',
    removeItems : ['Boltgun'],
}, {
    optionName: 'DA_SpecialWeapons_PlasmsGun',
    cost: 15,
    changeTo: 'PlasmsGun',
    removeItems : ['Boltgun'],
},{
    optionName: 'DA_SpecialWeapons_PlasmaPistol',
    cost: 15,
    changeTo: 'PlasmaPistol',
    removeItems : ['Boltgun'],
},




{
    optionName : 'DA_HeavyWeapons_HeavyBolter',
    cost : 10,
    changeTo : 'HeavyBolter',
    removeItems : ['Boltgun'],
    actionIconUp : 'bolter',
}, {
    optionName : 'DA_HeavyWeapons_MultiMelta',
    cost : 10,
    changeTo : 'MultiMelta',
    removeItems : ['Boltgun'],
}, {
    optionName : 'DA_HeavyWeapons_MissleLuauncher',
    cost : 15,
    changeTo : 'MissleLuauncher',
    removeItems : ['Boltgun'],
}, {
    optionName : 'DA_HeavyWeapons_MissleLuauncherFlakk',
    cost : 25,
    changeTo : 'MissleLuauncherFlakk',
    removeItems : ['Boltgun'],
}, {
    optionName : 'DA_HeavyWeapons_PlasmaCannon',
    cost : 15,
    changeTo : 'PlasmaCannon',
    removeItems : ['Boltgun'],
}, {
    optionName : 'DA_HeavyWeapons_Lascannon',
    cost : 20,
    changeTo : 'Lascannon',
    removeItems : ['Boltgun'],
}, {
    optionName : 'DA_HeavyWeapons_GravCannonWithAmp',
    cost : 35,
    changeTo : 'GravCannonWithAmp',
    removeItems : ['Boltgun'],
}, 

  {
    'optionName' : 'DA_AddWargearShield_CombatShield',
    'optionNameInModel' : 'CombatShield',
    'cost' : 5,
    'changeTo' : 'CombatShield',
    'actionTextUp' : '<b>Combat shield</b> <i>за 5 очков</i>',
    'actionTextDown' : 'Убрать Combat shield'
},  {
    'optionName' : 'DA_AddWargearShield_StormShield',
    'optionNameInModel' : 'StormShield',
    'cost' : 10,
    'changeTo' : 'StormShield',
    'actionTextUp' : '<b>Storm shield</b> <i>за 10 очков</i>',
    'actionTextDown' : 'Убрать Storm shield'
}, 

{
    'optionName' : 'DA_VehicleEquipment_DozerBlade',
    'optionNameInModel' : 'DozerBlade',
    'cost': 5,
    'changeTo' : 'DozerBlade',
    'actionTextUp' : '<b>DozerBlade</b> <i>за 5 очков.</i>',
    'actionTextDown': 'Убрать DozerBlade'
}, {
    'optionName' : 'DA_VehicleEquipment_StormBolter',
    'optionNameInModel' : 'StormBolter',
    'cost': 5,
    'changeTo' : 'StormBolter',
    'actionTextUp' : '<b>StormBolter</b> <i>за 5 очков.</i>',
    'actionTextDown': 'Убрать StormBolter'
}, {
    'optionName' : 'DA_VehicleEquipment_ExtraArmour',
    'optionNameInModel' : 'ExtraArmour',
    'cost': 5,
    'changeTo' : 'ExtraArmour',
    'actionTextUp' : '<b>ExtraArmour</b> <i>за 5 очков.</i>',
    'actionTextDown': 'Убрать ExtraArmour'
}, {
    'optionName' : 'DA_VehicleEquipment_HunterKillerMissle',
    'optionNameInModel' : 'HunterKillerMissle',
    'cost': 5,
    'changeTo' : 'HunterKillerMissle',
    'actionTextUp' : '<b>HunterKillerMissle</b> <i>за 5 очков.</i>',
    'actionTextDown': 'Убрать HunterKillerMissle'
}, 


{
    'optionName' : 'DA_DropPod_Locatorbeacon',
    'optionNameInModel' : 'LocatorBeacon',
    'cost': 10,
    'changeTo' : 'LocatorBeacon',
    'actionTextUp' : '<b>Locator beacon</b> <i>за 10 очков.</i>',
    'actionTextDown': 'Убрать Locator beacon'
}, 



{
    optionName : 'DA_RelicsOfCliban_ShroudOfHeroes',
    cost : 10,
    changeTo : 'ShroudOfHeroes',
    onePerArmie : true
},
{
    optionName : 'DA_RelicsOfCliban_FoeSmitter',
    cost : 15,
    changeTo : 'FoeSmitter',
    onePerArmie : true
},
{
    optionName : 'DA_RelicsOfCliban_LionsRoar',
    cost : 20,
    changeTo : 'LionsRoar',
    onePerArmie : true
},
{
    optionName : 'DA_RelicsOfCliban_MaceOfRedemption',
    cost : 30,
    changeTo : 'MaceOfRedemption',
    onePerArmie : true
},
{
    optionName : 'DA_RelicsOfCliban_MonsterSlayerOfCaliban',
    cost : 40,
    changeTo : 'MonsterSlayerOfCaliban',
    onePerArmie : true
},
{
    optionName : 'DA_RelicsOfCliban_TheEyeOfTheUnseen',
    cost : 40,
    changeTo : 'TheEyeOfTheUnseen',
    onePerArmie : true
},


{
    optionName: 'DA_SpecilaIssueWargear_Auspex',
    cost: 5,
    addItems: ['Auspex'],
},{
    optionName: 'DA_SpecilaIssueWargear_CombatShield',
    cost: 5,
    addItems: ['CombatShield'],
},{
    optionName: 'DA_SpecilaIssueWargear_MeltaBomb',
    cost: 5,
    addItems: ['MeltaBomb'],
},{
    optionName: 'DA_SpecilaIssueWargear_DigitalWeapon',
    cost: 10,
    addItems: ['DigitalWeapon'],
},
{
    optionName: 'DA_SpecilaIssueWargear_JumpPack',
    cost: 15,
    actionTextUp: '<b>Jump pack</b> <i>за 15 очков</i><br><small>Не может быть взят моделью с Space marine bike или c Terminator armour</small>',
    addItems: ['JumpPack'],
},
{
    optionName: 'DA_SpecilaIssueWargear_ConversionField',
    cost: 20,
    addItems: ['ConversionField'],
}



,{
    optionName: 'DA_TerminatorWeapons_CombiMelta',
    cost : 5,
    changeTo : 'CombiMelta'
},{
    optionName: 'DA_TerminatorWeapons_CombiPlasma',
    cost : 5,
    changeTo : 'CombiPlasma'
},{
    optionName: 'DA_TerminatorWeapons_CombiFlamer',
    cost : 5,
    changeTo : 'CombiFlamer'
},{
    optionName: 'DA_TerminatorWeapons_LightningClaws',
    cost : 5,
    changeTo : 'LightningClaws'
},{
    optionName: 'DA_TerminatorWeapons_ThunderHammer',
    cost : 5,
    changeTo : 'ThunderHammer'
}



,{
    optionName:'DA_TerminatorWeapons_powerWeaponReplace_LightningClaws',
    cost:5,
    changeTo:'LightningClaws',
},{
    optionName:'DA_TerminatorWeapons_powerWeaponReplace_StormShield',
    cost:5,
    changeTo:'StormShield',
},{
    optionName:'DA_TerminatorWeapons_powerWeaponReplace_PowerFist',
    cost:10,
    changeTo:'PowerFist',
},{
    optionName:'DA_TerminatorWeapons_powerWeaponReplace_Chainfist',
    cost:15,
    changeTo:'Chainfist',
},{
    optionName:'DA_TerminatorWeapons_powerWeaponReplace_ThunderHammer',
    cost:15,
    changeTo:'ThunderHammer',
}
]);



var ReplaceFromWargear_subOtion_fabric = function (a) {
    for (var i in a) {
        window[a[i].optionName] = function() {
            var optionName =  a[i].optionName;
            var actionText = a[i].actionText || '';
            var cost = a[i].cost;
            var autoSelectOption = a[i].autoSelectOption || false;
            return function() {

                this.optionName = optionName;
                this.cost = cost;
                this.autoSelectOption = autoSelectOption;
                this.actionText = actionText;

                ReplaceFromWargear_subOtion_class.apply(this, arguments);
            }
        }()
        window[a[i].optionName].prototype = Object.create(ReplaceFromWargear_subOtion_class.prototype);
        window[a[i].optionName].prototype.constructor =  window[a[i].optionName];
        if (a[i].hasOwnProperty('funOn')) {
            window[a[i].optionName].prototype.on = a[i].funOn;
        }
    }
}


DA_RangedWeaponsFabric([
{
    'optionName'      : 'DA_Standart_CompanyStandart',
    'optionNameInModel': 'CompanyStandart',
    'cost' : 15,
    addItems : ['CompanyStandart'],
},
{
    'optionName'      : 'DA_Standart_CompanyBanner',
    'optionNameInModel': 'CompanyBanner',
    'cost' : 25,
    addItems : ['CompanyBanner'],
},{
    'optionName'      : 'DA_Standart_SacredStandart',
    'optionNameInModel': 'SacredStandart',
    'cost' : 35,
    addItems : ['SacredStandart'],
}
])





DA_RangedWeaponsFabric([,{
    'optionName'      : 'DA_Standart_ChapterBanner',
    'optionNameInModel': 'ChapterBanner',
    'cost' : 25,
    'changeTo' : 'ChapterBanner',
    'actionTextUp' : '<b>ChapterBanner</b> <i>за 25 очков</i>',
    // 'actionIconUp' : 'def',
    'actionTextDown' : 'Удалить ChapterBanner',
    // 'actionIconDown' : 'rewards1',
}
])