// --------- Класс-Родитель ------------
var WHArmy = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.roster) {
        throw {'text':'Not set rosters'};
    }
    var _this = this;
    this.roster = o.roster;

    this.$inRoster = $('<div />',{
        'class': 'WH_roster_army '+this.htmlClass,
        'click': function() {
            var arm = _this;
            return function() {
                arm.select();
            };
        }()
    });

    this.$header = $('<div />',{
        'class': '',
        'text' : this.visibleName
    });
    this.$inRoster.append(this.$header);
    this.roster.$armies.append(this.$inRoster);


    this.defaultStructure = this.defaultStructure || [{
        'name': 'HQ',
        'htmlClass': 'HQ',
        'necessarily': [{
            'type': 'HQ'
        }],
        'optional': [{
            'type': 'HQ'
        }]
    }, {
        'name': 'Trs',
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
        'name': 'Fast',
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
        'name': 'Elite',
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
        'name': 'Heavy support',
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

    this.$armyDiv = $('#WH_army');
    this.$this = $('<div />',{
        'class':'WH_army_in'
    });

    this.structure = [];

    for (var i in this.defaultStructure) {
        this.structure.push(new WHGroupe({
            index : i,
            structure : this.defaultStructure[i],
            army : this,
            $link : this.$this
        }));
    }




}




// Методы хранятся в прототипе
WHArmy.prototype.select = function() {
    this.roster.unselectAllArmy();
    this.$inRoster.addClass('WH_roster_army--selected')
    this.$armyDiv.append(this.$this);
}
WHArmy.prototype.unselect = function() {
    this.unselectAllUnit();
    this.$inRoster.removeClass('WH_roster_army--selected')
    this.$this.detach();
}
WHArmy.prototype.unselectAllUnit = function() {
    for (var gr in this.structure) {
        this.structure[gr].unselectAllUnit();
    }
}

WHArmy.prototype.checkAllGroup = function() {
    for (var i in this.structure) {
        this.structure[i].check();
    }
}


WHArmy.prototype.addUnit = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.roster) {
        throw {'text':'Not set rosters'};
    }
}


WHArmy.prototype.alreadyTakenUnit = function(o) {
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


// --------- Класс-потомок -----------
var DeamonsOfChaos = function() {
    this.armyName = 'DeamonsOfChaos';
    this.htmlClass = 'WH_roster_army--CD';
    this.unitList = {
        'HQ' : [],
        'Troop' : ['Plaguebearers'],
    }
    WHArmy.apply(this, arguments);
}

// Унаследовать
DeamonsOfChaos.prototype = Object.create(WHArmy.prototype);

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
    WHArmy.apply(this, arguments);
}

// Унаследовать
DarkAngels.prototype = Object.create(WHArmy.prototype);

// Желательно и constructor сохранить
DarkAngels.prototype.constructor = DarkAngels;

DarkAngels.prototype.visibleName = 'Dark Angels';

