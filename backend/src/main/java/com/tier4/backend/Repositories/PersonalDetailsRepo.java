package com.tier4.backend.Repositories;

import com.tier4.backend.web.Domain.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalDetailsRepo extends JpaRepository<PersonalDetails,Long> {

}
