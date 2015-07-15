// --------- Класс-Родитель ------------
var WHRoster = function(o) {

    this.$rosters = $('#rosters');
    this.armies = [];
    this.armyList = ['DarkAngels','DeamonsOfChaos'];

    this.$popup = $('#popup');
    this.$popupBG = $('#popup__overlay');

    var _this = this;
    this.rosterOpenClosedClass = 'WH_roster_open_closed';
    this.$this = $('<div />',{
        'class': 'WH_roster'
    });
    this.bodyIsShowen = false;
    this.$body = $('<div />',{
        'class': 'WH_roster_body'
    });
    this.$armies = $('<div />',{
    });
    this.$addArmy = $('<div />',{
        'class': 'WH_roster_add',
        'text' : 'Add',
        'click': function() {
            var whr = _this;
            return function() {
                whr.addArmy();
            }
        }()
    });
    this.$header = $('<div />',{
        'class': 'WH_roster_header',
        'text' : 'roster',
        'click': function(){
            var whr = _this;
            return function(e) {
                if (e.target.className.indexOf(whr.rosterOpenClosedClass)) {
                    // alert('H');
                }
            }
        }()
    });

    this.$list = $('<div />',{
        'class': this.rosterOpenClosedClass,
        'click': function() {
            var whr = _this;
            return function(e) {
                // alert('L');
                whr.showBody();
            }
        }()
    });

    this.$rosters.append(this.$this);
        this.$this.append(this.$header);
            this.$header.append(this.$list);
        this.$this.append(this.$body);
            this.$body.append(this.$armies);
            this.$body.append(this.$addArmy);

}



// Методы хранятся в прототипе
WHRoster.prototype.showBody = function() {
    if (this.bodyIsShowen) {
        this.bodyIsShowen = false;
        $(this.$body).hide();
        this.$this.removeClass('WH_roster--opened');
    }
    else {
        this.bodyIsShowen = true;
        $(this.$body).show();
        this.$this.addClass('WH_roster--opened');
    }
}
WHRoster.prototype.addArmy = function() {
    this.armies.push(new DeamonsOfChaos({'roster':this}));
}


WHRoster.prototype.addArmy= function() {
    this.$popup.empty();
    for (var a in this.armyList) {
        this.$popup.append(this.getArmySelectOptions(this,this.armyList[a]));
    }
    var _this = this;
    var close = $('<div />', {
        'text': 'close',
        'click':function() {
            var __this = _this
            return function() {
                __this.closePopup();
            }
        }()
    });
    this.$popup.append(close);
    this.$popupBG.show();
}
WHRoster.prototype.closePopup = function() {
    this.$popupBG.hide();
    this.$popup.empty();
}
WHRoster.prototype.getArmySelectOptions = function(slot,obj) {
    var result = $('<div />',{
        'class':"WH_army_slot"
    });
    var unit = $('<div />',{
        'class':"WH_army_unit"
    });
    var name = $('<div />',{
        'class':"WH_army_unit_name",
        'text': window[obj].prototype.visibleName,
        'click':function() {
            var __this = slot;
            var __obj = obj;
            return function() {
                __this.armies.push(new window[__obj]({
                    roster : __this
                }));
                // __this.army.checkAllGroup();
                __this.closePopup();
            }
        }()
    });
    unit.append(name);
    result.append(unit);
    return result;
}

WHRoster.prototype.unselectAllArmy = function() {
    for (var i in this.armies) {
        this.armies[i].unselect();
    }
}


// --------- Класс-потомок -----------
// 
// var DeamonsOfChaos = function() {
//     // this.armyName = 'DeamonsOfChaos';
//     WHRoster.apply(this, arguments);
// }

// // Унаследовать
// DeamonsOfChaos.prototype = Object.create(WHRoster.prototype);

// // Желательно и constructor сохранить
// DeamonsOfChaos.prototype.constructor = DeamonsOfChaos;

