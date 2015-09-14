

var Model_Fabric = function(a) {
    for (var i in a) {
        window[a[i].modelName] = function() {
            var modelName = a[i].modelName;
            var visibleModelName = a[i].visibleModelName;
            var defaultAbilities = a[i].defaultAbilities;
            var modelMainType = a[i].modelMainType;
            return function() {

                this.modelName = modelName;
                this.visibleModelName = visibleModelName;
                this.defaultAbilities = defaultAbilities;   
                window['WH_Model_'+modelMainType].apply(this, arguments);
            }
        }()

        window[a[i].modelName].prototype = Object.create(window['WH_Model_'+a[i].modelMainType].prototype);
        window[a[i].modelName].prototype.constructor =  window[a[i].optionName];
        if (a[i].modelNames) {
            window[a[i].modelName].prototype.modelNames =  a[i].modelNames;
        }
        if (a[i].visibleModelName) {
            window[a[i].modelName].prototype.visibleModelName =  a[i].visibleModelName;
        }
    }
}

Model_Fabric([

{
    modelMainType :'Infantry',
    modelName : 'Asmodai',
    visibleModelName : 'Asmodai',
    defaultAbilities : {
        "WS": 6, "BS": 5, "S" : 4, "T" : 4, "W" : 3, "I" : 5, "A" : 3, "Ld": 10, "Sv": 3
    }
},{
    modelMainType :'Infantry',
    modelName : 'Azrael',
    visibleModelName : 'Azrael',
    defaultAbilities : {
        "WS": 6, "BS": 5, "S" : 4, "T" : 4, "W" : 4, "I" : 5, "A" : 4, "Ld": 10, "Sv": 2
    }
},{
    modelMainType :'Infantry',
    modelName : 'Belial',
    visibleModelName : 'Belial',
    defaultAbilities : {
        "WS": 5, "BS": 6, "S" : 4, "T" : 4, "W" : 3, "I" : 5, "A" : 4, "Ld": 10, "Sv": 2
    },
},{
    modelMainType :'Infantry',
    modelName : 'Ezekiel',
    visibleModelName : 'Ezekiel',
    defaultAbilities : {
        "WS": 5, "BS": 5, "S" : 4, "T" : 4, "W" : 3, "I" : 5, "A" : 3, "Ld": 10, "Sv": 2
    }
},{
    modelMainType :'Infantry',
    modelName : 'Librarian',
    visibleModelName : 'Librarian',
    defaultAbilities : {
        "WS": 5, "BS": 4, "S" : 4, "T" : 4, "W" : 2, "I" : 4, "A" : 2, "Ld": 10, "Sv": 3
    }
},{
    modelMainType :'Infantry',
    modelName : 'InterrogatorChaplain',
    visibleModelName : 'InterrogatorChaplain',
    defaultAbilities : {
        "WS": 5, "BS": 5, "S" : 4, "T" : 4, "W" : 3, "I" : 5, "A" : 3, "Ld": 10, "Sv": 3
    }
},{
    modelMainType :'Infantry',
    modelName : 'Chaplain',
    visibleModelName : 'Chaplain',
    defaultAbilities : {
        "WS": 4, "BS": 4, "S" : 4, "T" : 4, "W" : 2, "I" : 4, "A" : 2, "Ld": 10, "Sv": 3
    }
},{
    modelMainType :'Infantry',
    modelName : 'CompanyMaster',
    visibleModelName : 'Company Master',
    defaultAbilities : {
        "WS": 6, "BS": 5, "S" : 4, "T" : 4, "W" : 3, "I" : 5, "A" : 3, "Ld": 10, "Sv": 3
    }
},{
    modelMainType :'Infantry',
    modelName : 'Techmarine',
    visibleModelName : 'Techmarine',
    defaultAbilities : {
        "WS": 4, "BS": 5, "S" : 4, "T" : 4, "W" : 2, "I" : 4, "A" : 2, "Ld": 9, "Sv": 2
    }
},{
    modelMainType :'Infantry',
    modelName : 'Servitor',
    visibleModelName : 'Servitor',
    defaultAbilities : {
        "WS": 3, "BS": 3, "S" : 3, "T" : 3, "W" : 1, "I" : 3, "A" : 1, "Ld": 8, "Sv": 4
    }
},{
    modelMainType :'Infantry',
    modelName : 'Sammael',
    visibleModelName : 'Sammael',
    defaultAbilities : {
        "WS": 6, "BS": 5, "S" : 4, "T" : 5, "W" : 3, "I" : 5, "A" : 3, "Ld": 10, "Sv": 3
    }
},



{
    modelMainType :'Infantry',
    modelName : 'DA_CompanyChampion',
    visibleModelName : 'Company Champion',
    defaultAbilities : {
        "WS": 5, "BS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 3
    }
},{
    modelMainType :'Infantry',
    modelName : 'DA_Apothecary',
    visibleModelName : 'Apothecary',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 3
    }
},{
    modelMainType :'Infantry',
    modelName : 'DA_DeathwingApothecary',
    visibleModelName : 'Deathwing Apothecary',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 2
    }
},{
    modelMainType :'Infantry',
    modelName : 'DA_DeathwingApothecary',
    visibleModelName : 'Deathwing Apothecary',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 2
    }
},{

    modelMainType : "Infantry",
    modelName : 'DA_DeathwingChampion',
    visibleModelName : 'Deathwing Champion',
    defaultAbilities : {
        "BS": 4, "WS": 5, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 2
    }
},{

    modelMainType : "Infantry",    
    modelName : 'DA_DeathwingKnight',
    visibleModelName : 'Deathwing Knight',
    defaultAbilities : {
        "BS": 4, "WS": 5, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 2
    }
},{

    modelMainType : "Infantry",    
    modelName : 'DA_DeathwingKnightMaster',
    visibleModelName : 'Deathwing Knight Master',
    defaultAbilities : {
        "BS": 4, "WS": 5, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 2
    }
},{

    modelMainType : "Infantry",    
    modelName : 'DA_DeathwingTerminator',
    visibleModelName : 'Deathwing Terminator',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 2
    }
},{

    modelMainType : "Infantry",    
    modelName : 'DA_DeathwingSergant',
    visibleModelName : 'Deathwing Sergant',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 2
    }
},{

    modelMainType : "Infantry",    
    modelName : 'DA_Sсout',
    visibleModelName : 'Sсout',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 1, "Ld": 8, "Sv": 4
    }
},{

    modelMainType : "Infantry",    
    modelName : 'DA_Sсout_Sergant',
    visibleModelName : 'Sсout Sergant',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 1, "Ld": 8, "Sv": 4
    }
},{

    modelMainType : "Infantry",    
    modelName : 'DA_Veteran_Scout_Sergant',
    visibleModelName : 'Veteran Sсout Sergant',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 4
    }
},{

    modelMainType : "Infantry",    
    modelName : 'DA_SpaceMarine',
    visibleModelName : 'Space Marine',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 1, "Ld": 8, "Sv": 3
    },
    modelNames : {
        addHeader : 'космических десантников',
        removeHeader : 'космического десантника',
    }
},{

    modelMainType : "Infantry",    
    modelName : 'DA_SpaceMarine_Sergant',
    visibleModelName : 'Space Marine Sergant',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 1, "Ld": 8, "Sv": 3
    }
},{
    modelMainType : "Infantry",    
    modelName : 'DA_Veteran',
    visibleModelName : 'Veteran',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 3
    }
},{

    modelMainType : "Infantry",    
    modelName : 'DA_Veteran_Sergant',
    visibleModelName : 'Veteran Sergant',
    defaultAbilities : {
        "BS": 4, "WS": 4, "S" : 4, "T" : 4, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 3
    }
}, {
    modelMainType : 'Vehicle',
    modelName : 'DA_Dreadnought',
    visibleModelName : 'Dreadnought',
    defaultAbilities : {
        "WS": 4, "WS": 4, "S": 6, "AF" : 12, "AS" : 12, "AR" : 12, "I"  : 4, "A"  : 4, "HP" : 3
    },
}, {
    modelMainType : 'Vehicle',
    modelName : 'DropPod',
    visibleModelName : 'Drop Pod',
    defaultAbilities : {
        "BS": 4, "AF" : 12, "AS" : 12, "AR" : 12, "HP": 3
    },
}, {
    modelMainType : 'Vehicle',
    modelName : 'LandRaider',
    visibleModelName : 'Land raider',
    defaultAbilities : {
        "BS": 4, "AF" : 14, "AS" : 14, "AR" : 14, "HP": 4
    },
}, {
    modelMainType : 'Vehicle',
    modelName : 'LandRaider',
    visibleModelName : 'Land raider',
    defaultAbilities : {
        "BS": 4, "AF" : 14, "AS" : 14, "AR" : 14, "HP": 4
    },
}, {
    modelMainType : 'Vehicle',
    modelName : 'LandRaider',
    visibleModelName : 'Land raider',
    defaultAbilities : {
        "BS": 4, "AF" : 14, "AS" : 14, "AR" : 14, "HP": 4
    },
}, {
    modelMainType : 'Vehicle',
    modelName : 'Razorback',
    visibleModelName : 'Razorback',
    defaultAbilities : {
        "BS": 4, "AF" : 4, "AS" : 4, "AR" : 4, "HP": 3
    },
}, {
    modelMainType : 'Vehicle',
    modelName : 'Rhino',
    visibleModelName : 'Rhino',
    defaultAbilities : {
        "BS": 4, "AF" : 4, "AS" : 4, "AR" : 4, "HP": 3
    },
}, {
    modelMainType : 'Vehicle',
    modelName : 'DA_VenerableDreadnought',
    visibleModelName : 'VenerableDreadnought',
    defaultAbilities : {
        "WS": 5, "WS": 5, "S" : 6, "AF": 12, "AS": 12, "AR": 10, "I" : 4, "A" : 4, "HP": 3
    },
}, {
    modelMainType : 'Vehicle',
    modelName : 'Predator',
    visibleModelName : 'Predator',
    defaultAbilities : {
        "BS": 4, "AF" : 13, "AS" : 11, "AR" : 10, "HP": 3
    },
},{
    modelMainType : 'Vehicle',
    modelName : 'Vindicator',
    visibleModelName : 'Vindicator',
    defaultAbilities : {
        "BS": 4, "AF" : 13, "AS" : 11, "AR" : 10, "HP": 3
    },
},{
    modelMainType : 'Vehicle',
    modelName : 'Whirlwind',
    visibleModelName : 'Whirlwind',
    defaultAbilities : {
        "BS": 4, "AF" : 11, "AS" : 11, "AR" : 10, "HP": 3
    },
},{
    modelMainType : 'Vehicle',
    modelName : 'RavenwingLandSpeeder',
    visibleModelName : 'Ravenwing landspeeder',
    defaultAbilities : {
        "BS": 4, "AF" : 10, "AS" : 10, "AR" : 10, "HP": 2
    },
},{
    modelMainType : 'Vehicle',
    modelName : 'RavenwingLandSpeederVengeance',
    visibleModelName : 'Ravenwing landspeeder Vengeance',
    defaultAbilities : {
        "BS": 4, "AF" : 10, "AS" : 10, "AR" : 10, "HP": 3
    },
},{

    modelMainType : 'Vehicle',
    modelName : 'RavenwingDarkshroud',
    visibleModelName : 'Ravenwing Darkshroud',
    defaultAbilities : {
        "BS": 4, "AF" : 10, "AS" : 10, "AR" : 10, "HP": 3
    },
},{
    modelMainType : 'Vehicle',
    modelName : 'NephilimJetfighter',
    visibleModelName : 'Nephilim Jetfighter',
    defaultAbilities : {
        "BS": 4, "AF" : 11, "AS" : 11, "AR" : 11, "HP": 3
    },
},{
    modelMainType : 'Vehicle',
    modelName : 'RavenwingDarkTalon',
    visibleModelName : 'Ravenwing Dark Talon',
    defaultAbilities : {
        "BS": 4, "AF" : 11, "AS" : 11, "AR" : 11, "HP": 3
    },
},{
    modelMainType : 'Vehicle',
    modelName : 'Sableclaw',
    visibleModelName : 'Sableclaw',
    defaultAbilities : {
        "BS": 5, "AF" : 14, "AS" : 14, "AR" : 10, "HP": 2
    },
},




{
    modelMainType : 'Bike',
    modelName : 'DA_Ravenwing_Biker',
    visibleModelName : 'Ravenwing Biker',
    defaultAbilities : {
        "WS": 4, "BS": 4, "S" : 4, "T" : 5, "W" : 1, "I" : 4, "A" : 1, "Ld": 8, "Sv": 3
    },
}
, {
    modelMainType : 'Bike',
    modelName : 'DA_Ravenwing_Sergeant',
    visibleModelName : 'Ravenwing Sergeant',
    defaultAbilities : {
        "WS": 4, "BS": 4, "S" : 4, "T" : 5, "W" : 1, "I" : 4, "A" : 1, "Ld": 8, "Sv": 3
    },
}
, {
    modelMainType : 'Bike',
    modelName : 'DA_Ravenwing_Veteran_Sergeant',
    visibleModelName : 'Ravenwing Veteran Sergeant',
    defaultAbilities : {
        "WS": 4, "BS": 4, "S" : 4, "T" : 5, "W" : 1, "I" : 4, "A" : 1, "Ld": 9, "Sv": 3
    },
}
, {
    modelMainType : 'Bike',
    modelName : 'DA_Ravenwing_Attack_Bike',
    visibleModelName : 'Ravenwing Attack Bike',
    defaultAbilities : {
        "WS": 4, "BS": 4, "S" : 4, "T" : 5, "W" : 2, "I" : 4, "A" : 1, "Ld": 8, "Sv": 3
    },
}
, {
    modelMainType : 'Bike',
    modelName : 'DA_Ravenwing_Black_Knight',
    visibleModelName : 'Ravenwing Black Knight',
    defaultAbilities : {
        "WS": 4, "BS": 4, "S" : 4, "T" : 5, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 3
    },
}
, {
    modelMainType : 'Bike',
    modelName : 'DA_Ravenwing_Huntmaster',
    visibleModelName : 'Ravenwing Huntmaster',
    defaultAbilities : {
        "WS": 4, "BS": 4, "S" : 4, "T" : 5, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 3
    },
}
, {
    modelMainType : 'Bike',
    modelName : 'DA_Ravenwing_Apothecary',
    visibleModelName : 'Ravenwing Apothecary',
    defaultAbilities : {
        "WS": 4, "BS": 4, "S" : 4, "T" : 5, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 3
    },
}
, {
    modelMainType : 'Bike',
    modelName : 'DA_Ravenwing_Champion',
    visibleModelName : 'Ravenwing Champion',
    defaultAbilities : {
        "WS": 5, "BS": 4, "S" : 4, "T" : 5, "W" : 1, "I" : 4, "A" : 2, "Ld": 9, "Sv": 3
    },
}
    

])
