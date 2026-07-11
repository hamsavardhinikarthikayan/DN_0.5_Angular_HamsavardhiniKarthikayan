package com.cognizant.spring_train.controller;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import com.cognizant.spring_train.model.AuthenticationResponse;
import com.cognizant.spring_train.security.JwtUtil;
@RestController
public class AuthenticationController {

    @GetMapping("/authenticate")
    public AuthenticationResponse authenticate(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {

        String encodedCredentials = authorizationHeader.substring(6);

        byte[] decodedBytes = Base64.getDecoder().decode(encodedCredentials);

        String credentials = new String(decodedBytes, StandardCharsets.UTF_8);

        String username = credentials.split(":")[0];

        JwtUtil jwtUtil = new JwtUtil();

        String token = jwtUtil.generateToken(username);

        return new AuthenticationResponse(token);
    }
}
