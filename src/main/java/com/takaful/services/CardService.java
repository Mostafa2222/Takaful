package com.takaful.services;

import com.takaful.dtos.CardDesignDTO;
import com.takaful.dtos.RewardDTO;
import com.takaful.entities.*;
import com.takaful.enums.CardStatus;
import com.takaful.exceptions.DuplicateResourceException;
import com.takaful.mappers.CardMapper;
import com.takaful.repositories.CardTypeRepository;
import com.takaful.requests.CreateCardRequest;
import com.takaful.response.CardResponse;
import com.takaful.repositories.CardRepository;
import com.takaful.response.CardSettingsDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final CardTypeRepository cardTypeRepository;
    private final CardMapper cardMapper;
    public CardResponse createCard(CreateCardRequest request) {

        boolean exists = cardRepository.existsByNameAndCardType_Id(
                request.getName(),
                request.getCardTypeId()
        );

        if (exists) {
            throw new DuplicateResourceException("الكارت موجود بالفعل بنفس الاسم والنوع");
        }
        CardType cardType = cardTypeRepository.findById(request.getCardTypeId())
                .orElseThrow(() -> new RuntimeException("Card type not found"));
        Card card = Card.builder()
                .name(request.getName())
                .cardType(cardType)
                .displayName(request.getDisplayName())
                .description(request.getDescription())
                .status(CardStatus.valueOf("DRAFT"))
                .build();

        // 🔥 Design
        CardDesign design = CardDesign.builder()
                .card(card)
                .logoUrl(request.getDesign().getLogoUrl())
                .logoInsideUrl(request.getDesign().getLogoInsideUrl())
                .stampBackgroundUrl(request.getDesign().getStampBackgroundUrl())
                .primaryColor(request.getDesign().getPrimaryColor())
                .textColor(request.getDesign().getTextColor())
                .headerColor(request.getDesign().getHeaderColor())
                .slogan(request.getDesign().getSlogan())
                .welcomeMessage(request.getDesign().getWelcomeMessage())
                .build();

        // 🔥 Settings
        CardSettings settings = CardSettings.builder()
                .card(card)
                .showCustomerName(request.getSettings().isShowCustomerName())
                .enableInvoice(request.getSettings().isEnableInvoiceNumber())
                .allowMultiStamps(request.getSettings().isAllowMultiStamps())
                .active(request.getSettings().isActive())
                .stampDelayMinutes(request.getSettings().getStampDelayMinutes())
                .giftText(request.getSettings().getGiftText())
                .stampMessage(request.getSettings().getStampMessage())
                .rewardMessage(request.getSettings().getRewardMessage())
                .build();

        card.setDesign(design);
        card.setSettings(settings);

        // 🔥 Rewards
        if (request.getRewards() != null) {

            List<Reward> rewards = request.getRewards().stream().map(r ->

                    Reward.builder()
                            .card(card)
                            .name(r.getName())
                            .requiredStamps(r.getRequiredStamps())
                            .minOrderValue(r.getMinOrderValue())
                            .maxStampPerOrder(r.getMaxStampPerOrder())
                            .daysUntilExpiry(r.getDaysUntilExpiry())
                            .allowWithDiscount(r.isAllowDiscounts())
                            .disableForOnlineOrders(r.isDisallowStamps())
                            .discountType(r.getDiscountType())
                            .discountValue(r.getDiscountValue())
                            .applyOnAddons(r.isAllowModifierDiscount())
                            .beforeImage(r.getBeforeImage())
                            .afterImage(r.getAfterImage())
                            .build()

            ).toList();

            card.setRewards(rewards);
        }

        cardRepository.save(card);

        return cardMapper.toResponse(card);
    }


    public CardResponse activate(UUID id) {
        Card card = cardRepository.findById(id).orElseThrow();

        card.setStatus(CardStatus.valueOf("ACTIVE"));

        cardRepository.save(card);

        return cardMapper.toResponse(card);
    }

    public List<CardResponse> getAllCards() {
        return cardRepository.findAllWithDetails()
                .stream()
                .map(cardMapper::toResponse)
                .toList();
    }

    public CardResponse getById(UUID id) {

        Card card = cardRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new DuplicateResourceException("الكارت غير موجود"));

        return cardMapper.toResponse(card);
    }

    public void deleteCard(UUID id) {
        if (!cardRepository.existsById(id)) {
            throw new DuplicateResourceException("الكارت غير موجود");
        }
        cardRepository.deleteById(id);
    }

    @Transactional
    public CardResponse updateCard(UUID id, CreateCardRequest request) {

        Card card = cardRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new RuntimeException("الكارت غير موجود"));

        boolean exists = cardRepository.existsByNameAndCardType_IdAndIdNot(
                request.getName(),
                request.getCardTypeId(),
                id
        );

        if (exists) {
            throw new DuplicateResourceException("الكارت موجود بالفعل بنفس الاسم والنوع");
        }

        card.setName(request.getName());
        card.setDisplayName(request.getDisplayName());
        card.setDescription(request.getDescription());

        CardType type = cardTypeRepository.findById(request.getCardTypeId())
                .orElseThrow(() -> new RuntimeException("نوع الكارت غير موجود"));

        card.setCardType(type);

        updateDesign(card, request.getDesign());

        updateSettings(card, request.getSettings());

        if (request.getRewards() != null) {
            updateRewards(card, request.getRewards());
        }

        Card saved = cardRepository.save(card);
        return cardMapper.toResponse(saved);
    }

    private void updateDesign(Card card, CardDesignDTO dto) {

        CardDesign design = card.getDesign();

        if (design == null) {
            design = new CardDesign();
            design.setCard(card);
        }

        design.setLogoUrl(dto.getLogoUrl());
        design.setLogoInsideUrl(dto.getLogoInsideUrl());
        design.setStampBackgroundUrl(dto.getStampBackgroundUrl());

        design.setPrimaryColor(dto.getPrimaryColor());
        design.setTextColor(dto.getTextColor());
        design.setHeaderColor(dto.getHeaderColor());

        design.setSlogan(dto.getSlogan());
        design.setWelcomeMessage(dto.getWelcomeMessage());

        card.setDesign(design);
    }

    private void updateSettings(Card card, CardSettingsDTO dto) {

        CardSettings settings = card.getSettings();

        if (settings == null) {
            settings = new CardSettings();
            settings.setCard(card);
        }

        settings.setShowCustomerName(dto.isShowCustomerName());
        settings.setEnableInvoice(dto.isEnableInvoiceNumber());
        settings.setAllowMultiStamps(dto.isAllowMultiStamps());
        settings.setActive(dto.isActive());

        settings.setStampDelayMinutes(dto.getStampDelayMinutes());

        settings.setStampMessage(dto.getStampMessage());
        settings.setRewardMessage(dto.getRewardMessage());
        settings.setGiftText(dto.getGiftText());

        card.setSettings(settings);
    }

    private void updateRewards(Card card, List<RewardDTO> dtos) {

        card.getRewards().clear();

        if (dtos == null) return;

        for (RewardDTO dto : dtos) {

            Reward r = new Reward();

            r.setCard(card);

            r.setName(dto.getName());
            r.setRequiredStamps(dto.getRequiredStamps());

            r.setMinOrderValue(dto.getMinOrderValue());
            r.setMaxStampPerOrder(dto.getMaxStampPerOrder());
            r.setDaysUntilExpiry(dto.getDaysUntilExpiry());

            r.setAllowWithDiscount(dto.isAllowDiscounts());
            r.setDisableForOnlineOrders(dto.isDisallowStamps());

            r.setDiscountValue(dto.getDiscountValue());
            r.setMaxDiscount(dto.getMaxDiscount());

            if (dto.getDiscountType() != null) {
                try {
                    r.setDiscountType(dto.getDiscountType());
                } catch (Exception e) {
                    throw new RuntimeException("نوع الخصم غير صالح");
                }
            }

            r.setApplyOnAddons(dto.isAllowModifierDiscount());

            r.setBeforeImage(dto.getBeforeImage());
            r.setAfterImage(dto.getAfterImage());

            r.setCreditType(dto.getCreditType());
            r.setProductIds(dto.getProductIds());

            card.getRewards().add(r);
        }
    }
}
