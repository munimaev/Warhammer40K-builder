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
    this.dedicatedTo = this.dedicatedTo || null;
    this.dedicatedTransport = this.dedicatedTransport || null; 
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
		this.models[M].clearWargear();
		var m2 = this.modelDataForm(this.models[M]);
		var equals = false;
		for (var m in modelsArr) {
			if (this.modelDataEquals(modelsArr[m], m2)) {
				modelsArr[m].count++;
				modelsArr[m].model = this.models[M];
				equals = true;
				break;
			}
		}
		if (!equals) {
			modelsArr.push(m2);
		}
	}
	this.$lModels.empty();
	for (var m in modelsArr) {
		this.$lModels.append(modelsArr[m].model.printModel({count:modelsArr[m].count}));
	}
	// this.$lModels.html(modelsText);
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


// --------- Класс-потомок -----------
var Belials = function(o) {
	this.unitName = 'Belials';
	this.price = 190;
	this.optionsDefault = [
		'BelialsWeaponReplace'
	];
	
	this.structureDefault = {
		'Belial' : 1
	}
    this.defaultUnitWargear = [
    	'TerminatorArmor',
    	// 'StromBolter',
    	'IronHalo',
    	'TeleportHommer',
    ];
	this.defaultSpecialRules = [
		'Deathwing',
		'GrimResolve', 
		'Independent Character', 
		'Marked for Retribution', 
		'Tactical Precision',
	];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
Belials.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
Belials.prototype.constructor = Belials;
// Методы потомка 
Belials.prototype.visibleName = 'Belial';




// --------- Класс-потомок -----------
var DA_VeteranSquade = function(o) {
	this.unitName = 'DA_VeteranSquade';
	this.price = 90;
	this.optionsDefault = [
		'DA_VeteranSquade_addVeteran',
		'DA_RangedWeapons',
		'DA_MeleeWeapons',
		'DA_SpecialWeapons',
		'DA_HeavyWeapons',
		'DA_AddWargearBomb',
		'DA_AddWargearShield',
		'DA_DedicatedTransport',
	];
	this.structureDefault = {
		'DA_Veteran_Sergant' : 1,
		'DA_Veteran' : 4,
	}
    this.defaultUnitWargear = [
    	'Boltgun',
    	'BoltPistol',
    	'FragGrenades',
    	'KrakGrenades',
    ];
	this.defaultSpecialRules = [
		'AndTheyShallKnowNoFear',
		'CombatSquade', 
		'GrimResolve', 
	];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_VeteranSquade.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
DA_VeteranSquade.prototype.constructor = DA_VeteranSquade;
// Методы потомка 
DA_VeteranSquade.prototype.visibleName = 'Veteran Squade';



// --------- Класс-потомок -----------
var DA_DropPod = function(o) {
	this.unitName = 'DA_DropPod';
	this.price = 35;
	this.optionsDefault = [
		// 'DA_DropPod_addVeteran',
		// 'DA_RangedWeapons',
		// 'DA_MeleeWeapons',
		// 'DA_SpecialWeapons',
		// 'DA_HeavyWeapons',
		// 'DA_AddWargearBomb',
		// 'DA_AddWargearShield',
		// 'DA_DedicatedTransport',
	];
	this.structureDefault = {
		'DropPod' : 1,
	}
    this.defaultUnitWargear = [
    	// 'Boltgun',
    	// 'BoltPistol',
    	// 'FragGrenades',
    	// 'KrakGrenades',
    ];
	this.defaultSpecialRules = [
		// 'AndTheyShallKnowNoFear',
		// 'CombatSquade', 
		// 'GrimResolve', 
	];
	WHUnit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_DropPod.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_DropPod.prototype.constructor = DA_DropPod;
// Методы потомка 
DA_DropPod.prototype.visibleName = 'Drop Pod';
DA_DropPod.prototype.price = 35;





// --------- Класс-потомок -----------
var DA_Rhino = function(o) {
	this.unitName = 'DA_Rhino';
	this.optionsDefault = [
		'DA_VehicleEquipment'
	];
	this.structureDefault = {
		'Rhino' : 1,
	}
    this.defaultUnitWargear = [
		'StromBolter',
		'Searchlight',
		'SmokeLounchers',
    ];
	this.defaultSpecialRules = [
		// 'Repair', 
	];
	WHUnit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_Rhino.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_Rhino.prototype.constructor = DA_Rhino;
// Методы потомка 
DA_Rhino.prototype.visibleName = 'Rhino';
DA_Rhino.prototype.price = 35;




// --------- Класс-потомок -----------
var DA_Razorback = function(o) {
	this.unitName = 'DA_Razorback';
	this.price = 55;
	this.optionsDefault = [
		// 'DA_Razorback_addVeteran',
		// 'DA_RangedWeapons',
		// 'DA_MeleeWeapons',
		// 'DA_SpecialWeapons',
		// 'DA_HeavyWeapons',
		// 'DA_AddWargearBomb',
		// 'DA_AddWargearShield',
		// 'DA_DedicatedTransport',
	];
	this.structureDefault = {
		'Razorback' : 1,
	}
    this.defaultUnitWargear = [
    	// 'Boltgun',
    	// 'BoltPistol',
    	// 'FragGrenades',
    	// 'KrakGrenades',
    ];
	this.defaultSpecialRules = [
		// 'AndTheyShallKnowNoFear',
		// 'CombatSquade', 
		// 'GrimResolve', 
	];
	WHUnit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_Razorback.prototype = Object.create(WHUnit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_Razorback.prototype.constructor = DA_Razorback;
// Методы потомка 
DA_Razorback.prototype.visibleName = 'Razorback';
DA_Razorback.prototype.price = 55;


