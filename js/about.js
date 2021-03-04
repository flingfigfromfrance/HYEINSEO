// 객체 리터럴 패턴.
// 모듈 단위로 기능을 구성할 때 많이 사용된다.
var Scroll = {};
Scroll = {
    _scrollTop : null,

    init: function() {
        console.log('init');
        // this
        // console.log(this);
        this.layout();
        this.setting();
        this.addEvent();
        this.reset();
    },
    layout: function() {
        console.log('layout');
    },
    setting: function() {
        console.log('setting');
    },
    addEvent: function() {
        console.log('add event');
    },
    reset: function() {
        console.log('reset');
    }
};
// Scroll.init();

(function($){
    $(document).ready(function() {
        // 스크롤 이벤트에 따른 변화.
        
        // 전역변수.
        var _this = this;
        var _scrollTop = null; // 현재 스크롤 값을 확인하는 전역변수.

        var _winW = null; // 브라우저의 가로 폭 영역 값을 확인하는 전역변수.
        var _winH = null; // 브라우저의 세로 높이 영역 값을 확인하는 전역변수.

        var _horizontalH = null; // 브라우저가 리사이즈 되면서 적용해야 하는 .section-horizontal 의 높이 전역변수.
        var _horizontalMax = null; // .section-horizontal .section-item 의 개수.

        // 처음 기능을 초기화하는 함수.
        function init() {
            layout();
            setting();
            addEvent();
            reset();
        }

        // 셀렉터 요소를 찾아놓는 함수.
        function layout() {
            _this.$win = $(window);
            _this.$wrap = $('#wrap');
            _this.$sticky = $('.section-sticky');
            _this.$horizontal = $('.section-horizontal');
            _this.$horizontalWrap = _this.$horizontal.find('.section-wrap');
            _this.$horizontalItem = _this.$horizontalWrap.find('.section-item');
        }

        // 초기 세팅값 함수.
        function setting() {
            _horizontalMax = _this.$horizontalItem.length; // 2
        }

        // 이벤트 바인딩 함수.
        function addEvent() {
            // _this.$win.on('resize', onResize);
            // _this.$win.on('scroll', onScroll);
            _this.$win.on('resize', onResize).on('scroll', onScroll);
        }

        // 세팅, 이벤트 적용 이후 호출되는 함수.
        function reset() {
            // _this.$win.trigger('resize');
            // _this.$win.trigger('scroll');
            _this.$win.trigger('resize').trigger('scroll');

            var $text = _this.$sticky.find('.text-area');
            gsap.set($text, { y: 100, autoAlpha: 0});

            _this.$wrap.removeClass('inactive');
        }

        function onResize(e) {
            _winW = _this.$win.width();
            _winH = _this.$win.height();
            
            _horizontalH = _winW * _horizontalMax;
            _this.$horizontal.outerHeight(_horizontalH, true);

            onScroll();

        }

        function onScroll(e) {
            _scrollTop = _this.$win.scrollTop();
            stickyScroll();
            horizontalScroll();
        }

        function stickyScroll() {
            var imgY = 0,
                titleY = 0,
                descY = 0,
                $img = _this.$sticky.find('img'),
                $text = _this.$sticky.find('.text-area'),
                $title = _this.$sticky.find('.title'),
                $desc = _this.$sticky.find('.desc');
                start = _this.$sticky.offset().top, 
                end = start + _this.$sticky.outerHeight();

            if(_scrollTop >= start && _scrollTop < end) {
                _this.$sticky.addClass('fixed');
            }else{
                _this.$sticky.removeClass('fixed');
            }

            if(_scrollTop >= start && _scrollTop < end + _winH) {
                // 상대적인 Y 좌표.
                // console.log(_scrollTop - start);
                imgY = (_scrollTop - start) * 0.2 * -1;
            }

            if(_scrollTop >= start - _winH && _scrollTop < end + _winH) {
                titleY = (_scrollTop - start) * 0.4 * -1;
                // titleY = Math.min(0, (_scrollTop - start) * 0.4) * -1;
                // titleY = Math.max(0, (_scrollTop - start) * 0.4) * -1;
                descY = (_scrollTop - start) * 0.4 * -1;
                // descY = Math.min(0, (_scrollTop - start) * 0.4) * -1;

                // -400 ~ 400
                // x : 800 = 현재 좌표(상대좌표) 0 ~ : 끝지점의 좌표 (2000)
                // x = 현재 좌표(상대좌표) * 800 / 끝지점의 좌표(2000) - 400
                
                // 지정할 좌표 : 마지막 좌표 = 현재 스크롤 좌표 : 끝나는 지점의 좌표
                // 지정할 좌표 = 마지막 좌표 * 현재 스크롤 좌표 / 끝나는 지점의 좌표
                
                // Math.min() // 두 값 중 최소값을 리턴.
                // Math.max() // 두 값 중 최대값을 리턴.
            }

            gsap.set($img, { y: imgY });
            // gsap.set($title, { y: titleY});
            gsap.set($desc, { y: descY });

            // if(_scrollTop >= start - _winH / 5) {
            if(_scrollTop >= start) {
                // console.log('text area start');
                if(!$text.hasClass('active')) {
                    $text.addClass('active');
                    gsap.to($text, { y: 0, autoAlpha: 1, duration: 0.4 });
                    // 애니메이션이 한번만 발생.
                }
            }else{
                if(_scrollTop < start - _winH / 2) {
                    if($text.hasClass('active')){
                        $text.removeClass('active');
                        gsap.set($text, { y: 100, autoAlpha: 0 });
                    }
                }
            }
        }

        function horizontalScroll() {
            var x = 0,
                start = _this.$horizontal.offset().top, // 시작지점 : .section-horizontal 의 스크롤 Y 좌표값.
                end = start + _this.$horizontal.outerHeight(); // 종료지점 : start + .section-horizontal 의 높이
            if(_scrollTop >= start && _scrollTop < end) { // and - &&
                // .section-horizontal 스크롤 Y 좌표값과 window 스크롤 Y 좌표값의 비교.
                // + .section-horizontal 의 영역이 끝나는 Y 좌표값과 window 스크롤 Y 좌표값을 비교.
                // 두 가지 조건이 모두 성립되어야만 해당 코드가 실행.
                _this.$horizontal.removeClass('fixed fixed-end');
                if(_scrollTop < end - _winH) {
                    // 영역이 끝나는 지점 - 브라우저의 높이
                    // -> 영역 안에서는 .section-horizontal 이 상단에 고정되어 보일 수 있게 적용.
                    _this.$horizontal.addClass('fixed');

                    // * 해당높이에 도달했을 때를 0으로 맞추고 기준에서부터 상대적인 Y 좌표를 구할 수 있도록 적용.

                    // 가로스크롤의 허용범위를 window 스크롤 Y 좌표에 맞춰서 비율계산 (방정식을 통해)
                    // x : 최대 가로 스크롤 길이 (.section-horizontal-wrap 의 전체 길이 - 1개의 .section-item 가로폭을 뺀 만큼의 길이)
                    // = 
                    // 현재 window 스크롤 Y 좌표값 - 시작지점 -> 상대적인 스크롤 Y 좌표값 : 상대적 좌표에서 부터 스크롤이 허용되는 시점의 종료 지점 길이 (.section-horizontal 의 높이 - 브라우저 세로 높이값)
                    // x : (_horizontalH - _winW) = (_scrollTop - start) : (_horizontalH - _winH)
                    x = (_horizontalH - _winW) * (_scrollTop - start) / (_horizontalH - _winH) * -1;
                    // _this.$horizontalWrap.css({ 'transform' : 'translateX(' + x + 'px)'});

                    // gsap - Green Sock Animation Platform.
                    // gsap.set(); // 스타일을 적용. // css()
                    // gsap.to(); // 스타일을 애니메이션을 활용하여 적용. // animate()

                    gsap.set(_this.$horizontalWrap, { x: x });
                    // gsap.to(element, { x: x, duration: 1 });
                
                }else{
                    // -> .section-horizontal 이 정상적인 스크롤이 되어 보이는 것처럼 적용.
                    _this.$horizontal.addClass('fixed-end');
                    x = (_horizontalH - _winW) * -1; // 최대 가로스크롤 허용치.
                    // _this.$horizontalWrap.css({ 'transform' : 'translateX(' + x + 'px)'});
                    gsap.set(_this.$horizontalWrap, { x: x });
                }
            }else{
                _this.$horizontal.removeClass('fixed');
                if(_scrollTop < start) {
                    // .section-horizontal 스크롤 Y 좌표가 시작하는 지점보다 window 스크롤 Y 좌표가 낮을 때는 fixed, fixed-end 제거.
                    _this.$horizontal.removeClass('fixed-end');
                    // _this.$horizontalWrap.css({ 'transform' : 'translateX(' + x + 'px)'});
                    gsap.set(_this.$horizontalWrap, { x: x });
                }
                if(_scrollTop >= end) {
                    // .section-horizontal 스크롤 Y 좌표가 끝나는 지점보다 window 스크롤 Y 좌표가 높을 때는 fixed-end 유지
                    _this.$horizontal.addClass('fixed-end');
                    x = (_horizontalH - _winW) * -1;
                    // _this.$horizontalWrap.css({ 'transform' : 'translateX(' + x + 'px)'});
                    gsap.set(_this.$horizontalWrap, { x: x });
                }
            }
        }

        init();
    });
})(jQuery);