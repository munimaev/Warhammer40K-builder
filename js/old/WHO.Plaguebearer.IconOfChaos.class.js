// --------- Класс-потомок WH_Option -----------
var PlaguebearerIconOfChaos = function(o) {
    this.optionName = 'PlaguebearerIconOfChaos';
    this.cost = 10;
    this.actionText = 'Другой чумоносец может взять икону хаоса';
    WH_Option.apply(this, arguments);
}

// Унаследовать
PlaguebearerIconOfChaos.prototype = Object.create(WH_Option.prototype);

// Желательно и constructor сохранить
PlaguebearerIconOfChaos.prototype.constructor = PlaguebearerIconOfChaos;



PlaguebearerIconOfChaos.prototype.enable  = function() {
    if (this.canEnable()) {
        for (var i in this.unit.models) {
            if (this.unit.models[i].createBy !== 'structure'
                || ~this.unit.models[i].hasWargear({name:'InstrumentOfChaos'})) {
                continue;
            }
            this.unit.models[i].addWargear({name:'IconOfChaos',createBy:this});
            this.unit.models[i].touchedByOptions.push(this);
            this.usedCount++;
            break;
        }
    }
    this.unit.printUnit();
}


PlaguebearerIconOfChaos.prototype.disable  = function() {
    if (this.canDisable()) {
        var ind = null;
        for (var i in this.unit.models) {
            if (ind = ~this.unit.models[i].hasWargear({name:'IconOfChaos'})) {
                this.unit.models[i].wargear.splice(ind,1);
                this.usedCount--;
                break;
            }
        }
    }
    this.unit.printUnit();
}






