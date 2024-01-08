$(document).ready(function(){
	/* 전체메뉴 */
	$('.nav_icon .btn_allmenu').on('click', function () {
		if(window.innerWidth>876){
			$('#all_menu').toggle();
			$('.nav_icon .btn_allmenu').toggleClass('btn_close');
		}else{
			$('#all_navbar').toggle();
		}
		$('#search_cont').hide();
		$('#latest_cont').hide();
		$('#language_cont').hide();
		$('#media_cont').hide();
		$('#login_cont').hide();

		// if ($("#all_menu").css("display") == "block" )
		// {
		// 	try{
		// 		let eventObj = {};
		// 		eventObj = { 
		// 			event_name : 'click_event',
		// 			ep_button_name : '햄버거 메뉴',
		// 			ep_button_area : '헤더',
		// 			ep_button_category : '공통'
		// 		}
		// 		gabuilder.GAEventOBJ(eventObj) ;
		// 	}catch(e){
		// 		console.error("GA_click_event");
		// 	}            
		// }
		// return false;
	});

	/* 검색 */
	$('#nav_icon .btn_search').on('click', function () {
		$('#search_cont').show();
		$('#latest_cont').show().addClass('show');
		$('#all_menu').hide();
		$('#language_cont').hide();
		$('#media_cont').hide();
		$('#login_cont').hide();
		$('.nav_icon .btn_allmenu').removeClass('btn_close');
		return false;
	});
	$('#fun_cont .close').on('click', function () {
		$('#latest_cont').hide();
		$('#search_cont').hide();
		return false;
	});
		$('#search_cont').on('click', function () {
		$('#latest_cont').show();
		return false;
	});

	/* 팝업 - 헤더 - 공유하기 */
	$('#sub_header .btn_share').on('click', function () {
		$('.share_layer').show();
		$('.m_shareBack').show();
		window.sharePopupObj = $('#shareLayer');
		$('.nav_icon .btn_allmenu').removeClass('btn_close');
		$('#all_menu').hide();
		return false;
	});
	$('.share_layer .btn_close').on('click', function () {
		$('.share_layer').hide();
		$('.m_shareBack').hide();
	});
	$(document).mouseup(function (e){
		var LayerPopup = $(".share_layer");
		if(LayerPopup.has(e.target).length === 0){
			LayerPopup.css('display','none');
			$('.m_shareBack').css('display', 'none');
		}
	});

	$('.btn_reply').on('click',function(){
		replyPopupObj.show();
	});
	$('.reply_box .btn_close').on('click',function(){
		replyPopupObj.hide();
	});
	$('#all_navbar .btn_close').on('click',function(){
		$('#all_navbar').toggle();
	});

	/* 팝업 - 기사뷰 - 댓글 */
	window.replyPopupObj = Popup( $( '#replyLayerPopup' ), {
		vertical: 'top',     /* top, bottom, center */
		horizontal: 'right',  /* left, right, center */
		//effect: 'blind',  /* clip slide blind */
		//direction: 'right',   /* up, down, left, right */
		duration: 0.1
	});

	/* 외부영역 클릭 시 레이어 사라짐 */
	 $(document).click(function(e){
		if(e.target.className =="show"){return false} 
		$(".show").stop().hide().removeClass('show');
	});

	$('body').click(function(e){
		if( !$('#search_cont').has(e.target).length )
			$('#search_cont').hide();
			//$('#latest_cont').hide();
	});

	/* 기사뷰 - 댓글작성자 레이어 풀스크린 눌렀을 때 초기화 */
	$('#fullScreenPopupLayer').on({ 
		click: function() { 
			if ( $('.reply_layer_con .reply_box').css('display') === 'none' )
			{
				$('.reply_layer_con .reply_box').css('display', 'block') ;
		
				$('#reply_gather').css('display', 'none') ;
				$('#reply_gather').html('') ;
			}
		}
	});
});