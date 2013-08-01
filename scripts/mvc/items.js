$(document).ready(function () {

	var itemController = (function()
	{
		function alerter(caller){
			alert(caller);
		}
					
		return{
			showMessage: alerter
		}
	}());

	//
	// Item prototype
	//
	var itemTemplate = '<li style="width:400px;" class="list-group-item">' + 
							'<span data-bind="content" />' + 
							'<i class="glyphicon glyphicon-pencil pull-right item-edit" /> ' + 
							'<i class="glyphicon glyphicon-trash pull-right item-delete" />' +  
						'</li>';

	var itemStyle = '& i {cursor:pointer; } & .glyphicon-pencil {margin-left:8px;}';

	var item = $$({
		model: {
			content: "Item"
		},
		
		view: {
			format: itemTemplate, 
			style: itemStyle
		},
		
		controller: {
			'create': function(){
				 // itemController.showMessage("item.controller.create function");
			},
			'change': function(){
				// itemController.showMessage("item.controller.change function");
			},
			'click .item-edit': function(){
				var input = prompt('Edit to-do item:', this.model.get('content'));
				if (!input) return;
				this.model.set({content: input});
			},
			'click .item-delete': function(){
				this.destroy();
				list.controller.setItemCount();
			},
		}
	});
	
	//
	// List of items
	//
	var listTemplate = '<div>' + 
							'<button type="button" class="btn btn-primary item-add"><i class="glyphicon glyphicon-plus" /> ' + 
								'Add new item (<span data-bind="itemCount"/>)' + 
							'</button>' + 
							'<ul class="list-group"></ul>' + 
						'</div>';
	var listStyle = '& button {margin-bottom:5px;}';
	
	var list = $$({
		model: {}, 
		
		view: {
			format: listTemplate,
			style: listStyle
		},
		
		controller: {
			'create': function(){
				//itemController.showMessage("list.controller.create function");
				this.view.$('.item-add').trigger('click');
			},
			'click .item-add': function(){
				var newItem = $$(item);
				this.append(newItem, 'ul'); // add to container, appending at <ul>
				
				this.controller.setItemCount();
			},
			setItemCount: function(){
				var count = this.view.$('li').length <1 ? "0" : this.view.$('li').length;
				this.model.set({itemCount: count});
			}
		}
	});

	$$.document.append(list);
});