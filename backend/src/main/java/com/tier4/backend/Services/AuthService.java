package com.tier4.backend.Services;


import com.tier4.backend.Exceptions.VectorException;
import com.tier4.backend.Repositories.UserRepo;
import com.tier4.backend.Repositories.VectorRepo;
import com.tier4.backend.web.Domain.User;
import com.tier4.backend.web.Domain.Vector;
import com.tier4.backend.web.Model.Auth.UserSignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private  VectorRepo vectorRepo;
    private final UserRepo userRepo;

    @Transactional
    public Vector getVectorByValue(String value) {

        return vectorRepo.getByValue(value);
    }

    @Transactional
    public String signUp(UserSignUpRequest userSignUpRequest){

        Vector vector = Vector.builder()
                .type("p")
                .value(userSignUpRequest.getPhoneNumber())
                .leftOver("0.0")
                .prevAvg("0.0")
                .totalDays(0.0)
                .build();

        vector = vectorRepo.save(vector);
        System.out.println(vector);

        User user = User.builder()
                .firstName(userSignUpRequest.getFirstName())
                .lastName(userSignUpRequest.getLastName())
                .pin(userSignUpRequest.getPin())
                .build();

        user = userRepo.save(user);
        System.out.println(user);

        user.setVector(vector);
        vector.setUser(user);
        userRepo.save(user);
        vectorRepo.save(vector);

        return "USER::SAVED";
    }
}
