(function () {
    'use strict';

    define('createBookmarkModal', createBookmarkModal());

    function createBookmarkModal() {
        createBookmarkModalController.$inject = ['$uibModal', '$log', '$state','qlikService']
        function createBookmarkModalController($uibModal, $log, $state,qlikService){
            var vm = this;
            vm.closeModal = closeModal;
            vm.submitForm = submitForm;
            var stateName = $state.current.name;

            function closeModal() {
                vm.dismiss({$value: 'cancel'});  
            }

            function submitForm() {
                qlikService.getApp().bookmark.create(vm.form.title, stateName);
                qlikService.getApp().doSave();
                closeModal();
            }


            init();


            function init(){
            }
            this.$onDestroy = function() {
                
            }
        }

        return {
            bindings: {
                close: '&',
                dismiss: '&'
            },
            controller: createBookmarkModalController,
            controllerAs: 'cbm',
            templateUrl: '/app/components/topHeader/modal/modal.component.html'
        }
    }

} ());