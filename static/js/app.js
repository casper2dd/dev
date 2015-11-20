//var cmdb = angular.module('cmdb', ['ngRoute',
//                                   'cmdb.services',
//                                   'cmdb.directives']);
//
//cmdb.config(function($routeProvider) {
//    $routeProvider
//        .when('/', {
//            controller: 'MainController',
//            templateUrl: 'static/templates/cmdb/main.html'
//        })
//        .otherwise({
//            redirectTo: '/'
//        });
//});

// var cmdb = angular.module('cmdb', ['cmdb.services', 'ui.bootstrap'])
var codecheck = angular.module('myApp', ['codecheck.services','ngCookies','ui.bootstrap'])
codecheck.config(function($interpolateProvider) {  
    $interpolateProvider.startSymbol('[[');  
    $interpolateProvider.endSymbol(']]');  
}).config(['$httpProvider', function($httpProvider) {  
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';  
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'; 
    $httpProvider.defaults.withCredentials = true; 
}]);  