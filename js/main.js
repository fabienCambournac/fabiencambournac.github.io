$(document).ready(function () {
    window.sr = ScrollReveal({reset: true} );
sr.reveal('.foo');
sr.reveal('.bar', { duration: 200 });

    $(window).resize(function () {
        $('header').height($(window).height());

        $('header .container').css({
            'padding-top': ((($(window).height()) / 2) - $('header h1').height()) + 50

        });

    });
    $(window).load(function () {
        // au chargement complet de la page, la fonction resize() est appelée une fois pour initialiser le centrage.
        $(window).resize();

    });

    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('#navbar a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#navbar ul li a').removeClass("active");
            currLink.addClass("active");
        } else {
            currLink.removeClass("active");
        }
    });
}
