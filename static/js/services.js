// var cmdb = angular.module('cmdb.services', [])
var codecheck = angular.module('codecheck.services', [])

//codecheck.factory('getkeys', function($q, $http) {

// codecheck.factory('getkeyservice', function($q, $http) {
//     // var url = "http://192.168.70.131:8888/key/?opt=selectall";
//     var d = $q.defer();
//     var promise = $http.get(url);
    


//     promise.success(function(data, status) {
//         d.resolve(data);
//         //var res = data 
//     });

//     promise.error(function(data, status) {
//         //console.log(data);
//         d.reject(data);
//     });

    
//     return {
//         getkey: function() {
//             return promise
//             //return [{'st':'134'}, {'st':'234'}];
//         }
//     };
// });



codecheck.factory('keyservice', function($q, $http) {
    // var url = "http://192.168.70.131:8888/key/?opt=selectall";
    // var d = $q.defer();
    // var promise = $http.get(url);
    var url = "http://192.168.70.131:8888/key/"
    // var header = headers : {
    //     "x-csrftoken" : $cookies.csrftoken
    // }
    
    
    return {
        getkeys: function(data, success, error) {
            var promise = $http.post(url, data);

            promise.success(function(response) {
                //d.resolve(response)

            });

            promise.error(function(response, status) {
                //
            });

            return promise
        },

        insertkey: function(data, success, error){
            var promise = $http.post(url, data);

            promise.success(function(response) {
                //d.resolve(response)

            });

            promise.error(function(response, status) {
                //
            });

            return promise

        },

        updatekey: function(data, success, error){
            var promise = $http.post(url, data);

            promise.success(function(response) {
                //d.resolve(response)

            });

            promise.error(function(response, status) {
                //
            });

            return promise

        },

        deletekey: function(data, success, error){

            var promise = $http.post(url, data);

            promise.success(function(response) {
                //d.resolve(response)

            });

            promise.error(function(response, status) {
                //
            });

            return promise

        },

        checkkey: function(data, success, error){

            var checkurl = "http://192.168.70.131:8888/review/"

            var promise = $http.post(checkurl, data);

            promise.success(function(response) {
                //d.resolve(response)

            });

            promise.error(function(response, status) {
                //
            });

            return promise

        }



    };
});


codecheck.factory('Insertkeyservice', function($q, $http) {
    
    var d = $q.defer();
  
    return {
        insertkey: function(key, content, success, error) {
            var url = "http://192.168.70.131:8888/key/?opt=insert"+"&key="+key+"&content="+content;
            var promise = $http.get(url);

            promise.success(function(data, status) {
                d.resolve(data);
            });

            promise.error(function(data, status) {
                d.reject(data);
            });
            return promise
        }
    };
});

// //cmdb.factory('GetServersSerivice', [function($q, $http){
// //    var service = {
// //        getServers: function() {
// //            var d = $q.defer();
// //            $http.get('/cmdb/servers/')
// //                .success(function(data, status) {
// //                    d.resolve(data);
// //                }).error(function(data, status) {
// //                    d.reject(data);
// //                });
// //            return d.promise;
// //        }
// //    }
// //    return service;
// //}]);
        
// cmdb.factory('GetServersService', function($q, $http) {
//     var d = $q.defer()
//     var baseUrl = '/incmdb/cmdb'
//     var promise = $http.get(baseUrl + '/servers/');

//     promise.success(function(data, status) {
//         d.resolve(data);
//         //var res = data 
//     });

//     promise.error(function(data, status) {
//         //console.log(data);
//         d.reject(data);
//     });

    
//     return {
//         getServers: function() {
//             return promise
//             //return [{'st':'134'}, {'st':'234'}];
//         }
//     };
// });

// cmdb.factory('EditMfrsService', function($q, $http) {
//     var baseUrl = '/incmdb/cmdb'
//     var d = $q.defer()
    
//     return {
//         getMfrs: function(data, success, error) {
//             var promise = $http.get(baseUrl + '/mfrs/');

//             promise.success(function(data, status) {
//                 d.resolve(data);
//             });

//             promise.error(function(data, status) {
//                 d.reject(data);
//             });
//             return promise
//         },

//         postMfrs: function(data, success, error) {
//             var promise = $http.post(baseUrl + '/mfrs/', data);

//             promise.success(function(response) {
//                 //d.resolve(response)

//             });

//             promise.error(function(response, status) {
//                 //
//             });

//             return promise
//         }
//     };
// });

// cmdb.factory('EditServerTypesService', function($q, $http) {
//     var baseUrl = '/incmdb/cmdb'
//     var d = $q.defer()
    
//     return {
//         getMfrs: function(data, success, error) {
//             var promise = $http.get(baseUrl + '/servertypes/');

//             promise.success(function(data, status) {
//                 d.resolve(data);
//             });

//             promise.error(function(data, status) {
//                 d.reject(data);
//             });
//             return promise
//         },

//         postMfrs: function(data, success, error) {
//             var promise = $http.post(baseUrl + '/servertypes/', data);

//             promise.success(function(response) {
//                 //d.resolve(response)

//             });

//             promise.error(function(response, status) {
//                 //
//             });

//             return promise
//         }
//     };
// });

// cmdb.factory('GetMfrsService', function($q, $http) {
//     var d = $q.defer()
//     var baseUrl = '/incmdb/cmdb'
//     var promise = $http.get(baseUrl + '/mfrs/');

//     promise.success(function(data, status) {
//         d.resolve(data);
//         //var res = data 
//     });

//     promise.error(function(data, status) {
//         //console.log(data);
//         d.reject(data);
//     });

    
//     return {
//         getServers: function() {
//             return promise
//             //return [{'st':'134'}, {'st':'234'}];
//         }
//     };
// });

// cmdb.factory('ManageDataService', function($q, $http) {
//     var baseUrl = '/incmdb/cmdb'
//     var pagePortal = '?page='
//     var d = $q.defer()
    
//     return {
//         getData: function(portal, data, success, error) {
//             var promise = $http.get(baseUrl + '/' + portal +'/');

//             promise.success(function(data, status) {
//                 d.resolve(data);
//             });

//             promise.error(function(data, status) {
//                 d.reject(data);
//             });
//             return promise
//         },

//         getPageData: function(portal, pageNum, success, error) {
//             var promise = $http.get(baseUrl + '/' + portal +'/' + pagePortal + pageNum);

//             promise.success(function(data, status) {
//                 d.resolve(data);
//             });

//             promise.error(function(data, status) {
//                 d.reject(data);
//             });
//             return promise
//         },

//         postData: function(url, data, success, error) {
//             var promise = $http.post(baseUrl + '/' + portal +'/', data);

//             promise.success(function(response) {
//                 //d.resolve(response)

//             });

//             promise.error(function(response, status) {
//                 //
//             });

//             return promise
//         },

//         deleteData: function(portal, data, obj, success, error) {
//             var url = baseUrl + '/' + portal + '/' + data + '/';
//             //var rObj = obj;
//             //var deferred = $q.defer()
//             var promise = $http.delete(url);

//             promise.success(function(response, status) {
//                 //d.resolve(response);

//             });

//             promise.error(function(response, status) {
//                 //
//             });
//             //$http.delete(url).success(function(data) {
//             //    deferred.resolve(rObj);
//             //}).error(function(data, status, header, config) {
//             //    //
//             //});


//             //return deferred.promise;
//             return promise;
//         },

//         putData: function(portal, priKey, data, success, error) {
//             var url = baseUrl + '/' + portal + '/' + priKey + '/';
//             var promise = $http.put(url, data);

//             promise.success(function(response) {
//                 //d.resolve(response)

//             });

//             promise.error(function(response, status) {
//                 console.log(response);
//                 //
//             });

//             return promise
//         }
//     };
// });

// cmdb.factory('FormatDateTimeService', function() {
    
//     return {
//         formatDatetime: function(datetime) {
//             if (datetime == undefined) {
//                 return datetime;
//             };
//             var f_dt = datetime.split("T");
//             var f_date = f_dt[0];
//             var t_time = f_dt[1].split(".");
//             var f_time = t_time[0];
//             var f_dt = f_date + " " + f_time;
//             return f_dt;
//         }
//     };
// });
