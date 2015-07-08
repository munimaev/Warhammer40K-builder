// --------- Класс-потомок WHOption -----------
var PlaguebearerInstrumentOfChaos = function(o) {
    this.optionName = 'PlaguebearerInstrumentOfChaos';
    this.cost = 10;
    this.actionText = 'Один чумоносец может взять музыкальный инструмент хаоса';
    WHOption.apply(this, arguments);
}

// Унаследовать
PlaguebearerInstrumentOfChaos.prototype = Object.create(WHOption.prototype);

// Желательно и constructor сохранить
PlaguebearerInstrumentOfChaos.prototype.constructor = PlaguebearerInstrumentOfChaos;



PlaguebearerInstrumentOfChaos.prototype.enable  = function() {
    if (this.canEnable()) {
        for (var i in this.unit.models) {
            if (this.unit.models[i].createBy !== 'structure'
                || ~this.unit.models[i].hasWargear({name:'IconOfChaos'}) ){
                continue;
            }
            this.unit.models[i].addWargear({name:'InstrumentOfChaos',createBy:this});
            this.unit.models[i].touchedByOptions.push(this);
            this.usedCount++;
            break;
        }
    }
    this.unit.printUnit();
}


PlaguebearerInstrumentOfChaos.prototype.disable  = function() {
    if (this.canDisable()) {
        for (var i in this.unit.models) {
            if (this.unit.models[i].hasWargear({name:'InstrumentOfChaos'})) {
                delete this.unit.models[i].wargear['InstrumentOfChaos'];
                this.usedCount--;
                break;
            }
        }
    }
    this.unit.printUnit();
}






