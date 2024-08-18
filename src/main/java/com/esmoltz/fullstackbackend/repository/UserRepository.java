package com.esmoltz.fullstackbackend.repository;

import com.esmoltz.fullstackbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
