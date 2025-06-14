package ru.webserver.vapeshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.webserver.vapeshop.dtos.AuthResponse;
import ru.webserver.vapeshop.utils.JwtUtil;

@Service
public class AuthService {

    @Autowired(required = true)
    private JwtUtil jwtUtil;

    public AuthResponse login(String username, String password) throws Exception {
        if ("1".equals(username) && "1".equals(password)) {
            String token = jwtUtil.generateToken(username);
            return new AuthResponse(token, null);
        }

        return new AuthResponse(null, "Invalid credentials");

    }
}
