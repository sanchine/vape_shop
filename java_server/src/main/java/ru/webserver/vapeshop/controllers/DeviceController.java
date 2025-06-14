package ru.webserver.vapeshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ru.webserver.vapeshop.dtos.DeviceDTO;
import ru.webserver.vapeshop.dtos.DevicesResponse;
import ru.webserver.vapeshop.services.DeviceService;
import ru.webserver.vapeshop.utils.JwtUtil;

@CrossOrigin
@RestController
@RequestMapping("/api/devices")
public class DeviceController {
    private final DeviceService deviceService;
    
    @Autowired(required = true)
    private JwtUtil jwtUtil;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping
    public ResponseEntity<DevicesResponse> getAllDevices(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7); // Убираем "Bearer "
        System.out.println(token);

        if (!jwtUtil.validateToken(token)) {
            return new ResponseEntity<>(new DevicesResponse(null, "Token is not valid!"), HttpStatus.FORBIDDEN);
        }
        
        return new ResponseEntity<>(new DevicesResponse(deviceService.getDevicesList(), null), HttpStatus.OK);
    }
}