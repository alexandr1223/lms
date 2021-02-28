window.addEventListener('DOMContentLoaded', () => {

    function Captcha() {
        document.querySelector(".register__btn").addEventListener('click', (e) =>  {
            e.preventDefault();
            document.querySelector('.captcha').style.cssText = "display: block"
        })
        let code;
        function createCaptcha() {
            //clear the contents of captcha div first 
            document.getElementById('captcha').innerHTML = "";
            let charsArray =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
            const capthcaLength = 6;
            let captcha = [];
            for (let i = 0; i < capthcaLength; i++) {
                let index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
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
            //storing captcha so that can validate you can save it somewhere else according to your specific requirements
            code = captcha.join("");
            document.getElementById("captcha").appendChild(canvas); // adds the canvas to the body element
        }
        document.querySelector('body').onload = createCaptcha();
        document.querySelector('.captcha__btn').addEventListener('click', function(event) {
            event.preventDefault();
            if (document.querySelector(".captcha__text").value == code) {
                alert("Valid Captcha")
            }else{
                alert("Invalid Captcha. try Again");
                document.querySelector(".captcha__text").value = '';
                createCaptcha();
            }
        })
    }
    Captcha();

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