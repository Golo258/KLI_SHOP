package com.kli.kli_shop_pr.Products.Exceptions;

public class ProductNotFoundException extends  Throwable{

    public ProductNotFoundException(String exceptionMessage) {
        super(exceptionMessage);
    }
}
