package com.tier4.backend.BootStrap;


import com.tier4.backend.web.Domain.Pot;
import com.tier4.backend.web.Domain.Vector;
import com.tier4.backend.web.Model.Pot.PotDto;

import java.util.List;

public class MarketPlace {

   public static final List<PotDto> marketPlacePot = List.of(

                                PotDto.builder()
                                        .title("Netflix Mobile-only plan")
                                        .description("1-screen support, HD content, mobile-only")
                                        .amount(199.0)
                                        .autoDeduct(true)
                                        .eta("30")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/netflix_PNG22.png")
                                        .build(),

                                PotDto.builder()
                                        .title("Netflix Basic plan")
                                        .description("1-screen support, HD content, access across all platforms")
                                        .amount(499.0)
                                        .autoDeduct(true)
                                        .eta("30")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/netflix_PNG22.png")
                                        .build(),

                                PotDto.builder()
                                        .title("Netflix Standard plan")
                                        .description("2-screen support, HD content, access across all platforms")
                                        .amount(649.0)
                                        .autoDeduct(true)
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/netflix_PNG22.png")
                                        .build(),   
                                        
                                PotDto.builder()
                                        .title("Netflix Premium plan")
                                        .description("4-screen support, HD content, access across all platforms")
                                        .amount(799.0)
                                        .autoDeduct(true)
                                        .eta("30")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/netflix_PNG22.png")
                                        .build(), 

                                PotDto.builder()
                                        .title("Zomato Pro Membership - 3 Month Membership")
                                        .description("Valid for 3 Months\nValid across India\nZomato Gold experience.\nUp to 40% off\nOne free dish\nTwo free drinks")
                                        .amount(200.0)
                                        .autoDeduct(true)
                                        .eta("45")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/HEADER_FINAL.png")
                                        .build() ,
                                          
                                PotDto.builder()
                                        .title("Swiggy Binge - 1 month membership")
                                        .description("The Swiggy Super Binge plan provides unlimited free deliveries from any restaurant for a month. Additionally, \nusers will get buy one get one offer from popular restaurants with this plan.")
                                        .amount(329.0)
                                        .autoDeduct(true)
                                        .eta("35")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/Swiggy-PNG-Logo-1024x1024.png")
                                        .build(),
                                        
                                PotDto.builder()
                                        .title("Swiggy Bite - 1 month membership")
                                        .description("	As part of this plan, users will be able to avail 10 free deliveries from restaurants within five kilometres of their location.")
                                        .amount(169.0)
                                        .autoDeduct(true)
                                        .eta("30")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/Swiggy-PNG-Logo-1024x1024.png")
                                        .build(),
                                
                                PotDto.builder()
                                        .title("Zomato Pro Membership - Annual Pro Membership")
                                        .description("All Pro benefits valid for 12 Months\nValid across India\nZomato Gold experience.\nUp to 40% off\nOne free dish\nTwo free drinks")
                                        .amount(750.0)
                                        .autoDeduct(true)
                                        .eta("25")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/HEADER_FINAL.png")
                                        .build(),

                                PotDto.builder()
                                        .title("AXIS SIP: Mirae Asset Tax Saver Fund - Regular Plan")
                                        .description("Regular Plan\n3Yr Return (%)19.41(Annualised)\nRisk Category High\nNAV(₹​)29.344 As of 12-Aug-2021\nExisting Since 6 Years")
                                        .amount(900.0)
                                        .autoDeduct(true)
                                        .eta("120")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-08-13+at+01.29.52.jpeg")
                                        .build(),

                                PotDto.builder()
                                        .title("AXIS SIP: Mirae Asset Tax Saver Fund - Regular Plan")
                                        .description("Regular Plan\n3Yr Return (%)19.41(Annualised)\nRisk Category High\nNAV(₹​)29.344 As of 12-Aug-2021\nExisting Since 6 Years")
                                        .amount(900.0)
                                        .autoDeduct(true)
                                        .eta("90")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-08-13+at+01.29.52.jpeg")
                                        .build(),
                                
                                PotDto.builder()
                                        .title("Pugmarks Kasol Kheerganga Experiential Camps")
                                        .description("A trek to take all your friends along or just make new friends on this journey of exploring the valleys in the laps of the Himalayas. As breathtaking views sway you off your feet, the Pahadi winds will win your hearts. Age Group 12 to 60 years")
                                        .amount(19500.0)
                                        .autoDeduct(true)
                                        .eta("200")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-08-13+at+10.11.04.jpeg")
                                        .build(),

                                PotDto.builder()
                                        .title("Pugmarks Valley Of Flowers Special Interest Camps")
                                        .description("Targeted for our campers who have a Special Interest to achieve or experience specific goals in mind. One of a kind activities or remote destinations is a highlight of this category.Only rest-time is when you sleep, otherwise outdoors await!  Age Group 12 to 60 years")
                                        .amount(19200.0)
                                        .autoDeduct(true)
                                        .eta("170")
                                        .imageLink("https://hackrx.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-08-13+at+10.11.04.jpeg")
                                        .build()

                             );

}

