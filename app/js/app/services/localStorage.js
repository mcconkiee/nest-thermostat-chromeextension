angular.module('nest-extension.services').service('localStorage', [ function(){
	return{		
		get:function(obj,callback){
			chrome.storage.local.get(obj, callback);
		},
		update:function(obj,callback){
			chrome.storage.local.set(obj, callback);
		}
	}
}])