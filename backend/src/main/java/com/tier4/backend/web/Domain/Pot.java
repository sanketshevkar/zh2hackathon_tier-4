package com.tier4.backend.web.Domain;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "pot")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class Pot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "varchar (250)")
    private String title;
    @Column(columnDefinition = "varchar (250)")
    private String description;
    private Double currentAmount;
    private Double amount;
    // {mm/dd/hh} format

    @Column(updatable = true)
    private String timeLeft;
    private String totalTime;
    private Boolean autoDeduct;

    @Column(columnDefinition = "varchar (250)")
    private String imageLink;

    @Column(nullable = true)
    private Double weight;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
