var app = angular.module('myApp', []),
    apiKey = 'MDExODQ2OTg4MDEzNzQ5OTM4Nzg5MzFiZA001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';


app.directive('nprLink', function () {
    return {
        restrict: 'EA',
        require: ['^ngModel'],
        replace: true,
        scope: {
            ngModel: '=',
            play: '&'
        },
        templateUrl: 'views/nprListItem.html',
        //<div class="nprLink row" ng-click="play(ngModel)">
        //  <span class="name large-8 columns">
        //    <button class="large-2 small-2 playButton columns"><div class="triangle"></div></button>
        //    <div class="large-10 small-10 columns">
        //      <div class="row">
        //        <span class="large-12">{{ ngModel.title.$text }}</span>
        //      </div>
        //      <div class="row">
        //        <div class="small-1 columns"></div>
        //        <div class="small-2 columns push-8"><a href="{{ ngModel.link[0].$text }}">Link</a></div>
        //      </div>
        //    </div>
        //  </span>
        //</div>


        link: function (scope, ele, attr) {
            scope.duration = scope.ngModel.audio[0].duration.$text;
        }
    }
});

app.controller('PlayerController', function ($scope, $http) {
    var audio = document.createElement('audio');
    $scope.audio = audio;

    // audio.src = 'http://pd.npr.org/npr-mp4/npr/sf/2013/07/20130726_sf_05.mp4?orgId=1&topicId=1032&ft=3&f=61';
    // audio.play();

    $scope.play = function (program) {
        if ($scope.playing) audio.pause();
        var url = program.audio[0].format.mp4.$text;
        audio.src = url;
        audio.play();
        // Store the state of the player as playing
        $scope.playing = true;
    }

    $http({
        method: 'JSONP',
        url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    }).success(function (data, status) {
        // Now we have a list of the stories (data.list.story)
        // in the data object that the NPR API 
        // returns in JSON that looks like:
        // data: { "list": {
        //   "title": ...
        //   "story": [
        //     { "id": ...
        //       "title": ...
        $scope.programs = data.list.story;
    }).error(function (data, status) {
        // Some error occurred
    });

});

app.controller('RelatedController', function ($scope) {
});

// Parent scope
app.controller('FrameController', function ($scope) {
});