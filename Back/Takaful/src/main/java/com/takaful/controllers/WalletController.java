package com.takaful.controllers;

import com.takaful.mappers.WalletMapper;
import com.takaful.repositories.WalletRepository;
import com.takaful.repositories.WalletTransactionRepository;
import com.takaful.services.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/wallet")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;
    private final WalletRepository walletRepository;
    private final WalletTransactionRepository transactionRepository;
    private final WalletMapper walletMapper;

//    @GetMapping
//    public WalletDTO getWallet(@AuthenticationPrincipal User user) {
//        return walletMapper.toDto(walletService.getOrCreateWallet(user));
//    }

//    @GetMapping("/transactions")
//    public List<WalletTransactionDTO> getTransactions(
//            @AuthenticationPrincipal User user
//    ) {
//        Wallet wallet = walletService.getOrCreateWallet(user);
//        return transactionRepository.findByWalletId(wallet.getId())
//                .stream()
//                .map(walletMapper::toDto)
//                .toList();
//    }

//    @PostMapping("/topup")
//    public void topUp(
//            @AuthenticationPrincipal User user,
//            @RequestParam BigDecimal amount
//    ) {
//        walletService.credit(user, amount, "Wallet top up");
//    }
}
