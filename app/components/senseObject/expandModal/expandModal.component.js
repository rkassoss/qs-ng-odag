(function () {
    'use strict';

    define('expandModal', expandModal());
    function expandModal() {
        expandModalController.$inject = ['qlikService','$uibModal', '$log', '$document']
        function expandModalController(qlikService, $uibModal, $document){
            var vm = this;
            vm.closeModal = closeModal;
            
            function closeModal() {
                vm.dismiss({$value: 'cancel'});  
            }
            init();

            function init(){
                qlikService.getApp().getObject(document.getElementById('modal_object'),vm.resolve.qlikId);
            }
            vm.$onDestroy = function() {
                // destroy object please
                vm = null;
                // console.log("Destroying Object");
            }
        }

        return {
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: expandModalController,
            controllerAs: 'em',
            templateUrl: 'app/components/senseObject/expandModal/expandModal.component.html'
        }
    }

} ());