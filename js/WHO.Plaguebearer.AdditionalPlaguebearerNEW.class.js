// --------- Класс-потомок WHOptionSuper -----------
var PlaguebearerAdditionalPlaguebearer = function(o) {
    this.headerText  = 'Можно включить до десяти дополнительных чумоносцев по 9 очков за модель.';
    this.cost = 9;


    this.actionTextUp = 'Добавить чумоносца.';
    this.actionIconUp = 'add_unit';

    this.funCanEnable = function() {
	    if (this.superOption.getCount() < 10) {
	        return true;
	    }
	    return false;
    }

    this.funEnable = function() {
	    if (this.canEnable()) {
	        this.unit.models.push(
	            new Plaguebearer({
	                unit: this.unit,
	                createBy: this.superOption
	            })
	        )
	        this.superOption.usedCount++;
	        this.iUupdated();
	    }
    }


    this.actionTextDown  = 'Удалить чумоносца.';
    this.actionIconDown = 'remove_unit';

    this.funCanDisable = function() {
	    if (this.superOption.getCount() > 0) {
	        return true;
	    }
	    return false;
    }

    this.funDisable = function() {
	    if (this.canEnable()) {
	        for (var i in this.unit.models) {
	        	// console.log(this.unit.models[i].createBy)
	            if (this.unit.models[i].createBy !== this.superOption) {
	                continue;
	            }
	            this.unit.models.splice(i,1);
	        	this.superOption.usedCount--;
	            break;
	        }
	        this.iUupdated();
	    }
    }

    this.funIsNeedShow = this.funCanDisable;

    OptionCounter.apply(this, arguments);

}

// Унаследовать
PlaguebearerAdditionalPlaguebearer.prototype = Object.create(WHOptionSuper.prototype);

// Желательно и constructor сохранить
PlaguebearerAdditionalPlaguebearer.prototype.constructor = PlaguebearerAdditionalPlaguebearer;


PlaguebearerAdditionalPlaguebearer.prototype.getCount = function() {
    var count = 0;
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy === this) {
            count++;
        }
    }
    // console.log('count '+count)
    return count;
}