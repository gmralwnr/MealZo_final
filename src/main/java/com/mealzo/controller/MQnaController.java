package com.mealzo.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mealzo.service.MQnaService;

@Controller
public class MQnaController {

	@Autowired
	MQnaService qs;
	
	@RequestMapping("/mypageForm")
	public String mypageForm(HttpServletRequest request  ) {
		HttpSession session = request.getSession();
		HashMap<String, Object> loginUser =
				(HashMap<String, Object>)session.getAttribute("loginUser");

		if(loginUser==null) {
			return "member/login";
		}else
			
		
		return "mypage/mypage";
	}
	
	@RequestMapping("/qnaForm")
	public ModelAndView qnaForm(Model model, HttpServletRequest request) {
		ModelAndView mav = new ModelAndView();
		HttpSession session = request.getSession();
		HashMap<String, Object> loginUser =
				(HashMap<String, Object> )session.getAttribute("loginUser");
		if(loginUser ==null) {
			mav.setViewName("member/login");
		}else {
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("id", loginUser.get("ID"));
			paramMap.put("ref_curser", null);
			qs.listQna(paramMap);
			
			ArrayList<HashMap<String, Object>> list
			 = (ArrayList<HashMap<String, Object>>)paramMap.get("ref_cursor");
			mav.addObject("qnaList", list);
			mav.setViewName("qna/qnaList");
					
		}
		
		return mav;
			
	}
	
}