var md=angular.module("dialog",[]);

md.provider('dialog', dialogProvider);

function dialogProvider() {
	this.$get = dialogProviderGet;
	dialogProviderGet.$inject = ["$parse", "$http", "$rootScope", "$compile"];

	var isRendered = false;
	var $ = angular.element;
	var dialogHTML = null;
	var scope = null;

	function dialogProviderGet($parse, $http, $rootScope, $compile) {

		/**
			params example
			{
				title: 'some html label',
				info: 'some html to show',
				buttoms: [{
					label: 'some html label',
					click: 'some callback fuction'
				}]
			}
		*/
		function init(params) {
			if(!dialogHTML) {
				$http.get('template/dialog.html')
						.success(function(result) {
							dialogHTML = result;
							scope = $rootScope.$new();
							render(params);
						});
			} else {
				render(params);
			}
		}

		function render(params) {
			var ele = $(document.body);
			var res = $(dialogHTML);

			scope.data = params;
			scope.isShow = true;

			// Added by F.Zhu @ 2015/12/18
			scope.hideTitle = params.hideTitle;

			scope.hideDialog = function() {
				scope.isShow = false;
			};
			scope.onHandleClick = function($index) {
				scope.data.buttons[$index].click();
				scope.isShow = false;
			};

			$compile(res)(scope);

			if(!isRendered) {
				ele.append(res);
				isRendered = true;
			}
		}

		return {
			init: init
		}
	}


}