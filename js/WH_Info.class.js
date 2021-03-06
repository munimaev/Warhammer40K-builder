// --------- Класс-Родитель ------------
var WH_Info = function(o) {

    this.$popup = $('#popup');
    this.$popupBG = $('#popup__overlay');

    this.$thisInfo = $('#info');

    this.$header =  $('#infoHeader');
    this.$this =  $('#infoBlock');

    this.$thisBG = $('#info__overlay');

    var self = this;
    this.$hide = $('<div />',{
        'class':'WH_army_unit_header_delete',
        click : function() {
            var _this = self;
            return function() {
                _this.hide();
            }
        }()
    });
}
WH_Info.prototype.history = [];
WH_Info.prototype.show = function(){
    this.$thisBG.show(0);
}
WH_Info.prototype.hide = function(){
    this.$thisBG.hide(0);
}
WH_Info.prototype.empty = function(){
    this.$hide.detach();
    this.$header.empty();
    this.$this.empty();
}
WH_Info.prototype.showRule = function(rule){
    this.empty();

    this.$header.append(this.$hide);

    $header = $('<h2 />', {
        'text':rule.visibleName
    });
    this.$header.append($header);

    
    $div = $('<div />');

    $div.append(rule.getTextBlock());

    this.$this.append($div);



    this.show();
}

WH_Info.prototype.showWargear = function(wargear){
    this.empty();
    var self = this;


    this.$header.append(this.$hide);

    $header = $('<h2 />', {
        'text':wargear.visibleName
    });
    this.$header.append($header);
    
    if (wargear.shortTextEng) {
        $div = $('<div />');
        $div.html(wargear.shortTextEng);
        this.$this.append($div);
    }
    var $infoTable = $('<div />',{
        'class' : 'info_table'
    });


    if (wargear.wargearType == 'MeleeWeapon' || wargear.wargearType == 'RangedWeapon' ) {
        $table = wargear.getAbilitiesTable();
        $infoTable.append($table);

        $specialRules = wargear.getAbilitiesText();
        $infoTable.append($specialRules);
    }
    this.$this.append($infoTable);

    this.show();
};

var WH_info = new WH_Info();
