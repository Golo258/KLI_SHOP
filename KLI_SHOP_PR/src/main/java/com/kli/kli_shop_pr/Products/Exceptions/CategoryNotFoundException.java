package com.kli.kli_shop_pr.Products.Exceptions;

public class CategoryNotFoundException extends  Throwable{

    public CategoryNotFoundException(String exceptionMessage){
        super(exceptionMessage);
    }
}
