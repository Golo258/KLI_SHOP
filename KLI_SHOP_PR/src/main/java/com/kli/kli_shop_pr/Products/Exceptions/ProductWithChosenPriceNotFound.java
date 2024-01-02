package com.kli.kli_shop_pr.Products.Exceptions;

public class ProductWithChosenPriceNotFound extends  Throwable{
    public ProductWithChosenPriceNotFound(String exceptionMessage) {
        super(exceptionMessage);
    }
}
