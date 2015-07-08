// --------- Класс-Родитель ------------
var WHUnit = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.$link) {
        throw {'text':'Not set o.$link'};
    }
    if (!o.army) {
        throw {'text':'Not set army'};
    }
    this.$link = o.$link;
    this.$olink = $('#WH_options');
    this.$alink = $('#WH_army');
    this.army = o.army;
    var _this = this;
	this.models = [];
	this.options = [];
	this.unitWargear = [];
	this.price = this.price || 0;
	this.isShowModels = false;
	var _this = this;




	this.$this = $('<div />', {
		'class': 'WH_army_unit'
	})
	this.$name = $('<div />', {
		'text': _this.getVisibleNAme(),
		'class': 'WH_army_unit_name'
	})
    this.$lPrice = $('<span />', {
		'class': 'WH_army_unit_header_price',
		'text': this.price
	})
    this.$lExpand = $('<div />', {
		'class': 'WH_army_unit_header_expand',
		'click':function() {
			var __this = _this;
			return function() {
				__this.toogleModels();
			}
		}()
	})
    this.$lModels = $('<div />', {
		'class': 'WH_army_unit_header_unit',
		'text': 'dasds'
	})


	this.$link.append(this.$this);
		this.$this.append(this.$name);
			this.$name.append(this.$lPrice);
			this.$name.append(this.$lExpand);
		this.$this.append(this.$lModels);

    this.$options = $('<div />', {
		'class': 'WH_options'
	})
    this.$oHeader = $('<div />', {
		'class': 'WH_options_header',
		'text' : _this.getVisibleNAme()
	})
    this.$oPrice = $('<span />', {
		'class': 'WH_options_header_price',
		'text': this.price
	})
    this.$oBody = $('<div />', {
		'class': 'WH_options_body'
	})

    this.$options.append(this.$oHeader);
    this.$oHeader.append(this.$oPrice);
    this.$options.append(this.$oBody);


    this.defaultUnitWargear = this.defaultUnitWargear || [];
	this.addDefaultStructure();
	this.addDefaultOptions();
	this.updateHeaderPrice();
	this.updateModels();

}


// Методы хранятся в прототипе
WHUnit.prototype.addDefaultStructure  = function() {
	if (!this.hasOwnProperty('unitName')) {
		throw {};
	}
	if (!WHUnitRaw) {
		throw {};
	}
	if (!WHUnitRaw.hasOwnProperty(this.unitName)) {
		throw {};
	}
	for (var i in this.defaultUnitWargear) {
		this.unitWargear.push(this.defaultUnitWargear[i]);
	}
	var structure = WHUnitRaw[this.unitName].structure;
	for (var i in structure) {
		for (var k =1; k<=structure[i]; k++ ) {
			this.models.push(new window[i]({unit:this}));
		}
	}
};

WHUnit.prototype.addDefaultOptions  = function() {
	for (var i in this.optionsDefault) {
		this.options.push(new window[this.optionsDefault[i]]({unit:this,$link:this.$oBody}));
	};
};

WHUnit.prototype.printUnit  = function() {
	console.clear();
	console.log("==================");
	for (var i in this.models) {
		this.models[i].printModel();
	}
	console.log("------------------");
	for (var i in this.options) {
		this.options[i].printOption();
	}
	console.log("==================");
};

WHUnit.prototype.printWargear  = function() {
	console.clear();
	console.log("==================");
	for (var i in this.models) {
		this.models[i].printWargear();
	}
	console.log("==================");
};


WHUnit.prototype.select  = function() {
	this.army.unselectAllUnit();
	this.$alink.addClass('WH_army--small');
	this.$olink.append(this.$options);
};
WHUnit.prototype.unselect  = function() {
	this.$alink.removeClass('WH_army--small');
	this.$options.detach();
};
WHUnit.prototype.getVisibleNAme  = function() {
	return this.unitName;
};

WHUnit.prototype.updateAllOptions = function() {
	for (var o in this.options) {
		this.options[o].update();
	}
	var additionalCost = this.getAdditionalCost();
	if (additionalCost > 0) {
		additionalCost = '('+additionalCost+')';
	}
	this.$oPrice.html( additionalCost );
}
WHUnit.prototype.getAdditionalCost = function() {
	var additionalCost = 0;
	for (var o in this.options) {
		additionalCost += this.options[o].getAdditionalCost();
	}
	this.updateHeaderPrice(additionalCost);
}


WHUnit.prototype.updateHeaderPrice = function(p) {
	var p = p || 0;
	if (p > 0) {
		this.$oPrice.html(' ('+this.price+'+'+p+')');
	}
	else {
		this.$oPrice.html(' ('+this.price+')');
	}
	this.$lPrice.html(' ('+(this.price+p)+')');
}

WHUnit.prototype.updateModels = function() {
	var modelsArr = [];
	for (var M in this.models) {
		var m2 = this.modelDataForm(this.models[M]);
		var equals = false;
		for (var m in modelsArr) {
			if (this.modelDataEquals(modelsArr[m], m2)) {
				modelsArr[m].count++;
				equals = true;
				break;
			}
		}
		if (!equals) {
			modelsArr.push(m2);
		}
	}
	var modelsText = '';
	for (var m in modelsArr) {
		modelsText += modelsArr[m].model.printModel({count:modelsArr[m].count});
	}
	this.$lModels.html(modelsText);
}
WHUnit.prototype.modelDataEquals = function(m1, m2) {
	if (m1.model.modelName != m2.model.modelName) {
		return false;
	}
	if (m1.model.wargear.length !== m2.model.wargear.length) {
		return false;
	}
	var hasEqualWargear = false;
	for (var w1 in m1.model.wargear) {
		hasEqualWargear = false
		for (var w2 in m2.model.wargear) {
			if (m1.model.wargear[w1].wargearName == m2.model.wargear[w2].wargearName) 	{
				hasEqualWargear = true;
				break;
			}
		}
		if (!hasEqualWargear) {
			return false;
		}
	}
	return true;
}
WHUnit.prototype.modelDataForm = function(M) {
	var result = {
		model: M,
		count : 1
	}
	return result;
}



WHUnit.prototype.toogleModels = function() {
	if (!this.isShowModels) {
		this.isShowModels = true;
		this.$lModels.show();
	}
	else {
		this.isShowModels = false;
		this.$lModels.hide();
	}
}





// --------- Класс-потомок -----------
var Plaguebearers = function(o) {
	this.unitName = 'Plaguebearers';
	this.price = 90;
	this.optionsDefault = [
		'PlaguebearerAdditionalPlaguebearer',
		'PlaguebearerUpgradeToPlaguer',
		'PlaguebearerRewardsofChaos',
		'DeamonInstrumentOfChaos',
		'DeamonIconOfChaos'
	];
    this.defaultUnitWargear = [
    	'PlagueSword'
    ];

	WHUnit.apply(this, arguments);
}

// Унаследовать
Plaguebearers.prototype = Object.create(WHUnit.prototype);

// Желательно и constructor сохранить
Plaguebearers.prototype.constructor = Plaguebearers;

// Методы потомка
Plaguebearers.prototype.init = function() {
  // Вызов метода родителя внутри своего
  WHUnit.prototype.run.apply(this);	
};


Plaguebearers.prototype.hasPlguer = function() {
    for (var i in this.models) {
    	if (this.models[i].modelName == 'Plaguer') {
    		return true;
    	}
    }
    return false;
}



// --------- Класс-потомок -----------
var FreeSlot = function(o) {
	this.unitName = 'FreeSlot';
	WHUnit.apply(this, arguments);
}

// Унаследовать
FreeSlot.prototype = Object.create(WHUnit.prototype);

// Желательно и constructor сохранить
FreeSlot.prototype.constructor = FreeSlot;

