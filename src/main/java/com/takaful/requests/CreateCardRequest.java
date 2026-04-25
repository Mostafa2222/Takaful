package com.takaful.requests;

import com.takaful.dtos.CardDesignDTO;
import com.takaful.dtos.RewardDTO;
import com.takaful.response.CardSettingsDTO;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class CreateCardRequest {

    @NotBlank
    private String name;
    private Long cardTypeId;
    private String displayName;
    private String description;

    private CardDesignDTO design;
    private CardSettingsDTO settings;

    private List<RewardDTO> rewards;
}
