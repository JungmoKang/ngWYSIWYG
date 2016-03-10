angular.module('ngWYSIWYG').directive('ngpSymbolsGrid', ['NGP_EVENTS', function(NGP_EVENTS) {
	var linker = function (scope, element) {

		scope.$on(NGP_EVENTS.CLICK_AWAY, function() {
			scope.$apply(function() {
				scope.show = false;
			});
		});

		element.parent().bind('click', function(e) {
			e.stopPropagation();
		});

		scope.symbols = [
			'&#9312;', '&#9313;', '&#9314;', '&#9315;', '&#9316;', '&#9317;', '&#9318;',
			'&#9319;', '&#9320;', '&#9321;', '&#9322;', '&#9323;', '&#9324;', '&#9325;', '&#9326;'
		];

		scope.pick = function( symbol ) {
			scope.onPick({symbol: symbol});
		};

		element.ready(function() {
			//real deal for IE
			function makeUnselectable(node) {
				if (node.nodeType == 1) {
					node.setAttribute("unselectable", "on");
					node.unselectable = 'on';
				}
				var child = node.firstChild;
				while (child) {
					makeUnselectable(child);
					child = child.nextSibling;
				}
			}
			//IE fix
			for(var i = 0; i < document.getElementsByClassName('ngp-symbols-grid').length; i += 1) {
				makeUnselectable(document.getElementsByClassName("ngp-symbols-grid")[i]);
			}
		});
	};
	return {
		link: linker,
		scope: {
			show: '=',
			onPick: '&'
		},
		restrict: 'AE',
		template: '<ul ng-show="show" class="ngp-symbols-grid"><li ng-repeat="symbol in symbols" unselectable="on" ng-click="pick(symbol)" ng-bind-html="symbol"></li></ul>'
	}
}]);