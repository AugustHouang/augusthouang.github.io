console.log('main.js loaded');
document.addEventListener('DOMContentLoaded', () => {
    initTabBlock();
    initPopup();
    initFAQ();
    initIngredient();
    initUgcSlider();
    initUgcVideo();
    initProductGallery();
    initProductQuantity();
});

function initTabBlock() {
    const tabThumbs = document.querySelectorAll('.tab-thumb');
    tabThumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            const tab = thumb.closest('.tab-block');
            const content = tab.querySelector('.tab-content');
            const img = tab.querySelector('.tab-thumb-image');
            const isOpen = tab.classList.contains('active');
            tab.classList.toggle('active');
            content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
            img.classList.toggle('-rotate-90', !isOpen);
        });
    });
}

function initPopup() {
    const openBtn = document.querySelector('.nutrition-infor');
    const openBtn1 = document.querySelector('.nutrition-infor1');
    const popup = document.querySelector('#shopify-section_popup .popup');
    const closeBtn = popup.querySelector('img.cursor-pointer');

    if (!popup) return;

    openBtn.addEventListener('click', function () {
        popup.classList.add('active');
        //document.body.style.overflow = 'hidden';
    });

    openBtn1.addEventListener('click', function () {
        popup.classList.add('active');
        // document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        popup.classList.remove('active');
        document.body.style.overflow = '';
    });

    popup.addEventListener('click', function () {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    });

    popup.querySelector('.relative').addEventListener('click', function (e) {
        e.stopPropagation();
    });
};


function initFAQ() {
    const faqThumbs = document.querySelectorAll('.faq-thumb');
    faqThumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            const faq = thumb.closest('.faq-title');
            const content = faq.querySelector('.faq-content');
            const icon = thumb.querySelector('svg');

            const isOpen = faq.classList.contains('active');

            faq.classList.toggle('active');
            content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
            icon.classList.toggle('rotate-180', !isOpen);
        });
    });
}

function initIngredient() {
    const ingredientThumbs = document.querySelectorAll('.ingredient-item-thumb');
    ingredientThumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            const item = thumb.closest('.ingredient-item');
            const content = item.querySelector('.ingredient-item-content');
            const icon = thumb.querySelector('.ingredient-item-thumb-icon');

            const isOpen = item.classList.contains('active');

            item.classList.toggle('active');
            content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
        });
    });
}

function initUgcSlider() {
    const slider = document.querySelector(".slick-slider");
    if (!slider) return;
    const track = slider.querySelector(".slick-track");
    const slides = slider.querySelectorAll(".slick-slide");
    const dots = slider.querySelectorAll(".slick-dot");
    const prevBtn = document.querySelector(".prev-button");
    const nextBtn = document.querySelector(".next-button");

    let ugcIndex = 0;
    function getSlideWidth() {
        return slides[0].offsetWidth;
    }
    function updateSlider(index) {
        const slideWidth = getSlideWidth();
        const sliderWidth = slider.querySelector(".slick-list").offsetWidth;
        const trackWidth = slideWidth * slides.length;
        let translateX = index * slideWidth;
        const maxTranslate = trackWidth - sliderWidth;
        if (translateX > maxTranslate) translateX = maxTranslate;
        if (translateX < 0) translateX = 0;
        track.style.transform = `translateX(-${translateX}px)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle("slick-active", i === index);
        });
    }

    nextBtn.addEventListener("click", () => {
        if (ugcIndex >= slides.length - 1) return;
        ugcIndex++;
        updateSlider(ugcIndex);
    });

    prevBtn.addEventListener("click", () => {
        if (ugcIndex <= 0) return;
        ugcIndex--;
        updateSlider(ugcIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            ugcIndex = index;
            updateSlider(ugcIndex);
        });
    });

    window.addEventListener("resize", () => updateSlider(ugcIndex));

    updateSlider(0);
}

function initUgcVideo() {
    document.querySelectorAll(".ugc-card").forEach(card => {
        const video = card.querySelector("video");
        const playIcon = card.querySelector(".ugc-play");

        card.addEventListener("click", () => {
            if (video.paused) {
                video.play();
                playIcon.style.display = "none";
            } else {
                video.pause();
                playIcon.style.display = "block";
            }
        });

        video.addEventListener("ended", () => {
            playIcon.style.display = "block";
        });
    });
}

function initProductGallery() {
    const mainTrack = document.querySelector(".slick-track-main");
    const mainSlides = Array.from(document.querySelectorAll(".slick-slide-main"));

    const thumbTrack = document.querySelector(".slick-track-thumb");
    const thumbSlides = Array.from(document.querySelectorAll(".slick-slide-thumb"));

    const prevBtn = document.querySelector(".slick-prev");
    const nextBtn = document.querySelector(".slick-next");

    if (!mainTrack || !thumbTrack || !mainSlides.length || !thumbSlides.length) return;

    const total = mainSlides.length;
    let index = 0;

    const mainWidth = () => mainSlides[0].offsetWidth;
    const thumbWidth = () => thumbSlides[0].offsetWidth;

    // set data-index cho thumb
    thumbSlides.forEach((thumb, i) => {
        thumb.dataset.index = i;
    });

    function update(activeIndex, instant = false) {
        if (instant) {
            mainTrack.style.transition = "none";
            thumbTrack.style.transition = "none";
        }

        requestAnimationFrame(() => {
            mainTrack.style.transform =
                `translate3d(${-activeIndex * mainWidth()}px,0,0)`;

            thumbTrack.style.transform =
                `translate3d(${-activeIndex * thumbWidth()}px,0,0)`;
        });

        if (instant) {
            requestAnimationFrame(() => {
                mainTrack.style.transition = "";
                thumbTrack.style.transition = "";
            });
        }

        thumbSlides.forEach(t =>
            t.classList.remove("slick-active", "slick-current")
        );
        thumbSlides[activeIndex]?.classList.add("slick-active", "slick-current");
    }

    /* NEXT */
    nextBtn?.addEventListener("click", () => {
        index = (index + 1) % total;
        update(index);
    });

    /* PREV */
    prevBtn?.addEventListener("click", () => {
        index = (index - 1 + total) % total;
        update(index);
    });

    /* CLICK THUMB */
    thumbSlides.forEach(thumb => {
        thumb.addEventListener("click", () => {
            index = +thumb.dataset.index;
            update(index);
        });
    });

    /* RESIZE */
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            update(index, true);
        }, 100);
    });

    update(0, true);
}


function initProductQuantity() {
    const options = document.querySelectorAll('[data-index]');

    options.forEach(option => {
        option.addEventListener('click', () => {

            options.forEach(item => item.classList.remove('active'));

            option.classList.add('active');

            const index = option.getAttribute('data-index');
            console.log('Selected option:', index);
        });
    });
}