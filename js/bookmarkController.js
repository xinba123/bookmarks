
var app = angular.module('bookmark', ['ngDialog']);

app.constant('bookmarkManager', bookmarkManager);

app.controller('bookmarkCtrl', ['$scope', 'bookmarkManager', 'ngDialog', function($scope,bookmarkManager,ngDialog) {
    $scope.bookmarkLists = bookmarkManager.returnBookmarks();
    $scope.sortType      = 'dateAdded';
    $scope.sortReverse   = true;


    $scope.isNotEmpty = function(searchText){
        if (searchText.length!=0){
            return true;
        }else{
            return false;
        }
    }

    $scope.openLink = function(url){
       chrome.tabs.create({url: url});
    }

    $scope.focusOnText = function(){
        $('#search').focus();
    }

    $scope.deleteBookmarks = function(id){
        ngDialog.openConfirm({template: 'confirm.html'}).then(       
            function(value) {
                bookmarkManager.deleteBookmarks(id);
                chrome.bookmarks.remove(id);
                ngDialog.close();
            },
            function(value) {
                ngDialog.close();
            });
    }

    $scope.getNumberOfBookMarks = function(){
        if($scope.bookmarkLists.length <= 1){
            return "Search in your bookmarks";
        }else{
            return "Search in your "+ $scope.bookmarkLists.length + " bookmarks";
        }
    }

    $scope.changeImportance = function(book){

        var id = book.getID();

        if(book.isImportant){
            chrome.bookmarks.update(id,{"title":book.title});
        }else{
            chrome.bookmarks.update(id,{"title":book.title+"[__IMPORTANT__]"});
        }

        book.isImportant=!book.isImportant;
    }


/*    $scope.mouseEnter = function(id){
        $('#moreControlOpt_'+id).css("color", "lightblue");

    }

    $scope.mouseLeave = function(id){
        $('#moreControlOpt_'+id).css("color", "");

    }
*/



}]);

