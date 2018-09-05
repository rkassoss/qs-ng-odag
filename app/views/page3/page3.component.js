define('pageThree', function(){
    function pageThree() {

        function pageThreeController(){
            var vm = this;
            
            init();

            function init(){

            }
        }

        return {
            bindings: {},
            controller: pageThreeController,
            controllerAs: 'p3',
            templateUrl: '/app/views/page3/page3.component.html'
        }
    }
    return pageThree();
});