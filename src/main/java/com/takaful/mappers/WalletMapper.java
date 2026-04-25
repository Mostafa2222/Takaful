package com.takaful.mappers;

import com.takaful.entities.Wallet;
import com.takaful.entities.WalletTransaction;
import com.takaful.dtos.WalletDTO;
import com.takaful.dtos.WalletTransactionDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WalletMapper {

    WalletDTO toDto(Wallet wallet);

    WalletTransactionDTO toDto(WalletTransaction tx);
}
