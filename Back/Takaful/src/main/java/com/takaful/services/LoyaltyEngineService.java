package com.takaful.services;

import com.takaful.entities.CustomerCard;
import com.takaful.entities.Reward;
import com.takaful.enums.DiscountType;
import com.takaful.repositories.RewardRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoyaltyEngineService {

    private final RewardRepository rewardRepo;

    public Optional<Reward> findUnlockedReward( CustomerCard cc, int newStamps, int orderValue, boolean isOnline ) {
        List<Reward> rewards = rewardRepo.findByCardId(cc.getCard().getId());
        return rewards.stream()
                .sorted(Comparator.comparingInt(Reward::getRequiredStamps))
                .filter(r ->
                        newStamps >= r.getRequiredStamps()
                                && orderValue >= r.getMinOrderValue()
                                && (!isOnline || !r.isDisableForOnlineOrders())
                )
                .findFirst();
    }
    public Optional<Reward> processStamp( CustomerCard cc, int stamps, int orderValue, boolean isOnline ) {
        cc.setStamps(cc.getStamps() + stamps);
        cc.setLastStampAt(LocalDateTime.now());

        List<Reward> rewards = rewardRepo.findByCardId(cc.getCard().getId());

        return rewards.stream()
                .sorted(Comparator.comparingInt(Reward::getRequiredStamps))
                .filter(r ->
                        cc.getStamps() >= r.getRequiredStamps()
                                && orderValue >= r.getMinOrderValue()
                                && (!isOnline || !r.isDisableForOnlineOrders())
                )
                .findFirst();
    }

    public boolean canRedeem(CustomerCard cc, Reward reward, int orderValue, boolean isOnline) {

        if (cc.getStamps() < reward.getRequiredStamps()) return false;

        if (orderValue < reward.getMinOrderValue()) return false;

        if (isOnline && reward.isDisableForOnlineOrders()) return false;

        return true;
    }

    public int calculateDiscount(Reward reward, int orderValue) {

        if (reward.getDiscountType() == null) return 0;

        int discount = switch (reward.getDiscountType()) {

            case PercentagePerOrder, PercentagePerProduct ->
                    (orderValue * reward.getDiscountValue()) / 100;
            case FixedPerOrder, FixedPerProduct ->
                    reward.getDiscountValue();
            default -> 0;
        };

        if (reward.getMaxDiscount() != null) {
            discount = Math.min(discount, reward.getMaxDiscount());
        }

        return Math.min(Math.max(discount, 0), orderValue);
    }
    public void applyRedeem(CustomerCard cc, Reward reward) {

        cc.setStamps(cc.getStamps() % reward.getRequiredStamps());
        // أو:
        // cc.setStamps(0);
    }
}