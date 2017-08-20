
var myApp=angular.module('footballInfo',['ngRoute','ngAnimate']);


myApp.controller('matchesController',['$http',function($http) {

  //create a context
  var match = this;


  this.matchesData=[];
  this.totalMatches=[];

  this.loadAllMatches = function(){

    $http({
      method: 'GET',
      url:'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
    }).then(function successCallback(response) {

     match.matchesData=response.data.rounds;
     //console.log(match.matchesData);
     for(var plays in match.matchesData)
     {
      var games=match.matchesData[plays];
      for(var game in games.matches){
        match.totalMatches.push(games.matches[game]);
        
      }
    }
    console.log(match.totalMatches);
  }, function errorCallback(response) {

    alert("some error occurred. Check the console.");
    console.log(response);


  });

  };





  // end load all blogs

  this.loadAllMatches();


}]); // end controller


myApp.controller('matchViewController',['$http','$routeParams',function($http,$routeParams) {
  var match = this;
  this.date=$routeParams.date;
  this.team1code=$routeParams.team1code;
  this.team2code=$routeParams.team2code;
  this.matchesData=[];
  this.teamName1 = "";
  this.teamName2 = "";
  this.teamCode1 = "";
  this.teamCode2 = "";
  this.teamScore1 = "";
  this.teamScore2 = "";
  this.roundName = "";
  this.matchDate = "";

  this.loadAllMatches = function(){

    $http({
      method: 'GET',
      url:'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
    }).then(function successCallback(response) {

     match.matchesData=response.data.rounds;
     for(var plays in match.matchesData)
     {
      var games=match.matchesData[plays];
      for(var game in games.matches){
        match.roundName = games.name;
        //console.log(match.roundName);
        var dateNew = games.matches[game].date;
                        //console.log(dateNew);
                        dateNew = dateNew.replace(/[^\/\d]/g, '');
                       // console.log(dateNew);
                       if (dateNew == match.date && games.matches[game].team1.code == match.team1code && games.matches[game].team2.code == match.team2code) {
                           // console.log(games.matches[game].date);
                            //console.log(games.matches[game].team1.name);
                            //console.log(games.matches[game].team2.name);
                            //console.log(games.matches[game].score1);
                            //console.log(games.matches[game].score2); 
                            match.matchDate = games.matches[game].date;
                            match.teamName1 = games.matches[game].team1.name;
                            match.teamName2 = games.matches[game].team2.name;
                            match.teamCode1 = games.matches[game].team1.code;
                            match.teamCode2 = games.matches[game].team2.code;
                            match.teamScore1 = games.matches[game].score1;
                            match.teamScore2 = games.matches[game].score2;

                          }
                        }
                      }



                        //console.log(games.matches[game]);
                        

                      }, function errorCallback(response) {

                        alert("some error occurred. Check the console.");
                        console.log(response);


                      });
  };

  this.loadAllMatches();


}]); 

myApp.controller('teamViewController',['$http','$routeParams',function($http,$routeParams) {
  var match=this;
  this.matchesData=[];
  this.teamcode=$routeParams.teamcode;
  this.teamName="";
  this.matchesPlayed=0;
  this.totalWin=0;
  this.totalLoss=0;
  this.totalTied=0;
  this.goalScored=0;
  this.loadAllMatches = function(){

    $http({
      method: 'GET',
      url:'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
    }).then(function successCallback(response) {
      match.matchesData=response.data.rounds;
      for( var round in match.matchesData)
      {
        var rounds=match.matchesData[round];
          //console.log(rounds);
          for(var plays in rounds.matches)
          {
            var game=rounds.matches[plays];
            if((game.team1.code  === match.teamcode) || (game.team2.code === match.teamcode))
            {
              match.matchesPlayed+=1;
              if(game.team1.code  === match.teamcode)
              {
                match.teamName=game.team1.name;
                match.goalScored+=game.score1;
                if(game.score1 > game.score2)
                {
                  match.totalWin+=1;

                }
                else if(game.score1 < game.score2)
                {
                  match.totalLoss+=1;

                }
                else{
                  match.totalTied+=1;

                }

              }
              if(game.team2.code  === match.teamcode)
              {
                match.goalScored+=game.score2;
                match.teamName=game.team2.name;
                if(game.score1 > game.score2)
                {
                  match.totalWin+=1;

                }
                else if(game.score1 < game.score2)
                {
                  match.totalLoss+=1;

                }
                else{
                  match.totalTied+=1;

                }

              }
              else{}

            }
        }
      }
        //console.log(match.totalWin);
        //console.log(match.team2win);
        //console.log(match.matchTied);
        //console.log(match.goalScored);


      }, function errorCallback(response) {

        alert("some error occurred. Check the console.");
        console.log(response);


      });
  };

  this.loadAllMatches();
}]); 