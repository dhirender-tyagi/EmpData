var app = angular.module("project",[]);

app.directive("empForm", [function ($scope) {
    return{
        restrict: 'E',
        replace: true,
        template:'<div height="800px" width="1000px"><table>'+
        				'<tr height="50px" width="1000px">'+
        				  '<th class="td" width="200px">name</th><th class="td" width="200px">age</th><th class="td" width="200px">id</th><th width="200px">date</th><th width="200px">action</th>'+
        				'</tr>'+
        				'<tr ng-repeat="items in empData">'+
		        		 '<td class="td" ng-hide="editMode[$index]"><span ng-bind="items.name"></td><td class="td" ng-show="editMode[$index]"></span><input class="textbx" type="text" ng-model="items.name"/></td>'+
		        		 '<td class="td" ng-hide="editMode[$index]"><span ng-bind="items.age"></td><td class="td" ng-show="editMode[$index]"></span><input class="textbx" type="text" ng-model="items.age"/></td>'+
		        		 '<td class="td" ng-hide="editMode[$index]"><span ng-bind="items.id"></span></td><td class="td" ng-show="editMode[$index]"><input class="textbx" type="text" ng-model="items.id"/></td>'+
                         '<td class="td" ng-hide="editMode[$index]"><span ng-bind="items.date"></span></td><td class="td" ng-show="editMode[$index]"><input type="text" class="datepicker" ng-model="datevalue"/></td>'+
		        		 '<td><button style="margin-left:5%;width:60px" ng-click="edit($index)" ng-hide="editMode[$index]">edit</button>'+
		        		 '<button style="margin-left:20%;width:60px" ng-click="delete($index)" ng-hide="editMode[$index]">delete</button>'+
		        		 '<button style="margin-left:5%" ng-click="save($index)" ng-show="editMode[$index]">save</button></td>'+
		        		'</tr>'+
		        	   '</table>'+
		        	   '<button style="margin-top:3%;margin-left:65%" ng-hide="addMode" ng-click="addNew()">Add new</button>'+
		           '</div>',

        link: function ($scope) {
            $scope.edit = function (index) {
            	console.log("index>>>---- " + index);
                console.log("previou is " + $scope.editMode[$scope.temp]);
            	if ($scope.addMode  || $scope.editMode[$scope.temp] == true) {
                    return
                }
            	$scope.editMode[$scope.temp] = false;
                $scope.editMode[index] = true;
                $scope.temp = index;
                $(".datepicker").datepicker();
                var x = document.getElementsByClassName("datepicker");
                x[index].value = $scope.empData[index].date;
                return;
            }
            $scope.save = function (index) {
                if ($scope.empData[index].name == "" || $scope.empData[index].id == "") {
                    alert("Employee name or id can not be empty");
                    return
                }
                var x = document.getElementsByClassName("datepicker");
                console.log("date is  "+ x[index].value);
                $scope.empData[index].date = x[index].value;
                $scope.editMode[index] = false;
                $scope.addMode = false;
                return;
            }
            $scope.addNew = function () {
                $scope.editMode[$scope.temp] = false;
                if ($scope.addMode) {
                    return;
                }
            	$scope.empData[$scope.empData.length] = {"name":"","age":"","id":""};
                $scope.editMode[($scope.empData.length)-1] = true;
                $scope.addMode = true;
                return;
            }
             $scope.delete = function (index) {
                if ($scope.addMode  || $scope.editMode[$scope.temp] == true) {
                    return;
                }
             	$scope.empData.splice(index, 1);
             	console.log(">>>>"+JSON.stringify($scope.empData));
             	console.log(">>>> >>> "+$scope.empData.length);
                return;
            }
        }
    }

}]);

app.controller('empController',function($scope){
    $scope.empData = [{"name":"dhirender","age":"26","id":"DFG-1573","date":"09/02/2013"},{"name":"Bharat","age":"26","id":"DFG-1520","date":"10/20/2011"}];
    $scope.editMode = [];
    $scope.addMode = false;
    $scope.temp = -1;
});

