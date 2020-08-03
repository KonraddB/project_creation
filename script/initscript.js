
function overlay_show() {
    $('#full-overlay').css('display','block').animate({'opacity':1}, 200);
}

function overlay_hide() {
    $('#full-overlay').animate({'opacity':0}, 200, function() {
		$('#full-overlay').css('display','none');
	});
}


function number_format(number, decimals, dec_point, thousands_sep) {

  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}


$(document).ready(function() {

    $('body').on('click', '.instagram-select', function() {
        overlay_show();    
        $.get('/scripts/instagram.php?action=select&id='+$(this).data('id'), function(data) {
            if(data!='OK') {
                alert(data);
				overlay_hide();						
            } else {
                overlay_hide();
                window.location='/dostosuj';
            }
                    
        });
        return false;    
    });
    
    $('a.fotolia-select').click(function() {
        overlay_show();
        $.get('/scripts/fotolia.php?action=select&id='+$(this).data('id'), function(data) {
            if(data!='OK') {
                alert(data);
				overlay_hide();						
            } else {
                overlay_hide();            
                window.location='/dostosuj';
            }
                    
        });
        return false;    
    });
    
    $('a.facebook-select').click(function() {
        overlay_show();
        
       
        $.get('/scripts/fb.php?action=select&id='+$(this).data('id'), function(data) {
            if(data!='OK') {
                alert(data);
				overlay_hide();						
            } else {
                overlay_hide();            
                window.location='/dostosuj';
            }
                    
        });
        
        return false;    
    });    
	
	$('a.mz-remove').click(function() {
		overlay_show();
        $.get('/scripts/my-photos.php?action=remove&id='+$(this).data('id'), function(data) {
            if(data!='OK') {
                alert(data);
				overlay_hide();						
            } else {
                overlay_hide();            
				location.reload();
            }
                    
        });		
	});
	
	
    $('a.mz-select').click(function() {
        overlay_show();    
        $.get('/scripts/my-photos.php?action=select&id='+$(this).data('id'), function(data) {
            if(data!='OK') {
                alert(data);
				overlay_hide();				
            } else {
                overlay_hide();            
                window.location='/dostosuj';
            }
                    
        });
        return false;    
    });	
    
    
    $('.radio-option').click(function() {
        $('.radio-option[data-name='+$(this).data('name')+']').removeClass('radio-checked'); 
        $(this).addClass('radio-checked'); 
		$('input[name='+$(this).data('name')+']').val($(this).attr('value'));
    });


    $('.switch-option').click(function() {
        if($(this).hasClass('switch-checked')) {
            $(this).removeClass('switch-checked');
        } else {
            $(this).addClass('switch-checked');        
        } 
    });



    $('.d-but').hover(function() {
        $(this).parent().find('.d-info').html($(this).data('text'));    
    }, function() {
        $(this).parent().find('.d-info').html('');      
    });


	$('.colorbox').colorbox();
	
	if($('ul#langMenu').length>0) {
		$('ul#langMenu').css('left', ($('#cur-lang').offset().left-$('ul#langMenu').width()+$('#cur-lang').width())+'px');
	}

	$('#cur-lang').click(function() {
		$('ul#langMenu').toggle();
		$('ul#langMenu').focus();
		return false;
	});
	
	$('body').click(function(e) {
		$('ul#langMenu').css('display', 'none');

	});
	
$("[data-tooltip]").mouseover(function (e)
{
     var $target = $(e.target);
     //if(!$target.is('select')){
		//alert('a');
		$('.option-tooltip').html($target.data('tooltip'));
		$('.option-tooltip').css({'display': 'block', 'right':($(window).width()-$target.offset().left+5)+'px', 'top':$target.offset().top});
		//document.title = $target.offset().top;
	//}
});

$("[data-tooltip]").mouseout(function (e)
{
     var $target = $(e.target);
     //if(!$target.is('select')){
		$('.option-tooltip').css({'display': 'none'});
	 //}
});

$(document).ready(function() {
    $('body').css('padding-top', $('#top-bar').height()+'px');
});

$(window).resize(function() {
    $('body').css('padding-top', $('#top-bar').height()+'px');
});	


	
	
});