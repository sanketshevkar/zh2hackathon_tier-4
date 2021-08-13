package com.tier4.backend.Utils;

import com.tier4.backend.web.Domain.Application;
import com.tier4.backend.web.Domain.Pot;
import com.tier4.backend.web.Domain.Vector;
import com.tier4.backend.web.Model.OnBoarding.Application.Request.ApplicationDto;
import com.tier4.backend.web.Model.OnBoarding.VectorsDto;
import com.tier4.backend.web.Model.Pot.PotDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class Converter {


    public  Vector vectorDtoToEntity(VectorsDto vectorsDto){

        return Vector.builder()
                .type(vectorsDto.getType())
                .value(vectorsDto.getValue()).build();
    }

    public static PotDto potToPotDto(Pot pot){

       return PotDto.builder()
               .amount(pot.getAmount())
               .autoDeduct(pot.getAutoDeduct())
               .description(pot.getDescription())
               .currentAmount(pot.getCurrentAmount())
               .remainingTime(pot.getTimeLeft())
               .eta(pot.getTotalTime())
               .title(pot.getTitle())
               .id(pot.getId())
               .weight(pot.getWeight())
               .amount(pot.getAmount())
               .imageLink(pot.getImageLink())
               .build();
    }
}
