// --------- Класс-Родитель ------------
var WH_Option = function(o) {

    this.$link = o.$link;
    this.unit = o.unit;
    this.optionName = this.optionName || '';
    this.cost = this.cost || 0;
    this.text =  this.text || null;
    this.usedCount = 0;
    this.usedCountMax = 1;

    this.defaultHide =  this.defaultHide || false;
    this.isShow = !this.defaultHide;

    this.actionText  = this.actionText || null;
    this.headerText  = this.headerText || null;
    this.actionIcon = this.actionIcon || 'default';
    this.superOption = o.hasOwnProperty('superOption') ? o.superOption : 'core' ;

    this.isUsed = false;
    this.canSetUsed = true;

    if (this.superOption === 'core') {
        this.$this = $('<div />',{
            'class':'WH_option'
        });

        if (this.headerText !== null) {
            this.$header = $('<div />',{
                'class':'WH_option_header','text': this.getVisibleHeader()
            });
            this.$this.append(this.$header);
        }

        this.$body = $('<div />',{
            'class':'WH_option_body'
        });
        this.$this.append(this.$body);

        if (this.actionText !== null) {
            this.$action = $('<div />',{
                'class':'WH_option_action','text': this.getVisibleText(),
                'style':"background-image:url('./pics/options/"+this.actionIcon+".png')"
            });
            this.$body.append(this.$action);
        }
    }
    else {
        this.$this = $('<div />',{
            'class':'WH_suboption'
        });

        this.$body = $('<div />',{
            'class':'WH_option_body'
        });
        this.$this.append(this.$body);

        if (this.actionText !== null) {
            this.$action = $('<div />',{
                'class':'WH_option_action','text': this.getVisibleText(),
                'style':"background-image:url('./pics/options/"+this.actionIcon+".png')"
            });
            this.$body.append(this.$action);
        }
    }

    this.$link.append(this.$this);  
    if (!this.isNeedShow()) {  
        this.$this.hide();
    }
}

// Методы хранятся в прототипе
WH_Option.prototype.printOption  = function() {
    var tabText = this.getTabText();
    var canUse = '[';
    canUse += this.canEnable() ? ' ' : 'X';
    canUse += ']';
    var countUsed = '['+ this.usedCount+']';
    console.log(tabText + this.optionName + "\t"+ this.cost + "\t"+canUse+countUsed+"\n"+tabText+this.text);
    for (var i in this.subOptions) {
        this.subOptions[i].printOption();
    }
}

WH_Option.prototype.canEnable  = function() {
    if (this.usedCount >= this.usedCountMax) {
        return false;
    }
    if (this.superOption !== 'core') {
        return this.superOption.canEnable();
    }
    return true;
}

WH_Option.prototype.enable  = function() {
    if (this.canEnable()) {
        this.usedCount++;
        if (this.superOption !== 'core') {
            this.superOption.usedCount++;
        }
        // this.setIsUsed(true);
        this.iUpdated();
    }
}

WH_Option.prototype.canDisable  = function() {
    if (this.usedCount < 1) {
        return false;
    }
    if (this.superOption !== 'core') {
        return this.superOption.canDisable();
    }
    return true;
}

WH_Option.prototype.disable  = function() {
    if (this.canDisable()) {
        this.usedCount--;
        if (this.superOption !== 'core') {
            this.superOption.usedCount--;
        }
        // this.setIsUsed(false);
        this.iUpdated();
    }
    //this.unit.printUnit();
}

WH_Option.prototype.getTabText  = function() {
    var parent = this;
    var parentCount=0;
    WH_ile (parent.superOption !== 'core') {
        parentCount++;
        parent = this.superOption;
    }
    var tabText = '';
    for (var i = 1; i<= parentCount; i++) {
        tabText += '    '; 
    }
    return tabText;
}


WH_Option.prototype.getVisibleText = function() {
    return this.actionText;
}
WH_Option.prototype.getVisibleHeader = function() {
    return this.headerText;
}

WH_Option.prototype.isNeedShow = function() {
    return !this.defaultHide;
}

WH_Option.prototype.iUpdated = function() {
    this.unit.updateAllOptions();
    this.unit.updateModels();
}
WH_Option.prototype.update = function() {

    if (!this.isShow && this.isNeedShow()) {
        this.show();
    } 
    else if (this.isShow && !this.isNeedShow()) {
        this.hide();
    }
    for (var o in this.subOptions) {
        this.subOptions[o].update();
    }
}
WH_Option.prototype.show = function() {
    this.$this.show();
    this.isShow = true;
}

WH_Option.prototype.hide = function() {
    this.$this.hide();
    this.isShow = false;
}

WH_Option.prototype.getAdditionalCost = function() {
    var result = this.cost * this.usedCount;
    if (this.superOption !== 'structure') {
        for (var o in this.subOptions) {
            result += this.subOptions[o].getAdditionalCost();
        }
    }
    return result;
}

WH_Option.prototype.setIsUsed = function(b) {
    if (this.canSetUsed && this.isUsed!==b) {
        this.isUsed = b;
        if (this.isUsed) {
            this.$action.addClass('WH_option_action--used');
        } else {
            this.$action.removeClass('WH_option_action--used');
        }
    }
}


