var app=angular.module("myApp",[])

app.controller("ParentController1" ,['$scope', '$rootScope',function( $scope,$rootScope){
    $scope.a=10;
    $scope.b=20;
    
    $scope.doCalculate=function(){
        $scope.$emit("DoCalculateEvent");
    }
    
    $scope.doCalculateBroacast= function(){
        $scope.$broadcast("DoCalculateEventBroadcast");
    }
    
    
    $scope.$on("DoCalculateEventBroadcast",function(e,data){
        console.log(" Parent1.DoCalculateEventBroadcast Event handled in the same scope ParentController1 by Broadcast");
    });
    
    
    
    $scope.$on("DoCalculateEvent" , function (e,data){
        console.log("Parent1.DoCalculateEvent Event handled in the  Scope ParentController1 by Emit");
    });
    
    
    $rootScope.$on("DoCalculateEvent" , function (e,data){
        console.log("root.Parent1.DoCalculateEvent Event handled in the  rootScope ParentController1 by Emit");
    });
    
    
    //-- BroadCast at the root level --//
    $scope.doCalculateBroadCastRoot= function(){
        $rootScope.$broadcast("DoCalculateEventBroadCastRoot");
    }
    
    $scope.$on("DoCalculateEventBroadCastRoot",function(e,data){
        console.log("Parent.DoCalculateEventBroadCastRoot by Broadcast raised a rootScope for scope");
    });
    
    $rootScope.$on("DoCalculateEventBroadCastRoot",function(e,data){
        console.log("Root.Parent.DoCalculateEventBroadCastRoot by by Broadcast raised a rootScope");
    });
    
    //-- BroadCast at the root level --//
    
    
    
    
    
    
}]);

app.controller("ParentController2",['$scope','$rootScope',function( $scope,$rootScope){
    
    $scope.c=30;
    $scope.d=40;
    
    $rootScope.$on("DoCalculateEvent" , function (e,data){
        console.log(" root.Sibling.DoCalculate Event Event handled in the   rootScope SiblingController by Emit");
    });
    
    $scope.$on("DoCalculateEventBroadcast",function(e,data){
        console.log("scope.Sibling.DoCalculate Event handled in the same scope SiblingController by Broadcast");
    });
    

        //-- BroadCast at the root level --//
    
        $scope.$on("DoCalculateEventBroadCastRoot",function(e,data){
        console.log("sibling.DoCalculateEventBroadCastRoot by Broadcast raised by rootScope for scope");
    });
    
    $rootScope.$on("DoCalculateEventBroadCastRoot",function(e,data){
        console.log("Root.sibling.DoCalculateEventBroadCastRoot by Broadcast raised a rootScope");
    });
    
            //-- BroadCast at the root level --//
    
    
    
}]);

app.controller("ChildController",['$scope','$rootScope',function( $scope,$rootScope){
    
    $rootScope.$on("DoCalculateEvent" , function (e,data){
        console.log("Event handled in the   rootScope ChildController by Emit");
    });
    
    
    $scope.$on("DoCalculateEventBroadcast",function(e,data){
        console.log("sibling.DoCalculateEventBroadcastEvent handled in the same scope ChildController by Broadcast");
    });
    
         //-- BroadCast at the root level --//
    
    $scope.$on("DoCalculateEventBroadCastRoot",function(e,data){
        console.log("child.DoCalculateEventBroadCastRoot by Broadcast raised by rootScope for scope");
    });
    
    $rootScope.$on("DoCalculateEventBroadCastRoot",function(e,data){
        console.log("Root.child.DoCalculateEventBroadCastRoot by Broadcast raised a rootScope");
    });
    
         //-- BroadCast at the root level --//
    
}]);
    

app.run(['$rootScope',function($rootScope) {
         
    $rootScope.$on("DoCalculateEvent" , function (e,data){
        console.log("module.DoCalculateEvent Event handled in the   rootScope SiblingController by Emit");
    });
    
         
         
    $rootScope.$on("DoCalculateEventBroadCastRoot",function(e,data){
        console.log("module.DoCalculateEventBroadCastRoot by Broadcast raised a rootScope");
    });
    
         
         }]);

app.controller("myctrl",['$scope', '$parse','$interpolate',function ($scope,$parse,$interpolate){
    $scope.a=10;
    $scope.b=50;
    
    
    $scope.a_parse=20;
    $scope.b_parse=50;
    
    $scope.a_interpolate=15;
    $scope.b_interpolate=20;
    
    
   /*
    $scope.doTheCal=function(){
        alert("Result : "+$scope.$eval("a * b * c",{
        c : 10 }));
    }
    */
    
    $scope.emp={
        name : "Jack",
        age : 28,
        address : {
            city : "New Delhi ",
            country : "India"
        }
        
    }
    
    
    $scope.doTheCal=function(){
        var result= $scope.$eval(function(scope, locals){
        return scope.a * scope.b * locals.c * locals.a;
    },{
            a:2,
            c:20})
        
        alert(result);
        }
    
    
    
    $scope.doTheCalParse=function(){
        var result=$parse("a_parse * b_parse" ); //returns the funciton templete for the expression  
        
        $scope.res1=result($scope); //now $scope is passed to the returned template , So parse can be used against different the $scope,$rootScope
        $scope.res2=result({
            a_parse:40,
            b_parse:50
        });
        
        console.log($scope.res2);
        
        $scope.res= $parse("a * b")({a:30,b:10});
        
        var city_name=$parse("emp.address.city");
        
        $scope.cityname = city_name($scope);
        
    }
    
    
    $scope.doTheCalInterpolate= function(){
        var res= $interpolate("{{ a_interpolate * b_interpolate }}");
        
        $scope.res3=res($scope);
        
    
    
    }
        
        
}])

app.directive("myInfoMsg",function(){
    
    return{
      templateUrl : "my-info-msg-id"
    };
})


app.directive("myInfoMsg2",function(){
    return{
      templateUrl : "my-info-msg.html"
    }
})
              
              

app.controller("CustomeDirectivesController",[ '$scope',function($scope){
    $scope.msg="Hello World from Directive- Template within same file"; 
    $scope.msg2="Hello World from Directive - from separate files";
    
    $scope.displayMessage = function(){
        $scope.anotherMessage="I was clicked"
    }
}]);

/*
app.service('employeeService',[function(){
    this.findEmployee=function(empId)
    {
        $.ajax({
            url: 'file:///H:/AngularPractice/employee.json',
            dataType : 'json',
            type: 'get',
            success : function(result){
                
                
            }
        })
    }
    
}]);
*/

app.controller("CustomDirectivesController2",['$scope',function($scope){
var employee=[
    { 
        empId : 1000,
        firstName : "Jack",
        lastName : "Reacher",
        salary : 40000,
        hiredate : "06/08/2013"
    
    },
    {
        empId : 2000,
        firstName : "Frank",
        lastName : "Castle",
        salary : 50000,
        hiredate : "05/09/2014"
    },
    {
        empId : 3000,
        firstName : "Bruce",
        LastName : "Wayne",
        salary : 70000,
        hiredate : "09/02/2015"
    }
]

$scope.getTheEmployee = function (){
    
    for(var i in employee)
    {
        console.log( $scope.search)
        console.log(employee[i].empId)
        
    if (employee[i].empId == $scope.search)
    {
    $scope.empId= employee[i].empId,
    $scope.firstName=employee[i].firstName,
    $scope.lastName = employee[i].lastName,
    $scope.salary=employee[i].salary,
    $scope.hiredate=employee[i].hiredate   
    
    console.log($scope.empId+" , "+$scope.firstName+" , "+$scope.lastName+" , "+$scope.salary);
    }
    else 
    {
        console.log("Not Found "+$scope.search);
    }
    }

}

}]);

app.directive('employeeDetails',function(){
    return{
        templateUrl : 'employee-details.html'
    }
});



