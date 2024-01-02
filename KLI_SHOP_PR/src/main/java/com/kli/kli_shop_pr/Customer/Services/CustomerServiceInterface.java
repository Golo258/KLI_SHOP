package com.kli.kli_shop_pr.Customer.Services;

import com.kli.kli_shop_pr.Customer.Exceptions.CustomerNotFoundException;
import com.kli.kli_shop_pr.Customer.Model.Customer;
import com.kli.kli_shop_pr.Products.Model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CustomerServiceInterface {
    Customer addNewCustomer(Customer newCustomer);
    List<Customer> getAllCustomers();
    Customer updateExistingCustomer(Customer changedCustomers, Long customerId) throws CustomerNotFoundException;
    Customer getCustomerById(Long customerId);
    Customer addNewProductsToCustomer(Long customerId, List<Product>  products);

    Customer changeCustomerProducts(Long customerId, List<Product> changedProducts);

    Customer removeProductsFromCustomer(Long customerId, List<Product> productsToRemoval);

    void removeExistingCustomer(Long customerId);

}
