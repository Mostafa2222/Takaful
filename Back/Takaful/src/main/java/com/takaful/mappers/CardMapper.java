package com.takaful.mappers;

import com.takaful.dtos.CardDesignDTO;
import com.takaful.dtos.CardTypeDTO;
import com.takaful.dtos.RewardDTO;
import com.takaful.entities.*;
import com.takaful.response.CardResponse;
import com.takaful.response.CardSettingsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CardMapper {

    @Mapping(target = "cardType", source = "cardType")
    @Mapping(target = "status", expression = "java(card.getStatus() != null ? card.getStatus().name() : null)")
    @Mapping(target = "design", source = "design")
    @Mapping(target = "settings", source = "settings")
    @Mapping(target = "rewards", source = "rewards")
    CardResponse toResponse(Card card);

    CardTypeDTO toCardTypeDTO(CardType cardType);

    CardDesignDTO toDesign(CardDesign design);

    CardSettingsDTO toSettings(CardSettings settings);

    List<RewardDTO> toRewards(List<Reward> rewards);

    @Mapping(target = "allowDiscounts", source = "allowWithDiscount")
    @Mapping(target = "disallowStamps", source = "disableForOnlineOrders")
    @Mapping(target = "allowModifierDiscount", source = "applyOnAddons")
    RewardDTO toReward(Reward r);
}
