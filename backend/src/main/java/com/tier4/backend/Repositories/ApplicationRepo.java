package com.tier4.backend.Repositories;


import com.tier4.backend.web.Domain.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepo extends JpaRepository<Application,Integer> {


}
