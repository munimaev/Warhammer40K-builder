// --------- Класс-Родитель ------------
var WH_Wargear = function(o) {
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

WH_Wargear.prototype.getSpan = function() {
    var _this = this;
    var htmlClass = 'WH_wargear'
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
        htmlClass += ' WH_wargear--readyToChange';
    } 
    else {
        this.click = function() {
            var __this = _this;
            WH_info.showWargear(_this);

        };
    }
    var text = _this.visibleName.split(' ').join('&nbsp;') + '';
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

WH_Wargear.prototype.getAbilitiesTable = function() {
    var $tt = $('<table />',{'class':'WH_army_unit_table'})
    var $t = $('<tbody />',{'class':'WH_army_unit_tbody'})
    var $t1 = $('<tr />',{'class':'WH_army_unit_tr'})

    $tt.append($t);
    $t.append($t1);

    $t1.append($('<td />',{'text':'Name','width':'24%','style':'text-align:left'}))
    $t1.append($('<td />',{'text':'Range','width':'16%'}))
    $t1.append($('<td />',{'text':'S','width':'16%'}))
    $t1.append($('<td />',{'text':'AP','width':'16%'}))
    $t1.append($('<td />',{'text':'Type','width':'24%'}))


    for (var j in this.abilities) {
        var $t2 = $('<tr />',{'class':'WH_army_unit_tr'})

        $t2.append($('<td />',{'text':(this.abilities[j].name ? this.abilities[j].name : this.visibleName),'style':'text-align:left'}))
        $t2.append($('<td />',{'text':(this.abilities[j].range ? this.abilities[j].range : '-')}))
        $t2.append($('<td />',{'text':(this.abilities[j].S ? this.abilities[j].S : 'User')}))
        $t2.append($('<td />',{'text':(this.abilities[j].AP ? this.abilities[j].AP : '-')}))
        var $tdType = $('<td />',{'class':'info_td_type'});
        $sr = $('<div />',{});
        for (var i in this.abilities[j].type ) {
            $tdType.append( WH_SpecialRules[this.abilities[j].type[i]].prototype.getSpan());
            $tdType.append($('<br />'));

        }
        $t2.append($tdType);
        $t.append($t2);
    }

    return $tt;
};



WH_Wargear.prototype.getAbilitiesTableOneRow = function() {

}


WH_Wargear.prototype.getAbilitiesText = function() {
    var $sr = null;
    if (this.abilities.type !== null) {
        $sr = $('<div />',{});
        var types = {};
        for (var j in this.abilities ) {
            for (var i in this.abilities[j].type ) {
                types[this.abilities[j].type[i]] = true;
            }
        }
        for (var i in types) {
            $sr.append( WH_SpecialRules[i].prototype.getTextBlock());
        }
    }
    return $sr;
};

WH_Wargear.prototype.abilities = null;

// Методы хранятся в прототипе

// --------- Класс-потомок -----------
var PlagueSword = function() {
    this.wargearName = 'PlagueSword';
    this.optionNameInModel = 'Plague Sword';
    WH_Wargear.apply(this, arguments);
}

// Унаследовать
PlagueSword.prototype = Object.create(WH_Wargear.prototype);

// Желательно и constructor сохранить
PlagueSword.prototype.constructor = WH_Wargear;



// --------- Класс-потомок -----------
var InstrumentOfChaos = function() {
    this.wargearName = 'InstrumentOfChaos';
    this.optionNameInModel = 'Instrument Of Chaos';
    WH_Wargear.apply(this, arguments);
}

// Унаследовать
InstrumentOfChaos.prototype = Object.create(WH_Wargear.prototype);

// Желательно и constructor сохранить
InstrumentOfChaos.prototype.constructor = InstrumentOfChaos;


// --------- Класс-потомок -----------
var IconOfChaos = function() {
    this.wargearName = 'IconOfChaos';
    this.optionNameInModel = 'Icon Of Chaos';
    WH_Wargear.apply(this, arguments);

}
// Унаследовать
IconOfChaos.prototype = Object.create(WH_Wargear.prototype);
// Желательно и constructor сохранить
IconOfChaos.prototype.constructor = IconOfChaos;




//====================================
//        Dark Angels
//====================================

var WH_WargearFabric = function(a) {
    for (var i in a) {
        window[a[i].wargearName] = function() {
            var wargearName = a[i].wargearName;
            // var visibleName = a[i].visibleName;
            var wargearType = a[i].hasOwnProperty('wargearType') ? a[i].wargearType: 'unknown';
            var icon = a[i].hasOwnProperty('icon') ? a[i].icon : null;
            return function() {
                this.wargearName = wargearName;
                // this.visibleName = visibleName;
                this.wargearType = wargearType;
                this.icon = icon;
                WH_Wargear.apply(this, arguments);
            }
        }()
        window[a[i].wargearName].prototype = Object.create(WH_Wargear.prototype);
        window[a[i].wargearName].prototype.constructor =  window[a[i].wargearName];
        window[a[i].wargearName].prototype.visibleName =  a[i].visibleName;
        if (a[i].hasOwnProperty('abilities')) {
            if (a[i].abilities.hasOwnProperty('length')) {
                window[a[i].wargearName].prototype.abilities =  a[i].abilities;
            } else {
                window[a[i].wargearName].prototype.abilities =  [a[i].abilities];
            }
        } 
    }
}

WH_WargearFabric([{
    wargearName: 'ArtificerArmor',
    visibleName: 'Artificer armor',
}, {
    wargearName: 'Auspex',
    visibleName: 'Auspex',
    specialRules : [{
        textEng : 'A model with an auspex can use it in place of making a shooting attack. If he does so, target an enemy unit within 12" (this does not count as choosing a target for his unit to shoot at). A unit that is targeted by one or more auspexes has its cover save reduced by 1 until the end of the phase.',
        nameRus : '',    
        textRus : ''
    }]
}, {    
    wargearName: 'CicloneMissleLauncher',
    visibleName: 'Ciclone missle launcher',
}, {
    wargearName: 'CloseCombatWeapon',
    visibleName: 'Close combat weapon',
}, {
    wargearName: 'CombatShield',
    visibleName: 'Combat shield',
    specialRules : [{
        textEng : 'A combat shield confers a 6+ invulnerable save.',
        nameRus : '',    
        textRus : ''
    }]
}, {
    wargearName: 'ConversionField',
    visibleName: 'Conversion field',
    specialRules : [{
        textEng : 'A conversion field confers a 4+ invulnerable save. At the end of a phase in which the bearer passes one or more invulnerable saves granted by the conversion field, all units within D6" of the bearer must test as if they had been hit by a weapon with the Blind special rule. Friendly units can re-roll this test.',
        nameRus : '',    
        textRus : ''
    }]
}, {
    wargearName: 'DigitalWeapon',
    visibleName: 'Digital weapon',
    specialRules : [{
        textEng : 'A model armed with digital weapons can re-roll a single failed roll To Wound in each Assault phase.',
        nameRus : '',    
        textRus : ''
    }]
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
    wargearName: 'FlammerstormCannon',
    visibleName: 'Flammerstorm cannon',
}, {
    wargearName: 'FoeSmitter',
    visibleName: 'Foe smitter',
}, {
    wargearName: 'FragAssaultCannon',
    visibleName: 'Frag assault cannon',
}, {
    wargearName: 'HunterKillerMissle',
    visibleName: 'Hunter-killer missle',
}, {
    wargearName: 'IronHalo',
    visibleName: 'Iron halo',
    specialRules : [{
        textEng : 'An iron halo confers a 4+ invulnerable save.',
        nameRus : '',    
        textRus : ''
    }]
}, {
    wargearName: 'JumpPack',
    visibleName: 'Jump pack',
    specialRules : [{
        textEng : 'Models equipped with jump packs gain the Jump unit type as described in Warhammer 40,000: The Rules.',
        nameRus : '',    
        textRus : ''
    }]
}, {
    wargearName: 'Lascannon',
    visibleName: 'Lascannon',
}, {
    wargearName: 'LionsRoar',
    visibleName: 'Lion\'s roar',
}, {
    wargearName: 'LocatorBeacon',
    visibleName: 'Locator beacon',
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
    wargearName: 'MonsterSlayerOfCaliban',
    visibleName: 'Monster slayer of Caliban',
}, {
    wargearName: 'PrediusRelicOfTheUnforgiven',
    visibleName: 'Predius Relic Of The Unforgiven',
    wargearType: 'Relic',
}, {
    wargearName: 'PsychicHood',
    visibleName: 'Psychic hood',
}, {
    wargearName: 'RavenwingDeathwingCompanyBanner',
    visibleName: 'Ravenwing company banner',
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
    wargearType: 'MeleeWeapon',
    abilities : {
        S:'x2',
        AP:1,
        type:['Melee','SpecialistWeapon','Unwieldy'],
    }
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
    wargearName: 'SmokeLounchers',
    visibleName: 'Smoke lounchers',
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
    specialRules : [{
        textEng : 'A model wearing a camo cloak has +1 cover save. If it does not already have a cover save, it gains a 6+ cover save.',
        nameRus : '',    
        textRus : ''
    }]
}, {
    wargearName: 'StormShield',
    visibleName: 'Storm shield',
}, {
    wargearName: 'TeleportHommer',
    visibleName: 'Teleport hommer',
}, {
    wargearName: 'TerminatorArmour',
    visibleName: 'Terminator armor',
}, {
    wargearName: 'TheEyeOfTheUnseen',
    visibleName: 'The eye of the unseen',
},{
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
    visibleName: 'Twin-linked Storm bolter',
}, {
    wargearName: 'TyphoonMissleLauncher',
    visibleName: 'Typhoon missle launcher',
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
// IconOfChaos.prototype = Object.create(WH_Wargear.prototype);
// // Желательно и constructor сохранить
// IconOfChaos.prototype.constructor = IconOfChaos;



// var StormBolter  = function() {
//     this.wargearName = 'StormBolter';
//     this.optionNameInModel = 'Storm bolter';

// }
// // Унаследовать
// IconOfChaos.prototype = Object.create(WH_Wargear.prototype);
// // Желательно и constructor сохранить
// IconOfChaos.prototype.constructor = IconOfChaos;



// var IronHalo  = function() {
//     this.wargearName = 'IronHalo';
//     this.optionNameInModel = 'Iron Halo';

// }
// // Унаследовать
// IronHalo.prototype = Object.create(WH_Wargear.prototype);
// // Желательно и constructor сохранить
// IronHalo.prototype.constructor = IronHalo;



// var TeleportHommer  = function() {
//     this.wargearName = 'TeleportHommer';
//     this.optionNameInModel = 'Teleport Hommer';

// }
// // Унаследовать
// TeleportHommer.prototype = Object.create(WH_Wargear.prototype);
// // Желательно и constructor сохранить
// TeleportHommer.prototype.constructor = TeleportHommer;




// // --------- Класс-потомок -----------
// var SwordOfSilence = function() {
//     this.wargearName = 'Sword Of Silence';
//     this.optionNameInModel = 'Icon Of Chaos';

// }
// // Унаследовать
// SwordOfSilence.prototype = Object.create(WH_Wargear.prototype);
// // Желательно и constructor сохранить
// SwordOfSilence.prototype.constructor = IconOfChaos;
