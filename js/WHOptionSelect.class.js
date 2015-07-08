// --------- Класс-потомок WHOptionSuper -----------
var OptionSelect = function(o) {

}

// Унаследовать
OptionSelect.prototype = Object.create(WHOption.prototype);

// Желательно и constructor сохранить
OptionSelect.prototype.constructor = OptionSelect;

