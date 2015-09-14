// --------- Класс-Родитель ------------
var WH_Unit = function(o) {

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
	this.disciplines = [];
	this.price = this.price || 0;
	this.totalPrice =  0;
	this.isShowModels = false;
	var _this = this;




	this.$this = $('<div />', {
		'class': 'WH_army_unit'
	})
	this.$name = $('<div />', {
		'text': _this.getVisibleNAme(),
		'class': 'WH_army_unit_name',
		'click':function() {
			var __this = _this;
			return function() {
				__this.toogleModels();
			}
		}(),
		// 'style' : 'background-image:url(pics/'+this.pic+')',
	})
    this.$lPrice = $('<span />', {
		'class': 'WH_army_unit_header_price',
		'text': this.price
	})
    this.$lRemove = $('<div />', {
		'class': 'WH_army_unit_header_delete',
		'click':function() {
			var __this = _this;
			return function(e) {
				__this.removeSelf(e);
			}
		}()
	})
    this.$lModels = $('<div />', {
		'class': 'WH_army_unit_header_unit',
	})
    this.$lSpecial = $('<div />', {
		'class': 'WH_army_unit_header_special',
		'text': 'Special Rules'
	})


	this.$link.append(this.$this);
		this.$this.append(this.$name);
			this.$name.append(this.$lPrice);
			this.$name.append(this.$lRemove);
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

	this.$oBody.niceScroll()

    this.defaultUnitWargear = this.defaultUnitWargear || [];
	this.addDefaultStructure();
	this.addDefaultOptions();
	this.addDefaultSpecialRules();
	this.addDefaultWarlordTraits();
	this.addDefaultDisciplines();
	this.updateHeaderPrice();
	for (var i in this.options) {
		this.options[i].autoSelect();
	}
	this.updateModels();

}


// Методы хранятся в прототипе
WH_Unit.prototype.addDefaultStructure  = function() {
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

WH_Unit.prototype.addDefaultOptions  = function() {
	for (var i in this.optionsDefault) {
		this.options.push(new window[this.optionsDefault[i]]({unit:this,$link:this.$oBody}));
	};
};
WH_Unit.prototype.addDefaultSpecialRules  = function() {
	for (var i in this.defaultSpecialRules) {
		if (typeof this.defaultSpecialRules[i] === 'string') {
			if (WH_SpecialRules[this.defaultSpecialRules[i]]) {
				this.speccialRules.general.push(new WH_SpecialRules[this.defaultSpecialRules[i]]({unit:this,createBy:this}));
			}
			else {
				console.log("{specialRuleName: '"+this.defaultSpecialRules[i]+"',visibleName: '"+this.defaultSpecialRules[i]+"',},")
			}
		}
		else if (typeof this.defaultSpecialRules[i] === 'object') {
			if (this.defaultSpecialRules[i].type === 'onModelName') {
				if (!this.speccialRules.hasOwnProperty('onModelName')) {
					this.speccialRules.onModelName = {};
				}
				for (var n in this.defaultSpecialRules[i].names) {
					var ruleName =  this.defaultSpecialRules[i].names[n];
					if (!this.speccialRules.onModelName.hasOwnProperty(ruleName)) {
						this.speccialRules.onModelName[ruleName] = [];
					}
					for (var r in this.defaultSpecialRules[i].rules) {
						var ruleRule = this.defaultSpecialRules[i].rules[r];
						if (WH_SpecialRules[ruleRule]) {
							this.speccialRules.onModelName[ruleName].push(new WH_SpecialRules[ruleRule]({unit:this,createBy:this}))
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

WH_Unit.prototype.addDefaultWarlordTraits  = function() {
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

WH_Unit.prototype.addDefaultDisciplines  = function() {
	for (var i in this.defaultDisciplines) {
		if (typeof this.defaultDisciplines[i] === 'string') {
			if (window[this.defaultDisciplines[i]]) {
				this.disciplines.push(new window[this.defaultDisciplines[i]]({unit:this,createBy:this}));
			}
			else {
				console.log("{disciplines: '"+this.defaultDisciplines[i]+"',visibleName: '"+this.defaultDisciplines[i]+"',},")
			}
		}
	}
}
WH_Unit.prototype.printUnit  = function() {
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


WH_Unit.prototype.select  = function() {
	this.army.unselectAllUnit();
	this.$alink.addClass('WH_army--small');
	this.updateAllOptions();
	this.updateModels();
	this.$olink.append(this.$options);
    this.$oBody.scrollTop(this.$scrollValue);
};
WH_Unit.prototype.unselect  = function() {
	this.$alink.removeClass('WH_army--small');
	this.$scrollValue = this.$oBody.scrollTop();
	this.$options.detach();
};
WH_Unit.prototype.getVisibleNAme  = function() {
	return this.visibleName || this.unitName;
};

WH_Unit.prototype.updateAllOptions = function() {


	for (var o in this.options) {
		this.options[o].update();
	}

	var additionalCost = this.getAdditionalCost();
	if (additionalCost > 0) {
		additionalCost = '('+additionalCost+')';
	}
	this.$oPrice.html( additionalCost );
}
WH_Unit.prototype.getAdditionalCost = function() {
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


WH_Unit.prototype.updateHeaderPrice = function(p) {
	var p = p || 0;
	if (p > 0) {
		this.$oPrice.html(' ('+this.price+'+'+p+')');
	}
	else {
		this.$oPrice.html(' ('+this.price+')');
	}
	this.totalPrice = this.price+p;
	this.$lPrice.html(' ('+(this.price+p)+')');
	this.army.updateCost();
}

WH_Unit.prototype.updateModels = function() {
	var modelsArr = this.getUnicModelArr();
	this.$lModels.empty();
	for (var m in modelsArr) {
		this.$lModels.append(modelsArr[m].model.printModel({count:modelsArr[m].count}));
	}
	this.$lSpecial.empty()
	this.$lSpecial.append(this.getSpecialRulesHtml());

	if (this.warlordTraits.length) {
		var $lWarlordTraits = $('<div />');
		$lWarlordTraits.append($('<h5>',{text:'Warlord Trait'}));
		for (var r in this.warlordTraits) {
			$lWarlordTraits.append(this.warlordTraits[r].getSpan());
		}
		this.$lSpecial.append($lWarlordTraits);
	}

	if (this.disciplines.length) {
		var $lDisciplines = $('<div />');
		$lDisciplines.append($('<h5>',{text:'Psyker disciplines'}));
		for (var r in this.disciplines) {
			$lDisciplines.append(this.disciplines[r].getSpan());
		}
		this.$lSpecial.append($lDisciplines);
	}

	// this.$lSpecial.html('Special Riles <br><small>' +this.defaultSpecialRules.join(', ')+'</small>');
	// this.$lModels.html(modelsText);
}

WH_Unit.prototype.getSpecialRulesHtml = function() {
	var $div = $('<div />',{});

	var general = this.getSpecialRulesArr({general:true});
	if (general.length) {
		var $general = $('<div />');
		$general.append($('<h5>',{text:'Special Rules'}));
		for (var r in general) {
			$general.append(general[r].getSpan());
		}
		$div.append($general);
	}

	if (this.speccialRules.hasOwnProperty('onModelName')) {
		for (var n in this.speccialRules.onModelName) {
			var $onModelName = $('<div />');
			$onModelName.append($('<h5>',{text: 'Special Rules - '+window[n].prototype.visibleModelName}));
			for (var r in this.speccialRules.onModelName[n]) {
				$onModelName.append(this.speccialRules.onModelName[n][r].getSpan());	
			}
			$div.append($onModelName);
		}
	}
	return $div;
}

WH_Unit.prototype.getSpecialRulesArr = function(o) {
	var result = [];
	if (o.general) {
		if (this.speccialRules.general.length) {
			for (var r in this.speccialRules.general) {
				result.push(this.speccialRules.general[r]);
			}
		}
	}
	else if (o.onModelName) {
		if (this.speccialRules.onModelName && this.speccialRules.onModelName[o.modelName]) {
			for (var r in this.speccialRules.onModelName[o.modelName]) {
				result.push(this.speccialRules.onModelName[o.modelName][r]);
			}
		}
	}
	return result;
}

WH_Unit.prototype.getUnicModelArr = function(models) {
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

WH_Unit.prototype.modelDataEquals = function(m1, m2) {
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
WH_Unit.prototype.modelDataForm = function(M) {
	var result = {
		model: M,
		count : 1
	}
	return result;
}



WH_Unit.prototype.toogleModels = function() { 

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

WH_Unit.prototype.removeSelf = function(e) { 
	for (var g in this.army.structure){
		for (var s in this.army.structure[g].slots) {
			if (this.army.structure[g].slots[s].unit === this) {
				this.army.structure[g].slots[s].returnToDefault()
				this.army.structure[g].unselectAllUnit();
				this.army.checkAllGroup();
				this.army.updateCost();
				break;
			}
		}
	}
}


// --------- Класс-потомок -----------
var WH_Unit_Infantry = function(o) {
	this.unitType = 'infantry';
	WH_Unit.apply(this, arguments);
}
// Унаследовать
WH_Unit_Infantry.prototype = Object.create(WH_Unit.prototype);
// Желательно и constructor сохранить
WH_Unit_Infantry.prototype.constructor = WH_Unit_Infantry;



var WH_Unit_Vehicle = function(o) {
	this.unitType = 'vehicle';
	WH_Unit.apply(this, arguments);
}
// Унаследовать
WH_Unit_Vehicle.prototype = Object.create(WH_Unit.prototype);
// Желательно и constructor сохранить
WH_Unit_Vehicle.prototype.constructor = WH_Unit_Vehicle;






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

	WH_Unit_Infantry.apply(this, arguments);
}

// Унаследовать
Plaguebearers.prototype = Object.create(WH_Unit_Infantry.prototype);

// Желательно и constructor сохранить
Plaguebearers.prototype.constructor = Plaguebearers;

// Методы потомка
 
Plaguebearers.prototype.visibleName = 'Plaguebearers';

Plaguebearers.prototype.init = function() {
  // Вызов метода родителя внутри своего
  WH_Unit_Infantry.prototype.run.apply(this);	
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
WH_OptionAddModelFabric([{
    'optionName' : 'PlaguebearerAdditionalPlaguebearer',
    'cost' : 9,
    'actionTextUp' : 'Добавить чумоносца.',
    'actionTextDown' : 'Удалить чумоносца.',
    'maxCountAdding' : 10,
    'modelToAdd' : 'Plaguebearer',
}]);
*/