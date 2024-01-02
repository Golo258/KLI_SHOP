package com.kli.kli_shop_pr.Products.Exceptions;

public class ResponseException extends Throwable {
    public ResponseException(String exceptionMessage) {
        super(exceptionMessage);
    }
}
