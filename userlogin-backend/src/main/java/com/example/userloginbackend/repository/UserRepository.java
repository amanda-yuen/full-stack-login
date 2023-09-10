package com.example.userloginbackend.repository;

import com.example.userloginbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

//JpaRepository is a JPA (Java Persistence API) specific extension of Repository.
//JpaRepository<name of model class, data type of primary key>
public interface UserRepository  extends JpaRepository<User, Long> {
}
