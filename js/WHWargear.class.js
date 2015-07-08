// --------- Класс-Родитель ------------
var WHWargear = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.model) {
        throw {'text':'Not set model'};
    }
    if (!o.createBy) {
        throw {'text':'Not set createBy'};
    }
    this.model = o.model;
    this.createBy = o.createBy;
}



// Методы хранятся в прототипе

// --------- Класс-потомок -----------
var PlagueSword = function() {
    this.wargearName = 'PlagueSword';
    this.optionNameInModel = 'Plague Sword';
}

// Унаследовать
PlagueSword.prototype = Object.create(WHWargear.prototype);

// Желательно и constructor сохранить
PlagueSword.prototype.constructor = WHWargear;



// --------- Класс-потомок -----------
var InstrumentOfChaos = function() {
    this.wargearName = 'InstrumentOfChaos';
    this.optionNameInModel = 'Instrument Of Chaos';
}

// Унаследовать
InstrumentOfChaos.prototype = Object.create(WHWargear.prototype);

// Желательно и constructor сохранить
InstrumentOfChaos.prototype.constructor = InstrumentOfChaos;


// --------- Класс-потомок -----------
var IconOfChaos = function() {
    this.wargearName = 'IconOfChaos';
    this.optionNameInModel = 'Icon Of Chaos';

}

// Унаследовать
IconOfChaos.prototype = Object.create(WHWargear.prototype);

// Желательно и constructor сохранить
IconOfChaos.prototype.constructor = IconOfChaos;
