package com.tier4.backend.web.Domain;


import lombok.*;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Setter
@Getter
@Entity(name = "application")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer applicationId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String dob;

    @OneToMany
    private List<Vector> vectors;


}
