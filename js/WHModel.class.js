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
    this.changedWargear = [];
    this.readyToChange = null;
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
        if (typeof this.unit.unitWargear[i] === 'function') {
            var res = this.unit.unitWargear[i](this);
            if (res !== false) {
                this.addWargear({name:res,createBy:this,model:this})
            }
        }
        else {
            this.addWargear({name:this.unit.unitWargear[i],createBy:this,model:this})
        }
    }
}

WHModel.prototype.hasWargear = function(o) {
    var o = o || {};
    var name = o.name || null;
    var createBy = o.createBy || null;
    if (!o.name) {
        throw {'text':'Not set name'};
    }
    for (var i in this.wargear) {
        if (this.wargear[i].wargearName === name) {
            if (createBy) {
                if (this.wargear[i].createBy === createBy) {
                    return i;
                }
            } else {
                return i;
            }
        }
    }
    return -1;
}
WHModel.prototype.hasAllWargear = function(arr) {
    for (var w in arr) {
        if (!~this.hasWargear(arr[w])){
            return false;  
        }
    }
    return true;
}
WHModel.prototype.hasAllWargearGetedByOption = function(option) {
    for (var c in this.changedWargear) {
        if (this.changedWargear[c].option === option.superOption) {
            if (this.hasAllWargear(this.changedWargear[c].addItems)) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    return false;
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


WHModel.prototype.removeWargear = function(o) {
    var o = o || {};
    var name = o.name || null;
    var createBy = o.createBy || null;
    if (!name) {
        throw {'text':'Not set name'};
    }
    for (var i in this.wargear) {
        if (
            this.wargear[i].wargearName == name
            &&
            (
                !createBy
                ||
                this.wargear[i].createBy == createBy  
            )
        ) {
            var result = this.wargear[i];
            this.wargear.splice(i,1);
            return result;
        }
    }
}

WHModel.prototype.printModel  = function(o) {
    var o = o || {};
    var count = o.count || 1;

    var visibleModelName = '';//this.visibleModelName
    if (count > 1) {
        visibleModelName += ' x'+count;
    }
    var spanCount = $('<span />', {
        'text' : visibleModelName
    })
    var result = $('<div />',{
    })

    result.append(this.printName());
    result.append(spanCount);
    result.append($('<br/>'));

    if (this.wargear.length > 0) {
        result.append(this.printWargear());
        // result += this.printSpecial();
    }
    return result;

}
WHModel.prototype.printName = function () {
    var _this = this;
    var click = function () {
        console.log(_this);
    }
    var htmlClass = '';
    if (this.readyToChange !== null
        && 
        (
            _this.readyToChange.direction === 'off'
            ||
            (
                _this.readyToChange.option.superOption.canEnable()
                &&
                _this.readyToChange.option.superOption.isModelCanChange(_this, _this.readyToChange.option.superOption)
            )
            
        )
        
    ) {
        click = function(){
            return function() {
                _this.readyToChange.funChange(_this);
            }
        }()
        htmlClass = 'modelName--readyToChange'
    }
    var spanName = $('<span />', {
        'text' : this.visibleModelName,
        'click': click,
        'class':htmlClass
    })
    return spanName;
}

WHModel.prototype.clearWargear = function () {
    for (var i = this.wargear.length-1; i >= 0; i--) {
        if (this.wargear[i].wargearName == 'emptySlot'
            && 
            (
                (
                    this.wargear[i].readyToChange !== null
                    && 
                    !this.wargear[i].readyToChange.usedOption.superOption.isModelCanGet(this, this.wargear[i].readyToChange.usedOption)
                )
                ||
                this.wargear[i].readyToChange === null
            )
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



var WHModel_Bike = function() {
    this.modelType = 'vehicle' ;
    WHModel.apply(this, arguments);
}
// Унаследовать
WHModel_Bike.prototype = Object.create(WHModel.prototype);
// Желательно и constructor сохранить
WHModel_Bike.prototype.constructor = WHModel_Bike;


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

