// makes sure the whole site is loaded



$(document).ready(function () {
  $('#loader').hide();
  // animation GSAP + ScrollMagic
  (function ($) {
    var controller = new ScrollMagic.Controller();

    /*
    Animationo SVG
    */

    //fonction : anime les img svg en debut de <section>
    function animateSvg(nameSvg, nameSection) {
      var svg = new TimelineLite();
      svg.from("#" + nameSvg, 0.5, {
          attr: {
            points: "0 0 ,100 0,100 0,50 0,0 0"
          },
          ease: Power4.easeOut
        })
        .from('#' + nameSection + ' h1, #' + nameSection + ' h2', 0.3, {
          autoAlpha: 0,
          y: '-100%',
          clearProps: 'all',
          ease: Elastic.easeOut
        }, 0.1);

      var scene = new ScrollMagic.Scene({
          triggerElement: "#" + nameSection,
          duration: 0
        })
        .setTween(svg)
        .addTo(controller);
    }
    //appelle aux fonction d'animation GSAP
    animateSvg('svgAbout', 'about');
    animateSvg('svgPortfolio', 'portfolio');
    animateSvg('svgContact', 'contact');



    /*
      MENU LI SCROOLL TO
      */

    //fonction : dectete les <section> lors du scroll
    function scrollHoverMenu(name, animation) {
      var scene = new ScrollMagic.Scene({
          triggerElement: name,
          duration: $(name).height()
        })
        .addTo(controller);
      scene.on("start", function (event) {
        if (event.scrollDirection == "FORWARD") {
          animation.play();
        } else {
          animation.reverse();
        }
      });
      scene.on("end", function (event) {
        if (event.scrollDirection == "FORWARD") {
          animation.timeScale(2);
          animation.reverse();
        } else {
          animation.timeScale(1);
          animation.play();
        }
      });
    }

    //ajoute un <span></span> a chaque lettre
    $('#menu a').each(function () {
      $(this).html($(this).text().replace(/(\w)/g, "<span>$&</span>"));
    });

    //differentte action par evenement: click, hover + Animation GSAP pour chaqu'un des liens
    $.each($("#menu a"), function (i, e) {

      //declartaion GSAP
      var t = new TimelineLite({
        paused: true
      });

      //Animation GSAP 
      t.staggerTo($(this).find('span'), 0.05, {
        color: '#18bc9c',
        borderBottom: '5px solid',
        x: 50
      }, 0.05);

      //ajout de l'animation dans l'objet e
      e.hoverAnimation = t;

      //evenement hover animation  #menu li a
      $(e).hover(
        function () {
          this.hoverAnimation.timeScale(1);
          this.hoverAnimation.play();
        },
        function () {
          if (!$(this).hasClass('active')) {
            this.hoverAnimation.timeScale(2);
            this.hoverAnimation.reverse();
          }
        });

      //evenement click animation  #menu li a
      $(e).click(
        function (event) {
          event.preventDefault();
          $('#menu a').each(function () {
            $(this).removeClass('active');
            this.hoverAnimation.reverse();
          })
          $(this).addClass('active');
          this.hoverAnimation.play();

          TweenLite.to(window, 1, {
            scrollTo: $(this).attr('href'),
            ease: Power2.easeOut
          });
        }
      )
      scrollHoverMenu($(this).attr('href'), this.hoverAnimation);
    });



    /*
    MENU MOBILE
    */

    //fonction : suprime tous les attr #menu li
    function removeStyle() {
      $('#menu li').removeAttr('style');
      $('#menu').removeAttr('style');
      $('#nav .row').removeAttr('style');
    }
    // fonction : ferme le menu pour menuMobile
    function existClick() {
      $('#menu a').click(
        function () {
          menuClose.reverse();
          menuMobile.reverse();
        });
    }


    //declaration scene GSAP 
    var menuClose = new TimelineLite({
      reversed: true,
      paused: true
    });

    //declaration scene GSAP 
    var menuMobile = new TimelineLite({
      paused: true,
      onComplete: existClick,
      onReverseComplete: removeStyle
    });

    //animation GSAP
    menuClose.to('#hamburger span:nth-child(2)', 0.5, {
        scale: 0
      })
      .to('#hamburger span:nth-child(1)', 0.5, {
        rotation: 45,
        y: 14,
        ease: Power2.easeOut
      }, 0)
      .to('#hamburger span:nth-child(3)', 0.5, {
        rotation: -45,
        y: -14,
        ease: Power2.easeOut
      }, 0);

    //animation GSAP
    menuMobile.to('#menu-mobile', 0, {
      display: 'block',
    }).to('#menu .row', 0, {
      display: 'block',
    }, 0).to('#menu-mobile', 0.5, {
      width: '100%',
      left: 0,
      ease: Power2.easeOut
    }).staggerTo('#menu li', 0.2, {
      marginLeft: 0,
      ease: Power2.easeOut,
    }, 0.1, 0.1);


    // evenement au click pour ouvrire le menuMobile ou le fermer
    $('#hamburger').click(function (event) {
      event.preventDefault();
      if (menuClose.reversed()) {
        menuClose.play();
        menuMobile.play();
      } else {
        menuClose.reverse();
        menuMobile.reverse();
      }
    });

    var hover = new TimelineLite({
      paused: true,
    });

    var click = new TimelineLite({
      paused: true,
    });
    var close = new TimelineLite({
      paused: true,
    });


    /*
    PORTFOLIO MODAL
    */

    $.each($(".open-modal"), function (i, e) {
      //declaration scene GSAP 
      var hover = new TimelineLite({
        paused: true,
      });

      var click = new TimelineLite({
        paused: true,
      });
      var close = new TimelineLite({
        paused: true,
      });
      close.to('.close span:nth-child(1)', 0.5, {
          rotation: 45,
          y: 14,
          ease: Power2.easeOut
        }, 0)
        .to('.close span:nth-child(2)', 0.5, {
          rotation: -45,
          y: -14,
          ease: Power2.easeOut
        }, 0);

      hover.to($(this).parent().parent(), 0.3, {
        boxShadow: ' rgb(255, 255, 255) 0px 0px 0px 15px;',

      }).to($(this), 0.3, {
        color: '#18bc9c',
        ease: Power2.easeOut
      }, 0).to($(this).find('span'), 0.3, {
        color: '#fff',
        ease: Power2.easeOut
      }, 0);

      click.to($(this).parent(), 0.4, {
          boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 200px inset, rgb(255, 255, 255) 0px 0px 0px 500px;',
          ease: Power2.easeIn
        }).to($(this), 0.4, {
          autoAlpha: 0,
          ease: Power2.easeOut
        }, 0).to('#nav', 0.4, {
          autoAlpha: 0,
          ease: Power2.easeOut
        }, 0).to($('#' + e.id + '-modal'), 0.2, {
          autoAlpha: 1,
          ease: Power2.easeIn
        }, 'modal')
        .to('.close span:nth-child(1)', 0.5, {
          rotation: 45,
          y: 7,
          ease: Power2.easeOut
        }, 'line')
        .to('.close span:nth-child(2)', 0.5, {
          rotation: -45,
          y: -7,
          ease: Power2.easeOut
        }, 'line').to($('body'), 0, {
          overflowY: 'hidden'
        }, 'modal');

      e.hoverAnimation = hover;
      e.clickAnimation = click;

      $($(this)).hover(function () {
        e.hoverAnimation.timeScale(1);
        e.hoverAnimation.play();
      }, function () {
        e.hoverAnimation.timeScale(2);
        e.hoverAnimation.reverse();
      });

      // evenement au click pour ouvrire le modal
      $($(this).parent()).click(function (event) {
        event.preventDefault();
        e.clickAnimation.timeScale(1);
        e.clickAnimation.play()
      });
      $('#' + e.id + '-modal .close').click(function (event) {
        event.preventDefault();
        e.clickAnimation.timeScale(2);
        e.clickAnimation.reverse();
      });
    });

    /*
    hover de section contact
    */

    $('#contact a').hover(function () {
      TweenLite.to('#contact a svg', 0.3, {
        fill: '#fff',
        scale: 1.5,
        ease: Power2.easeOut
      });
      //console.log('in');
    }, function () {
      TweenLite.to('#contact a svg', 0.3, {
        fill: '#2c3e50',
        scale: 1,
        ease: Power2.easeIn
      });
    });

    /*modal cv*/

    var cvHover = new TimelineLite({
      paused: true,
    });

    var cvClick = new TimelineLite({
      paused: true,
    });
    var cvClose = new TimelineLite({
      paused: true,
    });

    cvHover.to($('#cv').parent(), 0.3, {
      scale: 1.4,
    }).to('#cv', 0.3, {
      color: '#18bc9c',
      ease: Power2.easeOut
    }, 0);

    cvClick.to($('#cv').parent(), 0.3, {
        x: '-1500px',
      }).to('#cv-modal', 0, {
        display: 'block',
      }).to($('body'), 0, {
        overflowY: 'hidden'
      }, 'modal').to('#cv-modal', 0.5, {
        width: '100%',
        left: 0,
        ease: Power2.easeOut
      }).to('.close span:nth-child(1)', 0.5, {
        rotation: 45,
        y: 7,
        ease: Power2.easeOut
      }, 'line')
      .to('.close span:nth-child(2)', 0.5, {
        rotation: -45,
        y: -7,
        ease: Power2.easeOut
      }, 'line');

    $('#cv').parent().hover(function () {
      console.log('coucou');
      cvHover.timeScale(1);
      cvHover.play();
    }, function () {
      cvHover.timeScale(2);
      cvHover.reverse();
    });

    // evenement au click pour ouvrire le modal
    $('#cv').click(function (event) {
      event.preventDefault();
      cvClick.timeScale(1);
      cvClick.play()
    });
    $('#cv-modal .close').click(function (event) {
      event.preventDefault();
      cvClick.timeScale(2);
      cvClick.reverse();
    });

    var aboutAnimation = new TimelineLite();
    aboutAnimation.staggerFrom('#about p', 0.2, {
      scale:0
    },0.1).from('.cv-div',0.2,{
      scale:0
    },0);
    var sceneAbout = new ScrollMagic.Scene({
        triggerElement: "#about",
        duration: 0
      })
      .setTween(aboutAnimation)
      .addTo(controller);
  })(jQuery);

});