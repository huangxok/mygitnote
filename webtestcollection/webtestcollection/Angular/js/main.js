var app = angular.module('myApp', []);
app.controller('PlayerController', ['$scope', function ($scope) {
    //$scope.audio = document.createElement('audio');
    //$scope.audio.src = '../../Music/%e7%ad%b7%e5%ad%90%e5%85%84%e5%bc%9f%20-%20%e8%80%81%e7%94%b7%e5%ad%a9.mp3';
    //$scope.audio.type = 'audio/mpeg';
    //$scope.audio.controls = 'controls';
    //$scope.audio.play();
    $scope.playing = false;
    //$scope.playings = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = '../../Music/%e7%ad%b7%e5%ad%90%e5%85%84%e5%bc%9f%20-%20%e8%80%81%e7%94%b7%e5%ad%a9.mp3';
    $scope.play = function () {
        $scope.audio.play();
        $scope.playing = true;
        //$scope.playings = true;
    };
    $scope.stop = function () {
        $scope.audio.pause();
        $scope.playing = false;
        //$scope.playings = true;
    };
    $scope.audio.addEventListener('ended', function () {
        $scope.$apply(function () {
            $scope.stop()
        });
    });
}]
);
app.controller('RelatedController', ['$scope', function ($scope) {

}]
);