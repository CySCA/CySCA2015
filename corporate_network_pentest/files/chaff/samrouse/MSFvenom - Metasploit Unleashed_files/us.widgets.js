/**
 * UpSolution Widget: g-alert
 */
(function ($) {
	"use strict";

	$.fn.gAlert = function(){
		return this.each(function(){
			var $this = $(this),
				$closer = $this.find('.g-alert-close');
			$closer.click(function(){
				$this.animate({height: 0, margin: 0}, 400, function(){
					$this.css('display', 'none');
					$us.canvas.$container.trigger('contentChange');
				});
			});
		});
	};

	$(function(){
		$('.g-alert').gAlert();
	});
})(jQuery);


/**
 * UpSolution Widget: w-lang
 */
(function($){
	"use strict";

	$.fn.wLang = function(){
		return this.each(function(){
			var $this = $(this),
				langList = $this.find('.w-lang-list'),
				currentLang = $this.find('.w-lang-current');
			if ($this.mod('layout') == 'dropdown'){
				var closeListEvent = function(e){
					if ($this.has(e.target).length === 0){
						langList.slideUp(200, function(){
							$this.removeClass('active');
						});
						$us.canvas.$window.off('mouseup touchstart mousewheel DOMMouseScroll touchstart', closeListEvent);
					}
				};
				langList.slideUp(0);
				currentLang.click(function() {
					$this.addClass('active');
					langList.slideDown(200);
					$us.canvas.$window.on('mouseup touchstart mousewheel DOMMouseScroll touchstart', closeListEvent);
				});
			}
		});
	};

	$(function(){
		$('.w-lang').wLang();
	});
})(jQuery);


/**
 * UpSolution Widget: w-search
 */
(function ($) {
	"use strict";

	$.fn.wSearch = function(){
		return this.each(function(){
			var $this = $(this),
				searchForm = $this.find('.w-search-form'),
				searchShow = $this.find('.w-search-show'),
				searchClose = $this.find('.w-search-close'),
				searchInput = searchForm.find('.w-search-input input');

			if (searchShow){
				searchShow.click(function(){
					searchForm.animate({top: '0px'}, 250, function(){
						searchInput.focus();
					});
				});
			}

			searchInput.keyup(function(e) {
				if (e.keyCode == 27) {
					searchForm.animate({top: '-100%'}, 250);
				}
			});

			if (searchClose) {
				searchClose.click(function(){
					searchForm.animate({top: '-100%'}, 250);
				});
			}
		});
	};

	$(function(){
		jQuery('.w-search').wSearch();
	});
})(jQuery);


/**
 * UpSolution Widget: w-tabs
 */
(function ($) {
	"use strict";

	$.fn.wTabs = function () {
		return this.each(function () {
			var tabs = $(this),
				items = tabs.find('.w-tabs-item'),
				sections = tabs.find('.w-tabs-section'),
				resizeTimer = null,
				itemsWidth = 0,
				running = false,
				firstActiveItem = tabs.find('.w-tabs-item.active').first(),
				firstActiveSection = tabs.find('.w-tabs-section.active').first();



			if ( ! tabs.hasClass('layout_accordion')) {
				if ( ! firstActiveItem.length) {
					firstActiveItem = tabs.find('.w-tabs-item').first();
					firstActiveSection = tabs.find('.w-tabs-section').first();
				}
			}

			if (firstActiveItem.length) {
				tabs.find('.w-tabs-item.active').removeClass('active');
				tabs.find('.w-tabs-section.active').removeClass('active');

				firstActiveItem.addClass('active');
				firstActiveSection.addClass('active');
			}

			items.each(function(){
				itemsWidth += $(this).outerWidth(true);
			});

			function tabs_resize(){
				if ( ! (tabs.hasClass('layout_accordion') && ! tabs.data('accordionLayoutDynamic'))) {
					if (itemsWidth > tabs.width()) {
						tabs.data('accordionLayoutDynamic', true);
						if ( ! tabs.hasClass('layout_accordion')) {
							tabs.addClass('layout_accordion');
						}
					} else {
						if (tabs.hasClass('layout_accordion')) {
							tabs.removeClass('layout_accordion');
						}
					}
				}
			}

			tabs_resize();

			$(window).resize(function(){
				window.clearTimeout(resizeTimer);
				resizeTimer = window.setTimeout(function(){
					tabs_resize();
				}, 50);

			});

			sections.each(function(index){
				var item = $(items[index]),
					section = $(sections[index]),
					section_title = section.find('.w-tabs-section-header'),
					section_content = section.find('.w-tabs-section-content');

				if (section.hasClass('active')) {
					section_content.slideDown();
				}

				section_title.click(function(){
					if (tabs.hasClass('type_toggle')) {
						if ( ! running) {
							if (section.hasClass('active')) {
								running = true;
								if (item) {
									item.removeClass('active');
								}
								section_content.slideUp(null, function(){
									section.removeClass('active');
									running = false;
								});
							} else {
								running = true;
								if (item) {
									item.addClass('active');
								}
								section_content.slideDown(null, function(){
									section.addClass('active');

									section.find('.w-map').each(function(map){
										var mapObj = jQuery(this).data('gMap.reference'),
											center = mapObj.getCenter();

										google.maps.event.trigger(jQuery(this)[0], 'resize');
										if (jQuery(this).data('gMap.infoWindows').length) {
											jQuery(this).data('gMap.infoWindows')[0].open(mapObj, jQuery(this).data('gMap.overlays')[0]);
										}
										mapObj.setCenter(center);
									});
									$us.canvas.$container.trigger('contentChange');

									running = false;
								});
							}
						}


					} else if (( ! section.hasClass('active')) && ( ! running)) {
						running = true;
						items.each(function(){
							if ($(this).hasClass('active')) {
								$(this).removeClass('active');
							}
						});
						if (item) {
							item.addClass('active');
						}

						sections.each(function(){
							if ($(this).hasClass('active')) {
								$(this).find('.w-tabs-section-content').slideUp();
							}
						});

						section_content.slideDown(null, function(){
							sections.each(function(){
								if ($(this).hasClass('active')) {
									$(this).removeClass('active');
								}
							});
							section.addClass('active');

							section.find('.w-map').each(function(map){
								var mapObj = jQuery(this).data('gMap.reference'),
									center = mapObj.getCenter();

								google.maps.event.trigger(jQuery(this)[0], 'resize');
								if (jQuery(this).data('gMap.infoWindows').length) {
									jQuery(this).data('gMap.infoWindows')[0].open(mapObj, jQuery(this).data('gMap.overlays')[0]);
								}
								mapObj.setCenter(center);
							});
							$us.canvas.$container.trigger('contentChange');

							if (tabs.hasClass('layout_accordion') && $us.canvas.winWidth < 768) {
								jQuery("html, body").animate({
									scrollTop: section.offset().top-(jQuery('.l-header').height())+"px"
								}, {
									duration: 1200,
									easing: "easeInOutQuint"
								});
							}

							running = false;
						});

					}
				});

				if (item){
					item.click(function(){
						section_title.click();
					});
				}
			});
		});
	};

	$(function(){
		jQuery('.w-tabs').wTabs();
	});
})(jQuery);


/**
 * UpSolution Widget: w-timeline
 */
(function ($) {
	"use strict";

	$.fn.wTimeline = function(){
		return this.each(function(){
			var timeline = $(this),
				items = timeline.find('.w-timeline-item'),
				itemsCount = items.length,
				$sections = timeline.find('.w-timeline-section'),
				running = false,
				sectionsWrapper = timeline.find('.w-timeline-sections'),
				sumWidth = 0,
				sectionsContainer = $('<div></div>', {id: 'section_container'}).css({position: 'relative'}),
				resizeTimer = null,
				sectionsPadding = $($sections[0]).innerWidth() - $($sections[0]).width(),
				activeIndex = 0,
				sectionsContainerPresent,
				firstActiveItem = timeline.find('.w-timeline-item.active').first(),
				firstActiveSection = timeline.find('.w-timeline-section.active').first();

			if ( ! firstActiveItem.length) {
				firstActiveItem = timeline.find('.w-timeline-item').first();
				firstActiveSection = timeline.find('.w-timeline-section').first();
			}

			timeline.find('.w-timeline-item.active').removeClass('active');
			timeline.find('.w-timeline-section.active').removeClass('active');

			firstActiveItem.addClass('active');
			firstActiveSection.addClass('active');

			$sections.each(function(sectionIndex, section) {
				if ($(section).hasClass('active')) {
					activeIndex = sectionIndex;
				}
			});

			$sections.css({display: 'block'});
			$(sectionsWrapper).css({position: 'relative'});

			function timeline_resize(){
				sectionsWrapper.css({width: timeline.innerWidth()-sectionsWrapper.css('border-left-width')-sectionsWrapper.css('border-right-width')+'px'});
				$sections.css({width: sectionsWrapper.innerWidth()-sectionsPadding+'px'});

				if ($us.canvas.winWidth < 768 && $us.canvas.responsive) {
					timeline.addClass('type_vertical');
					if (sectionsContainerPresent === true || sectionsContainerPresent === undefined ){
						sectionsWrapper.css({ height: 'auto', overflow: 'visible'});
						$sections.css('float', 'none');
						$sections.each(function(sectionIndex, section) {
							var section_content = $(section).find('.w-timeline-section-content');
							if (!$(section).hasClass('active')) {
								section_content.css('display', 'none');
							}
							sectionsWrapper.append(section);
						});
						sectionsContainer.remove();
						sectionsContainerPresent = false;
					}
				} else {
					timeline.removeClass('type_vertical');
					sectionsWrapper.css({height: $($sections[activeIndex]).outerHeight()+'px', overflow: 'hidden'});
					sumWidth = $sections.length*(sectionsWrapper.innerWidth());


					if (sectionsContainerPresent === false || sectionsContainerPresent === undefined){
						sectionsContainer = $('<div></div>', {id: 'section_container'}).css({position: 'relative'});
						$sections.css({float: 'left'});
						$sections.each(function(sectionIndex, section) {
							var section_content = $(section).find('.w-timeline-section-content');
							section_content.css({'display': 'block', 'height': 'auto'});
							sectionsContainer.append(section);
						});

						sectionsWrapper.append(sectionsContainer);
						sectionsContainerPresent = true;
					}

					if ($('body').hasClass('rtl')) {
						var rightPos = -(itemsCount-activeIndex-1)*(sectionsWrapper.innerWidth());
						sectionsContainer.css({width: sumWidth+'px', height: $($sections[activeIndex]).outerHeight()+'px', right: rightPos});
					} else {
						var leftPos = -activeIndex*(sectionsWrapper.innerWidth());
						sectionsContainer.css({width: sumWidth+'px', height: $($sections[activeIndex]).outerHeight()+'px', left: leftPos});
					}

				}
			}

			timeline_resize();

			$(window).resize(function(){
				window.clearTimeout(resizeTimer);
				resizeTimer = window.setTimeout(function(){
					timeline_resize();
				}, 50);

			});

			$sections.each(function(index, element){
				var section = $(element),
					item = $(items[index]),
					section_title = section.find('.w-timeline-section-title'),
					section_content = section.find('.w-timeline-section-content');

				if(item.length)
				{
					item.click(function(){
						if (( ! section.hasClass('active')) && ( ! running)) {
							running = true;
							items.each(function(){
								if ($(this).hasClass('active')) {
									$(this).removeClass('active');
								}
							});
							if (item.length) {
								item.addClass('active');
							}

							sectionsWrapper.animate({height: section.outerHeight()}, 300);
							var animateOptions = {};
							animateOptions['left'] = -index*(sectionsWrapper.innerWidth());
							if ($('body').hasClass('rtl')) {
								animateOptions['right'] = -(itemsCount-index-1)*(sectionsWrapper.innerWidth());
							}
							sectionsContainer.animate(animateOptions, 300, function(){
								$sections.each(function(){
									$(this).removeClass('active');
								});
								section.addClass('active');
								activeIndex = index;
								running = false;
							});

						}
					});
				}

				if(section_title.length)
				{
					section_title.click(function() {
						if (( ! section.hasClass('active')) && ( ! running)) {
							running = true;
							var currentHeight, newHeight;
							items.each(function(){
								$(this).removeClass('active');
							});
							if (item.length) {
								item.addClass('active');
							}
							$sections.each(function(){
								if ($(this).hasClass('active')) {
									currentHeight = $(this).find('.w-timeline-section-content').height();
									$(this).find('.w-timeline-section-content').slideUp();
								}
							});

							newHeight = section_content.height();

							section_content.slideDown(null, function(){
								$sections.each(function(){
									$(this).removeClass('active');
								});
								section.addClass('active');
								activeIndex = index;

								jQuery("html, body").animate({
									scrollTop: section.offset().top-(jQuery('.l-header').height())+"px"
								}, {
									duration: 1200,
									easing: "easeInOutQuint"
								});

								running = false;
							});

						}
					});
				}
			});
		});
	};

	$(function(){
		$('.w-timeline').wTimeline();
	});
})(jQuery);

