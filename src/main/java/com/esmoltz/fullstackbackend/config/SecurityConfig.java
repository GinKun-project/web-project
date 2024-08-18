package com.esmoltz.fullstackbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF for simplicity; consider enabling in production with appropriate configuration
                .cors() // Enable CORS
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/users/**").permitAll() // Permit all requests to the user API
                        .anyRequest().authenticated() // Secure all other requests
                )
                .formLogin().disable() // Disable form-based login if you're using token-based authentication or stateless API
                .httpBasic().disable(); // Disable basic auth if not needed

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/api/users/**");
    }
}
