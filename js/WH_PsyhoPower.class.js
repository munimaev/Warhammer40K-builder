// --------- Класс-Родитель ------------
var WH_PsyhoPower = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.unit) {
        throw {'text':'Not set unit'};
    }
    if (!o.createBy) {
        throw {'text':'Not set createBy'};
    }
    this.unit = o.unit;
    this.createBy = o.createBy;
    // this.readyToChange = null;
    // this.icon = o.icon || null;
    // this.changedFrom = o.changedFrom || null;
}

WH_PsyhoPower.prototype.getSpan = function() {
    var _this = this;
    var htmlClass = 'WH_army_unit_warlordTrait_span';
    var text = _this.visibleName + ', ';
    var $span = $('<span />',{
        'class': htmlClass,
    })
    if (this.icon) {
        text = ' <img src="pics/'+this.icon+'.png"> '+text;
    }
    $span.html(text);
    return $span;
}




//====================================
//        Dark Angels
//====================================

var WH_PsyhoPowerFabric = function(a) {
    for (var i in a) {
        window[a[i].disciplineName] = function() {
            var disciplineName = a[i].disciplineName;
            var wargearType = a[i].hasOwnProperty('wargearType') ? a[i].wargearType : 'unknown';
            var icon = a[i].hasOwnProperty('icon') ? a[i].icon : null;
            return function() {
                this.disciplineName = disciplineName;
                // this.visibleName = visibleName;
                this.wargearType = wargearType;
                this.icon = icon;
                WH_PsyhoPower.apply(this, arguments);
            }
        }()
        window[a[i].disciplineName].prototype = Object.create(WH_PsyhoPower.prototype);
        window[a[i].disciplineName].prototype.constructor =  window[a[i].disciplineName];
        window[a[i].disciplineName].prototype.visibleName =  a[i].visibleName;
    }
}

WH_PsyhoPowerFabric([

{disciplineName: 'Daemonology',visibleName: 'Daemonology',},
{disciplineName: 'Divination',visibleName: 'Divination',},
{disciplineName: 'Interromancy',visibleName: 'Interromancy',},
{disciplineName: 'Pyromancy',visibleName: 'Pyromancy',},
{disciplineName: 'Telekinesis',visibleName: 'Telekinesis',},
{disciplineName: 'Telepathy',visibleName: 'Telepathy',},

]);
