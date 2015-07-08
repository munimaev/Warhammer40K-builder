// --------- Класс-Родитель ------------
var WHGroupe = function(o) {
    if (!o) {
        throw {'text':'Not set object'};
    }
    if (!o.structure) {
        throw {'text':'Not set structure'};
    }
    if (!o.index) {
        throw {'text':'Not set index'};
    }
    if (!o.$link) {
        throw {'text':'Not set $link'};
    }
    if (!o.army) {
        throw {'text':'Not set army'};
    }

    this.$link = o.$link;
    this.army = o.army;
    this.$this = $('<div />',{
        'class': 'WH_army_group',
    }); 

    this.$groupName = $('<div />',{
        'class': 'WH_army_group_name',
        'text' :  o.structure.name
    }); 

    this.$groupPool = $('<div />',{
        'class': 'WH_army_group_pool'
    }); 


    this.$this.append(this.$groupName);
    this.$this.append(this.$groupPool);
    this.$link.append(this.$this);
 
    this.slots = [];      
    if (o.structure.hasOwnProperty('necessarily')) {
        for (var i in o.structure.necessarily) {
            this.slots.push( new WHSlotNecessarily({
                index : i,
                $link : this.$groupPool,
                structure : o.structure.necessarily[i],
                army : this.army
            }));
        }
    }   
    if (o.structure.hasOwnProperty('optional')) {
        for (var i in o.structure.optional) {
            this.slots.push( new WHSlotOptional({
                index : i,
                $link : this.$groupPool,
                structure : o.structure.optional[i],
                army : this.army
            }));
        }
    }

    this.check(); 

}

WHGroupe.prototype.check = function () {
    var hasFirstEmptyOptional = false;
    for (var i in this.slots) {
        if (this.slots[i].slotType === 'necessarily') {

        }
        else if (this.slots[i].slotType === 'optional') {
            if (this.slots[i].isEmpty() && hasFirstEmptyOptional) {
                this.slots[i].notNeeden();
            }
            if (this.slots[i].isEmpty()) {
                hasFirstEmptyOptional = true;
            }
        }
        else {
            throw {'text':'Unexpected slotType'};
        }
    }
}
WHGroupe.prototype.unselectAllUnit = function () {
    for (var sl in this.slots) {
        this.slots[sl].unselectUnit();
    }
}



// Методы хранятся в прототипе

// --------- Класс-потомок -----------
// var DeamonsOfChaos = function() {
//     this.armyName = 'DeamonsOfChaos';
//     WHGroupe.apply(this, arguments);
// }

// // Унаследовать
// DeamonsOfChaos.prototype = Object.create(WHGroupe.prototype);

// // Желательно и constructor сохранить
// DeamonsOfChaos.prototype.constructor = DeamonsOfChaos;

