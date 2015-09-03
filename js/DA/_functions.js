function arrayToList(obj) { 
    var addItems = obj.addItems || [];
    var tag1 = obj.hasOwnProperty('tag') ? '<'+obj.tag+'>' : '';
    var tag2 = obj.hasOwnProperty('tag') ? '</'+obj.tag+'>' : '';
    var addItemList = '';
    for (var w = 0; w <= addItems.length - 1; w++) {
        if (w != 0) {
            if (w === addItems.length - 1) {
                addItemList += ' и ';
            } else {
                addItemList += ', ';
            }
        }
        addItemList += tag1+window[addItems[w]].prototype.visibleName+tag2;
    }
    return addItemList;
}

var fabric_option_unitMayTake = function(a) {

    for (var i in a) {
        window[a[i].optionName] = function() {

            var optionName = a[i].optionName;
            var cost = a[i].cost;

            var addItems = a[i].addItems || [];
            var removeItems = a[i].removeItems || [];

            var actionText = a[i].actionText || null;
            var addItemList = '';
            for (var w = 0; w <= addItems.length - 1; w++) {
                if (w != 0) {
                    if (w === addItems.length - 1) {
                        addItemList += ' и ';
                    } else {
                        addItemList += ', ';
                    }
                }
                addItemList += '<b>'+window[addItems[w]].prototype.visibleName+'</b>';
            }

            if (!actionText) {
                var costText = 'бесплатно';
                if (cost > 0) {
                    costText = 'за&nbsp;' + cost+ '&nbsp;'+costToText(cost);
                }
                actionText = 'Отряд может взять '
                    + addItemList
                    + ' <i>'
                    + costText
                    + '</i>';
            }

            var actionIcon = a[i].actionIcon || 'upgrade';

            return function() {
                this.optionName = optionName;
                this.cost = cost;
                this.addItems = addItems;
                this.removeItems = removeItems;
                this.actionText = actionText;
                this.actionIcon = actionIcon;
                OptionChek.apply(this, arguments);
            }
        }()
        window[a[i].optionName].prototype = Object.create(OptionChek.prototype);
        window[a[i].optionName].prototype.constructor =  window[a[i].optionName];

        window[a[i].optionName].prototype.on  = function() {
            for (var i in this.removeItems) {
                for (var r = this.unit.speccialRules.general.length - 1 ;r>=0;r--) {
                    if (this.unit.speccialRules.general[r].specialRuleName == this.removeItems[i]
                        &&
                        this.unit.speccialRules.general[r].createBy == this.unit
                    ) {
                       this.unit.speccialRules.general.splice(r,1); 
                    }
                }
            }
            for (var i in this.addItems) {
                this.unit.speccialRules.general.push(new window[this.addItems[i]]({unit:this.unit,createBy:this}));
            }
            this.usedCount++;
            this.iUpdated();
        }
        window[a[i].optionName].prototype.off  = function() {
            // for (var i in this.addItems) {
            //     var ind = this.unit.defaultSpecialRules.indexOf(this.addItems[i]);
            //     if(~ind) {
            //         this.unit.defaultSpecialRules.splice(ind,1);    
            //     }
            // }

            for (var i in this.addItems) {
                for (var r = this.unit.speccialRules.general.length - 1 ;r>=0;r--) {
                    if (this.unit.speccialRules.general[r].specialRuleName == this.addItems[i]
                        &&
                        this.unit.speccialRules.general[r].createBy == this
                    ) {
                       this.unit.speccialRules.general.splice(r,1); 
                    }
                }
            }
            for (var i in this.removeItems) {
                this.unit.speccialRules.general.push(new window[this.removeItems[i]]({unit:this.unit,createBy:this.unit}));
            }

            this.usedCount--;
            this.iUpdated();
        }
        window[a[i].optionName].prototype.isBlocked  = function() {
            if (this.removeItems.length) {
                var hasAllItemToRemove = true;
                for (var i in this.removeItems) {
                    var hasItem = false;
                    for (var k in this.unit.speccialRules.general) {
                        if (this.unit.speccialRules.general[k].specialRuleName === this.removeItems[i]) {
                            hasItem = true;
                        }
                    }
                    if (!hasItem) {
                        hasAllItemToRemove = false;
                    }
                }
                var hasAllItemToAdd = true;
                for (var i in this.addItems) {
                    var hasItem = false;
                    for (var k in this.unit.speccialRules.general) {
                        if (this.unit.speccialRules.general[k].specialRuleName === this.addItems[i]) {
                            hasItem = true;
                        }
                    }
                    if (!hasItem) {
                        hasAllItemToAdd = false;
                    }
                }
                if (!hasAllItemToRemove && !hasAllItemToAdd) {
                    return true;
                }
            }
            return OptionChek.prototype.isBlocked();
        }
    }
}

fabric_option_unitMayTake([
{
    optionName : 'DA_PrediusRelicOfTheUnforgiven',
    cost : 15,
    addItems : ['PrediusRelicOfTheUnforgiven'],
}
]);




var fabric_option_upgradeModel = function(a) {

    for (var i in a) {
        window[a[i].optionName] = function() {

            var optionName  = a[i].optionName;
            var cost        = a[i].cost;
            var upgaredForm = a[i].upgaredForm
            var upgaredTo   = a[i].upgaredTo
            var actionText  = a[i].actionText || null;
            var actionIcon  = a[i].actionIcon || 'upgrade';


            var addWargear  = a[i].addWargear || [];
            var removeWargear  = a[i].removeWargear || [];

            if (!actionText) {
                var costText = 'бесплатно';
                if (cost > 0) {
                    costText = 'за&nbsp;' + cost+ '&nbsp;'+costToText(cost);
                }
                actionText = 'Одну модель ' + window[a[i].upgaredForm].prototype.visibleModelName;
                if (typeof a[i].isBlocked === 'object' && ~a[i].isBlocked.indexOf('oneModelInArmy')) {
                    actionText +=' в армии'
                } 
                actionText += ' можно усовершенствовать до  <b>'
                    + window[a[i].upgaredTo].prototype.visibleModelName
                    + '</b>';
                if (addWargear.length && removeWargear.length) {
                    actionText += ' c заменой '
                        + arrayToList({addItems:removeWargear})
                        + ' на '
                        + arrayToList({addItems:addWargear});
                } else if (addWargear.length) {
                    actionText += ' c получением '
                        + arrayToList({addItems:addWargear});
                }
                actionText += '  <i>'
                    + costText
                    + '</i>';
            }


            return function() {
                this.optionName = optionName;
                this.cost = cost;
                this.actionText = actionText;
                this.actionIcon = actionIcon;
                this.upgaredForm = upgaredForm;
                this.upgaredTo = upgaredTo;
                this.addWargear = addWargear;
                this.removeWargear = removeWargear;
                OptionChek.apply(this, arguments);
            }
        }()
        window[a[i].optionName].prototype = Object.create(OptionChek.prototype);
        window[a[i].optionName].prototype.constructor =  window[a[i].optionName];
        window[a[i].optionName].prototype.canEnable =  function() {
            if (this.isBlocked()) {
                return false;
            }
            return OptionChek.prototype.canEnable(this, arguments)
        }

        window[a[i].optionName].prototype.on  = function() {
            for (var i in this.unit.models) {
                if (this.unit.models[i].createBy !== 'structure' 
                    || this.unit.models[i].modelName !== this.upgaredForm
                    || this.unit.models[i].touchedByOptions.length !== 0) {
                    continue;
                }
                this.unit.models.splice(i,1);
                this.unit.models.splice(0, 0, new window[this.upgaredTo]({
                    unit: this.unit,
                    createBy: this
                }));
                for (var w in this.removeWargear) {
                    this.unit.models[0].removeWargear({name:this.removeWargear[w]});
                }
                for (var w in this.addWargear) {
                    this.unit.models[0].addWargear({name:this.addWargear[w],createBy:this});
                }
                this.usedCount++;
                break;
            }
            this.iUpdated();
        }
        window[a[i].optionName].prototype.off  = function() {
            for (var i in this.unit.models) {
                if (this.unit.models[i].createBy !== this) {
                    continue;
                }
                this.unit.models.splice(i,1);
                this.unit.models.splice(0, 0, new window[this.upgaredForm]({
                    unit: this.unit,
                    createBy: 'structure'
                }));
                this.usedCount--;
                break;
            }
            this.iUpdated();
        }

        if (a[i].isBlocked) {
            if (typeof a[i].isBlocked === 'function') {
                window[a[i].optionName].prototype.isBlocked  = a[i].isBlocked
            }
            else if (typeof a[i].isBlocked === 'string') {
                var subFunc = [];
                for (var o in a[i].isBlocked) {
                    if (a[i].isBlocked[o] === 'oneModelInArmy') {
                        subFunc.push(
                            function () {
                                // var subobj = a[i].isBlocked[o];
                                return function() {     
                                    for (var a in this.unit.army.roster.armies) {
                                        for (var g in this.unit.army.roster.armies[a].structure) {
                                            for (var s in this.unit.army.roster.armies[a].structure[g].slots) {
                                                if (this.unit.army.roster.armies[a].structure[g].slots[s].unit !== null
                                                    && this.unit.army.roster.armies[a].structure[g].slots[s].unit != this.unit) {
                                                    for (var m in this.unit.army.roster.armies[a].structure[g].slots[s].unit.models) {                        
                                                        if (this.unit.army.roster.armies[a].structure[g].slots[s].unit.models[m].modelName === this.upgaredTo) {
                                                            return true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }()
                        )
                    }
                }
                window[a[i].optionName].prototype.isBlocked = function(){
                    var funcs = subFunc;
                    return function(){
                        for (var f in funcs) {
                            if (funcs[f].apply(this)) {
                                return true;
                            }
                        }
                        return MultiChangeFromWargear_class.prototype.isBlocked.apply()
                    }
                }()    
            }
        }
    }
}

fabric_option_upgradeModel([
{
    optionName  : 'DA_upgradeRavenwingSergeantToVeteran',
    cost        : 10,
    upgaredForm : 'DA_Ravenwing_Sergeant',
    upgaredTo   : 'DA_Ravenwing_Veteran_Sergeant'
},
{
    optionName  : 'DA_upgradeSpaceMarineSergeantToVeteran',
    cost        : 10,
    upgaredForm : 'DA_SpaceMarine_Sergant',
    upgaredTo   : 'DA_Veteran_Sergant'
}
]);







//==============================================


// --------- Класс-потомок WHOption -----------
var DA_RangedWeapons_Class = function(o) {
    this.funCanEnable = function() {
        if (this.superOption.onePerArmie) {
            for (var a in this.unit.army.roster.armies) {
                for (var g in this.unit.army.roster.armies[a].structure) {
                    for (var s in this.unit.army.roster.armies[a].structure[g].slots) {
                        if (this.unit.army.roster.armies[a].structure[g].slots[s].unit !== null) {
                            for (var m in this.unit.army.roster.armies[a].structure[g].slots[s].unit.models) {
                                for (var w in this.unit.army.roster.armies[a].structure[g].slots[s].unit.models[m].wargear) {
                                    if (this.unit.army.roster.armies[a].structure[g].slots[s].unit.models[m].wargear[w].wargearName == this.superOption.changeTo) {  
                                            return false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return this.superOption.superOption.canEnableWeapon(this);
    }

    this.funEnable = function() {
        return this.superOption.superOption.enableWeapon(this);
    }


    this.funCanDisable = function() {
        return this.superOption.superOption.canDisableWeapon(this);
    }

    this.funDisable = function() {
        return this.superOption.superOption.disableWeapon(this);   
    }

    this.funIsNeedShow = this.funCanDisable;

    OptionCounter.apply(this, arguments);

}

// Унаследовать
DA_RangedWeapons_Class.prototype = Object.create(OptionCounter.prototype);

// Желательно и constructor сохранить
DA_RangedWeapons_Class.prototype.constructor = DA_RangedWeapons_Class;




var DA_RangedWeaponsFabric = function(a) {
    for (var i in a) {

        if (window[a[i].optionName]) {
            console.log('Опция с таким именем уже существует');
            console.log(a[i].optionName);
            continue;
        }

        window[a[i].optionName] = function() {
            var optionName =  a[i].optionName;
            var cost = a[i].cost;
            var changeTo = a[i].changeTo;
            var actionTextUp = a[i].actionTextUp || null;
            var actionIconUp = a[i].actionIconUp || null;
            var actionTextDown = a[i].actionTextDown || null;
            var actionIconDown = a[i].actionIconDown || a[i].actionIconUp || null;
            var onePerArmie = a[i].onePerArmie || false;
            var addItems = a[i].addItems || [];
            if (addItems.length === 0 
                && a[i].changeTo 
            ){
                addItems.push(a[i].changeTo);
            }

            var addItemList = arrayToList({addItems:addItems,tag:'b'});

            if (!actionTextUp) {
                var costText = 'бесплатно';
                if (cost > 0) {
                    costText = 'за&nbsp;' + cost+ '&nbsp;'+costToText(cost);
                }
                actionTextUp = ''
                    + addItemList
                    + ' <i>'
                    + costText
                    + '</i>';
            }
            if (!actionTextDown) {
                var costText = 'бесплатно';
                if (cost > 0) {
                    costText = 'за&nbsp;' + cost+ '&nbsp;'+costToText(cost);
                }
                actionTextDown = 'Удалить '
                    + addItemList;
            }
            var removeItems = a[i].removeItems || [];
            return function() {

                this.optionName = optionName;
                this.cost = cost;
                this.changeTo = changeTo;
                this.addItems = addItems;
                this.removeItems = removeItems;
                this.actionTextUp = actionTextUp;
                this.actionIconUp = actionIconUp;
                this.actionTextDown = actionTextDown;
                this.actionIconDown = actionIconDown;
                this.onePerArmie = onePerArmie;

                DA_RangedWeapons_Class.apply(this, arguments);
            }
        }()
        window[a[i].optionName].prototype = Object.create(DA_RangedWeapons_Class.prototype);
        window[a[i].optionName].prototype.constructor =  window[a[i].optionName];
        if (a[i].isModelCanChange) {
            window[a[i].optionName].prototype.isModelCanChange = a[i].isModelCanChange;
        }
    }
}




var fabric_option_multiChange = function(a) {
    for (var i in a) {
        window[a[i].optionName] = function() {

            var optionName = a[i].optionName;
            var cost = a[i].cost;
            var headerText = a[i].headerText;


            var defaultSubOptions = [];
            for (var so in a[i].defaultSubOptions) {
                if ( typeof a[i].defaultSubOptions[so] === 'string') {
                    defaultSubOptions.push(a[i].defaultSubOptions[so]);
                }
                else if (typeof a[i].defaultSubOptions[so] === 'object') {
                    defaultSubOptions.push(a[i].defaultSubOptions[so].optionName);
                    DA_RangedWeaponsFabric([a[i].defaultSubOptions[so]]);
                }
                else {
                    console.log('Error');
                }

            }

            return function() {
                this.optionName = optionName;
                this.cost = cost;
                this.defaultSubOptions = defaultSubOptions;
                this.headerText = headerText;

                MultiChangeFromWargear_class.apply(this, arguments);
            }
        }()
        window[a[i].optionName].prototype = Object.create(MultiChangeFromWargear_class.prototype);
        window[a[i].optionName].prototype.constructor =  window[a[i].optionName];

        if (a[i].canEnable) {
            if (typeof a[i].canEnable === 'function') {
                window[a[i].optionName].prototype.canEnable = a[i].canEnable;            
            }
            else if (typeof a[i].canEnable === 'object') {
                var subFunc = [];
                for (var o in a[i].canEnable) {
                    var obj = a[i].canEnable[o];
                    if (typeof obj === 'function') {
                        subFunc.push(obj)
                    }
                    else if (obj.type === 'foreach' || obj.type === 'upTo' || obj.type === 'hasWargearOfAnoterOption') {
                        
                        subFunc.push(
                            function () {
                                var subobj = obj;
                                return function() {     
                                    var count = 0;
                                    var optionName = subobj.type === 'hasWargearOfAnoterOption' ? subobj.optionName : [this.optionName];
                                    for (var m in this.unit.models) {
                                        for (var w in this.unit.models[m].wargear) { 

                                            if (this.unit.models[m].wargear[w].createBy.hasOwnProperty('superOption')
                                                &&
                                                this.unit.models[m].wargear[w].createBy.superOption.hasOwnProperty('optionName')
                                                &&
                                                ~optionName.indexOf(this.unit.models[m].wargear[w].createBy.superOption.optionName)
                                            ) {  
                                                count++;     
                                                if (subobj.type === 'foreach' 
                                                    && 
                                                    this.unit.models.length - count * subobj.foreachCount < subobj.foreachCount
                                                ) {
                                                    return true;
                                                }    
                                                if (subobj.type === 'upTo' 
                                                    && 
                                                    count >= subobj.upTo 
                                                ) {
                                                    return true;
                                                }   
                                                if (subobj.type === 'hasWargearOfAnoterOption' 
                                                    // && 
                                                    // count >= subobj.upTo 
                                                ) {
                                                    return true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }()
                        )
                    }
                    else if (obj.type === 'onNameInArmuMayTakeOneFrom') {
                        subFunc.push(
                            function () {
                                return function() {     
                                    for (var a in this.unit.army.roster.armies) {
                                        for (var g in this.unit.army.roster.armies[a].structure) {
                                            for (var s in this.unit.army.roster.armies[a].structure[g].slots) {
                                                if (this.unit.army.roster.armies[a].structure[g].slots[s].unit !== null) {
                                                    for (var m in this.unit.army.roster.armies[a].structure[g].slots[s].unit.models) {
                                                        for (var w in this.unit.army.roster.armies[a].structure[g].slots[s].unit.models[m].wargear)   
                                                        if (this.unit.army.roster.armies[a].structure[g].slots[s].unit.models[m].wargear[w].createBy.hasOwnProperty('superOption')
                                                            &&
                                                            this.unit.army.roster.armies[a].structure[g].slots[s].unit.models[m].wargear[w].createBy.superOption.hasOwnProperty('optionName')
                                                            &&
                                                            this.unit.army.roster.armies[a].structure[g].slots[s].unit.models[m].wargear[w].createBy.superOption.optionName == this.optionName
                                                        ) {  
                                                                return true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }()
                        )
                    }
                }
                window[a[i].optionName].prototype.canEnable = function(){
                    var funcs = subFunc;
                    return function(){
                        for (var f in funcs) {
                            if (funcs[f].apply(this)) {
                                return false;
                            }
                        }
                        return MultiChangeFromWargear_class.prototype.canEnable.apply()
                    }
                }()    
            }
            else {
                console.log('Error');
            }
        }


        if (a[i].isModelCanChange) {
            if (typeof a[i].isModelCanChange === 'function') {
                window[a[i].optionName].prototype.isModelCanChange = a[i].isModelCanChange;            
            }
            else if (typeof a[i].isModelCanChange === 'object') {
                var subFunc = [];
                for (var o in a[i].isModelCanChange) {
                    var obj = a[i].isModelCanChange[o];
                    if (typeof obj === 'function') {
                        subFunc.push(obj)
                    }
                    else if (obj.type === 'oneOfModelName') {
                        for (var n in obj.names) {
                            subFunc.push(
                                function () {
                                    var name = obj.names;
                                    return function(m, superOption) {
                                        if (m.modelName != name) {
                                            return true;
                                        }
                                    }
                                }()
                            )
                        }
                    }
                    else if (obj.type === 'modelCanTakeOnlyOneSubotion') {
                        subFunc.push(
                            function(m, superOption) {
                                for (var w in m.wargear) { 
                                    if (m.wargear[w].createBy.hasOwnProperty('superOption')
                                        &&
                                        m.wargear[w].createBy.superOption.hasOwnProperty('optionName')
                                        &&
                                        m.wargear[w].createBy.superOption.optionName == this.optionName
                                    ) {  
                                       return true;
                                    }
                                }
                            }
                        )
                    }
                    else if (obj.type === 'ifThereIsNoItem') {
                        for (var n in obj.items) {
                            subFunc.push(
                                function () {
                                    var item = obj.items[n];
                                    return function(m, superOption) {
                                        for (var i in m.wargear) {
                                            if (m.wargear[i].wargearName === item) {
                                                return true;
                                            }
                                        }
                                    }
                                }()
                            )
                        } 
                    }
                    else if (obj.type === 'ifThereIsHasItem') {
                        for (var n in obj.items) {
                            subFunc.push(
                                function () {
                                    var item = obj.items[n];
                                    return function(m, superOption) {
                                        for (var i in m.wargear) {
                                            if (m.wargear[i].wargearName === item) {
                                                return false;
                                            }
                                        }
                                        return true;
                                    }
                                }()
                            )
                        } 
                    }
                }
                window[a[i].optionName].prototype.isModelCanChange = function(){
                    var funcs = subFunc;
                    return function(m, superOption){
                        for (var f in funcs) {
                            if (funcs[f].call(this,m,superOption)) {
                                return false;
                            }
                        }
                        return MultiChangeFromWargear_class.prototype.isModelCanChange.apply(this,arguments)
                    }
                }()    
            }
            else {
                console.log('Error');
            }
        }


        if (a[i].isBlocked) {
            if (typeof a[i].isBlocked === 'function') {
                window[a[i].optionName].prototype.isBlocked  = a[i].isBlocked
            }
            else if (typeof a[i].isBlocked === 'object') {
                var subFunc = [];
                for (var o in a[i].isBlocked) {
                    if (a[i].isBlocked[o].type === 'hasWargearOfAnoterOption') {
                        subFunc.push(
                            function () {
                                var subobj = a[i].isBlocked[o];
                                return function() {   
                                    var count = 0;
                                    var optionName = subobj.type === 'hasWargearOfAnoterOption' ? subobj.optionName : [this.optionName];

                                    for (var m in this.unit.models) {
                                        for (var w in this.unit.models[m].wargear) { 

                                            if (this.unit.models[m].wargear[w].createBy.hasOwnProperty('superOption')
                                                &&
                                                this.unit.models[m].wargear[w].createBy.superOption.hasOwnProperty('optionName')
                                                &&
                                                ~optionName.indexOf(this.unit.models[m].wargear[w].createBy.superOption.optionName)
                                            ) {  
                                                count++;     
                                                if (subobj.type === 'foreach' 
                                                    && 
                                                    this.unit.models.length - count * subobj.foreachCount < subobj.foreachCount
                                                ) {
                                                    return true;
                                                }    
                                                if (subobj.type === 'upTo' 
                                                    && 
                                                    count >= subobj.upTo 
                                                ) {
                                                    return true;
                                                }   
                                                if (subobj.type === 'hasWargearOfAnoterOption' 
                                                    // && 
                                                    // count >= subobj.upTo 
                                                ) {
                                                    return true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }()
                        )
                    }
                }
                window[a[i].optionName].prototype.isBlocked = function(){
                    var funcs = subFunc;
                    return function(){
                        for (var f in funcs) {
                            if (funcs[f].apply(this)) {
                                return true;
                            }
                        }
                        return MultiChangeFromWargear_class.prototype.isBlocked.apply()
                    }
                }()    
            }
        }
    }
}

var template = {
    optionName: '',
    cost: 0,
    headerText : '',
    defaultSubOptions: [{
        optionName: '',
        cost: 0,
        removeItems: [],
        actionTextUp: '',
        addItems: [],
    }, ],
    canEnable: [{
        type: 'foreach',
        foreachCount: 5
    },{
        type: 'upTo',
        upTo: 5
    },{
        type: 'onNameInArmuMayTakeOneFrom',
    },{
        type: 'ifThereIsNoItem',
        items: ['']
    }],
    isModelCanChange: [{
        type: 'oneOfModelName',
        names: ['']
    },{
        type: 'ifThereIsNoItem',
        items: ['']
    },{
        type: 'ifThereIsHasItem',
        items: ['']
    },{
        type: 'modelCanTakeOnlyOneSubotion',
    }],
    isBlocked : [{
        type : 'hasWargearOfAnoterOption',
        optionName : ['']
    }]
}







fabric_option_multiChange([{
    optionName: 'DA_SpecilaIssueWargear',
    cost: 0,
    headerText: 'Модель может взять одно из списка Special Issue Wargear',
    defaultSubOptions: [{
        optionName: 'DA_SpecilaIssueWargear_Auspex',
        cost: 5,
        addItems: ['Auspex'],
    },{
        optionName: 'DA_SpecilaIssueWargear_CombatShield',
        cost: 5,
        addItems: ['CombatShield'],
    },{
        optionName: 'DA_SpecilaIssueWargear_MeltaBomb',
        cost: 5,
        addItems: ['MeltaBomb'],
    },{
        optionName: 'DA_SpecilaIssueWargear_DigitalWeapon',
        cost: 10,
        addItems: ['DigitalWeapon'],
    },
    'DA_SpecilaIssueWargear_JumpPack',
    {
        optionName: 'DA_SpecilaIssueWargear_ConversionField',
        cost: 20,
        addItems: ['ConversionField'],
    }],
    isModelCanChange : [
    function(m, superOption){
        if (superOption.superOption.optionName == 'DA_SpecilaIssueWargear_JumpPack'
            && (m.modelName === 'Techmarine'
                ||
                ~m.hasWargear({name:'TerminatorArmour'})
                ||
                ~m.hasWargear({name:'SpaceMarineBike'})
               )
        ) {
            return true;
        }
    },{
        type: 'modelCanTakeOnlyOneSubotion',
    }]
}
]);
