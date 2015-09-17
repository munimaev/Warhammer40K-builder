// --------- Класс-Родитель ------------
var WH_SpecialRule = function(o) {
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
    this.forFormation = o.forFormation || false;
    // this.readyToChange = null;
    // this.icon = o.icon || null;
    // this.changedFrom = o.changedFrom || null;
}

WH_SpecialRule.prototype.getSpan = function() {
    var _this = this;
    // if (this.readyToChange !== null
    //     && (!this.readyToChange.needChekEnambleEachTime
    //     || this.readyToChange.createBy.superOption.canEnableWeapon(null,this.readyToChange.createBy))) {
    //     // readyToChange = {
    //     //     name 'name',
    //     //     createBy :  -> DA_RangedWeapons_Boltgun,
    //     //     usedOption : -> DA_RangedWeapons_Boltgun,
    //     //     needChekEnambleEachTime : bool
    //     // }
    //     this.click = function() {
    //         var __this = _this;
    //         return function() {
    //             for (var w in __this.model.wargear) {
    //                 if (__this.model.wargear[w] === __this) {

    //                     __this.model.wargear.splice(w,1,new window[__this.readyToChange.name]({
    //                         model: __this.model,
    //89                         createBy : __this.readyToChange.createBy,
    //                         usedOption : __this.readyToChange.createBy,
    //                         changedFrom : {
    //                             name : __this.wargearName,
    //                             createBy : __this.createBy,
    //                             usedOption : __this.readyToChange.createBy 
    //                         }
    //                     }))
                        
    //                     __this.readyToChange.usedOption.iUpdated();
    //                     // __this.model.unit.updateModels();
    //                     break;
    //                 }
    //             }
    //         }
    //     }();
    //     htmlClass += ' WH_army_unit_wargear_span--readyToChange';
    // } 
    // else {
    //     this.click = function() {
    //         var __this = _this;
    //         console.log(_this)
    //     };
    // }
    var text = _this.visibleName + '';
    // if (_this.wargearName == 'emptySlot') {
    //     text = '<i>' + _this.readyToChange.name + '</i>';
    // }
    
    this.click = function() {
        var __this = _this;
        return function() {
            WH_info.showRule(__this);
        };
    }();

    var $span = $('<span />',{
        'class': this.getRulesSpanHtmlClass(),
        'click': this.click
    });
    if (this.icon) {
        text = ' <img src="pics/'+this.icon+'.png"> '+text;
    }
    $span.html(text);
    return $span;
};


WH_SpecialRule.prototype.getTextBlock = function(o) {
    var o = o || {};
    o.header = o.header || false;
    var result = $('<div />',{
        'class' : 'WH_specialRules_textBlock'
    });
    var h = $('<h2 />',{
        // text : this.getTextBlockName()
    });
    h.html(this.getTextBlockName());
    var p = $('<div />',{
    });
    p.html(this.getTextBlockText());
    result.append(h);

    result.append(p);
    return result;
};
WH_SpecialRule.prototype.getTextBlockName = function(o) {
    var result = '';

    switch (Global.lang) {
        case 'RusEng':
            result = this.visibleName;
            if (this.nameRus !== null) {
                result += ' <small style="color:grey">' +this.nameRus + '</small>'
            }
            break;
        case 'Rus':
            if (this.nameRus !== null) {
                result = this.nameRus
            } else {
                result = this.visibleName + ' <small style="color:grey">первода еще нет</small>'
            }
            break;
        case 'Eng':
        default: 
            result = this.visibleName;
            break;
    }
    return result;
};

WH_SpecialRule.prototype.getTextBlockText = function(o) {
    var needenText = '';
    switch (Global.lang) {
        case 'RusEng':
            if (this.textRus !== null) {
                needenText = this.textRus;
            } else if (this.textEng !== null){
                needenText = this.textEng;
            } else {
                needenText = 'Нет правила';
            }
            break; 
        case 'Rus':
            if (this.textRus !== null) {
                needenText = this.textRus;
            } else {
                needenText = 'Нет правила';
            }
            break;
        case 'Eng':
        default: 
            if (this.textEng !== null) {
                needenText = this.textEng;
            } else {
                needenText = 'No text';
            }
            break;
    }
    return this.getTextBlockHtml(needenText);
};
WH_SpecialRule.prototype.getTextBlockHtml = function(md) {
    var ps = md.split('\n\n').join('<p></p>')
    ps = '<p>'+ps+'</p>';
    return ps;

}

WH_SpecialRule.prototype.htmlClass = 'WH_army_unit_specialRules_span';

WH_SpecialRule.prototype.getRulesSpanHtmlClass = function() {
    // if (this.unit instanceof WH_Roster) {
    //     return ''
    // }
    return 'WH_specialRules';
};

// Методы хранятся в прототипе


var WH_SpecialRules = {};



//====================================
//        Dark Angels
//====================================

var WH_SpecialRuleFabric = function(a) {
    for (var i in a) {
        var parrent = a[i].parrent || 'WH_SpecialRule';
        WH_SpecialRules[a[i].specialRuleName] = function() {
            var specialRuleName = a[i].specialRuleName;
            // var wargearType = a[i].hasOwnProperty('wargearType') ? a[i].wargearType : 'unknown';
            var icon = a[i].hasOwnProperty('icon') ? a[i].icon : null;
            return function() {
                this.specialRuleName = specialRuleName;
                // this.visibleName = visibleName;
                // this.wargearType = wargearType;
                this.icon = icon;
                WH_SpecialRule.apply(this, arguments);
            }
        }()
        WH_SpecialRules[a[i].specialRuleName].prototype = Object.create(WH_SpecialRule.prototype);
        WH_SpecialRules[a[i].specialRuleName].prototype.constructor =  WH_SpecialRules[a[i].specialRuleName];
        WH_SpecialRules[a[i].specialRuleName].prototype.visibleName =  a[i].visibleName;
        WH_SpecialRules[a[i].specialRuleName].prototype.textEng =  a[i].textEng || null;
        WH_SpecialRules[a[i].specialRuleName].prototype.nameRus =  a[i].nameRus || null;
        WH_SpecialRules[a[i].specialRuleName].prototype.textRus =  a[i].textRus || null;
    }
}



WH_SpecialRuleFabric([

{
    specialRuleName: 'AcuteSenses',
    visibleName: 'Acute senses',
    textEng : 'If a unit contains at least one model with this special rule, and that unit arrives on a random table edge (due to Outflank, or other special rules), then you can re-roll to see which table edge they arrive from.',
    nameRus : 'Обостренные чувства',    
    textRus : 'Если боевая единица содержит хотя бы одну модель с этим специальным правилом, и данная боевая единица прибывает со случайно выбранного края стола (методом флангового обхода» или по какому-нибудь другому специальному правилу), тогда вы можете перебросить кубик , чтобы узнать, с какого края стола она прибудет.'
}, {
    specialRuleName: 'AdamantiumWill ',
    visibleName: 'Adamantium will ',
    textEng: 'A unit that contains at least one model with this special rule receives a +1 bonus to Deny the Witch rolls',
    nameRus : 'Несокрушимая воля',    
    textRus: 'Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, получает бонус +1 к броскам при прохождении тестов на отрицание ведьмовства (с. 25).***' 
}, {
    specialRuleName: 'AndTheyShallKnowNoFear',
    visibleName: 'And they shall know no fear',
    textEng : 'A unit that contains at least one model with this special rule automatically passes Fear and Regroup tests. When it Regroups, the unit does not make the 3" Regroup move, but can instead move, shoot (or Run) and declare charges normally in that turn. Furthermore, if a unit containing one or more models with this special rule is caught by a Sweeping Advance, they are not destroyed, but remain locked in combat instead.',
    nameRus : 'И не познают они страха',    
    textRus : 'Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, автоматически проходит тесты на устрашение и перегруппировку. При перегруппировке боевая единица не делает манёвр на 3", однако вместо этого может двигаться, стрелять (или бегать) и объявлять о нападении как обычно в этом ходе. Если боевую единицу, содержащую одну или более моделей с этим специальным правилом, настигают при преследовании, то она не уничтожается, а остаётся связанной боем.'
}, {
    specialRuleName: 'Armourbane',
    visibleName: 'Armourbane ',
    textEng : 'If a model has this special rule, or is attacking with a Melee weapon that has this special rule, it rolls an additional D6 for armour penetration in close combat. If a model makes a shooting attack with a weapon that has this special rule, it rolls an additional D6 for armour penetration. In either case, this special rule has no effect against non-vehicle models..',
    nameRus : 'Губитель брони',    
    textRus : 'Если модель имеет это специальное правило или атакует рукопашным оружием с этим специальным правилом, то она кидает дополнительный D6 на пробитие брони в ближнем бою. Аналогичным образом, если модель совершает стрелковую атаку оружием с этим специальным правилом, она кидает дополнительный D6 на пробитие брони. В любом случае данное специальное правило не действует на модели, не относящиеся к технике.'
}, {
    specialRuleName: 'Assault',
    visibleName: 'Assault',
    textEng : '',
    nameRus : 'Штурмовое',    
    shortTextEng : '',
},  {
    specialRuleName: 'Assault_1',
    visibleName: 'Assault 1',
    textEng : '',
    nameRus : 'Штурмовое 1',    
    shortTextEng : '',
}, {
    specialRuleName: 'Assault_2',
    visibleName: 'Assault 2',
    textEng : '',
    nameRus : 'Штурмовое 2',    
    shortTextEng : '',
}, {
    specialRuleName: 'AssaultVehicle',
    visibleName: 'Assault vehicle',
    textEng : 'Passengers disembarking from Access Points on a vehicle with this special rule can charge on the turn they do so (even in a turn that the vehicle was destroyed, or in the following',    
    nameRus : 'Десантно-штурмовая техника',    
    shortTextEng : 'Пассажиры, высаживающиеся из мест входа техники с этим специальным правилом, могут напасть на противника в этом же ходе (даже если техника была уничтожена в этом или предыдущем ходе), если только техника не прибывала из резерва в данном ходе.',
}, {
    specialRuleName: 'ArmoriumCherub',
    visibleName: 'Armourbane ',
    textEng : 'Models or melee weapons with this USR rolls 2d6 to pen vehicles.',
}, {
    specialRuleName: 'Barrage',
    visibleName: 'Barrage',
    textEng: 'All Barrage weapons use blast markers and consequently use the rules for Blast weapons, as indicated by their profile, with the following exceptions:\n\n• Barrage weapons can fire indirectly. This means they can fire at a target that they do not have line of sight to, as long as the target is beyond their minimum range (if applicable). When firing indirectly, the Ballistic Skill of the firer is not subtracted from the scatter distance; unless a Hit! is rolled on the scatter dice, the blast marker always scatters a full 2D6". If a Barrage weapon has line of sight to its target it can fire directly, even if the target is within its minimum range.\n\n• To determine whether a unit wounded by a Barrage weapon is allowed a cover save, and when determining Wound allocation, always assume the shot is coming from the centre of the blast marker, instead of from the firing model. Hits against vehicles are always resolved against their side armour.\n\nMultiple Barrages\n\nIf a unit fires more than one shot with the Barrage special rule, they fire together, asfollows:\n\n• The Barrage weapon closest to the target unit fires first. Place the blast marker overthe target, then roll for scatter as described earlier.\n\n• Once the first marker is placed, roll a scatter dice for each other Barrage weapon shot fired by the unit. If an arrow is rolled, place the marker in the direction indicated so that it is next to and touching the edge of the first marker placed (see diagram below).\n\n• If a Hit! is rolled, the firing player places the marker so that it touches any part of any marker in the group that has already been placed. Note that it is perfectly fine if some markers are placed overlapping one another (including being directly over the top of a previous marker).\n\n• Once all of the markers are in place, add up the number of hits and roll To Wound for these hits. To determine Wound allocation and cover saves, always assume the shot is coming from the centre of the first blast marker that was placed in the Multiple Barrage.\n\nApocalyptic Barrage\n\n An Apocalyptic Barrage follows all of the rules for a Barrage weapon, but uses the clovershaped apocalyptic barrage marker. Before the marker is placed, the attacker is allowed to rotate the marker about its centre to maximise the number of models that could potentially be hit. Place the marker and roll for scatter in the same way you would for a Blast. If the marker scatters, be careful to maintain the same orientation as you move it.\n\n Once the final position of the marker has been determined, roll a number of dice equal to the number of attacks on the weapon’s profile. So, for example, with a weapon with the type ‘Heavy 4, Apocalyptic Barrage’, you would roll four dice. Each dice roll corresponds to a ‘strike’ on one of the circles on the apocalyptic barrage marker. For example, each roll of a 2 indicates a strike on circle number 2. Resolve the strikes as for a Multiple Barrage, as if each were a Barrage attack that had landed on that circle and hit all the models underneath it. To determine Wound allocation and cover saves, always assume the shot is coming from the centre of the entire apocalyptic barrage marker.',
    nameRus : 'Навесная стрельба',    
    textRus: 'Все орудия для навесной стрельбы используют маркеры взрывов, и поэтому к ним применимы все те же правила, что и для оружия взрывного типа, как указано в их профиле. Но есть некоторые отличия:\n\n- Орудия для навесной стрельбы ведут непрямой огонь. Это означает, что они могут стрелять по цели, не находящейся на линии их прямой видимости и/или по цели, находящейся ближе минимальной дальности оружия (если она есть). При непрямой стрельбе число показателя навыков стрельбы стреляющего не вычитается из расстояния смещения; если только на кубике смещения не выпадает Hit!, маркер взрыва всегда смещается на полные 2D6".\n\n- Чтобы определить, дозволяются ли модели спас-броски за укрытие при получении ранения от орудия для навесной стрельбы, а также при распределении ранений, всегда считайте, что выстрел идёт из центра маркера взрыва, а не от самой стреляющей модели. Попадания по технике всегда отыгрываются против её бортовой брони.\n\n- Все орудия для навесной стрельбы имеют специальное правило подавление огнем».' 
}, {
    specialRuleName: 'Blast',
    visibleName: 'Blast',
    textEng : 'When firing a Blast weapon, models do not roll To Hit. Instead, just pick one enemy model visible to the firer and place the 3" blast marker with its hole entirely over the base of the target model (see diagram), or its hull if the target is a vehicle. The hole at the centre of the marker must be within the weapon’s maximum range. You cannot place the blast marker so that the base or hull of any friendly model is even partially under it. The large area affected by the blast means it’s going to be very hard to miss completely. Nonetheless, the shot might not land exactly where intended. Roll for the blast marker to scatter and subtract the firer’s Ballistic Skill from the distance (if any) that it scatters, to a minimum of 0". Note that it is possible, and absolutely fine, for a shot to scatter beyond the weapon’s maximum or minimum range and line of sight. This represents the chance of ricochets, the missile blasting through cover and other random events. In these cases, hits are worked out as normal and can hit and wound units out of range and line of sight (or even your own units, or models locked in combat). If the shot scatters so that the hole in the centre of the marker is beyond the table’s edge, the shot is a complete miss and is discarded.\n\nOnce the final position of the blast marker has been determined, take a good look at it from above – each unit suffers one hit for each of their models which is fully or partially beneath the blast marker, even if those models are not within the firer’s line of sight. Once the number of hits inflicted on the unit has been worked out, roll To Wound and save as normal. Remember that any Wounds inflicted by weapons with the Blast special rule must be allocated to the closest model in the target unit even if it is out of sight of any models from the attacking unit.\n\nMultiple Blasts\n\nIf a unit is firing more than one shot with the Blast special rule, scatter each shot, one at a time, as described above and determine how many hits are scored with each individual blast marker. After the last shot, add up the total number of hits scored and roll all of the To Wound rolls as normal.\n\nBlast Weapons and Re-rolls\n\nIf a model has the ability to re-roll its rolls To Hit and chooses to do so after firing a Blast weapon, the player must re-roll both the scatter dice and the 2D6.\n\nBlast Weapons and Snap Shots\n\nBlast weapons cannot be fired as Snap Shots.\n\nLarge Blast\n\nLarge Blast weapons use the 5" blast marker, but otherwise obey all the rules for Blast weapons.\n\nMassive Blast\n\nMassive Blast weapons use the 7" blast marker, but otherwise obey all the rules for Blast weapons.\n\nApocalyptic Blast\n\nApocalyptic Blast weapons use the 10" blast marker, but otherwise obey all the rules for Blast weapons.\n\nApocalyptic Mega-blast (5"/7"/10")\n\nApocalyptic Mega-blast weapons use the apocalyptic blast marker. They obey the rules for Blast weapons, with the following exceptions:\n\n• Apocalyptic Mega-blast weapons have three Strength values and three AP values. Correspondingly, the apocalyptic blast marker is divided into three zones, as shown in the diagram to the far right, one for each Strength and AP value.\n\n• The Strength and AP of any hits depends on the zone where the target model is located. The first Strength and AP value are used for the inner zone, the second Strength and AP value are used for the middle zone, and the third Strength and AP value are used for the outer zone. Always use the best Strength and AP if a model straddles two or more zones. If a unit has models in several zones, work out the hits inflicted for each zone separately. Note that there will be a different Wound pool for each zone. For example, an Aquila macro-cannon firing a quake shell has the Apocalyptic Mega-blast special rule, a Strength of 10/7/5 and an AP value of 1/4/6. The Strength and AP values for the three zones are therefore:\n\nZone - S - AP\n\nInner - 10 - 1\n\nMiddle - 7 - 4\n\nOuter - 5 - 6\n\nA unit with 3 models in the inner zone and 5 models in the middle zone would suffer 3\n\nStrength 10 AP1 hits, and 5 Strength 7 AP4 hits.\n\n• To determine whether a unit wounded by an Apocalyptic Mega-blast weapon is allowed a cover save, and when determining Wound allocation, always assume the shot is coming from the centre of the apocalyptic blast marker, instead of from the firing model.\n\n• Hits from Apocalyptic Mega-blast weapons made against vehicles are always resolved against their side armour.',
    nameRus : 'Взрыв',    
    textRus : 'При стрельбе из оружия взрывного типа модели не делают бросок на попадание. Вместо этого выберите одну вражескую модель, видимую для стреляющего, и поместите маркер взрыва так, чтобы его отверстие находилось точно над подставкой выбранной цели (см. рис.) или над корпусом, если это техника. Отверстие в центре маркера должно находиться в пределах максимальной дальности оружия. Нельзя помещать маркер взрыва так, что он хотя бы немного задевал подставку или корпус любой дружественной модели. Ввиду большого пространства, покрываемого при взрыве, предполагается, что по цели очень трудно совсем не попасть. Тем не менее выстрел может попасть не точно туда, куда планировалось. Сделайте бросок на смещение (с. 12) маркера взрыва и вычтите значение BS стреляющего из расстояния, на которое сместился выстрел (если произошло смещение). Это расстояние можно свести до 0". Учтите, что вполне возможно и приемлемо, если выстрел сместится за пределы максимальной или минимальной дальности и линии прямой видимости. Так отображается рикошет, взрыв ракеты в укрытии и прочие случайные события. В таких случаях попадания вычисляются как обычно, и выстрел может попасть и ранить боевые единицы, находящиеся вне дальности и линии прямой видимости (или даже ваши собственные боевые единицы или модели, вовлечённые в бой). Если выстрел смещается так, что отверстие в середине маркера оказывается за пределами края стола, выстрел просто уходит в никуда. /n/nКак только окончательная позиция маркера взрыва будет определена, посмотрите на него сверху – каждая боевая единица получает по одному попаданию за каждую модель, которая полностью или частично находится под маркером взрыва, даже если сама модель не видна стреляющему.\n\nКогда число полученных боевой единицей попаданий будет вычислено, делайте броски на ранение и спас-броски как обычно. Запомните, что любые неспасённые ранения, нанесённые оружием взрывного типа, нужно распределять на ближайшую модель в выцеленной боевой единице, даже если эту модель не видит ни одна из моделей атакующей боевой единицы.\n\nНесколько взрывов\n\nЕсли боевая единица делает более одного выстрела со специальным правилом взрыв», смещайте каждый выстрел по отдельности, как написано выше, и определяйте, сколько попаданий нанесено от каждого отдельного маркера взрыва. После последнего выстрела подсчитайте общее количество нанесённых попаданий и отыграйте все броски на ранение как обычно.\n\nОружие взрывного типа и перебрасывания\n\nЕсли модель имеет способность перебрасывать свои броски на попадание и хочет сделать это после стрельбы из оружия взрывного типа, то игрок должен перебрасывать и кубик смещения, и 2D6.\n\nОружие взрывного типа и стрельба навскидку\n\nОружие взрывного типа не может вести стрельбу навскидку.\n\nОрудия с правилом большой взрыв» используют маркер взрыва с диаметром 5", а в остальном подчиняются всем правилам оружия взрывного типа.\n\nОгромный взрыв\n\nОрудия с правилом огромный взрыв» используют маркер взрыва с диаметром 7", а в остальном подчиняются всем правилам оружия взрывного типа.\n\nАпокалиптический взрыв\n\nОрудия с правилом апокалиптический взрыв» используют маркер взрыва с диаметром 10", а в остальном подчиняются всем правилам оружия взрывного типа.\n\nАпокалиптический мегавзрыв\n\nОрудия с правилом апокалиптический мегавзрыв» используют апокалиптический маркер взрыва. Они подчиняются всем правилам оружия взрывного типа, но с некоторыми исключениями:\n\n• У орудий с правилом апокалиптический мегавзрыв» есть\n\nтри показателя силы и три AP. Соответственно, маркер апокалиптического мегавзрыва разделён на три зоны (как показано на рис. на противоположной странице), по одной для каждого показателя силы и AP.\n\n• Сила и AP любого попадания зависят от зоны, в которой находится цель. Первое значение показателей силы и AP применяется для внутренней зоны, второе – для средней, а третье – для внешней. Всегда используйте наилучшие показатели силы и AP, если модель занимает место в двух или более зонах. Если у боевой единицы есть модели в разных зонах, высчитывайте попадания для каждой зоны отдельно. Учтите, у каждой зоны, следовательно, будет собственный фонд ранений.\n\nНапример, макропушка Аквила» выстреливает сотрясательным снарядом, имеющим спецправило апокалиптический мегавзрыв», силу 10/7/5 и AP 1/4/6. Следовательно, для трёх зон маркера значения силы и AP следующие:\n\nЗона\n\nВнутренняя Средняя Внешняя\n\nСила AP\n\n10 1 7 4 5 6\n\nБоевая единица с тремя моделями во внутренней и пятью моделями в средней зонах, соответственно, получит 3 попадания с силой 10 и AP1 и 5 попаданий с силой 7 и AP4.\n\n• При распределении ранений и определении спас-бросков всегда считайте, что выстрел идёт из самого центра маркера апокалиптического взрыва, а не от стреляющей модели.\n\n• Попадания по технике из орудий со спецправилом апокалиптический мегавзрыв» всегда отыгрываются против её бортовой брони.'
}, {
    specialRuleName: 'LargeBlast',
    visibleName: 'Large blast',
    textEng : 'Large Blast weapons use the 5" blast marker, but otherwise obey all the rules for Blast weapons.',
    nameRus : 'Большой взрыв',    
    textRus : ''
}, {
    specialRuleName: 'BlessingOfTheOmnissiah',
    visibleName: 'Blessing of the Omnissiah',
    textEng : 'In each of your Shooting phases, instead of firing his weapons, a character with this special rule may choose to repair a single friendly vehicle that he is in base contact with or embarked upon. To repair a vehicle, roll a D6 and add the following modif1ers where applicable:\n\n• Each servitor with a servo-arm in the character\'s unit +1\n\n• The character has a servo-harness +1\n\nIf the result is a 5 or more, you may either restore a Hull Point lost earlier in the battle, or repair a Weapon Destroyed or Immobilised result suffered earlier in the battle; this is effective immediately. ',
    nameRus : 'Благословение Омнисиии',    
    textRus : 'В фазе стрельбы, вместо стрельбы из оружия, персонаж с этим специальным правилом может выбрать отремонтировать одну дружественную единицу техники, с которой находится в базовом контакте или в которую погружен. Чтобы отремонтировать технику, игрок бросает D6 и добавляет к результату следующие модификаторы:\n\n+1 за каждого сервитора в отряде с servo-arm\n\n+1 за servo-harness у персонажа\n\nЕсли результат 5 или больше, игрок может выбрать: либо восстановить технике один пункт брони корпуса, либо снять полученный ранее в бою эффект Оружие уничтожено и Техника обездвижена. Результат применяется мгновенно.'

}, {
    specialRuleName: 'Blind',
    visibleName: 'Blind',
    textEng : '',
    nameRus : 'Ослепление',    
    textRus : 'Любая боевая единица, получившая попадание от одной или более моделей или единиц оружия с этим специальным правилом, должна пройти тест на инициативу в конце текущей фазы. Если тест успешно пройден, все хорошо – кто-то выкрикивает предупреждение, и воины успевают отвернуться. Если тест на инициативу провален, то показатели навыков стрельбы и ближнего боя у всех моделей боевой единицы снижаются до 1 пункта до конца их следующего хода.\n\nВ том случае, если атакующая боевая единица попадает в себя, то считается, что она была к этому подготовлена, и потому автоматически проходит тест. Любая модель без характеристики инициативы (например, строения или техника, не считая шагоходов) не подвержена воздействию данного спецправила.'
}, {
    specialRuleName: 'Bulky',
    visibleName: 'Bulky',
    textEng : 'Bulky models count as two models for the purposes of Transport Capacity.',
    nameRus : 'Крупногабаритный',    
    textRus : 'Крупногабаритные модели занимают два пункта транспортной вместимости (то есть считаются за две модели).'
}, {
    specialRuleName: 'VeryBulky',
    visibleName: 'Very Bulky',
    textEng : 'Very Bulky models instead count as three models.',
    nameRus : 'Очень крупногабаритные',    
    textRus : 'Очень крупногабаритные модели занимают три пункта транспортной вместимости.'
}, {
    specialRuleName: 'ExtremelyBulky',
    visibleName: 'Extremely Bulky',
    textEng : 'Extremely Bulky models instead count as five models.',
    nameRus : 'Чрезвычайно крупногабаритные',    
    textRus : 'Чрезвычайно крупногабаритные модели занимают пять пунктов транспортной вместимости.'
}, {
    specialRuleName: 'BrotherhoodOfPsykers',
    visibleName: 'Brotherhood of psykers',
    textEng : '',
    nameRus : 'Братство псайкеров',    
    textRus : 'Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, является псайкерской – если нигде не указан уровень мастерства, тогда считается, что у данной боевой единицы УМ 1. Правила генерирования и проявления психосил можно найти на странице 23. Боевая единица следует всем обычным правилам для псайкеров, за исключением нижеприведённых изменений:\n\n• При проявлении психосилы данная боевая единица отмеряет расстояние и линию прямой видимости от любой одной своей модели (а также использует её перечень характеристик при необходимости) со специальным правилом братство псайкеров/чернокнижников» (на усмотрение управляющего игрока).\n\n• Если боевая единица подвергается опасностям варпа или получает попадание от атаки, направляемой специально на псайкеров, попадания распределяются случайным образом среди моделей со специальным правилом братство псайкеров/ чернокнижников». Если модель с этим спецправилом получает или теряет психосилу, все прочие модели с этим спецправилом в их боевой единице тоже получают или теряют данную силу.'
}, {
    specialRuleName: 'BrotherhoodOfSorcerers',
    visibleName: 'Brotherhood of sorcerers',
    textEng : '',
    nameRus : 'Братство псайкеров',    
    textRus : 'Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, является псайкерской – если нигде не указан уровень мастерства, тогда считается, что у данной боевой единицы УМ 1. Правила генерирования и проявления психосил можно найти на странице 23. Боевая единица следует всем обычным правилам для псайкеров, за исключением нижеприведённых изменений:\n\n• При проявлении психосилы данная боевая единица отмеряет расстояние и линию прямой видимости от любой одной своей модели (а также использует её перечень характеристик при необходимости) со специальным правилом братство псайкеров/чернокнижников» (на усмотрение управляющего игрока).\n\n• Если боевая единица подвергается опасностям варпа или получает попадание от атаки, направляемой специально на псайкеров, попадания распределяются случайным образом среди моделей со специальным правилом братство псайкеров/ чернокнижников». Если модель с этим спецправилом получает или теряет психосилу, все прочие модели с этим спецправилом в их боевой единице тоже получают или теряют данную силу.'
}, {
    specialRuleName: 'Bulky',
    visibleName: 'Bulky',
    textEng : '',
    nameRus : 'Крупногабаритный',    
    textRus : 'Крупногабаритные модели занимают два пункта транспортной вместимости.\n\nОчень крупногабаритные\n\nОчень крупногабаритные модели занимают три пункта транспортной вместимости.\n\nЧрезвычайно крупногабаритные\n\nЧрезвычайно крупногабаритные модели занимают пять пунктов транспортной вместимости.'
}, {
    specialRuleName: 'ColdBlooded',
    visibleName: 'Cold-blooded',
    textEng : 'Some warriors know no fear but are, at the sametime, not blind to their surroundings. They assesstheir situation coldly and order a retreat if it istactical sound. A cold-blooded unit can choose toeither pass or fail any Morale checks with thetypes casualties, regroup, pinning and terror. Inaddition, it is never subject to No Retreat.If the unit automatically passes or fails a certainMorale check (for example, because it is Fearlessas well), it can use the Cold-blooded rulenevertheless.',
    nameRus : '',    
    textRus : ''

}, {
    specialRuleName: 'CombatSquads',
    visibleName: 'Combat squads',
    textEng : '',
    nameRus : 'Боевые звенья',    
    textRus : 'Боевую единицу из десяти моделей с этим специальным правилом можно разбить на две боевые единицы по пять моделей, называемые боевыми звеньями.\n\nНепосредственно перед расстановкой вы должны решить, какие боевые единицы разобьете на боевые звенья, и какие модели пойдут в каждое из них. Боевая единица, разбитая на боевые звенья, следовательно, теперь считается за две отдельные боевые единицы во всех игровых ситуациях, в том числе и при подсчете общего количества боевых единиц в армии и количества боевых единиц, которые вы можете убрать в резерв. Затем продолжите расстановку как обычно. Учтите, два боевых звена, появившихся из одной боевой единицы, можно погрузить в одну и ту же транспортную технику при условии, что это позволяет транспортная вместимость.\n\nКак только вы примите решение, разбивать боевую единицу на звенья или нет, все должно так и оставаться до конца сражения. Боевую единицу нельзя разбить или объединить обратно позднее во время игры, а также нельзя воспользоваться перестановкой, чтобы разбить или объединить боевую единицу.'
}, {
    specialRuleName: 'Concussive',
    visibleName: 'Concussive',
    textEng : 'A model that suffers one or more unsaved Wounds from a weapon with this special rule is reduced to Initiative 1 until the end of the following Assault phase.',
    nameRus : 'Контузящее',    
    textRus : 'Инициатива модели, получившей одно или более неспасённых ранений от оружия с этим специальным правилом, снижается до 1 пункта до конца последующей фазы наступления.'
}, {
    specialRuleName: 'CounterAttack',
    visibleName: 'Counter-attack',
    textEng : 'If a unit contains at least one model with this special rule, and that unit is charged, every model with the Counter-attack special rule in the unit gets +1 Attack until the end of the phase. If, when charged, the unit was already locked in combat, the Counter-attack special rule has no effect.',
    nameRus : 'Контратака',    
    textRus : 'При нападении на боевую единицу, содержащую хотя бы одну модель с этим специальным правилом, она (боевая единица) должна немедленно пройти тест на лидерство. Если тест удачный, каждая модель боевой единицы, имеющая специальное правило контратака», получает +1 атаку до конца фазы.\n\nЕсли при нападении на боевую единицу она уже была связана боем, то правило контратака» не действует. '
}, {
    specialRuleName: 'Crusader',
    visibleName: 'Crusader',
    textEng : 'A unit that contains at least one model with this special rule rolls an extra dice when making Run moves, and uses the highest result rolled. In addition, a unit that contains at least one model with this special rule adds D3 to its Sweeping Advance totals (roll each time).',
    nameRus : 'Крестоносец',    
    textRus : 'Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, бросает дополнительный кубик, когда собирается бежать, и использует самый большой выпавший результат. Вдобавок, боевая единица, содержащая хотя бы одну модель с этим специальным правилом, добавляет D3 к общему значению при броске на преследование (кидается каждый раз).'
}, {
    specialRuleName: 'Daemon',
    visibleName: 'Daemon',
    textEng : 'Models with the Daemon special rule have a 5+ invulnerable save, and also have the Fear special rule.',
    nameRus : 'Крестоносец',    
    textRus : 'Модели со специальным правилом демон» имеют непробиваемый спас-бросок на 5+, а также обладают специальным правилом устрашение».'
}, {
    specialRuleName: 'DestroyerWeapons',
    visibleName: 'Destroyer Weapons',
    textEng : 'If a weapon has a D instead of a Strength value in its profile, it is a Destroyer weapon. To resolve a Destroyer weapon’s attack, roll To Hit as you would for a standard attack. If the attack hits, roll on the table above instead of rolling To Wound or for armour penetration. Most Destroyer Weapons have AP1 or AP2, so armour saves are not typically allowed. Cover saves and invulnerable saves can be taken against hits from a Destroyer weapon as normal, unless a Devastating Hit or Deathblow result is rolled. For the purposes of determining if a Destroyer hit has the Instant Death special rule, assume it has Strength 10. Multiple Wounds/Hull Points inflicted by a Destroyer hit do not carry over to other models in the unit (any excess are lost).\n\nDestroyer Weapon Attack Table\n\nD6\n\nVehicle or Building\n\nNon-vehicle\n\n1\n\nVehicle or Building - Lucky Escape: The model is unharmed.\n\nNon-vehicle - Lucky Escape: The model is unharmed.\n\n2-5\n\nVehicle or Building - Solid Hit: The model suffers a penetrating hit that causes it to lose D3 Hull Points instead of 1.\n\nNon-vehicle - Seriously Wounded: The model suffers a hit that wounds automatically and causes it to lose D3 Wounds instead of 1.\n\n6\n\nVehicle or Building - Devastating Hit: The model suffers a penetrating hit that causes it to lose D6+6 Hull Points instead of 1. No saves of any kind are allowed against this hit. \n\nNon-vehicle - Deathblow: The model suffers a hit that wounds automatically and causes it to lose D6+6 Wounds instead of 1. No saves of any kind are allowed against this hit.',
    nameRus : 'Деструктивные орудия',    
    textRus : 'Если в профиле орудия вместо показателя силы стоит D» (Destroyer), значит, оно имеет специальное правило деструктивное орудие». Чтобы отыграть атаку деструктивного орудия, сделайте бросок на попадание, как при обычной атаке. При попадании сделайте бросок по таблице наверху вместо броска на ранение или на пробитие брони. У большинства видов деструктивных орудий AP1 или AP2, так что спас-броски за броню, как правило, не дозволяются. Спас-броски за укрытие и непробиваемые спас-броски применяются как обычно, если только не выпадают результаты опустошительное попадание» или смертельный удар». Чтобы определить, получило ли попадание деструктивного орудия спецправило мгновенная смерть», допускайте, что оно имеет силу 10. Если деструктивное орудие при попадании наносит несколько ранений или снимает несколько пунктов брони, не распределяйте их на другие модели боевой единицы (любые излишки просто сгорают).\n\nТаблица атаки деСтруктивного орудия\n\nТехника или строение \n\nНе техника \n\n1 \n\nВезение: модель невредима. \n\nВезение: модель невредима. \n\n2-5 \n\nТяжёлое попадание: модель получает пробивающее попадание, которое снимает D3 пункта брони вместо одного. \n\nТяжёлое ранение: модель получает попадание, которое наносит автоматическое ранение и забирает D3 раны вместо одной.\n\n6\n\nОпустошительное попадание: модель получает пробивающее попадание, которое снимает D6+6 пунктов брони вместо одного. Никакого рода спас-броски не дозволяются.\n\nСмертельный удар: модель получает попадание, которое наносит автоматическое ранение и забирает D6+6 ран вместо одной. Никакого рода спас- броски не дозволяются.'
}, {
    specialRuleName: 'DeepStrike',
    visibleName: 'Deep strike',
    textEng : 'In order for a unit to be able to Deep Strike, all models in the unit must have the Deep Strike special rule and the unit must start the game in Reserve. When placing the unit in Reserve, you must tell your opponent that it will be arriving by Deep Strike (sometimes called Deep Strike Reserve). Some units must arrive by Deep Strike. They always begin the game in Reserve and always arrive by Deep Strike.\n\nArriving by Deep Strike\n\nRoll for the arrival of all Deep Striking units as specified in the rules for Reserves and then deploy them as follows: \n\n• First, place one model from the unit anywhere on the table, in the position where you would like it to arrive, and roll for scatter to determine the model’s final position. If a vehicle scatters when arriving via Deep Strike, do not change its facing – it must continue to face the same direction as it did before you rolled for scatter. \n\n• Next, the unit’s remaining models are arranged around the first one. Models must be placed in base contact with the first model and begin to form a circle around it. When the first circle is complete, a further concentric circle must be placed with each model touching the circle inside it. Each circle must include as many models as will fit. \n\n• Models deploying via Deep Strike treat all difficult terrain as dangerous terrain.\n\nIn the Movement phase during which they arrive, Deep Striking units may not move any further, other than to disembark from a Deep Striking Transport vehicle if they are in one.\n\nUnits Deep Striking into ruins are placed on the ground floor. Deep Striking units count non-ruined buildings (except for their battlements) as impassable terrain.\n\n In that turn’s Shooting phase, these units can fire (or Run, Turbo-boost or move Flat Out) as normal, and count as having moved in the previous Movement phase. Vehicles, except for Walkers, count as having moved at Combat Speed (even Immobilised vehicles). This can affect the number of weapons they can fire with their full Ballistic Skill.\n\nIn that turn’s Assault phase, however, these units cannot charge. This also applies to units that have disembarked from Transports that arrived by Deep Strike that turn.\n\nDeep Strike and Transports\n\nUnits do not confer the Deep Strike special rule onto a Transport vehicle they are embarked inside. A Transport vehicle with Deep Strike may Deep Strike regardless of whether its passengers have Deep Strike or not.\n\nDeep Strike Mishaps\n\n Deep Striking onto a crowded battlefield can be dangerous, as one may miss the intended objective or even materialise inside solid rock! If any of the models in a Deep Striking unit cannot be deployed, because at least one model would land partially or fully off the table, in impassable terrain, on top of a friendly model, or on top of or within 1" of an enemy model, something has gone wrong. The controlling player must roll on the Deep Strike Mishap table and apply the results. If the unfortunate unit is also a Transport, the Deep Strike Mishap result applies to both the unit and anything embarked within it.\n\nDeep Strike Mishap Table\n\nD6 - Effect\n\n1 - Terrible Accident! Teleporting units are lost in the Warp, deep striking jump units are shot down, or some other suitably dramatic event occurs. The entire unit is destroyed!\n\n2-3 - Misplaced. The coordinates were inaccurate or the enemy has jammed your instruments. Your opponent may deploy the unit anywhere on the table (excluding impassable terrain, but including difficult terrain, which of course counts as dangerous for Deep Striking units), in a valid Deep Strike formation, but without rolling for scatter. Units embarked on a misplaced Transport can disembark during their Movement phase as normal.\n\n4-6 - Delayed. Because of mechanical failure or enemy action, the reinforcements are delayed. The unit is placed in Ongoing Reserves.',
    nameRus : 'Глубокий удар',    
    textRus : 'Таблица несчастных случаев при глубоком ударе \n\nтаблица неСчаСтных Случаев при глубокоМ ударе\n\nРезультат\n\n1 Ужасное происшествие! Телепортированные боевые единицы исчезают в варпе, прыжковые боевые единицы расстреливаются в воздухе или происходит какое-нибудь другое соответствующее драматическое событие. В общем, вся боевая единица уничтожается!\n\n2 3 Затерявшиеся. Были ли координаты немного неточными или же это противник вам помешал? Ваш соперник может поставить боевую единицу где угодно на столе (за исключением непроходимого ландшафта, но включая труднопроходимый ландшафт, который, разумеется, считается опасным для боевых единиц, прибывших посредством глубокого удара) в правильном порядке при глубоком ударе, но без бросков на смещение. Боевые единицы, погруженные в затерявшийся транспорт, могут высаживаться в своей фазе движения как обычно.\n\n4 5 6 Задержавшиеся. Из-за технической поломки или вражеских действий подкрепления задерживаются. Боевая единица переходит в действующие резервы (с. 136).\n\nДля того чтобы боевая единица смогла провести глубокий удар, все её модели должны обладать данным специальным правилом, и к тому же боевая единица должна начинать игру в резерве. Убирая боевую единицу в резерв, вы должны предупредить своего соперника, что она прибудет посредством глубокого удара (иногда говорят прибудет из глубокого резерва»).\n\nНекоторые боевые единицы должны прибывать только посредством глубокого удара. Они всегда начинают игру в резерве и всегда прибывают только посредством глубокого удара. При подсчете количества боевых единиц, которые можно убрать в резерв, не учитываются боевые единицы (вместе с любыми погруженными на/в них моделями), способные прибывать только посредством глубокого удара. Вдобавок, боевая единица, которая должна прибывать посредствам глубокого удара (например, десантная капсула), должна так делать, даже если вы играете в специальную миссию, где не используется специальное правило резервы». Разумеется, все миссии Вечной войны, представленные дальше, используют резервы, поэтому чаще всего вы можете не беспокоиться об этой особенности.\n\nПрибытие посредством глубокого удара\n\nДелайте броски за прибытие всех боевых единиц, использующих глубокий удар, как установлено в правилах на резервы, и затем расставляйте их следующим образом:\n\nВо-первых, поместите одну модель боевой единицы в любое место на столе, куда бы вы хотели, чтобы она прибыла, и бросьте кубик смещения для определения окончательной позиции модели. Если техника смещается, прибывая посредством глубокого удара, не меняйте её направление – она должна продолжать смотреть в том же направлении, что и до броска на смещение.\nВо-вторых, остальные модели боевой единицы расставляются вокруг первой. Модели необходимо располагать вокруг первой в базовом контакте с ней. По завершении заполнения первого круга модели размещаются в последующих внешних кругах так, чтобы они соприкасались с моделями внутреннего круга. Каждый круг должен включать как можно больше моделей.\nПри расстановке прибывших посредством глубокого удара моделей труднопроходимый ландшафт считается опасным.\nВ фазе движения (во время которой они и прибывают) боевые единицы, использующие глубокий удар, не могут больше передвигаться, кроме как при высадке из транспортной техники, прибывшей посредством глубокого удара, если они в ней находились. Боевые единицы, появляющиеся посредством глубоком удара в руинах, расставляются на первом этаже. Прибывающие посредством глубокого удара боевые единицы считают неразрушенные строения (за исключением их парапетов) непроходимым ландшафтом.\n\nВ фазе стрельбы текущего хода данные боевые единицы могут стрелять (или бежать) как обычно и, разумеется, считаются передвигавшимися в прошлой фазе движения. Техника (за исключением шагоходов) считается двигавшейся на крейсерской скорости (даже неподвижная техника). Это влияет на количество орудий, из которых они могут стрелять с целым показателем навыка стрельбы (см. стр. 71). \n\nВ фазе наступления текущего хода, однако, данные боевые единицы не могут нападать. Это также относится к боевым единицам, которые высадились из транспортов, прибывших посредством глубокого удара в этом ходе, в том числе и десантно-штурмовых. \n\nНесчастные случаи при глубоком ударе\n\nСовершение глубокого удара посреди живых толп на поле боя может быть опасно, так как можно появиться за мили от намеченного места или даже материализоваться внутри твёрдой скалы! Если какую-либо модель прибывающей по- средством глубокого удара боевой единицы нельзя поста- вить, потому что хотя бы одна модель приземлится частич- но или полностью за столом, на непроходимом ландшафте, над дружественной или вражеской моделью, а также в пре- делах 1" от вражеской модели, значит что-то пошло не так. Управляющий игрок должен кинуть D6 за несчастный слу- чай при глубоком ударе и следовать правилам по выпавшему результату. Если неудачливая боевая единица оказывается ещё и транспортом, тогда результат несчастного случая при глубоком ударе относится как к самой боевой единице, так и ко всем погруженным в неё.'
}, {
    specialRuleName: 'DropPodAssault',
    visibleName: 'Drop Pod Assault',
    textEng : 'Drop Pods and units embarked upon them must be held in Deep Strike Reserve. At the beginning of your first turn, half of your Drop Pods (rounding up) automatically arrive from Reserve. The arrival of remaining Drop Pods is rolled for normally. Once a Drop Pod lands, all passengers must disembark and no models can embark for the rest of the game.',
    nameRus : 'Штурм посредством десантных капсул',    
    textRus : ''
}, {
    specialRuleName: 'EternalWarrior',
    visibleName: 'Eternal warrior',
    textEng : 'If a model with this special rule suffers an unsaved Wound from an attack that inflicts Instant Death, it only reduces its Wounds by 1, instead of automatically reducing its Wounds to 0.',
    nameRus : 'Вечный воин',    
    textRus : 'Если модель с этим специальным правилом получает неспасённое ранение при атаке, приводящей к мгновенной смерти, данная атака просто отнимает одну из ран, а не автоматически снижает их до 0.'
}, {
    specialRuleName: 'Fear',
    visibleName: 'Fear',
    textEng : 'At the start of each Fight sub-phase, a unit in base contact with one or more enemy models that cause Fear must take a Leadership test (called a Fear test) before any blows are struck. If the test is passed, all is well and there is no effect. If the test is failed, the unit succumbs to fear – all models in the unit have their Weapon Skill reduced to 1 for the remainder of that Fight sub-phase. Note that a model that causes Fear is not itself immune to Fear, and will still need to take a Fear test if it is base contact with any enemy models that cause Fear.',
    nameRus : 'Устрашение',    
    textRus : 'В начале каждой подфазы схватки боевая единица, находящаяся в базовом контакте с одной или более вражескими моделями со специальным правилом устрашение», должна пройти тест на лидерство (называемый те- стом на устрашение) перед нанесением каких-либо ударов.\n\nЕсли тест пройден, все хорошо и ничего не происходит. Если тест провален, боевая единица поддается страху – навыки ближнего боя всех моделей боевой единицы снижаются до 1 пункта до конца текущей подфазы схватки.\n\nУчтите, что некоторые боевые единицы менее уязвимы перед устрашением, чем другие. Боевые единицы, содержащие одну или более моделей со специальными правилами и не познают они страха» или бесстрашие», автоматически проходят тесты на устрашение. Тем не менее, сама модель с правилом устрашение», не имеет невосприимчивости к устрашению.'
}, {
    specialRuleName: 'Fearless',
    visibleName: 'Fearless',
    textEng : 'Units containing one or more models with the Fearless special rule automatically pass Pinning, Fear, Regroup tests and Morale checks, but cannot Go to Ground and cannot choose to fail a Morale check due to the Our Weapons Are Useless rule. If a unit has Gone to Ground and then gains the Fearless special rule, all the effects of Go to Ground are immediately cancelled.',
    nameRus : 'Бесстрашие',    
    textRus : 'Боевые единицы, содержащие одну или более моделей со специальным правилом бесстрашие», автоматически проходят тесты на подавление огнём, устрашение, перегруппировку и боевой дух, но не могут залегать и добровольно проваливать проверку на боевой духпо правилу наше оружие бесполезно» (с. 53). Если боевая единица залегла,а уже потом получила спецправило бесстрашие», залегание немедленно прекращается.'
}, {
    specialRuleName: 'FeelNoPain',
    visibleName: 'Feel no pain',
    textEng : 'When a model with this special rule suffers an unsaved Wound, it can make a special Feel No Pain roll to avoid being wounded (this is not a saving throw and so can be used against attacks that state that ‘no saves of any kind are allowed’, for example those inflicted by Perils of the Warp). Feel No Pain saves may not be taken against Destroyer attacks or against unsaved Wounds that have the Instant Death special rule. Roll a D6 each time an unsaved Wound is suffered. On a 4 or less, you must take the Wound as normal. On a 5+, the unsaved Wound is discounted – treat it as having been saved.\n\nIf a unit has the Feel No Pain special rule with a number in brackets afterwards – Feel No Pain (6+), for example – then the number in brackets is the D6 result needed to discount the Wound.',
    nameRus : 'Не ведая боли',    
    textRus : 'Когда модель с этим специальным правилом получает неспасённое ранение, она может сделать специальный бросок по правилу не ведая боли», чтобы избежать ранения (но это не считается спас-броском, так что им можно воспользоваться против атак, в которых говорится, что никакого рода спас-броски не дозволяются).\n\nУчтите, что броски по правилу не ведая боли» нельзя совершать против деструктивных атак (с. 163) или при неспасённых ранениях, вызывающих мгновенную смерть.\n\nБросайте D6 каждый раз при получении неспасённого ранения. При выпадении значений от 4 и меньше вы получаете ранение как обычно. На 5+ неспасённое ранение исчезает, и считается, что спас- бросок за это ранение был успешным.\n\nЕсли боевая единица имеет специальное правило не ведая боли» с заключённым в скобки числом – например, не ведая боли (6+)» – тогда число в скобках показывает необходимый результат D6 для отмены ранения.'
}, {
    specialRuleName: 'Fleet',
    visibleName: 'Fleet',
    textEng : 'A unit composed entirely of models with this special rule can re-roll one or more of the dice when determining Run moves and charge ranges (such as a single D6 from a charge range roll, for example).',
    nameRus : 'Проворность',    
    textRus : 'Боевая единица, целиком состоящая из моделей с этим специальным правилом, может перебросить один или более кубиков при определении расстояния бега или нападения (как, например, единственный D6 при броске на преодоление расстояния нападения).'
}, {
    specialRuleName: 'Fleshbane',
    visibleName: 'Fleshbane',
    textEng : 'If a model has this special rule, or is attacking with a Melee weapon that has this special rule, they always Wound on a 2+ in close combat. Similarly, if a model makes a shooting attack with a weapon that has this special rule, they always Wound on a 2+. In either case, this special rule has no effect against vehicles or building',
    nameRus : 'Губитель плоти',    
    textRus : 'Если модель имеет это специальное правило или атакует рукопашным оружием с этим специальным правилом, она всегда наносит ранение на 2+ в ближнем бою. Аналогичным образом, если модель производит стрелковую атаку оружием с этим специальным правилом, она всегда наносит ранение на 2+. В любом случае данное специальное правило не действует на технику или строения.'
}, {
    specialRuleName: 'Force',
    visibleName: 'Force',
    textEng : 'Any Psyker that has one or more weapons with this special rule knows the Force psychic power in addition to any other powers they know:\n\nForce - Warp Charge 1\n\n The psyker channels his powers through the psi-circuitry of his force weapon, transforming it from a mere physical weapon into one that can rend reality. Force is a blessing psychic power that targets the Psyker and his unit. All of the targets’ weapons that have the Force special rule gain the Instant Death special rule until the start of your next Psychic phase.',
    nameRus : 'Психосиловое',    
    textRus : 'Любой псайкер, имеющий одну или более единиц оружия с этим спецправилом, знает психосилу ментальная мощь» в дополнение к любым другим изученным им силам.\n\nМентальная Мощь\n\n1 варп-заряд\n\nПсайкер направляет ментальные силы в пси- схемы своего психосилового оружия, преобразуя его из обычного в такое, которое способно разрывать реальность. Ментальная мощь считается благословением, направляемым на самого псайкера и его боевую единицу. Всё их оружие со специальным правилом психосиловое» получает спецправило мгновенная смерть» до начала вашей следующей пси-фазы.'
}, {
    specialRuleName: 'FuriousCharge',
    visibleName: 'Furious charge',
    textEng : 'In a turn in which a model with this special rule charges into combat, it adds +1 to its Strength characteristic until the end of the Assault phase. A model that has made a disordered charge that turn receives no benefit from Furious Charge.',
    nameRus : 'Яростное нападение',    
    textRus : 'Во время хода, в котором модель с этим специальным правилом нападает, ей добавляется +1 пункт к показателю силы до конца текущей фазы. Модель, совершившая беспорядочное нападение в этом ходе, не получает никаких преимуществ от яростного нападения» (см. с. 54).'
}, {
    specialRuleName: 'GetsHot',
    visibleName: 'Gets hot',
    textEng : 'When firing a weapon that Gets Hot, roll To Hit as normal. For each To Hit roll of 1, the firing model immediately suffers a Wound (armour or invulnerable saves can be taken) – this Wound cannot be allocated to any other model in the unit. A character cannot make a Look Out, Sir attempt to avoid a Wound caused by the Gets Hot special rule. A vehicle instead rolls a D6 for each roll of a 1 to hit. On a roll of a 1, 2 or 3 it suffers a glancing hit.\n\nGets Hot and Weapons that do not roll To Hit\n\n Weapons that do not roll To Hit (such as Blast weapons) must roll a D6 for each shot immediately before firing. On a 2+, the shot is resolved as normal. For each roll of a 1, the weapon Gets Hot; that shot is not fired and the firing model immediately suffers a single Wound (armour saves or invulnerable saves can be taken) – this Wound cannot be allocated to any other model in the unit. A character cannot make a Look Out, Sir attempt to avoid a Wound caused by the Gets Hot special rule. A vehicle instead suffers a glancing hit on a further roll of a 1, 2 or 3.\n\nGets Hot and Re-rolls\n\nIf a model has the ability to re-roll its rolls To Hit (including because of BS6+ or the Twin-linked special rule), a Wound is only suffered if the To Hit re-roll is also a 1; it may also re-roll Gets Hot results of 1 for weapons that do not roll To Hit.',
    nameRus : 'Перегрев',    
    textRus : 'При стрельбе из перегревающегося оружия бросайте кубики на попадание как обычно. За каждое выпадение 1 на кубике стреляющая модель немедленно получает ранение (спас-броски за броню и непробиваемые спас-броски дозволяются), которое нельзя перераспределить на какую-либо другую модель боевой единицы. Соответственно, персонажам нельзя пытаться избежать ранения от перегрева, прибегнув к правилу берегитесь, сэр». Техника же вместо этого кидает D6 при каждом выпадении 1 в ходе бросков на попадание из перегревающегося оружия и получает скользящее попадание при выпадении 1, 2 или 3.\n\nПерегрев и оружие, не совершающее броски на попадание\n\nОружие, не совершающее броски на попадание (как, например, оружие взрывного типа), непосредственно перед стрельбой должно кидать D6 за каждый выстрел. При выпадении 2+ выстрел отыгрывается как обычно. При каждом выпадении 1 оружие перегревается. Выстрел не происходит, а стреляющая модель немедленно получает ранение (спас-броски за броню и непробиваемые спас-броски дозволяются), которое нельзя перераспределить на какую-либо другую модель боевой единицы. Соответственно, персонажам нельзя пытаться избежать ранения от перегрева, прибегнув к правилу "берегитесь, сэр". Техника же вместо этого получает скользящее попадание при выпадении 1, 2 или 3.\n\nПерегрев и перебрасывания\n\nЕсли модель имеет способность перебрасывать броски на попадание (в том числе, если у неё BS6+ или это спаренное оружие), она получает ранение только в том случае, если и при повторном броске на попадание выпадает 1. Модель также может при выпадении 1 перебрасывать результаты перегрева» оружия, не совершающего броски на попадание.'
}, {
    specialRuleName: 'GravWeaponry',
    visibleName: 'Grav-weaponry',
    textEng : 'The secrets of grav-weapon construction are known only to a precious few; their design is based upon the graviton weaponry many Legions employed during the Heresy, but those secrets are still locked away in the deepest vaults on Mars. Only Techmarines who show the greatest promise are entrusted with the sacred binary psalms detailing the assembly and maintenance of such weapons. In battle, grav-weaponry affects the local gravity field, using its victim\'s own mass against them, an ordeal that will stun those it does not kill outright. Heavily armoured targets find themselves crushed as by the mighty fist of the Emperor himself, while vehicles are left as crumpled, smoke belching wrecks.\n\nДальность   Сила    АР  Тип\nGrav-pistol 12" *   2   Пистолет, Контузящее, Graviton\nGrav-gun    18" *   2   Salvo 2/3, Контузящее, Graviton\nGrav-cannon 24" *   2   Salvo 3/5, Контузящее, Graviton\n\nGraviton: The roll needed To Wound when firing a grav-weapon is always equal to the armour save of the target, to a minimum of 6+. For example, when resolving a hit against a Space Marine in power armour you would need a 3+ To Wound. When resolving a hit against a vehicle, roll a D6 for each hit instead of rolling for armour penetration as normal. On a 1-5 nothing happens, but on a 6, the target suffers an lmmobilised result and loses a single Hull Point. Grav-weapons have no effect on buildings.\n\nCombi-grav \n\nThis relatively rare combi-weapon variant incorporates a single-shot grav-gun, allowing the wielder a potent graviton attack when the fighting is fiercest without sacrificing the bolter\'s formidable wrath.\n\nA combi-grav is a combi-weapon (see the Warhammer 40,000 rulebook for details) that incorporates a grav-gun (see above) as the secondary weapon. ',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Graviton',
    visibleName: 'Graviton',
    textEng : 'The roll needed To Wound when firing a weapon with this special rule is always equal to the armour save of the target, to a minimum of 6+. For example, when resolving a hit against a model with a 3+ armour save, you would need a 3+ To Wound. When resolving a hit against a vehicle, roll a D6 for each hit instead of rolling for armour penetration as normal. On a 1-5 nothing happens, but on a 6, the target suffers an Immobilised result and loses a Hull Point. These weapons have no effect on buildings.',
    nameRus : 'Гравитонное',    
    textRus : 'При стрельбе из оружия с этим специальным правилом значение броска, необходимого для нанесения ранения, всегда равно показателю спас-броска за броню цели (минимум нужно выкинуть 6+). Например, при отыгрыше попадания против модели со спас-броском за броню на 3+ вам нужно выбросить 3 или больше для нанесения ранения. При отыгрыше попадания против техники кидайте D6 за каждое попадание вместо проведения привычного броска на пробитие брони. На 1-5 ничего не происходит, а при выпадении 6 техника обездвиживается и теряет пункт брони. Данное оружие не действует на строения.'
}, {
    specialRuleName: 'GravAmp',
    visibleName: 'Grav-amp',
    textEng : 'When rolling to Wound with a grav-weapon, or to determine its effects on a vehicle, the bearer can re-roll the result.',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'HammerOfWrath',
    visibleName: 'Hammer ofWrath',
    textEng : 'If a model with this special rule ends its charge move in base or hull contact with an enemy model, it makes one additional Attack that hits automatically and is resolved at the model’s unmodified Strength with AP-. This Attack does not benefit from any of the model’s special rules (such as Furious Charge, Rending etc.). This Attack is resolved during the Fight sub-phase at the Initiative 10 step, but does not grant the model an additional Pile In move.\n\nIf a model with this special rule charges a building or vehicle, the hit is resolved against the Armour Value of the facing the charging model is touching. If a model with this special rule charges a building or vehicle that is a Transport or a Chariot, the hit is resolved against the building or vehicle, not the occupants or the rider.',
    nameRus : 'Молот ярости',    
    textRus : 'Если модель с этим правилом завершает свой наступательный манёвр в базовом или корпусном контакте с вражеской моделью, она делает одну дополнительную атаку, которая наносит автоматическое попадание, отыгрываемое с немодифицированной силой модели и AP-. Эта атака не получает бонусов от каких-либо специальных правил модели (таких как яростное нападение», раздирающее» и т.д.). Данная атака отыгрывается во время подфазы схватки на 10 этапе инициативы, но не предоставляет модели дополнительного манёвра ввязывания в бой.\n\nЕсли модель с этим специальным правилом нападает на строение или технику, попадание отыгрывается против показателя брони той стороны, с которой соприкасается нападающая модель. Если модель с этим специальным правилом нападает на строение или технику, которая относится к транспорту или колеснице, попадания по правилу молот ярости» отыгрываются по строению или технике, а не по занявшим строение моделям или наезднику.'
}, {
    specialRuleName: 'Hatred',
    visibleName: 'Hatred',
    textEng : 'This rule is often presented as Hatred (X) where X identifies a specific type of foe. If the special rule does not specify a type of foe, then the unit has Hatred against everyone. This can refer to a Faction, or a specific unit. For example, Hatred (Orks) means any model with the Ork Faction, whilst Hatred (Big Meks) means only Big Meks. A model striking a hated foe in close combat re-rolls all failed To Hit rolls during the first round of each close combat.',
    nameRus : 'Ненависть',    
    textRus : 'Обычно та или иная модель питает ненависть к определенному виду врагов; в подобных случаях после специального правила в скобках будет указана та самая невезучая цель. Данное правило может относиться как ко всей армии, так и к определенной боевой единице этой армии.\n\nНапример, ненависть (орки)» означает любую модель из кодекса орков, в то время как ненависть (ба\'шие меки)» означает только ба\'ших меков. Модель, атакующая заклятого врага в ближнем бою, перебрасывает все неудачные кубики во время первого раунда каждого боя, но уже в последующих раундах она не перебрасывает кубики по правилу ненависть». '
}, {
    specialRuleName: 'HellfireShells',
    visibleName: 'Hellfire shells',
    textEng : 'Each time a weapon equipped with hellfire shells fires, the controlling player can choose whether to fire a hellfire shell or to use the ordinary profile for that weapon.',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Hatred_ChaosSpaceMarine',
    visibleName: 'Hatred (Chaos Space Marine)',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Heavy_1',
    visibleName: 'Heavy 1',
    textEng : '',
    nameRus : 'Тяжелое 1',    
    textRus : ''
}, {
    specialRuleName: 'Heavy_2',
    visibleName: 'Heavy 2',
    textEng : '',
    nameRus : 'Тяжелое 2',    
    textRus : ''
}, {
    specialRuleName: 'Heavy_3',
    visibleName: 'Heavy 3',
    textEng : '',
    nameRus : 'Тяжелое 3',    
    textRus : ''
}, {
    specialRuleName: 'Heavy_4',
    visibleName: 'Heavy 4',
    textEng : '',
    nameRus : 'Тяжелое 4',    
    textRus : ''
}, {
    specialRuleName: 'Heavy_15',
    visibleName: 'Heavy 15',
    textEng : '',
    nameRus : 'Тяжелое 15',    
    textRus : ''
}, {
    specialRuleName: 'Heavy_20',
    visibleName: 'Heavy 20',
    textEng : '',
    nameRus : 'Тяжелое 20',    
    textRus : ''
},  {
    specialRuleName: 'Haywire',
    visibleName: 'Haywire',
    textEng : 'When a weapon with this special rule hits a vehicle, roll a D6 to determine the effect rather than rolling for armour penetration normally:\n\nD6 - Result\n\n1 - No effect\n\n2-5 - Glancing hit\n\n6 - Penetrating hit',
    nameRus : 'Электромагнитное',    
    textRus : 'Когда оружие с этим специальным правилом попадает по технике, бросьте D6 для определения воздействия на технику вместо обычного броска на пробитие брони: \n\nD6  Результат\n1   Никакого воздействия\n2-5 Скользящее попадание\n6   Пробивающее попадание\n'
},  {
    specialRuleName: 'HitAndRun',
    visibleName: 'Hit and run',
    textEng : 'A unit that contains at least one model with this special rule that is locked in combat can choose to leave close combat at the end of any Assault phase. If the unit wishes to do so, it must take an Initiative test.\n\n If the test is failed, nothing happens and the models remain locked in the fight. \n\nIf the test is passed, choose a direction – then roll 3D6. As long as the distance rolled, in inches, is sufficient to allow the entire unit to move over 1" away from all of the enemy units they are locked in combat with, the unit breaks away from combat and must immediately move a number of inches in the chosen direction equal to the 3D6 result, ignoring the models they were locked in combat with. No Sweeping Advance rolls are made. Enemy units that are no longer locked in combat immediately Consolidate D6". \n\nA Hit & Run move is not slowed by difficult terrain, but takes Dangerous Terrain tests as normal. It may not be used to move into base or hull contact with enemy units, and models instead stop 1" away. If there are units with this rule on both sides who wish to disengage, roll-off to determine who goes first and then alternate disengaging them. If the last of these ends up no longer in combat, it Consolidates instead.',
    nameRus : 'Ударил-отступил',    
    textRus : 'Боевая единица, которая содержит хотя бы одну модель с этим специальным правилом и связана боем, может по желанию выйти из ближнего боя в конце любой фазы наступления. В таком случае она должна пройти тест на инициативу.\n\nЕсли тест провален, ничего не случается, и модели так и остаются связаны боем.\n\nЕсли тест успешно пройден, выберите направление и затем киньте 3D6".При условии, что выброшенного расстояния хватает, чтобы позволить вашей боевой единице уйти более чемна 1" от всех вражеских боевых единиц, боевая единица вырывается из боя и немедленно двигается в указанном направлении на равное результату броска количество дюймов, не обращая внимания на вражеские боевые единицы, с которыми была связана боем. Броски на преследование не дозволяются. Вражеские боевые единицы, уже не связанные боем, немедленно объединяются на D6".\n\nПри движении по правилу ударил- отступил» боевая единица не замедляется на труднопроходимом ландшафте, но проходит тесты на преодоление опасного ландшафта как обычно. Движение по данному правилу нельзя использовать, чтобы вступить в базовый или корпусный контакт с вражескими боевыми единицами, ваши модели должны остановиться в 1" от них. Если у обеих сторон есть боевые единицы, которые хотят выйти из боя, то методом кубовки определите, кто ходит первым, и затем поочерёдно выведите их. Последняя боевая единица, которая больше не связана боем, вместо этого объединяется.'
}, {
    specialRuleName: 'HoverStrike',
    visibleName: 'Hover Strike',
    textEng : 'At the start of its Movement phase, a model with this special rule can declare that it is making a special Hover Strike this turn. If it does so, its unit type changes to Skimmer until the start of its next Movement phase. It gains the Strafing Run special rule but cannot move, except to pivot on the spot. ',
    nameRus : 'Парящий удар',    
    textRus : 'В начале своей фазы движения модель с этим специальным правилом может объявить, что она совершает в этом ходе специальный парящий удар. В этом случае её класс боевой единицы меняется на скиммер» до начала её следующей фазы движения. Она получает специальное правило атака с бреющего полёта», но не может двигаться, кроме как разворачиваться на месте.'
}, {
    specialRuleName: 'IgnoresCover',
    visibleName: 'Ignores cover',
    textEng : 'Cover saves cannot be taken against Wounds, glancing hits or penetrating hits caused by weapons with the Ignores Cover special rule.',
    nameRus : 'Укрытие не спасет',    
    textRus : 'Спас-броски за укрытие не дозволяются при ранениях от оружия со специальным правилом укрытие не спасает». '
}, {
    specialRuleName: 'Immobile',
    visibleName: 'Immobile',
    textEng : 'A Drop Pod cannot move once it has entered play, and counts in all respects as a vehicle that has suffered an Immobilised result that cannot be repaired in any way. This does not cause it to lose a Hull Point.',
    nameRus : 'Обездвиженная',    
    textRus : '***Десантная капсула не может двигаться после того, как войдет в игру, и во всех отношениях считается за технику, получившую результат обездвижена», который никак нельзя исправить.'
}, {
    specialRuleName: 'IndependentCharacter',
    visibleName: 'Independent character',
    textEng : 'Independent Characters can join other units. They cannot, however, join units that contain vehicles or Monstrous Creatures. They can join other Independent Characters, though, to form a powerful multi-character unit!\n\nJoining and Leaving a Unit\n\nAn Independent Character can begin the game already with a unit, either by being deployed in unit coherency with it or, if the unit is in Reserve, by you informing your opponent of which unit it has joined.\n\n In order to join a unit, an Independent Character simply has to move so that he is within the 2" unit coherency distance of a friendly unit at the end of their Movement phase. If the Independent Character is within 2" of more than one unit at the end of its Movement phase, the player must declare which unit it is joining. If an Independent Character does not intend to (or cannot) join a unit, it must (where possible) remain more than 2" away from it at the end of the Movement phase. This is to make clear whether they have joined a unit or not. Note that, after an Independent Character joins a unit, that unit can move no further that Movement phase.\n\nAn Independent Character can leave a unit during the Movement phase by moving out of unit coherency with it. He cannot join or leave during any other phase – once shots are fired or charges are declared, it is too late to join in or duck out!\n\nAn Independent Character cannot leave a unit while either he or the unit is in Reserves, locked in combat, Falling Back or has Gone to Ground. He cannot join a unit that is in Reserves, locked in combat or Falling Back. If an Independent Character joins a unit, and all other models in that unit are killed, he again becomes a unit of one model at the start of the following phase.\n\nWhile an Independent Character is part of a unit, he counts as part of the unit for all rules purposes, though he still follows the rules for characters.\n\nLook Out, Sir\n\nIndependent Characters pass Look Out, Sir rolls on a 2+.\n\nHeroic Morale\n\nA unit that contains one or more Independent Characters does not need a double 1 to Regroup if reduced to below 25% of its starting numbers, but instead tests as if it had at least 25% remaining.\n\nSpecial Rules\n\nWhen an Independent Character joins a unit, it might have different special rules from those of the unit. Unless specified in the rule itself (as in the Stubborn special rule), the unit’s special rules are not conferred upon the Independent Character, and the Independent Character’s special rules are not conferred upon the unit. Special rules that are conferred to the unit only apply for as long as the Independent Character is with them.\n\nIndependent Characters and Infiltrate\n\nAn Independent Character without the Infiltrate special rule cannot join a unit ofInfiltrators during deployment.\n\nIndependent Characters and Ongoing Effectsn\n\nSometimes, a unit that an Independent Character has joined will be the target of a beneficial or harmful effect, such as those bestowed by the Blind special rule, for example. If the character leaves the unit, both he and the unit continue to be affected by the effect, so you’ll need to mark the character accordingly.\n\nFor example, Farseer Mehiledrin and his unit of Eldar Guardians are set ablaze by a weapon with the Soul Blaze special rule. If Mehiledrin leaves the unit, both he and the Guardians will still be ablaze and the ongoing effects of the Soul Blaze rule must be resolved separately.\n\nConversely, if an Independent Character joins a unit after that unit has been the target of an ongoing effect (or joins a unit after himself having been the target of an ongoing effect) benefits and penalties from that effect are not shared. For example, Crimson Fists Tactical Squad Hemanez is suffering the effects of the Blind special rule. If Captain Cruiz joins the unit, he does not suffer the results of the Blind special rule as he was not there when it happened!',
    nameRus : 'Независимый персонаж',    
    textRus : 'Независимые персонажи могут присоединяться к другим боевым единицам. Однако они не могут присоединяться к боевым единицам, включающим технику или монструозных созданий. Они могут присоединяться к другим независимым персонажам для образования мощной многоперсонажной боевой единицы!\n\nПрисоединение и оставление боевой единицы\n\nНезависимый персонаж может начать игру сразу с боевой единицей, если его поставить в боевое построение с ней, или, если боевая единица в резерве, сообщить вашему сопернику, к какой боевой единице он присоединился.\n\nЧтобы присоединиться к боевой единице, независимому персонажу нужно просто приблизиться так, чтобы он находился на расстоянии 2" в боевом построении с дружественной боевой единицей в конце своей фазы движения. Если независимый персонаж находится на расстоянии 2" более чем с одной боевой единицей в конце своей фазы движения, игрок должен объявить, к какой боевой единице он присоединяется. Если независимый персонаж не собирается (или не может) присоединиться к боевой единице, он должен (при возможности) оставаться на расстоянии более 2" от неё в конце фазы движения. Это необходимо, чтобы определить, присоединился ли он к боевой единице или нет. Учтите, что после того как независимый персонаж присоединится к боевой единице, данная боевая единица не может больше передвигаться в этой фазе движения.\n\nНезависимый персонаж может оставить боевую единицу во время\n\nфазы движения, просто выйдя из построения боевой единицы. Он не может присоединиться или оставить боевую единицу во время любой другой фазы – когда произведены выстрелы или объявлено о нападении, становится уже слишком поздно, чтобы присоединяться или смываться!\n\nНезависимый персонаж не может оставить боевую единицу, пока он или боевая единица находятся в резерве, связаны боем, отступают или залегли. Он не может присоединиться к боевой единице, находящейся в резерве, связанной боем или отступающей. Если независимый персонаж присоединился к боевой единице, и все остальные модели этой боевой единицы погибли, он снова становится отдельной боевой единицей из одной модели в начале последующей фазы.\n\nПока независимый персонаж состоит в боевой единице, он по всем правилам считается её частью, хотя по-прежнему следует всем правилам для персонажей.\n\nБерегитесь, сэр\n\nНезависимый персонаж выигрывает броски по правилу берегитесь, сэр» на 2+ (см. с. 100).\n\nБоевой дух героя\n\nБоевой единице, содержащей одного или более независимых персонажей, не нужен дубль 1 для перегруппировки, если от её состава осталось меньше 25% от изначального количества, но вместо этого она проходит тест так, как если бы у неё осталось хотя бы 25% состава.\n\nСпециальные правила\n\nКогда независимый персонаж присоединяется к боевой единице, то его специальные правила могут отличаться от тех, что есть у боевой единицы. Если только не указано иного в самом правиле (как, например, в специальном правиле упорство»), независимый персонаж не получает специальные правила боевой единицы, так же как и боевая единица не получает специальные правила независимого персонажа. Те специальные правила, что передаются боевой единице, действуют на неё только до тех пор, пока независимый персонаж состоит в ней.\n\nНезависимые персонажи и проникновение\n\nНезависимый персонаж без специального правила проникновение» не может присоединяться к боевым единицам лазутчиков во время расстановки.\n\nНезависимые персонажи и длящиеся воздействия\n\nИногда боевая единица, к которой присоединяется независимый персонаж, испытывает на себе полезное или вредное воздействие, как, например, получаемое при специальном правиле ослепление». Если персонаж оставляет боевую единицу, то и он, и боевая единица продолжают испытывать на себе то или иное воздействие, поэтому вам необходимо отдельно помечать персонажа.\n\nК примеру, ясновидец Мегиледрин и его боевая единица эльдарских стражников загорелись от оружия со специальным правилом душесжигатель». Если Мегиледрин оставляет боевую единицу, то и он, и стражники по-прежнему будут гореть, и длящееся воздействие душесжигателя» должно отыгрываться отдельно.\n\n\Однако если персонаж присоединяется к боевой единице после того, как боевая единица стала жертвой длящегося воздействия (или присоединяется после того, как сам стал жертвой длящегося воздействия), преимущества и штрафы от этого воздействия ему не распределяются.\n\nК примеру, тактическое отделение Хеманеза из ордена Багровых Кулаков испытывает на себе воздействие специального правила ослепление». Если капитан Круз присоединяется к боевой единице, то на него не действуют результаты специального правила ослепление», так как его не было там, когда это случилось!'
}, {
    specialRuleName: 'Infiltrate',
    visibleName: 'Infiltrate',
    textEng : 'Units that contain at least one model with this special rule are deployed last, after all other units (friend and foe) have been deployed. If both sides have Infiltrators, the players roll-off and the winner decides who goes first, then alternate deploying these units. \n\nInfiltrators can be set up anywhere on the table that is more than 12" from any enemy unit, as long as no deployed enemy unit can draw line of sight to them. This includes in a building, as long as the building is more than 12" from any enemy unit. Alternatively, they can be set up anywhere on the table more than 18" from any enemy unit, even in plain sight. \n\nIf a unit with Infiltrate deploys inside a Dedicated Transport, they may Infiltrate along with their Transport. \n\nA unit that deploys using these rules cannot charge in their first turn. Having Infiltrate also confers the Outflank special rule to units of Infiltrators that are kept as Reserves. \n\nOutflank \n\nDuring deployment, players can declare that any unit that contains at least one model with this special rule is attempting to Outflank the enemy. When this unit arrives from Reserves, but not Ongoing Reserve, the controlling player rolls a D6: on a 1-2, the unit comes in from the table edge to the left of their controlling player’s own table edge; on a 3-4, they come on from the right; on a 5-6, the player can choose left or right. Models move onto the table as described for other Reserves. \n\nIf a unit with Infiltrate deploys inside a Dedicated Transport, they may Outflank along with their Transport. \n\nInfiltrate and Scout \n\nIf a unit has both the Infiltrate and Scout special rule, that unit can deploy as per the Infiltrate special rule and then redeploy as per the Scout special rule.',
    nameRus : 'Проникновение',    
    textRus : 'Боевые единицы, содержащие хотя бы одну модель с этим специальным правилом, расставляются последними, после того как все остальные боевые единицы (дружественные или вражеские) будут расставлены. Если обе стороны имеют лазутчиков (то есть обладателей спецправила проникновение»), проводится кубовка, и победитель решает, кто начинает; затем игроки по очереди расставляют боевые единицы с этим правилом.\n\nЛазутчиков можно поставить где угодно на столе на расстоянии 12" от любых вражеских боевых единиц, от которых нельзя провести линию прямой видимости до них. Это же касается и расстановки в строениях (с. 110), при условии, что строение на расстоянии 12" от любых вражеских боевых единиц. В ином случае лазутчиков можно ставить где угодно на столе на расстоянии 18" от любых вражеских боевых единиц даже на линии прямой видимости.\n\nЕсли боевая единица с правилом проникновение» размещена в приданном транспорте, то она может воспользоваться правилом проникновение» вместе со своим транспортом.\n\nБоевая единица, которая расставляется по этим правилам, не может нападать в первом ходе.\n\nЛазутчики со специальным правилом проникновение», которые находятся в резерве (см. с. 135), получают ещё и специальное правило фланговый обход».\n\nФланговый обход\n\nВо время расстановки игроки могут объявить, что любая боевая единица, содержащая хотя бы одну модель с этим специальным правилом, пытается обойти врага с фланга.\n\nКогда такая боевая единица прибывает из резерва (но не действующего резерва), управляющий ею игрок кидает D6. На 1-2 боевая единица выходит с левого края стола относительно края стола управляющего ею игрока; на 3-4 она выходит справа; на 5-6 игрок может выбрать, с какой стороны она выйдет – справа или слева. Модели выходят на стол, как описано для всех прибывающих из резерва.\n\nЕсли боевая единица с правилом проникновение» размещена в приданном транспорте, то она может воспользоваться правилом фланговый обход» вместе со своим транспортом.\n\nЛазутчики и разведчики\n\nЕсли у боевой единицы есть и спецправило проникновение», и спецправило разведчик», данная боевая единица может расставиться по спецправилу проникновение», а затем заново расставиться по спецправилу разведчик».'
}, {
    specialRuleName: 'InstantDeath',
    visibleName: 'Instant death',
    textEng : 'If a model suffers an unsaved Wound from an attack with this special rule, it is reduced to 0 Wounds and is removed as a casualty.',
    nameRus : 'Мгновенная смерть',    
    textRus : 'Если модель получает неспасённое ранение от атаки с этим специальным правилом, её раны немедленно снижаются до 0, и модель удаляется как потеря.'
}, {
    specialRuleName: 'Interseptor',
    visibleName: 'Interseptor',
    textEng : 'At the end of the enemy Movement phase, a weapon with the Interceptor special rule can be fired at any one unit that has arrived from Reserve within its range and line of sight. If this rule is used, the weapon cannot be fired in the next turn, but the firing model can shoot a different weapon if it has one.',
    nameRus : 'Перехватывающее',    
    textRus : 'В конце фазы движения противника оружие со специальным правилом перехватывающее» может выстрелить по любой одной боевой единице, которая прибыла из резерва и находится на линии прямой видимости и в пределах досягаемости оружия. При использовании этого правила оружие не может стрелять в следующем ходе, но стреляющая модель может вести огонь из другого оружия, если оно есть.'
}, {
    specialRuleName: 'ItWillNotDie',
    visibleName: 'It will not die',
    textEng : 'At the end of each of your turns, roll a D6 for each of your models with this special rule that has less than its starting number of Wounds or Hull Points, but has not been removed as a casualty or destroyed. On a roll of 5+, that model regains a Wound, or Hull Point, lost earlier in the game.',
    nameRus : 'Оно неубиваемо',    
    textRus : 'В конце каждого дружественного хода бросайте D6 за каждую модель с этим специальным правилом, у которой осталось меньше ран или пунктов брони корпуса, чем было изначально, но она не была удалена как убитая или уничтоженная. При выпадении 5+ модель восстанавливает одну рану или пункт брони корпуса, ранее потерянные в битве.'
}, {
    specialRuleName: 'Jink',
    visibleName: 'Jink',
    textEng : 'When a unit with any models with the Jink special rule is selected as a target for a shooting attack, you may declare that it will Jink. The decision must be made before any To Hit rolls have been made. If the unit Jinks, all models in the unit with this special rule gain a 4+ cover save until the start of their next Movement phase, but they can only fire Snap Shots until the end of their next turn.',
    nameRus : 'Уклонение',
    textRus : 'Если целью стрелковой атаки становится ваша боевая единица с любыми моделями, имеющими специальное правило уклонение», вы можете объявить, что она уклоняется. Это решение необходимо принять до совершения любых бросков на попадание. Если боевая единица уклоняется, все её модели с этим специальным правилом получают спас- бросок за укрытие на 4+ до начала своей следующей фазы движения, но могут стрелять только навскидку до конца своего следующего хода.'
}, {
    specialRuleName: 'Lance',
    visibleName: 'Lance',
    textEng : 'Weapons with the Lance special rule count vehicle Armour Values that are higher than 12 as 12.',
    nameRus : 'Лэнс-излучатель',    
    textRus : 'При стрельбе из оружия с этим специальным правилом по технике с показа- телями брони выше 12, её показатели брони принимаются за 12.'
}, {
    specialRuleName: 'MasterCrafted',
    visibleName: 'Master-crafted',
    textEng : 'Weapons with the Master-crafted special rule allow the bearer to re-roll one failed roll To Hit per turn with that weapon.',
    nameRus : 'Мастерски сделанное',    
    textRus : 'Оружие со специальным правилом мастерки сделанное» позволяет его обладателю каждый ход перебрасывать один проваленный бросок на попадание этого оружия.'
}, {
    specialRuleName: 'MightyBulwark',
    visibleName: 'Mighty Bulwark',
    textEng : 'When a building with this special rule suffers a penetrating hit, there is a -1 modifier to the roll on the Building Damage table.',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'MasterTactican',
    visibleName: 'Master tactican',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Melee',
    visibleName: 'Melee',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Melta',
    visibleName: 'Melta',
    textEng : 'Ranged weapons with this special rule roll an additional D6 when rolling to penetrate a vehicle’s armour at half range or less. If the weapon is more than half its maximum range away, it rolls to penetrate as normal.\n\n If a weapon has both the Melta and Blast special rules, measure the distance to the centre of the blast marker after it has scattered. If this is half the weapon’s range or less, all hits caused by the blast marker roll an addition D6 when rolling to penetrate a vehicle’s armour. If the centre of the blast marker is more than half the weapon’s maximum range away after scatter, roll to penetrate as normal.\n\n See the Vehicles rules for more details on armour penetration.',
    nameRus : 'Мелта',    
    textRus : 'Стреляющий из дистанционного оружия с этим специальным правилом кидает дополнительный D6 при броске на пробитие брони техники, если расстояние до цели равно половине дальности действия оружия или меньше. Если расстояние до цели больше половины дальности действия оружия, стреляющий делает бросок на пробитие как обычно.\n\nЕсли у оружия есть правила мелта» и взрыв» (с. 158), отмеряйте расстояние до центра маркера взрыва после того, как он сместится. Если расстояние равно половине дальности действия оружия или меньше, стреляющий кидает дополнительный D6 при броске на пробитие брони техники за каждое попадание, нанесённое маркером взрыва. Если после смещения центр маркера взрыва находится дальше половины дальности действия оружия, делайте бросок на пробитие как обычно.\n\nСм. правила техники (с. 72) для получения подробной информации о пробитии брони.'
}, {
    specialRuleName: 'Mindlock',
    visibleName: 'Mindlock',
    textEng : 'Unless it includes a Techmarine, an unengaged unit that contains at least one model with this special rule must roll a 06 at the start of its turn. On a roll of a 4+,there is no effect this tum. On a roll of a 1 , 2 or 3, the unit is mindlocked until the stan of its following tum. A mindlocked unit may not voluntarily move, shoot or charge. A mindlocked unit must still complete compulsory moves, such as Pile In and Fall Back moves. ',
    nameRus : 'Мыслеблок',    
    textRus : 'Если в составе невовлеченной в бой боевой единицы без технодесантника есть хотя бы одна модель с этим специальным правилом, эта боевая единица должна бросить D6 в начале своего хода. При выпадении 4+ в этом ходе ничего не происходит. При выпадении 1, 2 или 3 боевая единица мыслеблокируется до начала своего следующего хода. Мыслеблокированная боевая единица не может добровольно двигаться, стрелять или нападать. Мыслеблокированная боевая единица по-прежнему должна проводить обязательные манёвры, такие как манёвры ввязывания в бой и отступления.'
}, {
    specialRuleName: 'MissileLock',
    visibleName: 'MissileLock',
    textEng : 'A model with this special rule re-rolls failed To Hit rolls when shooting any weapon that has the One Use Only special rule.\n\nIf a model with this special rule is shooting a weapon that has both the One Use Only and Blast special rules, that shot will instead scatter D6" rather than 2D6".',
    nameRus : 'Система наведения ракет',    
    textRus : 'Модель с этим специальным правилом перекидывает проваленные броски на попадание при стрельбе из любого одноразового оружия.\n\nЕсли модель с этим специальным правилом стреляет из оружия, у которого есть спецправила одноразовое» и взрыв», выстрел смещается на D6" вместо 2D6".'
}, {
    specialRuleName: 'MonsterHunter',
    visibleName: 'Monster hunter',
    textEng : 'A unit that contains at least one model with this special rule re-rolls all failed To Wound rolls against Monstrous Creatures.',
    nameRus : 'Охотник на монстров',    
    textRus : 'Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, перебрасывает все проваленные броски на ранение монструозных и летающих монструозных созданий.'
}, {
    specialRuleName: 'MoveThroughCover',
    visibleName: 'Move through cover',
    textEng : 'A unit that contains at least one model with this special rule rolls an extra D6 when rolling to move through difficult terrain and is not slowed by charging through difficult terrain. In most circumstances, this will mean that, when moving, the unit rolls 3D6 and picks the highest roll. Furthermore, a model with the Move Through Cover special rule automatically passes Dangerous Terrain tests.',
    nameRus : 'Движение через укрытие',    
    textRus : 'Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, кидает дополнительный D6, делая бросок на движение по труднопроходимому ландшафту. В большинстве случаев это означает, что боевая единица бросает 3D6 и выбирает из них наибольшее значение. Кроме того, модель со специальным правилом движение через укрытие» автоматически проходит тесты на преодоление опасного ландшафта. Специальное правило движение через укрытие» не действует при броске на преодоление расстояния нападения или при тестах на падение (см. стр. 95).'
}, {
    specialRuleName: 'NightFighting',
    visibleName: 'Night fighting',
    textEng : 'A unit that contains at least one model with this special rule ignores the effects of Night Fighting.',
    nameRus : 'Ночной бой',    
    textRus : 'Специальные правила данной миссии подробно изложены на стр. 124.'
}, {
    specialRuleName: 'Outflank',
    visibleName: 'Outflank',
    textEng : 'During deployment, players can declare that any unit that contains at least one model with this special rule is attempting to Outflank the enemy. This means they are making a wide sweeping move to get behind enemy lines or come at the foe from an unexpected direction.\n\nWhen an Outflanking unit arrives from Reserves, but not Ongoing Reserve, the controlling player rolls a D6: on a 1-2, the unit comes in from the table edge to the left of their controlling player’s own table edge; on a 3-4, they come on from the right; on a 5-6, the player can choose left or right. Models move onto the table as described for other Reserves. If such a unit deploys inside a Dedicated Transport, they may Outflank along with their Transport.',
    nameRus : 'Фланговый обход',    
    textRus : 'Во время расстановки игроки могут объявить, что любая боевая единица, содержащая хотя бы одну модель с этим специальным правилом, пытается обойти врага с фланга. Это означает, что она совершают крутой и стремительный маневр, чтобы зайти за вражеские линии или подойти к противнику с неожиданного направления.\n\nКогда боевая единица, совершающая фланговый обход, прибывает из резерва (но не действующего резерва) управляющий ею игрок кидает D6. На 1-2 боевая единица выходит с левого края стола относительно края стола управляющего ею игрока; на 3-4 она выходит справа; на 5-6 игрок может выбрать, с какой стороны она выйдет – справа или слева. Модели выходят на стол, как описано для всех прибывающих из резерва. Если такая боевая единица размещена в приданном транспорте, то она может воспользоваться правилом фланговый обход» вместе со своим транспортом.'
}, {
    specialRuleName: 'OneUseOnly',
    visibleName: 'One Use Only',
    textEng : 'A weapon or ability with this special rule can only be used once during the course of a battle.',
    nameRus : 'Одноразовое',    
    textRus : 'Оружие или способность с этим специальным правилом можно использовать всего раз на протяжении всей битвы.'
}, {
    specialRuleName: 'Pistol',
    visibleName: 'Pistol',
    textEng : '',
    nameRus : 'Пистолет',    
    textRus : ''
}, {
    specialRuleName: 'Pinning',
    visibleName: 'Pinning',
    textEng : 'If a non-vehicle unit suffers one or more unsaved Wounds from a weapon with the Pinning special rule, it must take a Leadership test once the firing unit has finished its shooting attacks for that phase. This is called a Pinning test.\n\n If the unit fails the test, it is Pinned and must immediately Go to Ground. As the unit has already taken its saves, Going to Ground does not protect it against the fire of the Pinning weapon that caused the test – it’s too late!\n\n As long as the test is passed, a unit can be called upon to take multiple Pinning tests in a single turn, but only once for each unit shooting at them. If a unit has already Gone to Ground, no further Pinning tests are taken.\n\n If the special rules of a unit specify that the unit can never be Pinned, the unit automatically passes Pinning tests. Such units can still Go to Ground voluntarily if they wish.',
    nameRus : 'Подавление огнем',    
    textRus : 'Если боевая единица, не относящаяся к технике, получает одно или более не спасённых ранений от оружия со специальным правилом подавление огнем», она должна немедленно пройти тест на лидерство. Это называется тест на подавление огнем.\n\nЕсли боевая единица проваливает тест, она подавляется огнём и должна немедленно залечь (см. стр. 18). Так как боевая единица уже использовала свои спас-броски, то залегание не защищает от оружия, ведущего огонь на подавление (или от любого другого оружия, стрелявшего по этой же боевой единице в текущей фазе) – слишком поздно!\n\nЕсли тест успешный, боевая единица может пройти ещё несколько тестов на подавление огнём за один ход, но только по одному разу на каждую стреляющую по ней боевую единицу. Если боевая единица уже залегла, то тесты на подавление огнём больше не проводятся.\n\nЕсли в специальных правилах боевой единицы сказано, что она никогда не подавляется огнём, то боевая единица автоматически проходит тесты на подавление огнём. Тем не менее, такие боевые единицы могут залечь по собственному желанию.'
}, {
    specialRuleName: 'Poisoned',
    visibleName: 'Poisoned',
    textEng : 'If a model has the Poisoned special rule, or is attacking with a Melee weapon that has the Poisoned special rule, it always wounds on a fixed number (generally shown in brackets), unless a lower result would be required, when attacking in close combat. In addition, if the Strength of the wielder (or the Poisoned weapon) is higher than the Toughness of the victim, the wielder must re-roll failed rolls To Wound in close combat.\n\n Similarly, if a model makes a shooting attack with a weapon that has the Poisoned special rule, it always wounds on a fixed number (generally shown in brackets), unless a lower result would be required. If no number is shown in brackets, the rule is Poisoned (4+). Unless otherwise stated, Poisoned weapons are treated as having a Strength of 1. The Poisoned special rule has no effect against vehicles.',
    nameRus : 'Отравленное',    
    textRus : 'Если модель имеет специальное правило отравленное» или атакует рукопашным оружием с этим специальным правилом, она всегда наносит ранение при определенном выпавшем значении (обычно оно указывается в скобках), если только для ранения не требуется наименьший результат при атаке в ближнем бою. Вдобавок, если сила обладателя (или отравленного оружия) равна или больше стойкости жертвы, обладатель должен перекидывать проваленные броски на ранение в ближнем бою.\n\nАналогичным образом, если модель совершает стрелковую атаку оружием со специальным правилом отравленное», она всегда наносит ранение при определенном выпавшем значении (обычно оно указывается в скобках), если только не требуется наименьший результат. Если в скобках не указано числовое значение, то по умолчанию оно считается как отравленное (4+)». Если не указано обратное, то считается, что отравленное оружие имеет силу 1. Специальное правило отравленное» не действует на технику. '
}, {
    specialRuleName: 'PowerOfTheMashineSpirit',
    visibleName: 'Power of the mashine spirit',
    textEng : 'In a turn in which the vehicle neither moves Flat Out nor uses smoke launchers, the vehicle can fire one more weapon at its full Ballistic Skill than normally permitted. In addition, this weapon can be fired at a different target unit to any other weapons, subject to the normal rules for shooting.',
    nameRus : 'Сила духа машины',    
    textRus : 'Если техника не двигалась на максимальной скорости и не использовала дымовые гранатометы в текущем ходе, она может стрелять ещё из одного орудия с целым показателем навыка стрельбы, чем обычно разрешено. Вдобавок, это орудие может стрелять по другой цели, отличной от той, по которой стреляют остальные орудия, и оно следует всем обычным правилам стрельбы. '
}, {
    specialRuleName: 'PreferredEnemy',
    visibleName: 'Preferred enemy',
    textEng : 'This rule is often presented as Preferred Enemy (X) where X identifies a specific type of foe. If the special rule does not specify a type of foe, then everyone is a Preferred Enemy of the unit. A unit that contains at least one model with this special rule re-rolls failed To Hit and To Wound rolls of 1 if attacking its Preferred Enemy. This applies both to shooting and close combat attacks.',
    nameRus : 'Привычный враг',    
    textRus : 'Данное правило зачастую представлено в виде привычный враг (X)», где X определяет специфичный класс врагов. Если в специальном правиле не указан специфичный класс врагов, тогда для такой боевой единицы все считаются привычными врагами. Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, перекидыва- ет проваленные броски на попадание и ранение при выпадении 1, если атакует своего привычного врага. Это относится и к стрелковым атакам и атакам ближнего боя.'
},  {
    specialRuleName: 'PreferredEnemy_ChaosSpaceMarine',
    visibleName: 'Preferred enemy (Chaos Space Marine)',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'PrecisionShots',
    visibleName: 'Precision Shots',
    textEng : 'If a model with this special rule rolls a 6 To Hit with a shooting weapon, that shot is a ‘Precision Shot’.\n\n Wounds from Precision Shots are allocated against a model (or models) of your choice in the target unit, as long as it is in range and line of sight of the firer, rather than following the normal rules for Wound allocation. A character that has a Precision Shot Wound allocated to it can still make a Look Out, Sir roll.\n\n Note that Snap Shots and shots from weapons that scatter, or do not roll To Hit, can never be Precision Shots.',
    nameRus : 'Точные выстрелы',    
    textRus : 'Если модель с этим специальным правилом выкидывает 6 при броске на попадание из стрелкового оружия, то это считается за точный выстрел.\n\nРанения от точных выстрелов распределяются не по обычным правилам на распределение ранений, а против обозначенной на ваше усмотрение модели (или моделей) из выцеленной боевой единицы, но при условии, что эта модель (модели) находится в пределах дальности оружия и линии прямой видимости стреляющего. Это значит, что точные выстрелы можно распределять на врагов со специальным вооружением или даже на персонажей. Персонаж, на которого распределили ранение от точного выстрела, по-прежнему может делать бросок по правилу берегитесь, сэр».\n\nУчтите, что точных выстрелов никогда не может быть при стрельбе навскидку, а также при стрельбе из оружия, выстрелы которого смещаются или для них не надо делать броска на попадание.'
}, {
    specialRuleName: 'PrecisionStrike',
    visibleName: 'Precision strike',
    textEng : 'If a model with this special rule rolls a 6 To Hit with a Melee weapon, that hit is a ‘Precision Strike’.\n\n Wounds from Precision Strikes are allocated against an engaged model (or models) of your choice in the unit you are attacking, rather than following the normal rules for Wound allocation. If a Precision Strike Wound is allocated to a character, they can still make their Look Out, Sir roll.',
    nameRus : 'Точные удары',    
    textRus : 'Если модель с этим специальным правилом выкидывает 6 при броске на попадание рукопашного оружия, то это считается за точный удар.\n\nРанения от точных ударов распределяются не по обычным правилам на распределение ранений, а против обозначенной на ваше усмотрение вовлечённой в бой модели (или моделей) из атакованной боевой единицы. Персонаж, на которого распределили ранение от точного удара, по-прежнему может делать бросок по правилу берегитесь, сэр».'
}, 
{
    specialRuleName: 'PsychicPilot',
    visibleName: 'Psychic Pilot',
    textEng : 'A vehicle with this special rule is a Psyker. This rule is typically presented with a Mastery Level, shown in brackets – if no Mastery Level is shown then that vehicle has a Mastery Level of 1. Rules for generating and manifesting psychic powers can be found in the Psychic phase section. The unit follows all the normal rules for generating and manifesting psychic powers, with the following clarification: the vehicle is considered to have a Leadership characteristic of 10, should this be needed in order to resolve any psychic power or Perils of the Warp.',
    nameRus : 'Пси-пилот',    
    textRus : 'Техника с этим специальным правилом является псайкерской. Вместе с данным правилом в скобках обычно указывается и уровень мастерства – если УМ не указан, то считается, что у техники УМ 1. Правила генерирования и проявления психосил можно найти на странице 23. Боевая единица следует обычным правилам генерирования и проявления психосил, но с некоторыми уточнениями: считается, что лидерство техники равно 10, если требуется отыграть какие-либо психосилы или опасности варпа.'
}, 
{
    specialRuleName: 'Psyker',
    visibleName: 'Psyker',
    textEng : 'A model with this special rule is a Psyker. This rule is typically presented with a Mastery Level, shown in brackets – if no Mastery Level is shown then that model has a Mastery Level of 1. Rules for generating and manifesting psychic powers can be found in the Psychic phase section.',
    nameRus : 'Псайкер',    
    textRus : 'Модель с этим специальным правилом является псайкером. Вместе с данным правилом в скобках обычно указывается и уровень мастерства – если УМ не указан, то считается, что у модели УМ 1. Правила генерирования и проявления психосил можно найти на странице 23.'
}, 
{
    specialRuleName: 'Psyker_ML1',
    visibleName: 'Psyker (mastery level 1)',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Psyker_ML2',
    visibleName: 'Psyker (mastery level 2)',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Psyker_ML3',
    visibleName: 'Psyker (mastery level 3)',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Psyker_ML4',
    visibleName: 'Psyker (mastery level 4)',
},
{
    specialRuleName: 'RapidFire',
    visibleName: 'Rapid Fire',
    textEng : '',
    nameRus : 'Скорострельное',    
    textRus : ''
}, 
{
    specialRuleName: 'Rage',
    visibleName: 'Rage',
    textEng : 'In a turn in which a model with this special rule charges into combat, it gains +2 Attacks for charging, rather than +1. A model that has made a disordered charge that turn receives no benefit from Rage.',
    nameRus : 'Ярость',    
    textRus : 'Если модель с этим правилом нападает на противника, в текущем ходе она получает +2 атаки за нападение вместо +1. Модель, совершившая беспорядочное нападение в текущем ходе, не получает никаких преимуществ от ярости» (см. с. 54).'
}, 
{
    specialRuleName: 'Rampage',
    visibleName: 'Rampage',
    textEng : 'IAt the start of any Fight sub-phase, models with the Rampage special rule gain +D3 attacks if the combat they are in contains more enemy models than friendly models – count all models locked in the combat, not just those models that are engaged. Roll once to determine the number of bonus Attacks all Rampaging models involved in that combat receive that phase. A model that has made a disordered charge that turn receives no benefit from Rampage.',
    nameRus : 'Неистовство',    
    textRus : 'В начале любой подфазы схватки модели со специальным правилом неистовство» получают +D3 атак, если они участвуют в бою, где находится больше вражеских, чем дружественных моделей – считаются все модели каждой связанной этим боем боевой единицы, а не только вовлечённые в этот бой модели. Сделайте всего один бросок, чтобы вычислить бонусные атаки в текущей фазе сразу у всех неистовствующих моделей, вовлечённых в этот бой. Модель, совершившая беспорядочное нападение в текущем ходу, не получает никаких преимуществ от неистовства» (см. с. 54).'
}, 
{
    specialRuleName: 'Relentless',
    visibleName: 'Relentless',
    textEng : '',
    nameRus : 'Безостановочный',    
    textRus : 'Безостановочные модели могут стрелять из тяжёлых, залповых или артиллерийских орудий, как если бы оставались неподвижными, даже если на самом деле двигались в предшествующей фазе движения. Кроме того, им разрешено нападать в том же ходе, в каком они стреляли из тяжёлых, залповых, скорострельных или артиллерийских орудий.'
},  {
    specialRuleName: 'Rending',
    visibleName: 'Rending',
    textEng : 'If a model has the Rending special rule, or is attacking with a Melee weapon that has the Rending special rule, there is a chance that his close combat attacks will strike a critical blow. For each To Wound roll of a 6, the target automatically suffers a Wound, regardless of its Toughness. These Wounds are resolved at AP2. Similarly, if a model makes a shooting attack with a weapon that has the Rending special rule, a To Wound roll of 6 Wounds automatically, regardless of Toughness, and is resolved at AP2.\n\nIn either case, against vehicles, each armour penetration roll of 6 allows a further D3 to be rolled, with the result added to the total. These hits are not resolved at AP2, but are instead resolved using the model/weapon’s AP value',
    nameRus : 'Раздирающее',    
    textRus : 'Если модель имеет специальное правило раздирающее» или атакует рукопашным оружием с этим специальным правилом, то есть шанс, что атака в ближнем бою причинит критический урон. При каждом выпадении 6 при броске на ранение цель автоматически получает ранение вне зависимости от её стойкости. Такие ранения отыгрываются с AP2.\n\nАналогичным образом, если модель совершает стрелковую атаку оружием со специальным правилом раздирающее», выпадение 6 при броске на ранение автоматически наносит ранение, независимо от стойкости, и отыгрывается с AP2.\n\nВ обоих случаях каждое выпадение 6 при броске на пробитие брони техники позволяет кинуть ещё D3, результат которого прибавляется к сумме. Эти попадания отыгрываются не с AP2, а с показателем AP модели/оружия.'
}, {
    specialRuleName: 'Repair',
    visibleName: 'Repair',
    textEng : 'If a Rhino is Immobilised, then in subsequent turns, it may attempt to repair itself instead of shooting. To make the attempt, roll a D6 in the Shooting phase; on the roll of a 6+, the vehicle is no longer Immobilised. Note that a successful Repair does no restore a Hull Point.',
    nameRus : 'Ремонт',    
    textRus : ''
}, {
    specialRuleName: 'RepelTheEnemy',
    visibleName: 'Repel the Enemy',
    textEng : 'Models disembarking from Access Points on a building can charge on the turn they do so, even on a turn the building was destroyed.',
    nameRus : 'Отбросить противника',    
    textRus : 'Модели, выходящие из строения через место входа, могут нападать в том же ходе, в котором покинули строение, даже если в этом ходе оно было уничтожено.'
}, {
    specialRuleName: 'RitesOfBattle',
    visibleName: 'Rites of Battle',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Salvo_2_3',
    visibleName: 'Salvo_2_3',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Salvo_3_5',
    visibleName: 'Salvo_3_5',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Scout',
    visibleName: 'Scout',
    textEng : 'After both sides have deployed (including Infiltrators), but before the first player begins his first turn, a unit containing at least one model with this special rule can choose to redeploy. If the unit is Infantry, Artillery, a Walker or a Monstrous Creature, each model can redeploy anywhere entirely within 6" of its current position. If it is any other unit type, each model can instead redeploy anywhere entirely within 12" of its current position. During this redeployment, Scouts can move outside the owning player’s deployment zone, but must remain more than 12" away from any enemy unit. A unit that makes a Scout redeployment cannot charge in the first game turn. A unit cannot embark or disembark as part of a Scout redeployment.\n\n If both sides have Scouts, roll-off; the winner decides who redeploys first. Then alternate redeploying Scout units.\n\n If a unit with this special rule is deployed inside a Dedicated Transport, it confers the Scout special rule to the Transport (though a disembarkation cannot be performed as part of the redeployment). Note that a Transport with this special rule does not lose it if a unit without this special rule is embarked upon it. Having Scout also confers the Outflank special rule to units of Scouts that are kept as Reserves.\n\n Outflank\n\n During deployment, players can declare that any unit that contains at least one model with this special rule is attempting to Outflank the enemy. When this unit arrives from Reserves, but not Ongoing Reserve, the controlling player rolls a D6: on a 1-2, the unit comes in from the table edge to the left of their controlling player’s own table edge; on a 3-4, they come on from the right; on a 5-6, the player can choose left or right. Models move onto the table as described for other Reserves.\n\n If a unit with Scouts is deployed inside a Dedicated Transport, they may Outflank along with their Transport.\n\n Iinfiltrate and Scout\n\n If a unit has both the Infiltrate and Scout special rule, that unit can deploy as per the Infiltrate special rule and then redeploy as per the Scout special rule.',
    nameRus : 'разведчик',    
    textRus : 'После того как обе стороны расставят свои армии (в том числе и лазутчиков), но перед тем, как первый игрок начнёт свой первый ход, боевая единица, содержащая хотя бы одну модель с этим специальным правилом, может по своему желанию сделать перестановку. Если боевая единица относится к пехоте, артиллерии, шагоходам или монструозным созданиям, то каждую модель можно переставить куда угодно в пределах 6" от её текущей позиции. Если она относится к другим классам боевых единиц, то каждую модель можно переставить в пределах 12" от её текущей позиции. Во время этой перестановки разведчики могут выйти за пределы зоны расстановки управляющего игрока, но должны оставаться на расстоянии более 12" от любой вражеской боевой единицы. Боевая единица, которая совершает разведывательную перестановку, не может нападать в первом игровом ходе. Боевая единица не может использовать свой манёвр разведывательной перестановки для погрузки или высадки из техники или входа или выхода из строения.\n\nЕсли обе стороны имеют разведчиков, то проводится кубовка; победитель решает, кто переставляет модели первым. Затем по очереди переставляются боевые единицы разведчиков.\n\nЕсли боевая единица с этим специальным правилом размещается внутри приданного транспорта, то транспорт получает специальное правило разведчик» (хотя во время перестановки нельзя производить высадку). Учтите, что транспорт с этим специальным правилом не теряет его, если в него погружается боевая единица без этого специального правила. Разведчики со специальным правилом проникновение», которые находятся в резерве (см. с. 135), получают ещё и специальное правило фланговый обход».\n\nФланговый обход\n\nВо время расстановки игроки могут объявить, что любая боевая единица, содержащая хотя бы одну модель с этим специальным правилом, пытается обойти врага с фланга. Когда такая боевая единица прибывает из резерва (но не действующего резерва), управляющий ею игрок кидает D6. На 1-2 боевая единица выходит с левого края стола относительно края стола управляющего ею игрока; на 3-4 она выходит справа; на 5-6 игрок может выбрать, с какой стороны она выйдет – справа или слева. Модели выходят на стол, как описано для всех прибывающих из резерва.\n\nЕсли боевая единица с правилом разведчик» размещена в приданном транспорте, то она может воспользоваться правилом фланговый обход» вместе со своим транспортом.\n\nЛазутчики и разведчики\n\nЕсли у боевой единицы есть и спецправило проникновение», и спецправило разведчик», данная боевая единица может расставиться по спецправилу проникновение», а затем заново расставиться по спецправилу разведчик».'
}, {
    specialRuleName: 'SentryDefenceSystem',
    visibleName: 'Sentry Defence System',
    textEng : 'A building with this special rule can use automated fire against enemy units, even if it is unoccupied. In addition, enemy units can shoot at and charge a building with this special rule, even if it is unoccupied.',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Shred',
    visibleName: 'Shred',
    textEng : '',
    nameRus : 'Кромсающее',    
    textRus : 'Если модель имеет специальное правило кромсающее» или атакует рукопашным оружием с этим специальным правилом, она перекидывает проваленные броски на ранение в ближнем бою. Аналогичным образом, если модель совершает стрелковую атаку оружием с этим специальным правилом, она перекидывает проваленные броски на ранение.'
}, {
    specialRuleName: 'Shrouded',
    visibleName: 'Shrouded',
    textEng : 'A unit that contains at least one model with this special rule counts its cover save as being 2 points better than normal. Note that this means a model with the Shrouded special rule always has a cover save of at least 5+, even if it’s in the open. Cover save bonuses from the Shrouded and Stealth special rules are cumulative (to a maximum of a 2+ cover save).',
    nameRus : 'Скрытый пеленой',    
    textRus : 'У боевой единицы, содержащей хотя бы одну модель с этим специальным правилом, спас-броски за укрытие считаются на 2 пункта выше, чем обычно. Учтите, это означает, что модель со специальным правилом скрытый пеленой», всегда имеет спас-бросок за укрытие как минимум на 5+, даже если она находится на открытой местности. Бонусы для спас-бросков за укрытие по специальным правилам скрытый пеленой» и проникновение» суммируются (максимум возможен спас- бросок за укрытие на 2+).'
}, {
    specialRuleName: 'SkilledRider',
    visibleName: 'Skilled rider',
    textEng : 'A unit that contains at least one model with this special rule automatically passes Dangerous Terrain tests, and receives +1 to its Jink cover saves (other cover saves are unaffected).',
    nameRus : 'Опытный наездник',    
    textRus : 'Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, автоматически проходит тесты на преодоление опасного ландшафта и получает +1 к спас-броскам за укрытие по правилу уклонение» (другие спас- броски за укрытие остаются неизменны).'
}, {
    specialRuleName: 'Skyfire',
    visibleName: 'Skyfire',
    textEng : 'A model with this special rule, or that is firing a weapon with this special rule, fires using its normal Ballistic Skill when shooting at Flyers, Flying Monstrous Creatures and Skimmers, but it can only fire Snap Shots against other targets.',
    nameRus : 'Противовоздушное',    
    textRus : 'Модель с этим специальным правилом или стреляющая оружием с этим специальным правилом использует свой обычный навык стрельбы при ведении огня по летательным аппаратам, летающим монструозным созданиям и скиммерам, но по другим целям может вести лишь стрельбу навскидку.'
}, {
    specialRuleName: 'SlowAndPurposefu',
    visibleName: 'Slow and Purposefu',
    textEng : 'A unit that contains at least one model with this special rule cannot Run, Turbo-boost, move Flat Out, perform Sweeping Advances or fire Overwatch. However, they can shoot with Heavy, Salvo and Ordnance weapons, counting as stationary even if they moved in the previous Movement phase. They are also allowed to charge in the same turn they fire Heavy, Ordnance, Rapid Fire or Salvo weapons.',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Smash',
    visibleName: 'Smash',
    textEng : 'All of the close combat attacks, except Hammer of Wrath attacks, of a model with this special rule are resolved at AP2 (unless it’s attacking with an AP1 weapon). Additionally, when it makes its close combat attacks, it can choose instead to make a single Smash Attack. If it does so, roll To Hit as normal, but resolve the Attack at double the model’s Strength (to a maximum of 10). Furthermore, a model making a Smash Attack can re-roll its armour penetration rolls, but must abide by the second result.',
    nameRus : 'Медленно и неумолимо',    
    textRus : 'Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, не может бегать, турбоускоряться, двигаться на полной скорости, выполнять преследование или вести упреждающий огонь. Однако она может стрелять из тяжёлых, залповых и артиллерийских орудий, будто из неподвижного состояния, даже если на самом деле она передвигалась в предыдущей фазе движения. Ей также дозволяется нападать в том же ходе, в котором она стреляла из тяжёлых, артиллерийских, скорострельных или залповых орудий.'
}, {
    specialRuleName: 'Sniper',
    visibleName: 'Sniper',
    textEng : 'If a weapon has the Sniper special rule, or is fired by a model with the Sniper special rule, and rolls a 6 To Hit, that shot is a ‘Precision Shot’. Wounds from Precision Shots are allocated against a model (or models) of your choice in the target unit, as long as it is in range and line of sight of the firer, rather than following the normal rules for Wound allocation. A character that has a Precision Shot Wound allocated to it can still make a Look Out, Sir roll. Note that Snap Shots can never be Precision Shots. If a weapon has the Sniper special rule, or is fired by a model with the Sniper special rule, its shooting attacks always wound on a To Wound roll of 4+, regardless of the victim’s Toughness. In addition, any To Wound roll of a 6 is resolved at AP2. Against vehicles, shooting attacks from weapons and models with the Sniper special rule count as Strength 4.',
    nameRus : 'Снайперское',    
    textRus : 'Если модель имеет специальное правило снайперское» или стреляет оружием с этим специальным правилом, каждое выпадение 6 при броске на попадание считается за точный выстрел (с. 169). Более того, если модель имеет специальное правило снайперское» или стреляет оружием с этим специальным правилом, её стрелковые атаки всегда наносят ранение на 4+ при броске на ранение, независимо от стойкости жертвы. Вдобавок, любой бросок на ранение, при котором выпадает 6, отыгрывается с AP2. Считается, что против техники стрелковые атаки оружия или модели с этим специальным правилом имеют силу 4.'
}, {
    specialRuleName: 'SoulBlaze',
    visibleName: 'Soul Blaze',
    textEng : 'If a unit suffers one or more unsaved Wounds from an attack with this special rule, it is set ablaze and continues to burn – mark it with a coin or counter as a reminder. At the end of each turn, roll a D6 for each unit with a Soul Blaze counter on it. On a 3 or less, the flames die out and the unit is no longer ablaze – remove your reminder counter.\n\n On a 4+, the unit takes D3 Strength 4 AP5 hits with the Ignores Cover special rule. These Wounds are Randomly Allocated. A unit cannot have more than one Soul Blaze counter on it at a time.',
    nameRus : 'Душесжигатель',    
    textRus : 'Если боевая единица получает одно или более неспасённых ранений при атаке с этим специальным правилом, она воспламеняется и продолжает гореть – пометьте её монетой или фишкой в качестве напоминания.\n\n В конце каждого хода бросайте D6 за каждую боевую единицу с фишкой душесжигателя. При выпадении 3 и меньше пламя затухает, и боевая единица более не горит – удалите оставшуюся фишку. При выпадении 4+ боевая единица получает D3 попаданий с силой 4, AP5 и спецправилом укрытие не спасает». Эти ранения распределяются случайно. Боевая единица не может иметь больше одной фишки душесжигателя в одно и то же время.'
}, {
    specialRuleName: 'SpecialistWeapon',
    visibleName: 'Specialist Weapon',
    textEng : 'A model fighting with this weapon does not receive +1 Attack for fighting with two weapons unless it is armed with two or more Melee weapons with the Specialist Weapon rule.',
    nameRus : 'Специализированное оружие',    
    textRus : 'Модель, сражающаяся таким оружием, не получает +1 атаку за сражение двумя единицами оружия, если только она не оснащена двумя или более единицами рукопашного оружия с правилом специализированное оружие».'
}, {
    specialRuleName: 'SplitFire',
    visibleName: 'Split fire',
    textEng : 'When a unit that contains at least one model with this special rule shoots, one model in the unit can shoot at a different target to the rest of his unit. Once this shooting attack has been resolved, resolve the shooting attacks made by the rest of the unit. These must be at a different target, which cannot be a unit forced to disembark as a result of the Split Firing unit’s initial shooting attack.',
    nameRus : 'Распределение огня',    
    textRus : 'Когда стреляет боевая единица, содержащая хотя бы одну модель с этим специальным правилом, одна модель боевой единицы может выстрелить по цели, отличной от той, по которой стреляет остальная часть боевой единицы. Как только будет отыграна эта стрелковая атака, отыграйте стрелковые атаки остальной части боевой единицы. Эти атаки должны быть направлены против другой цели, коей к тому же не может быть боевая единица, которая была вынуждена высадиться/выйти из-за стрелковой атаки первой модели, стрелявшей по правилу распределения огня.'
}, {
    specialRuleName: 'Stealth',
    visibleName: 'Stealth',
    textEng : 'A unit that contains at least one model with this special rule counts its cover saves as being 1 point better than normal. Note that this means that a model with the Stealth special rule always has a cover save of at least 6+, even if it is in the open. This rule is often presented as Stealth (X) where X indicates a specific type of terrain, such as Stealth (Woods) or Stealth (Ruins). If this is the case, the unit only gains the benefit whilst it is in terrain of the specified type. Cover save bonuses from the Shrouded and Stealth special rules are cumulative (to a maximum of a 2+ cover save).',
    nameRus : 'Скрытность',    
    textRus : 'У боевой единицы, содержащей хотя бы одну модель с этим специальным правилом, спас-броски за укрытие считаются на 1 пункт выше, чем обычно. Учтите, это означает, что модель со специальным правилом скрытность» всегда имеет спас-бросок за укрытие как минимум на 6+, даже если она находится на открытой местности. Данное правило зачастую представлено в виде скрытность (X)», где X определяет специфичный вид ландшафта, такой  как, например, скрытность (леса) или скрытность (руины). Боевая единица имеет преимущества только на определённом виде ландшафта, указанном в её профиле.\n\nБонусы для спас-бросков за укрытие по специальным правилам скрытый пеленой» и скрытность» суммируются (максимум возможен спас-бросок за укрытие на 2+).'
}, {
    specialRuleName: 'StrafingRun',
    visibleName: 'Strafing run',
    textEng : 'When shooting Assault, Heavy, Rapid Fire or Salvo weapons at Artillery, Beasts, Bikes, Cavalry, Infantry, Monstrous Creatures and vehicles without the Flyer or Skimmer type, this vehicle has +1 Ballistic Skill.',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'Stubborn',
    visibleName: 'Stubborn',
    textEng : 'When a unit that contains at least one model with this special rule takes Morale checks or Pinning tests, they ignore any negative Leadership modifiers. If a unit is both Fearless and Stubborn, it uses the rules for Fearless instead.',
    nameRus : 'Упорство',    
    textRus : ' Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, при прохождении тестов на боевой дух или на подавление огнём не учитывает любые отрицательные модификаторы лидерства. Если боевая единица одновременно имеет бесстрашие» и упорство», то тогда она использует правила для бесстрашия».'
}, {
    specialRuleName: 'Supersonic',
    visibleName: 'Supersonic',
    textEng : 'A Supersonic vehicle that moves Flat Out must move at least 18" and can move up to 36".',
    nameRus : 'Сверхзвуковая',    
    textRus : 'Сверхзвуковая техника, которая движется на максимальной скорости, должна пройти как минимум 18", как максимум – 36".'
}, {
    specialRuleName: 'Swarms',
    visibleName: 'Swarms',
    textEng : 'If, when allocating Wounds to a unit with the Swarms special rule, two or more models could be chosen as the closest enemy, the closest enemy is always the model with the least number of Wounds. If a model with the Swarm special rule suffers an unsaved Wound from a Blast (any size) or Template weapon, each unsaved Wound is multiplied to two unsaved Wounds unless that Wound has the Instant Death special rule. However, a unit entirely composed of models with the Swarm special rule is not slowed by difficult terrain, but must test for Dangerous Terrain as normal.',
    nameRus : 'Стаи',    
    textRus : 'Если при распределении ранений боевой единицы с правилом стаи» две или более её моделей находятся от противника на равном удалении, ближайшей к нему всегда считается модель с меньшим числом ран. Если модель с этим правилом получает неспасённое ранение от оружия взрывного или огнемётного типа, то каждое неспасённое ранение приравнивается к двум, если только у этого ранения нет правила мгновенная смерть». Боевая единица, полностью состоящая из моделей с правилом стаи», не замедляется на труднопроходимом ландшафте, однако должна проходить тест на преодоление опасного ландшафта как обычно.'
}, {
    specialRuleName: 'TwinLinked',
    visibleName: 'Twin-linked',
    textEng : 'Twin-linked weapons don’t get more shots than normal ones, but they give you a better chance of hitting with them. If a shooting weapon has the twin-linked special rule, or is described in a model’s wargear entry as twin-linked, it re-rolls all failed To Hit rolls.\n\n Twin-linked Blast Weapons\n\n If the scatter dice does not roll a hit, you can choose to re-roll the dice with a Twin-linked Blast weapon. If you choose to do so, you must re-roll both the 2D6 and the scatter dice.\n\n Twin-linked Template Weapons\n\n Twin-linked Template weapons are fired just like a single weapon, but must re-roll failed To Wound rolls and armour penetration rolls.',
    nameRus : 'Спаренное',    
    textRus : 'Спаренное оружие делает выстрелов не больше, чем обычное, но оно даёт вам больше шансов попасть. Если стрелковое оружие имеет специальное правило спаренное» или в описании оснащения модели оно указывается как спаренное, оно перекидывает все проваленные броски на попадание.\n\nСпаренное оружие взрывного типа\n\nЕсли при броске на смещение не выпал Hit, вы можете решить перебросить кубик для спаренного оружия взрывного типа. В этом случае вы должны перекинуть и 2D6", и кубик смещения.\n\nСпаренное оружие огнемётного типа\n\nСпаренное оружие огнемётного типа стреляет точно так же, как и одна единица оружия, но вы должны перекидывать проваленные броски на ранение и пробитие брони.'
}, {
    specialRuleName: 'TwoHanded',
    visibleName: 'Two Handed',
    textEng : 'A model attacking with this weapon never receives +1 Attack for fighting with two Melee weapons.',
    nameRus : 'Двуручное',    
    textRus : 'Модель, атакующая этим оружием, никогда не может иметь бонусные атаки за сражение двумя единицами рукопашного оружия (см. с. 49).'
}, {
    specialRuleName: 'Torrent',
    visibleName: 'Torrent',
    textEng : 'A weapon with this special rule is treated like any other Template weapon, but when firing it in the Shooting phase, place the template so that the narrow end is within 12" of the weapon and the wide end is no closer to the weapon than the narrow end.',
    nameRus : 'Потоковое',    
    textRus : 'Оружие с этим специальным правилом действует как любое другое оружие огнемётного типа, но при ведении огня в фазе стрельбы ставьте шаблон узким концом в пределах 12" от оружия, а широким – не ближе к оружию, чем узким концом.'
}, {
    specialRuleName: 'Template',
    visibleName: 'Template',
    textEng : 'Template weapons are indicated by having the word ‘Template’ for their range instead of a number. Instead of rolling To Hit, simply place the template so that its narrow end is touching the base of the firing model and the rest of the template covers as many models in the target unit as possible, without touching any other friendly models (including other models from the firing model’s unit). Any models fully or partially under the template are hit. Against vehicles, the template must be placed to cover as much of the vehicle as possible without touching a friendly model. The position of the firer is used to determine which armour facing is hit. A template weapon never hits the model firing it. Template weapons have the Ignores Cover, Wall of Death and No Escape special rules. Wounds inflicted by template weapons are allocated following the normal rules. Template weapons cannot fire Snap Shots.\n\n Multiple Templates\n\n If a unit is firing more than one shot with the Template type, resolve each shot, one at a time, as described above, determining and recording how many hits are scored by each template. Once the number of hits from all templates has been determined, roll To Wound as normal.\n\n Wall of Death\n\n Template weapons can fire Overwatch, even though they cannot fire Snap Shots. Instead, if a Template weapon fires Overwatch, it automatically inflicts D3 hits on the charging unit, resolved at its normal Strength and AP value. Don’t worry about comparing the length of the template with the distance to the enemy. If the charge is successful, it doesn’t matter anyway. If the charge failed, we can assume that the enemy ran into range of the Template weapon and were driven back.\n\n No Escape\n\n If a Template weapon hits a building’s Fire Point or an Open-topped vehicle and there is a unit embarked inside that building or vehicle, then in addition to any other effects that unit suffers D6 hits, resolved at the Strength and AP of the weapon. These hits are Randomly Allocated.\n\n Hellstorm Weapons\n\n Hellstorm weapons have the word ‘Hellstorm’ instead of a range on their weapon profile. Hellstorm weapons use the hellstorm template, but otherwise obey the rules for other Template weapons.',
    nameRus : 'Шиблон',    
    textRus : ''
}, {
    specialRuleName: 'TankHunter',
    visibleName: 'Tank hunter',
    textEng : 'A unit that contains at least one model with this special rule re-rolls failed armour penetration rolls against vehicles (both with shooting and in close combat) and can choose to re-roll glancing hits, in an attempt to instead get a penetrating hit – but the second result must be kept.',
    nameRus : 'Истребители танков',    
    textRus : 'Боевая единица, содержащая хотя бы одну модель с этим специальным правилом, перекидывает проваленные броски на пробитие брони техники (и стрелковые атаки, и атаки ближнего боя) и может по своему желанию перебрасывать скользящие попадания в попытке совершить пробивающее попадание – однако второй результат уже нельзя перекидывать.'
}, {
    specialRuleName: 'Zealot',
    visibleName: 'Zealot',
    textEng : '',
    nameRus : '',    
    textRus : ''
}, {
    specialRuleName: 'UnrelentningHunter',
    visibleName: 'UnrelentningHunter',
}, {
    specialRuleName: 'Unwieldy',
    visibleName: 'Unwieldy',
    textEng : 'A model attacking with this weapon Piles In and fights at Initiative step 1, unless it is a Monstrous Creature or a Walker.',
    nameRus : 'Тяжеловесное',    
    textRus : 'Модель, атакующая этим оружием, никогда не может иметь бонусные атаки за сражение двумя единицами рукопашного оружия (см. с. 49).'
},{
    specialRuleName: 'VectorDancer',
    visibleName: 'Vector Dancer',
    textEng : 'A model with this special rule can make an additional pivot on the spot of up to 90° at the end of its move. A model that uses this extra pivot cannot move Flat Out in the following Shooting phase.',
    nameRus : 'Векторный танцор',    
    textRus : 'Модель с этим специальным правилом может совершить дополнительный поворот на месте на 90 ̊ в конце своего движения. Модель, использующая дополнительный поворот, не может двигаться на максимальной скорости в последующей фазе стрельбы.'
},{
    specialRuleName: 'VectorStrike',
    visibleName: 'Vector Strike',
    textEng : 'When Swooping or Zooming, this model may savage its prey. At the end of the Movement phase, nominate one enemy unit not locked in combat that the model has moved over that turn. That unit takes 1 hit (if the unit is an enemy Flyer in Zoom mode, or an enemy Swooping Flying Monstrous Creature, it instead takes D3 hits). Unless stated otherwise, Vector Strike hits are resolved at the model’s unmodified Strength and AP2, using Random Allocation. These hits have the Ignores Cover special rule. These hits do not benefit from any of the model’s special rules, such as Furious Charge, Poisoned, Rending etc. Against vehicles, these hits are resolved against the target’s side armour.\n\n A model that made a Vector Strike in its Movement phase counts as having already fired one weapon in its following Shooting phase. However, any additional weapons it fires that turn can choose a different target to that of the Vector Strike.',
    nameRus : 'Векторный удар',    
    textRus : 'При пикировании или выполнении свечи» данная модель может наброситься на свою жертву. В конце фазы движения обозначьте одну невовлечённую в бой вражескую боевую единицу, над которой двигалась модель в этом ходе. Эта боевая единица получает1 попадание (если это ЛА в режиме свечи» или пикирующий летающий монстр, тогда боевая единица получает D3 попаданий). Если только не указано иное, это попадание отыгрывается с немодифицированной силой модели и AP2, используя случайное распределение. Эти попадания имеют спецправило укрытие не спасает». Данные попадания не получают никаких бонусов от всяких специальных правил модели, например, яростного нападения, отравленного или раздирающего оружия и т.п. В случае техники эти попадания отыгрываются против её бортовой брони.\n\nЕсли модель совершила векторный удар в своей фазе движения, то считается,что она уже стреляла из одного орудия в последующей своей фазе стрельбы. Тем не менее любые дополнительные орудия, из которых она стреляет в этом ходе, могут свободно вести огонь по другим целям, отличным от той, против которой был проведён векторный удар.'
},{
    specialRuleName: 'Venerable',
    visibleName: 'Venerable',
    textEng : 'If a Venerable Dreadnought suffers a penetrating hit, you can make your opponent re-roll the result on the Vehicle Damage table. You must accept the second result, even if it is worse than the first.',
    nameRus : 'Почтенный',    
    textRus : '.'
},{
    specialRuleName: 'Vortex',
    visibleName: 'Vortex',
    textEng : 'A weapon with this special rule is a Destroyer weapon and uses a blast marker of some type (e.g. blast, large blast, massive blast, etc). Place the appropriate marker, roll for scatter and apply damage. For determining Wound allocation, always assume the shot is coming from the centre of the marker, in the same manner as a Barrage weapon. The marker for a Vortex weapon is not removed from play after damage has been resolved. Leave it in play on the tabletop. The marker is impassable terrain as long as it remains in play.\n\n At the beginning of every subsequent player turn, the marker scatters 2D6" (use the little arrow if you roll a Hit!). If a double is rolled, the marker is removed from play instead. Any unit under the marker’s new location is hit. Apply damage as described above.',
    nameRus : 'Вихревое',    
    textRus : 'Оружие с этим специальным правилом считается за деструктивное (с. 163) и использует определённый маркер взрыва (малый маркер, маркер большого взрыва, огромного и т.д.). Поместите соответствующий маркер, сделайте бросок на смещение и узнайте, какой причинён урон (с. 158). При распределении ранений всегда считайте, что выстрел идёт из самого центра маркера, как и в случае с орудиями для навесной стрельбы. Маркер вихревого оружия не удаляется из игры после отыгрыша урона. Оставьте его на столе. Маркер считается за непроходимый ландшафт, пока остаётся в игре.\n\nВ начале каждого последующего хода игрока (то есть любого игрока), маркер смещается на 2D6" (используйте маленькую стрелку, если выпадает Hit!). Если выпадает дубль, маркер удаляется из игры. Любая боевая единица, оказавшаяся под новой позицией маркера, получает попадание. Отыграйте урон, как описано выше.'
},{
    specialRuleName: 'Zealot',
    visibleName: 'Zealot',
    textEng : 'A unit containing one or more models with the Zealot special rule automatically passes Pinning, Fear and Regroup tests and Morale checks, but cannot Go to Ground and cannot choose to fail a Morale check due to the Our Weapons Are Useless rule. If a unit gains the Zealot special rule when it has Gone to Ground, all the effects of Go to Ground are immediately cancelled.\n\n In addition, units containing one or more models with the Zealot special rule re-roll all failed To Hit rolls during the first round of each close combat – they do not get to re-roll failed To Hit rolls in subsequent rounds.',
    nameRus : 'Фанатик',    
    textRus : 'Боевая единица, содержащая хотя бы одну модель с этим спецправилом, автоматически проходит тесты на подавление огнём, перегруппировку, устрашение и боевой дух, но не может залегать и добровольно проваливать проверку на боевой дух по правилу наше оружие бесполезно» (с. 53). Если боевая единица получает специальное правило фанатик» уже после того, как залегла, залегание немедленно прекращается.\n\nВдобавок, боевые единицы, содержащие хотя бы одну модель с этим специальным правилом, перекидывают проваленные броски на попадание в первом раунде каждого ближнего боя – в последующих раундах они уже не перекидывают проваленные броски на попадание.'
},



]);


