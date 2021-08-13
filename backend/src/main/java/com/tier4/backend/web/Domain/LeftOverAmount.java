package com.tier4.backend.web.Domain;


import lombok.*;

import javax.persistence.*;

@Entity(name = "leftOverAmount")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class LeftOverAmount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leftOverId;

    @Column(updatable = false,nullable = false)
    private Double leftOver;

    private String phoneNumber;

}
