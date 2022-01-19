$(function () {

    const swipe = $('.swipe');
    const swipeContent = $('.swipe__content');
    const swipeMenuContent = $('.swipe .menu__content');
    const swipeMenuContentCategories = $('[data-name="doctors-categories"]');

    const branchDetail = $('[data-name="branch-detail"]');
    const doctorAbout  = $('.doctor__about');
    const stepsItemsCount = $('[data-name*="nav-step-"]').length;

    let headerHeight = $('.header').height(),
        headerOffset = 0;
        scrollPosOffset = headerHeight + headerOffset;

    let scrollPos = window.scrollY;
    let step = 1;

    // Btn up
    const btnUp = $('#btnUp').html();

    let btnUpFlag = 0;
    let btnUpcompiledTemplate = Template7.compile(btnUp);
    let btnUpTemplate = btnUpcompiledTemplate();

    // --- Header

    // Burger
    $('.burger').on('click', function (e) {
        e.preventDefault();
        
        let self     = $(this),
            type     = self.data('name');

        if(!self.hasClass('burger--active')) {
            self.addClass('burger--active');
        }
        else {
            self.removeClass('burger--active');
        }

        // Open dropdown
        let parent   = self.parents('.header__other'),
            dropdown = parent.find('.header__dropdown');

        if(type == 'dropdown') {
            if(!dropdown.hasClass('header__dropdown--opened')) {
                dropdown.addClass('header__dropdown--opened');
            }
            else {
                dropdown.removeClass('header__dropdown--opened');
            }
        }

        // Open swipe
        if(!swipe.hasClass('swipe--opened')) {
            swipe.addClass('swipe--opened');
            $('body').addClass('swipe-open');
        }
        else {
            swipe.removeClass('swipe--opened');
            $('body').removeClass('swipe-open');
        }

    });

    // --- / Header


    // --- Swipe
    $('.swipe .menu__icon').on('click', function (e) {
        let self   = $(this),
            parent = self.parent(),
            index  = parent.index(),
            name   = self.data('name');

        if(name == 'swipe-first-lvl') {
            swipeMenuContent.eq(index).addClass('menu__content--opened');
            swipeMenuContentCategories.removeClass('menu__content--opened');
            swipeContent.addClass('swipe__content--opened');
        }
        else {
            swipeMenuContentCategories.eq(index).addClass('menu__content--opened');
            swipeContent.addClass('swipe__content--second');
        }
    });

    $('[data-name="swipe-menu-back"]').on('click', function (e) {
        let self   = $(this),
            parent = self.parents('.menu__content'),
            parentCategories = self.parents('[data-name="doctors-categories"]');

        if(parentCategories.length > 0) {
            parentCategories.removeClass('menu__content--opened');
            swipeMenuContentCategories.removeClass('menu__content--opened');
            swipeContent.removeClass('swipe__content--second');
        }
        else {
            parent.removeClass('menu__content--opened');
            swipeContent.removeClass('swipe__content--opened');
            swipeContent.removeClass('swipe__content--second');
        }
    });

    // --- / Swipe


    // --- Main

    // Main slider
    const mainSlider = new Swiper(".main-slider", {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            prevEl: ".main-slider .swiper-arrow--prev",
            nextEl: ".main-slider .swiper-arrow--next",
        },
    });

    // Breadcrumb slider
    const breadcrumbSlider = new Swiper(".breadcrumb__list", {
        slidesPerView: 'auto',
    });

    // Tabs slider
    const tabsSlider = new Swiper(".tabs__list", {
        slidesPerView: 'auto',
        spaceBetween: 10
    });

    // Reviews slider
    const reviewsSlider = new Swiper(".reviews__list", {
        // loop: true,
        navigation: {
            prevEl: ".reviews .swiper-arrow--prev",
            nextEl: ".reviews .swiper-arrow--next",
        },
        breakpoints: {
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });

    // Articles slider
    const articlesSlider = new Swiper(".articles__list", {
        navigation: {
            prevEl: ".articles .swiper-arrow--prev",
            nextEl: ".articles .swiper-arrow--next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 10
            }
        }
    });

    let isArticlesSlider = () => {
        if($('.articles .swiper-button-lock').length > 0) {
            return true;
        }

        return false;
    }

    let setArticlesSliderLock = () => {
        if(isArticlesSlider()) {
            $('.articles').addClass('swiper-lock');
        }
        else {
            $('.articles').removeClass('swiper-lock');
        }
    }

    setArticlesSliderLock();

    // Certificates slider
    const certificatesSlider = new Swiper(".certificates__list", {
        slidesPerView: 'auto',
        watchOverflow: true,
        navigation: {
            prevEl: ".certificates .swiper-arrow--prev",
            nextEl: ".certificates .swiper-arrow--next",
        },
        breakpoints: {
            992: {
                spaceBetween: 30,
            },
            0: {
                spaceBetween: 10
            }
        }
    });

    // Gallery slider
    const gallerySlider = new Swiper(".section__slider", {
        navigation: {
            prevEl: ".section__slider .swiper-arrow--prev",
            nextEl: ".section__slider .swiper-arrow--next",
        },
        pagination: {
            el: ".section__slider .swiper-pagination",
            clickable: true,
        },
    });

    // Branch detail
    if(branchDetail.length) {
        $('ul', branchDetail).each(function (index, item) {
            let itemsCount = $(item).find('li').length;
            let name = $(item).data('name');

            if(itemsCount > 5) {
                $(item).find('li:not(:lt(5))').hide();
                $(item).after(`<a class="btn btn--secondary" href="#" data-name="show-all">Смотреть ${name}</a>`);
            }
        });
    }

    // Select doctor
    $('[data-name="select-doctor"]').on('click', function (e) {
        e.preventDefault();

        let item = $(this);

        if(!item.hasClass('cards__item--active')) {
            item.addClass('cards__item--active');
        }
        else {
            item.removeClass('cards__item--active');
        }
    });

    // Doctor about
    if(doctorAbout.length) {
        let item = $('.list__item', doctorAbout);
        let itemsCount = item.length;
        let parent = item.parent();

        if(itemsCount > 3) {
            $('.list__item:not(:lt(3))', doctorAbout).hide();
            parent.after(`<a class="btn btn--secondary" href="#" data-name="show-all">Показать полный список</a>`);
        }
    }

    // Tabs
    $('.tabs__item').on('click', function (e) {
        let self = $(this),
            index = self.index();

        $('.tabs__item').removeClass('tabs__item--active').eq(index).addClass('tabs__item--active');
        $('.tabs__content').removeClass('tabs__content--active').eq(index).addClass('tabs__content--active');
    });

    // Steps
    $('[data-name="next-step"]').on('click', function (e) {
        e.preventDefault();

        switch(step) {
            case 1:
                $('[data-name="content-step-1"]').removeClass('active');
                $('[data-name="nav-step-1"]').removeClass('active');
                $('[data-name="content-step-1"]').addClass('complete');
                $('[data-name="nav-step-1"]').addClass('complete');
                $('[data-name="content-step-2"]').addClass('active');
                $('[data-name="nav-step-2"]').addClass('active');

                step = 2;
            break;

            case 2:
                $('[data-name="content-step-2"]').removeClass('active');
                $('[data-name="nav-step-2"]').removeClass('active');
                $('[data-name="content-step-2"]').addClass('complete');
                $('[data-name="nav-step-2"]').addClass('complete');
                $('[data-name="content-step-3"]').addClass('active');
                $('[data-name="nav-step-3"]').addClass('active');

                step = 3;
            break;
        }
    });

    $('[data-name="prev-step"]').on('click', function (e) {
        e.preventDefault();

        switch(step) {
            case 1:
                return false;

            case 2:
                $('[data-name="content-step-1"]').removeClass('complete');
                $('[data-name="nav-step-1"]').removeClass('complete');
                $('[data-name="content-step-1"]').addClass('active');
                $('[data-name="nav-step-1"]').addClass('active');
                $('[data-name="content-step-2"]').removeClass('active');
                $('[data-name="nav-step-2"]').removeClass('active');

                step = 1;
            break;

            case 3:
                $('[data-name="content-step-2"]').removeClass('complete');
                $('[data-name="nav-step-2"]').removeClass('complete');
                $('[data-name="content-step-2"]').addClass('active');
                $('[data-name="nav-step-2"]').addClass('active');
                $('[data-name="content-step-3"]').removeClass('active');
                $('[data-name="nav-step-3"]').removeClass('active');

                step = 2;
            break;
        }
    });

    $('[data-name="finish-step"]').on('click', function (e) {
        e.preventDefault();

        switch(stepsItemsCount) {
            case 2:
                $('[data-name="content-step-2"]').removeClass('active');
                $('[data-name="content-step-finish"]').addClass('active');
                $('.steps__list').hide();
    
                step = 1;
            break;

            case 3:
                $('[data-name="content-step-3"]').removeClass('active');
                $('[data-name="content-step-finish"]').addClass('active');
                $('.steps__list').hide();
    
                step = 2;
            break;
        }
    });

    $('[data-name="return-step"]').on('click', function (e) {
        e.preventDefault();

        step = 1;

        $('.steps__list').removeAttr('style');

        $('[data-name*="nav-step-"]').removeClass('complete');
        $('[data-name*="nav-step-"]').removeClass('active');
        $('[data-name*="content-step-"]').removeClass('active');
        $('[data-name="content-step-finish"]').removeClass('active');

        $('[data-name="nav-step-1"]').addClass('active');
        $('[data-name="content-step-1"]').addClass('active');

        $('.form__input, textarea').val('');
        $('.form__input').removeClass('filled');
    });

    // Sticky sidebar
    if($('.sticky-sidebar').length) {
        const stickySidebar = new StickySidebar('.sticky-sidebar__aside', {
            containerSelector: '.sticky-sidebar',
            innerWrapperSelector: '.sticky-sidebar__inner',
            minWidth: 991,
            topSpacing: 164,
        });
    }

    // Gallery
    $('[data-name="gallery"]').on('click', function (e) {
        e.preventDefault();

        let currentIndex = $(this).index();

        let items              = $('[data-name="gallery"]'),
            galleryList        = [],
            galleryPreviewList = [];

        items.each(function (index, item) {
            let galleryItem = $(item).prop('href');
            let galleryItemPreview = $(item).find('img').prop('src');

            galleryList.push(galleryItem);
            galleryPreviewList.push(galleryItemPreview);
        });

        let templateGallery = $('#gallery').html();
 
        // compile it with Template7
        let compiledTemplateGallery = Template7.compile(templateGallery);
        
        let context = {
            galleryList,
            galleryPreviewList
        };

        let html = compiledTemplateGallery(context);

        $('body').append(html).addClass('modal-open');

        setTimeout(() => {
            $('.overlay').addClass('show');
        }, 100);

        let galleryNav = new Swiper(".gallery__nav", {
            spaceBetween: 10,
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
            initialSlide: currentIndex
        });

        let galleryMain = new Swiper(".gallery__main", {
            loop: true,
            lazy: true,
            navigation: {
                nextEl: '.gallery__main .swiper-arrow--next',
                prevEl: '.gallery__main .swiper-arrow--prev',
            },
            thumbs: {
                swiper: galleryNav,
            },
            initialSlide: currentIndex,
            keyboard: {
                enabled: true
            }
        });
    });

    // Modal
    $('[data-name="leave-review"]').on('click', function (e) {
        e.preventDefault();

        let templateModal = $('#form-review').html();
 
        // compile it with Template7
        let compiledTemplateModal = Template7.compile(templateModal);
        
        let html = compiledTemplateModal();

        $('body').append(html).addClass('modal-open');

        setTimeout(() => {
            $('.overlay').addClass('show');
        }, 100);

        setCustomSelect();
        setCustomTextarea();
    });

    $('[data-name="open-review"]').on('click', function (e) {
        e.preventDefault();

        let item = $(this).parent(),
            reviewIcon = item.find('.reviews__icon').prop('src'),
            reviewDate = item.find('.reviews__date').text(),
            reviewAuthor = item.find('.reviews__name').text(),
            reviewText = item.find('.reviews__text').html(),
            reviewNumber = item.find('.reviews__other :first-child').text(),
            reviewDoctor = item.find('.reviews__other .link').text();

        let items = $(this).parents('.reviews__list').find('.reviews__item'),
            reviewsItems = [];

        items.each(function (index, item) {
            reviewsItems.push($(item).html());
        });

        const reviewParams = {reviewIcon, reviewDate, reviewAuthor, reviewText, reviewNumber, reviewDoctor};

        let templateModal = $('#reivew').html();
 
        // compile it with Template7
        let compiledTemplateModal = Template7.compile(templateModal);

        let context = {
            reviewParams,
            reviewsItems
        };
        
        let html = compiledTemplateModal(context);

        $('body').append(html).addClass('modal-open');

        $('.review [data-name="open-review"]').remove();

        const modalSwiper = new Swiper('.review .reviews__inner', {
            navigation: {
                prevEl: '.review .swiper-arrow--prev',
                nextEl: '.review .swiper-arrow--next',
            }
        });

        setTimeout(() => {
            $('.overlay').addClass('show');
        }, 100);

        setCustomSelect();
        setCustomTextarea();
    });

    $('body').delegate('[class*="__close"], [data-name="modal-close"]', 'click', function (e) {
        e.preventDefault();

        $('.overlay > :first-child').remove();
        $('.overlay').removeClass('show');

        setTimeout(() => {
            $('.overlay').remove();
        }, 100);

        $('body').removeAttr('class');
    });

    // Review send
    $('body').delegate('[data-name="review-send"]', 'click', function (e) {
        e.preventDefault();

        let templateModal = $('#review-complete').html();
 
        // compile it with Template7
        let compiledTemplateModal = Template7.compile(templateModal);
        
        let html = compiledTemplateModal();

        $('.modal__content').empty().html(html);
    });

    // Search
    $('.search__input').on('keyup', function (e) {
        let inputValue = this.value;

        if(inputValue.length > 0) {
            $('.search__clear').show();
        }
        else {
            $('.search__clear').hide();
        }
    });

    $('.search__clear').on('click', function (e) {
        e.preventDefault();

        $('.search__input').val('');
        $('.search__clear').hide();
    });

    $('.search__btn').on('click', function (e) {
        e.preventDefault();

        let val = $('.search__input').val();

        if(val <= 0) {
            return false;
        }

        $('.search').addClass('search--finded');

        let template = $('#search-results').html();
 
        // compile it with Template7
        let compiledTemplate = Template7.compile(template);
        
        let html = compiledTemplate();

        $('.search__results').html(html);
    });

    // --- / Main

    // --- Global
    $('body').delegate('.btn-up', 'click', function (e) {
        e.preventDefault();

        $('html, body').animate({scrollTop: 0}, 350);
    });

    // Forms
    $('.form__input').on('keyup', function (e) {
        let self = $(this),
            v    = self.val();

        if(v.length > 0) {
            self.addClass('filled');
        }
        else {
            self.removeClass('filled');
        }
    });

    $('input[data-name="phone"]').inputmask({
        mask: '(999) 999-9999'
    });

    // Check filled inputs
    $('.form__input').each(function (index, item) {
        let self = $(item),
            v    = self.val();

            if(v.length > 0) {
                self.addClass('filled');
            }
            else {
                self.removeClass('filled');
            }
    });

    // Show all
    $('body').delegate('[data-name*="show-"]', 'click' , function (e) {
        e.preventDefault();

        let self = $(this),
            selfName = self.data('name'),
            parent = self.parent(),
            prevEl = self.prev(),
            name = parent[0].classList[0],
            items = '',
            answer = parent.find('.reviews__answer');

        if(selfName == 'show-all') {
            if(name != 'tabs__content') {
                items = parent.find('ul li');
            }
            else {
                items = parent.find('.list .list__item');
                
            }
    
            items.removeAttr('style');
            self.remove();
        }
        else {
            // Если это отзывы
            if(parent[0].classList[0] == 'reviews__item') {
                if(answer.is(':hidden')) {
                    parent.addClass('reviews__item--active');
                    self.text('Скрыть ответ от Class Clinic');
                }
                else {
                    parent.removeClass('reviews__item--active');
                    self.text('Читать ответ от Class Clinic');
                }
            }
            else {
                if(prevEl.is(':hidden') || prevEl.hasClass('d-none')) {
                    prevEl.removeClass('d-none').removeAttr('style');
                }
                
                self.remove();
            }
        }
    });

    // Accordeon
    $('.accordeon__head').on('click', function () {
        let accordeonItem = $(this).parent(),
            accordeonContent = accordeonItem.find('.accordeon__content');

        if(accordeonContent.length == 0) {
            return false;
        }

        if(accordeonContent.is(':hidden')) {
            accordeonItem.addClass('accordeon__item--active');
        }
        else {
            accordeonItem.removeClass('accordeon__item--active');
        }
        
        // Если нужно чтобы открывался только 1, а остальные закрывались, раскоментировать скрипт ниже

        // if($('.accordeon__item--active').length > 1) {
        //     $('.accordeon__item').removeClass('accordeon__item--active');
        //     accordeonItem.addClass('accordeon__item--active');
        // }
    });
    
    // --- Window
    $(window).on('resize', function (e) {
        headerHeight = $('.header').height();
        scrollPosOffset = headerHeight, headerOffset;

        if(window.innerWidth < 768) {
            headerOffset = 50;
        }
        else if(window.innerWidth < 992) {
            headerOffset = 60;
        }
        else {
            headerOffset = 80;
        }

        if(window.innerWidth > 991) {
            if(swipe.hasClass('swipe--opened')) {
                $('body').removeClass('swipe-open');
            }
        }
        else {
            if(swipe.hasClass('swipe--opened')) {
                $('body').addClass('swipe-open');
            }
        }

        setArticlesSliderLock();
    });

    $(window).on('scroll', function (e) {
        scrollPos = $(this).scrollTop();
        scrollPosOffset = headerHeight, headerOffset;
        
        if(btnUpFlag == 0) {
            $('body').append(btnUpTemplate);

            btnUpFlag = 1;
        }

        if(scrollPos >= scrollPosOffset) {
            $('.btn-up').addClass('animated');
        }
        else {
            $('.btn-up').removeClass('animated');
        }
    });
    // --- Window

    // --- Select
    const setCustomSelect = () => {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            width: '100%'
        });
    
        $('select').on("select2:open", function () {
            $('.select2-results__options').niceScroll({
                cursorcolor:		"#788E9B",
                cursorwidth: 		"4px",
                cursorborder:       '0 solid transparent',
                background: 		'#CDDBE2',
                cursorborderradius: '10px',
                cursorminheight:    50,
            });
        });
    }

    setCustomSelect();

    // --- / Select

    // --- / Global
    const setCustomTextarea = () => {
        $('.form__textarea-wrapper').niceScroll({
            cursorcolor:		"#788E9B",
            cursorwidth: 		"4px",
            cursorborder:       '0 solid transparent',
            background: 		'#CDDBE2',
            cursorborderradius: '10px',
            cursorminheight:    24,
        });
    
        $("textarea").each(function () {
            this.value = '';
    
            if(this.value.length > 0) {
                $('.form__textarea-wrapper').getNiceScroll().resize();
            }
            
            this.setAttribute("style", "height:" + (this.scrollHeight) + "px;");
        }).on("input", function () {
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + "px";
    
            $('.form__textarea-wrapper').getNiceScroll().resize();
        });
    }

    setCustomTextarea();
});