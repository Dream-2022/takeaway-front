package com.example.takeawaybackend.bean;

import lombok.Data;
import org.springframework.context.annotation.Bean;

@Data
public class User {
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String nickname;
    private String picture;
    private String gender;
    private String  user_type;

}
