console.log("Script Load");
(function($){
    $(document).ready(function() {
        console.log('jQuery Ready');
        
        _this = this;

        function init(){
            layout();
            addEvent();
        }

        function layout(){
            _this.$win = $(window);

            _this.$body = $('body');
            _this.$container = _this.$body.find('#container');

            _this.$loading = _this.$body.find('#loading');
            
        }

        function addEvent(){
            _this.$win.on('load', function(){
                _this.$body.css({'overflow' : 'hidden'});
                _this.$loading.delay('4300').slideUp('1600', function(){
                    _this.$body.css({'overflow-y' : 'auto'});
                });
            })
        }
        init();

    });
})(jQuery);