// --------- Класс-потомок WHOptionSuper -----------
var OptionSelect = function(o) {
    WHOptionSuper.apply(this, arguments);
}

// Унаследовать
OptionSelect.prototype = Object.create(WHOptionSuper.prototype);

// Желательно и constructor сохранить
OptionSelect.prototype.constructor = OptionSelect;

OptionSelect.prototype.allOff = function() {
	for (var i in this.subOptions) {
		this.subOptions[i].off();
	}
}





var BelialsWeaponReplace = function(o) {
	this.headerText = 'Можно выбрать одно из следюущего';
	this.optionName = 'BelialsWeaponReplace';
    this.defaultSubOptions = [
        'BelialsWeaponReplaceSword',
        'BelialsWeaponReplaceClaws',
        'BelialsWeaponReplaceHammer',
    ]
    OptionSelect.apply(this, arguments);
}
// Унаследовать
BelialsWeaponReplace.prototype = Object.create(OptionSelect.prototype);
// Желательно и constructor сохранить
BelialsWeaponReplace.prototype.constructor = BelialsWeaponReplace;





var BelialsWeaponReplaceSword = function(o) {
	this.optionName = 'BelialsWeaponReplaceSword';
	this.actionText = 'S + B';
	this.autoSelectOption = true;
    OptionChek.apply(this, arguments);

}
// Унаследовать
BelialsWeaponReplaceSword.prototype = Object.create(OptionChek.prototype);
// Желательно и constructor сохранить
BelialsWeaponReplaceSword.prototype.constructor = BelialsWeaponReplaceSword;

BelialsWeaponReplaceSword.prototype.off = function(){
	for (var u in this.unit.models) {
		for (var w = this.unit.models[u].wargear.length-1; w >= 0; w--) {
			console.log(this.unit.models[u].wargear[w].createBy, this)
			if (this.unit.models[u].wargear[w].createBy === this) {
				this.unit.models[u].wargear.splice(w,1);
			}
		}
	}
	this.usedCount = 0;
	this.iUpdated();
}
BelialsWeaponReplaceSword.prototype.on = function(){
	this.superOption.allOff();
	for (var u in this.unit.models) {
        this.unit.models[u].addWargear({name:'StromBolter',   createBy:this})
        this.unit.models[u].addWargear({name:'SwordOfSilence',createBy:this})
	}
	this.usedCount = 1;
	this.iUpdated();
}





var BelialsWeaponReplaceClaws = function(o) {
	this.optionName = 'BelialsWeaponReplaceClaws';
	this.actionText = 'C + C';
    OptionChek.apply(this, arguments);

}
// Унаследовать
BelialsWeaponReplaceClaws.prototype = Object.create(OptionChek.prototype);
// Желательно и constructor сохранить
BelialsWeaponReplaceClaws.prototype.constructor = BelialsWeaponReplaceClaws;

BelialsWeaponReplaceClaws.prototype.off = function(){
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
BelialsWeaponReplaceClaws.prototype.on = function(){
	this.superOption.allOff();
	for (var u in this.unit.models) {
        this.unit.models[u].addWargear({name:'LightningClaws',createBy:this})
        this.unit.models[u].addWargear({name:'LightningClaws',createBy:this})
	}
	this.usedCount = 1;
	this.iUpdated();
}





var BelialsWeaponReplaceHammer = function(o) {
	this.optionName = 'BelialsWeaponReplaceHammer';
	this.actionText = 'H + S';
    OptionChek.apply(this, arguments);

}
// Унаследовать
BelialsWeaponReplaceHammer.prototype = Object.create(OptionChek.prototype);
// Желательно и constructor сохранить
BelialsWeaponReplaceHammer.prototype.constructor = BelialsWeaponReplaceHammer;


BelialsWeaponReplaceHammer.prototype.off = function(){
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
BelialsWeaponReplaceHammer.prototype.on = function(){
	this.superOption.allOff();
	for (var u in this.unit.models) {
        this.unit.models[u].addWargear({name:'ThunderHammer',createBy:this})
        this.unit.models[u].addWargear({name:'StormShield',createBy:this})
	}
	this.usedCount = 1;
	this.iUpdated();
}












var DA_DedicatedTransport = function(o) {
	this.headerText = 'Отряд может выбратьв качестве прикомандированного транспорта одно из следующего';
	this.optionName = 'DA_DedicatedTransport';
    this.defaultSubOptions = [
        'DA_DedicatedTransport_DropPod',
        'DA_DedicatedTransport_Rhino',
		'DA_DedicatedTransport_Razorback',
    ]
    OptionSelect.apply(this, arguments);
}
// Унаследовать
DA_DedicatedTransport.prototype = Object.create(OptionSelect.prototype);
// Желательно и constructor сохранить
DA_DedicatedTransport.prototype.constructor = DA_DedicatedTransport;






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
    this.unit.army.structure.push(new WHGroupe({
        index : this.unit.army.structure.length,
        structure : {
	        'name': 'Dedicated transport',
	        'optional': []
	    },
        army : this.unit.army,
        $link : this.unit.army.$this
    }));

	var sInd = this.unit.army.structure[gInd].slots.length;
	this.unit.army.structure[gInd].slots.push( new WHSlotOptional({
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
	this.actionText = 'Drop Pod за ' + DA_DropPod.prototype.price;
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
