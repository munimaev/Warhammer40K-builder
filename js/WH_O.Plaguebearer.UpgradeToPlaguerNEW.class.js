// --------- Класс-потомок WH_Option -----------
var PlaguebearerUpgradeToPlaguer = function(o) {
    this.optionName = 'PlaguebearerUpgradeToPlaguer';
    this.cost = 5;
    this.actionText = 'Одного чумоносца можно усовершенствовать до зачумленного';
    this.actionIcon = 'upgrade';
    OptionChek.apply(this, arguments);

}

// Унаследовать
PlaguebearerUpgradeToPlaguer.prototype = Object.create(OptionChek.prototype);

// Желательно и constructor сохранить
PlaguebearerUpgradeToPlaguer.prototype.constructor = PlaguebearerUpgradeToPlaguer;


PlaguebearerUpgradeToPlaguer.prototype.on  = function() {
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== 'structure' ||
            this.unit.models[i].touchedByOptions.length !== 0) {
            continue;
        }
        this.unit.models.splice(i,1);
        this.unit.models.splice(0, 0, new Plaguer({
            unit: this.unit,
            createBy: this
        }));
        this.usedCount++;
        break;
    }
    
    this.iUpdated();
}


PlaguebearerUpgradeToPlaguer.prototype.off  = function() {
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy !== this) {
            continue;
        }
        this.unit.models.splice(i,1);
        this.unit.models.splice(0, 0, new Plaguebearer({
            unit: this.unit,
            createBy: 'structure'
        }));
        this.usedCount--;
        break;
    }
    this.iUpdated();
}






