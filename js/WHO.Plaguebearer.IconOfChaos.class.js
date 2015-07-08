// --------- Класс-потомок WHOption -----------
var DeamonIconOfChaos = function(o) {
    this.optionName = 'DeamonIconOfChaos';
    this.cost = 10;
    this.actionText = 'Другой чумоносец может взять икону хаоса за 10 очков.';
    WHOption.apply(this, arguments);
}

// Унаследовать
DeamonIconOfChaos.prototype = Object.create(OptionChek.prototype);

// Желательно и constructor сохранить
DeamonIconOfChaos.prototype.constructor = DeamonIconOfChaos;

DeamonIconOfChaos.prototype.on  = function() {
    console.log('on')
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== 'structure'
            || ~this.unit.models[i].hasWargear({name:'InstrumentOfChaos'})
        ) {
            continue;
        }
        this.unit.models[i].wargear.push(new window['IconOfChaos']({model:this.unit.models[i],createBy:this}))
        this.unit.models[i].touchedByOptions.push({option:this})
        console.log(this.unit.models[i].wargear)
        this.usedCount++;
        break;
    }
    this.iUupdated();
}


DeamonIconOfChaos.prototype.off  = function() {
    console.log('off')
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy === 'structure'
            && ~this.unit.models[i].hasWargear({name:'IconOfChaos'})
        ) {
            this.unit.models[i].wargear.splice(this.unit.models[i].hasWargear({name:'IconOfChaos'}),1)
            this.usedCount--;
            break;
        }
    }
    this.iUupdated();
}

