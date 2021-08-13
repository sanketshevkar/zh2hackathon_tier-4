package com.tier4.backend.web.Domain;

import com.tier4.backend.web.Model.Pot.PotDto;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userid;

    private String firstName;
    private String dob;
    private String lastName;

    @Column(nullable = false,updatable = false,columnDefinition = "varchar(250)")
    private String pin;

    //@OneToMany(cascade = {CascadeType.REFRESH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REMOVE},fetch = FetchType.EAGER)
    @OneToOne(fetch = FetchType.EAGER)
    private PersonalDetails personalDetails;

    @OneToOne(fetch = FetchType.EAGER)
    private Vector vector;

    @OneToMany
    private List<Pot> pot;



}
