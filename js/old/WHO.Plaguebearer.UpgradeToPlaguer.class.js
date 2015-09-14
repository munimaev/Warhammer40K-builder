// --------- Класс-потомок WH_Option -----------
var PlaguebearerUpgradeToPlaguer = function(o) {
    this.optionName = 'PlaguebearerUpgradeToPlaguer';
    this.cost = 5;
    this.actionText = 'Одного чумоносца можно усовершенствовать до зачумленного';
    this.actionIcon = 'upgrade';
    WH_Option.apply(this, arguments);


    var _this = this;
    this.$action.click(function(){
        var __this = _this;
        return function(){
            if (__this.usedCount < 1) {
                __this.enable();
            }
            else {
                __this.disable();
            }
        }
    }())

}

// Унаследовать
PlaguebearerUpgradeToPlaguer.prototype = Object.create(WH_Option.prototype);

// Желательно и constructor сохранить
PlaguebearerUpgradeToPlaguer.prototype.constructor = PlaguebearerUpgradeToPlaguer;



PlaguebearerUpgradeToPlaguer.prototype.enable  = function() {
    if (this.canEnable()) {
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
            this.setIsUsed(true);
            break;
        }
        
        this.iUpdated();
    }
}


PlaguebearerUpgradeToPlaguer.prototype.disable  = function() {
    if (this.canDisable()) {
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
            this.setIsUsed(false);
            break;
        }
        this.iUpdated();
    }
}






