var	scrollResponsiveBool = false;

$(document).ready(function() {

	var isOpen = 'is_open';
	
	var anchorArr = ['section01', 'section02', 'section03', 'section04', 'section05', 'section06', 'section07'];
	
	if($('.wrapper').hasClass('lang_eng') || $('.wrapper').hasClass('lang_jpn') || $('.wrapper').hasClass('lang_chn')){
		anchorArr = ['section01', 'section02', 'section04', 'section05', 'section07'];
	}

	// 스킵네비게이션 focus
	$('.skip_nav a').on({
		'click' : function(){
			var skipTo = "#" + this.href.split('#')[1];
			$(skipTo).attr('tabindex', -1).on('blur focusout', function () {
				$(this).removeAttr('tabindex');
			}).focus();
		}
	})

	// zoom_area ---------------------------	
	function zoomCheckResize(){
		visualSwiper.update();
		if($('body').hasClass('is_zoom')){
			$.fn.fullpage.setResponsive(true);
		}
	}

	var zoom_area = {
		init : function(){
			this.action();
		},
		action : function(){
			
			var nowZoom = 100;
			var nowZoom_f = 1;
			var zoomcontrol = {		
				zoomout : function(){
					nowZoom = nowZoom - 10;
					nowZoom_f /=1.2;
					if(nowZoom <= 70) nowZoom = 70;
					zoomcontrol.zooms();
					return false;
				},
				zoomin : function(){
					nowZoom = nowZoom + 10;
					nowZoom_f *=1.2;
					if(nowZoom >= 200) nowZoom = 200;
					zoomcontrol.zooms();
					return false;
				},
				zooms : function(){
					
					$('body').css({
						'zoom':nowZoom + '%',
						'MozTransform' : 'scale('+nowZoom_f+')',
						'MozTransformOrigin' : '0 0',
						'OTransform' : 'scale('+nowZoom_f+')',
						'OTransformOrigin' : '0 0'
					});

					$('body').addClass('is_zoom');
					
					$.fn.fullpage.setResponsive(true);
					visualSwiper.update();

					// alert 메세지
					if(nowZoom==70){ //70% 축소
						alert ('더 이상 축소할 수 없습니다.');
					}			
					if(nowZoom==100){
						$('body').removeClass('is_zoom');
						$.fn.fullpage.setResponsive(false);
						visualSwiper.update();
					}
					if(nowZoom==200){ //200% 확대
						alert ('더 이상 확대할 수 없습니다.');
					}
				}		
			};
					
			$('.zoom_box .btn_zoom_in').on('click', function(){
				zoomcontrol.zoomin();
				return false;
			});
			$('.zoom_box .btn_zoom_out').on('click', function(){
				zoomcontrol.zoomout();
				return false;
			});	
		}
	}

	// header, fullpage navi 스타일 테마 변경
	$.themeChange = function(destination){
		var destinationId = anchorArr[destination - 1];

		if(destinationId == "section01"){
			$('.header_bottom').attr('data-theme', 'blue')
		} else if(destinationId == "section05"){
			$('.header_bottom').attr('data-theme', 'transparent')
		} else{
			$('.header_bottom').attr('data-theme', '')
		}
		
		if(destinationId == "section04" || destinationId == "section06"){ // intro || history
			$('.fp-nav').attr('data-theme', 'black')
		} else if(destinationId == "section02"){ // archive
			if($('.archive .bbs_area').css('display') == 'block'){
				$('.fp-nav').attr('data-theme', 'black')
			} else{
				$('.fp-nav').attr('data-theme', '');
			}
		} else{			
			$('.fp-nav').attr('data-theme', '');
		}
	}

	// header, fullpage navi 위치 변경
	$.activeChange = function(destination){
		var destinationId = anchorArr[destination - 1];

		$('.header_bottom .nav li').removeClass('is-active');
		if(destinationId == "section04" || destinationId == "section05" || destinationId == "section06" || destinationId == "section07"){		
			$('.header_bottom .nav li').find('a[href="#section04"]').closest('li').addClass('is-active');
		} else{	
			$('.header_bottom .nav li').find('a[href="#' + destinationId + '"]').closest('li').addClass('is-active');
		}

		$('.fp-nav li').removeClass('is-active');
		$('.fp-nav li').find('a[href="#' + destinationId + '"]').parents('li').addClass('is-active');
	}

	// SECTION 01 - VISUAL ----------------------------------
	var time = 10000;

	var visualSwiper = new Swiper('.visual-swiper', {
		init: false,
		speed: 400,
		spaceBetween: 0,
		resizeObserver : 1,
		slidesPerView: 1,
		effect : 'fade',
		loop : true,
		autoplay: {
			delay: time,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.visual-swiper-controller .swiper-button-next',
			prevEl: '.visual-swiper-controller .swiper-button-prev',
		},
        pagination: {
          el: ".visual-swiper-controller .swiper-pagination",
          type: "fraction",
		  renderFraction : function(currentClass, totalClass){
			return	'<span class="' + currentClass + '"></span>' 
			+ '<span class="progressbar"><span class="gauge"></span></span>'
			+ '<span class="' + totalClass + '"></span>';
		  }
        },
	});
	
	visualSwiper.on('init', function(){
		$('.progressbar .gauge').stop().animate({'width' : '100%'}, time, 'linear');
	});
	visualSwiper.on('slideChange', function(){
		$('.progressbar .gauge').css('width', 0);
		$('.progressbar .gauge').stop().animate({'width' : '100%'}, time, 'linear');
	})
	visualSwiper.init();

	// autoplay
	$('.visual-swiper-controller .swiper-button-play').on('click', function(){
		if(!$(this).hasClass('stop')){
			$(this).addClass('stop');
			visualSwiper.autoplay.stop();
			$('.progressbar .gauge').stop();
		} else{
			$(this).removeClass('stop');
			visualSwiper.autoplay.start();
			$('.progressbar .gauge').stop().animate({'width' : '100%'}, time, 'linear');
		}
	})
		
	// SECTION 02 - ARCHIVE ----------------------------------
	var archiveSwiper = new Swiper('.archive-swiper', {
		speed: 400,
		spaceBetween: 0,
		effect : 'fade',
		loop : true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.archive-swiper-controller .swiper-button-next',
			prevEl: '.archive-swiper-controller .swiper-button-prev',
		},
	})
	
	// autoplay
	$('.archive-swiper-controller .swiper-button-play').on('click', function(){
		if(!$(this).hasClass('stop')){
			$(this).addClass('stop');
			archiveSwiper.autoplay.stop();
		} else{
			$(this).removeClass('stop');
			archiveSwiper.autoplay.start();
		}
	})

	// SECTION 03 - INTRO ----------------------------------
	var introThumbsSwiper = new Swiper('.intro-thumbs-swiper', {
		speed: 400,
		spaceBetween: 0,
        slidesPerView: "auto",
		allowTouchMove: false,
	});

	var introSwiper = new Swiper('.intro-swiper', {
		speed: 400,
		spaceBetween: 0,
		slidesPerView: 1,
		centeredSlides: true,
		breakpoints: {
			1200: {
				slidesPerView: 1,
			},
		},
		navigation: {
			nextEl: '.intro-swiper-controller .swiper-button-next',
			prevEl: '.intro-swiper-controller .swiper-button-prev',
		},
        thumbs: {
          swiper: introThumbsSwiper,
        },
        pagination: {
          el: ".intro .swiper-pagination",
          type: "fraction",
		  formatFractionCurrent: function (number) {
			  return ('0' + number).slice(-2);
		  },
		  formatFractionTotal: function (number) {
			  return ('0' + number).slice(-2);
		  },
		  renderFraction: function (currentClass, totalClass) {
			  return '<span class="' + currentClass + '"></span>' +
					 ' / ' +
					 '<span class="' + totalClass + '"></span>';
		  }
        },
	})
	function introSwiperHeight(){
		var h = $('.intro-swiper .card.greetings .cont_box .left_col').css('height');
		$('.intro-swiper .card.greetings .cont_box .right_col').css('height', 'calc(100% - ' + h + ')');
	}

	// SECTION 04 - BUSINESS ----------------------------------
	var businessSwiper;
	function businessSwiperFn(){
		if($(window).width() > 1400 && businessSwiper != undefined){ // pc 슬라이드 x
			businessSwiper.destroy();
			businessSwiper = undefined;
			$('.business-swiper .swiper-wrapper').removeAttr('style');
			$('.business-swiper .swiper-slide').removeAttr('style');

		} else if($(window).width() <= 1400 && businessSwiper == undefined){ // 모바일 슬라이드
			businessSwiper= new Swiper('.business-swiper', {
				speed: 400,
				spaceBetween: 0,
				slidesPerView: 1,
				parallax: true,
				pagination: {
					el: '.business .swiper-pagination',
					type: 'bullets',
					renderBullet: function (index, className) {
					  return '<button class="' + className + '"><span class="blind">' + (index + 1) + '</span></button>';
					},
					clickable: true,
				},
				breakpoints: {
					601: {
					  slidesPerView: 2,
					},
				},
			});
			$('.business-swiper .swiper-wrapper').css('display', '');
		}
	}
	
	function businessSwiperHeight(){
		var itemH = 0;

		$('.business-swiper').find(".swiper-slide").each(function(index, item){ 
			if($(item).outerHeight() > itemH) // 최대높이 구하기
			itemH = $(item).outerHeight();
		})
		
		$('.business-swiper').find(".swiper-slide").css({
			'minHeight': itemH,
			'maxHeight': itemH,
		});
	}

	$('.business-swiper .swiper-slide').on('mouseenter', function(){
		$('.business-swiper .swiper-slide').removeClass('is-show');
		$(this).addClass('is-show');
	})
	$('.business-swiper .swiper-slide a').on('focus', function(){
		$('.business-swiper .swiper-slide').removeClass('is-show');
		$(this).closest('.swiper-slide').addClass('is-show');
	})

	// SECTION 05 - HISTORY ----------------------------------
	var historyThumbsSwiper = new Swiper('.history-thumbs-swiper', {
		speed: 400,
		spaceBetween: 0,
        slidesPerView: "auto",
		allowTouchMove: false,
	});

	var historySwiper = new Swiper('.history-swiper', {
		speed: 400,
		spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,
		effect : 'fade',
		navigation: {
			nextEl: '.history-swiper-controller .swiper-button-next',
			prevEl: '.history-swiper-controller .swiper-button-prev',
		},
        thumbs: {
          swiper: historyThumbsSwiper,
        },
        pagination: {
          el: ".intro-swiper-pagination",
          type: "fraction",
        },
	})

	historySwiper.on('transitionStart', function () {
		$('.history .tit_area .section_year strong').text(
			$('.history-swiper .swiper-slide-active .card .cont_box h3').text()
		);
	});

	$(historyThumbsSwiper.$el).find('button').on('click', function(){
		console.log('클릭')
	});
	
	// 셀렉트박스 radio 커스텀 --------------------------------
	var selectToggle = function(target){ // target은 select_wrap
        
        if(!target.hasClass('is_open')){
            $('.select_wrap').removeClass('is_open');
            target.addClass('is_open');
        } else{
            target.removeClass('is_open');
            target.find('a').focus();
        }
    }

    $('.select_wrap > a').on('click', function(e){
        selectToggle($(this).parents('.select_wrap'));
    })

	// 선택 영역 외 클릭 시 이벤트 -------------------------------------------
    $('body').on('click', function(e){
        // 셀렉트 외 선택 시 셀렉트 옵션 닫힘
        if(!$('.select_wrap').has(e.target).length){
            $('.select_wrap').removeClass('is_open');
            $('.select_wrap').find('.is_open').hide();
        }
    });

	// HEADER ----------------------------------
	$('.header_bottom .nav a').on('click', function(){
		$('.header_bottom .nav > li').removeClass('is-active');
		$(this).closest('li').addClass('is-active');
	})	

	// 상단으로 가는 버튼
    $('.btn_top').on('click', function(){
		$('html, body').animate({scrollTop: 0}, 500);
    })

	function goTop(){
		if($(window).scrollTop() > 0){
			$('.btn_top').stop().fadeIn(200);
		}else{
			$('.btn_top').stop().fadeOut(200);
		}
	}

	// 탑버튼 하단 고정
	function stickyFooter(){
		var docH = $(document).outerHeight(), // 문서전체높이
			scrollPos = $('html, body').scrollTop() || $(window).scrollTop(),// 문서 전체 높이 중 스크롤 위치
			winH = $(window).outerHeight(),// 창높이
			footerH = $('.footer').outerHeight(),
			btnTopH = $('.btn_top').outerHeight();
			
		var gap = 0;
		var bottom = 0;
		gap = docH - footerH - winH - (btnTopH / 2); 
		bottom = scrollPos - gap;

		if(scrollPos > (gap + 30)){
			$('.btn_top').css('bottom', bottom + 'px');
		} else{
			$('.btn_top').css('bottom', 30 + 'px');
		}
	}

	// 팝업 -------------------------------------------
	var focusTmp = undefined;
	var bodyScrollTop = 0;

	// 팝업열기
	$('[data-popup]').on('click', function(e){
				
		var popBtnName = $(this).data('popup');
		var popBtnCon = $('[data-popup-con="' + popBtnName + '"]');

		focusTmp = $(this);

		popBtnCon.removeClass('is_hidden');
		popupScrollAreaSet(popBtnCon);
		$.bodyFixedScroll(scrollResponsiveBool);

		$(popBtnCon).attr('tabindex', -1).on('blur focusout', function () {
			$(this).removeAttr('tabindex');
		}).focus();

	});

	// 팝업닫기
	$('.popup_area .btn_close').on('click', function(e){
		$(this).closest('.popup_area').addClass('is_hidden');	
		$.bodyFixedScroll(scrollResponsiveBool);
		focusTmp.focus();
	});


	$.bodyFixedScroll = function(scrollResponsiveBool){

		if(scrollResponsiveBool == true){
			// console.log('--------- 모바일 or 줌상태 ---------');
		
			if($('.popup_area:not(.is_hidden)').length){
			 	// console.log('팝업 열림');
				$.fn.fullpage.setLockAnchors(true);
				disabledScroll();
			 } else{
				// console.log('팝업 닫힘');
			 	$.fn.fullpage.setLockAnchors(false);
			 	abledScroll();
			}

		} else{
			// console.log('--------- PC ---------');
			initScroll();
			$.fn.fullpage.setLockAnchors(false);

			var sectionNum = $('.popup_area:not(.is_hidden)').attr('data-popup-con'),
				moveToNum = $('[data-popup="' + sectionNum + '"]').closest('.section').index() + 1;
			
			$.fn.fullpage.silentMoveTo(moveToNum);
		
			if($('.popup_area:not(.is_hidden)').length){
				//  console.log('팝업 열림');
				$.fn.fullpage.setAllowScrolling(false);
			} else{
				//  console.log('팝업 닫힘');
				$.fn.fullpage.setAllowScrolling(true);
			}
		}
	}

	function initScroll(){
		$('body').css({
			'position':'',
			'overflow':'hidden',
			'top':'',
			'left':'',
			'right':'',
		});
	}
	function disabledScroll(){
		bodyScrollTop = $(window).scrollTop();
		var zoomVal = $('body').css('zoom');	
		var sectionNum = $('.popup_area:not(.is_hidden)').attr('data-popup-con'),
			moveToNum = $('[data-popup="' + sectionNum + '"]').closest('.section');		
		var offsetTop = moveToNum.offset().top;

		$('body').css({ 
			'position':'fixed',
			'overflow-y':'scroll',
			'top': -bodyScrollTop + 'px',
			'left':'0px',
			'right':'0px',
		})
	}
	function abledScroll(){			
		var zoomVal = $('body').css('zoom');

		$('body').css({
		  'position':'',
		  'overflow':'visible',
		  'top':'',
		  'left':'',
		  'right':'',
		});

		$(window).scrollTop(bodyScrollTop)
	}

	// 팝업 내 스크롤 영역 높이 설정
	function popupScrollAreaSet(popBtnCon){
		var boxH, headerH, conPaddingH, footerH, totalH;

		boxH = popBtnCon.find('.popup_box').outerHeight();
		headerH = popBtnCon.find('.popup_header').outerHeight();
		conPaddingH = Number(popBtnCon.find('.popup_con').css('paddingTop').split('px')[0]) 
					+ Number(popBtnCon.find('.popup_con').css('paddingBottom').split('px')[0]);
		footerH = popBtnCon.find('.popup_footer').length == 1 ? popBtnCon.find('.popup_footer').outerHeight() : 0;

		totalH = headerH + conPaddingH + footerH;

		popBtnCon.find('.scroll_area').css('max-height', boxH - totalH);
		popBtnCon.find('.scroll_area').scrollTop(0);
	}

	$('.popup_area .paging_controller a').on('click', function(){
		popupScrollAreaSet($(".popup_area:not('.is_hidden')"));
	})	

	// 기기체크
	function Mobile() {return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);}

	// 팝업 내 프린트 모바일에서는 숨김
	function printHide(){
		if(Mobile() == true){		
			$('.popup_header').addClass('print-hide');
		} else{
			$('.popup_header').removeClass('print-hide');
		}
	}

	// 팝업 내 sns 버튼
	$('.btn_share').on('click', function(){
	
		if(!$(this).closest('li').hasClass('is-open')){
			$(this).closest('li').addClass('is-open');
			$(this).siblings('.addthis_inline_share_toolbox').stop().slideDown();
		} else{
			$(this).closest('li').removeClass('is-open');
			$(this).siblings('.addthis_inline_share_toolbox').stop().slideUp();
		}
	})

	// 모바일 첨부파일 토글
	function popupAttachFn(){
		if($(window).width() < 1200 && !$('.attach_area').hasClass('is-open')){
			$('.attach_area ul').hide();
		} else{
			$('.attach_area ul').show();
		}

		$('.attach_area .tit').on('click', function(){
			if($(window).width() < 1200){
				if(!$(this).closest('.attach_area').hasClass('is-open')){
					$(this).closest('.attach_area').addClass('is-open');
					$(this).closest('.attach_area').find('ul').show();
	
				} else{
					$(this).closest('.attach_area').removeClass('is-open');				
					$(this).closest('.attach_area').find('ul').hide();				
				}
				popupScrollAreaSet($(this).closest('.popup_area'));
			}
		})
	}

	// 팝업 제외 스크롤 영역 내에서의 마우스 휠 이벤트
	$('.scroll_area').on('wheel', function(e){
		if(!$(this).closest('.popup_area').length){
			var areaH = $(this).outerHeight();
			var areaConH = 0;		
			$(this).children().each(function(index, item){
				areaConH += $(item).outerHeight();
			})

			$.fn.fullpage.setAllowScrolling(false);
			if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0){ // scroll up
				// console.log('Scroll Up')
				if($(this).scrollTop() == 0){
					$.fn.fullpage.setAllowScrolling(true);
				}
			} else{ // scroll down
				// console.log('Scroll Down')
				if($(this).scrollTop() >= (areaConH - $(this).outerHeight())){
					$.fn.fullpage.setAllowScrolling(true);
				}
			}
		}
	});
	$('.scroll_area').on('mouseleave', function(){
		if(!$(this).closest('.popup_area').length){
			$.fn.fullpage.setAllowScrolling(true);
		}
	});


	// ---------------------------
	zoom_area.init();
	zoomCheckResize();
	businessSwiperFn();
	printHide();
	popupAttachFn();
	goTop();
	if($(".popup_area:not('.is_hidden')").length){ popupScrollAreaSet($(".popup_area:not('.is_hidden')")); }
	$('.directions').css('paddingBottom', $('.footer').outerHeight());
	introSwiperHeight();
	
	$(window).on('resize', function() {
		zoomCheckResize();
		businessSwiperFn();
		printHide();
		popupAttachFn();
		goTop();		
		if($(".popup_area:not('.is_hidden')").length){ popupScrollAreaSet($(".popup_area:not('.is_hidden')")); }
		$('.directions').css('paddingBottom', $('.footer').outerHeight());
		introSwiperHeight();
		
		$.fn.fullpage.reBuild();
		if($(window).width() < 1200){
			$('body').css({
				'zoom':'',
				'MozTransform' : '',
				'MozTransformOrigin' : '',
				'OTransform' : '',
				'OTransformOrigin' : ''
			});
			$('body').removeClass('is_zoom');
		}
	});

	$(window).on('scroll', function(){
		goTop();
		stickyFooter();
    });

});