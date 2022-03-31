function go_Event_Delete(){
	if(confirm('삭제하면 복구할 수 없습니다. \n 정말로 이벤트를 삭제하시겠습니까?')){
		document.frm.action="adminEventDelete";
		document.frm.submit();
	}
}

function go_askview(aseq) {
   location.href ="adminAskDetail?aseq=" + aseq;
}


function go_askrep(aseq){
   document.form5.action="adminAskRepSave";
   document.form5.submit();
}



function go_review_delete(){
   var count = 0; 
   
   if(document.frm6.rseq.length==undefined){   
      if( document.frm6.rseq.checked == true )
         count++;
   }else{
      for( var i=0; i< document.frm6.rseq.length ; i++){
         if( document.frm6.rseq[i].checked == true )
            count++;
      }if(confirm("정말 삭제하시겠습니까?") == true ){
      }else {
        return false;
      }
   }   
   if( count == 0 ){
      alert("삭제할 항목을 선택해주세요");
   } else{
      document.frm6.action = "adminReviewDelete";
       document.frm6.submit();
   }
}


function go_wrt_Notice(){
document.frm.action="adminNoticeInsertForm";
   document.frm.submit();

}


function go_Notice(){
document.frm.action="adminNoticeInsert";
   document.frm.submit();

}



function go_Event_Insert(){	
	if(document.frm.title.value==""){
		alert('이벤트명을 입력하세요');
		document.frm.title.focus();
	}else if(document.frm.startDate.value==""){
		alert('이벤트 시작일을 입력하세요');
		document.frm.startDate.focus();
	}else if(document.frm.startTime.value==""){
		alert('이벤트 시작시간을 입력하세요');
		document.frm.startTime.focus();
	}else if(document.frm.endDate.value==""){
		alert('이벤트 종료일을 입력하세요');
		document.frm.endDate.focus();
	}else if(document.frm.endTime.value==""){
		alert('이벤트 종료시간을 입력하세요');
		document.frm.endTime.focus();
	}else if(document.frm.subtitle.value==""){
		alert('소제목를 입력하세요');
		document.frm.subtitle.focus();
	}else if(document.frm.content.value==""){
		alert('이벤트 내용을 입력하세요');
		document.frm.content.focus();
	}else if(document.frm.image1.value==""){
		alert('썸네일 이미지를 저장하세요');
		document.frm.image1.focus();
	}else if(document.frm.image2.value==""){
		alert('내용 이미지를 저장하세요');
		document.frm.image2.focus();
	}else{
		if(confirm('이벤트를 저장하시겠습니까?')){
			document.frm.action = "adminEventInsert";
			document.frm.submit();
		}
	}
}

function go_wrt_Event(){
	document.frm.action="adminEventInsertForm";
	document.frm.submit();
}


function go_Product_Del(){
	if(confirm('정말로 해당 상품을 삭제하시겠습니까?')){
		document.frm1.action = "adminProductDelete";
		document.frm1.submit();
	}
}

function go_Product_Update(){
	if(document.frm1.name.value==""){
		alert('상품명을 입력하세요');
		document.frm1.name.focus();
	}else if(document.frm1.price1.value==""){
		alert('원가를 입력하세요');
		document.frm1.price1.focus();
	}else if(document.frm1.price2.value==""){
		alert('판매가를 입력하세요');
		document.frm1.price2.focus();
	}else if( document.frm1.image.value=="" && document.frm1.oldImage.value==""){
			alert('썸네일 이미지를 입력하세요');
			document.frm1.image.focus();
	}else if(document.frm1.image1.value=="" && document.frm1.oldImage1.value==""){
			alert('상세 이미지를 입력하세요');
			document.frm1.image1.focus();
	}else{
		if(confirm('수정하시겠습니까?')){
			document.frm1.action = "adminProductUpdate";
			document.frm1.submit();
		}
	}
}

function go_view(qseq) {
   location.href ="adminQnaDetail?qseq=" + qseq;
}

function go_wrt_Product(){
	document.frm.action = "adminProductWriteForm";
	document.frm.submit();
}

function cal(){
	if(document.frm1.price2.value == "" || document.frm1.price1.value=="") return;
	document.frm1.price3.value = document.frm1.price2.value - document.frm1.price1.value;
}

function go_Product_Save(){
	var theForm = document.frm;
	if(theForm.name.value==""){
		alert("상품명을 입력하세요");
		theForm.name.focus();
	}else if(theForm.price1.value==""){
		alert("원가를 입력하세요");
		theForm.price1.focus();
	} else if(theForm.price2.value==""){
		alert("판매가를 입력하세요");
		theForm.price2.focus();
	}else if(document.frm.image.value==""){
		alert('썸네일 이미지를 입력하세요');
		document.frm.image.focus();
	}else if(document.frm.image1.value==""){
		alert('상세 이미지를 입력하세요');
		document.frm.image1.focus();
	} else{
		if(confirm('상품을 등록하시겠습니까?')){
			theForm.action = "adminProductWrite";
			theForm.submit();
		}
	}
}

function go_order_save(){
	var result = document.frm.result;
	var orderListSelect = document.getElementById("orderListSelect");
	
	// 현재 화면에 보여지고 있는 주문들의 체크박스가 몇 개 체크되었는지 갯수를 count한다.
	if(result == null){
		alert("주문처리 가능한 항목이 없습니다.");
		return;
	}else{
		var resultConfirm = confirm("선택된 항목을 정말 '" + orderListSelect.options[orderListSelect.selectedIndex].text + "'로 변경하시겠습니까?");
		if(resultConfirm){
			var count = 0;
			if(result.length == undefined){ // 체크박스가 총 1개인 경우.
				if(result.checked == true){
					count++;
				}
			}else{ // 체크박스가 2개 이상인 경우
				for(var i = 0; i<result.length; i++){
					if(result[i].checked == true){
						count++;
					}
				}
			}
			//if(document.frm.resulted.length==undefined || (document.frm.resulted.length != 0 ))
			
			//alert(count);
			// count 값이 0이면, 더 진행하지 않고 orderList.jsp로 되돌아간다.
			if( count == 0 ){
				alert("주문처리할 항목을 선택하세요.")
				return;
			}else{
				// count 값이 1 이상이면, 현재 폼의 체크박스 value값을 갖고, command = adminOrderSave로 이동
				document.frm.action = "adminOrderSave?selectedIndex="+orderListSelect.options[orderListSelect.selectedIndex].value;
				document.frm.submit();
			}
			// 처리하고(주문의 result값을 '1'->'2'로 변경) orderList.jsp로 되돌아온다.
		}
	}	
}


function go_member_save(){
	var useyn = document.frm.useyn;
	var memberSelect = document.getElementById("memberSelect");
	
	// 현재 화면에 보여지고 있는 주문들의 체크박스가 몇 개 체크되었는지 갯수를 count한다.
	if(useyn == null){
		alert("처리 가능한 항목이 없습니다.");
		return;
	}else{
		var useynConfirm = confirm("선택된 항목을 정말 '" + memberSelect.options[memberSelect.selectedIndex].text + "'로 변경하시겠습니까?");
		if(useynConfirm){
			var count = 0;
			if(useyn.length == undefined){ // 체크박스가 총 1개인 경우.
				if(useyn.checked == true){
					count++;
				}
			}else{ // 체크박스가 2개 이상인 경우
				for(var i = 0; i<useyn.length; i++){
					if(useyn[i].checked == true){
						count++;
					}
				}
			}
			//if(document.frm.resulted.length==undefined || (document.frm.resulted.length != 0 ))
			
			//alert(count);
			// count 값이 0이면, 더 진행하지 않고 orderList.jsp로 되돌아간다.
			if( count == 0 ){
				alert("회원을 선택하세요.")
				return;
			}else{
				// count 값이 1 이상이면, 현재 폼의 체크박스 value값을 갖고, command = adminOrderSave로 이동
				alert("선택된 회원이 '"+ memberSelect.options[memberSelect.selectedIndex].text + "'으로 변경되었습니다");
				document.frm.action = "adminMemberSave?selectedIndex="+memberSelect.options[memberSelect.selectedIndex].value;
				document.frm.submit();
			}
			// 처리하고(주문의 result값을 '1'->'2'로 변경) orderList.jsp로 되돌아온다.
		}
	}	
}


function go_notice_save(){
	var checkBox_nseq = document.frm.checkBox_nseq;
	var noticeSelect = document.getElementById("noticeSelect");
	
	// 현재 화면에 보여지고 있는 주문들의 체크박스가 몇 개 체크되었는지 갯수를 count한다.
	if(checkBox_nseq == null){
		alert("처리 가능한 항목이 없습니다.");
		return;
	}else{
		var useynConfirm = confirm("선택된 항목을 정말 '" + noticeSelect.options[noticeSelect.selectedIndex].text + "'로 변경하시겠습니까?");
		if(useynConfirm){
			var count = 0;
			if(checkBox_nseq.length == undefined){ // 체크박스가 총 1개인 경우.
				if(checkBox_nseq.checked == true){
					count++;
				}
			}else{ // 체크박스가 2개 이상인 경우
				for(var i = 0; i<checkBox_nseq.length; i++){
					if(checkBox_nseq[i].checked == true){
						count++;
					}
				}
			}
			//if(document.frm.resulted.length==undefined || (document.frm.resulted.length != 0 ))
			
			//alert(count);
			// count 값이 0이면, 더 진행하지 않고 orderList.jsp로 되돌아간다.
			if( count == 0 ){
				alert("변경할 게시물을 선택하세요.")
				return;
			}else{
				// count 값이 1 이상이면, 현재 폼의 체크박스 value값을 갖고, command = adminOrderSave로 이동
				alert("선택된 게시물이 '"+ noticeSelect.options[noticeSelect.selectedIndex].text + "'으로 변경되었습니다");
				document.frm.action = "adminNoticeSave?selectedIndex="+noticeSelect.options[noticeSelect.selectedIndex].value;
				document.frm.submit();
			}
			// 처리하고(주문의 result값을 '1'->'2'로 변경) orderList.jsp로 되돌아온다.
		}
	}	
}

function go_Notice_Edit(){
	if(document.frm.subject.value==""){
		alert('제목을 입력하세요');
		document.frm.subject.focus();
	}else if(document.frm.content.value==""){
		alert('내용을 입력하세요');
		document.frm.content.focus();
	}else{
		if(confirm('수정하시겠습니까?')){
			document.frm.action = "adminNoticeUpdate";
			document.frm.submit();
		}
	}
}

function go_Event_Edit(){
	if(document.frm.title.value==""){
		alert('제목을 입력하세요');
		document.frm.title.focus();
	}else if(document.frm.content.value==""){
		alert('내용을 입력하세요');
		document.frm.content.focus();
	}else{
		if(confirm('수정하시겠습니까?')){
			document.frm.action = "adminEventUpdate";
			document.frm.submit();
		}
	}
 }

function go_view(qseq) {
   location.href ="adminQnaDetail?qseq=" + qseq;
}

function go_rep(qseq){
document.form4.action="adminQnaRepSave";
   document.form4.submit();
   }
   

function go_Update(pseq){
	var url = 'adminProductUpdateForm?pseq='+ pseq;
	document.frm.action = url;
	document.frm.submit();
}

function go_search( comm ){
	if( document.frm.key.value == "" ){
		alert("검색버튼 사용시에는 검색어 입력이 필수입니다");
	 	return;
	 }
	var url = comm + "?page=1";   // 검색어로 검색한 결과의 1페이지로 이동
	document.frm.action = url;
	document.frm.submit();
}

function go_total( comm ){
	document.frm.key.value="";
	document.frm.action = comm + "?page=1";
	document.frm.submit();
}

function go_qnaupdate(qseq){
if(confirm('수정하시겠습니까?')){
document.form4.action="adminQnaUpdate";
   document.form4.submit();
}
}


function go_askupdate(){
if(confirm('수정하시겠습니까?')){
document.form5.action="adminAskUpdate";
   document.form5.submit();
}
}