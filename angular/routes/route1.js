//ROUTING

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/le1',{
        templateUrl:"./angular/views/view1.html"
        
    })
    .when('/le2',{
        templateUrl:"./angular/views/view3.html"
        
    })
    .when('/teams',{
        templateUrl:"./angular/views/view2.html"
       
    })
    .when('/allmatch',{
        templateUrl:"./angular/views/view4.html"
    })
    .when('/local', {
        templateUrl:"./angular/views/view5.html"
    })
    .otherwise({
        redirectTo:'/'
    });
    
}]);

var data;

//CONTROLLERS
app.controller('league1Controller', ['$scope','$routeParams','$http', function($scope,$routeParams,$http){
    
 
 $scope.teamname = "teamname";
 $scope.playedteams = [];
 $scope.totalscore=0;
 $scope.totalmatch=0;
 $scope.checker=0;
 $scope.vediochecker=0;
 $scope.details = {};    
 $scope.totalwin=0;
 $scope.totalloss=0;
 $scope.totoldraw=0;   
    //scope for allmatch summaries
    $scope.date;
    $scope.opponent;
      
      
     

 //vediochecker function 
    $scope.vediocheck = function(){
        $scope.vediochecker=1;
    }
//vediochecker function2
    $scope.vediocheck2 = function(){
        $scope.checker=0;
        $scope.vediochecker=0;
    }
    
    //data of the 2015/206 match
    
  $scope.match2015 = function(){
      $scope.checker = 1;
      $http.get("https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json")
      .then(function(response){
          
          data = response.data;
          console.log(data);
      });
  }
  
  $scope.match2017 = function(){
      $scope.checker = 1;
      $http.get("https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json")
      .then(function(response){
          
           data = response.data;
          console.log(data);
      });
  }
    
    
    
 $scope.teamSummary =  function(event){
     
     $scope.teamname = event.currentTarget.id;
     
     teamname = event.currentTarget.id;
     console.log(typeof $scope.teamname);
     $scope.teamAnalysis(data, $scope.teamname);
 }
    //team individual summary function
   
     $scope.teamAnalysis = function (data, team) { var matchcount =0; var totalscore=0; var playedteams=[];
        var totalwin = 0;
        var totaldraw = 0;                                         
        var totalloss = 0;                                   
        for (let i in data.rounds){
       
         
        for(let j in data.rounds[i].matches){
            
                if(team===data.rounds[i].matches[j].team1.name  ){
                    matchcount +=1; totalscore += data.rounds[i].matches[j].score1; playedteams.push({"matchname":data.rounds[i].name,"date":data.rounds[i].matches[j].date,"opponent":data.rounds[i].matches[j].team2.name, "score":data.rounds[i].matches[j].score2});
                   
                    if(data.rounds[i].matches[j].score1>data.rounds[i].matches[j].score2){
                                totalwin +=1;                                                                      } else if(data.rounds[i].matches[j].score1<data.rounds[i].matches[j].score2){
                        totalloss +=1;
                    } else if(data.rounds[i].matches[j].score1===data.rounds[i].matches[j].score2){
                        totaldraw +=1;
                    } 
                    
                } else if(team===data.rounds[i].matches[j].team2.name){ matchcount +=1; totalscore += data.rounds[i].matches[j].score2;playedteams.push({"matchname":data.rounds[i].name,"date":data.rounds[i].matches[j].date,"opponent":data.rounds[i].matches[j].team1.name,"score":data.rounds[i].matches[j].score1});
                                                                      
                       if(data.rounds[i].matches[j].score1<data.rounds[i].matches[j].score2){
                                totalwin +=1;                                                                      } else if(data.rounds[i].matches[j].score1>data.rounds[i].matches[j].score2){
                        totalloss +=1;
                    } else if(data.rounds[i].matches[j].score1===data.rounds[i].matches[j].score2){
                        totaldraw +=1;
                    }                                                
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                    }
            
        }        
    }            
                                             
                                             
                $scope.totalscore=totalscore;
                $scope.totalmatch =matchcount; 
                $scope.playedteams = playedteams;
                $scope.totalwin = totalwin;
                $scope.totalloss = totalloss;
                $scope.totaldraw = totaldraw;                                 
                console.log(totalscore);
                console.log(matchcount);   
                console.log(playedteams); 
                console.log(totalwin);
                console.log(totalloss);
                console.log(totaldraw);                                 
                                                 
                                                 }
     
     
     //final view function
     
     $scope.indu = function (data,date, opponent, matchname) { 
        
                var details = {};                            
        for (let i in data.rounds){
       
         
        for(let j in data.rounds[i].matches){
            if(data.rounds[i].matches[j].date ===date && (data.rounds[i].matches[j].team1.name===opponent || data.rounds[i].matches[j].team2.name===opponent)){
            console.log("hey");   details.team1 = data.rounds[i].matches[j].team1.name; details.team2 = data.rounds[i].matches[j].team2.name; details.score1 = data.rounds[i].matches[j].score1; details.score2 = data.rounds[i].matches[j].score2;details.date= data.rounds[i].matches[j].date; details.match = matchname;
            console.log(data.rounds[i].matches[j].date); 
            
            
    }
        }        
    }            
         $scope.details = details;                                    
                                             
      console.log(details);                      }
     
     $scope.oneonone = function (key) {
        console.log(key);
        $scope.indu(data, key.date, key.opponent, key.matchname);
     }
     
    
 
 
}] );







