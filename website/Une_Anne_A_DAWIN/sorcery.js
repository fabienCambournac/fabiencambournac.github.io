$(function () {
    var buttons = $(".section button");
    var note = 10;
    startGame();

    buttons.click(function () {
        var attributNote = $(this).attr('note');
        var attributGo = $(this).attr('go');
        var attributId = $(this).parents('div').attr('id');
        gotoSection(attributGo, attributId, attributNote);
        loseWin();

        NoteFinal(getNote());
    });

    //Amorcage du defilement des sections
    function startGame() {
        NoteFinal(getNote());
        $('.section').not($('#intro')).hide();
        $('#img').hide();
    }

    function getNote() {
        return note;
    }

    function setNote(param) {
        note = param;
    }
    //affiche Note
    function afficheNote() {
        $('.note span').html(getNote() + '/20');
    }

    //affiche Point
    function affichePoint(point) {
        $('.point span').html(point);
    }
    /**
     Défilement des sections et appelle de 2 fonctions activeEffet(),evolutionNote(), 
     qui s'enclenche a la fin des effets de transitions;
     **/
    function gotoSection(go, id, point) {
        $('#img').fadeIn(600);
        $('.section:not(#' + id + ')').hide();
        $('#' + id).fadeOut(200, 'swing',
                function () {
                    $('#' + go).fadeIn(400, 'linear');
                    activeEffet(go);
                    evolutionNote(point);
                });
    }
    
    //Active des effets sur les sections et appelle la fonction animation()
    function activeEffet(go) {
        switch (go) {
            case "J-1":
            setNote(10);
            break
            case "nonPrepare":
                animation(go);
                $('#son')[0].play();
                $('html').css("background-image", "url(css/images/classe.jpg)");
                break
            default:
                affichePoint('');
                $('html').css("background-image", "url(css/images/fond.jpg)");
        }
    }
    
    //Gere l'evolution de la note grace a des point en plus ou en moin
    function evolutionNote(point) {
        switch (point) {
            case "+1":
                setNote(getNote() + 1);
                affichePoint('+1 point');
                break
            case"-1":
                setNote(getNote() - 1);
                affichePoint('-1 point');
                break
            case"-3":
                setNote(getNote() - 3);
                affichePoint('-3 point');
                break
            case"+3":
                setNote(getNote() + 3);
                affichePoint('+3 point');
                break
        }
    }

    //Animation wizz
    function animation(id) {
        $('#' + id).animate({left: "+=5px"}, 40).animate({top: "+=5px"}, 40)
                .animate({top: "-=10px"}, 40).animate({left: "-=10px"}, 40)
                .animate({top: "+=5px"}, 40).animate({left: "+=5px"}, 40)
                .animate({left: "+=5px"}, 40).animate({top: "+=5px"}, 40)
                .animate({top: "-=10px"}, 40).animate({left: "-=10px"}, 40)
                .animate({top: "+=5px"}, 40).animate({left: "+=5px"}, 40);
    }



    //Evite de depasser la note de 20 et la note de 0
    function loseWin() {
        if (getNote() <= 0) {
            setNote(0);
        } else if (getNote() >= 20) {
            setNote(20);
        }
    }

    //Afiche note final avec son commentaire
    function NoteFinal(NoteFinal) {
        afficheNote();
        if (NoteFinal <= 5) {
            $('.commentaire span').html("T'es foutu");
        }
        else if (NoteFinal > 5 && NoteFinal < 10) {
            $('.commentaire span').html("Tu n'as pas eu ta licence, travaille plus!");
        }
        else if (NoteFinal >= 10 && NoteFinal < 16) {
            $('.commentaire span').html('Pas mal! Tu as eu ta licence. ');
        }
        else if (NoteFinal >= 20) {
            $('.commentaire span').html('Bravo, tu as eu ta licence haut la main!');
        }
    }

//effet au survol sourie
    $('button').hover(
            function () {
                $(this).stop().animate({opacity: '.75'});
            },
            function () {
                $(this).stop().animate({opacity: '1'});
            }
    );
});