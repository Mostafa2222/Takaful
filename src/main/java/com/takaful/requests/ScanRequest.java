package com.takaful.requests;

import lombok.Data;

@Data
public class ScanRequest {

    private String qrCode;

    private int orderValue;
    private boolean online;
    private int stamps = 1;
}
