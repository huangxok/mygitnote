alert(2);
(function () {
    var AdtHome = function () {
        this.init();
        this.pIndex = 0;
    }

    AdtHome.prototype = {
        init: function () {
            this.navScroll();
            this.showIndex();
            this.scrollPage();
            this.sideNav();
            this.tab();
            this.slide('mpcA');
            this.slide('mpcS');
            this.keyNav();
            this.showWeiXin();
        },

        /**
         * 导航点击定位
         */
        navScroll: function () {
            var $ele = $('#home-nav').find('a');
            $ele.on('click', function () {
                var $this = $(this);
                $this.siblings('a').removeClass('current');
                $this.addClass('current');
            });
        },

        /**
         * 当前滚动高度，返回索引值
         */
        showIndex: function () {
            $(window).bind('scroll', function (e) {
                var _mIndex = $('#m-index').offset().top - 60,
                    _mIntro = $('#m-intro').offset().top - 60,
                    _mService = $('#m-service').offset().top - 60,
                    _mPlatform = $('#m-platform').offset().top - 60,
                    _mResearch = $('#m-research').offset().top - 60,
                    _mResolve = $('#m-resolve').offset().top - 60,
                    _mCase = $('#m-case').offset().top - 60,
                    _mPartners = $('#m-partners').offset().top - 60;
                var $doc = $(document);
                if ($doc.scrollTop() >= _mIndex && $doc.scrollTop() < _mIntro) {
                    $('#homebody').attr('data-index', 0);
                    $('#home-nav').find('a').removeClass('current').eq(0).addClass('current');
                } else if ($doc.scrollTop() >= _mIntro && $doc.scrollTop() < _mService) {
                    $('#homebody').attr('data-index', 1);
                    $('#home-nav').find('a').removeClass('current').eq(1).addClass('current');
                } else if ($doc.scrollTop() >= _mService && $doc.scrollTop() < _mPlatform) {
                    $('#homebody').attr('data-index', 2);
                    $('#home-nav').find('a').removeClass('current').eq(2).addClass('current');
                } else if ($doc.scrollTop() >= _mPlatform && $doc.scrollTop() < _mResearch) {
                    $('#homebody').attr('data-index', 3);
                    $('#home-nav').find('a').removeClass('current').eq(3).addClass('current');
                } else if ($doc.scrollTop() >= _mResearch && $doc.scrollTop() < _mResolve) {
                    $('#homebody').attr('data-index', 4);
                    $('#home-nav').find('a').removeClass('current').eq(4).addClass('current');
                } else if ($doc.scrollTop() >= _mResolve && $doc.scrollTop() < _mCase) {
                    $('#homebody').attr('data-index', 5);
                    $('#home-nav').find('a').removeClass('current').eq(5).addClass('current');
                } else if ($doc.scrollTop() >= _mCase && $doc.scrollTop() < _mPartners) {
                    $('#homebody').attr('data-index', 6);
                    $('#home-nav').find('a').removeClass('current').eq(6).addClass('current');
                } else if ($doc.scrollTop() >= _mPartners) {
                    $('#homebody').attr('data-index', 7);
                    $('#home-nav').find('a').removeClass('current').eq(7).addClass('current');
                }


            });
        },

        /**
         * 滑动页面
         */
        scrollPage: function () {
            var $ele = $('#home-nav').find('a');
            $ele.on('click', function () {
                var _id = $(this).attr('data-id'),
                    _st = ($('#' + _id).offset().top - 60) + 'px';
                $('html,body').animate({ scrollTop: _st }, 400);
            });
        },

        /**
         * 侧栏滚动
         */
        sideNav: function () {
            var $sn = $('#side-nav');
            $sn.find('a').on('click', function (event) {
                var $this = $(this),
                    _type = $this.attr('data-type'),
                    $hb = $('#homebody'),
                    $html = $('html,body'),
                    _index = parseInt($hb.attr('data-index'));
                switch (_type) {
                    case 'top':
                        $html.animate({ scrollTop: '0' }, 400);
                        $hb.attr('data-index', 0);
                        break;
                    case 'prev':
                        if (_index > 0) {
                            var _bst = ($('.m-block').eq(_index - 1).offset().top - 60) + 'px';
                            $html.animate({ scrollTop: _bst }, 400);
                            $hb.attr('data-index', _index - 1);
                        }
                        break;
                    case 'next':
                        if (_index < 7) {
                            var _bst = ($('.m-block').eq(_index + 1).offset().top - 60) + 'px';
                            $html.animate({ scrollTop: _bst }, 400);
                            $hb.attr('data-index', _index + 1);
                        }
                        break;
                    case 'share':
                        $('#side-share-box').show();
                        event.stopPropagation();
                        break;
                }
            });

            $('.s-restart').on('click', function () {
                $('html,body').animate({ scrollTop: '0' }, 400);
                $('#homebody').attr('data-index', 0);
            });

        },

        /**
         * 切换合作伙伴
         */
        tab: function () {
            $('#mpaNav').find('a').on('click', function () {
                var _index = $(this).index();
                $('#mpaNav').removeClass('mn-0 mn-1 mn-2 mn-3').addClass('mn-' + _index);
                $('.mpa-bs').hide().eq(_index).show();
            });
        },

        /**
         * 幻灯切换
         */
        slide: function (eleId) {
            var $id = $('#' + eleId),
                $li = $id.find('.adt-slide').find('li'),
                len = $li.length,
                index = 0,
                _htmlNum = '';

            $li.eq(0).show();

            (function () {
                for (var i = 0; i < len; i++) {
                    if (i == 0) {
                        _htmlNum += '<a href="javascript:;" class="current"></a>';
                    } else {
                        _htmlNum += '<a href="javascript:;"></a>';
                    }
                }
            })();

            $id.find('.mpa-pointer').append(_htmlNum);

            $id.find('.mpa-pointer').find('a').mouseover(function () {
                index = $('#' + eleId).find('.mpa-pointer').find('a').index(this);
                picShow(index);
            });

            $id.hover(function () {
                if (playPic) {
                    clearInterval(playPic);
                }
            }, function () {
                playPic = setInterval(function () {
                    picShow(index);
                    index++;
                    if (index == len) { index = 0 }
                }, 3000)
            })
            var playPic = setInterval(function () {
                picShow(index);
                index++;
                if (index == len) { index = 0 }
            }, 3000)
            function picShow(i) {
                $li.eq(i).stop(true, true).fadeIn().siblings().fadeOut();
                $('#' + eleId).find('.mpa-pointer').find('a').eq(i).addClass('current').siblings().removeClass('current');
            }
        },

        /**
         * 键盘导航
         */
        keyNav: function () {

            $(document).on('keydown', function (event) {

                if (event == undefined) {
                    event = window.event;
                }

                var _index = parseInt($('#homebody').attr('data-index'));
                if (event.keyCode == 40 && _index < ($('#home-main > div').length - 1) && !$('html,body').is(":animated")) {
                    var _bst = ($('.m-block').eq(_index + 1).offset().top - 60) + 'px';

                    event.preventDefault();
                    // $(window)._scrollable().stop();
                    $('html,body').stop(true, true).animate({ scrollTop: _bst }, 400);
                    $('#homebody').attr('data-index', _index + 1);

                } else if (event.keyCode == 38 && _index != 0 && !$('html,body').is(":animated")) {
                    var _bst = ($('.m-block').eq(_index - 1).offset().top - 60) + 'px';
                    event.preventDefault();
                    $('html,body').stop(true, true).animate({ scrollTop: _bst }, 400);
                    $('#homebody').attr('data-index', _index - 1);
                }

            });

        },

        showWeiXin: function () {
            var $t = $('.s-weixin');

            $t.on('click', function (event) {
                var $this = $(this),
                    _img = $this.attr('data-img-url'),
                    _left = ($this.offset().left - 100 + 29) + 'px',
                    _top = ($this.offset().top - 220) + 'px';
                var _weixin = '<div id="weixin-QC" style="position: absolute;text-align: center;width: 200px; height: 212px"><img src="' + _img + '" alt="微信"/></div>';
                if ($('#weixin-QC').length) {
                    $('#weixin-QC').show();
                } else {
                    $('body').append(_weixin);
                    $('#weixin-QC').css({ 'top': _top, 'left': _left });
                }

                event.stopPropagation();

            });

            $('body').on('click', function () {
                $('#weixin-QC').hide();
                $('#side-share-box').hide();
            });
        }

    }

    new AdtHome();
})();

/**
 * loading
 */
$(window).load(function () {
    $('#loading').fadeOut(600, function () {
        $("#index-content").fadeIn(1000);
    });
});


$(function () {
    $('#mi-text').parallax("50%", 0 - 0.7);
    $('#mi-sq').parallax("50%", 0 - 0.5);
    $('#mp-cloud').parallax("50%", 0 - 0.7);
    $('#mp-logo').parallax("50%", 0.35);
    $('#mre-cloud').parallax("50%", 0.3);
    $('#mre-ufo').parallax("50%", 0.5);
    $('#mres-gar').parallax("50%", 0.7);
    $('#mres-logo').parallax("50%", 0 - 0.5);
    $('#mres-glass').parallax("50%", 0.5);
    $('#mc-logo-tv').parallax("40%", 0.3);
    $('#mc-logo-pc').parallax("50%", 0.5);
    $('#mc-logo-pad').parallax("50%", 0.4);
})