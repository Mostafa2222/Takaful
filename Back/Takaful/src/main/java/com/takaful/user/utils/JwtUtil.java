package com.takaful.user.utils;

import com.takaful.user.entities.Permission;
import com.takaful.user.entities.Role;
import com.takaful.user.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private final String SECRET = "super-secret-key-change-me-super-secret-key-256bit";
    private final long EXPIRATION = 1000 * 60 * 60 * 24; // 24h

    public String generateToken(User user) {
        Set<String> permissions = user.getRole().getPermissions().stream()
                .map(Permission::getCode)
                .collect(Collectors.toSet());
        return Jwts.builder()
                .setSubject(user.getId().toString())
                .claim("username", user.getUsername())
                .claim("permissions", permissions)
                .claim("nameEn", user.getNameEn())
                .claim("nameAr", user.getNameAr())
                .claim("roleNameAr", user.getRole().getNameAr())
                .claim("roleNameEn", user.getRole().getNameEn())
//                .claim("roleCode", user.getRoles().stream().map(Role::getName).findFirst().orElse("USER"))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

