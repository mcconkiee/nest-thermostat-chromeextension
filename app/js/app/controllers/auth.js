angular.module('nest-extension.controllers').controller('AuthCtrl', ['$scope', '$rootScope', 'rest', 'localStorage',
    function($scope, $rootScope, rest, localStorage) {
        var KEY_ACCESS_TOKEN = window.app.KEY_ACCESS_TOKEN;
        var CLIENT_ID = window.app.PRODUCT_ID;
        var SECRET = window.app.SECRET;
        var STATE = Math.random().toString(36).substring(7);
        var initRequest = "https://home.nest.com/login/oauth2?client_id=" + CLIENT_ID + "&state=" + STATE
        $scope.needsAuth = true;
        localStorage.get(KEY_ACCESS_TOKEN, function(data) {

            if (data.access_token) {
                $scope.access_token = data.access_token                                
                $scope.needsAuth = false;
            }else{
                $scope.needsAuth = true;
            }
            
            $scope.$apply()
        });

        $scope.onReset = function(e) {
            localStorage.update({
                "access_token": null
            }, function(x) {
                $scope.needsAuth = true
                $scope.access_token = null
                $scope.onAuth(e)
            })
        }
        $scope.onAuth = function(e) {
            if (!$scope.access_token) {
                chrome.identity.launchWebAuthFlow({
                        'url': initRequest,
                        'interactive': true
                    },
                    function(redirect_url) {

                        //ie: https://neliikcmclghokhabllfcmdejehldkdb.chromiumapp.org/provider_cb?state=asdlfkjahslfdjkal&code=G95ANB4RA3D38356
                        var comps = redirect_url.split("code=");
                        var code = comps[comps.length - 1]; // last compontnent
                        var params = {
                            'code': code,
                            'client_id': CLIENT_ID,
                            'client_secret': SECRET,
                            'grant_type': 'authorization_code'
                        }
                        var accessUrl = "https://api.home.nest.com/oauth2/access_token?client_id=" + CLIENT_ID + "&code=" + code + "&client_secret=" + SECRET + "&grant_type=authorization_code"
                        rest.post(accessUrl, null, function(result) {
                            var token = result.data.access_token;
                            $scope.access_token = token;
                            localStorage.update({
                                "access_token": token
                            }, function(x) {
                                $scope.needsAuth = false
                            })

                        }, function(reason) {
                            console.log("fail access", reason);
                        })

                    });
            } else {
                $scope.needsAuth = false
            }
        }




    }
])