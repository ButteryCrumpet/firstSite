var classData = {};
        $http.get('classData.json').success(function(data){
            classData.content = data;
        });
        return classData;


Class object 
        {
        className: "",
        classCode: "",
        readings: [{
            rdnglink: "",
            rdngName: "",
            image: "",
            readBy: "",
            read: false,
            commentNum: 0,
            comment: [{
                author: "",
                body: "",
            }],
        }],
        infos: {
            description: "Cocklepox\n\nPocklecox",
            objectives: "Nerfherder",
            textbooks: "",
            refbooks: "",
            assessment: "",
            acdmBackground: "",
            links: "",
            policies: "",
        },  
            
    app.directive("classInfo", ['dataFactory', function(dataFactory){
        return{
            restrict: 'E',
            templateUrl: "/accordionHomes/classInfo.html",
            controller: function(dataFactory){
                this.inf = dataFactory.content.classes;
                this.tabY = 0;
                this.tabX = 1;
                this.setY = function(NewY){
                    this.tabY = NewY;
                };
                this.setX = function(NewX){
                    this.tabX = NewX;
                };     
            },
            controllerAs: "tabCtrl",
        };
    }]);