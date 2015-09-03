// Класс созданный для одновременой замены сразу нескольких элементов варгира на другие элементы
// Наседуется от OptionSuper что жначит что при реализации этого класса нужноу указать какие 
var MultiChangeFromWargear_class = function(o) {
    this.needChekEnambleEachTime =  this.needChekEnambleEachTime || false;
    this.isAdd = this.isAdd || false;
    WHOptionSuper.apply(this, arguments);
}

// Унаследовать
MultiChangeFromWargear_class.prototype = Object.create(WHOptionSuper.prototype);
// Желательно и constructor сохранить
MultiChangeFromWargear_class.prototype.constructor = MultiChangeFromWargear_class;




MultiChangeFromWargear_class.prototype.canEnableWeapon = function(option, superOption){
    var result = false;
    var superOption = option !== null ? option.superOption : superOption;
    if (!superOption.canEnable()) {
        return false;
    }
    for (var m in this.unit.models) {
        if (this.isModelCanChange(this.unit.models[m], option)) {
            result = true;
            break;
        }
    }
    return result;
};



MultiChangeFromWargear_class.prototype.enableWeapon = function(option, superOption){
    //option - WHOption - on/off
    //option.superOption - DA_RangedWeapons_Boltgun 
    //option.superOption.superOption - DA_RangedWeapons / MultiChangeFromWargear_class / this 
    var superOption = option !== null ? option.superOption : superOption;
    if (this.canEnableWeapon(option, superOption)) {
        var modelToChange = [];
        for (var m in this.unit.models) {
        	for (var i in this.unit.models[m].wargear) {
        		this.unit.models[m].wargear[i].readyToChange = null;
        	}
            if (this.isModelCanChange(this.unit.models[m], option)) {
                this.unit.models[m].readyToChange = {
                    option: option.superOption,
                    funChange: this.funChangeOn,
                    direction: 'on'
                };
                modelToChange.push(this.unit.models[m]);
            }
            else {
                this.unit.models[m].readyToChange = null;
            }
        }
        this.unit.isShowModels = true;
        this.unit.$lModels.show();
        this.unit.updateModels();
        if (modelToChange.length === 1
            ||
            this.unit.getUnicModelArr(modelToChange).length === 1
        ) {
            modelToChange[0].readyToChange.funChange(modelToChange[0]);
        }
        this.iUpdated();
    }
};



MultiChangeFromWargear_class.prototype.canDisableWeapon = function(option){
    if (this.isBlocked()) {
        return false;
    }
    for (var m in this.unit.models) {
        if (this.unit.models[m].hasAllWargearGetedByOption(option)) {
            return true;
        }
    }
    return false;
};

MultiChangeFromWargear_class.prototype.disableWeapon = function(option){
    // option - WHOption 
    // option.superOption - RewardsOfChaosLesserRewards 
    // option.superOption.superOption - MultiChangeFromWargear_class 
    if (this.canDisableWeapon(option)) {
        var modelToChange = [];
        for (var m in this.unit.models) {


            for (var w in this.unit.models[m].wargear) {
                this.unit.models[m].wargear[w].readyToChange = null;
            }
            if (this.unit.models[m].hasAllWargearGetedByOption(option)) {
                this.unit.models[m].readyToChange = {
                        option: option.superOption,
                        funChange: this.funChangeOff,
                        direction: 'off'
                    };
                 modelToChange.push(this.unit.models[m]);
            }
        }

        this.unit.isShowModels = true;
        this.unit.$lModels.show();
        this.unit.updateModels();
        if (modelToChange.length === 1
            ||
            this.unit.getUnicModelArr(modelToChange).length === 1
        ) {
            modelToChange[0].readyToChange.funChange(modelToChange[0]);
        }
        this.iUpdated();
    }
};


MultiChangeFromWargear_class.prototype.funChangeOn = function(m) {
    //m - model
    //this - readyToChange { option, fun}
    // console.log(this.option)
    var log = {
        option : this.option,
        removeItems: [],
        addItems: [],
        cost : this.option.cost
    };
    for (var i in this.option.removeItems) {
        var name = this.option.removeItems[i];
        if (typeof this.option.removeItems[i] === 'string') {
            var wargear = m.removeWargear({name:name});
            log.removeItems.push({
                name: wargear.wargearName,
                createBy: wargear.createBy,
                cost : this.option.cost
            })
        } 
        else if (typeof this.option.removeItems[i] === 'function') {
            if (name = this.option.removeItems[i](m)) {
                var wargear = m.removeWargear({name:name});
                log.removeItems.push({
                    name: wargear.wargearName,
                    createBy: wargear.createBy
                })
            }
        }
        else {
            debugger;
        }
    }
    for (var i in this.option.addItems) {
        m.addWargear({name:this.option.addItems[i],createBy:this.option})
        log.addItems.push({
            name: this.option.addItems[i],
            createBy: this.option
        })
    }
    m.changedWargear.push(log);
    m.unit.isShowModels = true;
    m.unit.$lModels.show();
    m.readyToChange = null;
    m.unit.updateModels();
    this.option.iUpdated();
}

MultiChangeFromWargear_class.prototype.funChangeOff = function(m) {
    for (var c = m.changedWargear.length - 1; c >= 0; c--) {
        if (m.changedWargear[c].option == this.option) {
            for (var w in m.changedWargear[c].addItems) {
                m.removeWargear(m.changedWargear[c].addItems[w]);
            }
            for (var w in m.changedWargear[c].removeItems) {
                m.addWargear(m.changedWargear[c].removeItems[w]);
            }
            m.changedWargear.splice(c,1);
        }
    }
    m.unit.isShowModels = true;
    m.unit.$lModels.show();
    m.readyToChange = null;
    m.unit.updateModels();
    this.option.iUpdated();
}

    
MultiChangeFromWargear_class.prototype.isModelCanChange =  function(m, option) {
    for (var i in m.wargear) {
        if (m.wargear[i].createBy === option.superOption) {
            return false;
        }
    }
    for (var w in option.superOption.removeItems) {
        var name = option.superOption.removeItems[w];
        if (typeof name == 'function') {
            name = name(m);
        }
        if (name !== false) {
            var hasName = false;
            for (var i in m.wargear) {
                if (m.wargear[i].wargearName === name) {
                    hasName = true;
                }
            }
            if (!hasName) {
                return false;
            }
        }
    }
    return true;
}


MultiChangeFromWargear_class.prototype.getAdditionalCost = function() {
    var totalPaid = 0;
    // console.log('-!- ' + this.optionName)
    // console.log( this.subOptions );
    // for (var so in this.subOptions) {
    //     console.log(this.subOptions[so].cost)
    // }
    // console.log('-/- ' + this.optionName)
    // for (var m in this.unit.models) {
    //     for (var c in this.unit.models[m].changedWargear) {
    //         for (var so in this.subOptions) {
    //             if (this.unit.models[m].changedWargear[c].option == this.subOptions[so]) {
    //                 totalPaid += this.subOptions[so]
    //             }   
    //         }
    //         if (this.unit.options.indexOf(this.unit.models[m].changedWargear[c].option)) {
    //             console.log(this.unit.models[m].changedWargear[c].option)
    //         }
            
    //     }
    //     // for (var w in this.unit.models[m].wargear) {
    //     //     // console.log(this.unit.models[m].wargear[w].createBy)
    //     //     if (
    //     //         this.unit.models[m].wargear[w].createBy.superOption === this
    //     //     ) {
    //     //         totalPaid += this.unit.models[m].wargear[w].createBy.cost;
    //     //     }
    //     // }
    // }
    return totalPaid;
}


