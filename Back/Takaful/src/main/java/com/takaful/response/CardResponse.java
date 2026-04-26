package com.takaful.response;

import com.takaful.dtos.CardTypeDTO;
import com.takaful.dtos.CardDesignDTO;
import com.takaful.dtos.RewardDTO;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class CardResponse {

    private UUID id;
    private String name;
    private String displayName;
    private String description;
    private String status;


    private CardTypeDTO cardType;

    private CardDesignDTO design;
    private CardSettingsDTO settings;
    private List<RewardDTO> rewards;
}
