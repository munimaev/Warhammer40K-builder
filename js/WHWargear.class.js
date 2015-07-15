// --------- Класс-Родитель ------------
var WHWargear = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.model) {
        throw {'text':'Not set model'};
    }
    if (!o.createBy) {
        throw {'text':'Not set createBy'};
    }
    this.model = o.model;
    this.createBy = o.createBy;
    this.readyToChange = null;
    this.changedFrom = o.changedFrom || null;
}

WHWargear.prototype.getSpan = function() {
    var _this = this;
    var htmlClass = 'WH_army_unit_wargear_span'
    if (this.readyToChange !== null
        && (!this.readyToChange.needChekEnambleEachTime
        || this.readyToChange.createBy.superOption.canEnableWeapon(null,this.readyToChange.createBy))) {
        // readyToChange = {
        //     name 'name',
        //     createBy :  -> DA_RangedWeapons_Boltgun,
        //     usedOption : -> DA_RangedWeapons_Boltgun,
        //     needChekEnambleEachTime : bool
        // }
        var click = function() {
            var __this = _this;
            return function() {
                for (var w in __this.model.wargear) {
                    if (__this.model.wargear[w] === __this) {

                        // if (__this.readyToChange.needChekEnambleEachTime) {
                        //     if (!__this.readyToChange.createBy.superOption.canEnableWeapon(null,__this.readyToChange.createBy)) {
                        //         var usedOption = __this.readyToChange.usedOption;
                        //         __this.readyToChange = null;
                        //         usedOption.iUpdated();
                        //         break;
                        //     }
                        // }

                        __this.model.wargear.splice(w,1,new window[__this.readyToChange.name]({
                            model: __this.model,
                            createBy : __this.readyToChange.createBy,
                            usedOption : __this.readyToChange.createBy,
                            changedFrom : {
                                name : __this.wargearName,
                                createBy : __this.createBy,
                                usedOption : __this.readyToChange.createBy 
                            }
                        }))
                        
                        __this.readyToChange.usedOption.iUpdated();
                        // __this.model.unit.updateModels();
                        break;
                    }
                }
            }
        }();
        htmlClass += ' WH_army_unit_wargear_span--readyToChange';
    } 
    else {
        var click = function() {
            var __this = _this;
            console.log(_this)
        };
    }
    var $span = $('<span />',{
        'class': htmlClass,
        'text': _this.optionNameInModel + '; ',
        'click': click
    })
    return $span;
}

// Методы хранятся в прототипе

// --------- Класс-потомок -----------
var PlagueSword = function() {
    this.wargearName = 'PlagueSword';
    this.optionNameInModel = 'Plague Sword';
    WHWargear.apply(this, arguments);
}

// Унаследовать
PlagueSword.prototype = Object.create(WHWargear.prototype);

// Желательно и constructor сохранить
PlagueSword.prototype.constructor = WHWargear;



// --------- Класс-потомок -----------
var InstrumentOfChaos = function() {
    this.wargearName = 'InstrumentOfChaos';
    this.optionNameInModel = 'Instrument Of Chaos';
    WHWargear.apply(this, arguments);
}

// Унаследовать
InstrumentOfChaos.prototype = Object.create(WHWargear.prototype);

// Желательно и constructor сохранить
InstrumentOfChaos.prototype.constructor = InstrumentOfChaos;


// --------- Класс-потомок -----------
var IconOfChaos = function() {
    this.wargearName = 'IconOfChaos';
    this.optionNameInModel = 'Icon Of Chaos';
    WHWargear.apply(this, arguments);

}
// Унаследовать
IconOfChaos.prototype = Object.create(WHWargear.prototype);
// Желательно и constructor сохранить
IconOfChaos.prototype.constructor = IconOfChaos;




//====================================
//        Dark Angels
//====================================

var WHWargearFabric = function(a) {
    for (var i in a) {
        window[a[i].wargearName] = function() {
            var _wargearName = a[i].wargearName;
            var _optionNameInModel = a[i].optionNameInModel;
            var _wargearType = a[i].hasOwnProperty('wargearType') ? a[i].wargearType : 'unknown';
            return function() {
                this.wargearName = _wargearName;
                this.optionNameInModel = _optionNameInModel;
                this.wargearType = _wargearType;
                WHWargear.apply(this, arguments);
            }
        }()
        window[a[i].wargearName].prototype = Object.create(WHWargear.prototype);
        window[a[i].wargearName].prototype.constructor =  window[a[i].wargearName];
    }
}

WHWargearFabric([

{'wargearName' : 'Boltgun'             , 'optionNameInModel': 'Boltgun',}, 
{'wargearName' : 'BoltPistol'          , 'optionNameInModel': 'Bolt pistol',}, 
{'wargearName' : 'CombiFlamer'         , 'optionNameInModel': 'Combi-flamer',}, 
{'wargearName' : 'CombiGrav'           , 'optionNameInModel': 'Combi-grav',}, 
{'wargearName' : 'CombiMelta'          , 'optionNameInModel': 'Combi-melta',}, 
{'wargearName' : 'CombiPlasma'         , 'optionNameInModel': 'Combi-plasma',}, 
{'wargearName' : 'FragGrenades'        , 'optionNameInModel': 'Frag grenades',}, 
{'wargearName' : 'GraviPistol'         , 'optionNameInModel': 'Gravi-pistol',}, 
{'wargearName' : 'KrakGrenades'        , 'optionNameInModel': 'Krak grenades',},
{'wargearName' : 'PlasmaPistol'        , 'optionNameInModel': 'Plasma pistol',}, 
{'wargearName' : 'StromBolter'         , 'optionNameInModel': 'Strom bolter',}, 


{'wargearName' : 'IronHalo'            , 'optionNameInModel': 'Iron halo',}, 
{'wargearName' : 'StormShield'         , 'optionNameInModel': 'Storm shield',}, 
{'wargearName' : 'MeltaBomb'        , 'optionNameInModel': 'Melta bomb',},
{'wargearName' : 'CombatShield'        , 'optionNameInModel': 'Combat shield',},
{'wargearName' : 'StormShield'        , 'optionNameInModel': 'Storm shield',},

{'wargearName' : 'Chainsword'          , 'optionNameInModel': 'Chainsword',},
{'wargearName' : 'LightningClaws'      , 'optionNameInModel': 'Lightning claws',},
{'wargearName' : 'PowerFist'           , 'optionNameInModel': 'PowerFist',},
{'wargearName' : 'PowerWeapon'         , 'optionNameInModel': 'PowerWeapon',},
{'wargearName' : 'ThunderHammer'       , 'optionNameInModel': 'Thunder hammer',},

{'wargearName' : 'SwordOfSilence'      , 'optionNameInModel': 'Sword Of Silence',}, 
{'wargearName' : 'TeleportHommer'      , 'optionNameInModel': 'Teleport hommer',}, 
{'wargearName' : 'TerminatorArmor'     , 'optionNameInModel': 'Terminator armor',}, 

{'wargearName' : 'Flamer'              , 'optionNameInModel': 'Flamer',},
{'wargearName' : 'MeltaGun'            , 'optionNameInModel': 'MeltaGun',},
{'wargearName' : 'GravGun'             , 'optionNameInModel': 'GravGun',},
{'wargearName' : 'PlasmsGun'           , 'optionNameInModel': 'PlasmsGun',},

{'wargearName' : 'HeavyBolter'         , 'optionNameInModel': 'HeavyBolter',},
{'wargearName' : 'MultyMelta'          , 'optionNameInModel': 'MultyMelta',},
{'wargearName' : 'MissleLuauncher'     , 'optionNameInModel': 'MissleLuauncher',},
{'wargearName' : 'MissleLuauncherFlakk', 'optionNameInModel': 'MissleLuauncherFlakk',},
{'wargearName' : 'PlasmaCanon'         , 'optionNameInModel': 'PlasmaCanon',},
{'wargearName' : 'Lasanon'             , 'optionNameInModel': 'Lasanon',},
{'wargearName' : 'GravCanonWithAmp'    , 'optionNameInModel': 'GravCanonWithAmp',},



{'wargearName' : 'emptySlot'           , 'optionNameInModel': '-=>X<=- ',},

{'wargearName' : 'Searchlight'         , 'optionNameInModel': 'Searchlight',}, 
{'wargearName' : 'SmokeLounchers'      , 'optionNameInModel': 'Smoke lounchers',}, 

{'wargearName' : 'DozerBlade'          , 'optionNameInModel': 'Dozer blade',},
{'wargearName' : 'ExtraArmour'         , 'optionNameInModel': 'Extra armour',},
{'wargearName' : 'HunterKillerMissle'  , 'optionNameInModel': 'Hunter-killer missle',},

]);



//====================================
//        Dark Angels
//====================================






// var TerminatorArmor  = function() {
//     this.wargearName = 'TerminatorArmor';
//     this.optionNameInModel = 'Terminator Armor';

// }
// // Унаследовать
// IconOfChaos.prototype = Object.create(WHWargear.prototype);
// // Желательно и constructor сохранить
// IconOfChaos.prototype.constructor = IconOfChaos;



// var StromBolter  = function() {
//     this.wargearName = 'StromBolter';
//     this.optionNameInModel = 'Strom Bolter';

// }
// // Унаследовать
// IconOfChaos.prototype = Object.create(WHWargear.prototype);
// // Желательно и constructor сохранить
// IconOfChaos.prototype.constructor = IconOfChaos;



// var IronHalo  = function() {
//     this.wargearName = 'IronHalo';
//     this.optionNameInModel = 'Iron Halo';

// }
// // Унаследовать
// IronHalo.prototype = Object.create(WHWargear.prototype);
// // Желательно и constructor сохранить
// IronHalo.prototype.constructor = IronHalo;



// var TeleportHommer  = function() {
//     this.wargearName = 'TeleportHommer';
//     this.optionNameInModel = 'Teleport Hommer';

// }
// // Унаследовать
// TeleportHommer.prototype = Object.create(WHWargear.prototype);
// // Желательно и constructor сохранить
// TeleportHommer.prototype.constructor = TeleportHommer;




// // --------- Класс-потомок -----------
// var SwordOfSilence = function() {
//     this.wargearName = 'Sword Of Silence';
//     this.optionNameInModel = 'Icon Of Chaos';

// }
// // Унаследовать
// SwordOfSilence.prototype = Object.create(WHWargear.prototype);
// // Желательно и constructor сохранить
// SwordOfSilence.prototype.constructor = IconOfChaos;
