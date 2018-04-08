var mantraApp = angular.module("mantraModule", []);

mantraApp.controller("mantraController", function($scope, $http) {
    var mantraList = [
    {
        "_id": "5a9ba88287b645b8d021796a",
        "mantra_id": "narayana_mantra_1",
        "mantra": "Om Namo naaraayanaaya",
        "count": 108,
        "description": "Do do japa 108 for narayana..",
        "status": "approved",
        "timestamp": 1522490618993
    },
    {
        "_id": "5a9bad9d87b645b8d023798c",
        "mantra_id": "shiva_mantra_1",
        "mantra": "Om Namah shivaaya ",
        "count": 108,
        "description": "This mantra for god shiva.",
        "status": "approved",
        "timestamp": 1522490687059
    },
    {
        "_id": "5a9bae3987b645b8d023b657",
        "mantra_id": "santhoshi_mata_mantra_1",
        "mantra": "Shri santoshye devyye namah",
        "count": 108,
        "description": "श्री संतोषी देव्व्ये नमः \nlink (http://www.santoshimata.org)",
        "status": "approved",
        "timestamp": 1522490734238
    },
    {
        "_id": "5abf6299c53018cb6103a47d",
        "mantra_id": "jwaalamukhi_mantra_1",
        "mantra": "Om Hrim Shrim Jvalamukhi",
        "count": 108,
        "description": "|| ॐ  ह्रीं श्रीं ज्वालामुखी  मम सर्वशत्रुन  भक्ष्य भक्ष्य फट  स्वाहा ||\nOm Hrim Shrim Jvalamukhi mama Sarvashatrun bhakshaya  bhakshaya  Phat Svaha.",
        "status": "approved",
        "timestamp": 1522492267653
    }
    ];


     var japam = {
 
     };
     var mantra = {
         "mantra_id": "aapadaa_mapaharatham_mantra_1",
        "mantra": "ఆపదా మపహర్తారం దాతారం సర్వ సంపదాం లోకాభిరామం శ్రీరామం భూయో భూయెఒ నమామ్యహం",
        "count": 108,
        "description": "ఆపదా మపహర్తారం\nదాతారం సర్వ సంపదాం\nలోకాభిరామం శ్రీరామం\nభూయో భూయెఒ నమామ్యహం.\n\naapadaa mapahartaaram\ndaataaram sarva sampadaam\nloekaabhiraamam Sreeraamam\nbhooyoe bhooyeo namaamyaham",
        "status": "approved" 
     }
     
     $scope.mantraList = mantraList;
     $scope.japam = { "mantra" : "custom",
                      "mantraTitle": "custom",
                      "count": 108,
                      "currentCount": 0 };
     $scope.currentMantra = mantraList[0];
     $scope.mantraDetailedScreenShow = false;
     $scope.mantraListScreenShow = true;
     $scope.display = function (mantra) {
         $scope.currentMantra = mantra;
         $scope.mantraListScreenShow = false;
         $scope.mantraDetailedScreenShow = true;
     };
     $scope.onDetailedScreenDone = function () {
         $scope.mantraDetailedScreenShow = false;
         $scope.mantraListScreenShow = true;
     };
     $scope.onLoad = function () {
         $http({
                  method: "GET",
                  url: "/mantras"})
              .then(function (response) {
                   $scope.mantraList = response.data;
              },
              function (reason) {
                  $scope.error = reason;
              });
      }
});
