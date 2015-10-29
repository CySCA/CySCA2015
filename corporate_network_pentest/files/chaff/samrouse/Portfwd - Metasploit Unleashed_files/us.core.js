/**
 * UpSolution Theme Core JavaScript Code
 *
 * @requires jQuery
 */
if (window.$us === undefined) window.$us = {};

/**
 * Retrieve/set/erase dom modificator class <mod>_<value> for UpSolution CSS Framework
 * @param {String} mod Modificator namespace
 * @param {String} [value] Value
 * @returns {string|jQuery}
 */
jQuery.fn.mod = function(mod, value){
	if (this.length == 0) return this;
	// Remove class modificator
	if (value === false){
		this.get(0).className = this.get(0).className.replace(new RegExp('(^| )'+mod+'\_[a-z0-9]+( |$)'), '$2');
		return this;
	}
	var pcre = new RegExp('^.*?'+mod+'\_([a-z0-9]+).*?$'),
		arr;
	// Retrieve modificator
	if (value === undefined){
		return (arr = pcre.exec(this.get(0).className)) ? arr[1] : false;
	}
	// Set modificator
	else {
		this.mod(mod, false).get(0).className += ' '+mod+'_'+value;
		return this;
	}
};

/**
 * Function.bind: simple function for defining scopes for functions called from events
 */
Function.prototype.bind = function(scope){
	var self = this;
	return function(){
		return self.apply(scope, arguments);
	};
};

// Fixing hovers for devices with both mouse and touch screen
jQuery.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
jQuery('html').toggleClass('no-touch', ! jQuery.isMobile);

/**
 * $us.canvas
 *
 * All the needed data and functions to work with overall canvas.
 */
!function($){
	"use strict";

	function USCanvas(options){

		// Setting options
		var defaults = {
			headerDisableStickyHeaderWidth: 1023,
			headerDisableAnimationWidth: 1023,
			headerMainHeight: 120,
			headerMainShrinkedHeight: 60,
			headerExtraHeight: 36,
			firstSubmainPadding: 0,
			responsive: true
		};
		this.options = $.extend({}, defaults, options || {});

		// Commonly used dom elements
		this.$window = $(window);
		this.$container = $('.l-canvas');
		this.$html = $('html');
		this.$body = $('.l-body');
		this.$htmlBody = $('html, body');
		this.$header = $('.l-header');
		this.$subheaderTop = $('.l-subheader.at_top');
		this.$subheaderMiddle = $('.l-subheader.at_middle');
		this.$main = $('.l-main');
		this.$topLink = $('.w-toplink');
		this.$sections = $('.l-submain');
		this.$firstSection = this.$sections.first();
		this.$fullscreenSections = this.$sections.filter('.full_screen');

		// Canvas modificators
		this.headerLayout = this.$container.mod('headerlayout');
		this.headerPos = this.$container.mod('headerpos');
		this.headerBg = this.$container.mod('headerbg');
		this.rtl = this.$body.hasClass('rtl');

		if (this.options.firstSubmainPadding !== 0 && this.headerPos == 'fixed'){
			this.$firstSection.css('padding-top', this.options.firstSubmainPadding+'px');
		}

		// Scroll-driven logics
		this.scroll = function(){
			var scrollTop = parseInt(this.$window.scrollTop());

			// Show/hide go to top link
			this.$topLink.toggleClass('active', (scrollTop >= this.winHeight));

			// Fixed header behaviour
			if (this.headerPos == 'fixed'){
				var topHeaderHeight,
					middleHeaderHeight;

				if (this.headerBg == 'transparent'){
					var transparent = (scrollTop == 0 && this.winWidth > this.options.headerDisableStickyHeaderWidth);
					if (transparent && (this.headerLayout == 'advanced' || this.headerLayout == 'centered') && this.winWidth < 900) transparent = false;
					this.$header.toggleClass('transparent', transparent);
				}

				// Sticky header state
				if (scrollTop > 0 && this.winWidth > this.options.headerDisableStickyHeaderWidth){
					this.$header.addClass('sticky');

					if (this.headerLayout == 'extended'){
						var headerMainDiff = this.options.headerMainHeight - this.options.headerMainShrinkedHeight;
						if (scrollTop >= headerMainDiff){
							topHeaderHeight = Math.max(this.options.headerExtraHeight+headerMainDiff-scrollTop, 0);
							this.$subheaderTop.css({height: topHeaderHeight+'px', overflow: 'hidden'});
						} else {
							this.$subheaderTop.css({height: this.options.headerExtraHeight+'px', overflow: ''});
						}

						middleHeaderHeight = Math.max(Math.round(this.options.headerMainHeight-scrollTop), this.options.headerMainShrinkedHeight);
						this.$subheaderMiddle.css('line-height', middleHeaderHeight+'px');

					}
					else if (this.headerLayout == 'advanced' || this.headerLayout == 'centered'){
						middleHeaderHeight = Math.max(Math.round(this.options.headerMainHeight-scrollTop), 0);
						this.$subheaderMiddle.css({height: middleHeaderHeight+'px', lineHeight: middleHeaderHeight+'px'});
					}
					else if (this.headerLayout == 'standard'){
						middleHeaderHeight = Math.max(Math.round(this.options.headerMainHeight-scrollTop), this.options.headerMainShrinkedHeight);
						this.$subheaderMiddle.css('line-height', middleHeaderHeight+'px');
					}
				}
				// Static header state
				else {
					this.$header.removeClass('sticky');

					this.$subheaderTop.css({height: this.options.headerExtraHeight+'px', 'overflow': ''});
					this.$subheaderMiddle.css({height: '', lineHeight: this.options.headerMainHeight+'px'});
				}
			}
		};
		var scrollEvent = this.scroll.bind(this);
		this.$window.on('scroll', scrollEvent);

		// Resize-driven logics
		this.resize = function(){
			// Window dimensions
			this.winHeight = parseInt(this.$window.height());
			this.winWidth = parseInt(this.$window.width());

			// Header height for scrolled state
			if (this.winWidth <= 479){
				this.headerHeight = 50;
			}
			else if (480 <= this.winWidth && this.winWidth <= 899){
				this.headerHeight = 80;
			}
			else /*if (900 <= this.winWidth)*/{
				if (this.headerLayout == 'standard' || this.headerLayout == 'extended'){
					this.headerHeight = this.options.headerMainShrinkedHeight;
				}
				else {
					this.headerHeight = this.options.headerExtraHeight;
				}
			}

			// Offset that header creates in a main canvas
			this.headerSticky = (this.headerPos == 'fixed' && this.winWidth > this.options.headerDisableStickyHeaderWidth);
			this.headerOffset = this.headerSticky ? this.headerHeight : 0;

			var scrollTop = parseInt(this.$window.scrollTop());
			if (this.headerPos == 'fixed'){
				this.$header.toggleClass('no_fixed', ! this.headerSticky);
			}
			if (this.headerBg == 'transparent'){
				var transparent = (scrollTop == 0 && this.winWidth > this.options.headerDisableStickyHeaderWidth);
				if (transparent && (this.headerLayout == 'advanced' || this.headerLayout == 'centered') && this.winWidth < 900) transparent = false;
				this.$header.toggleClass('transparent', transparent);
			}

			// Disabling animation on mobile devices
			this.$body.toggleClass('disable_animation', (this.winWidth <= this.options.headerDisableAnimationWidth));

			// Updating fullscreen sections
			if (this.$fullscreenSections.length > 0){
				var actualHeaderHeight = this.$header.height();
				this.$fullscreenSections.each(function(index, section){
					var $section = $(section),
						sectionHeight = this.winHeight,
						sectionIsFirst = (index == 0),
						// Needed only for the first section
						sectionTopOffset;

					// First section
					if (sectionIsFirst) {
						sectionTopOffset = $section.offset().top;
						sectionHeight -= sectionTopOffset;
					}
					// 2+ sections
					else {
						sectionHeight -= this.headerOffset;
					}
					$section.css('min-height', sectionHeight);
					if ($section.hasClass('valign_center')) {
						var sectionH = $section.find('.l-submain-h'),
							sectionTopPadding = parseInt($section.css('padding-top')),
							contentHeight,
							topMargin;
						sectionH.css('margin-top', '');
						contentHeight = sectionH.outerHeight();
						topMargin = Math.max(0, (sectionHeight - contentHeight) / 2 - sectionTopPadding);
						// Header overlays canvas, but is not visible
						if (sectionIsFirst && this.headerBg != 'transparent'){
							topMargin += Math.max(0, (actualHeaderHeight - sectionTopOffset) / 2);
						}
						if (topMargin > 0){
							sectionH.css('margin-top', topMargin);
						}
					}
					$section.find('.upb_row_bg').css('min-height', $section.height());
				}.bind(this));
				this.$container.trigger('contentChange');
			}

			// Fix scroll glitches that could occur after the resize
			this.scroll();
		};
		var resizeEvent = this.resize.bind(this);
		this.$window
			.on('resize', resizeEvent)
			.on('load', resizeEvent);
		this.resize();
	}

	$(function(){
		$us.canvas = new USCanvas($us.canvasOptions || {});
	});

}(jQuery);

/**
 * $us.nav
 *
 * Header navigation will all the possible states
 *
 * @requires $us.canvas
 */
!function($){

	function USNav(options){

		var self = this;

		// Setting options
		var defaults = {
			togglable: false
		};
		this.options = $.extend({}, defaults, options || {});

		// Commonly used dom elements
		this.$headerNav = $('.l-header .w-nav:first');
		this.$navControl = this.$headerNav.find('.w-nav-control');
		this.$navItems = this.$headerNav.find('.w-nav-item');
		this.$navList = this.$headerNav.find('.w-nav-list.level_1');
		this.$navSubItems = this.$navList.find('.w-nav-item.menu-item-has-children');
		this.$navSubAnchors = this.$navList.find('.w-nav-item.menu-item-has-children > .w-nav-anchor');
		this.$navSubLists = this.$navList.find('.w-nav-item.menu-item-has-children > .w-nav-list');
		this.$navAnchors = this.$headerNav.find('.w-nav-anchor');

		// In case the nav doesn't exist, do nothing
		if (this.$headerNav.length == 0) return;

		this.isMobile = (this.$headerNav.mod('type') == 'mobile');
		this.mobileOpened = false;
		this.animationType = this.$headerNav.mod('animation');

		// Count proper dimensions
		this.setFixedMobileMaxHeight = function(){
			if ($us.canvas.winWidth > $us.canvas.options.headerDisableStickyHeaderWidth){
				var headerOuterHeight = $us.canvas.$header.outerHeight(),
					navListOuterHeight = Math.min(this.$navList.outerHeight(), headerOuterHeight),
					menuOffset = headerOuterHeight - navListOuterHeight;
				this.$navList.css('max-height', $us.canvas.winHeight-menuOffset+'px');
			}
			else{
				this.$navList.css('max-height', 'auto');
			}
		};
		if ( ! this.isMobile){
			this.$headerNav.mod('type', 'desktop');
			this.$navList.css('display', 'block');
		}
		// Mobile menu toggler
		this.$navControl.on('click', function(){
			self.mobileOpened = ! self.mobileOpened;
			if (self.mobileOpened){
				// Closing opened sublists
				self.$navItems.filter('.opened').removeClass('opened');
				self.$navSubLists.css('height', 0);

				self.$navList.slideDownCSS();
			}
			else{
				self.$navList.slideUpCSS();
			}
			if ($us.canvas.headerPos == 'fixed') self.setFixedMobileMaxHeight();
		});
		// Mobile submenu togglers
		var toggleEvent = function(e){
			if ( ! self.isMobile) return;
			e.stopPropagation();
			e.preventDefault();
			var $item = $(this).closest('.w-nav-item'),
				$sublist = $item.children('.w-nav-list');
			if ($item.hasClass('opened')){
				$item.removeClass('opened');
				$sublist.slideUpCSS();
			}
			else {
				$item.addClass('opened');
				$sublist.slideDownCSS();
			}
		};
		// Toggle on item clicks
		if (this.options.togglable){
			this.$navSubAnchors.on('click', toggleEvent);
		}
		// Toggle on arrows
		else {
			this.$navList.find('.w-nav-item.menu-item-has-children > .w-nav-anchor > .w-nav-arrow').on('click', toggleEvent);
		}
		// Mark all the togglable items
		this.$navSubItems.each(function(){
			var $this = $(this),
				$parentItem = $this.parent().closest('.w-nav-item');
			if ($parentItem.length == 0 || $parentItem.mod('columns') === false) $this.addClass('togglable');
		});
		// Touch device handling in default (notouch) layout
		if ( ! $us.canvas.$html.hasClass('no-touch')){
			this.$navList.find('.w-nav-item.menu-item-has-children.togglable > .w-nav-anchor').on('click', function(e){
				if (self.isMobile) return;
				e.preventDefault();
				var $this = $(this),
					$item = $this.parent(),
					$list = $item.children('.w-nav-list');

				// Second tap: going to the URL
				if ($item.hasClass('opened')) return location.assign($this.attr('href'));

				if (self.animationType == 'height'){
					$list.slideDownCSS();
				}
				else if (self.animationType == 'mdesign'){
					$list.showMD();
				}
				else /*if (self.animationType == 'opacity')*/{
					$list.fadeInCSS();
				}
				$item.addClass('opened');
				var outsideClickEvent = function(e){
					if (jQuery.contains($item[0], e.target)) return;
					$item.removeClass('opened');
					if (self.animationType == 'height'){
						$list.slideUpCSS();
					}
					else if (self.animationType == 'mdesign'){
						$list.hideMD();
					}
					else /*if (self.animationType == 'opacity')*/{
						$list.fadeOutCSS();
					}
					$us.canvas.$body.off('touchstart', outsideClickEvent);
				};

				$us.canvas.$body.on('touchstart', outsideClickEvent);
			});
		}
		// Desktop device hovers
		else {
			self.$navSubItems
				.filter('.togglable')
				.on('mouseenter', function(){
					if (self.isMobile) return;
					var $list = jQuery(this).children('.w-nav-list');
					if (self.animationType == 'height'){
						$list.slideDownCSS();
					}
					else if (self.animationType == 'mdesign'){
						$list.showMD();
					}
					else /*if (self.animationType == 'opacity')*/{
						$list.fadeInCSS();
					}
				})
				.on('mouseleave', function(){
					if (self.isMobile) return;
					var $list = jQuery(this).children('.w-nav-list');
					if (self.animationType == 'height'){
						$list.slideUpCSS();
					}
					else if (self.animationType == 'mdesign'){
						$list.hideMD();
					}
					else /*if (self.animationType == 'opacity')*/{
						$list.fadeOutCSS();
					}
				});
		}
		// Close menu on anchor clicks
		this.$navAnchors.on('click', function(){
			if ($us.canvas.winWidth > self.options.mobileWidth) return;
			// Toggled the item
			if (self.options.togglable && jQuery(this).closest('.w-nav-item').hasClass('menu-item-has-children')) return;
			self.$navList.slideUpCSS();
			self.mobileOpened = false;
		});

		/**
		 * Resize handler
		 */
		this.resize = function(){
			// Mobile layout
			if ($us.canvas.winWidth <= this.options.mobileWidth){

				// Switching from desktop to mobile layout
				if ( ! this.isMobile){
					this.isMobile = true;
					this.mobileOpened = false;
					this.$navList.css('height', 0);

					// Closing opened sublists
					this.$navItems.filter('.opened').removeClass('opened');
					this.$navSubLists.css('height', 0);

					this.$headerNav.mod('type', 'mobile');
				}

				// Max-height limitation for fixed header layouts
				if ($us.canvas.headerPos == 'fixed') this.setFixedMobileMaxHeight();
			}

			// Switching from mobile to desktop layout
			else if (this.isMobile){
				this.$headerNav.mod('type', 'desktop');

				// Clearing height-hiders
				this.$navList.css({height: '', maxHeight: '', display: 'block', opacity: 1});

				// Closing opened sublists
				this.$navItems.removeClass('opened')
					.filter('.togglable').children('.w-nav-list').css('display', 'none');
				this.$navSubLists.css('height', '');

				this.isMobile = false;
				this.mobileOpened = false;
			}
		};
		this.resize();

		var resizeEvent = this.resize.bind(this);
		$us.canvas.$window.on('resize', resizeEvent);
	}

	$(function(){
		$us.nav = new USNav($us.navOptions || {});
	});

}(jQuery);


/**
 * $us.scroll
 *
 * ScrollSpy, Smooth scroll links and hash-based scrolling all-in-one
 *
 * @requires $us.canvas
 */
!function($){
	"use strict";

	function USScroll(options){

		// Setting options
		var defaults = {
			/**
			 * @param {String|jQuery} Selector or object of hash scroll anchors that should be attached on init
			 */
			attachOnInit: 'a[href*="#"]',
			/**
			 * @param {String} Classname that will be toggled on relevant buttons
			 */
			buttonActiveClass: 'active',
			/**
			 * @param {String} Classname that will be toggled on relevant menu items
			 */
			menuItemActiveClass: 'current-menu-item',
			/**
			 * @param {String} Classname that will be toggled on relevant menu ancestors
			 */
			menuItemAncestorActiveClass: 'current-menu-ancestor',
			/**
			 * @param {Number} Duration of scroll animation
			 */
			animationDuration: 1200,
			/**
			 * @param {String} Easing for scroll animation
			 */
			animationEasing: 'easeInOutQuint'
		};
		this.options = $.extend({}, defaults, options || {});

		// Commonly used dom elements
		this.$window = $(window);
		this.$htmlBody = $('html, body');

		// Location pattern to check absolute URLs for current location
		var locationPattern = new RegExp('^'+location.pathname.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")+'#');

		// Hash blocks with targets and activity indicators
		this.blocks = {};

		/**
		 * Count hash's target position and store it properly
		 *
		 * @param {String} hash
		 * @private
		 */
		this._countPosition = function(hash){
			this.blocks[hash].top = Math.ceil(this.blocks[hash].target.offset().top - $us.canvas.headerOffset - this._canvasTopOffset);
			this.blocks[hash].bottom = this.blocks[hash].top + this.blocks[hash].target.outerHeight(false);
		};

		/**
		 * Count all targets' positions for proper scrolling
		 *
		 * @private
		 */
		this._countAllPositions = function(){
			// Take into account #wpadminbar (and others possible) offset
			this._canvasTopOffset = $us.canvas.$container.offset().top;
			for (var hash in this.blocks){
				if ( ! this.blocks.hasOwnProperty(hash)) continue;
				this._countPosition(hash);
			}
		};

		/**
		 * Indicate scroll position by hash
		 *
		 * @param {String} activeHash
		 * @private
		 */
		this._indicatePosition = function(activeHash){
			var activeMenuAncestors = [];
			for (var hash in this.blocks){
				if ( ! this.blocks.hasOwnProperty(hash)) continue;
				if (this.blocks[hash].buttons !== undefined){
					this.blocks[hash].buttons.toggleClass(this.options.buttonActiveClass, hash === activeHash);
				}
				if (this.blocks[hash].menuItems !== undefined){
					this.blocks[hash].menuItems.toggleClass(this.options.menuItemActiveClass, hash === activeHash);
				}
				if (this.blocks[hash].menuAncestors !== undefined){
					this.blocks[hash].menuAncestors.removeClass(this.options.menuItemAncestorActiveClass);
				}
			}
			if (this.blocks[activeHash] !== undefined && this.blocks[activeHash].menuAncestors !== undefined){
				this.blocks[activeHash].menuAncestors.addClass(this.options.menuItemAncestorActiveClass);
			}
		};

		/**
		 * Attach anchors so their targets will be listened for possible scrolls
		 *
		 * @param {String|jQuery} anchors Selector or list of anchors to attach
		 */
		this.attach = function(anchors){
			var $anchors = $(anchors);
			if ($anchors.length == 0) return;
			$anchors.each(function(index, anchor){
				var $anchor = $(anchor),
					href = $anchor.attr('href'),
					hash = $anchor.prop('hash');
				// Ignoring ajax links
				if (hash.indexOf('#!') != -1) return;
				// Checking if the hash is connected with the current page
				if ( ! (
						// Link type: #something
					href.charAt(0) == '#' ||
						// Link type: /#something
					(href.charAt(0) == '/' && locationPattern.test(href)) ||
						// Link type: http://example.com/some/path/#something
					href.indexOf(location.host+location.pathname+'#') > -1
					)) return;
				// Do we have an actual target, for which we'll need to count geometry?
				if (hash != '' && hash != '#'){
					// Attach target
					if (this.blocks[hash] === undefined){
						var $target = $(hash);
						// Don't attach anchors that actually have no target
						if ($target.length == 0) return;
						// If it's the only row in a submain, than use submain instead
						if ($target.hasClass('g-cols') && $target.parent().children().length == 1){
							$target = $target.closest('.l-submain');
						}
						this.blocks[hash] = {
							target: $target
						};
						this._countPosition(hash);
					}
					// Attach activity indicator
					if ($anchor.hasClass('w-nav-anchor')){
						var $menuIndicator = $anchor.closest('.w-nav-item');
						this.blocks[hash].menuItems = (this.blocks[hash].menuItems || $()).add($menuIndicator);
						var $menuAncestors = $menuIndicator.parents('.menu-item-has-children');
						if ($menuAncestors.length > 0){
							this.blocks[hash].menuAncestors = (this.blocks[hash].menuAncestors || $()).add($menuAncestors);
						}
					}
					else {
						this.blocks[hash].buttons = (this.blocks[hash].buttons || $()).add($anchor);
					}
				}
				$anchor.on('click', function(event){
					event.preventDefault();
					this.scrollTo(hash, true);
				}.bind(this));
			}.bind(this));
		};

		/**
		 * Scroll page to a certain position or hash
		 *
		 * @param {Number|String|jQuery} place
		 * @param {Boolean} animate
		 */
		this.scrollTo = function(place, animate){
			var placeType,
				newY;
			// Scroll to top
			if (place == '' || place == '#'){
				newY = 0;
				placeType = 'top';
			}
			// Scroll by hash
			else if (this.blocks[place] !== undefined){
				newY = this.blocks[place].top;
				placeType = 'hash';
			}
			else if ($target instanceof $){
				newY = Math.floor($target.offset().top - $us.canvas.headerOffset - this._canvasTopOffset);
				placeType = 'element';
			}
			var indicateActive = function(){
				if (placeType == 'hash'){
					this._indicatePosition(place);
				}
				else {
					this.scroll();
				}
			}.bind(this);
			if (animate){
				this.$window.off('scroll', scrollEvent);
				this.$htmlBody.stop(true, false).animate({
					scrollTop: newY+'px'
				}, {
					duration: this.options.animationDuration,
					easing: this.options.animationEasing,
					always: function(){
						this.$window.off('keydown mousewheel DOMMouseScroll touchstart', cancelEvent);
						this.$window.on('scroll', scrollEvent);
						indicateActive();
					}.bind(this)
				});
				// Allow user to stop scrolling manually
				this.$window.on('keydown mousewheel DOMMouseScroll touchstart', cancelEvent);
			}
			else {
				this.$htmlBody.stop(true, false).scrollTop(newY);
				indicateActive();
			}
		};

		/**
		 * Cancel scroll
		 */
		this.cancel = function(){
			this.$htmlBody.stop(true, false);
		};
		var cancelEvent = this.cancel.bind(this);

		/**
		 * Scroll handler
		 */
		this.scroll = function(){
			var scrollTop = parseInt(this.$window.scrollTop()),
				activeHash;
			for (var hash in this.blocks) {
				if ( ! this.blocks.hasOwnProperty(hash)) continue;
				if (scrollTop >= this.blocks[hash].top && scrollTop < this.blocks[hash].bottom){
					activeHash = hash;
					break;
				}
			}
			this._indicatePosition(activeHash);
		};
		var scrollEvent = this.scroll.bind(this);
		this.scroll();
		this.$window.on('scroll', scrollEvent);

		/**
		 * Resize handler
		 *
		 * @private
		 */
		this._canvasTopOffset = 0;
		this.resize = function(){
			// Delaying the resize event to prevent glitches
			setTimeout(function(){
				this._countAllPositions();
				this.scroll();
			}.bind(this), 150);
			this._countAllPositions();
			this.scroll();
		};
		var resizeEvent = this.resize.bind(this);
		this.$window
			.on('resize', resizeEvent)
			.on('load', resizeEvent);
		this.resize();

		if (this.options.attachOnInit){
			this.attach(this.options.attachOnInit);
		}

		// Recount scroll positions on any content changes
		$us.canvas.$container.on('contentChange', this._countAllPositions.bind(this));

		// Handling initial document hash
		if (document.location.hash && document.location.hash.indexOf('#!') != 0){
			var hash = document.location.hash,
				scrollPlace = (this.blocks[hash] !== undefined) ? hash : undefined;
			if (scrollPlace === undefined) {
				var $target = $(hash);
				if ($target.length != 0){
					scrollPlace = $target;
				}
			}
			if (scrollPlace !== undefined){
				// While page loads, its content changes, and we'll keep the proper scroll on each sufficient content change
				// until the page finishes loading or user scrolls the page manually
				var keepScrollPositionTimer = setInterval(function(){
					this.scrollTo(scrollPlace, true);
				}.bind(this), 100);
				var clearHashEvents = function(){
					clearInterval(keepScrollPositionTimer);
					this.scrollTo(scrollPlace, true);
					this.$window.off('load touchstart mousewheel DOMMouseScroll touchstart', clearHashEvents);
				}.bind(this);
				this.$window.on('load touchstart mousewheel DOMMouseScroll touchstart', clearHashEvents);
			}
		}
	}

	$(function(){
		$us.scroll = new USScroll($us.scrollOptions || {});
	});

}(jQuery);


jQuery(function($){
	"use strict";

	if ($.fn.magnificPopup){
		$('.w-gallery-tnails').each(function(){
			$(this).magnificPopup({
				type: 'image',
				delegate: 'a',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1]
				},
				removalDelay: 300,
				mainClass: 'mfp-fade',
				fixedContentPos: false
			});
		});

		if ( ! window.disable_wc_lightbox) {
			$('.product .images').magnificPopup({
				type: 'image',
				delegate: 'a',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0, 1]
				},
				removalDelay: 300,
				mainClass: 'mfp-fade',
				fixedContentPos: false

			});
		}

		$('a[ref=magnificPopup][class!=direct-link]').magnificPopup({
			type: 'image',
			fixedContentPos: false
		});
	}

	if ($.fn.isotope){
		// Applying isotope to portfolio
		$('.w-portfolio.type_sortable').each(function(index, container){
			var $container = $(container),
				$list = $container.find('.w-portfolio-list'),
				$filterItems = $container.find('.w-filters-item');
			$container.imagesLoaded(function(){
				$list.isotope({
					itemSelector: '.w-portfolio-item',
					layoutMode: 'fitRows',
					isOriginLeft: ! $us.canvas.rtl
				});
				$filterItems.click(function(){
					var $item = $(this);
					if ($item.hasClass('active')) return;
					$filterItems.removeClass('active');
					$item.addClass('active');
					$list.isotope({filter: $item.attr('data-filter')});
				});
			});
		});

		// Applying isotope to blog posts
		$('.w-blog.type_masonry').each(function(index, container){
			var $container = $(container),
				$list = $container.find('.w-blog-list');
			$list.imagesLoaded(function(){
				$list.isotope({
					itemSelector: '.w-blog-entry',
					layoutMode: 'masonry',
					isOriginLeft: ! $us.canvas.rtl
				});
			});
		});

		// Applying isotope to gallery
		$('.w-gallery.type_masonry .w-gallery-tnails').each(function(index, container){
			var $container = $(container);
			$container.imagesLoaded(function(){
				$container.isotope({
					layoutMode: 'masonry',
					isOriginLeft: ! $us.canvas.rtl
				});
			});
		});
	}

	if ($.fn.revolution){
		$('.fullwidthbanner').revolution({
			delay: 9000,
			startwidth: 1140,
			startheight: 500,
			soloArrowLeftHOffset: 20,
			soloArrowLeftVOffset: 0,
			soloArrowRightHOffset: 20,
			soloArrowRightVOffset: 0,
			onHoverStop: "on", // Stop Banner Timet at Hover on Slide on/off
			fullWidth: "on",
			hideThumbs: false,
			shadow: 0 //0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)
		});
		// Redrawing all the Revolution Sliders
		if (window.revapi3 !== undefined){
			$us.canvas.$window.on('resize', window.revapi3.revredraw);
		}
	}

	if ($.fn.waypoint){
		$('.animate_fade, .animate_afc, .animate_afl, .animate_afr, .animate_aft, .animate_afb, .animate_wfc, ' +
		'.animate_hfc, .animate_rfc, .animate_rfl, .animate_rfr').each(function(){
			var $elm = $(this);
			new Waypoint({
				element: this,
				handler: function(){
					if ( ! $elm.hasClass('animate_start')){
						setTimeout(function() {
							$elm.addClass('animate_start');
						}, 20);
						this.destroy();
					}
				},
				offset: '85%'
			});
		});
		$('.wpb_animate_when_almost_visible').each(function(){
			var $elm = $(this);
			new Waypoint({
				element: this,
				handler: function(){
					if ( ! $elm.hasClass('wpb_start_animation')){
						setTimeout(function() {
							$elm.addClass('wpb_start_animation');
						}, 20);
						this.destroy();
					}
				},
				offset: '85%'
			});
		});
		$('.w-counter').each(function(index, elm){
			var $elm = $(this),
				counter = $elm.find('.w-counter-number'),
				count = parseInt($elm.data('count') || 10),
				prefix = $elm.data('prefix') || '',
				suffix = $elm.data('suffix') || '',
				number = parseInt($elm.data('number') || 0);

			counter.html(prefix+number+suffix);

			new Waypoint({
				element: this,
				handler: function(){
					var	step = Math.ceil((count-number)/25),
						stepCount = Math.floor((count-number) / step),
						handler = setInterval(function(){
							number += step;
							stepCount--;
							counter.html(prefix+number+suffix);
							if (stepCount <= 0) {
								counter.html(prefix+count+suffix);
								window.clearInterval(handler);
							}
						}, 40);
					this.destroy();
				},
				offset: '85%'
			});
		});
		$us.canvas.$container.on('contentChange', Waypoint.refreshAll);
	}

	var $submainVideos = $('.l-submain-video');
	var updateVideosSizes = function(){
		$submainVideos.each(function(){
			var container = $(this);
			if ($us.canvas.winWidth <= 1024) return $(this).hide();
			var mejsContainer = container.find('.mejs-container'),
				poster = container.find('.mejs-mediaelement img'),
				video = container.find('video'),
				videoWidth = video.attr('width'),
				videoHeight = video.attr('height'),
				videoProportion = videoWidth / videoHeight,
				parent = container.parent(),
				parentWidth = parent.outerWidth(),
				parentHeight = parent.outerHeight(),
				proportion,
				centerX, centerY;
			if (mejsContainer.length == 0) return;

			// Proper sizing
//			if (video.length > 0 && video[0].player && video[0].player.media) videoWidth = video[0].player.media.videoWidth;
//			if (video.length > 0 && video[0].player && video[0].player.media) videoHeight = video[0].player.media.videoHeight;

			container.show();

			parent.find('span.mejs-offscreen').hide();

			proportion = (parentWidth/parentHeight > videoWidth/videoHeight)?parentWidth/videoWidth:parentHeight/videoHeight;
			container.width(proportion*videoWidth);
			container.height(proportion*videoHeight);

			poster.width(proportion*videoWidth);
			poster.height(proportion*videoHeight);

			centerX = (parentWidth < videoWidth*proportion)?(parentWidth - videoWidth*proportion)/2:0;
			centerY = (parentHeight < videoHeight*proportion)?(parentHeight - videoHeight*proportion)/2:0;

			container.css({left: centerX, top: centerY});

			mejsContainer.css({width: '100%', height: '100%'});
			video.css({'object-fit': 'cover', display: 'inline-block'});
		});
	};
	if (window.MediaElementPlayer){
		$('.l-submain-video video').mediaelementplayer({
			enableKeyboard: false,
			iPadUseNativeControls: false,
			pauseOtherPlayers: false,
			iPhoneUseNativeControls: false,
			AndroidUseNativeControls: false,
			videoWidth: '100%',
			videoHeight: '100%',
			success: function(mediaElement, domObject){
				updateVideosSizes();
				$(domObject).css('display', 'block');
			}
		});
		$us.canvas.$window.on('resize', updateVideosSizes);
	}

	jQuery('.contact_form').each(function(){

		jQuery(this).submit(function(){
			var form = jQuery(this),
				name, email, phone, message, captcha, captchaResult,
				post_id = form.find('input[name=post_id]').val(),
				nameField = form.find('input[name=name]'),
				emailField = form.find('input[name=email]'),
				phoneField = form.find('input[name=phone]'),
				messageField = form.find('textarea[name=message]'),
				captchaField = form.find('input[name=captcha]'),
				captchaResultField = form.find('input[name=captcha_result]'),
				button = form.find('.g-btn'),
				errors = 0;

			button.addClass('loading');
			jQuery('.w-form-field-success').html('');

			if (nameField.length) {
				name = nameField.val();

				if (name === '' && nameField.data('required') === 1){
					jQuery('#name_row').addClass('check_wrong');
					jQuery('#name_state').html(window.nameFieldError);

					errors++;
				} else {
					jQuery('#name_row').removeClass('check_wrong');
					jQuery('#name_state').html('');
				}
			}

			if (emailField.length) {
				email = emailField.val();

				if (email === '' && emailField.data('required') === 1){
					jQuery('#email_row').addClass('check_wrong');
					jQuery('#email_state').html(window.emailFieldError);
					errors++;
				} else {
					jQuery('#email_row').removeClass('check_wrong');
					jQuery('#email_state').html('');
				}
			}

			if (phoneField.length) {
				phone = phoneField.val();

				if (phone === '' && phoneField.data('required') === 1){
					jQuery('#phone_row').addClass('check_wrong');
					jQuery('#phone_state').html(window.phoneFieldError);
					errors++;
				} else {
					jQuery('#phone_row').removeClass('check_wrong');
					jQuery('#phone_state').html('');
				}
			}

			if (messageField.length) {
				message = messageField.val();

				if (message === '' && messageField.data('required') === 1){
					jQuery('#message_row').addClass('check_wrong');
					jQuery('#message_state').html(window.messageFieldError);
					errors++;
				} else {
					jQuery('#message_row').removeClass('check_wrong');
					jQuery('#message_state').html('');
				}
			}

			if (captchaField.length){
				captcha = captchaField.val();
				captchaResult = captchaResultField.val();

				if (captcha === ''){
					jQuery('#captcha_row').addClass('check_wrong');
					jQuery('#captcha_state').html(window.captchaFieldError);
					errors++;
				} else {
					jQuery('#captcha_row').removeClass('check_wrong');
					jQuery('#captcha_state').html('');
				}
			}

			if (errors === 0){
				jQuery.ajax({
					type: 'POST',
					url: window.ajaxURL,
					dataType: 'json',
					data: {
						action: 'sendContact',
						post_id: post_id,
						name: name,
						email: email,
						phone: phone,
						message: message,
						captcha: captcha,
						captcha_result: captchaResult
					},
					success: function(data){
						if (data.success){
							jQuery('.w-form-field-success').html(window.messageFormSuccess);

							jQuery('#captcha_row').removeClass('check_wrong');
							jQuery('#captcha_state').html('');

							if (nameField.length) {
								nameField.val('');
								nameField.removeClass('not-empty');
							}
							if (emailField.length) {
								emailField.val('');
								emailField.removeClass('not-empty');
							}
							if (phoneField.length) {
								phoneField.val('');
								phoneField.removeClass('not-empty');
							}
							if (messageField.length) {
								messageField.val('');
								messageField.removeClass('not-empty');
							}
							if (captchaField.length) {
								captchaField.val('');
								captchaField.removeClass('not-empty');
							}

						} else {
							if (data.errors.captcha != undefined) {
								jQuery('#captcha_row').addClass('check_wrong');
								jQuery('#captcha_state').html(data.errors.captcha);
							}
						}

						button.removeClass('loading');
					},
					error: function(){
					}
				});
			} else {
				button.removeClass('loading');
			}

			return false;
		});

	});

	var checkInputEmptiness = function(){
		var $this = jQuery(this);
		if ($this.attr('type') == 'hidden') return;
		$this.toggleClass('not-empty', $this.val() != '');
	};
	jQuery('input, textarea').each(checkInputEmptiness).on('input', checkInputEmptiness);

	jQuery(".w-clients-list").each(function() {
		var clients = jQuery(this),
			autoPlay = clients.attr('data-autoPlay'),
			autoPlaySpeed = clients.attr('data-autoPlaySpeed'),
			columns = clients.attr('data-columns'),
			columns1300 = (columns < 4)?columns:4,
			columns1024 = (columns < 3)?columns:3,
			columns768 = (columns < 2)?columns:2,
			infinite = false;
		if (autoPlay == 1) {
			autoPlay = infinite = true;
		} else {
			autoPlay = infinite = false;
		}
		clients.slick({
			rtl: $us.canvas.rtl,
			infinite: infinite,
			autoplay: autoPlay,
			lazyLoad: 'progressive',
			autoplaySpeed: autoPlaySpeed,
			accessibility: false,
			slidesToShow: columns,
			responsive: [{
				breakpoint: 1300,
				settings: {
					slidesToShow: columns1300
				}
			},{
				breakpoint: 1024,
				settings: {
					slidesToShow: columns1024
				}
			},{
				breakpoint: 768,
				settings: {
					slidesToShow: columns768
				}
			},{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}]
		});
	});

	if (jQuery().fotorama){
		// Disable FotoRama statistics usage
		window.blockFotoramaData = true;
		jQuery('.fotorama').fotorama({
			spinner: {
				lines: 13,
				color: 'rgba(0, 0, 0, .75)'
			}
		});
	}

	/* Ultimate Addons for Visual Composer integration */
	jQuery('.upb_bg_img, .upb_color, .upb_grad, .upb_content_iframe, .upb_content_video, .upb_no_bg').each(function() {
		var $bg = jQuery(this),
			$prev = $bg.prev();

		if ($prev.length == 0) {
			var $parent = $bg.parent(),
				$parentParent = $parent.parent(),
				$prevParentParent = $parentParent.prev();

			if ($prevParentParent.length) {
				$bg.insertAfter($prevParentParent);

				if ( $parent.children().length == 0 ) {
					$parentParent.remove();
				}
			}
		}
	});

	$us.canvas.$window.load(function(){
		jQuery('.overlay-show').click(function() {
			window.setTimeout(function(){
				var $overlay = jQuery('.ult-overlay.ult-open');
				if ($overlay.length) {
					$overlay.find('.w-map').each(function(map){
						var mapObj = jQuery(this).data('gMap.reference'),
							center = mapObj.getCenter();

						google.maps.event.trigger(jQuery(this)[0], 'resize');
						if (jQuery(this).data('gMap.infoWindows').length) {
							jQuery(this).data('gMap.infoWindows')[0].open(mapObj, jQuery(this).data('gMap.overlays')[0]);
						}
						mapObj.setCenter(center);

					});
				}
			}, 1000);
		});
	});

	function update_cart_widget(event){
		if(typeof event != 'undefined')
		{
			var cart = jQuery('.w-cart'),
				notification = jQuery('.w-cart-notification'),
				productName = notification.find('.product-name'),
				quantity = cart.find('.w-cart-quantity'),
				quantity_val = parseInt(quantity.html(), 10);

			if ( ! cart.hasClass('has_items')) {
				cart.addClass('has_items');
			}

			quantity_val++;
			quantity.html(quantity_val);

			notification.css({display: 'block', opacity: 0});

			productName.html(addedProduct);
			notification.animate({opacity: 1}, 300, function(){
				window.setTimeout(function(){
					notification.animate({opacity: 0},300, function(){
						notification.css({display: 'none'});
					});
				}, 3000);
			});


		}
	}

	var addedProduct = 'Product';

	jQuery('.add_to_cart_button').click(function(){
		var productContainer = jQuery(this).parents('.product').eq(0);
		addedProduct = productContainer.find('h3').text();
	});

	jQuery('body').bind('added_to_cart', update_cart_widget);
});

/**
 * CSS-analog of jQuery slideDown/slideUp/fadeIn/fadeOut functions (for better rendering)
 */
!function(){
	jQuery.fn.clearPreviousTransitions = function(){
		// Stopping previous events, if there were any
		var prevTimers = (this.data('animation-timers') || '').split(',');
		if (prevTimers.length == 2){
			this.css({
				transition: '',
				'-webkit-transition': ''
			});
			clearTimeout(prevTimers[0]);
			clearTimeout(prevTimers[1]);
			this.removeData('animation-timers');
		}
	};
	/**
	 *
	 * @param {Object} css key-value pairs of animated css
	 * @param {Number} duration in milliseconds
	 * @param {Function} onFinish
	 * @param {String} easing CSS easing name
	 * @param {Number} delay in milliseconds
	 */
	jQuery.fn.performCSSTransition = function(css, duration, onFinish, easing, delay){
		duration = duration || 250;
		delay = delay || 25;
		easing = easing || 'ease-in-out';
		var $this = this,
			transition = [];

		this.clearPreviousTransitions();

		for (var attr in css){
			if ( ! css.hasOwnProperty(attr)) continue;
			transition.push(attr+' '+(duration/1000)+'s '+easing);
		}
		transition = transition.join(', ');
		$this.css({
			transition: transition,
			'-webkit-transition': transition
		});

		// Starting the transition with a slight delay for the proper application of CSS transition properties
		var timer1 = setTimeout(function(){
			$this.css(css);
		}, delay);

		var timer2 = setTimeout(function(){
			if (typeof onFinish == 'function') onFinish();
			$this.css({
				transition: '',
				'-webkit-transition': ''
			});
		}, duration + delay);

		this.data('animation-timers', timer1+','+timer2);
	};
	// Height animations
	jQuery.fn.slideDownCSS = function(){
		if (this.length == 0) return;
		var $this = this;
		this.clearPreviousTransitions();
		// Grabbing paddings
		this.css({
			'padding-top': '',
			'padding-bottom': ''
		});
		var timer1 = setTimeout(function(){
			var paddingTop = parseInt($this.css('padding-top')),
				paddingBottom = parseInt($this.css('padding-bottom'));
			// Grabbing the "auto" height in px
			$this.css({
				visibility: 'hidden',
				position: 'absolute',
				height: 'auto',
				'padding-top': 0,
				'padding-bottom': 0,
				display: 'block'
			});
			var height = $this.height();
			$this.css({
				overflow: 'hidden',
				height: '0px',
				visibility: '',
				position: '',
				opacity: 0
			});
			$this.performCSSTransition({
				height: height + paddingTop + paddingBottom,
				opacity: 1,
				'padding-top': paddingTop,
				'padding-bottom': paddingBottom
			}, arguments[0] || 250, function(){
				$this.css({
					overflow: '',
					height: 'auto'
				});
			});
		}, 25);
		this.data('animation-timers', timer1+',null');
	};
	jQuery.fn.slideUpCSS = function(){
		if (this.length == 0) return;
		this.clearPreviousTransitions();
		this.css({
			height: this.outerHeight(),
			overflow: 'hidden',
			'padding-top': this.css('padding-top'),
			'padding-bottom': this.css('padding-bottom'),
			opacity: 1
		});
		var $this = this;
		this.performCSSTransition({
			height: 0,
			'padding-top': 0,
			'padding-bottom': 0,
			opacity: 0
		}, arguments[0] || 250, function(){
			$this.css({
				overflow: '',
				'padding-top': '',
				'padding-bottom': '',
				display: 'none'
			});
		});
	};
	// Opacity animations
	jQuery.fn.fadeInCSS = function(){
		if (this.length == 0) return;
		this.clearPreviousTransitions();
		this.css({
			opacity: 0,
			display: 'block'
		});
		this.performCSSTransition({
			opacity: 1
		}, arguments[0] || 250);
	};
	jQuery.fn.fadeOutCSS = function(){
		if (this.length == 0) return;
		var $this = this;
		this.performCSSTransition({
			opacity: 0
		}, arguments[0] || 250, function(){
			$this.css('display', 'none');
		});
	};
	// Material design animations
	jQuery.fn.showMD = function(){
		if (this.length == 0) return;
		this.clearPreviousTransitions();
		// Grabbing paddings
		this.css({
			'padding-top': '',
			'padding-bottom': ''
		});
		var paddingTop = parseInt(this.css('padding-top')),
			paddingBottom = parseInt(this.css('padding-bottom'));
		// Grabbing the "auto" height in px
		this.css({
			visibility: 'hidden',
			position: 'absolute',
			height: 'auto',
			'padding-top': 0,
			'padding-bottom': 0,
			'margin-top': -20,
			opacity: '',
			display: 'block'
		});
		var height = this.height();
		this.css({
			overflow: 'hidden',
			height: '0px',
			visibility: '',
			position: ''
		});
		var $this = this;
		this.performCSSTransition({
			height: height + paddingTop + paddingBottom,
			'margin-top': 0,
			'padding-top': paddingTop,
			'padding-bottom': paddingBottom
		}, arguments[0] || 350, function(){
			$this.css({
				overflow: '',
				height: 'auto',
				'margin-top': '',
				'padding-top': '',
				'padding-bottom': ''
			});
		}, 'cubic-bezier(.23,1,.32,1)', 150);
	};
	jQuery.fn.hideMD = function(){
		if (this.length == 0) return;
		this.clearPreviousTransitions();
		var $this = this;
		this.css({
			'margin-top': ''
		});
		this.performCSSTransition({
			opacity: 0
		}, arguments[0] || 100, function(){
			$this.css({
				display: 'none',
				opacity: ''
			});
		});
	};
}();
