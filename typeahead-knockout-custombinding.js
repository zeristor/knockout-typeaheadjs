// 2014-02-25
// typeahead-knockout-custombinding-.js
// Documentation:
// https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md
//
// Examples:
// http://twitter.github.io/typeahead.js/examples/
//
// This custom binding is to the jQuery Typeahead plugin, there is also a stylesheet accompanying this.
"use strict";

ko.bindingHandlers.typeahead = {
  
  init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    var $element        = $(element);
	var sourceEngine	= ko.utils.unwrapObservable(valueAccessor());
    var items           = ko.utils.unwrapObservable(allBindingsAccessor().items) || 7;

	var options = {
        items:      items,
        highlight:  true,
        minlength:  3
	};

	$element
		.typeahead(options, {
            name:       'ingredients',
            displayKey: 'IngredientDesc',
            valueKey:   'IngredientID',
            source:     sourceEngine.ttAdapter(),
            templates:  { 
            	suggestion: Handlebars.compile([
	            		      	'<p class="ingredient-name">{{name}}</p>',
	            		      	'<p class="ingredient-abbr">{{abbreviations}}</p>',
	      						'<p class="ingredient-alias">{{aliases}}</p>',
	      						'<p class="ingredient-common">{{commonName}}</p>'
			            	].join(''))
        				}
        })
        .on('typeahead:selected', function(event, datum) {
            viewModel.editItemName(datum.name);
            viewModel.editItemId(datum.itemId);
            selected = true;
            itemSelected = datum.name;
        });
  }
};
