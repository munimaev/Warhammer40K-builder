// --------- Класс-Родитель ------------
var WH_Model = function(o) {
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
WH_Model.prototype.setupDefaultAbilitiesValue  = function() {
    if (!this.hasOwnProperty('defaultAbilities')) {
        throw {};
    }
    this.abilities = {};
    for (var i in this.defaultAbilities) {
        this.abilities[i] = this.defaultAbilities[i];
    }

}

WH_Model.prototype.setupDefaultWargear  = function() {
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

WH_Model.prototype.hasWargear = function(o) {
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
WH_Model.prototype.hasAllWargear = function(arr) {
    for (var w in arr) {
        if (!~this.hasWargear(arr[w])){
            return false;  
        }
    }
    return true;
}
WH_Model.prototype.hasAllWargearGetedByOption = function(option) {
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


WH_Model.prototype.addWargear = function(o) {
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


WH_Model.prototype.removeWargear = function(o) {
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

WH_Model.prototype.printModel  = function(o) {
    var o = o || {};
    var count = o.count || 1;

    var visibleModelName = '';//this.visibleModelName
    if (count > 1) {
        visibleModelName += ' x'+count;
    }
    var name = this.printName();
    var spanCount = $('<span />', {
        'text' : visibleModelName
    })
    var result = $('<div />',{
    })


    var abilities = this.printAbilities();
    result.append(abilities);

    result.append(name);
    name.append(spanCount);


    if (this.wargear.length > 0) {
        result.append(this.printWargear());
        // result += this.printSpecial();
    }
    return result;

}
WH_Model.prototype.printName = function () {
    var _this = this;
    var click = function () {
        console.log(_this);
    }
    var htmlClass = 'WH_unit_header';
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
        htmlClass += ' modelName--readyToChange'
    }
    var spanName = $('<h5 />', {
        'text' : this.visibleModelName,
        'click': click,
        'class':htmlClass
    })
    return spanName;
}

WH_Model.prototype.clearWargear = function () {
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
WH_Model.prototype.printWargear = function () {
    // console.log(this.wargear)
    // var result = '<small style="padding-left: 2em;">';
    var result = $('<div />',{
        'class' : 'WH_unit_linkList',
        // 'text': 'Wargear: '
    })
    // result += 'Wargear: ';
    // 

    for (var i in this.wargear) {
        result.append(this.wargear[i].getSpan());
        result.append($('<span/>',{'text':' '}));
    }
    // result += '</small><br>';
    return result;
}
WH_Model.prototype.printSpecial = function () {
    var result = '';
    if (this.getedOptions.length > 0) {
        result += '<small style="padding-left: 2em;">';
        result += 'Options: ';
        var arr = [];
        var o1;
        for (var go in this.getedOptions) {
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

WH_Model.prototype.printAbilities = function () {
    var $div = $('<div />',{
        'class' : 'WH_army_unit_header_unit_modelAbilities'
    })
    var $tt = $('<table />',{'class':'WH_army_unit_table'})
    var $t = $('<tbody />',{'class':'WH_army_unit_tbody'})
    var $t1 = $('<tr />',{'class':'WH_army_unit_tr'})
    var $t2 = $('<tr />',{'class':'WH_army_unit_tr'})
    if (this.abilities.hasOwnProperty('WS')) {
        $t1.append($('<th />', {'text':'WS'}))
        $t2.append($('<td />', {'text': this.abilities.WS}))
    }
    if (this.abilities.hasOwnProperty('BS')) {
        $t1.append($('<th />', {'text':'BS'}))
        $t2.append($('<td />', {'text': this.abilities.BS}))
    }


    if (this.abilities.hasOwnProperty('AF')) {
        $t1.append($('<th />', {'text':'AF'}))
        $t2.append($('<td />', {'text': this.abilities.AF}))
    }
    if (this.abilities.hasOwnProperty('AS')) {
        $t1.append($('<th />', {'text':'AS'}))
        $t2.append($('<td />', {'text': this.abilities.AS}))
    }
    if (this.abilities.hasOwnProperty('AR')) {
        $t1.append($('<th />', {'text':'AR'}))
        $t2.append($('<td />', {'text': this.abilities.AR}))
    }


    if (this.abilities.hasOwnProperty('S')) {
        $t1.append($('<th />', {'text':'S'}))
        $t2.append($('<td />', {'text': this.abilities.S}))
    }
    if (this.abilities.hasOwnProperty('T')) {
        $t1.append($('<th />', {'text':'T'}))
        $t2.append($('<td />', {'text': this.abilities.T}))
    }
    if (this.abilities.hasOwnProperty('W')) {
        $t1.append($('<th />', {'text':'W'}))
        $t2.append($('<td />', {'text': this.abilities.W}))
    }
    if (this.abilities.hasOwnProperty('.I')) {
        $t1.append($('<th />', {'text':'I'}))
        $t2.append($('<td />', {'text': this.abilities.I}))
    }
    if (this.abilities.hasOwnProperty('.A')) {
        $t1.append($('<th />', {'text':'A'}))
        $t2.append($('<td />', {'text': this.abilities.A}))
    }
    if (this.abilities.hasOwnProperty('Ld')) {
        $t1.append($('<th />', {'text':'Ld'}))
        $t2.append($('<td />', {'text': this.abilities.Ld}))
    }
    if (this.abilities.hasOwnProperty('Sv')) {
        $t1.append($('<th />', {'text':'Sv'}))
        $t2.append($('<td />', {'text': this.abilities.Sv+'+'}))
    }
    if (this.abilities.hasOwnProperty('HP')) {
        $t1.append($('<th />', {'text':'HP'}))
        $t2.append($('<td />', {'text': this.abilities.HP}))
    }


    $t.append($t1);
    $t.append($t2);
    $tt.append($t);
    $div.append($tt);
    return $div;
}


// --------- Класс-потомок -----------
var WH_Model_Infantry = function() {
    this.modelType = 'infantry' ;
    WH_Model.apply(this, arguments);
}
// Унаследовать
WH_Model_Infantry.prototype = Object.create(WH_Model.prototype);
// Желательно и constructor сохранить
WH_Model_Infantry.prototype.constructor = WH_Model_Infantry;


var WH_Model_Vehicle = function() {
    this.modelType = 'vehicle' ;
    WH_Model.apply(this, arguments);
}
// Унаследовать
WH_Model_Vehicle.prototype = Object.create(WH_Model.prototype);
// Желательно и constructor сохранить
WH_Model_Vehicle.prototype.constructor = WH_Model_Vehicle;



var WH_Model_Bike = function() {
    this.modelType = 'bike' ;
    WH_Model.apply(this, arguments);
}
// Унаследовать
WH_Model_Bike.prototype = Object.create(WH_Model.prototype);
// Желательно и constructor сохранить
WH_Model_Bike.prototype.constructor = WH_Model_Bike;


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
    WH_Model_Infantry.apply(this, arguments);
}

// Унаследовать
Plaguebearer.prototype = Object.create(WH_Model_Infantry.prototype);

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
    WH_Model_Infantry.apply(this, arguments);
}

// Унаследовать
Plaguer.prototype = Object.create(WH_Model_Infantry.prototype);

// Желательно и constructor сохранить
Plaguer.prototype.constructor = Plaguer;

