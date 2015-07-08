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
        'class': 'WH_roster_army WH_roster_army--CD',
        'click': function() {
            var arm = _this;
            return function() {
                arm.select();
            };
        }()
    });
    this.$header = $('<div />',{
        'class': '',
        'text' : 'army'
    });
    this.$inRoster.append(this.$header);
    this.roster.$armies.append(this.$inRoster);


    this.defaultStructure = this.defaultStructure || [{
        'name': 'HQ',
        'necessarily': [{
            'type': 'anyHQ'
        }],
        'optional': [{
            'type': 'anyHQ'
        }]
    }, {
        'name': 'Trs',
        'necessarily': [{
            'type': 'anyTroop'
        },{
            'type': 'anyTroop'
        }],
        'optional': [{
            'type': 'anyTroop'
        },{
            'type': 'anyTroop'
        },{
            'type': 'anyTroop'
        },{
            'type': 'anyTroop'
        },{
            'type': 'anyTroop'
        }]
    } ];

    this.$armyDiv = $('#WH_army');
    this.$this = $('<div />',{});


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
    this.$inRoster.removeClass('WH_roster_army--selected')
    this.$armyDiv.empty();
}
WHArmy.prototype.unselectAllUnit = function() {
    for (var gr in this.structure) {
        this.structure[gr].unselectAllUnit();
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


// --------- Класс-потомок -----------
var DeamonsOfChaos = function() {
    this.armyName = 'DeamonsOfChaos';
    WHArmy.apply(this, arguments);
}

// Унаследовать
DeamonsOfChaos.prototype = Object.create(WHArmy.prototype);

// Желательно и constructor сохранить
DeamonsOfChaos.prototype.constructor = DeamonsOfChaos;

