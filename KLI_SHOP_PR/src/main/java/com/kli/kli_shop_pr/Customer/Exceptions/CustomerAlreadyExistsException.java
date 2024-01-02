package com.kli.kli_shop_pr.Customer.Exceptions;

public class CustomerAlreadyExistsException extends RuntimeException {

    public CustomerAlreadyExistsException(String exceptionMessage) {
        super(exceptionMessage);
    }
}
