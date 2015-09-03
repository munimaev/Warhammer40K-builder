// --------- Класс-Родитель ------------
var WHSpecialRule = function(o) {
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
    // this.readyToChange = null;
    // this.icon = o.icon || null;
    // this.changedFrom = o.changedFrom || null;
}

WHSpecialRule.prototype.getSpan = function() {
    var _this = this;
    var htmlClass = 'WH_army_unit_specialRules_span'
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
    var text = _this.visibleName + ', ';
    // if (_this.wargearName == 'emptySlot') {
    //     text = '<i>' + _this.readyToChange.name + '</i>';
    // }
    var $span = $('<span />',{
        'class': htmlClass,
        // 'click': this.click
    })
    if (this.icon) {
        text = ' <img src="pics/'+this.icon+'.png"> '+text;
    }
    $span.html(text);
    return $span;
}

// Методы хранятся в прототипе




//====================================
//        Dark Angels
//====================================

var WHSpecialRuleFabric = function(a) {
    for (var i in a) {
        window[a[i].specialRuleName] = function() {
            var specialRuleName = a[i].specialRuleName;
            var wargearType = a[i].hasOwnProperty('wargearType') ? a[i].wargearType : 'unknown';
            var icon = a[i].hasOwnProperty('icon') ? a[i].icon : null;
            return function() {
                this.specialRuleName = specialRuleName;
                // this.visibleName = visibleName;
                this.wargearType = wargearType;
                this.icon = icon;
                WHSpecialRule.apply(this, arguments);
            }
        }()
        window[a[i].specialRuleName].prototype = Object.create(WHSpecialRule.prototype);
        window[a[i].specialRuleName].prototype.constructor =  window[a[i].specialRuleName];
        window[a[i].specialRuleName].prototype.visibleName =  a[i].visibleName;
    }
}

WHSpecialRuleFabric([

{
    specialRuleName: 'AndTheyShallKnowNoFear',
    visibleName: 'And they shall know no fear',
}, {
    specialRuleName: 'AntiGravUpwash',
    visibleName: 'Anti-grav upwash',
}, {
    specialRuleName: 'AssaultVehicle',
    visibleName: 'Assault vehicle',
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
    specialRuleName: 'Killshot',
    visibleName: 'Killshot',
}, {
    specialRuleName: 'LinebreakerBombardment',
    visibleName: 'Linebreaker bombardment',
}, {
    specialRuleName: 'Marked for Retribution',
    visibleName: 'Marked for  retribution',
}, {
    specialRuleName: 'MasterOfRepentance',
    visibleName: 'Master of Repentance',
}, {
    specialRuleName: 'MasterTactican',
    visibleName: 'Master tactican',
}, {
    specialRuleName: 'Mindlock',
    visibleName: 'Mindlock',
}, {
    specialRuleName: 'MissileLock',
    visibleName: 'MissileLock',
}, {
    specialRuleName: 'MovethroughCover',
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
    specialRuleName: 'Zealot',
    visibleName: 'Zealot',
}, {
    specialRuleName: 'UnrelentningHunter',
    visibleName: 'UnrelentningHunter',
},
]);
