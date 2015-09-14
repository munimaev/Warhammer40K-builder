// --------- Класс-потомок WH_OptionSuper -----------
var OptionSelect = function(o) {
    WH_OptionSuper.apply(this, arguments);
}

// Унаследовать
OptionSelect.prototype = Object.create(WH_OptionSuper.prototype);

// Желательно и constructor сохранить
OptionSelect.prototype.constructor = OptionSelect;

OptionSelect.prototype.allOff = function() {
	for (var i in this.subOptions) {
		this.subOptions[i].off();
	}
}



var ReplaceFromWargear_class = function(o) {
    OptionSelect.apply(this, arguments);
}
// Унаследовать
ReplaceFromWargear_class.prototype = Object.create(OptionSelect.prototype);
// Желательно и constructor сохранить
ReplaceFromWargear_class.prototype.constructor = ReplaceFromWargear_class;




var ReplaceFromWargear_subOtion_class = function() {
    OptionChek.apply(this, arguments);
}
// Унаследовать
ReplaceFromWargear_subOtion_class.prototype = Object.create(OptionChek.prototype);
// Желательно и constructor сохранить
ReplaceFromWargear_subOtion_class.prototype.constructor = ReplaceFromWargear_subOtion_class;


ReplaceFromWargear_subOtion_class.prototype.off = function(){
	for (var u in this.unit.models) {
		for (var w = this.unit.models[u].wargear.length-1; w >= 0; w--) {
			if (this.unit.models[u].wargear[w].createBy === this) {
				this.unit.models[u].wargear.splice(w,1);
			}
		}
	}
	this.usedCount = 0;
	this.iUpdated();
}















var DA_DedicatedTransport = function(o) {
    OptionSelect.apply(this, arguments);
}
// Унаследовать
DA_DedicatedTransport.prototype = Object.create(OptionSelect.prototype);
// Желательно и constructor сохранить
DA_DedicatedTransport.prototype.constructor = DA_DedicatedTransport;



var DA_DedicatedFastTransport = function(o) {
	this.headerText = 'Отряд может выбратьв качестве прикомандированного транспорта одно из следующего';
	this.optionName = 'DA_DedicatedFastTransport';
    this.defaultSubOptions = [
        'DA_DedicatedTransport_DropPod',
        'DA_DedicatedTransport_Rhino',
		'DA_DedicatedTransport_Razorback',
    ]
    DA_DedicatedTransport.apply(this, arguments);
}
// Унаследовать
DA_DedicatedFastTransport.prototype = Object.create(DA_DedicatedTransport.prototype);
// Желательно и constructor сохранить
DA_DedicatedFastTransport.prototype.constructor = DA_DedicatedFastTransport;



var DA_DedicatedHeavyTransport = function(o) {
	this.headerText = 'Отряд может выбратьв качестве прикомандированного транспорта одно из следующего';
	this.optionName = 'DA_DedicatedHeavyTransport';
    this.defaultSubOptions = [
        'DA_DedicatedTransport_LandRaider',
        'DA_DedicatedTransport_LandRaiderCrusader',
		'DA_DedicatedTransport_LandRaiderRedeemer',
    ]
    DA_DedicatedTransport.apply(this, arguments);
}
// Унаследовать
DA_DedicatedHeavyTransport.prototype = Object.create(DA_DedicatedTransport.prototype);
// Желательно и constructor сохранить
DA_DedicatedHeavyTransport.prototype.constructor = DA_DedicatedHeavyTransport;






var DedicatedTransport_suboption = function(o) {
	if (!this.dedicatedUnitName) {
		debugger;
	}
    OptionChek.apply(this, arguments);
}
// Унаследовать
DedicatedTransport_suboption.prototype = Object.create(OptionChek.prototype);
// Желательно и constructor сохранить
DedicatedTransport_suboption.prototype.constructor = DedicatedTransport_suboption;

DedicatedTransport_suboption.prototype.off = function(){
	for (var i in this.unit.army.structure) {
		if (this.unit.army.structure[i].groupName === 'Dedicated transport') {
			for (var s in this.unit.army.structure[i].slots) {
				if (this.unit.army.structure[i].slots[s].unit.dedicatedTo === this.unit
					&& this.unit.army.structure[i].slots[s].unit.unitName === this.dedicatedUnitName
				) {
					this.unit.dedicatedTransport = null;
					this.unit.army.structure[i].slots[s].returnToDefault();
   					this.unit.army.checkAllGroup();

					break;
				}
			}
			break;
		}
	}
	this.usedCount = 0;
	this.iUpdated();
}

DedicatedTransport_suboption.prototype.on = function(){
	this.superOption.allOff();

	var gInd = false;

	for (var i in this.unit.army.structure) {
		if (this.unit.army.structure[i].groupName === 'Dedicated transport') {
			gInd = i;
			break;
		}
	}
	if (gInd === false) {
		gInd = this.unit.army.structure.length; 
	}
    this.unit.army.structure.push(new WH_Groupe({
        index : this.unit.army.structure.length,
        structure : {
	        'name': 'Dedicated transport',
	        'optional': []
	    },
        army : this.unit.army,
        $link : this.unit.army.$this
    }));

	var sInd = this.unit.army.structure[gInd].slots.length;
	this.unit.army.structure[gInd].slots.push( new WH_SlotOptional({
        index : sInd,
        $link : this.unit.army.structure[gInd].$groupPool,
        structure : {
            'type': 'Transport'
        },
        army : this.unit.army
    }));

    this.unit.army.structure[gInd].slots[sInd].unit = new window[this.dedicatedUnitName]({
        $link : this.unit.army.structure[gInd].slots[sInd].$this,
        army : this.unit.army.structure[gInd].slots[sInd].army
    });

	this.unit.army.structure[gInd].slots[sInd].slotType = 'dedicated';
	this.unit.army.structure[gInd].slots[sInd].unit.dedicatedTo = this.unit;
	this.unit.dedicatedTransport = this.unit.army.structure[gInd].slots[sInd].unit;

    this.unit.army.checkAllGroup();

	this.usedCount = 1;
	this.iUpdated();
}






var DA_DedicatedTransport_DropPod = function(o) {
	this.optionName = 'DA_DedicatedTransport_DropPod';
	this.actionText = '<b>Drop Pod</b> за <i>' + DA_DropPod.prototype.price+'</i>';
	this.dedicatedUnitName = 'DA_DropPod';
    DedicatedTransport_suboption.apply(this, arguments);

}
// Унаследовать
DA_DedicatedTransport_DropPod.prototype = Object.create(DedicatedTransport_suboption.prototype);
// Желательно и constructor сохранить
DA_DedicatedTransport_DropPod.prototype.constructor = DA_DedicatedTransport_DropPod;





var DA_DedicatedTransport_Rhino = function(o) {
	this.optionName = 'DA_DedicatedTransport_Rhino';
	this.actionText = 'Rhino за ' + DA_Rhino.prototype.price;
	this.dedicatedUnitName = 'DA_Rhino';
    DedicatedTransport_suboption.apply(this, arguments);

}
// Унаследовать
DA_DedicatedTransport_Rhino.prototype = Object.create(DedicatedTransport_suboption.prototype);
// Желательно и constructor сохранить
DA_DedicatedTransport_Rhino.prototype.constructor = DA_DedicatedTransport_DropPod;






var DA_DedicatedTransport_Razorback = function(o) {
	this.optionName = 'DA_DedicatedTransport_Razorback';
	this.actionText = 'Razorback за ' + DA_Razorback.prototype.price;
	this.dedicatedUnitName = 'DA_Razorback';
    DedicatedTransport_suboption.apply(this, arguments);

}
// Унаследовать
DA_DedicatedTransport_Razorback.prototype = Object.create(DedicatedTransport_suboption.prototype);
// Желательно и constructor сохранить
DA_DedicatedTransport_Razorback.prototype.constructor = DA_DedicatedTransport_Razorback;


var DA_DedicatedTransport_LandRaider = function(o) {
	this.optionName = 'DA_DedicatedTransport_LandRaider';
	this.actionText = 'LandRaider <i>за '+DA_LandRaider.prototype.price+' очков</i>';
	this.dedicatedUnitName = 'DA_LandRaider';
	DedicatedTransport_suboption.apply(this, arguments);
}
DA_DedicatedTransport_LandRaider.prototype = Object.create(DedicatedTransport_suboption.prototype);
DA_DedicatedTransport_LandRaider.prototype.constructor = DA_DedicatedTransport_LandRaider;

var DA_DedicatedTransport_LandRaiderCrusader = function(o) {
	this.optionName = 'DA_DedicatedTransport_LandRaiderCrusader';
	this.actionText = 'LandRaiderCrusader <i>за '+DA_LandRaiderCrusader.prototype.price+' очков</i>';
	this.dedicatedUnitName = 'DA_LandRaiderCrusader';
	DedicatedTransport_suboption.apply(this, arguments);
}
DA_DedicatedTransport_LandRaiderCrusader.prototype = Object.create(DedicatedTransport_suboption.prototype);
DA_DedicatedTransport_LandRaiderCrusader.prototype.constructor = DA_DedicatedTransport_LandRaiderCrusader;

var DA_DedicatedTransport_LandRaiderRedeemer = function(o) {
	this.optionName = 'DA_DedicatedTransport_LandRaiderRedeemer';
	this.actionText = 'LandRaiderRedeemer <i>за '+DA_LandRaiderRedeemer.prototype.price+' очков</i>';
	this.dedicatedUnitName = 'DA_LandRaiderRedeemer';
	DedicatedTransport_suboption.apply(this, arguments);
}
DA_DedicatedTransport_LandRaiderRedeemer.prototype = Object.create(DedicatedTransport_suboption.prototype);
DA_DedicatedTransport_LandRaiderRedeemer.prototype.constructor = DA_DedicatedTransport_LandRaiderRedeemer;
