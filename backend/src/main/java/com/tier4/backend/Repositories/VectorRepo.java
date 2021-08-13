package com.tier4.backend.Repositories;

import com.tier4.backend.web.Domain.Vector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VectorRepo  extends JpaRepository<Vector,Integer> {

    Vector getByValue(String value);
}
