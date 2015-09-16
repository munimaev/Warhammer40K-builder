


WH_OptionAdditionalModel = function(o) {
    this.actionIconUp = this.actionIconUp || 'add_unit';
    this.actionIconDown = this.actionIconDown || 'remove_unit';
    this.maxCountAdding  = this.maxCountAdding || 0;

    this.funCanEnable = this.funCanEnable || function() {
	    if (this.superOption.getCount() < this.superOption.maxCountAdding) {
	        return true;
	    }
	    return false;
    }

    this.funEnable = this.funEnable || function() {
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

    this.funCanDisable = this.funCanDisable || function() {
	    if (this.superOption.getCount() > 0) {
	        return true;
	    }
	    return false;
    }

    this.funDisable = this.funDisable || function() {
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
WH_OptionAdditionalModel.prototype = Object.create(OptionCounter.prototype);
// Желательно и constructor сохранить
WH_OptionAdditionalModel.prototype.constructor = WH_OptionAdditionalModel;

WH_OptionAdditionalModel.prototype.getCount = function() {
    var count = 0;
    for (var i in this.unit.models) {
        if (this.unit.models[i].createBy === this) {
            count++;
        }
    }
    return count;
}

var costToText = function(cost) {

    var modelsCost = 'бесплатно';
    if (cost > 0) {
        var tCost = String(cost);
        if (cost < 10 || tCost.indexOf(-2) != 1) {
            if (tCost.indexOf(-1) === '1') {
                modelsCost = 'очку'
            }
            else if (tCost.indexOf(-1) === '2' || tCost.indexOf(-1) === '3' || tCost.indexOf(-1) === '4') {
                modelsCost = 'очка'
            }
            else {
                modelsCost = 'очков'
            }
        }
        else {
            modelsCost = 'очков'
        }

    }
    return modelsCost;
}

var WH_OptionAddModelFabric = function(a) {
    for (var i in a) {
        window[a[i].optionName] = function() {
    		var optionName = a[i].optionName;
    		var headerText = a[i].headerText;
    		var cost = a[i].cost;
    		var actionTextUp = a[i].actionTextUp;
    		var actionTextDown = a[i].actionTextDown;


    		var maxCountAdding = a[i].maxCountAdding;
            var modelToAdd = a[i].modelToAdd



            var maxCountAddingArr = {
                '1' : 'одного',
                '2' : 'двух',
                '3' : 'трех',
                '4' : 'четырех',
                '5' : 'пяти',
                '6' : 'шести',
                '7' : 'семи',
                '8' : 'восьми',
                '9' : 'девяти',
                '10': 'десяти',
            }
            var modelNameAdd = 'моделей';
            var modelNameRemove = 'модель';
            if (window[modelToAdd].prototype.modelNames) {
                if (window[modelToAdd].prototype.modelNames.addHeader) {
                    modelNameAdd = window[modelToAdd].prototype.modelNames.addHeader;
                }
                if (window[modelToAdd].prototype.modelNames.addHeader) {
                    modelNameRemove = window[modelToAdd].prototype.modelNames.removeHeader;
                }
            } 
            var modelsCost = costToText(cost)
            var headerText = null;
            var actionTextUp = a[i].actionTextUp ||  'Можно включить до '
                + maxCountAddingArr[maxCountAdding]
                + ' дополнительных <b>' + modelNameAdd + '</b> <i>по '
                + cost + ' ' + modelsCost
                + ' за модель</i>';
            var actionTextDown = a[i].actionTextDown ||'Удалить ' + modelNameRemove;



            var funDisable = a[i].hasOwnProperty('funDisable') ? a[i].funDisable : null ;
            var funCanDisable = a[i].hasOwnProperty('funCanDisable') ? a[i].funCanDisable : null ;
            var funEnable = a[i].hasOwnProperty('funEnable') ? a[i].funEnable : null ;
            var funCanEnable = a[i].hasOwnProperty('funCanEnable') ? a[i].funCanEnable : null ;
            return function() {

                this.optionName = optionName;
				this.headerText = headerText;
				this.cost = cost;
				this.actionTextDown = actionTextDown;
				this.maxCountAdding = maxCountAdding;
				this.modelToAdd = modelToAdd;

                this.actionTextUp = actionTextUp;

                if (funDisable) {
                    this.funDisable = funDisable;
                }
                if (funCanDisable) {
                    this.funCanDisable = funCanDisable;
                }
                if (funEnable) {
                    this.funEnable = funEnable;
                }
                if (funCanEnable) {
                    this.funCanEnable = funCanEnable;
                }

                WH_OptionAdditionalModel.apply(this, arguments);
            }
        }()
        window[a[i].optionName].prototype = Object.create(WH_OptionAdditionalModel.prototype);
        window[a[i].optionName].prototype.constructor =  window[a[i].optionName];
    }
}


