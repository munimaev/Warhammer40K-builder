// --------- Класс-Родитель ------------
var WHModel = function(o) {
    this.unit = o.unit;
    this.WS = this.BS = this.S = this.T = this.W = this.I = this.A = this.Ld = this.Sv = 0;
    this.wargear = [];
    this.defaultWargear = this.defaultWargear || [];
    this.touchedByOptions = [];
    this.setupDefaultAbilitiesValue();
    this.setupDefaultWargear();
    this.createBy = o.hasOwnProperty('createBy') ? o.createBy : 'structure';
    this.getedOptions = [];
}



// Методы хранятся в прототипе
WHModel.prototype.setupDefaultAbilitiesValue  = function() {
    if (!this.hasOwnProperty('modelName')) {
        throw {};
    }
    if (!WHModelRaw) {
        throw {};
    }
    if (!WHModelRaw.hasOwnProperty(this.modelName)) {
        throw {};
    }
    var abilities = WHModelRaw[this.modelName].abilities;
    for (var i in abilities) {
        this[i] = abilities[i];
    }

}

WHModel.prototype.setupDefaultWargear  = function() {
    for (var i in this.unit.unitWargear) {
        this.addWargear({name:this.unit.unitWargear[i],createBy:this})
    }
}

WHModel.prototype.hasWargear = function(o) {
    var o = o || {};
    var name = o.name || null;
    if (!o.name) {
        throw {'text':'Not set name'};
    }
    for (var i in this.wargear) {
        if (this.wargear[i].wargearName === name) {
            return i;
        }
    }
    return -1;
}


WHModel.prototype.addWargear = function(o) {
    var o = o || {};
    var name = o.name || null;
    var createBy = o.createBy || null;
    if (!name) {
        throw {'text':'Not set name'};
    }
    if (!createBy) {
        throw {'text':'Not set createBy'};
    }
    this.wargear.push(new window[o.name]({model:this,createBy:createBy}))
}

WHModel.prototype.printModel  = function(o) {
    var o = o || {};
    var count = o.count || 1;
    var result = this.modelName;
    if (count > 1) {
        result += ' x'+count;
    }
    result += '<br>';

    if (this.wargear.length > 0) {
        result += this.printWargear();
        result += this.printSpecial();
    }
    return result;

}
WHModel.prototype.printWargear = function () {

    var result = '<small style="padding-left: 2em;">';
    result += 'Wargear: ';
    for (var i in this.wargear) {
        result += this.wargear[i].optionNameInModel + ' ';
    }
    result += '</small><br>';
    return result;
}
WHModel.prototype.printSpecial = function () {
    var result = '';
    if (this.getedOptions.length > 0) {
        result += '<small style="padding-left: 2em;">';
        result += 'Options: ';
        var arr = [];
        var o1;
        // console.log(this.getedOptions);
        for (var go in this.getedOptions) {
            // console.log(this.getedOptions[go]);
            o1 = this.getedOptions[go].option.optionNameInModel;
            if (this.getedOptions[go].count > 1) {
                o1 += ' x'+this.getedOptions[go].count;
            }
            arr.push(o1);

        }
        result += arr.join(', ');
        result += '</small><br>';
    }
    return result;
}


// --------- Класс-потомок -----------
var Plaguebearer = function() {
    this.modelName = 'Plaguebearer';
    WHModel.apply(this, arguments);
}

// Унаследовать
Plaguebearer.prototype = Object.create(WHModel.prototype);

// Желательно и constructor сохранить
Plaguebearer.prototype.constructor = Plaguebearer;


// --------- Класс-потомок -----------
var Plaguer = function() {
    this.modelName = 'Plaguer';
    WHModel.apply(this, arguments);
}

// Унаследовать
Plaguer.prototype = Object.create(WHModel.prototype);

// Желательно и constructor сохранить
Plaguer.prototype.constructor = Plaguer;
