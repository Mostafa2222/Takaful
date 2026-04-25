package com.takaful.services;

import com.takaful.entities.CardSettings;
import com.takaful.entities.CustomerCard;
import com.takaful.entities.Reward;
import com.takaful.entities.Transaction;
import com.takaful.enums.TransactionType;
import com.takaful.repositories.CardSettingsRepository;
import com.takaful.repositories.CustomerCardRepository;
import com.takaful.repositories.RewardRepository;
import com.takaful.repositories.TransactionRepository;
import com.takaful.requests.RedeemRequest;
import com.takaful.response.RedeemResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
@Service
@RequiredArgsConstructor
public class RedeemService {

    private final CustomerCardRepository ccRepo;
    private final RewardRepository rewardRepo;
    private final CardSettingsRepository settingsRepo;
    private final TransactionRepository txRepo;
    private final GoogleWalletService googleWalletService;
    private final LoyaltyEngineService engine;
    private final WalletSyncService walletSyncService;

    @Transactional
    public RedeemResponse redeem(RedeemRequest req) {

        CustomerCard cc = ccRepo.findByQrCode(req.getQrCode())
                .orElseThrow(() -> new RuntimeException("Invalid QR"));

        Reward reward = rewardRepo.findById(req.getRewardId())
                .orElseThrow(() -> new RuntimeException("Reward not found"));

        CardSettings settings = settingsRepo
                .findByCardId(cc.getCard().getId())
                .orElseThrow();

        validateRedeem(cc, reward, req, settings);

        int discount = engine.calculateDiscount(reward, req.getOrderValue());

        engine.applyRedeem(cc, reward);

        ccRepo.save(cc);

        walletSyncService.sync(cc);

        txRepo.save(Transaction.builder()
                .customerCard(cc)
                .type(TransactionType.REDEEM)
                .value(discount)
                .createdAt(LocalDateTime.now())
                .build());

        return buildResponse(req, discount, settings);
    }
    private void validateRedeem( CustomerCard cc, Reward reward, RedeemRequest req, CardSettings settings ) {

        if (!settings.isActive()) {
            throw new RuntimeException("Card disabled");
        }

        if (!reward.getCard().getId().equals(cc.getCard().getId())) {
            throw new RuntimeException("Invalid reward for this card");
        }

        if (cc.getStamps() < reward.getRequiredStamps()) {
            throw new RuntimeException("Not enough stamps");
        }

        if (req.getOrderValue() < reward.getMinOrderValue()) {
            throw new RuntimeException("Order value too low");
        }

        if (req.isOnline() && reward.isDisableForOnlineOrders()) {
            throw new RuntimeException("Not allowed online");
        }
    }

    private void safeWalletUpdate(CustomerCard cc) {
        try {
            googleWalletService.updateWalletObject(cc);
        } catch (Exception e) {
            System.out.println("Wallet update failed: " + e.getMessage());
        }
    }

    private RedeemResponse buildResponse( RedeemRequest req, int discount, CardSettings settings ) {

        int finalAmount = Math.max(0, req.getOrderValue() - discount);

        return RedeemResponse.builder()
                .success(true)
                .originalAmount(req.getOrderValue())
                .discountAmount(discount)
                .finalAmount(finalAmount)
                .message(settings.getRewardMessage())
                .build();
    }
}