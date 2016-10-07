angular.module("nest-extension.services").service('rest', ['$http', function($http){

	return{		
		get:function(url,successCallback,errorCallback){
			$http.get(url).then(successCallback, errorCallback);    			
		},
		post:function(url,data,successCallback,errorCallback){			
			$http.post(url, data).then(successCallback, errorCallback);		
		}
	}
}])
