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
    // this.icon = o.icon || null;
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
        this.click = function() {
            var __this = _this;
            return function() {
                for (var w in __this.model.wargear) {
                    if (__this.model.wargear[w] === __this) {

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
        this.click = function() {
            var __this = _this;
            console.log(_this)
        };
    }
    var text = _this.visibleName + ', ';
    if (_this.wargearName == 'emptySlot') {
        text = '<i>' + _this.readyToChange.name + '</i>';
    }
    var $span = $('<span />',{
        'class': htmlClass,
        'click': this.click
    })
    if (this.icon) {
        text = ' <img src="pics/'+this.icon+'.png"> '+text;
    }
    $span.html(text);
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
            var wargearName = a[i].wargearName;
            // var visibleName = a[i].visibleName;
            var wargearType = a[i].hasOwnProperty('wargearType') ? a[i].wargearType : 'unknown';
            var icon = a[i].hasOwnProperty('icon') ? a[i].icon : null;
            return function() {
                this.wargearName = wargearName;
                // this.visibleName = visibleName;
                this.wargearType = wargearType;
                this.icon = icon;
                WHWargear.apply(this, arguments);
            }
        }()
        window[a[i].wargearName].prototype = Object.create(WHWargear.prototype);
        window[a[i].wargearName].prototype.constructor =  window[a[i].wargearName];
        window[a[i].wargearName].prototype.visibleName =  a[i].visibleName;
    }
}

WHWargearFabric([

{
    wargearName: 'AssaultCannon',
    visibleName: 'Assault cannon',
}, {
    wargearName: 'AvengerMegaBolter',
    visibleName: 'Avenger mega bolter',
}, {
    wargearName: 'Auspex',
    visibleName: 'Auspex',
}, {
    wargearName: 'Autocannon',
    visibleName: 'Autocannon',
}, {
    wargearName: 'BladesOfReason',
    visibleName: 'Blades of Reason',
}, {
    wargearName: 'Boltgun',
    visibleName: 'Boltgun',
}, {
    wargearName: 'BoltPistol',
    visibleName: 'Bolt pistol',
    wargearType: 'RangedWeapon',
}, {
    wargearName: 'BookOfSalvation',
    visibleName: 'Book of Salvation',
}, {
    wargearName: 'Chainsword',
    visibleName: 'Chainsword',
    wargearType : 'MeleeWeapon',
}, {
    wargearName: 'ChainswordWithAnEviscerator',
    visibleName: 'Chainsword with an eviscerator',
    wargearType : 'MeleeWeapon',
}, {
    wargearName: 'Chainfist',
    visibleName: 'Chainfist',
    wargearType : 'MeleeWeapon',
}, {    
    wargearName: 'ChapterBanner',
    visibleName: 'Chapter banner',
}, {    
    wargearName: 'CicloneMissleLauncher',
    visibleName: 'Ciclone missle launcher',
}, {
    wargearName: 'CloseCombatWeapon',
    visibleName: 'Close combat weapon',
}, {
    wargearName: 'CombatShield',
    visibleName: 'Combat shield',
}, {
    wargearName: 'CombiFlamer',
    visibleName: 'Combi-flamer',
}, {
    wargearName: 'CombiGrav',
    visibleName: 'Combi-grav',
}, {
    wargearName: 'CombiMelta',
    visibleName: 'Combi-melta',
}, {
    wargearName: 'CombiPlasma',
    visibleName: 'Combi-plasma',
}, {
    wargearName: 'CompanyBanner',
    visibleName: 'Company banner',
}, {
    wargearName: 'CompanyStandart',
    visibleName: 'Company standart',
}, {
    wargearName: 'ConversionField',
    visibleName: 'Conversion field',
}, {
    wargearName: 'CorvusHammer',
    visibleName: 'Corvus hammer',
}, {
    wargearName: 'CroziusArcanum',
    visibleName: 'Crozius arcanum',
    wargearType: 'PowerWeapon',
}, {
    wargearName: 'DeathwindLauncher',
    visibleName: 'Deathwind launcher',
}, {
    wargearName: 'DemolisherCannon',
    visibleName: 'Demolisher cannon',
}, {
    wargearName: 'DigitalWeapon',
    visibleName: 'Digital weapon',
}, {
    wargearName: 'DozerBlade',
    visibleName: 'Dozer blade',
}, {
    wargearName: 'emptySlot',
    visibleName: '-=>X<=- ',
}, {
    wargearName: 'ExtraArmour',
    visibleName: 'Extra armour',
}, {
    wargearName: 'FlailOfTheUnforgiven',
    visibleName: 'Flail Of The Unforgiven',
}, {
    wargearName: 'Flamer',
    visibleName: 'Flamer',
}, {
    wargearName: 'FlammerstormCannon',
    visibleName: 'Flammerstorm cannon',
}, {
    wargearName: 'FoeSmitter',
    visibleName: 'Foe smitter',
}, {
    wargearName: 'ForceWeapon',
    visibleName: 'Force weapon',
    wargearType : 'MeleeWeapon',
}, {
    wargearName: 'FragAssaultCannon',
    visibleName: 'Frag assault cannon',
}, {
    wargearName: 'FragGrenades',
    visibleName: 'Frag grenades',
}, {
    wargearName: 'GravCannonWithAmp',
    visibleName: 'GravCannonWithAmp',
}, {
    wargearName: 'GravGun',
    visibleName: 'GravGun',
}, {
    wargearName: 'GraviPistol',
    visibleName: 'Gravi-pistol',
}, {
    wargearName: 'HalberdOfCaliban',
    visibleName: 'Halberd Of Caliban',
}, {
    wargearName: 'HeavyBolter',
    visibleName: 'Heavy bolter',
}, {
    wargearName: 'HeavyBolterWithHellfireShells',
    visibleName: 'Heavy bolter with Hellfire shells',
}, {
    wargearName: 'HeavyFlamer',
    visibleName: 'Heavy flamer',
}, {
    wargearName: 'HunterKillerMissle',
    visibleName: 'Hunter-killer missle',
}, {
    wargearName: 'HurricaneBolter',
    visibleName: 'Hurricane bolters',
}, {
    wargearName: 'IronHalo',
    visibleName: 'Iron halo',
}, {
    wargearName: 'JumpPack',
    visibleName: 'Jump pack',
}, {
    wargearName: 'KrakGrenades',
    visibleName: 'Krak grenades',
}, {
    wargearName: 'Lascannon',
    visibleName: 'Lascannon',
}, {
    wargearName: 'LightningClaws',
    visibleName: 'Lightning claws',
    wargearType : 'MeleeWeapon',
}, {
    wargearName: 'LionHelm',
    visibleName: 'Lion Helm',
}, {
    wargearName: 'LionsRoar',
    visibleName: 'Lion\'s roar',
}, {
    wargearName: 'LocatorBeacon',
    visibleName: 'Locator beacon',
}, {
    wargearName: 'MaceOfAbsolution',
    visibleName: 'Mace Of Absolution',
}, {
    wargearName: 'MaceOfRedemption',
    visibleName: 'Mace Of Redemption',
}, {
    wargearName: 'MasterCraftedBoltPistol',
    visibleName: 'Master-crafted bolt pistol',
}, {
    wargearName: 'MasterCraftedCombiPlasma',
    visibleName: 'Master-crafted combi-plasma',
}, {
    wargearName: 'MasterCraftedForceSword',
    visibleName: 'Master-crafted force sword',
}, {
    wargearName: 'MeltaBomb',
    visibleName: 'Melta bomb',
}, {
    wargearName: 'MeltaGun',
    visibleName: 'MeltaGun',
}, {
    wargearName: 'MissleLuauncher',
    visibleName: 'MissleLuauncher',
}, {
    wargearName: 'MissleLuauncherFlakk',
    visibleName: 'MissleLuauncherFlakk',
}, {
    wargearName: 'MonsterSlayerOfCaliban',
    visibleName: 'Monster slayer of Caliban',
}, {
    wargearName: 'MultiMelta',
    visibleName: 'Multi-melta',
}, {
    wargearName: 'PlasmaCannon',
    visibleName: 'PlasmaCannon',
}, {
    wargearName: 'PlasmaPistol',
    visibleName: 'Plasma pistol',
}, {
    wargearName: 'PlasmaTalon',
    visibleName: 'Plasma talon',
}, {
    wargearName: 'PlasmsGun',
    visibleName: 'Plasma gun',
}, {
    wargearName: 'PowerAxe',
    visibleName: 'Power axe',
    wargearType: 'MeleeWeapon',
}, {
    wargearName: 'PowerFist',
    visibleName: 'Power fist',
    icon: 'options/PowerFist',
    wargearType: 'MeleeWeapon',
}, {
    wargearName: 'PowerFistWithBuildInHeavyBolter',
    visibleName: 'Power fist with build in Heavy-Bolter',
}, {
    wargearName: 'PowerFistWithBuildInHeavyFlamer',
    visibleName: 'Power fist with build in Heavy-Flamer',
}, {
    wargearName: 'PowerSword',
    visibleName: 'Power Sword',
    wargearType: 'MeleeWeapon',
},  {
    wargearName: 'PowerWeapon',
    visibleName: 'PowerWeapon',
    wargearType: 'MeleeWeapon',
}, {
    wargearName: 'PrediusRelicOfTheUnforgiven',
    visibleName: 'Predius Relic Of The Unforgiven',
    wargearType: 'Relic',
}, {
    wargearName: 'PsychicHood',
    visibleName: 'Psychic hood',
}, {
    wargearName: 'RavenSword',
    visibleName: 'Raven Sword',
}, {
    wargearName: 'RavenwingGrenadeLouncher',
    visibleName: 'Ravenwing grenade louncher',
}, {
    wargearName: 'RavenwingCompanyBanner',
    visibleName: 'Ravenwing company banner',
}, {
    wargearName: 'RiftCannon',
    visibleName: 'Rift cannon',
}, {
    wargearName: 'Rosarius',
    visibleName: 'Rosarius',
}, {
    wargearName: 'SacredStandart',
    visibleName: 'Sacred standart',
}, {
    wargearName: 'Searchlight',
    visibleName: 'Searchlight',
}, {
    wargearName: 'ServoArm',
    visibleName: 'Servo-arm',
}, {
    wargearName: 'ServoHarness',
    visibleName: 'Servo-hsrness',
}, {
    wargearName: 'ShroudOfHeroes',
    visibleName: 'Shroud of heroes',
}, {
    wargearName: 'Signum',
    visibleName: 'Signum',
}, {
    wargearName: 'SiegeShield',
    visibleName: 'Siege shield',
}, {
    wargearName: 'SixBlackswordMissiles',
    visibleName: 'Six blacksword missiles',
}, {
    wargearName: 'SmokeLounchers',
    visibleName: 'Smoke lounchers',
}, {
    wargearName: 'SniperRifle',
    visibleName: 'Sniper rifle',
}, {
    wargearName: 'SpaceMarineShotgun',
    visibleName: 'Space marine shotgun',
}, {
    wargearName: 'SpaceMarineBike',
    visibleName: 'Space marine bike',
}, {
    wargearName: 'SponsonLascannon',
    visibleName: 'Sponson Lascannon',
}, {
    wargearName: 'SponsonHeavyBolter',
    visibleName: 'Sponson Heavy bolter',
}, {
    wargearName: 'ScoutCloak',
    visibleName: 'Scout cloak',
}, {
    wargearName: 'StasisBomb',
    visibleName: 'Stasis bomb',
}, {
    wargearName: 'StormBolter',
    visibleName: 'Strom bolter',
}, {
    wargearName: 'StormShield',
    visibleName: 'Storm shield',
}, {
    wargearName: 'SwordOfSecrets',
    visibleName: 'Sword of Secrets',
    wargearType : 'MeleeWeapon',
}, {
    wargearName: 'SwordOfSilence',
    visibleName: 'Sword of Silence',
    wargearType : 'MeleeWeapon',
}, {
    wargearName: 'TeleportHommer',
    visibleName: 'Teleport hommer',
}, {
    wargearName: 'TerminatorArmour',
    visibleName: 'Terminator armor',
}, {
    wargearName: 'TheEyeOfTheUnseen',
    visibleName: 'The eye of the unseen',
}, {
    wargearName: 'ThunderHammer',
    visibleName: 'Thunder hammer',
}, {
    wargearName: 'TwinLinkedAssaultCannon',
    visibleName: 'Twin-linked Assault cannon',
}, {
    wargearName: 'TwinLinkedAutoCannon',
    visibleName: 'Twin-linked Auto cannon',
}, {
    wargearName: 'TwinLinkedHeavyBolter',
    visibleName: 'Twin-linked Heavy bolter',
}, {
    wargearName: 'TwinLinkedHeavyFlamer',
    visibleName: 'Twin-linked Heavy flamer',
}, {
    wargearName: 'TwinLinkedLascannon',
    visibleName: 'Twin-linked Lascannon',
}, {
    wargearName: 'TwinLinkedPlasmaGun',
    visibleName: 'Twin-linked Plasma gun',
}, {
    wargearName: 'TwinLinkedStormBolter',
    visibleName: 'Twin-linked strom bolter',
}, {
    wargearName: 'TyphoonMissleLauncher',
    visibleName: 'Typhoon missle launcher',
}, {
    wargearName: 'BladeOfCaliban',
    visibleName: 'Blade Of Caliban',
}, {
    wargearName: 'Nathecium',
    visibleName: 'Nathecium',
},
]);


//====================================
//        Dark Angels
//====================================






// var TerminatorArmour  = function() {
//     this.wargearName = 'TerminatorArmour';
//     this.optionNameInModel = 'Terminator Armor';

// }
// // Унаследовать
// IconOfChaos.prototype = Object.create(WHWargear.prototype);
// // Желательно и constructor сохранить
// IconOfChaos.prototype.constructor = IconOfChaos;



// var StormBolter  = function() {
//     this.wargearName = 'StormBolter';
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
