// --------- Класс-потомок WH_Option -----------
var PlaguebearerAdditionalPlaguebearerAdd = function(o) {
    this.optionName = 'PlaguebearerAdditionalPlaguebearerAdd';
    this.cost = 9;
    this.actionText = 'Добавить чумоносца.';
    this.actionIcon = 'add_unit';
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
PlaguebearerAdditionalPlaguebearerAdd.prototype = Object.create(WH_Option.prototype);

// Желательно и constructor сохранить
PlaguebearerAdditionalPlaguebearerAdd.prototype.constructor = PlaguebearerAdditionalPlaguebearerAdd;


PlaguebearerAdditionalPlaguebearerAdd.prototype.canEnable = function() {
    if (this.superOption.getCount() < 10) {
        return true;
    }
    return false;
}

PlaguebearerAdditionalPlaguebearerAdd.prototype.enable = function() {
    if (this.canEnable()) {
        this.unit.models.push(
            new Plaguebearer({
                unit: this.unit,
                createBy: this.superOption
            })
        )
        this.iUpdated();
    }
}
