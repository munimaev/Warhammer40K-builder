var DA_Razorback = function(o) {
	this.unitName = 'DA_Razorback';
	this.price = 55;
	this.optionsDefault = [
		'DA_VehicleEquipment',
		'DA_Razorback_HeavyBolterReplace'
	];
	this.structureDefault = {
		'Razorback' : 1,
	}
    this.defaultUnitWargear = [
		'TwinLinkedHeavyBolter',
		'Searchlight',
		'SmokeLounchers',
    ];
	this.defaultSpecialRules = [
		// 'AndTheyShallKnowNoFear',
		// 'CombatSquad', 
		// 'GrimResolve', 
	];
	WH_Unit_Vehicle.apply(this, arguments);
}
// Унаследовать
DA_Razorback.prototype = Object.create(WH_Unit_Vehicle.prototype);
// Желательно и constructor сохранить
DA_Razorback.prototype.constructor = DA_Razorback;
// Методы потомка 
DA_Razorback.prototype.visibleName = 'Razorback';
DA_Razorback.prototype.price = 55;
DA_Razorback.prototype.pic = 'units_DA/Razorback.jpg';


//========================
// Option
//=========================


//==============================================================================

//
//
//


var DA_Razorback_HeavyBolterReplace = function(o) {
    this.defaultSubOptions = [
        'DA_Razorback_HeavyBolterReplace_TwinLinkedHeavyBolter',
        'DA_Razorback_HeavyBolterReplace_TwinLinkedHeavyFlamer',
        'DA_Razorback_HeavyBolterReplace_TwinLinkedAssaultCannon',
        'DA_Razorback_HeavyBolterReplace_TwinLinkedLascannon',
        'DA_Razorback_HeavyBolterReplace_TwinLinkedHeavyFlamer',
        'DA_Razorback_HeavyBolterReplace_LascannonAndTwinLinkedPlasmaGun',
    ]
    this.optionName = 'DA_Razorback_HeavyBolterReplace';
    this.cost = 0;
    this.headerText = 'Можно выбрать одно из следующего.';

    ReplaceFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_Razorback_HeavyBolterReplace.prototype = Object.create(ReplaceFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_Razorback_HeavyBolterReplace.prototype.constructor = DA_Razorback_HeavyBolterReplace;

ReplaceFromWargear_subOtion_fabric([
	{
		optionName : 'DA_Razorback_HeavyBolterReplace_TwinLinkedHeavyBolter',
		actionText : 'Twin-linked Heavy bolter бесплатно.',
		autoSelectOption : true,
		funOn : function(){
		    this.superOption.allOff();
		    for (var u in this.unit.models) {
		        this.unit.models[u].addWargear({name:'TwinLinkedHeavyBolter',createBy:this})
		    }
		    this.usedCount = 1;
		    this.iUpdated();
		}
	}, {
		optionName : 'DA_Razorback_HeavyBolterReplace_TwinLinkedHeavyFlamer',
		actionText : 'Twin-linked Heavy Flamer бесплатно',
		funOn : function(){
		    this.superOption.allOff();
		    for (var u in this.unit.models) {
		        this.unit.models[u].addWargear({name:'TwinLinkedHeavyFlamer',createBy:this})
		    }
		    this.usedCount = 1;
		    this.iUpdated();
		}
	}, {
		optionName : 'DA_Razorback_HeavyBolterReplace_TwinLinkedAssaultCannon',
		actionText : 'Twin-linked Assault Cannon за 20 очков',
		cost : 20,
		autoSelectOption : true,
		funOn : function(){
		    this.superOption.allOff();
		    for (var u in this.unit.models) {
		        this.unit.models[u].addWargear({name:'TwinLinkedAssaultCannon',createBy:this})
		    }
		    this.usedCount = 1;
		    this.iUpdated();
		}
	}, {
		optionName : 'DA_Razorback_HeavyBolterReplace_TwinLinkedLascannon',
		actionText : 'Twin-linked Lascannon за 20 очков',
		cost : 20,
		funOn : function(){
		    this.superOption.allOff();
    	    for (var u in this.unit.models) {
    	        this.unit.models[u].addWargear({name:'TwinLinkedLascannon',createBy:this})
    	    }
    	    this.usedCount = 1;
    	    this.iUpdated();
		}
	}, {
		optionName : 'DA_Razorback_HeavyBolterReplace_LascannonAndTwinLinkedPlasmaGun',
		actionText : 'Lascannon и Twin-linked Plasma gun за 20 очков',
		cost : 20,
		funOn : function(){
		    this.superOption.allOff();
		    for (var u in this.unit.models) {
		        this.unit.models[u].addWargear({name:'Lascannon',createBy:this})
		        this.unit.models[u].addWargear({name:'TwinLinkedPlasmaGun',createBy:this})
		    }
		    this.usedCount = 1;
		    this.iUpdated();
		}
	}
]);







