// --------- Класс-потомок WH_Option -----------
var PlaguebearerAdditionalPlaguebearerRemove = function(o) {
    this.optionName = 'PlaguebearerAdditionalPlaguebearerRemove';
    this.cost = 9;
    this.usedCountMax = 10;
    this.actionText = 'Удалить чумоносца.';

    this.actionIcon = 'remove_unit';
    this.defaultHide = true;
    WH_Option.apply(this, arguments);

    var _this = this;
    this.$action.click(function(){
        var __this = _this;
        return function(){
            __this.enable();
        }
    }())
}

// Унаследовать
PlaguebearerAdditionalPlaguebearerRemove.prototype = Object.create(WH_Option.prototype);

// Желательно и constructor сохранить
PlaguebearerAdditionalPlaguebearerRemove.prototype.constructor = PlaguebearerAdditionalPlaguebearerRemove;


PlaguebearerAdditionalPlaguebearerRemove.prototype.isNeedShow = function() {
    if (this.superOption.getCount() > 0) {
        return true;
    }
    else {
        return !this.defaultHide;
    }
}

PlaguebearerAdditionalPlaguebearerRemove.prototype.canEnable = function() {
    if (this.superOption.usedCount > 0) {
        return true;
    }
    return false;
}

PlaguebearerAdditionalPlaguebearerRemove.prototype.enable = function() {
    if (this.canEnable()) {
        for (var i in this.unit.models) {
            if (this.unit.models[i].createBy !== this.superOption) {
                continue;
            }
            this.unit.models.splice(i,1);
            break;
        }
        this.iUpdated();
    }
}
