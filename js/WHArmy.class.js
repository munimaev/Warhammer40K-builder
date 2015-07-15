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
        'necessarily': [{
            'type': 'HQ'
        }],
        'optional': [{
            'type': 'HQ'
        }]
    }, {
        'name': 'Trs',
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
    }];

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
        'HQ' : ['Belials'],
        'Troop' : ['DA_VeteranSquade'],
    }
    WHArmy.apply(this, arguments);
}

// Унаследовать
DarkAngels.prototype = Object.create(WHArmy.prototype);

// Желательно и constructor сохранить
DarkAngels.prototype.constructor = DarkAngels;

DarkAngels.prototype.visibleName = 'Dark Angels';

