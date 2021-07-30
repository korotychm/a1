$( document ).ready(function() {
    if ($(".questions__preview").length){
      $(".questions__preview").each(function(){

				$(this).find(".questions__preview-in").wrap("<div></div>");
				var height = $(this).innerHeight();

				$(this).find(".questions__preview-in").css("height", height);
				$(this).children("div").css("height", height);
				$(this).css("height", height );

			});
    }
});

$('.questions__preview-item').on("click", function(){
  $('.questions__btn-toggle').trigger('click');
});

$('.questions__btn-toggle').on("click", function(){

		var $this = $(this),
			 currentTitle = $this.find("span").text(),
			 dataTitle = $this.attr("data-toggle-title");

		$this.find("span").text(dataTitle);
		$this.attr("data-toggle-title", currentTitle);

		$this.toggleClass("active");

		if (!$this.parent().next().hasClass("active")){
  			$this.parent().next().next().children("div").css("height", "1px");

  			setTimeout(function(){
  				$this.parent().next().toggleClass("active");
  				$this.parent().next().slick('setPosition');
  				$this.parent().next().next().addClass("fadeOut");
  			}, 600);

  			setTimeout(function(){
  				$this.parent().next().next().toggleClass("hidden");
  			}, 700);

		} else {

			$this.parent().next().toggleClass("active");
			$this.parent().next().next().removeClass("fadeOut");

			setTimeout(function(){
				$this.parent().next().next().children("div").css("height", $this.parent().next().next().height());
			}, 600);


			setTimeout(function(){
				$this.parent().next().next().toggleClass("hidden");
			}, 300);

		}

});


if ($('.accordions-carousel').length > 0){

  function blog_carousel_init(){
    $('.accordions-carousel').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      adaptiveHeight: true
    });
  }

  if ($(window).width()<768){
    $('.accordion').unwrap();
  }

  blog_carousel_init();

    var timeout3 = false;
    var rtime3;
    var delta3 = 200;

    $(window).resize(function(){
      rtime3 = new Date();
      if (timeout3 === false) {
          timeout3 = true;
          setTimeout(resizeBlog, delta3);
      }
    });

    function resizeBlog() {
      if (new Date() - rtime3 < delta3) {
          setTimeout(resizeBlog, delta3);
      } else {
          timeout3 = false;
          if (($(window).width()<768)&&($('.accordions__slide').length > 0)){
            $('.accordions-carousel').slick('destroy');
            $('.accordion').unwrap();
            blog_carousel_init();
          }
          if (($(window).width()>767)&&($('.accordions__slide').length == 0)){
            $('.accordions-carousel').slick('destroy');
            $('.accordion').wrapAll("<div></div>");
            rewrapElements('.accordion','accordions__slide',3);
            blog_carousel_init();
          }
      }
    }
}
