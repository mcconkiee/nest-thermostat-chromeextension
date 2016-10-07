angular.module('nest-extension', ["nest-extension.controllers", "nest-extension.services"])
    .config(['$httpProvider',
        function($httpProvider) {
            $httpProvider.defaults.timeout = 5000;
        }
    ]);    
angular.module('nest-extension.controllers', [])
angular.module('nest-extension.services', [])
