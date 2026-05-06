package com.krakedev.matriculas.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krakedev.matriculas.entidades.LoginRequest;
import com.krakedev.matriculas.services.LoginService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class LoginController {

	private final LoginService service;

    public LoginController(LoginService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest req) {

        boolean ok = service.login(req.getUsuario(), req.getPassword());

        if (ok) {
            return "OK";
        }

        throw new RuntimeException("Credenciales incorrectas");
    }
}