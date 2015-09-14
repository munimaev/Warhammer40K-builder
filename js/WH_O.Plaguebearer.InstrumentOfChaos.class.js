// --------- Класс-потомок WH_Option -----------
var DeamonInstrumentOfChaos = function(o) {
    this.optionName = 'DeamonInstrumentOfChaos';
    this.cost = 10;
    this.actionText = 'Один чумоносец может взять музыкальный инструмент хаоса за 10 очков.';
    WH_Option.apply(this, arguments);
}

// Унаследовать
DeamonInstrumentOfChaos.prototype = Object.create(OptionChek.prototype);

// Желательно и constructor сохранить
DeamonInstrumentOfChaos.prototype.constructor = DeamonInstrumentOfChaos;




DeamonInstrumentOfChaos.prototype.on  = function() {
    console.log('on')
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== 'structure'
            || ~this.unit.models[i].hasWargear({name:'IconOfChaos'})
        ) {
            continue;
        }
        this.unit.models[i].wargear.push(new window['InstrumentOfChaos']({model:this.unit.models[i],createBy:this}))
        this.unit.models[i].touchedByOptions.push({option:this})
        console.log(this.unit.models[i].wargear)
        this.usedCount++;
        break;
    }
    this.iUpdated();
}


DeamonInstrumentOfChaos.prototype.off  = function() {
    console.log('off')
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy === 'structure'
            && ~this.unit.models[i].hasWargear({name:'InstrumentOfChaos'})
        ) {
            this.unit.models[i].wargear.splice(this.unit.models[i].hasWargear({name:'InstrumentOfChaos'}),1)
            console.log(this.unit.models[i].wargear)
            this.usedCount--;
            break;
        }
    }
    this.iUpdated();
}

