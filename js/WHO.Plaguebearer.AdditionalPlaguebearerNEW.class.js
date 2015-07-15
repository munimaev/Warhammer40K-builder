


WHOptionAdditionalModel = function(o) {
    this.actionIconUp = this.actionIconUp || 'add_unit';
    this.actionIconDown = this.actionIconDown || 'remove_unit';
    this.maxCountAdding  = this.maxCountAdding || 0;

    this.funCanEnable = function() {
	    if (this.superOption.getCount() < this.superOption.maxCountAdding) {
	        return true;
	    }
	    return false;
    }

    this.funEnable = function() {
	    if (this.canEnable()) {
	        this.unit.models.push(
	            new window[this.superOption.modelToAdd]({
	                unit: this.unit,
	                createBy: this.superOption
	            })
	        )
	        this.superOption.usedCount++;
	        this.iUpdated();
	    }
    }

    this.funCanDisable = function() {
	    if (this.superOption.getCount() > 0) {
	        return true;
	    }
	    return false;
    }

    this.funDisable = function() {
	    if (this.canEnable()) {
	        for (var i in this.unit.models) {
	            if (this.unit.models[i].createBy !== this.superOption) {
	                continue;
	            }
	            this.unit.models.splice(i,1);
	        	this.superOption.usedCount--;
	            break;
	        }
	        this.iUpdated();
	    }
    }

    this.funIsNeedShow = this.funCanDisable;



    OptionCounter.apply(this, arguments);
}

// Унаследовать
WHOptionAdditionalModel.prototype = Object.create(OptionCounter.prototype);
// Желательно и constructor сохранить
WHOptionAdditionalModel.prototype.constructor = WHOptionAdditionalModel;

WHOptionAdditionalModel.prototype.getCount = function() {
    var count = 0;
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy === this) {
            count++;
        }
    }
    return count;
}


var WHOptionAddModelFabric = function(a) {
    for (var i in a) {
        window[a[i].optionName] = function() {
    		var _optionName = a[i].optionName;
    		var _headerText = a[i].headerText;
    		var _cost = a[i].cost;
    		var _actionTextUp = a[i].actionTextUp;
    		var _actionTextDown = a[i].actionTextDown;
    		var _maxCountAdding = a[i].maxCountAdding;
    		var _modelToAdd = a[i].modelToAdd;
            return function() {
                this.optionName = _optionName;
				this.headerText = _headerText;
				this.cost = _cost;
				this.actionTextUp = _actionTextUp;
				this.actionTextDown = _actionTextDown;
				this.maxCountAdding = _maxCountAdding;
				this.modelToAdd = _modelToAdd;

                WHOptionAdditionalModel.apply(this, arguments);
            }
        }()
        window[a[i].optionName].prototype = Object.create(WHOptionAdditionalModel.prototype);
        window[a[i].optionName].prototype.constructor =  window[a[i].optionName];
    }
}

WHOptionAddModelFabric([{
    'optionName' : 'PlaguebearerAdditionalPlaguebearer',
    'headerText' : 'Можно включить до десяти дополнительных чумоносцев по 9 очков за модель.',
    'cost' : 9,
    'actionTextUp' : 'Добавить чумоносца.',
    'actionTextDown' : 'Удалить чумоносца.',
    'maxCountAdding' : 10,
    'modelToAdd' : 'Plaguebearer',
},{
    'optionName' : 'DA_VeteranSquade_addVeteran',
    'headerText' : 'Можно включить до пяти дополнительных ветеранов по 18 очков за модель.',
    'cost' : 18,
    'actionTextUp' : 'Добавить ветерана.',
    'actionTextDown' : 'Удалить ветерана.',
    'maxCountAdding' : 5,
    'modelToAdd' : 'DA_Veteran',
}]);

