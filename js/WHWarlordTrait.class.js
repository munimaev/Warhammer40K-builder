// --------- Класс-Родитель ------------
var WHWarlordTrait = function(o) {
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

WHWarlordTrait.prototype.getSpan = function() {
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

var WHWarlordTraitFabric = function(a) {
    for (var i in a) {
        window[a[i].warlordTraitName] = function() {
            var warlordTraitName = a[i].warlordTraitName;
            var wargearType = a[i].hasOwnProperty('wargearType') ? a[i].wargearType : 'unknown';
            var icon = a[i].hasOwnProperty('icon') ? a[i].icon : null;
            return function() {
                this.warlordTraitName = warlordTraitName;
                // this.visibleName = visibleName;
                this.wargearType = wargearType;
                this.icon = icon;
                WHWarlordTrait.apply(this, arguments);
            }
        }()
        window[a[i].warlordTraitName].prototype = Object.create(WHWarlordTrait.prototype);
        window[a[i].warlordTraitName].prototype.constructor =  window[a[i].warlordTraitName];
        window[a[i].warlordTraitName].prototype.visibleName =  a[i].visibleName;
    }
}

WHWarlordTraitFabric([

{
    warlordTraitName: 'TheHunt',
    visibleName: 'The Hunt',
},
{
    warlordTraitName: 'CourageOfTheFirstLegion',
    visibleName: 'Courage of the First Legion',
},
{
    warlordTraitName: 'RapidManoevre',
    visibleName: 'Rapid Manoevre',
},

]);
