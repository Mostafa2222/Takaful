package com.takaful.services;

import com.takaful.entities.CardSettings;
import com.takaful.entities.CustomerCard;
import com.takaful.entities.Reward;
import com.takaful.repositories.CardSettingsRepository;
import com.takaful.repositories.CustomerCardRepository;
import com.takaful.requests.ScanRequest;
import com.takaful.response.ScanResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScanService {

    private final CustomerCardRepository ccRepo;
    private final CardSettingsRepository settingsRepo;
    private final LoyaltyEngineService engine;
    private final GoogleWalletService googleWalletService;
    private final WalletSyncService walletSyncService;
    @Transactional
    public ScanResponse scan(ScanRequest req) {

        CustomerCard cc = ccRepo.findByQrCode(req.getQrCode())
                .orElseThrow(() -> new RuntimeException("Invalid QR"));

        CardSettings settings = settingsRepo
                .findByCardId(cc.getCard().getId())
                .orElseThrow();

        validateScan(cc, settings, req);

        int newStamps = cc.getStamps() + req.getStamps();

        Optional<Reward> unlocked = engine.findUnlockedReward(
                cc,
                newStamps,
                req.getOrderValue(),
                req.isOnline()
        );

        cc.setStamps(newStamps);
        cc.setLastStampAt(LocalDateTime.now());

        ccRepo.save(cc);

        walletSyncService.sync(cc);

        return buildScanResponse(cc, unlocked, settings);
    }

    private void safeWalletUpdate(CustomerCard cc) {
        try {
            googleWalletService.updateWalletObject(cc);
        } catch (Exception e) {
            System.out.println("Wallet update failed: " + e.getMessage());
        }
    }

    private void validateScan(CustomerCard cc, CardSettings settings, ScanRequest req) {

        if (!settings.isActive()) {
            throw new RuntimeException("Card disabled");
        }

        if (cc.getLastStampAt() != null) {

            long minutes = ChronoUnit.MINUTES.between(
                    cc.getLastStampAt(),
                    LocalDateTime.now()
            );

            if (minutes < settings.getStampDelayMinutes()) {
                throw new RuntimeException("Wait before next stamp");
            }
        }

        if (!settings.isAllowMultiStamps() && req.getStamps() > 1) {
            throw new RuntimeException("Only one stamp allowed");
        }
    }

    private ScanResponse buildScanResponse( CustomerCard cc, Optional<Reward> unlocked, CardSettings settings ) {

        if (unlocked.isPresent()) {

            Reward r = unlocked.get();

            return ScanResponse.builder()
                    .success(true)
                    .currentStamps(cc.getStamps())
                    .requiredStamps(r.getRequiredStamps())
                    .rewardUnlocked(true)
                    .rewardName(r.getName())
                    .message(settings.getRewardMessage())
                    .build();
        }

        return ScanResponse.builder()
                .success(true)
                .currentStamps(cc.getStamps())
                .rewardUnlocked(false)
                .message(settings.getStampMessage())
                .build();
    }
}
