package com.takaful.services;

import com.takaful.user.entities.User;
import com.takaful.entities.Wallet;
import com.takaful.entities.WalletTransaction;
import com.takaful.enums.WalletTransactionType;
import com.takaful.repositories.WalletRepository;
import com.takaful.repositories.WalletTransactionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;
    private final WalletTransactionRepository transactionRepository;

    /**
     * Get or create wallet for user
     */
    public Wallet getOrCreateWallet(User user) {
        Wallet wallet = walletRepository.findByUserId(user.getId());
        if (wallet == null) {
            wallet = new Wallet();
            wallet.setUser(user);
            wallet.setBalance(BigDecimal.ZERO);
            walletRepository.save(wallet);
        }
        return wallet;
    }

    /**
     * Credit wallet
     */
    @Transactional
    public void credit(User user, BigDecimal amount, String reason) {

        Wallet wallet = getOrCreateWallet(user);

        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);

        WalletTransaction tx = new WalletTransaction();
        tx.setWallet(wallet);
        tx.setAmount(amount);
        tx.setType(WalletTransactionType.CREDIT);
        tx.setReason(reason);

        transactionRepository.save(tx);
    }

    /**
     * Debit wallet (SAFE)
     */
    @Transactional
    public void debit(User user, BigDecimal amount, String reason) {
        Wallet wallet = getOrCreateWallet(user);

        if (wallet.getBalance().compareTo(amount) < 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Insufficient wallet balance"
            );
        }

        wallet.setBalance(wallet.getBalance().subtract(amount));
        walletRepository.save(wallet);

        WalletTransaction tx = new WalletTransaction();
        tx.setWallet(wallet);
        tx.setAmount(amount);
        tx.setType(WalletTransactionType.DEBIT);
        tx.setReason(reason);
        transactionRepository.save(tx);
    }
}
