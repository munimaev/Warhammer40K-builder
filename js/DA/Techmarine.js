var DA_Techmarine = function(o) {
	this.unitName = 'DA_Techmarine';
	this.price = 65;
	this.optionsDefault = [
		'DA_Techmarine_Get',
        'DA_Techmarine_MeleeRangedWeapons',
        'DA_Techmarine_SpesialIssueWargear',
        'DA_Techmarine_addServitore',
        'DA_Servitor_weapon'
  //       'DA_RelicsOfCliban',
  //       'DA_Techmarine_Get',
  //       'DA_Techmarine_Terminator',
  //       'DA_Techmarine_SpesialIssueWargear'
	];
	
	this.structureDefault = {
		'Techmarine' : 1
	}
    this.defaultUnitWargear = [
        function(m){ if (m.modelName === 'Techmarine') { return 'BoltPistol'} return false},
        function(m){ if (m.modelName === 'Techmarine') { return 'PowerAxe'} return false},
        function(m){ if (m.modelName === 'Techmarine') { return 'FragGrenades'} return false},
        function(m){ if (m.modelName === 'Techmarine') { return 'KrakGrenades'} return false},
    	'ServoArm',
    ];
    this.defaultSpecialRules = [
        {
            type: 'onModelName',
            names: ['Techmarine'],
            rules: [
                'AndTheyShallKnowNoFear',
                'GrimResolve', 
                'IndependentCharacter', 
                'BlessingOfTheOmnissiah',
                'BolsterDefences'
            ]
        },
        {
            type: 'onModelName',
            names: ['Servitor'],
            rules: ['Mindlock']
        }
    ];
	WHUnit_Infantry.apply(this, arguments);
}
// Унаследовать
DA_Techmarine.prototype = Object.create(WHUnit_Infantry.prototype);
// Желательно и constructor сохранить
DA_Techmarine.prototype.constructor = DA_Techmarine;
// Методы потомка 
DA_Techmarine.prototype.visibleName = 'Techmarine';



WHOptionAddModelFabric([{
    'optionName' : 'DA_Techmarine_addServitore',
    'cost' : 10,
    'maxCountAdding' : 5,
    'modelToAdd' : 'Servitor',
}]);


fabric_option_multiChange([{
    optionName: 'DA_Techmarine_Get',
    cost: 0,
    defaultSubOptions: [{
        optionName: 'DA_Techmarine_Get_Bike',
        cost: 20,
        actionTextUp: 'Techmarine может взять <b>Space marine bike</b> <i>за 20 очков</i>',
        addItems: ['SpaceMarineBike'],
    },{
        optionName: 'DA_Techmarine_Get_ServoHarness',
        cost: 25,
        actionTextUp: 'Techmarine может заменить Servo-arm на <b>Servo-harness</b> <i>за 25 очков</i>',
        addItems: ['ServoHarness'],
        removeItems: ['ServoArm'],
    }],
    isModelCanChange: [{
        type: 'oneOfModelName',
        names: ['Techmarine']
    }]
}]);



var DA_Techmarine_MeleeRangedWeapons = function(o) {
    this.defaultSubOptions = [
        'DA_MeleeWeapons_Chainsword',
        'DA_MeleeWeapons_LightningClaws',
        'DA_MeleeWeapons_PowerWeapon',
        'DA_MeleeWeapons_PowerFist',
        'DA_MeleeWeapons_ThunderHammer',
        'DA_RangedWeapons_Boltgun',
        'DA_RangedWeapons_StormBolter',
        'DA_RangedWeapons_CombiFlamer',
        'DA_RangedWeapons_CombiGrav',
        'DA_RangedWeapons_CombiMelta',
        'DA_RangedWeapons_CombiPlasma',
        'DA_RangedWeapons_GraviPistol',
        'DA_RangedWeapons_PlasmaPistol',
    ]
    this.optionName = 'DA_Techmarine_MeleeRangedWeapons';
    this.cost = 0;
    this.headerText = 'Techmarine может заменить свой boltgun, bolt pistool и/или оружие ближнего боя на одно из cледующего';
    this.isWargearToChange = function(w,m) {
        if ((w.wargearName == 'Boltgun' 
            || w.wargearName == 'BoltPistol' 
            || w.wargearType == 'MeleeWeapon'
            ) 
            && w.createBy === m
            && m.modelName === 'Techmarine'
        ) {
            return true;
        }
        return false;
    }

    ChangeFromWargear_class.apply(this, arguments);
}
// Унаследовать
DA_Techmarine_MeleeRangedWeapons.prototype = Object.create(ChangeFromWargear_class.prototype);
// Желательно и constructor сохранить
DA_Techmarine_MeleeRangedWeapons.prototype.constructor = DA_Techmarine_MeleeRangedWeapons;




fabric_option_multiChange([{
    optionName: 'DA_Techmarine_SpesialIssueWargear',
    cost: 0,
    headerText: 'Techmarine может взять одно из следующего',
    defaultSubOptions: [
        'DA_SpecilaIssueWargear_Auspex',
        'DA_SpecilaIssueWargear_CombatShield',
        'DA_SpecilaIssueWargear_MeltaBomb',
        'DA_SpecilaIssueWargear_DigitalWeapon',
        'DA_SpecilaIssueWargear_ConversionField',
    ],
    isModelCanChange : [{
        type: 'oneOfModelName',
        names: ['Techmarine']
    },{
        type: 'modelCanTakeOnlyOneSubotion',
    }]
},{
    optionName: 'DA_Servitor_weapon',
    cost: 0,
    headerText : 'До двух Servitor могут заменить Servo-arm на одно из следующего',
    defaultSubOptions: [{
        optionName: 'DA_Servitor_weapon_HeavyBolter',
        cost: 10,
        removeItems: ['ServoArm'],
        addItems: ['HeavyBolter'],
    },{
        optionName: 'DA_Servitor_weapon_MultiMelta',
        cost: 10,
        removeItems: ['ServoArm'],
        addItems: ['MultiMelta'],
    },{
        optionName: 'DA_Servitor_weapon_PlasmaCannon',
        cost: 20,
        removeItems: ['ServoArm'],
        addItems: ['PlasmaCannon'],
    }, ],
    canEnable: [{
        type: 'upTo',
        upTo: 2
    }],
    isModelCanChange: [{
        type: 'oneOfModelName',
        names: ['Servitor']
    },],
}

]);
