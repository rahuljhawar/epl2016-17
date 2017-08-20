myApp.config(['$routeProvider', function($routeProvider){

      
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/index-view.html',
        	// Which controller it should use 
            controller 		: 'matchesController',
            // what is the alias of that controller.
        	controllerAs 	: 'matchCtrl'
        })
        .when('/matchview/:date/:team1code/vs/:team2code',{
        	templateUrl    : 'views/matchesinfo.html',
            controller     : 'matchViewController',
            controllerAs   : 'matchview'
        	
        })
         .when('/teamview/:teamcode',{
            templateUrl    : 'views/teamview.html',
            controller     : 'teamViewController',
            controllerAs   : 'team'
            
        })

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);