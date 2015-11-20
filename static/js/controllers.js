codecheck.controller('getkeys', function($scope, $uibModal,getkeyservicepost) {
  var data = {'opt': "selectall"};
    // getkeyservice.getkey()
    //     .then(function(data) {
    //          $scope.keys = data.data.result;
    //     });

    getkeyservicepost.postMfrs(data)
        .then(function(data) {
             $scope.keys = data.data.result;
        });

    $scope.animationsEnabled = true;
    $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });
    };

    $scope.ids = new Array();
    for(var i in $scope.keys) {
       $scope.ids.push($scope.keys[i].id);
     };
    $scope.choseArr=[];
    var flag="";
    var str="";
    $scope.x=false;

    // $scope.all= function (master,v) {//全选
      $scope.all= function (master) {//全选
            if(master==true){
                $scope.x=true;
                alert($scope.ids);
                $scope.choseArr=$scope.ids;
                flag="a";
            }else{
                $scope.x=false;
                $scope.choseArr=[];
            }

            

        };
    $scope.chk= function (z,x) {//单选或者多选
            if(flag=="a") {//在全选的基础上操作
                str = $scope.choseArr.join(",") + ",";
            }
            if (x == true) {//选中
                str = str + z + ",";
            } else {
                str = str.replace(z + ",", "");//取消选中
            }

            $scope.choseArr=(str.substr(0,str.length-1)).split(",");

        };


    $scope.delete= function () {// 操作CURD

            if($scope.choseArr[0]==""||$scope.choseArr.length==0){//没有选择一个的时候提示
                alert("请至少选中一条数据在操作！")
                return;
            };

            for(var i=0;i<$scope.choseArr.length;i++){
                //alert($scope.choseArr[i]);
                console.log($scope.choseArr[i]);//遍历选中的id
            }



        };




});

codecheck.controller('ModalDemoCtrl', function ($scope, $uibModal) {


  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });
  };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

codecheck.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, Insertkeyservice, getkeyservice) {


  $scope.ok = function () {
     var key = $scope.key;
     var content = $scope.content;
     Insertkeyservice.insertkey(key,content)
     .then(function(data) {
            alert(data.data.result);window.location.reload();
        });

     // getkeyservice.getkey()
     //    .then(function(data) {
     //      alert('test');
     //      $scope.keys = data.data.result;
     //    });
     $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// //var cmdb = angular.module('cmdb', ['cmdb.services', 'ui.bootstrap'])

// cmdb.controller('HomeController', function($scope, $uibModal, GetServersService) {
//     GetServersService.getServers()
//         .then(function(data) {
//             $scope.servers = data.data;
//         });

//     //ui:modal
//     $scope.animationsEnabled = true;
//     $scope.open = function(size) {
//         var modalInstance = $uibModal.open({
//             animation: $scope.animationsEnabled,
//             templateUrl: 'addServerModal.html',
//             controller: '',
//             size: size
//         });

//         $scope.toggleAnimation = function() {
//             $scope.animationsEnabled = !$scope.animationsEnabled;
//         };
//     };
// });

// cmdb.controller('MfrsModalController', function($scope, $uibModal) {
//     //ui:modal
//     $scope.animationsEnabled = true;
//     $scope.open = function(size) {
//         var modalInstance = $uibModal.open({
//             animation: $scope.animationsEnabled,
//             templateUrl: 'addMfrsModal.html',
//             controller: 'AddMfrsController',
//             size: size
//         });


//         $scope.toggleAnimation = function() {
//             $scope.animationsEnabled = !$scope.animationsEnabled;
//         };
//     };
// });

// cmdb.controller('AddMfrsController', function($scope, $uibModal, $uibModalInstance, EditMfrsService, ManageDataService, FormatDateTimeService) {
//     $scope.alerts = [];
//     $scope.alerted = "false";
//     $scope.closeable = "false";
    
//     $scope.submit = function(cont){
//         //console.log("cont is " + cont);
//         var data = {'name': $scope.name, 'notes': $scope.notes};
//         EditMfrsService.postMfrs(data)
//           .then(function(rec) {
//               if (cont == "false") {
//                 $scope.ok(data);
//                 var open = function(size) {
//                     var modalInstance = $uibModal.open({
//                         animation: $scope.animationsEnabled,
//                         templateUrl: 'success.html',
//                         controller: 'SuccessController',
//                         size: size,
//                         resolve: {
//                             msg: function(){ 
//                                 return "添加生产厂商成功";
//                             }
//                         }
//                     });
//                 };
//                 open('sm');
//               } else {
//                 $scope.closeable = "false";
//                 $scope.alerts = [{type: 'success', msg: '添加服务器厂商成功'}];
//                 //$scope.name = '';
//                 //$scope.notes = '';
//             };

//         },
//             function(rec) {
//               $scope.closeable = "false";
//               var res = rec.data['name'][0].split(":");
//               var status = res[0]
//               if ( status == "10001") {
//                   var msg = "生产厂商名称不能为空"
//               }
//               else if (status == "10003") {
//                   var msg = "生产厂商名称已存在，请输入新的厂商名称"
//              };
//              $scope.alerts = [{type: 'danger', msg: msg}];
//         });
//     };

//     $scope.closelabel = function() {
//         $scope.closeable = !$scope.closeable;
//         //console.log($scope.closeable);
//     };

//     $scope.ok = function(data) {
//         $uibModalInstance.close(data);
//     };

//     $scope.cancel = function() {
//         $uibModalInstance.dismiss('cancel');
//     };

// });

// cmdb.controller('SuccessController', function($scope, $uibModalInstance, msg) {
//     $scope.msg = msg;
//     $scope.close = function() {
//         $uibModalInstance.dismiss('cancel');
//     };
// });

// cmdb.controller('TypesModalController', function($scope, $uibModal) {
//     //ui:modal
//     $scope.animationsEnabled = true;
//     $scope.open = function(size) {
//         var modalInstance = $uibModal.open({
//             animation: $scope.animationsEnabled,
//             templateUrl: 'addTypesModal.html',
//             controller: 'TypesController',
//             size: size
//         });


//         $scope.toggleAnimation = function() {
//             $scope.animationsEnabled = !$scope.animationsEnabled;
//         };
//     };
// });

// cmdb.controller('TypesController', function($scope, $uibModal, $uibModalInstance, EditServerTypesService, GetMfrsService) {
//     //get data
//     GetMfrsService.getServers()
//         .then(function(data) {
//             var items = data.data;
//             var mfrs = new Array();
//             for(var i in items) {
//                 mfrs.push(items[i]["name"]);
//             };
//             $scope.mfrs = mfrs;
//             $scope.mfr = $scope.mfrs[0];
//         });

//     //commit data
//     $scope.submit = function(cont){
//         var data = {'name': $scope.name, 'mfrs': $scope.mfr, 'notes': $scope.notes};
//         EditServerTypesService.postMfrs(data)
//           .then(function(rec) {
//               //console.log(data)
//               if (cont == "false") {
//                 $scope.close();
//                 var open = function(size) {
//                     var modalInstance = $uibModal.open({
//                         animation: $scope.animationsEnabled,
//                         templateUrl: 'success.html',
//                         controller: 'SuccessController',
//                         size: size,
//                         resolve: {
//                             msg: function(){ 
//                                 return "添加设备型号成功";
//                             }
//                         }
//                     });
//                 };
//                 open('sm');
//               }
//             else {
//                 $scope.closeable = "false";
//                 $scope.alerts = [{type: 'success', msg: '添加服务器厂商成功'}];
//                 //console.log($scope.name);
//                 //$scope.name = '';
//                 //$scope.notes = '';
//             };

//         },
//             function(rec) {
//               $scope.closeable = "false";
//               var res = rec.data['name'][0].split(":");
//               var status = res[0]
//               if ( status == "10001") {
//                   var msg = "设备型号不能为空"
//               }
//               else if (status == "10004") {
//                   var msg = "此生产厂商下已有此型号，请输入新的设备型号"
//              };
//              $scope.alerts = [{type: 'danger', msg: msg}];
//         });
//     };

//     //control alters label
//     $scope.alerts = [];
//     $scope.alerted = "false";
//     $scope.closeable = "false";

//     $scope.closelabel = function() {
//         $scope.closeable = !$scope.closeable;
//     };

//     //close modal
//     $scope.close = function() {
//         $uibModalInstance.dismiss('cancel');
//     };

// });

// cmdb.controller('DropdownCtrl', function ($scope, $log) {
//   $scope.items = [
//     'The first choice!',
//     'And another choice for you.',
//     'but wait! A third!'
//   ];

//   $scope.status = {
//     isopen: false
//   };

//   $scope.toggled = function(open) {
//     $log.log('Dropdown is now: ', open);
//   };

//   $scope.toggleDropdown = function($event) {
//     $event.preventDefault();
//     $event.stopPropagation();
//     $scope.status.isopen = !$scope.status.isopen;
//   };
// });

// cmdb.controller('ManageMfrsController', function($scope, $uibModal, ManageDataService, FormatDateTimeService) {
//     var portal = "mfrs";
//     var pagePortal = "?page=";
//     $scope.animationsEnabled = true;
//     $scope.pageNum = "1";
//     $scope.selPageNum = $scope.pageNum;
//     $scope.widthPx = "13";
//     $scope.maxZize = "5";
//     $scope.itemsPerPage = "20";
//     var tempNum = "1";

//     //array: add prototype 'remove'
//     Array.prototype.remove = function(obj) {
//         for(var i = 0;i < this.length;i++) {
//             var temp = this[i];
//             if (!isNaN(obj)) {
//                 temp = i;
//             };
//             if (temp == obj) {
//                 for(var j = i; j < this.length; j++) {
//                     this[j] = this[j+1];
//                 }
//                 this.length = this.length - 1;
//             };
//         };
//     };

//     //get Mfrs data
//     $scope.getMfrsData = function(portal) {
//         ManageDataService.getData(portal)
//         .then(function(data) {
//             $scope.count = data.data.count;
//             var pageNum = $scope.pageNum;
//             var sid = (parseInt(pageNum) - 1) * $scope.itemsPerPage + 1;
//             var mfrs = data.data.results;
//             for(var i = 0;i < mfrs.length; i++) {
//                 mfrs[i]["c_date"] = FormatDateTimeService.formatDatetime(mfrs[i]["c_date"]);
//                 mfrs[i]["u_date"] = FormatDateTimeService.formatDatetime(mfrs[i]["u_date"]);
//                 mfrs[i]["sid"] = parseInt(sid) + i;
//             };
//             $scope.mfrs = mfrs;
//             $scope.totalPage = Math.ceil($scope.count/20).toString();
//             $scope.pageNumLength = $scope.totalPage.length;
//             $scope.widthPx = $scope.widthPx * $scope.pageNumLength;
//         }, function (data) {
//               console.log(data);
//         });
//     };
    
//     $scope.getMfrsData(portal);

//     //ui:add data modal
//     $scope.open = function(size) {
//         var modalInstance = $uibModal.open({
//             animation: $scope.animationsEnabled,
//             templateUrl: 'addMfrsModal.html',
//             controller: 'AddMfrsController',
//             size: size
//         });

//         modalInstance.result.then(function (data) {
//             $scope.getMfrsData(portal);
//         }, function() {
//             $scope.getMfrsData(portal);
//         });


//         $scope.toggleAnimation = function() {
//             $scope.animationsEnabled = !$scope.animationsEnabled;
//         };
//     };

//     //table: select
//     $scope.selected = [];
//     $scope.select = function(obj) {
//         if (obj.selected == undefined || obj.selected == false) {
//             obj.selected = true;
//             $scope.selected.push(obj);
//         } else {
//             obj.selected = false;
//             $scope.selected.remove(obj);
//         };
//     };
    
//     $scope.selectAll = function() {
//         if ($scope.selected.length > 0) {
//             for (var i = 0; i < $scope.selected.length; i++) {
//                 $scope.selected[i].selected = false;
//             };
//             $scope.selected = [];
//         } else {
//             $scope.selected = $scope.mfrs;
//             for (var i = 0; i < $scope.selected.length; i++) {
//                 $scope.selected[i].selected = true;
//             };
//         };
//         console.log($scope.selected);
//     };

//     //delete data
//     $scope.delete = function(size) {
//         if ($scope.selected.length < 1) {
//             var modalInstance = $uibModal.open({
//                 animation: $scope.animationsEnabled,
//                 templateUrl: 'info.html',
//                 controller: 'InfoMsgCtrl',
//                 size: size,
//                 resolve: {
//                     msg: function() {
//                         return "请先选择数据，再进行删除操作！";
//                     },
//                     title: function() {
//                         return "提示";
//                     }
//                 }
//             });
//         } else {
//             var modalInstance = $uibModal.open({
//                 animation: $scope.animationsEnabled,
//                 templateUrl: 'deleteMessages.html',
//                 controller: 'DelMsgController',
//                 size: size,
//                 resolve: {
//                     msg: function() {
//                         return "是否确认删除选中的" + $scope.selected.length + "条数据";
//                     }
//                 }
//             });

//             modalInstance.result.then(function () {
//                 var portal = "mfrs";
//                 var c = $scope.selected.length;
//                 for(var i = 0; i < $scope.selected.length; i++) {
//                     var sel = $scope.selected[i];
//                     ManageDataService.deleteData(portal, sel["id"], sel)
//                         .then(function(res) {
//                             $scope.getMfrsData(portal);
//                     });
//                 };
//                 $scope.selected = [];
//             });
//         };
//     };

//     //pagination
//     $scope.pageChange = function() {
//         //if (e.keyCode == 13) {
//         //    if (!isNaN($scope.selPageNum)) {
//         //        $scope.pageNum = $scope.selPageNum;
//         //    } else {
//         //        $scope.selPageNum = $scope.pageNum;
//         //    };
//         //};
//         $scope.getPageData(portal, $scope.selPageNum);
//     };

//     $scope.getPageData = function(portal, pageNum) {
//         ManageDataService.getPageData(portal, pageNum)
//         .then(function(data) {
//             var sid = (parseInt(pageNum) - 1) * $scope.itemsPerPage + 1;
//             var mfrs = data.data.results;
//             for(var i = 0; i < mfrs.length;i++) {
//                 mfrs[i]["c_date"] = FormatDateTimeService.formatDatetime(mfrs[i]["c_date"]);
//                 mfrs[i]["u_date"] = FormatDateTimeService.formatDatetime(mfrs[i]["u_date"]);
//                 mfrs[i]["sid"] = parseInt(sid) + i;
//             };
//             $scope.mfrs = mfrs;
//         }, function (data) {
//               console.log(data);
//         });
//     };

//     $scope.checkNum = function(e) {
//         if (isNaN($scope.selPageNum)) {
//             $scope.selPageNum = tempNum;
//         } else {
//             tempNum = $scope.selPageNum;
//         };
//     };

//     //edit data
//     $scope.edit = function(size) {
//         if ($scope.selected.length != 1) {
//             var modalInstance = $uibModal.open({
//                 animation: $scope.animationsEnabled,
//                 templateUrl: 'info.html',
//                 controller: 'InfoMsgCtrl',
//                 size: size,
//                 resolve: {
//                     msg: function() {
//                         return "请先选择1条数据，再进行修改操作！";
//                     },
//                     title: function() {
//                         return "提示";
//                     }
//                 }
//             });
//         } else {
//             var modalInstance = $uibModal.open({
//                 animation: $scope.animationsEnabled,
//                 templateUrl: 'editMfrsModal.html',
//                 controller: 'EditMfrsController',
//                 size: size,
//                 resolve: {
//                     data: function() {
//                         return $scope.selected[0];
//                     }
//                 }
//             });

//             modalInstance.result.then(function (data) {
//                 $scope.getPageData(portal, $scope.selPageNum);
//             });


//             $scope.toggleAnimation = function() {
//                 $scope.animationsEnabled = !$scope.animationsEnabled;
//             };
//         };
//     };
// });

// cmdb.controller('DelMsgController', function($scope, $uibModalInstance, msg) {
//     $scope.msg = msg;
//     $scope.ok = function() {
//         $uibModalInstance.close('ok');
//     };

//     $scope.cancel = function() {
//         $uibModalInstance.dismiss('cancel');
//     };
// });

// cmdb.controller('InfoMsgCtrl', function($scope, $uibModalInstance, title, msg) {
//     $scope.title = title;
//     $scope.msg = msg;
//     $scope.close = function() {
//         $uibModalInstance.dismiss('ok');
//     };
// });

// cmdb.controller('EditMfrsController', function($scope, $uibModal, $uibModalInstance, ManageDataService, data) {
//     var portal = "mfrs";
//     $scope.data = data; 
//     $scope.name = data["name"];
//     $scope.notes = data["notes"];
//     $scope.submit = function(){
//         var data = {'name': $scope.name, 'notes': $scope.notes};
//         ManageDataService.putData(portal, $scope.data["id"], data)
//            .then(function(rec) {
//                 $scope.ok(data);
//                 var open = function(size) {
//                     var modalInstance = $uibModal.open({
//                         animation: $scope.animationsEnabled,
//                         templateUrl: 'info.html',
//                         controller: 'InfoMsgCtrl',
//                         size: size,
//                         resolve: {
//                             msg: function() {
//                                 return "修改数据成功！";
//                             },
//                             title: function() {
//                                 return "提示";
//                             }
//                         }
//                     });
//                 };
//                 open('sm');
//             },
//                 function(rec) {
//                   $scope.closeable = "false";
//                   var res = rec.data['name'][0].split(":");
//                   var status = res[0];
//                   if ( status == "10001") {
//                       var msg = "生产厂商名称不能为空";
//                   }
//                   else if (status == "10003") {
//                       var msg = "生产厂商名称已存在，请输入新的厂商名称";
//                  };
//                  $scope.alerts = [{type: 'danger', msg: msg}];
//         });
//     };

//     $scope.ok = function(data) {
//         $uibModalInstance.close(data);
//     };

//     $scope.cancel = function() {
//         $uibModalInstance.dismiss('cancel');
//     };

// });
