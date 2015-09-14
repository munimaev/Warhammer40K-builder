// --------- Класс-Родитель ------------
var WH_Army = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.roster) {
        throw {'text':'Not set rosters'};
    }
    var _this = this;
    this.roster = o.roster;
    this.defaultFormationRules = this.defaultFormationRules || null;
    this.defaultFormationRestriction = this.defaultFormationRestriction || null;

    this.$inRoster = $('<div />',{
        'class': 'WH_roster_army '+this.htmlClass,
        'click': function() {
            var arm = _this;
            return function(e) {
                arm.select(e);
            };
        }()
    });

    this.$del = $('<div />',{
        'class': 'WH_roster_army_del',
        'click': function() {
            var arm = _this;
            return function() {
                arm.del();
            };
        }()
    });
    this.$inRoster.append(this.$del);
    this.totalPrice = 0;
    this.$header = $('<div />',{
        'class': 'WH_roster_army_name',
        'text' : this.visibleName
    });
    this.$inRoster.append(this.$header);
    this.roster.$armies.append(this.$inRoster);

    this.$armyDiv = $('#WH_army');
    this.$this = $('<div />',{
        'class':'WH_army_in'
    });

    this.structure = [];
    this.formationRestrictions = [];
    this.formationRules = [];
    if (this.defaultFormationRestriction !== null 
     || this.defaultFormationRules !== null
    ) {
        this.$rules = $('<div />',{
            'class':'WH_army_in_rules'
        });
        if (this.defaultFormationRules !== null) {
            var $h51 = $('<h5 />',{
                'class':'WH_army_in_rules_h5',
                'text' : 'Formation Special Rules'
            });
            this.$rules.append($h51);
            for (var i in this.defaultFormationRules) {
                this.formationRules.push(new WH_SpecialRules[this.defaultFormationRules[i]]({unit:this,createBy:this,foFormation:true}))
            }
            for (var i in this.formationRules) {
                this.$rules.append(this.formationRules[i].getSpan())
            }
        }

        if (this.defaultFormationRestriction !== null) {
            var $h52 = $('<h5 />',{
                'class':'WH_army_in_rules_h5',
                'text' : 'Restriction'
            });

            this.$rules.append($h52);

            for (var i in this.defaultFormationRestriction) {
                this.formationRestrictions.push(this.defaultFormationRestriction[i]);
            }

            for (var i in this.formationRestrictions) {
                this.$rules.append($('<span />', {
                    'class' : 'WH_army_select_specialRules_span',
                    'text' : this.formationRestrictions[i]
                }));
            }
        }
        this.$this.append(this.$rules);
    }

    for (var i in this.defaultStructure) {
        this.structure.push(new WH_Groupe({
            index : i,
            structure : this.defaultStructure[i],
            army : this,
            $link : this.$this
        }));
    }




}
WH_Army.prototype.del = function() {
    for (var i in this.roster.armies) {
        if (this.roster.armies[i] === this) {
            this.roster.unselectAllArmy();
            this.$inRoster.remove();
            this.roster.armies.splice(i,1)
            break;
        }
    }
}




WH_Army.prototype.defaultStructure = [{
    'name': '1 - 2 HQ',
    'htmlClass': 'HQ',
    'necessarily': [{
        'type': 'HQ'
    }],
    'optional': [{
        'type': 'HQ'
    }]
}, {
    'name': '2 - 6 Troops',
    'htmlClass': 'Troops',
    'necessarily': [{
        'type': 'Troop'
    },{
        'type': 'Troop'
    }],
    'optional': [{
        'type': 'Troop'
    },{
        'type': 'Troop'
    },{
        'type': 'Troop'
    },{
        'type': 'Troop'
    },{
        'type': 'Troop'
    }]
}, {
    'name': '0 - 6 Fast attack',
    'htmlClass': 'FastAttack',
    'optional': [{
        'type': 'Fast'
    },{
        'type': 'Fast'
    },{
        'type': 'Fast'
    },{
        'type': 'Fast'
    },{
        'type': 'Fast'
    },{
        'type': 'Fast'
    }]
}, {
    'name': '0 - 6 Elite',
    'htmlClass': 'Elite',
    'optional': [{
        'type': 'Elite'
    },{
        'type': 'Elite'
    },{
        'type': 'Elite'
    },{
        'type': 'Elite'
    },{
        'type': 'Elite'
    },{
        'type': 'Elite'
    }]
}, {
    'name': '0 - 6 Heavy support',
    'htmlClass': 'HeavySupport',
    'optional': [{
        'type': 'Heavy'
    },{
        'type': 'Heavy'
    },{
        'type': 'Heavy'
    },{
        'type': 'Heavy'
    },{
        'type': 'Heavy'
    },{
        'type': 'Heavy'
    }]
}];

var WH_Armies = [];


// Методы хранятся в прототипе
WH_Army.prototype.select = function(e) {
    this.roster.unselectAllArmy();
    if (e.target.className == 'WH_roster_army_del') {
        return;
    }
    this.$inRoster.addClass('WH_roster_army--selected')
    this.$armyDiv.append(this.$this);
}
WH_Army.prototype.unselect = function() {
    this.unselectAllUnit();
    this.$inRoster.removeClass('WH_roster_army--selected')
    this.$this.detach();
}
WH_Army.prototype.unselectAllUnit = function() {
    for (var gr in this.structure) {
        this.structure[gr].unselectAllUnit();
    }
}

WH_Army.prototype.checkAllGroup = function() {
    for (var i in this.structure) {
        this.structure[i].check();
    }
}


WH_Army.prototype.addUnit = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.roster) {
        throw {'text':'Not set rosters'};
    }
}


WH_Army.prototype.alreadyTakenUnit = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.name) {
        throw {'text':'Not set name'};
    }
    for (var g in this.structure) {
        for (var s in  this.structure[g].slots) {
            if (this.structure[g].slots[s].unit !== null
                && this.structure[g].slots[s].unit.unitName === o.name) {
                return true;
            }
        }
    }
    return false;
}


WH_Army.prototype.updateCost = function () {
    this.totalPrice = 0;
    for (var g in this.structure) {
        for (var s in this.structure[g].slots) {
            if (!this.structure[g].slots[s].isEmpty()) {
                this.totalPrice += this.structure[g].slots[s].unit.totalPrice;
            }
        }
    }
    var totalPriceTxt = this.totalPrice ? ' ('+this.totalPrice+')' : '';
    this.$header.html(this.visibleName + totalPriceTxt)
    this.roster.updateCost();
}

WH_Army.prototype.selectDefaultUnits = function () {
    for (var g in this.structure) {
        for (var s in this.structure[g].slots) {
            if (this.structure[g].slots[s].slotType == 'necessarily'
             && this.structure[g].slots[s].structure.hasOwnProperty('units')
             && this.structure[g].slots[s].structure.units.length == 1
            ) {
                this.structure[g].slots[s].createUnit(this.structure[g].slots[s].structure.units[0]);
            }
        }
    }
    this.checkAllGroup();
}


// --------- Класс-потомок -----------
var DeamonsOfChaos = function() {
    this.armyName = 'DeamonsOfChaos';
    this.htmlClass = 'WH_roster_army--CD';
    this.unitList = {
        'HQ' : [],
        'Troop' : ['Plaguebearers'],
    }
    WH_Army.apply(this, arguments);
}

// Унаследовать
DeamonsOfChaos.prototype = Object.create(WH_Army.prototype);

// Желательно и constructor сохранить
DeamonsOfChaos.prototype.constructor = DeamonsOfChaos;

DeamonsOfChaos.prototype.visibleName = 'Deamons Of Chaos';


// --------- Класс-потомок -----------
var DarkAngels = function() {
    this.armyName = 'DarkAngels';
    this.htmlClass = 'WH_roster_army--DarkAngel';
    this.unitList = {
        'HQ': [
            'Belials',
            'Sammaels',
            'Sableclaws',
            'DA_InterrogatorChaplain',
            'Asmodais',
            'DA_Librarian',
            'Ezekiels',
            'DA_Chaplain',
            'DA_CompanyMaster',
            'DA_Techmarine',
            'Azraels',
        ],
        'Troop': [
            'DA_TacticalSquad',
            'DA_ScoutSquad',
        ],
        'Elite' : [
            'DA_VeteranSquad',
            'DA_CommandSquad',
            'DA_Dreadnoughts',
            'DA_VenerableDreadnoughts',
            'DA_DeathwingTerminatorSquad',
            'DA_DeathwingCommandSquad',
            'DA_DeathwingKnightSquad',
            'DA_RavenwingCommandSquad',
        ],
        'Fast': [
            'DA_Rhino',
            'DA_Razorback',
            'DA_DropPod',
            'DA_AssaultSquad',
            'DA_RavenwingSquad',
            'DA_RavenwingAttackBikeSquad',
            'DA_RavenwingLandSpeeder',
            'DA_RavenwingLandSpeederVengeance',
            'DA_RavenwingDarkshroud',
            'DA_NephilimJetfighter',
            'DA_RavenwingDarkTalon',
            'DA_RavenwingBlackKnights',
        ],
        'Heavy': [
            'DA_DevastatorSquad',
            'DA_Predator',
            'DA_Whirlwind',
            'DA_Vindicator',
            'DA_LandRaider',
            'DA_LandRaiderCrusader',
            'DA_LandRaiderRedeemer',
        ],

    }
    WH_Army.apply(this, arguments);
}

// Унаследовать
DarkAngels.prototype = Object.create(WH_Army.prototype);
// Желательно и constructor сохранить
DarkAngels.prototype.constructor = DarkAngels;
DarkAngels.prototype.visibleName = 'Dark Angels';
DarkAngels.prototype.defaultStructure = WH_Army.prototype.defaultStructure;

var DarkAngels_BattleDemiCompany = function() {
    this.armyName = 'DarkAngels_BattleDemiCompany';
    this.htmlClass = 'WH_roster_army--DarkAngel';


    DarkAngels.apply(this, arguments);
}

WH_Armies['DarkAngels'] = DarkAngels;
delete DarkAngels;

// Унаследовать
DarkAngels_BattleDemiCompany.prototype = Object.create(DarkAngels.prototype);
// Желательно и constructor сохранить
DarkAngels_BattleDemiCompany.prototype.constructor = DarkAngels_BattleDemiCompany;
DarkAngels_BattleDemiCompany.prototype.visibleName = 'Dark Angels Battle Demi-company';

DarkAngels_BattleDemiCompany.prototype.defaultFormationRules = ['FireDiscipline','ObjectiveSecured'];
DarkAngels_BattleDemiCompany.prototype.defaultStructure = [{
        'name': '1 Company master или Chaplain',
        'htmlClass': 'HQ',
        'necessarily': [{
            'type': 'HQ',
            'units' : ['DA_Chaplain','DA_CompanyMaster']
        }]
    },{
        'name': '0 - 1 Command squad',
        'htmlClass': 'HQ',
        'optional': [{
            'type': 'Elite',
            'units' : ['DA_CommandSquad']
        }]
    },{
        'name': '0 - 1 Veteran squad',
        'htmlClass': 'HQ',
        'optional': [{
            'type': 'Elite',
            'units' : ['DA_VeteranSquad']
        }]
    },{
        'name': '3 Tactical squad',
        'htmlClass': 'Troops',
        'necessarily': [{
            'type': 'Troop',
            'units' : ['DA_TacticalSquad']
        },{
            'type': 'Troop',
            'units' : ['DA_TacticalSquad']
        },{
            'type': 'Troop',
            'units' : ['DA_TacticalSquad']
        }]
    },{
        'name': '1 AssaultSquad',
        'htmlClass': 'FastAttack',
        'necessarily': [{
            'type': 'Fast',
            'units' : ['DA_AssaultSquad']
        }]
    },{
        'name': '1 Devastator squad',
        'htmlClass': 'HeavySupport',
        'necessarily': [{
            'type': 'Heavy',
            'units' : ['DA_DevastatorSquad']
        }]
    },{
        'name': '0 - 1 Dreadnoughts',
        'htmlClass': 'Elite',
        'optional': [{
            'type': 'Elite',
            'units' : ['DA_Dreadnoughts']
        }]
    }];

WH_Armies['DarkAngels_BattleDemiCompany'] = DarkAngels_BattleDemiCompany;
delete DarkAngels_BattleDemiCompany;


var DarkAngels_DeathwingRedemptionForce = function() {
    this.armyName = 'DarkAngels_DeathwingRedemptionForce';
    this.htmlClass = 'WH_roster_army--DarkAngel';


    DarkAngels.apply(this, arguments);
}


// Унаследовать
DarkAngels_DeathwingRedemptionForce.prototype = Object.create(DarkAngels.prototype);
// Желательно и constructor сохранить
DarkAngels_DeathwingRedemptionForce.prototype.constructor = DarkAngels_DeathwingRedemptionForce;
DarkAngels_DeathwingRedemptionForce.prototype.visibleName = 'Dark Angels Deathwing Redemption Force';

DarkAngels_DeathwingRedemptionForce.prototype.defaultFormationRules = [
        'PreferredEnemy_ChaosSpaceMarine',
        'DeathwingAssault',
        'TakeTheFightToTheEnemy'
    ];

DarkAngels_DeathwingRedemptionForce.prototype.defaultFormationRestriction = ['bal-vla']
DarkAngels_DeathwingRedemptionForce.prototype.defaultStructure = [{
        'name': '1 из Belial, Company master, Interrogator Chaplain или Librarian',
        'htmlClass': 'HQ',
        'necessarily': [{
            'type': 'HQ',
            'units' : ['Belials','DA_CompanyMaster','DA_InterrogatorChaplain','DA_Librarian']
        }]
    }, {        
        'name': '2 - 5 Deathwing Terminator Squad',
        'htmlClass': 'Elite',
        'necessarily': [{
            'type': 'Elite',
            'units': ['DA_DeathwingTerminatorSquad']
        }, {
            'type': 'Elite',
            'units': ['DA_DeathwingTerminatorSquad']
        }],
        'optional': [{
            'type': 'Elite',
            'units': ['DA_DeathwingTerminatorSquad']
        }, {
            'type': 'Elite',
            'units': ['DA_DeathwingTerminatorSquad']
        }, {
            'type': 'Elite',
            'units': ['DA_DeathwingTerminatorSquad']
        }]
    }, {
        'name': '0 - 1 Deathwing Command Squad',
        'htmlClass': 'Elite',
        'optional': [{
            'type': 'Elite',
            'units' : ['DA_DeathwingCommandSquad']
        }]
    },{
        'name': '0 - 1 Deathwing Knight Squad',
        'htmlClass': 'Elite',
        'optional': [{
            'type': 'Elite',
            'units' : ['DA_DeathwingKnightSquad']
        }]
    },{
        'name': '0 - 1 Venerable Dreadnought',
        'htmlClass': 'Elite',
        'optional': [{
            'type': 'Elite',
            'units' : ['DA_VenerableDreadnoughts']
        }]
    }];

WH_Armies['DarkAngels_DeathwingRedemptionForce'] = DarkAngels_DeathwingRedemptionForce;
delete DarkAngels_DeathwingRedemptionForce;


var DarkAngels_RavenwingAttackSquadron = function() {
    this.armyName = 'DarkAngels_RavenwingAttackSquadron';
    this.htmlClass = 'WH_roster_army--DarkAngel';
   DarkAngels.apply(this, arguments);
}

// Унаследовать
DarkAngels_RavenwingAttackSquadron.prototype = Object.create(DarkAngels.prototype);
// Желательно и constructor сохранить
DarkAngels_RavenwingAttackSquadron.prototype.constructor = DarkAngels_RavenwingAttackSquadron;
DarkAngels_RavenwingAttackSquadron.prototype.visibleName = 'Dark Angels Ravenwing Attack Squadron';

DarkAngels_RavenwingAttackSquadron.prototype.defaultFormationRules = [
        'Scout',
        'AttackSquadron',
        'SummonTheDeathwing'
    ];

DarkAngels_RavenwingAttackSquadron.prototype.defaultFormationRestriction = ['The unit of Ravenwing landspeeders may only include one model.']

 
DarkAngels_RavenwingAttackSquadron.prototype.defaultStructure = [{
    'name': '1 Ravenwing Bike Squad или Ravenwing Attack Bike Squad',
    'htmlClass': 'FastAttack',
    'necessarily': [{
        'type': 'Fast',
        'units': ['DA_RavenwingSquad', 'DA_RavenwingAttackBikeSquad']
    }]
}, {
    'name': '1 Ravenwing landspeeder или Ravenwing landspeeder Vengeance',
    'htmlClass': 'FastAttack',
    'necessarily': [{
        'type': 'Fast',
        'units': ['DA_RavenwingLandSpeeder', 'DA_RavenwingLandSpeederVengeance']
    }]
}];

WH_Armies['DarkAngels_RavenwingAttackSquadron'] = DarkAngels_RavenwingAttackSquadron;
delete DarkAngels_RavenwingAttackSquadron;




var DarkAngels_RavenwingSupportSquadron = function() {
    this.armyName = 'DarkAngels_RavenwingSupportSquadron';
    this.htmlClass = 'WH_roster_army--DarkAngel';

    DarkAngels.apply(this, arguments);
}

// Унаследовать
DarkAngels_RavenwingSupportSquadron.prototype = Object.create(DarkAngels.prototype);
// Желательно и constructor сохранить
DarkAngels_RavenwingSupportSquadron.prototype.constructor = DarkAngels_RavenwingSupportSquadron;
DarkAngels_RavenwingSupportSquadron.prototype.visibleName = 'Dark Angels Ravenwing Support Squadron';

DarkAngels_RavenwingSupportSquadron.prototype.defaultFormationRules = [
    'GrimResolve',
    'Interseptor',
    'StrafingRun',
    'Ravenshield',
    'SupportSquadron'
];

DarkAngels_RavenwingSupportSquadron.prototype.defaultFormationRestriction = ['The unit of Ravenwing landspeeders may include least 3 models.']


DarkAngels_RavenwingSupportSquadron.prototype.defaultStructure = [{
    'name': '1 Ravenwing Bike Squad или Ravenwing Attack Bike Squad',
    'htmlClass': 'FastAttack',
    'necessarily': [{
        'type': 'Fast',
        'units': ['DA_RavenwingLandSpeeder', 'DA_RavenwingAttackBikeSquad']
    }]
}, {
    'name': '1 Ravenwing landspeeder или Ravenwing landspeeder Vengeance',
    'htmlClass': 'FastAttack',
    'necessarily': [{
        'type': 'Fast',
        'units': ['DA_RavenwingDarkshroud', 'DA_RavenwingLandSpeederVengeance']
    }]
}];

WH_Armies['DarkAngels_RavenwingSupportSquadron'] = DarkAngels_RavenwingSupportSquadron;
delete DarkAngels_RavenwingSupportSquadron;



var DarkAngels_RavenwingSilenceSquadron = function() {
    this.armyName = 'DarkAngels_RavenwingSilenceSquadron';
    this.htmlClass = 'WH_roster_army--DarkAngel';


    // this.defaultFormationRestriction = ['The unit of Ravenwing landspeeders may include least 3 models.']

    DarkAngels.apply(this, arguments);
}

// Унаследовать
DarkAngels_RavenwingSilenceSquadron.prototype = Object.create(DarkAngels.prototype);
// Желательно и constructor сохранить
DarkAngels_RavenwingSilenceSquadron.prototype.constructor = DarkAngels_RavenwingSilenceSquadron;
DarkAngels_RavenwingSilenceSquadron.prototype.visibleName = 'Dark Angels Ravenwing Silence Squadron';

DarkAngels_RavenwingSilenceSquadron.prototype.defaultFormationRules = [
        'CaptureRun',
        'FighterEscort',
    ];
DarkAngels_RavenwingSilenceSquadron.prototype.defaultStructure = [{
    'name': '2 Nephilim Jetfighter',
    'htmlClass': 'FastAttack',
    'necessarily': [{
        'type': 'Fast',
        'units': ['DA_NephilimJetfighter']
    }, {
        'type': 'Fast',
        'units': ['DA_NephilimJetfighter']
    }]
}, {
    'name': '1 Ravenwing Dark Talon',
    'htmlClass': 'FastAttack',
    'necessarily': [{
        'type': 'Fast',
        'units': ['DA_RavenwingDarkTalon']
    }]
}];


WH_Armies['DarkAngels_RavenwingSilenceSquadron'] = DarkAngels_RavenwingSilenceSquadron;
delete DarkAngels_RavenwingSilenceSquadron;



var DarkAngels_HammerOfCaliban = function() {
    this.armyName = 'DarkAngels_HammerOfCaliban';
    this.htmlClass = 'WH_roster_army--DarkAngel';

    DarkAngels.apply(this, arguments);
}

// Унаследовать
DarkAngels_HammerOfCaliban.prototype = Object.create(DarkAngels.prototype);
// Желательно и constructor сохранить
DarkAngels_HammerOfCaliban.prototype.constructor = DarkAngels_HammerOfCaliban;
DarkAngels_HammerOfCaliban.prototype.visibleName = 'Dark Angels Hammer of Caliban';

DarkAngels_HammerOfCaliban.prototype.defaultFormationRules = [
        'MonsterHunter',
        'TankHunter',
        'HammerOfHeretics',
        'MightOfTheLion'
    ];

DarkAngels_HammerOfCaliban.prototype.defaultFormationRestriction = ['The unit of Ravenwing landspeeders may include least 3 models.']


DarkAngels_HammerOfCaliban.prototype.defaultStructure = [{
    'name': '1 Techmarine',
    'htmlClass': 'HQ',
    'necessarily': [{
        'type': 'HQ',
        'units': ['DA_Techmarine']
    }]
}, {
    'name': '1 из Land Raider, Land Raider Crusader или Land Raider Redeemer',
    'htmlClass': 'HeavySupport',
    'necessarily': [{
        'type': 'Heavy',
        'units': [
            'DA_LandRaider',
            'DA_LandRaiderCrusader',
            'DA_LandRaiderRedeemer',
        ]
    }]
}, {
    'name': '1 из Predator, Whirlwind или Vindicator',
    'htmlClass': 'HeavySupport',
    'necessarily': [{
        'type': 'Heavy',
        'units': [
            'DA_Predator',
            'DA_Whirlwind',
            'DA_Vindicator',
        ]
    }]
}];

WH_Armies['DarkAngels_HammerOfCaliban'] = DarkAngels_HammerOfCaliban;
delete DarkAngels_HammerOfCaliban;
