// --------- Класс-Родитель ------------
var WH_SpecialRule = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.unit) {
        throw {'text':'Not set unit'};
    }
    if (!o.createBy) {
        throw {'text':'Not set createBy'};
    }
    this.unit = o.unit;
    this.createBy = o.createBy;
    this.forFormation = o.forFormation || false;
    // this.readyToChange = null;
    // this.icon = o.icon || null;
    // this.changedFrom = o.changedFrom || null;
}

WH_SpecialRule.prototype.getSpan = function() {
    var _this = this;
    // if (this.readyToChange !== null
    //     && (!this.readyToChange.needChekEnambleEachTime
    //     || this.readyToChange.createBy.superOption.canEnableWeapon(null,this.readyToChange.createBy))) {
    //     // readyToChange = {
    //     //     name 'name',
    //     //     createBy :  -> DA_RangedWeapons_Boltgun,
    //     //     usedOption : -> DA_RangedWeapons_Boltgun,
    //     //     needChekEnambleEachTime : bool
    //     // }
    //     this.click = function() {
    //         var __this = _this;
    //         return function() {
    //             for (var w in __this.model.wargear) {
    //                 if (__this.model.wargear[w] === __this) {

    //                     __this.model.wargear.splice(w,1,new window[__this.readyToChange.name]({
    //                         model: __this.model,
    //                         createBy : __this.readyToChange.createBy,
    //                         usedOption : __this.readyToChange.createBy,
    //                         changedFrom : {
    //                             name : __this.wargearName,
    //                             createBy : __this.createBy,
    //                             usedOption : __this.readyToChange.createBy 
    //                         }
    //                     }))
                        
    //                     __this.readyToChange.usedOption.iUpdated();
    //                     // __this.model.unit.updateModels();
    //                     break;
    //                 }
    //             }
    //         }
    //     }();
    //     htmlClass += ' WH_army_unit_wargear_span--readyToChange';
    // } 
    // else {
    //     this.click = function() {
    //         var __this = _this;
    //         console.log(_this)
    //     };
    // }
    var text = _this.visibleName + '';
    // if (_this.wargearName == 'emptySlot') {
    //     text = '<i>' + _this.readyToChange.name + '</i>';
    // }
    
    this.click = function() {
        var __this = _this;
        return function() {
            WH_info.showRule(__this);
        }
    }();

    var $span = $('<span />',{
        'class': this.getRulesSpanHtmlClass(),
        'click': this.click
    })
    if (this.icon) {
        text = ' <img src="pics/'+this.icon+'.png"> '+text;
    }
    $span.html(text);
    return $span;
}


WH_SpecialRule.prototype.getTextSpan = function(o) {
    var o = o || {};
    var o.header = o.header || false;
    var result = $('<div />');
    return
}

WH_SpecialRule.prototype.htmlClass = 'WH_army_unit_specialRules_span'

WH_SpecialRule.prototype.getRulesSpanHtmlClass = function() {
    // if (this.unit instanceof WH_Roster) {
    //     return ''
    // }
    return 'WH_specialRules';
}

// Методы хранятся в прототипе


var WH_SpecialRules = {};



//====================================
//        Dark Angels
//====================================

var WH_SpecialRuleFabric = function(a) {
    for (var i in a) {
        var parrent = a[i].parrent || 'WH_SpecialRule';
        WH_SpecialRules[a[i].specialRuleName] = function() {
            var specialRuleName = a[i].specialRuleName;
            // var wargearType = a[i].hasOwnProperty('wargearType') ? a[i].wargearType : 'unknown';
            var icon = a[i].hasOwnProperty('icon') ? a[i].icon : null;
            return function() {
                this.specialRuleName = specialRuleName;
                // this.visibleName = visibleName;
                // this.wargearType = wargearType;
                this.icon = icon;
                WH_SpecialRule.apply(this, arguments);
            }
        }()
        WH_SpecialRules[a[i].specialRuleName].prototype = Object.create(WH_SpecialRule.prototype);
        WH_SpecialRules[a[i].specialRuleName].prototype.constructor =  WH_SpecialRules[a[i].specialRuleName];
        WH_SpecialRules[a[i].specialRuleName].prototype.visibleName =  a[i].visibleName;
        WH_SpecialRules[a[i].specialRuleName].prototype.shortTextEng =  a[i].shortTextEng || null;
    }
}



WH_SpecialRuleFabric([

{
    specialRuleName: 'AcuteSenses',
    visibleName: 'Acute senses',
    shortTextEng : 'The unit may re-roll to see WH_ich table edge they enter from, should they be arriving from a random one (usually due to Outflanking attempts',
}, {
    specialRuleName: 'AdamantiumWill ',
    visibleName: 'Adamantium will ',
    shortTextEng : 'The unit receives a +1 bonus to "Deny the Witch" rolls',
}, {
    specialRuleName: 'AndTheyShallKnowNoFear',
    visibleName: 'And they shall know no fear',
    shortTextEng : 'Automatically pass all regroup tests, can move-shoot-assault normally after regrouping, and grants immunity to the Fear rule below.',
}, {
    specialRuleName: 'AntiGravUpwash',
    visibleName: 'Anti-grav upwash',
}, {
    specialRuleName: 'AssaultVehicle',
    visibleName: 'Assault vehicle',
    shortTextEng : 'Units disembarking from transports with this USR may assault on the turn they do so, even if their disembarking was caused by the vehicles\' destruction. All Open-topped transports are Assault Vehicles. ',
}, {
    specialRuleName: 'Armorbane',
    visibleName: 'Armorbane ',
    shortTextEng : 'Models or melee weapons with this USR rolls 2d6 to pen vehicles.',
}, {
    specialRuleName: 'ArmoriumCherub',
    visibleName: 'Armorbane ',
    shortTextEng : 'Models or melee weapons with this USR rolls 2d6 to pen vehicles.',
}, {
    specialRuleName: 'BlessingOfTheOmnissiah',
    visibleName: 'Blessing of the Omnissiah',
}, {
    specialRuleName: 'BolsterDefences',
    visibleName: 'Bolster defences',
}, {
    specialRuleName: 'CombatSquad',
    visibleName: 'Combat squad',
}, {
    specialRuleName: 'Deathwing',
    visibleName: 'Deathwing',
}, {
    specialRuleName: 'DeepStrike',
    visibleName: 'Deep strike',
}, {
    specialRuleName: 'EternalWarrior',
    visibleName: 'Eternal warrior',
}, {
    specialRuleName: 'Fear',
    visibleName: 'Fear',
}, {
    specialRuleName: 'Fearless',
    visibleName: 'Fearless',
}, {
    specialRuleName: 'Fleshbane',
    visibleName: 'Fleshbane',
}, {
    specialRuleName: 'FortressOfShields',
    visibleName: 'Fortress of shields',
}, {
    specialRuleName: 'GrimResolve',
    visibleName: 'Grim resolve',
}, {
    specialRuleName: 'HammerOfWrath',
    visibleName: 'Hammer ofWrath',
}, {
    specialRuleName: 'Hatred_ChaosSpaceMarine',
    visibleName: 'Hatred (Chaos Space Marine)',
}, {
    specialRuleName: 'HitAndRun',
    visibleName: 'Hit and run',
}, {
    specialRuleName: 'HonorOrDeath',
    visibleName: 'Honor orDeath',
}, {
    specialRuleName: 'HonourOrDeath (Champion Only)',
    visibleName: 'Honour orDeath ( champion  only)',
}, {
    specialRuleName: 'IconOfOldCaliban',
    visibleName: 'Icon of old caliban',
}, {
    specialRuleName: 'IndependentCharacter',
    visibleName: 'Independent character',
}, {
    specialRuleName: 'Infiltrate',
    visibleName: 'Infiltrate',
}, {
    specialRuleName: 'Interseptor',
    visibleName: 'Interseptor',
}, {
    specialRuleName: 'Killshot',
    visibleName: 'Killshot',
}, {
    specialRuleName: 'LinebreakerBombardment',
    visibleName: 'Linebreaker bombardment',
}, {
    specialRuleName: 'Marked for Retribution',
    visibleName: 'Marked for  retribution',
}, {
    specialRuleName: 'MasterCrafted',
    visibleName: 'Master-crafted',
}, {
    specialRuleName: 'MasterOfRepentance',
    visibleName: 'Master of Repentance',
}, {
    specialRuleName: 'MasterTactican',
    visibleName: 'Master tactican',
}, {
    specialRuleName: 'Melee',
    visibleName: 'Melee',
}, {
    specialRuleName: 'Mindlock',
    visibleName: 'Mindlock',
}, {
    specialRuleName: 'MissileLock',
    visibleName: 'MissileLock',
}, {
    specialRuleName: 'MonsterHunter',
    visibleName: 'Monster hunter',
    shortTextEng : 'A unit containing one or more model with this USR rerolls failed to-wounds against Monstrous creatures and Flying Monstrous creatures.',
}, {
    specialRuleName: 'MoveThroughCover',
    visibleName: 'Move through cover',
}, {
    specialRuleName: 'PowerOfTheMashineSpirit',
    visibleName: 'Power of the mashine spirit',
}, {
    specialRuleName: 'PrediusRelicOfTheUnforgiven',
    visibleName: 'Predius relic of the unforgiven',
}, {
    specialRuleName: 'PreferredEnemy_ChaosSpaceMarine',
    visibleName: 'Preferred enemy (Chaos Space Marine)',
}, {
    specialRuleName: 'PrecisionStrike',
    visibleName: 'Precision strike',
}, 
{
    specialRuleName: 'Psyker_ML1',
    visibleName: 'Psyker (mastery&nbsp;level&nbsp;1)',
}, {
    specialRuleName: 'Psyker_ML2',
    visibleName: 'Psyker (mastery&nbsp;level&nbsp;2)',
}, {
    specialRuleName: 'Psyker_ML3',
    visibleName: 'Psyker (mastery&nbsp;level&nbsp;3)',
}, {
    specialRuleName: 'Psyker_ML4',
    visibleName: 'Psyker (mastery&nbsp;level&nbsp;4)',
},
{
    specialRuleName: 'Ravenwing',
    visibleName: 'Ravenwing',
}, {
    specialRuleName: 'RitesOfBattle',
    visibleName: 'Rites of Battle',
}, {
    specialRuleName: 'Scout',
    visibleName: 'Scout',
}, {
    specialRuleName: 'Shrouded',
    visibleName: 'Shrouded',
}, {
    specialRuleName: 'SkilledRider',
    visibleName: 'Skilled rider',
}, {
    specialRuleName: 'SplitFire',
    visibleName: 'Split fire',
}, {
    specialRuleName: 'StrafingRun',
    visibleName: 'Strafing run',
}, {
    specialRuleName: 'SupremeStrategist',
    visibleName: 'Supreme strategist',
}, {
    specialRuleName: 'SwiftVengeance',
    visibleName: 'Swift Vengeance',
}, {
    specialRuleName: 'Tactical Precision',
    visibleName: 'Tactical Precision',
}, {
    specialRuleName: 'TankHunter',
    visibleName: 'Tank hunter',
}, {
    specialRuleName: 'Zealot',
    visibleName: 'Zealot',
}, {
    specialRuleName: 'UnrelentningHunter',
    visibleName: 'UnrelentningHunter',
},




{
    specialRuleName: 'AttackSquadron',
    visibleName: 'Attack squadron', 
},{
    specialRuleName: 'DeathwingAssault',
    visibleName: 'Deathwing assault', 
},{
    specialRuleName: 'FireDiscipline',
    visibleName: 'Fire discipline', 
},{
    specialRuleName: 'ObjectiveSecured',
    visibleName: 'Objective secured', 
},{
    specialRuleName: 'Scout',
    visibleName: 'Scout', 
},{
    specialRuleName: 'SummonTheDeathwing',
    visibleName: 'Summon the Deathwing', 
},{
    specialRuleName: 'TakeTheFightToTheEnemy',
    visibleName: 'Take the Fight to the Enemy', 
}, {
    specialRuleName: 'Ravenshield',
    visibleName: 'Ravenshield',
}, {
    specialRuleName: 'SupportSquadron',
    visibleName: 'SupportSquadron',
}, {
    specialRuleName: 'CaptureRun',
    visibleName: 'Capture run',
}, {
    specialRuleName: 'FighterEscort',
    visibleName: 'Fighter escort',
}, {
    specialRuleName: 'HammerOfHeretics',
    visibleName: 'Hammer of Heretics',
}, {
    specialRuleName: 'MightOfTheLion',
    visibleName: 'Might of the Lion',
}
]);


