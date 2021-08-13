package com.tier4.backend.web.Domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity(name = "personalDetails")
public class PersonalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long personalDetailsId;

    @Column(nullable = false,unique = false,updatable = true,columnDefinition = "varchar(250)")
    private String firstName;

    @Column(nullable = false,unique = true,updatable = true,columnDefinition = "varchar(250)")
    private String lastName;

    //this contains the dob as YYYY/MM/DD/HH/MIN/SEC the indivisual values can be obtained by delimeter("/")
    @Column(nullable = false,unique = false,updatable = true,columnDefinition = "varchar(250)")
    private String dob;

    //MR. MS.
    private String salutation;

    @Column(nullable = true,updatable = true,unique = true,columnDefinition = "varchar(250)")
    private String profilePicUrl;

    @Column(nullable = true,updatable = true,unique = false,columnDefinition = "varchar(250)")
    private String gender;

    @Column(nullable = true,updatable = true,unique = false,columnDefinition = "varchar(250)")
    private String mothersMiddleName;

}
