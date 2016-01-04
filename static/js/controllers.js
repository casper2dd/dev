codecheck.controller('getkeys', function($scope, $uibModal,keyservice) {
  var data = {'opt': "selectall"};

  $scope.alertshow = false;

  $scope.opters = ['lianhceng','liancheng2','liancheng3']

    keyservice.getkeys(data)
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


    $scope.edit = function (id,key,content,size) {
    var editdict = {
      'eid':id,
      'ekey':key,
      'econtent':content
    };


    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'edit.html',
      controller: 'editCtrl',
      size: size,
      resolve: {
        pk: function () {
          return editdict;
        }
      }
    });
    };

    $scope.selected = [];
    var updateSelected = function (action, id) {
        if (action == 'add' && $scope.selected.indexOf(id) == -1) $scope.selected.push(id);
        if (action == 'remove' && $scope.selected.indexOf(id) != -1) $scope.selected.splice($scope.selected.indexOf(id), 1);
    };

    $scope.updateSelection = function ($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id);
    };

    $scope.selectAll = function ($event) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        for (var i = 0; i < $scope.keys.length; i++) {
            var entity = $scope.keys[i];
            updateSelected(action, entity.id);
        }
    };

    $scope.getSelectedClass = function (id) {
        return $scope.isSelected(id) ? 'selected' : '';
    };

    $scope.isSelected = function (id) {
        return $scope.selected.indexOf(id) >= 0;
    };

    $scope.delete = function () {// 操作CURD

            if($scope.selected[0]==""||$scope.selected.length==0){//没有选择一个的时候提示
                alert("请至少选中一条数据在操作！")
                return;
            };
            var r=confirm("确定删除?")
            if (r === true){
            var data = {'opt': 'delete','pklist': $scope.selected};
            keyservice.deletekey(data)
            .then(function(data) {
              alert(data.data.result);window.location.reload();
              });
            }


            
          };


        $scope.run = function() {

                $scope.alerts = [];

                if($scope.filepath === undefined || $scope.filepath.length ===0 ){
                  alert("请填写需要过滤的文件！")
                  return;
                };
                var filepath = $scope.filepath;
                var data = {'filepath': filepath};
                keyservice.checkkey(data)
               .then(function(data) {
               var status = data.data.code;
               var result = data.data.result;

               if(status ===202){
                $scope.alerttype = '';
                $scope.alerts = [
                     result];

               }
                else if(status ===201){
                $scope.alerts = [
                     result];
                $scope.alerttype = 'success';

                }
                  else{
                    $scope.alerttype = 'danger';
                    for(x in result){

                      var msg = ('第'+x+'行'+' : '+result[x]);
                      $scope.alerts.push(msg);
                    }

                  }
        });

                $scope.alertshow = true;
  };

        $scope.closeAlert = function(index) {
                $scope.alertshow = false;
                $scope.alert = {}
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


codecheck.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, keyservice) {

  $scope.ok = function () {
     var key = $scope.key;
     var content = $scope.content;
     var data = {'opt': 'insert','key': key,'content' : content};

     keyservice.insertkey(data)
     .then(function(data) {
            alert(data.data.result);window.location.reload();
        });


     $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


codecheck.controller('editCtrl', function ($scope, $uibModalInstance, keyservice,pk) {

  $scope.ekey = pk.ekey;
  $scope.econtent = pk.econtent;
  var pk = pk.eid


  $scope.ok = function () {
     var key = $scope.ekey;
     var content = $scope.econtent;
     // var id = $scope.eid;
     var data = {'opt': 'update','pk': pk,'key': key,'content' : content};
     // Insertkeyservice.insertkey(key,content)
     keyservice.updatekey(data)
     .then(function(data) {
            alert(data.data.result);window.location.reload();
        });

     $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


//脚本管理控制器
codecheck.controller('scriptmanager', function($scope, $uibModal,keyservice) {
  var data = {'opt': "selectall"};

  $scope.alertshow = false;

  $scope.opters = ['lianhceng','liancheng2','liancheng3']

    keyservice.getkeys(data)
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


    $scope.edit = function (id,key,content,size) {
    var editdict = {
      'eid':id,
      'ekey':key,
      'econtent':content
    };


    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'edit.html',
      controller: 'editCtrl',
      size: size,
      resolve: {
        pk: function () {
          return editdict;
        }
      }
    });
    };

    $scope.selected = [];
    var updateSelected = function (action, id) {
        if (action == 'add' && $scope.selected.indexOf(id) == -1) $scope.selected.push(id);
        if (action == 'remove' && $scope.selected.indexOf(id) != -1) $scope.selected.splice($scope.selected.indexOf(id), 1);
    };

    $scope.updateSelection = function ($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id);
    };

    $scope.selectAll = function ($event) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        for (var i = 0; i < $scope.keys.length; i++) {
            var entity = $scope.keys[i];
            updateSelected(action, entity.id);
        }
    };

    $scope.getSelectedClass = function (id) {
        return $scope.isSelected(id) ? 'selected' : '';
    };

    $scope.isSelected = function (id) {
        return $scope.selected.indexOf(id) >= 0;
    };

    $scope.delete = function () {// 操作CURD

            if($scope.selected[0]==""||$scope.selected.length==0){//没有选择一个的时候提示
                alert("请至少选中一条数据在操作！")
                return;
            };
            var r=confirm("确定删除?")
            if (r === true){
            var data = {'opt': 'delete','pklist': $scope.selected};
            keyservice.deletekey(data)
            .then(function(data) {
              alert(data.data.result);window.location.reload();
              });
            }


            
          };


        $scope.run = function() {

                $scope.alerts = [];

                if($scope.filepath === undefined || $scope.filepath.length ===0 ){
                  alert("请填写需要过滤的文件！")
                  return;
                };
                var filepath = $scope.filepath;
                var data = {'filepath': filepath};
                keyservice.checkkey(data)
               .then(function(data) {
               var status = data.data.code;
               var result = data.data.result;

               if(status ===202){
                $scope.alerttype = '';
                $scope.alerts = [
                     result];

               }
                else if(status ===201){
                $scope.alerts = [
                     result];
                $scope.alerttype = 'success';

                }
                  else{
                    $scope.alerttype = 'danger';
                    for(x in result){

                      var msg = ('第'+x+'行'+' : '+result[x]);
                      $scope.alerts.push(msg);
                    }

                  }
        });

                $scope.alertshow = true;
  };

        $scope.closeAlert = function(index) {
                $scope.alertshow = false;
                $scope.alert = {}
  };



}); 


codecheck.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, scriptservice, scriptinfoservice) {

  $scope.vartable = [];
  $scope.addvartable = function () {
  $scope.varname='';
  $scope.itermname='';
  $scope.content='';
  $scope.vartable.push({varname:$scope.varname,itermname:$scope.itermname,content:$scope.content});
  };



  $scope.delvartable = function (index) {
    $scope.vartable.splice(index, 1);

  };


  $scope.ok = function () {

    var data = {'opt': 'insert','name': 'test','content' : 'test','opter':'liancheng','path':'/test/tmp','flag':'0'};
    scriptservice.insertkey(data)
    .then(function(data) {
            alert(data.data.result);
            scriptservice.selectkey({'opt':'select','name':'test'})
            .then(function(data) {
              alert(data.data.result);
            });
        });


     var key = $scope.key;
     var content = $scope.content;
     var data = {'opt': 'insert','key': key,'content' : content};

     keyservice.insertkey(data)
     .then(function(data) {
            alert(data.data.result);window.location.reload();
        });


     $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});