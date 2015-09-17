WH_WargearFabric([
{
    wargearName: 'SwordOfSilence',
    visibleName: 'Sword of Silence',
    wargearType: 'MeleeWeapon',
    abilities : {
        AP:3,
        type:['Melee','Fleshbane','MasterCrafted'],
    }
}, {
    wargearName: 'RavenSword',
    visibleName: 'Raven Sword',
    wargearType: 'MeleeWeapon',
    abilities : {
        AP:2,
        type:['Melee','MasterCrafted'],
    }
}, {
    wargearName: 'RavenSwordSableclaw',
    visibleName: 'Raven Sword',
    wargearType: 'MeleeWeapon',
    abilities : {
        S:4,
        AP:2,
        type:['RavenSwordSableclaw'],
    }
}, {
    wargearName: 'BladesOfReason',
    visibleName: 'Blades of Reason',
    wargearType: 'MeleeWeapon',
    abilities : {
        type:['Melee','InstantDeath','SpecialistWeapon'],
    }
}, {
    wargearName: 'BookOfSalvation',
    visibleName: 'Book of Salvation',
    specialRules : [{
        visibleName: 'Book of Salvation',
        textEng : 'll friendly models with the Dark Angels Faction within 6" of Ezekiel at the start of the Fight sub-phase have +1 Attack until the end of the phase.',
        nameRus : '',    
        textRus : ''
    }]
},{
    wargearName: 'StasisBomb',
    visibleName: 'Stasis bomb',
    abilities : {
        S:4,
        AP:5,
        type:['Bomb 1','LargeBlast','VastStasisAnomaly'],
    }
}, {
    wargearName: 'SwordOfSecrets',
    visibleName: 'Sword of Secrets',
    wargearType: 'MeleeWeapon',
    abilities : {
        S:'+2',
        AP:3,
        type:['Melee','MasterCrafted'],
    }
}, {
    wargearName: 'LionHelm',
    visibleName: 'Lion Helm',
    specialRules : [{
        visibleName: 'Book of Salvation',
        textEng : 'The Lion Helm is carried by a Relic Bearer (see perfidious relic of the Unforgiven). The Lion Helm confers a 4+ invulnerable save to Azrael, all models in his unit, and any vehicle he is embarked in.»',
        nameRus : '',    
        textRus : ''
    }]
}, 
]);


// ranged
WH_WargearFabric([
{
    wargearName: 'AvengerMegaBolter',
    visibleName: 'Avenger mega bolter',
    wargearType: 'RangedWeapon',
    abilities : {
        range : 48,
        S : 6,
        AP:4,
        type:['Heavy_5'],
    }
}, {
    wargearName: 'SixBlackswordMissiles',
    visibleName: 'Six blacksword missiles',
    wargearType: 'RangedWeapon',
    abilities : {
        name : 'Blacksword missiles',
        range : 36,
        S : 7,
        AP:3,
        type:['Heavy_1','OneUseOnly'],
    }
}, {
    wargearName: 'CycloneMissileLauncher',
    visibleName: 'Cyclone missile launcher',
    wargearType: 'RangedWeapon',
    abilities : [{
        name : 'Frag missile',
        range : 48,
        S : 4,
        AP:6,
        type:['Heavy_2','Blast'],
    },{
        name : 'Krakk missile',
        range : 48,
        S : 8,
        AP:3,
        type:['Heavy_2'],
    }],
    specialRules : [{
        textEng : 'A Terminator can fire his cyclone missile launcher in addition to his storm bolter.',
        nameRus : '',    
        textRus : ''
    }]
}, {
    wargearName: 'DeathwindLauncher',
    visibleName: 'Deathwind launcher',
    wargearType: 'RangedWeapon',
    abilities : {
        range : 24,
        S : 5,
        type:['Heavy_1','LargeBlast'],
    },
    specialRules : [{
        textEng : 'Explosions ripple outward in a furious storm as the deathwind launcher opens up. Designed to purge Drop Pod landing zones, these missile launchers are short-ranged but punishingly effective.',
        nameRus : '',    
        textRus : ''
    }]
},  {
    wargearName: 'DemolisherCannon',
    visibleName: 'Demolisher cannon',
    wargearType: 'RangedWeapon',
    abilities : {
        range : 24,
        S : 10,
        AP:2,
        type:['Ordance_1','LargeBlast'],
    }
}, {
    wargearName: 'HurricaneBolter',
    visibleName: 'Hurricane bolters',
    wargearType: 'RangedWeapon',
    abilities : {
        name : 'Boltgun',
        range : 24,
        S : 4,
        AP:5,
        type:['RapidFire'],
    },
    specialRules : [{
        textEng : 'A hurricane bolter consists of three twin-linked boltguns fired as a single weapon.',
        nameRus : '',    
        textRus : ''
    }]
}, {
    wargearName: 'PlasmaStormBattary',
    visibleName: 'Plasma storm battary',
    wargearType: 'RangedWeapon',
    abilities : [{
        name : 'Burst mode',
        range : 36,
        S : 7,
        AP:2,
        type:['Heavy_3','GetsHot'],
    },{
        name : 'Charge mode',
        range : 36,
        S : 7,
        AP:2,
        type:['Heavy_3','GetsHot','LargeBlast'],
    }]
}, {
    wargearName: 'PlasmaTalon',
    visibleName: 'Plasma talon',
    wargearType: 'RangedWeapon',
    abilities : {
        range : 18,
        S : 7,
        AP:2,
        type:['RapidFire','GetsHot','TwinLinked'],
    }
}, {
    wargearName: 'RavenwingGrenadeLouncher',
    visibleName: 'Ravenwing grenade louncher',
    wargearType: 'RangedWeapon',
    abilities : [{
        name : 'Frag shell',
        range : 24,
        S : 3,
        AP:6,
        type:['RapidFire','Blast'],
    },{
        name : 'Krakk shell',
        range : 24,
        S : 3,
        AP:4,
        type:['RapidFire'],
    },{
        name : 'Rad shell',
        range : 12,
        S : 3,
        type:['Assault_1','Blast','RadPoising'],
    },{
        name : 'Stasis shell',
        range : 12,
        S : 3,
        type:['Assault_1','Blast','StasisAnomaly'],
    }]
}, {
    wargearName: 'RiftCannon',
    visibleName: 'Rift cannon',
    wargearType: 'RangedWeapon',
    abilities : {
        range : 18,
        S : 10,
        AP:2,
        type:['Heavy_1','Blast','Blind','RiftVortex'],
    },
    specialRules : [{
        textEng : 'The scintillating beam of the rift cannon cracks a hole in reality itself, creating a deadly implosion. Those not dragged screaming into the breach are left temporarily blinded, their vision a surreal, static image of the moment before the rift howled into existence.',
        nameRus : '',    
        textRus : ''
    }]
}, {
    wargearName: 'TyphoonMissileLaauncher',
    visibleName: 'Typhoon missile laauncher',
    wargearType: 'RangedWeapon',
    abilities : [{
        name : 'Frag missiles',
        range : 48,
        S : 4,
        AP:6,
        type:['Heavy_2','Blast'],
    },{
        name : 'Krakk missiles',
        range : 48,
        S : 8,
        AP:3,
        type:['Heavy_2'],
    }]
}, {
    wargearName: 'WhirlwindMultipleMissileLauncher',
    visibleName: 'Whirlwind multiple missile launcher',
    wargearType: 'RangedWeapon',
    abilities : [{
        name : 'Vengence',
        range : '12-48',
        S : 5,
        AP:4,
        type:['Ordance_1','Barrage','LargeBlast'],
    },{
        name : 'Incendiary castelan',
        range : '12-48',
        S : 4,
        AP:5,
        type:['Ordance_1','Barrage','IgnoresCover','LargeBlast'],
    }]
}, 
]);

WH_WargearFabric([
{
    wargearName: 'BladeOfCaliban',
    visibleName: 'Blade Of Caliban',
    wargearType: 'MeleeWeapon',
    abilities : {
        S:'+1',
        AP:3,
        type:['Melee'],
    }
},{
    wargearName: 'CorvusHammer',
    visibleName: 'Corvus hammer',
    wargearType: 'MeleeWeapon',
    abilities : {
        S:'+1',
        type:['Melee','Rending'],
    }
}, {
    wargearName: 'CroziusArcanum',
    visibleName: 'Crozius arcanum',
    wargearType: 'MeleeWeapon',
    abilities : {
        S:'+2',
        AP:'4',
        type:['Melee','Concussive'],
    }
}, {
    wargearName: 'FlailOfTheUnforgiven',
    visibleName: 'Flail Of The Unforgiven',
    wargearType: 'MeleeWeapon',
    abilities : {
        S:'+2',
        AP:'3',
        type:['Melee','Concussive','Fleshbane'],
    }
}, {
    wargearName: 'HalberdOfCaliban',
    visibleName: 'Halberd Of Caliban',
    wargearType: 'MeleeWeapon',
    abilities : {
        S:'+2',
        AP:'2',
        type:['Melee','TwoHanded'],
    }
}, {
    wargearName: 'MaceOfAbsolution',
    visibleName: 'Mace Of Absolution',
    wargearType: 'MeleeWeapon',
    abilities : {
        S:'+2',
        AP:3,
        type:['Melee','Concussive','Smite'],
    }
}, {
    wargearName: 'RelicBlade',
    visibleName: 'Relic blade',
    wargearType: 'MeleeWeapon',
    abilities : {
        S:'+2',
        AP:3,
        type:['Melee','TwoHanded'],
    }
},  
]);

WH_WargearFabric([
{
    wargearName: 'ArmoriumCherub',
    visibleName: 'Armorium cherub',
    specialRules : [{
        textEng : 'One use only. One model in a unit equipped with an armorium cherub can re-roll all failed To Hit rolls in one Shooting phase. An armorium cherub is represented by a separate miniature that will always remain as close as possible to the unit that selected it. The model itself is purely decorative and is always ignored for game purposes – just move it to one side if it gets in the way. Remove the armorium cherub once it has been used or once the unit that selected it has been completely destroyed.',
        nameRus : '',    
        textRus : ''
    }]
}, {    
    wargearName: 'ChapterBanner',
    visibleName: 'Chapter banner',
    specialRules : [{
        textEng : 'Friendly units with the Dark Angels Faction within 12" of a model equipped with the Chapter banner re-roll failed Morale checks, Pinning tests and Fear tests. In addition, all friendly models with the Dark Angels Faction in the same unit as this banner have +1 Attack whilst the bearer is alive.',
        nameRus : '',    
        textRus : ''
    }]
}, {
    wargearName: 'CompanyStandart',
    visibleName: 'Company standart',
    specialRules : [{
        textEng : 'Friendly units with the Dark Angels Faction within 12" of a model equipped with the company standard re-roll failed Morale checks, Pinning tests and Fear tests.',
        nameRus : '',    
        textRus : ''
    }]
}, {
    wargearName: 'DeathwingCompanyBanner',
    visibleName: 'Deathwing company banner',
    specialRules : [{
        textEng : 'Friendly units with the Dark Angels Faction within 12" of a model equipped with the Deathwing Company Banner re-roll failed Morale checks, Pinning tests and Fear tests. In addition, all friendly models with the Deathwing special rule in the same unit as this banner have +1 Attack whilst the bearer is alive.',
        nameRus : '',    
        textRus : ''
    }]
}, 
]);