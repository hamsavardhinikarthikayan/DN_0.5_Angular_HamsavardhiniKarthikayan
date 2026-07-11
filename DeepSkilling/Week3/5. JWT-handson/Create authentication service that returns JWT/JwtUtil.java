package com.cognizant.spring_train.security;
import java.security.Key;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {
    private static final String SECRET = "abcdefghijklmnopqrstuvwxyz123456";
    public String generateToken(String username) {
        Key key = new SecretKeySpec(
                SECRET.getBytes(),
                SignatureAlgorithm.HS256.getJcaName());
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 20))
                .signWith(key)
                .compact();
    }
}
