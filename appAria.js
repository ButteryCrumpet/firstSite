var app = angular.module("aria", ['ngAnimate']);

    app.factory('dataFactory', ['$http', function($http) {
        var classData = {};
        $http.get('classData.json').success(function(data){
            classData.content = data;
        });
        return classData;
      }]);

    app.directive("library", ['$animate', 'dataFactory', function($animate, dataFactory){
        return {
            restrict: 'E',
            templateUrl: "/accordionHomes/library.html",
            controller: function(dataFactory){
                this.pdfs = dataFactory.content.classes;
                this.reader = false;
                this.actvParent = 0;
                this.actvChild = 0;
                this.refr = function(activeParent, activeChild) {
                    this.actvParent = activeParent;
                    this.actvChild = activeChild;
                    this.reader = true;
                };
                this.backUp = function(){
                    this.reader = false;
                };
                this.submitCmmnt = function(nwCmmnt){
                    this.pdfs[this.actvParent].readings[this.actvChild].comment.push({
                    author: "Simon",
                    body: this.addnew.body,
                    });
                    this.addnew.body = null;
                };
            },
            controllerAs: "libCtrl",
        };
    }]);
    
    app.directive("classinfo", ['dataFactory', '$animate', function(dataFactory, $animate){
        return{
            restrict: 'E',
            templateUrl: "/accordionHomes/classInfo.html",
            controller: function(dataFactory){
                this.inf = dataFactory.content.classes;
                this.tabY = 0;
                this.tabX = 1;
                this.actPostParent = null;
                this.actPostChild = null;
                this.setY = function(NewY){
                    this.tabY = NewY;
                };
                this.setX = function(NewX){
                    this.tabX = NewX;
                };
                this.setActPost = function(newActPostParent, newActPostChild){
                    this.actPostParent = newActPostParent;
                    this.actPostChild = newActPostChild;
                };
            },
            controllerAs: "tabCtrl",
        };
    }]);

    app.directive("notes",['dataFactory', function(dataFactory){
        return {
            restrict: 'E',
            templateUrl: "/accordionHomes/notes.html",
            controller: function(dataFactory){
                this.rdngList = dataFactory.content.classes;
                this.actvParent = 0;
                this.actvChild = 0;
                this.refr = function(activeParent, activeChild) {
                    this.actvParent = activeParent;
                    this.actvChild = activeChild;
                };
            },
            controllerAs: "noteRdngs",
        };
    }]);
    
    app.directive('rcmnts', function(){
        return {
            restrict: 'E',
            templateUrl: '/rdrViews/rcmnts.html',
        };
    });
    
    app.directive('rtrans', function(){
        return {
            restrict: 'E',
            templateUrl: '/rdrViews/rtrans.html',
        };
    });

    app.directive("rnotes", function(){
        return {
            restrict: 'E',
            templateUrl: '/rdrViews/rnotes.html'
        };
    });

    app.directive("syllabus", function(){
        return{
            restrict: 'E',
            templateUrl: "/clssViews/syllabus.html",
        };
    });

    app.directive("discussion", function(){
        return {
            restrict: 'E',
            templateUrl: '/clssViews/discussion.html',
        };
    });

    app.directive("assignments", function(){
        return {
            restrict: 'E',
            templateUrl: "/clssViews/assignments.html"
        };
    });
