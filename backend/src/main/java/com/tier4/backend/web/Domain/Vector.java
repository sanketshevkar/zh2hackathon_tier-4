package com.tier4.backend.web.Domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Table(name = "vector")
public class Vector {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long vectorId;

    @Column(nullable = true,name = "type",columnDefinition = "varchar(10)",updatable = true,unique = false)
    private String type;

    @Column(nullable = false,name = "value",columnDefinition = "varchar(20)",updatable = true,unique = false)
    private String value;


//    @ManyToOne
//    @JoinColumn(name = "userId")
    @OneToOne(fetch = FetchType.EAGER)
    private User user;

    private String leftOver;

    private String prevAvg;

    private Double totalDays;

    @Column(nullable = true,unique = false)
    private int multiplier;

    @Column(columnDefinition = "varchar(200)")
    private String individualID;

    @Column(columnDefinition = "varchar(200)")
    private String accountID;

    private String twilioToken;
}
