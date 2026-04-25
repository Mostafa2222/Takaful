package com.takaful.services;

import com.takaful.entities.CustomerCard;
import com.takaful.entities.Reward;
import com.takaful.repositories.CardRepository;
import com.takaful.repositories.CustomerCardRepository;
import com.takaful.repositories.RewardRepository;
import com.takaful.response.RewardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class RewardService {

    private final RewardRepository repo;
    private final CardRepository cardRepo;
    private final CustomerCardRepository customerCardRepo;


    public List<RewardResponse> getByCard(UUID cardId) {
        return repo.findByCardId(cardId)
                .stream()
                .map(this::map)
                .toList();
    }

    private RewardResponse map(Reward r) {
        return RewardResponse.builder()
                .id(r.getId())
                .name(r.getName())
                .requiredStamps(r.getRequiredStamps())
                .discountType(String.valueOf(r.getDiscountType()))
                .maxDiscount(r.getMaxDiscount())
                .build();
    }

    public Optional<Reward> checkReward(CustomerCard cc) {

        List<Reward> rewards = repo.findByCardId(cc.getCard().getId());

        return rewards.stream()
                .filter(r -> cc.getStamps() >= r.getRequiredStamps())
                .findFirst();
    }

    public boolean canRedeem( CustomerCard cc, Reward reward, int orderValue, boolean isOnline ) {

        if (cc.getStamps() < reward.getRequiredStamps()) return false;

        if (orderValue < reward.getMinOrderValue()) return false;

        return !isOnline || !reward.isDisableForOnlineOrders();
    }

    public void redeem(UUID ccId, UUID rewardId) {

        CustomerCard cc = customerCardRepo.findById(ccId).orElseThrow();
        Reward reward = repo.findById(rewardId).orElseThrow();

        if (cc.getStamps() < reward.getRequiredStamps()) {
            throw new RuntimeException("Not enough stamps");
        }

        cc.setStamps(cc.getStamps() - reward.getRequiredStamps());

        customerCardRepo.save(cc);
    }
}
