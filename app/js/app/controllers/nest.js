//https://developer-api.nest.com
angular.module('nest-extension.controllers').controller('NestCtrl', ['$scope', '$rootScope', 'rest', 'localStorage',
    function($scope, $rootScope, rest, localStorage) {
        $scope.dataRef = window.app.firebase;
        $scope.devices = null
        $scope.isLoading = true
        $scope.dataRef.on('value', function(snapshot) {
            $scope.isLoading = false            
            var data = snapshot.val();            
            $scope.$apply(function(){
            	$scope.devices = data.devices.thermostats	
                var keys = Object.keys(data.devices.thermostats)
                keys.forEach(function(key){
                    var device = $scope.devices[key];
                    $scope.$watch(device.target_temperature_f, function(newValue, oldValue, scope) {
                        console.log("new target_temperature_f",device);
                    }, true);
                })
            })
            console.log("updated thermostate value",snapshot,data);
        });
        //docs:
        //https://developer.nest.com/documentation/cloud/how-to-auth
        var KEY_ACCESS_TOKEN = window.app.KEY_ACCESS_TOKEN;

        $scope.$watch('access_token', function(newValue, oldValue, scope) {
            
            if (newValue != null) {                
                $scope.loadingMessage = "Loading..."
                $scope.dataRef.authWithCustomToken(newValue,function(error, authData){
                	$scope.isLoading = false;
                });	            
            }else {
                $scope.loadingMessage = "You will need to authenticate from the options page."
            }
        }, true);
        var baseURL = "https://developer-api.nest.com";
    }
])