package com.kli.kli_shop_pr.Customer.Exceptions;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException(String exceptionMessage) {
        super(exceptionMessage);
    }
}
