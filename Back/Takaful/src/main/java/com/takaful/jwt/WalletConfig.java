package com.takaful.jwt;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "wallet")
@Data
public class WalletConfig {
    private String issuerId;
}
