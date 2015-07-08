// --------- Класс-Родитель ------------
var WHSlot = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.structure) {
        throw {'text':'Not set structure'};
    }
    if (!o.index) {
        throw {'text':'Not set index'};
    }
    if (!o.$link) {
        throw {'text':'Not set $link'};
    }
    if (!o.army) {
        throw {'text':'Not set army'};
    }
    this.$link = o.$link;
    this.unit = null;
    this.army = o.army;
    var _this = this;
    this.$this = $('<div />',{
        'class':'WH_army_slot',
        //'text': this.slotType,
        'click': function() {
            var slt = _this;
            return function() {
                if (slt.isEmpty()) {
                    slt.addUnit();
                }
                else {
                    slt.selectUnit();
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
WHSlot.prototype.returnToDefault = function() {
    
}
WHSlot.prototype.addUnit = function() {
    this.unit = new Plaguebearers({
        $link : this.$this,
        army : this.army
    });
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

