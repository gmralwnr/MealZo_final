package com.mealzo.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.mealzo.service.MOrderService;

@Controller
public class MOrderController {

	@Autowired
	MOrderService os;
	
	@RequestMapping(value="/orderInsert")
	public String orderInsert( HttpServletRequest request ) {
		int oseq = 0;
		
		HttpSession session = request.getSession();
		HashMap<String, Object> loginUser
			= (HashMap<String, Object>)session.getAttribute("loginUser");
		if( loginUser == null ) {
			return "member/login";
		} else {
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("id", loginUser.get("ID") );
			paramMap.put("oseq", 0);
			
			os.insertOrder( paramMap );
			
			oseq = Integer.parseInt( paramMap.get("oseq").toString() );
			System.out.println(oseq);
		}
		return "redirect:/orderList?oseq="+oseq;
	}
	
	
	
	@RequestMapping(value="/orderList")
		public ModelAndView orderListForm( HttpServletRequest request, Model model ) {
		ModelAndView mav = new ModelAndView();
		HttpSession session = request.getSession();
		HashMap<String, Object> loginUser = (HashMap<String, Object>) session.getAttribute("loginUser");
		if( loginUser == null ) {
			mav.setViewName("member/login");	
			return mav;
		} else {
			ArrayList<HashMap<String, Object>> finalList 
			= new ArrayList<HashMap<String, Object>>();
			HashMap<String, Object> paramMap1 = new HashMap<String, Object>();
			paramMap1.put("id", loginUser.get("ID") );
			paramMap1.put("ref_cursor", null);
			os.listOrderByIdAll( paramMap1 );   // 현재로그인유저의 진행중인 주문들의 "주문번호들" 조회
			
			ArrayList<HashMap<String, Object>> oseqList 
				= (ArrayList<HashMap<String, Object>>)paramMap1.get("ref_cursor");
			
			for( HashMap<String, Object> result : oseqList ) {
				int oseq = Integer.parseInt( result.get("OSEQ").toString() );   // 주문번호 1개 추출
				HashMap<String, Object> paramMap2 = new HashMap<String, Object>();
				paramMap2.put("oseq", oseq);
				paramMap2.put("reg_cursor", null);
				os.listOrderByOseq(paramMap2);  // 추출할 주문번호를 이용하여 주문 내역(상품들) 조회
				ArrayList<HashMap<String, Object>> orderListByOseq 
				= (ArrayList<HashMap<String, Object>>)paramMap2.get("ref_cursor");
			
			HashMap<String, Object> orderFirst = orderListByOseq.get(0);  // 주문 상품들중 첫번째 주문 추출
			orderFirst.put("PNAME" , (String)orderFirst.get("PNAME") + "포함 " + orderListByOseq.size() + "건" );
			// 추출한 첫번째 상품의 상품명을   "XXX 포함 X건" 이라고 수정
			
			//ovo.setPname(ovo.getPname() + " 포함 " + list2.size()+"건");
			
			int totalPrice = 0;
			for( HashMap<String, Object> order : orderListByOseq ) {
				totalPrice += Integer.parseInt( order.get("QUANTITY").toString() )
									* Integer.parseInt( order.get("PRICE2").toString() ); 
			}
			orderFirst.put("PRICE2", totalPrice);    // 추출한 첫번째 상품의 가격을 총가격으로 수정
			// 주번 번호별 대표 상품(첫번째 상품)을 별도의 리스트로 모아서 model 에 저장
			finalList.add(orderFirst);
			}
			mav.addObject("orderList", finalList);
			mav.setViewName("order/orderList");
		}
		return mav;
	}
	
}




























