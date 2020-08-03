$(document).ready(function ()
{
    $("#uploadFiles").submit(function (e)
        {
            //Stops submit button from refreshing page.
            e.preventDefault();

            var form_data = new FormData(this);

            $.ajax({
                url: 'upload.php', //location of where you want to send image
                dataType: 'json', // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (response)
                    {
						window.location='editor.html';

                    },
                error: function ()
                    {
                        window.location='editor.html';

                    }
            });
        });
});

var zoom = 1;
    var canvas_width = 90;
    var canvas_height = 130;
	var border_factor = 2.5;


    var contrast = 0;
    var brightness = 0;
    var saturation = 0;
	var lightness = 0;
	var hue = 0;
    var min_zoom = 1;
	var px_per_cm = 0;
	var source_image = new Image();
	var base_image = new Image();
	


$(document).ready(function() {
	$('#fileToUpload').bind('change', function(){
		alert(this.files[0].size);
	})
	var currency_ratio = 1;
	var currency_round = 1;
	var currency_name = 'zł';
    var min_canvas_width = 20;
    var min_canvas_height = 20;
	var min_pixels_per_cm =  20;

	base_image.addEventListener('load', function() {
		return source_width_px = source_image.width,
		source_height_px = source_image.height;
	},false);
	source_image.src ='./uploads/uploadimage.jpg';

	var source_width_px = source_image.width;
    var source_height_px = source_image.height;
    var source_ratio = source_image.width/source_image.height;


    var max_canvas_width = 96;
    var max_canvas_height = 54;

         /*
    var min_resize_factor_width = 0.21;
    var min_resize_factor_height = 0.38;
    */



    var canvas_dimension_1 = 90;
    var canvas_dimension_2 = 40;





    //alert(canvas_width +' / '+canvas_height);



	var fotolia = false;
	




    $('#eff-sepia').click(function() {
        $('#eff-bw').removeClass('switch-checked');
	    $('#wizard-data input[name=effect]').val('sepia');
        refreshImage();
    });

	$('#extra-retouch').click(function() {
		if($('#wizard-data input[name=extra-retouch]').val()==0) $('#wizard-data input[name=extra-retouch]').val(1); else $('#wizard-data input[name=extra-retouch]').val(0);
		calcPrice();

	});

	$('#extra-werniks').click(function() {
		if($('#wizard-data input[name=extra-werniks]').val()==0) $('#wizard-data input[name=extra-werniks]').val(1); else $('#wizard-data input[name=extra-werniks]').val(0);
		calcPrice();
	});

    $('#eff-bw').click(function() {
        $('#eff-sepia').removeClass('switch-checked');
	    $('#wizard-data input[name=effect]').val('bw');
        refreshImage();
    });


			$('#cropper').draggable({containment:'parent', drag:function() {
			$('#crop-frame').css('left', (($('#cropper').position().left)+0-(1.5*px_per_cm*zoom))+'px');
			$('#crop-frame').css('top', (($('#cropper').position().top)+0-(1.5*px_per_cm*zoom))+'px');

			$('#wizard-data input[name=crop-x]').val(($(this).position().left/(px_per_cm*zoom)));
			$('#wizard-data input[name=crop-y]').val(($(this).position().top/(px_per_cm*zoom)));

					$('#wizard-data input[name=px_x]').val($('#cropper').position().left);
					$('#wizard-data input[name=px_y]').val($('#cropper').position().top);
			  //  $('#wizard-data input[name=crop-x]').val(($(this).position().left/step_w*2));
			  //  $('#wizard-data input[name=crop-y]').val(($(this).position().top/step_h*2));
			}
		});

	


    window.refreshImage = function(mode) {


        var img=Pixastic.process(base_image, "brightness", {brightness:brightness,contrast:contrast});
        tmp_sat=saturation;
        if($('select[name=color]').val()=='bw') {
            $( "#slider-saturation, #slider-hue" ).slider({ disabled: true });
            $( "#slider-saturation, #slider-hue" ).prev().css('opacity', '0.3');
            tmp_sat=-100;
        } else {
            $( "#slider-saturation, #slider-hue" ).slider({ disabled: false });
            $( "#slider-saturation, #slider-hue" ).prev().css('opacity', '1');
        }
        img=Pixastic.process(img, "hsl", {hue:hue,saturation:tmp_sat,lightness:lightness});
        if($('select[name=color]').val()=='sepia') {
            img=Pixastic.process(img, "sepia", {mode:1});
        }



        context.drawImage(img, 0, 0, canvas.width, canvas.height);

    }




    // init canvas;
	//alert($('#wizard').width());

	$('#wizard_outer').css('width', ($('.wizard-container').width()-30)+'px');

    $('#wizard').css({'width':Math.ceil($('.wizard-container').width()-30)+'px'});
	//alert($('#wizard').width()/parseFloat(source_ratio.toPrecision(12)));


	$('#wizard').css({'height':Math.ceil($('#wizard').width()/source_ratio)+'px'});
	//, 'height':($('.wizard-container').width()/source_ratio)+'px'});

    if($('#wizard').height()>($(window).height()-60)) {
        $('#wizard').css({'height':Math.ceil($(window).height()-60)+'px', 'width':Math.ceil(($(window).height()-60)*source_ratio)+'px'});
    }

    if($('#wizard').width()>($(window).width()-30)) {
        $('#wizard').css({'width':Math.ceil($(window).width()-30)+'px', 'height':Math.ceil(($(window).width()-30)/source_ratio)+'px'});

    }
	if($('#wizard').width()!=$('#wizard_outer').width()) {
		$('#wizard_outer').css('width', $('#wizard').width()+'px');
	}


    var canvas = document.getElementById('wizard');
    canvas.width=$('#wizard').width();
    canvas.height=$('#wizard').height();

	$('input[name=prev_w]').val(canvas.width);
	$('input[name=prev_h]').val(canvas.height);
    var context = canvas.getContext('2d');


		base_image.src = './uploads/uploadimage.jpg';
	    base_image.onload = function(){
        refreshImage();
		$('#sprawdzanie').css('display','none');
	
		reloadDimensions();
		$('[name=canvas_finish]').trigger('change');

		$('select[name=canvas]').trigger('change');
		$('select[name=canvas_width]').trigger('change');
		$('select[name=canvas_height]').trigger('change');
		$('select[name=color]').trigger('change');
		    }
	var tmp=0;

    function recalc() {
        zoom=1;
        calcPrice();


		px_per_cm = (canvas.width-0.0)/(parseInt(canvas_width)+(border_factor*2));
		min_zoom = (min_pixels_per_cm * (parseInt(canvas_width)+(border_factor*2))) / source_width_px;


		//alert(zoom);
		tst_w = px_per_cm * (parseInt(canvas_width)+(border_factor*2));
		tst_h = px_per_cm * (parseInt(canvas_height)+(border_factor*2));




		if(tst_h>canvas.height-0.0) {
			px_per_cm = (canvas.height-0.0)/(parseInt(canvas_height)+(border_factor*2));
			min_zoom = min_pixels_per_cm * (parseInt(canvas_height)+(border_factor*2)) / source_height_px;
		    //zoom = 30 * (parseInt(canvas_width)+(border_factor*2)) / source_width_px;
		}
		// alert(zoom);

        //alert($('#wizard_inner').width()-$('#cropper').width());


    	$( "#slider-zoom" ).slider({'max':min_zoom*1000*-1, 'min':1000*-1, 'value':1000*-1, slide: function(event, ui) {
    	       zoom = ui.value/1000*-1;
               $('input[name=zoom]').val(ui.value/1000*-1);
    	       //$('h2.side-title').html(zoom);
    	       refreshCropper();
    	    }, stop: function(event, ui) {
    	       zoom = ui.value/1000*-1;
				calcPrice();
		    }
    	});




    }


    function calcPrice() {

        A=canvas_width;
        B=canvas_height;
		fotolia_val=0;
		//alert('aa');
		if(fotolia) {
			//alert(border_factor);
			original_needed_width=(canvas_width / (zoom));
			original_needed_height=(canvas_height / (zoom));
			original_needed_width_px = original_needed_width*min_pixels_per_cm;
			original_needed_height_px = original_needed_height*min_pixels_per_cm;
			//alert(max_canvas_width +' / '+ max_canvas_height);
			for(var x in licenses) {

				if((licenses[x].width>=original_needed_width_px) && (licenses[x].height>=original_needed_height_px)) {

					fotolia_val=4*licenses[x].price;
					//$('h4.con-option').first().html("Fotolia: "+fotolia_val+'zł / C:'+(fotolia_val/4)+" / "+licenses[x].license_name);
					$('.fotolia-licence').html('('+licenses[x].license_name+')');
					$('.fotolia-price').html(number_format(Math.ceil((fotolia_val)/currency_ratio/currency_round)*currency_round, 2, '.', ' ')+' '+currency_name);
					break;
				}
			}
		}
		extra_val=0;
		if($('input[name=extra-retouch]').val()=='1') {
			//alert('x');
			extra_val=extra_val+10;
		}
		werniks_val=0;
		if($('input[name=extra-werniks]').val()=='1') {
			//alert('x');

			//alert((parseInt(A)+8)*(parseInt(B)+8)*0.004);
			var werniks_val=((parseInt(A)+8)*(parseInt(B)+8)*0.004);
			if(werniks_val<10) werniks_val=10;

			//alert(extra_val);
		}
        border_val=0;
		if($('input[name=finish]').val()=='3') {
            border_val=0.5*(parseInt(A)+parseInt(B));
        }

		canvas_factor=0;
		if($('input[name=canvas]').val()=='a') canvas_factor=0.0049;
		if($('input[name=canvas]').val()=='p') canvas_factor=0.0079;
		if($('input[name=canvas]').val()=='b') canvas_factor=0.0099;

        // rama = 20 zł / mb.

		if($('input[name=finish]').val()==4) {
			price = Math.ceil((((canvas_factor*(parseInt(A)+8)*(parseInt(B)+8))))/currency_ratio/currency_round)*currency_round;
		} else {
			price = Math.ceil((((canvas_factor*(parseInt(A)+8)*(parseInt(B)+8))+(0.2*(parseInt(A)+parseInt(B))+4)))/currency_ratio/currency_round)*currency_round;
		}

        //(canvas_factor*(parseInt(A)+8)*(parseInt(B)+8)) + 0.2*(A+B) + 4
        price = price+Math.ceil((fotolia_val)/currency_ratio/currency_round)*currency_round;
        price = price+Math.ceil((werniks_val)/currency_ratio/currency_round)*currency_round;
        price = price+Math.ceil((border_val)/currency_ratio/currency_round)*currency_round;
        price = price+Math.ceil((extra_val)/currency_ratio/currency_round)*currency_round;

        price =   number_format(price, 2, '.', ' ')+' '+currency_name;


        $('.side-price span.main-price').html(price);
    }


	window.reloadDimensions = function () {
		//alert('teraz');

		max_canvas_width = (source_width_px/min_pixels_per_cm)-(border_factor*2);
		max_canvas_height = (source_height_px/min_pixels_per_cm)-(border_factor*2);
		$('select[name=canvas_width]').html('');
		$('select[name=canvas_height]').html('');


		//alert(max_canvas_width);
		//alert(max_canvas_height);

		max_w=Math.floor(max_canvas_width/5)*5;
		max_h=Math.floor(max_canvas_height/5)*5;



		if(max_w>200) max_w=200;
		if(max_h>200) max_h=200;

		if(canvas_width>100) max_h=100;
		if(canvas_height>100) max_w=100;


        if(max_canvas_width<canvas_width) {
            canvas_width= Math.floor(max_canvas_width/10)*10;
        }
        if(max_canvas_height<canvas_height) {
            canvas_height= Math.floor(max_canvas_height/10)*10;
        }
        //alert(max_canvas_width+ ' / '+canvas_width);
//alert('a');
		for(var i=min_canvas_width; i<=max_w; i=i+10) {
			xtra='';
			xtra2='';

			if(i==canvas_width) xtra=' selected="selected"';
			$('[name=canvas_width]').append('<option value="'+i+'"'+xtra+'>'+i+' cm</option>');

			if(i==40 && max_w>=45) {
				if(45==canvas_width) xtra2=' selected="selected"';
				$('[name=canvas_width]').append('<option value="45"'+xtra2+'>45 cm</option>');
			}

			if(i==70 && max_w>=75) {
				if(75==canvas_width) xtra2=' selected="selected"';
				$('[name=canvas_width]').append('<option value="75"'+xtra2+'>75 cm</option>');
			}

		}

		$('[name=canvas_width]').trigger('change');

		for(var i=min_canvas_height; i<=max_h; i=i+10) {
			xtra='';
			xtra2='';
			if(i==canvas_height) xtra=' selected="selected"';
			$('[name=canvas_height]').append('<option value="'+i+'"'+xtra+'>'+i+' cm</option>');
			if(i==40 && max_h>=45) {
				if(45==canvas_height) xtra2=' selected="selected"';
				$('[name=canvas_height]').append('<option value="45"'+xtra2+'>45 cm</option>');
			}

			if(i==70 && max_h>=75) {
				if(75==canvas_height) xtra2=' selected="selected"';
				$('[name=canvas_height]').append('<option value="75"'+xtra2+'>75 cm</option>');
			}

		}
		$('[name=canvas_height]').trigger('change');
		//alert(max_w+' / '+max_h);

/*
		$('[name=canvas_width]').html('');
		max_w=Math.floor(max_canvas_width/10)*10;
		if(max_w>200) max_w=200;

		max_w_inc=max_w;

		//prop_h=max_w


		for(var i=min_canvas_width; i<=max_w_inc; i=i+10) {
			xtra='';
			if(i==canvas_width) xtra=' selected="selected"';
			$('[name=canvas_width]').append('<option value="'+i+'"'+xtra+'>'+i+' cm</option>');
		}
		//$('[name=canvas_width]').prev('span').html($('[name=canvas_width]').val()+' cm');
		$('[name=canvas_width]').trigger('change');

		$('[name=canvas_height]').html('');
		max_h=Math.floor(max_canvas_height/10)*10;
		if(max_h>100) max_h=100;
		for(var i=min_canvas_height; i<=max_h; i=i+10) {
			xtra='';
			if(i==canvas_height) xtra=' selected="selected"';
			$('[name=canvas_height]').append('<option value="'+i+'"'+xtra+'>'+i+' cm</option>');
		}
		//$('[name=canvas_height]').prev('span').html($('[name=canvas_height]').val()+' cm');
		$('[name=canvas_height]').trigger('change');

		*/
	}


	window.refreshCropper = function() {

        $('#cropper').css('width', Math.ceil((parseInt(canvas_width)+(border_factor*2))*px_per_cm*zoom)+'px');
        $('#cropper').css('height', Math.ceil((parseInt(canvas_height)+(border_factor*2))*px_per_cm*zoom)+'px');
        $('#cropper').css('left', (((canvas.width-0.0)-$('#cropper').width())/2+'px'));
        $('#cropper').css('top', (((canvas.height-0.0)-$('#cropper').height())/2+'px'));

		$('#wizard-data input[name=px_w]').val(Math.ceil((parseInt(canvas_width)+(border_factor*2))*px_per_cm*zoom));
		$('#wizard-data input[name=px_h]').val(Math.ceil((parseInt(canvas_height)+(border_factor*2))*px_per_cm*zoom));
		$('#wizard-data input[name=px_x]').val(((canvas.width-0.0)-$('#cropper').width())/2);
		$('#wizard-data input[name=px_y]').val(((canvas.height-0.0)-$('#cropper').height())/2);

		$('#crop-borders').css('border-width', (((border_factor))*px_per_cm*zoom)+'px');
		$('#wizard-data input[name=px_b]').val(((border_factor))*px_per_cm*zoom);

	    $('#crop-frame').css('width', ($('#cropper').width()+(3*px_per_cm*zoom))+'px');
	    $('#crop-frame').css('height', ($('#cropper').height()+(3*px_per_cm*zoom))+'px');
        $('#crop-frame').css('left', (($('#cropper').position().left)+0.00-(1.5*px_per_cm*zoom))+'px');
        $('#crop-frame').css('top', (($('#cropper').position().top)+0.00-(1.5*px_per_cm*zoom))+'px');

		$('#crop-frame').css('border-width', (2*px_per_cm*zoom)+'px');

        $('#wizard-data input[name=crop-x]').val(($('#cropper').position().left/(px_per_cm*zoom)));
        $('#wizard-data input[name=crop-y]').val(($('#cropper').position().top/(px_per_cm*zoom)));

		    $('#crop-frame').draggable({containment: [$('#wizard_inner').offset().left-(1.5*px_per_cm*zoom), $('#wizard_inner').offset().top-(1.5*px_per_cm*zoom),   $('#wizard_inner').offset().left-(1.5*px_per_cm*zoom)+($('#wizard_inner').width()-$('#cropper').width())     , $('#wizard_inner').offset().top-(1.5*px_per_cm*zoom)+($('#wizard_inner').height()-$('#cropper').height())],
            drag:function() {
                x=(($('#crop-frame').offset().left)- $('#wizard_inner').offset().left + (1.5*px_per_cm*zoom));
                y=(($('#crop-frame').offset().top)- $('#wizard_inner').offset().top + (1.5*px_per_cm*zoom));
                $('#cropper').css('left', x+'px');
                $('#cropper').css('top', y+'px');

				$('#wizard-data input[name=crop-x]').val(($('#cropper').position().left/(px_per_cm*zoom)));
				$('#wizard-data input[name=crop-y]').val(($('#cropper').position().top/(px_per_cm*zoom)));


				$('#wizard-data input[name=px_x]').val($('#cropper').position().left);
				$('#wizard-data input[name=px_y]').val($('#cropper').position().top);
                //$('#crop-frame').css('left', (($('#cropper').position().left)+30-(1.5*px_per_cm*zoom))+'px');
                //$('#crop-frame').css('top', (($('#cropper').position().top)+30-(1.5*px_per_cm*zoom))+'px');

          //  $('#wizard-data input[name=crop-x]').val(($(this).position().left/step_w*2));
          //  $('#wizard-data input[name=crop-y]').val(($(this).position().top/step_h*2));
		    }
        });

	
    }



	$( "#slider-hue" ).slider({'min':-100, 'max':100, 'value':0, 'step': 10, stop: function(event, ui) {
	       hue=ui.value/10;
	       $('#wizard-data input[name=hue]').val(hue);
	       refreshImage();
	   }
	});

	$( "#slider-saturation" ).slider({'min':-100, 'max':100, 'value':0, 'step': 10, stop: function(event, ui) {
	       saturation=ui.value/10;
	       $('#wizard-data input[name=saturation]').val(saturation);
	       refreshImage();
	   }
	});
	/*
	$( "#slider-lightness" ).slider({'min':-100, 'max':100, 'value':0, 'step': 10, stop: function(event, ui) {
	       lightness=ui.value/10;
	       $('#wizard-data input[name=lightness]').val(lightness);
	       refreshImage();
	   }
	});
	*/


	$( "#slider-kontrast" ).slider({'min':-50, 'max':50, 'value':0, 'step':5, stop: function(event, ui) {
	       contrast=ui.value/100;
	       $('#wizard-data input[name=contrast]').val(contrast);
	       refreshImage();
	   }
	});


	$( "#slider-jasnosc" ).slider({'min':-30, 'max':30, 'value':0, 'step':3,stop: function(event, ui) {
	       brightness=ui.value;
	       $('#wizard-data input[name=brightness]').val(brightness);
	       refreshImage();
	   }
	});
    /*

	$( "#slider-nasycenie" ).slider({'min':-100, 'max':100, 'value':0, stop: function(event, ui) {
	       saturation=ui.value;
	       $('#wizard-data input[name=saturation]').val(saturation);
	       refreshImage();
	   }
	});

	*/



    // scroll to canvas
	if($('#wizard').offset().top+$('#wizard').height()>$(window).height()) {
		$('html, body').animate({

			scrollTop:($('#wizard').offset().top-30)
		}, 500, function() {

		});
	}



	$('body').on('change', '[name=canvas_width]', function() {

	   //alert($(this).parent().html());
        canvas_width=$(this).val();
        //alert(canvas_width);
        $('input[name=canvas-width]').val(canvas_width);
    });

	$('body').on('change', '[name=canvas_height]', function() {
        canvas_height=$(this).val();
				//alert(canvas_height);
        $('input[name=canvas-height]').val(canvas_height);
    });

	$('body').on('change', '[name=canvas_width], [name=canvas_height]', function() {
        $(this).prev('span').html($(this).val()+' cm');


		max_canvas_width = (source_width_px/min_pixels_per_cm)-(border_factor*2);
		max_canvas_height = (source_height_px/min_pixels_per_cm)-(border_factor*2);
		//alert(max_canvas_width+' x '+max_canvas_height);
		$('select[name=canvas_width]').html('');
		$('select[name=canvas_height]').html('');

		max_w=Math.floor(max_canvas_width/5)*5;
		max_h=Math.floor(max_canvas_height/5)*5;

		if(max_w>200) max_w=200;
		if(max_h>200) max_h=200;

		if(canvas_width>100 && max_h>100) max_h=100;
		if(canvas_height>100 && max_w>100) max_w=100;



		for(var i=min_canvas_width; i<=max_w; i=i+10) {
			xtra='';
			if(i==canvas_width) xtra=' selected="selected"';
			$('[name=canvas_width]').append('<option value="'+i+'"'+xtra+'>'+i+' cm</option>');

			if(i==40 && max_w>=45) {
				if(45==canvas_width) xtra=' selected="selected"';
				$('[name=canvas_width]').append('<option value="45"'+xtra+'>45 cm</option>');
			}

			if(i==70 && max_w>=75) {
				if(75==canvas_width) xtra=' selected="selected"';
				$('[name=canvas_width]').append('<option value="75"'+xtra+'>75 cm</option>');
			}

		}

		for(var i=min_canvas_height; i<=max_h; i=i+10) {
			xtra='';
			if(i==canvas_height) xtra=' selected="selected"';
			$('[name=canvas_height]').append('<option value="'+i+'"'+xtra+'>'+i+' cm</option>');

			if(i==40 && max_h>=45) {
				if(45==canvas_height) xtra=' selected="selected"';
				$('[name=canvas_height]').append('<option value="45"'+xtra+'>45 cm</option>');
			}

			if(i==70 && max_h>=75) {
				if(75==canvas_height) xtra=' selected="selected"';
				$('[name=canvas_height]').append('<option value="75"'+xtra+'>75 cm</option>');
			}
		}

        //reloadDimensions();

        recalc();
        refreshCropper();
		//alert('xx');
    });


	$('[name=canvas_finish]').change(function() {
		$('#crop-frame').css('display','none');
		$('#frame-selector').css('display', 'none');
		$('#crop-borders').css('border-color','red');
		if($(this).val()==0) border_factor=0.1;
		if($(this).val()==1) border_factor=0;
		if($(this).val()==2) border_factor=0;
		if($(this).val()==3) {
			border_factor=0.1;
			$('#crop-frame').css('display','block');
		    $('#crop-borders').css('border-color','none');
            $('#frame-selector').toggle('fast');

		}
		if($(this).val()==4) border_factor=0;
        $(this).prev('span').html($('[name=canvas_finish] option:selected').text());
        $('#wizard-data [name=finish]').val($(this).val());
		reloadDimensions();

        recalc();
        refreshCropper();

	});

	$('select[name=canvas]').change(function() {
		//alert($(this).val());
        $(this).prev('span').html($('select[name=canvas] option:selected').text());
		$('#wizard-data [name=canvas]').val($(this).val());
		calcPrice();
	});

	$('select[name=color]').change(function() {
        $(this).prev('span').html($('select[name=color] option:selected').text());
		$('#wizard-data [name=color]').val($(this).val());
		refreshImage();
	});



    $('.add-to-cart').click(function() {
		overlay_show();
		$('#wizard-data input[name=raw-data]').val(canvas.toDataURL('image/jpeg', 60));
					$('#wizard-data [name=paycard]').val($('input[name=_paycard]').val());
			$('#wizard-data [name=email]').val($('input[name=_email]').val());
		        $('#wizard-data').submit();
        //
        /*
        $.post('/scripts/cart.php', $('#wizard-data').serialize(), function(data) {
            alert(data);
        });
        */
        return false;

    });

	$('a.order-next-button').click(function() {
		//$('form#wizard-data').attr('action', '/scripts/cart.php?back='+$(this).data('from'));
		$('input[name=backto]').val($(this).data('from'));
		$('a.add-to-cart').trigger('click');
		return false;

	});

	$('a.select-frame').click(function() {
		$.colorbox({'href':'#frame-select', 'inline':true, 'width':'50%'});
		return false;
	});

	$('a.frame-sel').click(function() {
		//alert($(this).data('image'));
		$('a.frame-sel').removeClass('sel');
		$('#crop-frame').css('border-image-source', 'url('+$(this).data('image')+')');
		$('#wizard-data [name=frame]').val($(this).data('frame'));
		$(this).addClass('sel');
		//$.colorbox.close();

	});


	//$('[name=color]').trigger('change');

});