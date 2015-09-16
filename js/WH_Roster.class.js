// --------- Класс-Родитель ------------
var WH_Roster = function(o) {

    this.totalPrice = 0;
    this.$rosters = $('#rosters');
    this.armies = [];
    this.armyList = [{
        name: 'DarkAngels',
        armies: [
            'DarkAngels',
            'DarkAngels_BattleDemiCompany',
            'DarkAngels_DeathwingRedemptionForce',
            'DarkAngels_RavenwingAttackSquadron',
            'DarkAngels_RavenwingSupportSquadron',
            'DarkAngels_RavenwingSilenceSquadron',
            'DarkAngels_HammerOfCaliban',
        ]
    }, {
        name: 'DeamonsOfChaos',
        armies: [
            'DeamonsOfChaos',
        ]
    }];

    this.$popup = $('#popup');
    this.$popupBG = $('#popup__overlay');

    var _this = this;
    this.rosterOpenClosedClass = 'WH_roster_open_closed';
    this.$this = $('<div />',{
        'class': 'WH_roster'
    });
    this.bodyIsShowen = false;
    this.$body = $('<div />',{
        'class': 'WH_roster_body'
    });
    this.$armies = $('<div />',{
    });
    this.$addArmy = $('<div />',{
        'class': 'WH_roster_add',
        'text' : 'Add',
        'click': function() {
            var WH_r = _this;
            return function() {
                WH_r.selectFaction();
            }
        }()
    });
    this.$print = $('<div />',{
        'class': 'WH_roster_print',
        'text' : 'Print roster',
        'click': function() {
            var WH_r = _this;
            return function() {
                WH_r.print(true);
            }
        }()
    });
    this.$header = $('<div />',{
        'class': 'WH_roster_header',
        'text' : 'roster',
        'click': function(){
            var WH_r = _this;
            return function(e) {
                if (e.target.className.indexOf(WH_r.rosterOpenClosedClass)) {
                    // alert('H');
                }
            }
        }()
    });

    this.$list = $('<div />',{
        'class': this.rosterOpenClosedClass,
        'click': function() {
            var WH_r = _this;
            return function(e) {
                // alert('L');
                WH_r.showBody();
            }
        }()
    });


    this.$close = $('<div />', {
        'class' : 'popup_close',
        'click':function() {
            var __this = _this
            return function() {
                __this.closePopup();
            }
        }()
    });


    this.$rosters.append(this.$this);
        this.$this.append(this.$header);
            this.$header.append(this.$list);
        this.$this.append(this.$body);
            this.$body.append(this.$armies);
            this.$body.append(this.$addArmy);
            this.$body.append(this.$print);

}



// Методы хранятся в прототипе
WH_Roster.prototype.showBody = function() {
    if (this.bodyIsShowen) {
        this.bodyIsShowen = false;
        $(this.$body).hide();
        this.$this.removeClass('WH_roster--opened');
    }
    else {
        this.bodyIsShowen = true;
        $(this.$body).show();
        this.$this.addClass('WH_roster--opened');
    }
}

WH_Roster.prototype.addArmy= function(slot,obj) {
    this.$popup.empty();
    for (var a in obj.armies) {
        this.$popup.append(this.getArmySelectOptions(slot,obj.armies[a]));
    }
    var _this = this;
    this.$popupBG.append(this.$close);
    this.$popupBG.show();
}
WH_Roster.prototype.selectFaction= function() {
    this.$popup.empty();
    for (var a in this.armyList) {
        this.$popup.append(this.getFactionSelectOptions(this,this.armyList[a]));
    }
    var _this = this;
    this.$popupBG.append(this.$close);
    this.$popupBG.show();
}
WH_Roster.prototype.closePopup = function() {
    this.$close.detach();
    this.$popupBG.hide();
    this.$popup.empty();
}
WH_Roster.prototype.getFactionSelectOptions = function(slot,obj) {
    var self = this;
    var result = $('<div />',{
        'class':"WH_select_faction WH_select_faction__" + obj.name,
        click : function() {
            var _this = self;
            return function() {
                _this.addArmy(slot,obj);
            }
        }()

    });
    return result;
}
WH_Roster.prototype.getArmySelectOptions = function(slot,obj) {
    var result = $('<div />',{
        'class':"WH_select_army"
    });
    var unit = $('<div />',{
        'class':"WH_select_army_div"
    });
    var name = $('<div />',{
        'class':"WH_select_army_name",
        'text': window[obj].prototype.visibleName,
        'click':function() {
            var __this = slot;
            var __obj = obj;
            return function() {
                __this.armies.push(new window[__obj]({
                    roster : __this
                }));
                // __this.army.checkAllGroup();
                __this.armies[__this.armies.length - 1].selectDefaultUnits();
                __this.closePopup();
            }
        }()
    });

    unit.append(name);

    var structure = $('<div />',{
        'class':"WH_select_army_block"
    });

    structure.append( $('<h5 />',{
        'class':"WH_select_army_h5",
        'text' : 'Formation'
    }));

    unit.append(structure);


    for (var i in window[obj].prototype.defaultStructure) {
        var structureUnit = $('<div />',{
            'class':"WH_select_army_structure_unit WH_select_army_structure_unit__"+window[obj].prototype.defaultStructure[i].htmlClass,
            'text' : window[obj].prototype.defaultStructure[i].name
        });
        structure.append(structureUnit);
    }

    var rules = $('<div />',{
        'class':"WH_select_army_block"
    });
    if (window[obj].prototype.defaultFormationRules) {
        rules.append( $('<h5 />',{
            'class':"WH_select_army_h5",
            'text' : 'Formation rules'
        }));
        for (var i in WH_Armies[obj].prototype.defaultFormationRules) {
            var rulName = WH_Armies[obj].prototype.defaultFormationRules[i];
            var rul = new WH_SpecialRules[rulName]({unit:this,createBy:this,forFormation:true});
            rules.append( $('<div />',{
                'class':"WH_select_army_rule_span",
            }).append(rul.getSpan()));
        }
        unit.append(rules);
    }

    var restriction = $('<div />',{
        'class':"WH_select_army_block"
    });

    if (window[obj].prototype.defaultFormationRestriction) {
        restriction.append( $('<h5 />',{
            'class':"WH_select_army_h5",
            'text' : 'Restrictions'
        }));
        for (var i in window[obj].prototype.defaultFormationRestriction) {
            restriction.append( $('<div />',{
                'class':"WH_select_army_restriction_span",
                'text' : window[obj].prototype.defaultFormationRestriction[i]
            }));
        }
        unit.append(restriction);
    }


    result.append(unit);
    return result;
}

WH_Roster.prototype.unselectAllArmy = function() {
    for (var i in this.armies) {
        this.armies[i].unselect();
    }
}


WH_Roster.prototype.updateCost = function() {
    this.totalPrice = 0;
    for (var i in this.armies) {
        this.totalPrice += this.armies[i].totalPrice;
    }
    var priceTxt = this.totalPrice ? '('+this.totalPrice+')' : '';
    this.$header.html('roster '+priceTxt)
}

WH_Roster.prototype.print = function(b) {
    var $p = $('#print');
    var self = this;
    $p.empty();
    if (!b) {
        $('#WH_').show(0);
        $p.hide(0);
        return;
    }

    var totalCol = 12;
    var allWargear = {};
    var allRules = {};

    var $close = $('<div />',{
        'class' : 'p_close',
        click : function() {
            var _this = self;
            return function () {
                _this.print(false);
            }
        }()
    });
    $p.append($close);

    var $tt = $('<table />',{
        'class' : 'p_table',
        cellpadding : 0,
        cellspacing : 0
    }) ;
    var $t = $('<tbody />',{'class' : 'p_tbody',}) ;
    $tt.append($t)

    var $tr_1 = $('<tr />',{'class' : 'p_tr_roster',});
    var $td_1_1 = $('<td />',{
        colspan : totalCol
    }); 
    var $h1 = $('<h1 />',{
        text : 'Ротсер ' + this.totalPrice,
        'class' : 'p_tr_roster_h1',
    })
    $td_1_1.append($h1)
    $tr_1.append($td_1_1);
    $t.append($tr_1);


    for (var a in this.armies) {
        var armie = this.armies[a];
        var $tr_2 = $('<tr />',{'class' : 'p_tr_armie',});
        var $td_2_1 = $('<td />',{colspan : totalCol-2}); 
        var $h2 = $('<h2 />',{
            text : '' + armie.visibleName,
            'class' : 'p_tr_armie_h2',
        });
        $td_2_1.append($h2)
        $tr_2.append($td_2_1);

        var $td_2_2 = $('<td />',{colspan : 2}); 
        var $h2c = $('<h2 />',{
            text : '' + armie.totalPrice,
            'class' : 'p_tr_armie_h2c',
        });
        $td_2_2.append($h2c)
        $tr_2.append($td_2_2);

        $t.append($tr_2);


        if (armie.formationRules.length) {
            var $tr_8 = $('<tr />',{'class' : 'p_tr_armie_rules',});
            $t.append($tr_8);
    
            var $td_8_1 = $('<td />',{'class' : 'p_tr_armie_rules_header', text: 'Special Rules'}); 
            $tr_8.append($td_8_1);
            
            var formationRulesArrtext = [];
            for (var fr in armie.formationRules) {
                formationRulesArrtext.push(armie.formationRules[fr].visibleName)
            }
            var $td_8_2 = $('<td />',{colspan : totalCol-1 , text :formationRulesArrtext.join(', ') }); 
            $tr_8.append($td_8_2);
        }

        var $tr_5 = $('<tr />',{'class' : 'p_tr_abilities',});
        $t.append($tr_5);

        var $td_5_1 = $('<td />',{'text' : '',width:'23%'}); 
        $tr_5.append($td_5_1);

        var $td_5_11 = $('<td />',{'text' : '#',width:'7%'}); 
        $tr_5.append($td_5_11);

        var $td_5_2 = $('<td />',{'text' : 'WS',width:'7%'}); 
        $tr_5.append($td_5_2);

        var $td_5_3 = $('<td />',{'text' : 'BS',width:'7%'}); 
        $tr_5.append($td_5_3);

        var $td_5_4 = $('<td />',{'text' : 'S',width:'7%'}); 
        $tr_5.append($td_5_4);

        var $td_5_5 = $('<td />',{'text' : 'T',width:'7%'}); 
        $tr_5.append($td_5_5);

        var $td_5_6 = $('<td />',{'text' : 'W',width:'7%'}); 
        $tr_5.append($td_5_6);

        var $td_5_7 = $('<td />',{'text' : 'I',width:'7%'}); 
        $tr_5.append($td_5_7);

        var $td_5_8 = $('<td />',{'text' : 'A',width:'7%'}); 
        $tr_5.append($td_5_8);

        var $td_5_9 = $('<td />',{'text' : 'Ld',width:'7%'}); 
        $tr_5.append($td_5_9);

        var $td_5_10 = $('<td />',{'text' : 'Sv',width:'7%'}); 
        $tr_5.append($td_5_10);

        var $td_5_12 = $('<td />',{'text' : 'cost',width:'7%'}); 
        $tr_5.append($td_5_12);




        for (var g in armie.structure) {
            for (var s in armie.structure[g].slots) {
                var slot = armie.structure[g].slots[s];
                if (!slot.isEmpty()) {
                    var unit = armie.structure[g].slots[s].unit;
                    var $tr_3 = $('<tr />',{'class' : 'p_tr_unit',});
                    $t.append($tr_3);

                    var $td_3_1 = $('<td />',{colspan : totalCol-1}); 
                    $h3 = $('<h3 />',{
                        text : '' + unit.visibleName ,
                        'class' : 'p_tr_unit_h3',
                    });
                    $td_3_1.append($h3)
                    $tr_3.append($td_3_1);

                    var $td_3_2 = $('<td />',{colspan : totalCol}); 
                    $h3c = $('<h3 />',{
                        text : '' +unit.totalPrice+'',
                        'class' : 'p_tr_unit_h3c',
                    });
                    $td_3_2.append($h3c)
                    $tr_3.append($td_3_2);


                    var uniq = unit.getUnicModelArr();
                    for (var m in uniq) {
                        var model = uniq[m].model;

                        var $modelSR = null
                        var onModelName = unit.getSpecialRulesArr({onModelName:true,modelName:model.modelName});
                        if (onModelName.length) {
                            var $modelSR = $('<tr />',{
                                'class' : 'p_tr_model_spcialrules',
                            });;

                            // var $modelSR_1 = $('<td />',{
                            //     'class' : 'p_td_model_spcialrules_header',
                            //     text : 'Special Rules'
                            // }); 
                            // $modelSR.append($modelSR_1);

                            var rulesTextArr = [];
                            for (var r in onModelName) {
                                rulesTextArr.push(onModelName[r].visibleName);
                                allRules[onModelName[r].visibleName] = onModelName[r];
                            }

                            var $modelSR_2 = $('<td />',{
                                colspan : totalCol-1,
                                text : 'Special Rules: '+rulesTextArr.join(', '),
                                'class' : 'p_td_model_spcialrules_header',
                            }); 
                            $modelSR.append($modelSR_2);
                        }


                        // console.log(uniq[m])
                        var $tr_4 = $('<tr />',{'class' : 'p_tr_model_abilities',});
                        $t.append($tr_4);

                        var $td_4_1 = $('<td />',{
                            'text' : model.visibleModelName,
                            'rowspan' : 2 + ($modelSR != null ? 1 : 0)
                        }); 
                        $tr_4.append($td_4_1);

                        var $td_4_11 = $('<td />',{'text' : uniq[m].count}); 
                        $tr_4.append($td_4_11);

                        var $td_4_2 = $('<td />',{'text' : model.abilities.WS}); 
                        $tr_4.append($td_4_2);

                        var $td_4_3 = $('<td />',{'text' : model.abilities.BS}); 
                        $tr_4.append($td_4_3);

                        var $td_4_4 = $('<td />',{'text' : model.abilities.S}); 
                        $tr_4.append($td_4_4);

                        var $td_4_5 = $('<td />',{'text' : model.abilities.T}); 
                        $tr_4.append($td_4_5);

                        var $td_4_6 = $('<td />',{'text' : model.abilities.W}); 
                        $tr_4.append($td_4_6);

                        var $td_4_7 = $('<td />',{'text' : model.abilities.I}); 
                        $tr_4.append($td_4_7);

                        var $td_4_8 = $('<td />',{'text' : model.abilities.A}); 
                        $tr_4.append($td_4_8);

                        var $td_4_9 = $('<td />',{'text' : model.abilities.Ld}); 
                        $tr_4.append($td_4_9);

                        var Sv = model.abilities.Sv ? model.abilities.Sv+'+': '';
                        var $td_4_10 = $('<td />',{'text' : Sv+''}); 
                        $tr_4.append($td_4_10);


                        var $td_4_10 = $('<td />',{'text' : ''}); 
                        $tr_4.append($td_4_10);



                        var wargearTextArr = [];
                        for (var w in model.wargear) {
                            wargearTextArr.push(model.wargear[w].visibleName);
                            allWargear[model.wargear[w].wargearName] = model.wargear[w];
                        }
                        if (wargearTextArr.length) {
                            var $tr_6 = $('<tr />',{'class' : 'p_tr_model_wargear',});
                            $t.append($tr_6);
                            var $td_6_1 = $('<td />',{
                                'text' : wargearTextArr.join(', '),
                                colspan : totalCol - 1,
                                'class' : 'p_tr_unit_rules',
                            }); 
                            $tr_6.append($td_6_1);
                        }


                     


                        $t.append($modelSR)
                    }


                  
                    var general = unit.getSpecialRulesArr({general:true});
                    if (general.length) {
                        var $tr_7 = $('<tr />',{
                            'class' : 'p_tr_unit_spcialrules',
                        });
                        $t.append($tr_7);

                        var $td_7_1 = $('<td />',{
                            'class' : 'p_td_unit_spcialrules_header',
                            text : 'Special Rules'
                        }); 
                        $tr_7.append($td_7_1);

                        var rulesTextArr = [];
                        for (var r in general) {
                            rulesTextArr.push(general[r].visibleName);
                            allRules[general[r].visibleName] = general[r];
                        }

                        var $td_7_2 = $('<td />',{
                            colspan : totalCol-1,
                            text : rulesTextArr.join(', ')
                        }); 
                        $tr_7.append($td_7_2);
                    }


                }
            }
        }
    }

    $p.append($tt)

    $('#WH_').hide(0);
    $p.show(0);

}


// --------- Класс-потомок -----------
// 
// var DeamonsOfChaos = function() {
//     // this.armyName = 'DeamonsOfChaos';
//     WH_Roster.apply(this, arguments);
// }

// // Унаследовать
// DeamonsOfChaos.prototype = Object.create(WH_Roster.prototype);

// // Желательно и constructor сохранить
// DeamonsOfChaos.prototype.constructor = DeamonsOfChaos;

