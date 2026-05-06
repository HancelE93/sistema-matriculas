package com.krakedev.matriculas.services;

import org.springframework.stereotype.Service;

@Service
public class LoginService {

	 public boolean login(String usuario, String password) {

	        return usuario.equals("admin") && password.equals("1234");
	    }
	}