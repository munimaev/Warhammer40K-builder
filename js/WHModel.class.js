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
    if (!this.hasOwnProperty('defaultAbilities')) {
        throw {};
    }
    this.abilities = {};
    for (var i in this.defaultAbilities) {
        this.abilities[i] = this.defaultAbilities[i];
    }

}

WHModel.prototype.setupDefaultWargear  = function() {
    for (var i in this.unit.unitWargear) {
        this.addWargear({name:this.unit.unitWargear[i],createBy:this,model:this})
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
    o.model = o.model || this;
    this.wargear.push(new window[o.name](o))
}

WHModel.prototype.printModel  = function(o) {
    var o = o || {};
    var count = o.count || 1;

    var visibleModelName = this.visibleModelName
    if (count > 1) {
        visibleModelName += ' x'+count;
    }
    var result = $('<div />',{
        text : visibleModelName
    })

    result.append($('<br/>'));

    if (this.wargear.length > 0) {
        result.append(this.printWargear());
        // result += this.printSpecial();
    }
    return result;

}
WHModel.prototype.clearWargear = function () {
    for (var i = this.wargear.length-1; i >= 0; i--) {
        if (this.wargear[i].readyToChange === null
            && this.wargear[i].wargearName == 'emptySlot'
        ) {
            this.wargear.splice(i,1);
            continue;
        }
    }
}
WHModel.prototype.printWargear = function () {
    // console.log(this.wargear)
    // var result = '<small style="padding-left: 2em;">';
    var result = $('<small />',{
        'text': 'Wargear: '
    })
    // result += 'Wargear: ';
    // 

    for (var i in this.wargear) {
        result.append(this.wargear[i].getSpan());
    }
    // result += '</small><br>';
    result.append($('<br/>'));
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
var WHModel_Infantry = function() {
    this.modelType = 'infantry' ;
    WHModel.apply(this, arguments);
}
// Унаследовать
WHModel_Infantry.prototype = Object.create(WHModel.prototype);
// Желательно и constructor сохранить
WHModel_Infantry.prototype.constructor = WHModel_Infantry;


var WHModel_Vehicle = function() {
    this.modelType = 'vehicle' ;
    WHModel.apply(this, arguments);
}
// Унаследовать
WHModel_Vehicle.prototype = Object.create(WHModel.prototype);
// Желательно и constructor сохранить
WHModel_Vehicle.prototype.constructor = WHModel_Vehicle;


// --------- Класс-потомок -----------
var Plaguebearer = function() {
    this.modelName = 'Plaguebearer';
    this.visibleModelName = 'Plaguebearer';
    this.defaultAbilities = {
        "BS" : 3,
        "WS" : 3,
        "S"  : 3,
        "I"  : 2,
        "T"  : 4,
        "W"  : 1,
        "A"  : 1,
        "Ld" : 7,
        "Sv" : null
    };
    WHModel_Infantry.apply(this, arguments);
}

// Унаследовать
Plaguebearer.prototype = Object.create(WHModel_Infantry.prototype);

// Желательно и constructor сохранить
Plaguebearer.prototype.constructor = Plaguebearer;


// --------- Класс-потомок -----------
var Plaguer = function() {
    this.modelName = 'Plaguer';
    this.visibleModelName = 'Plaguer';
    this.defaultAbilities = {
        "BS": 3,
        "WS": 3,
        "S": 3,
        "T": 4,
        "W": 1,
        "I": 2,
        "A": 2,
        "Ld": 7,
        "Sv": null
    };
    WHModel_Infantry.apply(this, arguments);
}

// Унаследовать
Plaguer.prototype = Object.create(WHModel_Infantry.prototype);

// Желательно и constructor сохранить
Plaguer.prototype.constructor = Plaguer;


// --------- Класс-потомок -----------
var Belial = function() {
    this.modelName = 'Belial';
    this.visibleModelName = 'Belial';
    this.defaultAbilities = {
        "BS": 6,
        "WS": 5,
        "S" : 4,
        "T" : 4,
        "W" : 3,
        "I" : 5,
        "A" : 4,
        "Ld": 10,
        "Sv": 2
    };
    WHModel_Infantry.apply(this, arguments);
}

// Унаследовать
Belial.prototype = Object.create(WHModel_Infantry.prototype);

// Желательно и constructor сохранить
Belial.prototype.constructor = Belial;



DA_Veteran_Sergant = function() {
    this.modelName = 'DA_Veteran_Sergant';
    this.visibleModelName = 'Veteran Sergant';
    this.defaultAbilities = {
        "BS": 4,
        "WS": 4,
        "S" : 4,
        "T" : 4,
        "W" : 1,
        "I" : 4,
        "A" : 2,
        "Ld": 9,
        "Sv": 3
    };
    WHModel_Infantry.apply(this, arguments);
}

// Унаследовать
DA_Veteran_Sergant.prototype = Object.create(WHModel_Infantry.prototype);

// Желательно и constructor сохранить
DA_Veteran_Sergant.prototype.constructor = DA_Veteran_Sergant;


DA_Veteran = function() {
    this.modelName = 'DA_Veteran';
    this.visibleModelName = 'Veteran';
    this.defaultAbilities = {
        "BS": 4,
        "WS": 4,
        "S" : 4,
        "T" : 4,
        "W" : 1,
        "I" : 4,
        "A" : 2,
        "Ld": 9,
        "Sv": 3
    };
    WHModel_Infantry.apply(this, arguments);
}

// Унаследовать
DA_Veteran.prototype = Object.create(WHModel_Infantry.prototype);

// Желательно и constructor сохранить
DA_Veteran.prototype.constructor = DA_Veteran;




DropPod = function() {
    this.modelName = 'DropPod';
    this.visibleModelName = 'Drop Pod';
    this.defaultAbilities = {
        "BS": 4,
        "F" : 4,
        "S" : 4,
        "R" : 4,
        "HP": 3
    };
    WHModel_Vehicle.apply(this, arguments);
}
// Унаследовать
DropPod.prototype = Object.create(WHModel_Vehicle.prototype);
// Желательно и constructor сохранить
DropPod.prototype.constructor = DropPod;




Rhino = function() {
    this.modelName = 'Rhino';
    this.visibleModelName = 'Rhino';
    this.defaultAbilities = {
        "BS": 4,
        "F" : 4,
        "S" : 4,
        "R" : 4,
        "HP": 3
    };
    WHModel_Vehicle.apply(this, arguments);
}
// Унаследовать
Rhino.prototype = Object.create(WHModel_Vehicle.prototype);
// Желательно и constructor сохранить
Rhino.prototype.constructor = Rhino;




Razorback = function() {
    this.modelName = 'Razorback';
    this.visibleModelName = 'Razorback';
    this.defaultAbilities = {
        "BS": 4,
        "F" : 4,
        "S" : 4,
        "R" : 4,
        "HP": 3
    };
    WHModel_Vehicle.apply(this, arguments);
}
// Унаследовать
Razorback.prototype = Object.create(WHModel_Vehicle.prototype);
// Желательно и constructor сохранить
Razorback.prototype.constructor = Razorback;


