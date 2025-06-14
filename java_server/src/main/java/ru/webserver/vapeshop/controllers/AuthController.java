package ru.webserver.vapeshop.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.webserver.vapeshop.dtos.AuthResponse;
import ru.webserver.vapeshop.dtos.LoginRequest;
import ru.webserver.vapeshop.services.AuthService;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) throws Exception {

        try {
            String username = request.username;
            String password = request.password;
            AuthResponse authResponse = authService.login(username, password);
            if (authResponse.getError() != null) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
            return new ResponseEntity<>(authResponse, HttpStatus.OK); 
        } catch (Exception e) {
            System.out.println("LOGIN FAILED! ERROR:\n\n" + e + "\n\n");
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
    }    
}