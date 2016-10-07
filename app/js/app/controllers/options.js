angular.module('nest-extension.controllers')
    .controller('OptionsCtrl', ['$scope','$rootScope', 'localStorage',
        function($scope,$rootScope, localStorage) {
            var changing = false
            $(function() {
                $('[data-toggle="popover"]').popover()
            })
            $scope.updateIP = function(event){
                localStorage.update({
                    ipaddress: $scope.ipaddress
                }, function() {
                    // Update status to let user know options were saved.
                    var status = document.getElementById('status');
                    status.textContent = 'Options saved.';
                    setTimeout(function() {
                        status.textContent = '';
                    }, 750);
                    $rootScope.$broadcast("ipaddress", $scope.ipaddress)
                })
            }
            // Saves options to chrome.storage.sync.
            $scope.save_options = function(event) {
                var _ipaddress = document.getElementById('ipaddress').value;
                $scope.ipaddress = _ipaddress
                $scope.updateIP(null)
            }
            // Restores select box and checkbox state using the preferences
            // stored in chrome.storage.
            $scope.restore_options = function() {
                localStorage.dbItems(function(items) {
                    document.getElementById('ipaddress').value = items.ipaddress;
                })
            }
        }
    ])