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
    wargearName: 'KrakGrenade',
    visibleName: 'Krak grenade',
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
    }]
},
{
    wargearName: 'MeltaBomb',
    visibleName: 'Melta bomb',
    wargearType: 'Grenades',
    abilities : {
        S : 8,
        S : 1,
        type:['Armourbane','Unwieldy','MeltaBomb'],
    }
},
]);