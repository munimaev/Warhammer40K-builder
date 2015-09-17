WH_WargearFabric([
{
    wargearName: 'AssaultGrenade',
    visibleName: 'Assault grenade',
    wargearType: 'Grenades',
    abilities : {
        range : 8,
        S : 3,
        type:['Assault_1','Blast','AssaultGrenade'],
    }
},
{
    wargearName: 'PlasmaGrenade',
    visibleName: 'Plasma grenade',
    wargearType: 'Grenades',
    abilities : [{
        name: 'Shooting',
        range : 8,
        S : 4,
        AP : 4,
        type:['Assault_1','Blast','PlasmaGrenade'],
    },{
        name: 'Assault',
        S : 4,
        AP : 4,
        type:['PlasmaGrenade'],
    }]
},
{
    wargearName: 'DefensiveGrenade',
    visibleName: 'Defensive grenade',
    wargearType: 'Grenades',
    abilities : {
        range : 8,
        S : 1,
        type:['Assault_1','Blast','Blind','DefensiveGrenade'],
    }
},
{
    wargearName: 'HaywireGrenade',
    visibleName: 'Haywire grenade',
    wargearType: 'Grenades',
    abilities : [{
        name: 'Shooting',
        range : 8,
        S : 2,
        type:['Assault_1','Blast','HaywireGrenade'],
    },{
        name: 'Assault',
        S : 2,
        type:['HaywireGrenade'],
    }]
},
{
    wargearName: 'KrakGrenades',
    visibleName: 'Krak grenades',
    wargearType: 'Grenades',
    abilities : [{
        name: 'Shooting',
        range : 8,
        S : 6,
        S : 4,
        type:['Assault_1','KrakGrenade'],
    },{
        name: 'Assault',
        S : 6,
        S : 4,
        type:['KrakGrenade'],
    }],
    specialRules : [{
        textEng : 'Shooting\n\nWhen a unit armed with krak grenades makes a shooting attack, one model can choose to throw a grenade, rather than using another shooting weapon.\n\nAssault\n\nUnless used in assaults against vehicles, gun emplacements or Monstrous Creatures, krak grenades have no effect. When they are used in assaults against vehicles, gun emplacements or Monstrous Creatures, krak grenades have the following profile:',
        nameRus : '',    
        textRus : ''
    }]
},{
    wargearName: 'MeltaBomb',
    visibleName: 'Melta bomb',
    wargearType: 'Grenades',
    abilities : {
        S : 8,
        S : 1,
        type:['Armourbane','Unwieldy','MeltaBomb'],
    },
    specialRules : [{
        textEng : 'Shooting\n\nMelta bombs are cumbersome devices. Melta bombs cannot be used to make a shooting attack.\n\nAssault\n\nUnless used in assaults against vehicles, gun emplacements or Monstrous Creatures, melta bombs have no effect. When used in assaults against vehicles, buildings, gun emplacements or Monstrous Creatures, melta bombs have the following profile:',
        nameRus : '',    
        textRus : ''
    }]
},{
    wargearName: 'FragGrenades',
    visibleName: 'Frag grenades',
    specialRules : [{
        textEng : 'Shooting\n\nWhen a unit armed with assault grenades makes a shooting attack, one model can choose to throw a grenade, rather than using another shooting weapon.\n\nAssault\n\nModels equipped with assault grenades don’t suffer the penalty to their Initiative for charging enemies through difficult terrain, but fight at their normal Initiative in the ensuing combat.',
        nameRus : '',    
        textRus : ''
    }]
}, 
]);