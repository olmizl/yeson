$(function () {
    
    $(document).ready(function () {
        AOS.init();
        Splitting();
        
        // 새로고침시 wrap 에 active 클래스 붙음
        setTimeout(function () {
            $('.wrap').addClass('loadend');
        }, 200);


        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // resize
        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });

        $(window).resize(function () {
            ScrollTrigger.refresh();
        })

        
       
    });





    function header() {


        //header lng =====================================
        $('.header_top .ht_lng .second , .header_top .ht_lng .first').lettering();

        
        function h_pc() {

            //header layout =====================================
    
            let pc_depth01 = $('.header_btm .gnb_li');
            let pc_depth02ul = $('.header_btm .depth02_ul');

            pc_depth01.on('mouseenter focus', function (index) {
                $(this).find(pc_depth02ul).css('display', 'flex');
                $(this).addClass('act').siblings().removeClass('act');
                $(this).parents('.header').addClass('color');
                var nowindex = $(this).index();
                $('.blur div').eq(nowindex).addClass('on').siblings().removeClass('on');

            })
            
            pc_depth01.on('mouseleave blur', function () {
                pc_depth02ul.css('display', 'none');
                $(this).removeClass('act');
                $('.blur div').removeClass('on');
                if ($(window).scrollTop() > 100) {
                    $(this).parents('.header').addClass('color')
                } else {
                    $(this).parents('.header').removeClass('color')
                }
            });


            //depth02 mouseover 효과 v=====================================
            $('.header_btm .depth02_ul .depth02').on('mouseenter focus', function () {
                $(this).addClass('act');
            })
            $('.header_btm .depth02_ul .depth02').on('mouseleave blur', function () {
                $(this).removeClass('act');
            })
    
            //gnb bottomline 효과
            $('.gnb_btm > li').on('mouseenter focus', function () {
                $(this).each(function (index) {
                    let gnb_btmli_index = $(this).index();
                    $('.gnb_li').eq(gnb_btmli_index).addClass('act');
                })
            });
            
            $('.gnb_btm > li').on('mouseleave blur', function () {
                $('.gnb_li').removeClass('act');
            });


            // pc 버전 depth02 블러 효과
            
        
            
        }
        h_pc();

        function resizeblur() {

            const str = $('.header_btm .depth02_ul').css('gap');
            const regex = /[^0-9]/g;
            const result = str.replace(regex, "");
            const number = parseInt(result) / 10;

            $('.header_btm .gnb_li .depth02_ul').each(function (index, item) {
                var numli = ($(item).find('.depth02').length - 1) * number ;
                var depth02ul_height = $(item).outerHeight() + numli;  

                $('.blur div').eq(index).height(depth02ul_height);

            });
            
        }
        resizeblur();
        
        //header mobile =====================================
        function h_mobile() {

            if ($(window).width() < 1025) {

                $('.header_btm .gnb_li').off('mouseenter focus');
                $('.header_btm .gnb_li').off('mouseleave blur');
                $('.header_btm .depth02_ul .depth02').off('mouseenter focus');
                $('.header_btm .depth02_ul .depth02').off('mouseleave blur');
                $('.gnb_btm > li').off('mouseenter focus');
                $('.gnb_btm > li').off('mouseleave blur');

                $('.header_btm .gnb_li').on('click', function () {
                    $(this).addClass("mo_act").siblings().removeClass('mo_act');
                    let mo_now_li_num = $(this).index();
                    $('.mo_depth02 .gnb .gnb_li').eq(mo_now_li_num).css('display', 'flex').siblings().css('display', 'none');
                })
            }
        }
        h_mobile();

        $(window).resize(function () {

            $('.wrap').removeClass('open');
            $('.header').removeClass('open');
            $('.mo_depth02').css('display', 'none');
            $('.mo_depth02 .gnb_li').css('display', 'none');

            resizeblur();
            
            if ($(window).width() < 1025) {
                $('.header_btm .gnb_li').removeClass('mo_act')
                h_mobile();
            } else {
                h_pc();

            }
        });

        //header sitemap =====================================
        $('.sitemap_btn').on('click', function () {
            $('.wrap').toggleClass('open')
            $('.header').toggleClass("open");
            $('body').toggleClass('scrollno');
            $('.mo_depth02').css('display', 'flex');

            // sitemap 닫혔을떄
            if (!$('.header').hasClass('open')) {
                $('.mo_depth02 .gnb .gnb_li').css('display', 'none');
                $('.header_btm .gnb_li').removeClass('mo_act');
                $('.mo_depth02').css('display', 'none');
            }

            // 높이에 따라 sitemap 닫혔을떄 
            if ($(window).scrollTop() < 100) {
                $('.header').addClass("color");
            };

            if ($(window).scrollTop() < 100) {
                if (!$('.header').hasClass('open')) {
                    $('.header').removeClass("color");
                }
            };
        });



        //header hide =====================================
        let lastScroll = 0;
        $(window).scroll(function () {
            let currentScroll = $(window).scrollTop();
            if (currentScroll > 0) {
                $('.header').addClass('color');
                if (currentScroll > lastScroll) {
                    //down
                    $('.header').addClass('fixed');
                    $('.wrap').addClass('fixed')
                    $('.gnb_li').removeClass('act')
                } else {
                    //up
                    $('.header').removeClass('fixed');
                    $('.wrap').removeClass('fixed')
                }
                lastScroll = currentScroll;
            } else {
                $('.header').removeClass('color');
            }
        });

        
        
    }
    header();

    function main() {
        // main info slide =====================================
        let info_slide = new Swiper(".info_slide .con", {
            draggable: true,
            effect: 'coverflow',
            touchRatio: 1,
            centeredSlides: true,
            slidesPerView: 3,
            spaceBetween: 100,
            loop: true,
            coverflowEffect: {
                slideShadows: false,
                rotate: 70,
            },
            // autoplay: {
            //     delay: 3500,
            //     disableOnInteraction: false,
            // },
            navigation: {
                nextEl: ".info_slide .swiper-button-next",
                prevEl: ".info_slide .swiper-button-prev",
            },
            breakpoints: {
                1680: { 
                    spaceBetween: 100,
                },
                0: { 
                    spaceBetween: 0,
                },
            },
        });

        $('.main_visual .maincon .down div').on('click', function () {
            $('html,body').animate({ scrollTop: $('#section01').offset().top }, 400);
        })


        //main gallery slide =====================================
        let galleryslide = new Swiper(".gallerylist", {
            draggable: true,
            effect: 'slide',
            touchRatio: 1,
            // centeredSlides: true,
            slidesPerView: 'auto',
            spaceBetween: 40,
            loop: false,
            mousewheel: {
                invert: false,
              },
            // initialSlide: 5,
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            // },
            breakpoints: {
                1680: { 
                    spaceBetween: 40,
                },
                640: { 
                    spaceBetween: 20,
                },
                0: { 
                    spaceBetween: 15,
                }
            },
            navigation: {
                nextEl: ".galleryslide .swiper-button-next",
                prevEl: ".galleryslide .swiper-button-prev",
            },
            watchOverflow : true,
            on: {
                slideChange: function() {
                    setTimeout(function () {
                    galleryslide.params.touchReleaseOnEdges = false;  
                    galleryslide.params.mousewheel.releaseOnEdges = false;
                    });
                },
                reachEnd: function() {
                    setTimeout(function () {
                    galleryslide.params.touchReleaseOnEdges = true;
                    galleryslide.params.mousewheel.releaseOnEdges = true;
                    }, 500);
                },
                reachBeginning: function() {
                    setTimeout(function () {
                    galleryslide.params.touchReleaseOnEdges = true;
                    galleryslide.params.mousewheel.releaseOnEdges = true;
                    }, 500);
                }
            }
            
        });


        // main input placeholder =====================================
        let login_box = $('.inquiry .tab .tab_login .login_form input');

        login_box.on('focusin', function () {
            $(this).next('span').addClass('active');
        });
          
        login_box.on('focusout', function () {
            if (!this.value) {
                $(this).next('span').removeClass('active');
            }
        });
        
        //main newsletter placeholder =====================================
        let form_box = $('.newsletter .nl_right .nl_form > div input');

        form_box.on('focusin', function () {
            $(this).next('span').addClass('active');
        });
          
        form_box.on('focusout', function () {
            if (!this.value) {
                $(this).next('span').removeClass('active');
            }
        });

        //newsletter letter ===================================== 
        $('.application p').lettering();

        //main lettering =====================================
        $(".info_slide .swiper-slide .slidetxt").lettering();
        $('.inquiry .tab .box .title').lettering();
        $('.header_btm .login a p').lettering();
        $('.main_visual .maincon .title .big .t2 p').lettering();
        $('.main_visual .maincon .title .big .t3 p').lettering();

        // main youtube
        $(".video_slide .thumbnail").on("click", function () {
            $(this).addClass('fade');
            $("#youtube_video")[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        });

        $('.video_slide .thumblist ul li').on('click', function () {
            let datasrc = $(this).data("src") + `?enablejsapi=1&version=3&playerapiid=ytplayer`;
            let imgsrc = $(this).find('.left > img').attr('src');

            $('.video_slide .playmode .youtubebox iframe').attr('src', datasrc);
            $('.video_slide .thumbnail .thumbimg').attr('src', imgsrc);

            $('.video_slide .thumbnail').removeClass('fade')
        });

        //main 2025 SEOUL 텍스트 =====================================
        $('.letter').lettering(); 
        $('.letter span').wrap('<i class="it"></i>');

        //mouse custom =====================================
        document.addEventListener("mousemove", (e) => {
            // 마우스 커서의 좌표를 가져옵니다.
            const x = e.clientX;
            const y = e.clientY;

            //==============인포 슬라이드 커서
          
            // cursor_div를 커서 좌표로 이동
            $("#cursor_div").css('transform', 'translate(' + x + 'px, ' + y + 'px)');
          
            // 원하는 영역에 올라오면 클래스 추가 및 제거
            $('.info_slide').eq(0).on('mouseover', function () {
                $('#cursor_div .inner_wrap').eq(0).addClass('on');
            });
            $('.info_slide').eq(0).on('mouseleave', function () {
                $('#cursor_div .inner_wrap').eq(0).removeClass('on');
            });

            // 원하는 영역에 올라오면 클래스 추가 및 제거
            $('.info_slide .swiper-button-prev').on('mouseover', function () {
                $('#cursor_div .inner_wrap').addClass('left').removeClass('right');
            });
            $('.info_slide .swiper-button-next').on('mouseover', function () {
                $('#cursor_div .inner_wrap').addClass('right').removeClass('left');
            });


            // ============포토갤러리 커서
            // cursor_div를 커서 좌표로 이동
            $("#cursor_gallery").css('transform', 'translate(' + x + 'px, ' + y + 'px)');
            // 원하는 영역에 올라오면 클래스 추가 및 제거
            $('.gallerylist').on('mouseover', function () {
                $('#cursor_gallery .inner_wrap').addClass('on');
            });
            $('.gallerylist').on('mouseleave', function () {
                $('#cursor_gallery .inner_wrap').removeClass('on');
            });

  
            
        });
        
        // main sction sticky top 구하기 =====================================
        let sectionh01 = $('#section01').height();
        let sectionh01_minus = (sectionh01 - $(window).height()) * -1;
        $('#section01').css('top', sectionh01_minus);
        let sectionh02 = $('#section02').height();
        let sectionh02_minus = (sectionh02 - $(window).height()) * -1;
        $('#section02').css('top', sectionh02_minus);
        let sectionh03 = ($('#section03').height() + 200) * -1;
        // let sectionh03_minus = (sectionh03 - $(window).height()) * -1 - 600;
        let sectionh03_minus = -1800;
        // if ($(window).width() > 3000) {
        //     let sectionh03_minus = -1600;
        // } else if ($(window).width() > 3500) {
        //     let sectionh03_minus = -1400;
        // }; 
        
        $('#section03').css('top', sectionh03);
        $(window).resize(function () {
            let sectionh01 = $('#section01').height();
            let sectionh01_minus = (sectionh01 - $(window).height()) * -1;
            $('#section01').css('top', sectionh01_minus);
            let sectionh02 = $('#section02').height();
            let sectionh02_minus = (sectionh02 - $(window).height()) * -1;
            $('#section02').css('top', sectionh02_minus);
            let sectionh03 = ($('#section03').height() + 200) * -1;
            let sectionh03_minus = -1800;
            $('#section03').css('top', sectionh03);
        })
        

        //main gsap============================//

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        gsap.defaults({ ease: "ease", duration: 2 });

        // 참가문의 5개 탭 gsap
        
        

        ScrollTrigger.matchMedia({
            '(min-width:1025px)': function () {

                const tl = gsap.timeline();
                tl.from(".section02 .inquiry .tab .tab_guide", { x: '-60px', y: '-60px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_qna", { x: '0px', y: '-60px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_download", { x: '60px', y: '-60px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_online", { x: '-60px', y: '60px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_login", { x: '60px', y: '60px' }, "motion");
                

                ScrollTrigger.create({
                    animation: tl,
                    trigger: ".section03",
                    start: "top-=400",
                    end: "+=400",
                    // pin: true,
                    // markers: true ,
                    scrub: 1,
                    anticipatePin: 1
                });
    
            },
            '(min-width:768px)': function () {

                const tl = gsap.timeline();
                tl.from(".section02 .inquiry .tab .tab_guide", { x: '-30px', y: '-30px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_qna", { x: '0px', y: '-30px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_download", { x: '30px', y: '-30px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_online", { x: '-30px', y: '30px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_login", { x: '30px', y: '30px' }, "motion");
                

                ScrollTrigger.create({
                    animation: tl,
                    trigger: ".section03",
                    start: "top-=2000",
                    end: "+=1000",
                    // pin: true,
                    // markers: true ,
                    scrub: 1,
                    anticipatePin: 1
                });
    
            },
            '(max-width:767px)': function () {

                const tl = gsap.timeline();
                tl.from(".section02 .inquiry .tab .tab_guide", { x: '-20px', y: '-20px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_qna", { x: '20px', y: '-20px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_download", { x: '-20px', y: '0px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_online", { x: '20px', y: '0px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_login", { x: '0px', y: '20px' }, "motion");
                

                ScrollTrigger.create({
                    animation: tl,
                    trigger: ".section03",
                    start: "top-=2000",
                    end: "+=1000",
                    // pin: true,
                    // markers: true ,
                    scrub: 1,
                    anticipatePin: 1
                });
    
            },
            '(max-width:550px)': function () {

                const tl = gsap.timeline();
                tl.from(".section02 .inquiry .tab .tab_guide", { x: '-0px', y: '-0px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_qna", { x: '0px', y: '-0px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_download", { x: '-0px', y: '0px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_online", { x: '0px', y: '0px' }, "motion")
                    .from(".section02 .inquiry .tab .tab_login", { x: '0px', y: '0px' }, "motion");
                

                ScrollTrigger.create({
                    animation: tl,
                    trigger: ".section03",
                    start: "top-=400",
                    end: "+=400",
                    // pin: true,
                    // markers: true ,
                    scrub: 1,
                    anticipatePin: 1
                });
    
            }

        });


        //main info_data =====================================
        var idx = 0; //초기화
        setInterval(infodatatime, 2500); // 시간은 1초로
        function infodatatime() {
            var infodata_li = $('.info_data li'); // 바뀌어야 할 선택자
            infodata_li.removeClass('now'); // 초기값 선택자(on) 삭제
            infodata_li.eq(idx).addClass('now'); // 해당순번 선택자 추가
            idx++;
            if (idx >= infodata_li.length) idx = 0;
        }

       
    }
    main();

    function main_gsap_txt() {
        
        gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({ ease: "ease", duration: 2 });
        // main mobility show coming soon gsap

        ScrollTrigger.matchMedia({

            '(min-width:1025px)': function () {
                const t2 = gsap.timeline();
                t2.to(".main_visual .maincon .title .big .t2 p:nth-child(1) .char1", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(1) .char2", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(1) .char3", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(1) .char4", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(1) .char5", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(1) .char6", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(1) .char7", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(1) .char8", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(2) .char1", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(2) .char2", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(2) .char3", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t2 p:nth-child(2) .char4", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t3 p:nth-child(1) .char1", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t3 p:nth-child(1) .char2", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t3 p:nth-child(1) .char3", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t3 p:nth-child(1) .char4", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t3 p:nth-child(1) .char5", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t3 p:nth-child(1) .char6", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t3 p:nth-child(2) .char1", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t3 p:nth-child(2) .char2", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t3 p:nth-child(2) .char3", { color: '#fff', ease: 'power1' })
                    .to(".main_visual .maincon .title .big .t3 p:nth-child(2) .char4", { color: '#fff', ease: 'power1' })
                
        
                ScrollTrigger.create({
                    animation: t2,
                    duration: 2,
                    // trigger: ".section03 .gallery .toptxt",
                    trigger: "#first_contents ",
                    // start: "top-=500",
                    start: "top top",
                    // end: "bottom center",
                    pin: true,
                    // markers: true,
                    invalidateOnRefresh: true,
                    scrub: true,
                    // anticipatePin: 1,
        
                    //gsap function 추가    
                    // onEnter: ONENTER,
                    // onLeave: ONLEAVE,
                    // onEnterBack: ONENTERBACK,
                    // onLeaveBack: ONLEAVEBACK
                });
        
                // function ONLEAVE() {
                //     galleryslide.autoplay.start();
                    
                // };
                // function ONENTERBACK() {
                //     galleryslide.autoplay.stop();
        
                // };
            }
        
        });

    }
    main_gsap_txt();



    // main count; =====================================

    function main_count() {
        const $countdown = $('.countbox'); // 카운트다운을 표시할 요소
        const $days = $('.cd'); // 남은 날짜를 표시할 요소
        const $hours = $('.ch'); // 남은 시간을 표시할 요소
        const $minutes = $('.cm'); // 남은 분을 표시할 요소
        const $seconds = $('.cs'); // 남은 초를 표시할 요소
        let countdownInterval; // 카운트다운을 갱신하기 위한 인터벌 변수
        const format = true; // 0을 포함한 두 자리 숫자로 표시할지 여부를 결정하는 변수 (true, false)

        // 0을 포함한 두 자리 숫자로 표시하는 함수
        function formatNumber(number) {
            if (format) {
                return number < 10 ? `${number}` : number.toString();
            } else {
                return number.toString();
            }
        };

        // 카운트다운을 계산하는 함수
        function calculateCountdown() {
            // 현재 날짜와 시간을 가져옵니다.
            const now = new Date();
            // 목표 날짜와 시간을 설정합니다.
            const target = new Date('2025-04-09T00:00:00');
            // 목표 날짜까지의 시간 차이를 계산합니다.
            const diff = target - now;

            if (diff > 0) {
                // 시간 차이를 초, 분, 시간, 일로 분해합니다.
                const secDiff = Math.floor(diff / 1000);
                const minDiff = Math.floor(secDiff / 60);
                const hrDiff = Math.floor(minDiff / 60);
                const dayDiff = Math.floor(hrDiff / 24);

                // 각 요소에 해당하는 값을 설정하여 화면에 표시합니다.
                const days = formatNumber(dayDiff);
                const hours = formatNumber(hrDiff % 24);
                const minutes = formatNumber(minDiff % 60);
                const seconds = formatNumber(secDiff % 60);

                $days.text(days);
                $hours.text(hours);
                $minutes.text(minutes);
                $seconds.text(seconds);
            } else {
                // 카운트다운이 종료되면 메시지를 표시하고 인터벌을 중지합니다.
                clearInterval(countdownInterval);
            }
        }
        // 초기 카운트다운 값을 설정하고 1초마다 업데이트합니다.
        calculateCountdown();
        countdownInterval = setInterval(calculateCountdown, 1000);

        var countDownDate = new Date("4 9, 2025 00:00:00").getTime();
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var memberCountConTxt = Math.floor(distance / (1000 * 60 * 60 * 24));;

        $({ val: 0 }).animate({ val: memberCountConTxt }, {
            duration: 1500,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".cd").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".cd").text(num);
            }
        });

        var memberCountConTxt02 = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));;

        $({ val: 0 }).animate({ val: memberCountConTxt02 }, {
            duration: 1500,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".ch").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".ch").text(num);
            }
        });

        var memberCountConTxt03 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        $({ val: 0 }).animate({ val: memberCountConTxt03 }, {
            duration: 1500,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".cm").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".cm").text(num);
            }
        });

        var memberCountConTxt04 = Math.floor((distance % (1000 * 60)) / 1000);

        $({ val: 0 }).animate({ val: memberCountConTxt04 }, {
            duration: 1500,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".cs").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".cs").text(num);
            }
        });

        //3자리마다 , 찍기
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        
    }
    main_count();

    function main_count02() {

        var memberCountConTxt = 22000;

        $({ val: 0 }).animate({ val: memberCountConTxt }, {
            duration: 1500,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".nc01").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".nc01").text(num);
            }
        });

        var memberCountConTxt02 = 32427;

        $({ val: 0 }).animate({ val: memberCountConTxt02 }, {
            duration: 1500,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".nc02").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".nc02").text(num);
            }
        });

        var memberCountConTxt03 = 18;

        $({ val: 0 }).animate({ val: memberCountConTxt03 }, {
            duration: 1500,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".nc03").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".nc03").text(num);
            }
        });

        var memberCountConTxt04 = 303;

        $({ val: 0 }).animate({ val: memberCountConTxt04 }, {
            duration: 1500,
            step: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".nc04").text(num);
            },
            complete: function () {
                var num = numberWithCommas(Math.floor(this.val));
                $(".nc04").text(num);
            }
        });

        //3자리마다 , 찍기
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
    }

    function vis_news() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // entry의 target으로 DOM에 접근합니다.
                const $target = entry.target;
                // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
                if (entry.isIntersecting) {
                    $target.classList.add("vis");
                } else {
                    $target.classList.remove("section_vis");
                };
            });
        });
        // 옵저버할 대상 DOM을 선택하여 관찰을 시작합니다.
        const $items = document.querySelectorAll("section");
        $items.forEach((item) => {
            io.observe(item);
        });
    }
    // vis_news();

    function main_vis() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // entry의 target으로 DOM에 접근합니다.
                const $target = entry.target;
                // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
                if (entry.isIntersecting) {
                    $target.classList.add("vis");
                    
                    if (!$('.section02').hasClass('section_vis')) {
                        main_count02();
                    }
                } else {
                    $target.classList.remove("vis");
                };
            });
        });

        // 옵저버할 대상 DOM을 선택하여 관찰을 시작합니다.
        const $items = document.querySelectorAll(".info_data");
        $items.forEach((item) => {
            io.observe(item);
        });
    }
    main_vis();

    function vis_script() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // entry의 target으로 DOM에 접근합니다.
                const $target = entry.target;
                // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
                if (entry.isIntersecting) {
                    $target.classList.add("section_vis");
                } else {
                    $target.classList.remove("section_vis");
                };
            });
        });
        // 옵저버할 대상 DOM을 선택하여 관찰을 시작합니다.
        const $items = document.querySelectorAll("section");
        $items.forEach((item) => {
            io.observe(item);
        });
    }
    vis_script();

    function divvis_script() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // entry의 target으로 DOM에 접근합니다.
                const $target = entry.target;
                // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
                if (entry.isIntersecting) {
                    $target.classList.add("middiv_vis");
                } else {
                    $target.classList.remove("middiv_vis");
                };
            });
        });
        // 옵저버할 대상 DOM을 선택하여 관찰을 시작합니다.
        const $items = document.querySelectorAll(".middiv");
        $items.forEach((item) => {
            io.observe(item);
        });
    }
    divvis_script();

    //footer script =====================================
    function footer() {
        let familysite = $('.footer .ft_top .top_right .familysite');
        familysite.on('click', function () {
            $(this).toggleClass('act');
        });
        familysite.on('mouseleave', function () {
            $(this).removeClass('act');
        });

        $(window).scroll(function () {
            //scrolltop button
            if ($('#section03').hasClass('section_vis')) {
                $('.scrolltop_btn').addClass("verb");
            } else {
                $('.scrolltop_btn').removeClass("verb");
            };``

            if ($('#section04').hasClass('section_vis')) {
                $('.scrolltop_btn').removeClass("verb");
            };

            if ($(window).scrollTop() > 1500) {
                $('.scrolltop').css('display', 'block');
            } else {
                $('.scrolltop').css('display', 'none');
            };

            //스크롤 맨아래 감지
            var docHeight = $(document).height() - $('footer').height() + 100;
    
            if ($(window).scrollTop() + $(window).height() >= docHeight) {
                $('.scrolltop').addClass('bottom');
                // $('.scrolltop_btn').css('bottom',$('footer').height() + 10)
            } else {
                $('.scrolltop').removeClass('bottom');
            }


        })

        //스크롤 탑버튼 기능
        $('.scrolltop').on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 500);
        })

        // 페이지 전체 스크롤 모션
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        
        let smoother;
        function smootherSetup() {
            smoother = ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                normalizeScroll: {allowNestedScroll: true} ,
                ignoreMobileResize: true,   
                smooth: 1.2,
                effects: true,
            });
        }
        // smootherSetup()
        

        // 푸터 모달기능
        let ft_modal_open = $('.footer .top_right .privacy .tit , .newsletter .nl_right .emno');
        let ft_modal = $('.ft_modal');
        let ft_modal_close = $('.ft_modal_bg , .ft_modal .ft_modal_close ')
         
        ft_modal_open.on('click', function () {
            ft_modal.css('display', 'block');
            $('body').addClass('scrollno');
            // smoother.kill();
        })
        
        ft_modal_close.on('click', function () {
            ft_modal.css('display', 'none');
            $('body').removeClass('scrollno');
            // smootherSetup();
        })

    } footer();


});