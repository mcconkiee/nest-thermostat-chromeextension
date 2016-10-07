angular.module('nest-extension.controllers').controller('DeviceCtrl', ['$scope', '$rootScope', 'rest', 'localStorage',
    function($scope, $rootScope, rest, localStorage) {


        $scope.loadSlider = function(index, device) {
            $scope.device = device;
            //initialize slider
            setTimeout(function(){
                var deviceId = $scope.device.device_id;
                var elem = "#slider_" + deviceId;
                var $ = window.jQuery


                $(elem).slider({
                    value: $scope.device.ambient_temperature_f,
                    tooltip_position:'left',
                    formatter: function(value) {
                        console.log("device is",$scope.device);
                        return value + '°';
                    }
                });
                $(elem).on("slideStop", function(e) {
                    if (e.currentTarget.id == ("slider_"+$scope.device.device_id)) {
                        var newTemp = e.value;
                        var hvac_mode = $scope.device.hvac_mode
                        $scope.device.target_temperature_f = newTemp;                        
                        var type = (hvac_mode) ? hvac_mode :"";
                        var scale = "f";//$scope.device.temperature_scale.toLowerCase()
                        var path = 'devices/thermostats/' + $scope.device.device_id + '/target_temperature_'  + scale;
                        $scope.dataRef.child(path).set(newTemp);
                        
                    }
                })
            },120)
        }




    }
])