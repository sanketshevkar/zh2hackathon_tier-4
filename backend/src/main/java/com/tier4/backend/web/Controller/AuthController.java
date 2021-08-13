package com.tier4.backend.web.Controller;
import com.tier4.backend.Repositories.VectorRepo;
import com.tier4.backend.Services.AuthService;
import com.tier4.backend.web.Domain.PersonalDetails;
import com.tier4.backend.web.Domain.User;
import com.tier4.backend.web.Domain.Vector;
import com.tier4.backend.web.Model.Auth.UserLoginReponse;
import com.tier4.backend.web.Model.Auth.UserLoginRequest;
import com.tier4.backend.web.Model.Auth.UserSignUpRequest;
import com.tier4.backend.web.Model.Auth.userSignUpResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final VectorRepo vectorRepo;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<UserLoginReponse> login(@RequestBody UserLoginRequest userLoginRequest) throws NullPointerException {

        Vector vector = vectorRepo.getByValue(userLoginRequest.getMobileNumber());
        System.out.println(vector.toString());
        User user = vector.getUser();
        PersonalDetails personalDetails = user.getPersonalDetails();

            return ResponseEntity.ok(UserLoginReponse.builder()
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .phoneNumber(vector.getValue())
                    .build());

    }

    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody UserSignUpRequest userSignUpRequest){

        log.info(userSignUpRequest.toString());

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.set("VALUE","OK");
        if(authService.signUp(userSignUpRequest) == "USER::SAVED")
            return new ResponseEntity(httpHeaders, HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);

    }

}
