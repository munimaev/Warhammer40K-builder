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
    this.groupName = o.structure.name;
    this.$this = $('<div />',{
        'class': 'WH_army_group',
    }); 

    this.$groupName = $('<div />',{
        'class': 'WH_army_group_name WH_army_group_name__'+o.structure.htmlClass,
        'text' : o.structure.name,
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

    if (this.groupName == 'Dedicated transport') {
        var allEmpty = true;
        for (var i = this.slots.length-1; i >= 0 ; i--) {
            if (!this.slots[i].isEmpty()) {
                allEmpty = false;
            }else {
                this.slots.splice(i,1);
            }
        }
        if (allEmpty) {
            for (var i in this.army.structure) {
                if (this.army.structure[i] === this) {
                    this.$this.detach();
                    this.army.structure.splice(i,1);
                    break;
                }
            }
        }
        return true;
    }

    var hasFirstEmptyOptional = false;
    var allNecessarilyIsFull = true;
    for (var i in this.slots) {
        if (this.slots[i].slotType === 'necessarily' && this.slots[i].isEmpty()) {
            allNecessarilyIsFull = false;
            break
        }
    }
    for (var i in this.slots) {
            
        if (this.slots[i].slotType === 'necessarily') {
        }
        else if (this.slots[i].slotType === 'optional') {
            if (!allNecessarilyIsFull || (this.slots[i].isEmpty() && hasFirstEmptyOptional)) {
                this.slots[i].notNeeden();
            } else {
                this.slots[i].needen();
            }
            if (this.slots[i].isEmpty()) {
                hasFirstEmptyOptional = true;
            }
        }
        else if (this.slots[i].slotType === 'dedicated') {

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

