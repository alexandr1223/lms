window.addEventListener('DOMContentLoaded', () => {

    function Captcha() {
        // document.querySelector(".register__btn").addEventListener('click', (e) =>  {
        //     e.preventDefault();
        //     document.querySelector('.captcha').style.cssText = "display: block"
        // })
        let code;
        function createCaptcha() {
            document.getElementById('captcha').innerHTML = "";
            let charsArray =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
            const capthcaLength = 6;
            let captcha = [];
            for (let i = 0; i < capthcaLength; i++) {
                let index = Math.floor(Math.random() * charsArray.length + 1); 
                if (captcha.indexOf(charsArray[index]) == -1) {
                    captcha.push(charsArray[index]);
                } else{
                    i--;
                }
            }
            let canvas = document.createElement("canvas");
            canvas.id = "captcha";
            canvas.width = 130;
            canvas.height = 40;
            let context = canvas.getContext("2d");
            context.font = "30px Georgia";
            context.textAlign = "start";
            context.strokeText(captcha.join(""), 0, 30);
            var beginRandX = Math.floor(Math.random() * canvas.width);
            var beginRandY = Math.floor(Math.random() * canvas.height);
            var endRandX = Math.floor(Math.random() * canvas.width);
            var endRandY = Math.floor(Math.random() * canvas.height);
            context.beginPath();
            context.moveTo(beginRandX, beginRandY);
            context.lineTo(endRandX, endRandY);
            context.closePath();
            context.stroke();
            code = captcha.join("");
            document.getElementById("captcha").appendChild(canvas); 
        }
        document.querySelector('body').onload = createCaptcha();
        document.querySelector('.captcha__item input').addEventListener('input', function() {
            document.querySelector(".captcha__alert").style.cssText = "display: none";
            this.style.cssText = "border: 1px solid #c0c0c0"
        })
        document.querySelector('.captcha__btn').addEventListener('click', function(event) {
            event.preventDefault();
            if (document.querySelector(".captcha__text").value == code) {
                document.querySelector(".register__btn").removeAttribute("disabled")
            }else{
                document.querySelector(".captcha__alert").style.cssText = "display: block"
                document.querySelector(".captcha__item input").style.cssText = "border: 1px solid red"
                document.querySelector(".captcha__text").value = '';
                createCaptcha();
            }
        })
    }
    // Captcha();

    function CaptchaImage() {
        let square = document.querySelector('.cap__square'),
            pzl = document.querySelector('.cap__include');
        function validation() {
            square.style.position = 'absolute';
            square.style.zIndex = '1000';
            let block = document.querySelector('.cap')
           
            function moveAt(pageX, pageY) {
                
                document.querySelector('.cap__arrow').style.cssText = "display: block"
                document.querySelector('.cap__check').style.cssText = "display: none"
                document.querySelector('.cap__no').style.cssText = "display: none"
                let squarePos = pageX - block.getBoundingClientRect().left - square.clientWidth / 2,
                pazl = document.querySelector('.cap__include');
                if (squarePos > -1 && squarePos < 354) {
                    pazl.style.left = pageX - block.getBoundingClientRect().left - square.clientWidth / 2  + 'px';
                    square.style.left = pageX - block.getBoundingClientRect().left - square.clientWidth / 2  + 'px';
                    square.style.top = 311 + 'px';
                } else {
                    square.onmouseup = function() {
                        document.removeEventListener('mousemove', onMouseMove);
                        square.onmouseup = null;
                    };
                }
                if (squarePos > 5) {
                    document.querySelector('.cap__text').style.cssText = "opacity: 0"
                } else {
                    document.querySelector('.cap__text').style.cssText = "opacity: 1"
                }
                square.style.background = "#707ad6";
            }
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY)
            }
            
              // (3) перемещать по экрану
            document.addEventListener('mousemove', onMouseMove);
              // (4) положить мяч, удалить более ненужные обработчики событий
            document.body.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                
                let squarePos = square.getBoundingClientRect().left - block.getBoundingClientRect().left
                console.log(squarePos)
                if (squarePos > 151 && squarePos < 163) {
                    square.style.background = "#57b846";
                    document.querySelector('.cap__arrow').style.cssText = "display: none"
                    document.querySelector('.cap__check').style.cssText = "display: block"
                } else {
                    square.style.background = "#e53030";
                    document.querySelector('.cap__arrow').style.cssText = "display: none"
                    document.querySelector('.cap__no').style.cssText = "display: block"
                }
            };
            
        }
        square.onmousedown = validation;
        pzl.onmousedown = validation;
        square.ondragstart = function() {
            return false;
        }
        pzl.ondragstart = function() {
            return false;
        }
    }
    CaptchaImage();

(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.register__input').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);

    jQuery(function($){
        $("#tel").mask("+7(999) 999-9999");
    });

    $('img.img-svg').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
            var $svg = $(data).find('svg');
            if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;
      
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');
    
        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
      
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
      
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
      
        var $listItems = $list.children('li');
      
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });
      
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });
      
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    
    });
    
})