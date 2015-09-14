// --------- Класс-Родитель ------------
var WH_Slot = function(o) {
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
            return function(e) {
                if (__this.isEmpty()) {
                    __this.addUnit(e);
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

WH_Slot.prototype.isEmpty = function() {
    return !this.unit;
}
WH_Slot.prototype.notNeeden = function() {
    this.returnToDefault();
    this.$this.detach();
}
WH_Slot.prototype.needen = function() {
    this.$link.append(this.$this);
}
WH_Slot.prototype.returnToDefault = function() {
    this.unit = null;
    this.$this.empty();
}
WH_Slot.prototype.addUnit = function(e) {
    if (e.target.className === 'WH_army_unit_header_delete') {
        return;
    }
    this.$popup.empty();
    if (this.structure.hasOwnProperty('type')) {
        for (var t in this.army.unitList[this.structure.type]) {
            if (!this.structure.hasOwnProperty('units')
             || ~this.structure.units.indexOf(this.army.unitList[this.structure.type][t])
            ) {
                this.$popup.append(this.getUnitSelectOptions(this,this.army.unitList[this.structure.type][t]));
            }
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
WH_Slot.prototype.closePopup = function() {
    this.$popupBG.hide();
    this.$popup.empty();
}
WH_Slot.prototype.getUnitSelectOptions = function(slot,obj) {
    var result = $('<div />',{
        'class':"WH_popup_option_s"
    });
    var unit = $('<div />',{
        'class':"WH_popup_option_s_unit"
    });

    var name = $('<div />',{
        'class':"WH_popup_option_s_unit_name",
        'text': window[obj].prototype.visibleName
    });
    var img = $('<div />',{
        'class':"WH_popup_option_s_unit_img",
        'style' : 'background-image:url("pics/'+window[obj].prototype.pic+'")'
    });
    // var info = $('<div />',{
    //     'class':"WH_popup_option_s_unit_info",
    //     'text' : 'Подробнее'
    // });
    var enable = true;
    if (window[obj].prototype.unique) {
        for (var u in window[obj].prototype.unique) {
            if (this.army.alreadyTakenUnit({name:window[obj].prototype.unique[u]})) {
                enable = false;
            }
        }        
    }

    if (enable) {
        var clickFunc = function() {
            var __this = slot;
            var __obj = obj;
            return function() {
                __this.createUnit(__obj);
                __this.army.checkAllGroup();
                __this.closePopup();
                __this.army.updateCost();
            }
        }();
        name.click(clickFunc);
        img.click(clickFunc);
    } else {
        name.addClass('WH_army_unit_name__disable')
    }
    unit.append(img);
    unit.append(name);
    // unit.append(info);
    result.append(unit);
    return result;
}
WH_Slot.prototype.createUnit = function(name) {
    this.unit = new window[name]({
        $link : this.$this,
        army : this.army
    });
    this.unit.updateHeaderPrice();
}
WH_Slot.prototype.selectUnit = function() {
    if (!this.isEmpty()) {
        this.unit.select();
    }
}
WH_Slot.prototype.unselectUnit = function() {
    if (!this.isEmpty()) {
        this.unit.unselect();
    }
}



// --------- Класс-потомок -----------
var WH_SlotNecessarily = function() {
    this.slotType = 'necessarily';
    WH_Slot.apply(this, arguments);
}

// Унаследовать
WH_SlotNecessarily.prototype = Object.create(WH_Slot.prototype);

// Желательно и constructor сохранить
WH_SlotNecessarily.prototype.constructor = WH_SlotNecessarily;







// --------- Класс-потомок -----------
var WH_SlotOptional = function() {
    this.slotType = 'optional';
    WH_Slot.apply(this, arguments);
}

// Унаследовать
WH_SlotOptional.prototype = Object.create(WH_Slot.prototype);

// Желательно и constructor сохранить
WH_SlotOptional.prototype.constructor = WH_SlotOptional;

