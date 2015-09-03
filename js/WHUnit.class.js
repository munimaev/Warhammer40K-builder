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
    this.$scrollValue = 0;
    this.army = o.army;
    // this.unique = this.unique || false;
    this.dedicatedTo = this.dedicatedTo || null;
    this.dedicatedTransport = this.dedicatedTransport || null; 
    var _this = this;

	this.models = [];
	this.options = [];
	this.unitWargear = [];
	this.speccialRules = {general:[]};
	this.warlordTraits = [];
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
    this.$lSpecial = $('<div />', {
		'class': 'WH_army_unit_header_special',
		'text': 'Special Rules'
	})


	this.$link.append(this.$this);
		this.$this.append(this.$name);
			this.$name.append(this.$lPrice);
			this.$name.append(this.$lExpand);
		this.$this.append(this.$lModels);
		this.$this.append(this.$lSpecial);

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
    this.$oBody0 = $('<div />', {
		'class': 'WH_options_body0'
	})
    this.$oBody = $('<div />', {
		'class': 'WH_options_body'
	})

    this.$options.append(this.$oHeader);
    this.$oHeader.append(this.$oPrice);
    this.$options.append(this.$oBody0);
    	this.$oBody0.append(this.$oBody);


    this.defaultUnitWargear = this.defaultUnitWargear || [];
	this.addDefaultStructure();
	this.addDefaultOptions();
	this.addDefaultSpecialRules();
	this.addDefaultWarlordTraits();
	this.updateHeaderPrice();
	for (var i in this.options) {
		this.options[i].autoSelect();
	}
	this.updateModels();

}


// Методы хранятся в прототипе
WHUnit.prototype.addDefaultStructure  = function() {
	if (!this.hasOwnProperty('structureDefault')) {
		throw {};
	}
	for (var i in this.defaultUnitWargear) {
		this.unitWargear.push(this.defaultUnitWargear[i]);
	}
	for (var i in this.structureDefault) {
		for (var k =1; k<=this.structureDefault[i]; k++ ) {
			this.models.push(new window[i]({unit:this}));
		}
	}
};

WHUnit.prototype.addDefaultOptions  = function() {
	for (var i in this.optionsDefault) {
		this.options.push(new window[this.optionsDefault[i]]({unit:this,$link:this.$oBody}));
	};
};
WHUnit.prototype.addDefaultSpecialRules  = function() {
	for (var i in this.defaultSpecialRules) {
		if (typeof this.defaultSpecialRules[i] === 'string') {
			if (window[this.defaultSpecialRules[i]]) {
				this.speccialRules.general.push(new window[this.defaultSpecialRules[i]]({unit:this,createBy:this}));
			}
			else {
				console.log("{specialRuleName: '"+this.defaultSpecialRules[i]+"',visibleName: '"+this.defaultSpecialRules[i]+"',},")
			}
		}
		else if (typeof this.defaultSpecialRules[i] === 'object') {
			console.log(this.defaultSpecialRules[i])
			if (this.defaultSpecialRules[i].type === 'onModelName') {
				if (!this.speccialRules.hasOwnProperty('onModelName')) {
					this.speccialRules.onModelName = {};
				}
				for (var n in this.defaultSpecialRules[i].names) {
					if (!this.speccialRules.onModelName.hasOwnProperty(this.defaultSpecialRules[i].names[n])) {
						this.speccialRules.onModelName[this.defaultSpecialRules[i].names[n]] = [];
					}
					for (var r in this.defaultSpecialRules[i].rules) {
						if (window[this.defaultSpecialRules[i].names[n]]) {
							this.speccialRules.onModelName[this.defaultSpecialRules[i].names[n]].push(new window[this.defaultSpecialRules[i].rules[r]]({unit:this,createBy:this}))
						}
						else {
							console.log("{specialRuleName: '"+this.defaultSpecialRules[i]+"',visibleName: '"+this.defaultSpecialRules[i]+"',},")
						}
					}
				}
			}
		} 
	}
};

WHUnit.prototype.addDefaultWarlordTraits  = function() {
	for (var i in this.defaultWarlordTrait) {
		if (typeof this.defaultWarlordTrait[i] === 'string') {
			if (window[this.defaultWarlordTrait[i]]) {
				this.warlordTraits.push(new window[this.defaultWarlordTrait[i]]({unit:this,createBy:this}));
			}
			else {
				console.log("{warlordTraitName: '"+this.defaultWarlordTrait[i]+"',visibleName: '"+this.defaultWarlordTrait[i]+"',},")
			}
		}
	}
}
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


WHUnit.prototype.select  = function() {
	this.army.unselectAllUnit();
	this.$alink.addClass('WH_army--small');
	this.updateAllOptions();
	this.updateModels();
	this.$olink.append(this.$options);
    this.$oBody.scrollTop(this.$scrollValue);
};
WHUnit.prototype.unselect  = function() {
	this.$alink.removeClass('WH_army--small');
	this.$scrollValue = this.$oBody.scrollTop();
	this.$options.detach();
};
WHUnit.prototype.getVisibleNAme  = function() {
	return this.visibleName || this.unitName;
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
	for (var m in this.models) {
		for (var c in this.models[m].changedWargear) {
			additionalCost += this.models[m].changedWargear[c].cost;
		}
	}
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
	var modelsArr = this.getUnicModelArr();
	this.$lModels.empty();
	for (var m in modelsArr) {
		this.$lModels.append(modelsArr[m].model.printModel({count:modelsArr[m].count}));
	}
	this.$lSpecial.empty()

	if (this.speccialRules.general.length) {
		var $general = $('<div />');
		$general.append($('<h5>',{text:'Special Rules'}));
		for (var r in this.speccialRules.general) {
			$general.append(this.speccialRules.general[r].getSpan());
		}
		this.$lSpecial.append($general);
	}

	if (this.speccialRules.hasOwnProperty('onModelName')) {
		// console.log(this.speccialRules.onModelName)
		for (var n in this.speccialRules.onModelName) {
			var $onModelName = $('<div />');
			$onModelName.append($('<h5>',{text: 'Special Rules - '+window[n].prototype.visibleModelName}));
			for (var r in this.speccialRules.onModelName[n]) {
				$onModelName.append(this.speccialRules.onModelName[n][r].getSpan());	
			}
			this.$lSpecial.append($onModelName);
		}
	}
	if (this.warlordTraits.length) {
		var $lWarlordTraits = $('<div />');
		$lWarlordTraits.append($('<h5>',{text:'Warlord Trait'}));
		for (var r in this.warlordTraits) {
			$lWarlordTraits.append(this.warlordTraits[r].getSpan());
		}
		this.$lSpecial.append($lWarlordTraits);
	}

	// this.$lSpecial.html('Special Riles <br><small>' +this.defaultSpecialRules.join(', ')+'</small>');
	// this.$lModels.html(modelsText);
}

WHUnit.prototype.getUnicModelArr = function(models) {
	var modelsArr = [];
	var models = models || this.models;
	for (var M in models) {
		models[M].clearWargear();
		var m2 = this.modelDataForm(models[M]);
		var equals = false;
		for (var m in modelsArr) {
			if (this.modelDataEquals(modelsArr[m], m2)) {
				modelsArr[m].count++;
				modelsArr[m].model = models[M];
				equals = true;
				break;
			}
		}
		if (!equals) {
			modelsArr.push(m2);
		}
	}
	return modelsArr;
}

WHUnit.prototype.modelDataEquals = function(m1, m2) {
	if (m1.model.modelName != m2.model.modelName) {
		return false;
	}
	if (m1.model.wargear.length !== m2.model.wargear.length) {
		return false;
	}
	var hasEqualWargear = false;
	var usedWargearInW2 = [];
	for (var w1 in m1.model.wargear) {
		hasEqualWargear = false

		for (var w2 in m2.model.wargear) {
			// console.log( m2.model.wargear[w2]);
			if (!~usedWargearInW2.indexOf(w2)
				&& m1.model.wargear[w1].wargearName === m2.model.wargear[w2].wargearName) 	{
				usedWargearInW2.push(w2)
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
		this.$lSpecial.show();
	}
	else {
		this.isShowModels = false;
		this.$lModels.hide();
		this.$lSpecial.hide();
	}
}


// --------- Класс-потомок -----------
var WHUnit_Infantry = function(o) {
	this.unitType = 'infantry';
	WHUnit.apply(this, arguments);
}
// Унаследовать
WHUnit_Infantry.prototype = Object.create(WHUnit.prototype);
// Желательно и constructor сохранить
WHUnit_Infantry.prototype.constructor = WHUnit_Infantry;



var WHUnit_Vehicle = function(o) {
	this.unitType = 'vehicle';
	WHUnit.apply(this, arguments);
}
// Унаследовать
WHUnit_Vehicle.prototype = Object.create(WHUnit.prototype);
// Желательно и constructor сохранить
WHUnit_Vehicle.prototype.constructor = WHUnit_Vehicle;






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

    this.structureDefault = {
		"Plaguebearer": 10
    };
    this.defaultUnitWargear = [
    	'PlagueSword'
    ];

	WHUnit_Infantry.apply(this, arguments);
}

// Унаследовать
Plaguebearers.prototype = Object.create(WHUnit_Infantry.prototype);

// Желательно и constructor сохранить
Plaguebearers.prototype.constructor = Plaguebearers;

// Методы потомка
 
Plaguebearers.prototype.visibleName = 'Plaguebearers';

Plaguebearers.prototype.init = function() {
  // Вызов метода родителя внутри своего
  WHUnit_Infantry.prototype.run.apply(this);	
};


Plaguebearers.prototype.hasPlguer = function() {
    for (var i in this.models) {
    	if (this.models[i].modelName == 'Plaguer') {
    		return true;
    	}
    }
    return false;
}




/*
WHOptionAddModelFabric([{
    'optionName' : 'PlaguebearerAdditionalPlaguebearer',
    'cost' : 9,
    'actionTextUp' : 'Добавить чумоносца.',
    'actionTextDown' : 'Удалить чумоносца.',
    'maxCountAdding' : 10,
    'modelToAdd' : 'Plaguebearer',
}]);
*/