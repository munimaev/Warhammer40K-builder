// --------- Класс-Родитель ------------
var WHSlot = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.structure) {
        throw {'text':'Not set structure'};
    }
    if (!o.hasOwnProperty('index')) {
        throw {'text':'Not set index'};
    }
    if (!o.$link) {
        throw {'text':'Not set $link'};
    }
    if (!o.army) {
        throw {'text':'Not set army'};
    }


    this.structure = o.structure;
    this.$link = o.$link;
    this.$popup = $('#popup');
    this.$popupBG = $('#popup__overlay');
    this.unit = null;
    this.army = o.army;
    var _this = this;
    this.$this = $('<div />',{
        'class':'WH_army_slot',
        //'text': this.slotType,
        'click': function() {
            var __this = _this;
            return function() {
                if (__this.isEmpty()) {
                    __this.addUnit();
                }
                else {
                    __this.selectUnit();
                }
            }
        }()
    });
    this.$link.append(this.$this);
}




// Методы хранятся в прототипе

WHSlot.prototype.isEmpty = function() {
    return !this.unit;
}
WHSlot.prototype.notNeeden = function() {
    this.returnToDefault();
    this.$this.detach();
}
WHSlot.prototype.needen = function() {
    this.$link.append(this.$this);
}
WHSlot.prototype.returnToDefault = function() {
    this.unit = null;
    this.$this.empty();
}
WHSlot.prototype.addUnit = function() {
    this.$popup.empty();
    if (this.structure.hasOwnProperty('type')) {
        for (var t in this.army.unitList[this.structure.type]) {
            this.$popup.append(this.getUnitSelectOptions(this,this.army.unitList[this.structure.type][t]));
        }
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
WHSlot.prototype.closePopup = function() {
    this.$popupBG.hide();
    this.$popup.empty();
}
WHSlot.prototype.getUnitSelectOptions = function(slot,obj) {
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
                __this.unit = new window[__obj]({
                    $link : __this.$this,
                    army : __this.army
                });
                __this.army.checkAllGroup();
                __this.closePopup();
            }
        }()
    });
    unit.append(name);
    result.append(unit);
    return result;
}
WHSlot.prototype.selectUnit = function() {
    if (!this.isEmpty()) {
        this.unit.select();
    }
}
WHSlot.prototype.unselectUnit = function() {
    if (!this.isEmpty()) {
        this.unit.unselect();
    }
}


// --------- Класс-потомок -----------
var WHSlotNecessarily = function() {
    this.slotType = 'necessarily';
    WHSlot.apply(this, arguments);
}

// Унаследовать
WHSlotNecessarily.prototype = Object.create(WHSlot.prototype);

// Желательно и constructor сохранить
WHSlotNecessarily.prototype.constructor = WHSlotNecessarily;







// --------- Класс-потомок -----------
var WHSlotOptional = function() {
    this.slotType = 'optional';
    WHSlot.apply(this, arguments);
}

// Унаследовать
WHSlotOptional.prototype = Object.create(WHSlot.prototype);

// Желательно и constructor сохранить
WHSlotOptional.prototype.constructor = WHSlotOptional;

