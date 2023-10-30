package com.example.takeawaybackend.controller;

import com.example.takeawaybackend.pojo.LoginData;
import com.example.takeawaybackend.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pre")
public class UserController {
    @Autowired
    private UserDao userDao;

//    @CrossOrigin
    @PostMapping("/login")
    public String login(@RequestBody LoginData loginData){
        System.out.println("收到的数据是："+loginData.getUsername()+","+loginData.getPassword());

        return "连了";
    }
}
