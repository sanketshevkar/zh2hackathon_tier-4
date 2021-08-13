package com.tier4.backend.web.Model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;


@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Attrs {

}
