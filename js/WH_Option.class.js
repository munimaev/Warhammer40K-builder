// --------- Класс-Родитель ------------
var WH_Option = function(o) {

    this.$link = o.$link;
    this.unit = o.unit;
    this.optionName = this.optionName || '';
    this.cost = this.cost || 0;
    // this.text =  this.text || null;
    this.usedCount = 0;
    this.usedCountMax = 1;

    this.defaultHide =  this.defaultHide || o.defaultHide || false;
    this.isShow = !this.defaultHide;

    this.autoSelectOption = this.autoSelectOption || false;

    this.actionText = this.actionText || o.actionText || null;
    this.headerText = this.headerText || o.headerText || null;
    this.actionIcon = this.actionIcon || o.actionIcon || 'default';
    this.superOption = o.hasOwnProperty('superOption') ? o.superOption : 'core' ;

    this.blockedDisable = [];
    this.blockedEnable = [];

    if (o.enable) {
        this.enable = o.enable;
    }
    if (o.canEnable) {
        this.canEnable = o.canEnable;
    }
    if (o.isNeedShow) {
        this.isNeedShow = o.isNeedShow;
    }

    this.isUsed = false;
    this.canSetUsed = true;
    var _this = this;

    this.$action = [];


    this.$indicator = $action = $('<div />',{'class':'WH_option_action_indicator'});

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
                'class':'WH_option_action',
                // 'text': this.getVisibleText(),
                'style':"background-image:url('./pics/options/"+this.actionIcon+".png')",
                'click' : function() {
                    var __this = _this;
                    return function() {
                        __this.enable();
                    }
                }()
            });
            this.$action.html(this.getVisibleText());
            this.$body.append(this.$action);
                this.$action.append(this.$indicator);
        }
    }
    else {
        this.$this = $('<div />',{
            'class':'WH_suboption'
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
                'class' : 'WH_option_action',
                // 'text': this.getVisibleText(),
                'style' : "background-image:url('./pics/options/"+this.actionIcon+".png')",
                'click' : function() {
                    var __this = _this;
                    return function() {
                        __this.enable();
                    }
                }()
            });
            
            this.$action.html(this.getVisibleText());
            this.$body.append(this.$action);
                this.$action.append(this.$indicator);
        }
    }

    this.$link.append(this.$this);  
    if (!this.isNeedShow()) {  
        this.$this.hide();
    }
    this.enableIndicatorClass = o.enableIndicatorClass || 'WH_option_action_indicator--plus';
    this.disableIndicatorClass = 'WH_option_action_indicator--exclamation';
    this.blockedIndicatorClass = 'WH_option_action_indicator--exclamation';
    this.update();
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
    if (this.superOption && this.superOption !== 'core') {
        return this.superOption.canEnable();
    }
    return true;
}

WH_Option.prototype.enable  = function() {
}

WH_Option.prototype.canDisable  = function() {
}

WH_Option.prototype.disable  = function() {
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
    if (this.isBlocked()) {
        this.showBlockedIndicator();
    }
    else if (this.canEnable()) {
        this.showEnableIndicator();
    }
    else {
        this.showDisableIndicator();
    }
    for (var o in this.subOptions) {
        this.subOptions[o].update();
    }
}
WH_Option.prototype.show = function() {
    this.$this.show(125);
    this.isShow = true;
}

WH_Option.prototype.hide = function() {
    this.$this.hide(125);
    this.isShow = false;
}

WH_Option.prototype.showEnableIndicator = function() {
    this.$indicator.removeClass(this.blockedIndicatorClass);
    this.$indicator.removeClass(this.disableIndicatorClass);
    this.$indicator.addClass(this.enableIndicatorClass);
}
WH_Option.prototype.showDisableIndicator = function() {
    this.$indicator.removeClass(this.blockedIndicatorClass);
    this.$indicator.removeClass(this.enableIndicatorClass);
    this.$indicator.addClass(this.disableIndicatorClass);
}

WH_Option.prototype.showBlockedIndicator = function() {
    this.$indicator.removeClass(this.enableIndicatorClass);
    this.$indicator.removeClass(this.disableIndicatorClass);
    this.$indicator.addClass(this.blockedIndicatorClass);
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

WH_Option.prototype.autoSelect = function(b) {
    for (var i in this.subOptions) {
        if (this.subOptions[i].autoSelectOption) {
            this.subOptions[i].on();
        }
    }
}

WH_Option.prototype.isBlocked = function() {
    if (this.superOption && this.superOption !== 'core') {
        return this.superOption.isBlocked();
    }
    return false;
}