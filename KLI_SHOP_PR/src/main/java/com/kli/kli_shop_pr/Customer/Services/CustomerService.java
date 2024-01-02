package com.kli.kli_shop_pr.Customer.Services;

import com.kli.kli_shop_pr.Customer.Exceptions.CustomerAlreadyExistsException;
import com.kli.kli_shop_pr.Customer.Exceptions.CustomerNotFoundException;
import com.kli.kli_shop_pr.Customer.Model.Customer;
import com.kli.kli_shop_pr.Customer.Repositories.CustomerRepo;
import com.kli.kli_shop_pr.Products.Model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomerService implements CustomerServiceInterface {

    private final CustomerRepo repository;

    @Autowired
    public CustomerService(CustomerRepo repository) {
        this.repository = repository;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }
    @Override
    public Customer getCustomerById(Long customerId) {
        return repository.findById(customerId)
                .orElseThrow( () -> new CustomerNotFoundException("Customer with "+ customerId + " not found in database"));
    }

    @Override
    public Customer addNewCustomer(Customer newCustomer) {
        if (customerAlreadyExists(newCustomer.getEmail())) {
            throw new CustomerAlreadyExistsException(newCustomer.getName() + " alreday exists");
        } else {
            return repository.save(newCustomer);
        }
    }

    private boolean customerAlreadyExists(String customerEmail) {
        return repository.findByEmail(customerEmail).isPresent();
    }


    @Override
    public Customer updateExistingCustomer(Customer changedCustomers, Long customerId) {
        return repository.findById(customerId).map(
                customer ->
                {
                    customer.setName(changedCustomers.getName());
                    customer.setSurname(changedCustomers.getSurname());
                    customer.setAge(changedCustomers.getAge());
                    customer.setEmail(changedCustomers.getEmail());
                    customer.setPhoneNumber(changedCustomers.getPhoneNumber());
                    customer.setGender(changedCustomers.getGender());
                    customer.setImageUrl(changedCustomers.getImageUrl());
                    return repository.save(customer);
                }
        ).orElseThrow(()-> new CustomerNotFoundException(changedCustomers.getName() + "not found in database"));
    }

    @Override
    public void removeExistingCustomer(Long customerId) {
        if (!repository.existsById(customerId)){
            throw new CustomerNotFoundException("Customer with "+ customerId + " not found in database");
        }else{
            repository.deleteById(customerId);
        }
    }

    @Override
    public Customer addNewProductsToCustomer(Long customerId, List<Product> newProducts) {

        Customer searchedCustomerToChange = repository.findById(customerId)
                .orElseThrow(()-> new CustomerNotFoundException("Customer with id: " + customerId + "not found in database"));

        List<Product> changedListOfProducts = new ArrayList<>(searchedCustomerToChange.getProducts());
        for (Product prod: newProducts){
            if ( searchedCustomerToChange.getProducts().contains(prod))
            {
                System.out.println("Product: " +  prod + " is already in customer products");
            }
            else{
                changedListOfProducts.add(prod);
            }
        }
        searchedCustomerToChange.setProducts(changedListOfProducts);
        return searchedCustomerToChange;
    }

    @Override
    public Customer changeCustomerProducts(Long customerId, List<Product> changedProducts) {
        Customer searchedCustomerToChange = repository.findById(customerId)
                .orElseThrow(()-> new CustomerNotFoundException("Customer with id: " + customerId + "not found in database"));

        List<Product> changedListOfProducts = new ArrayList<>(searchedCustomerToChange.getProducts());

        for (int i = 0; i < changedListOfProducts.size(); i++) {
            for (Product productToChange : changedProducts) {
                if (changedListOfProducts.get(i).getId().equals(productToChange.getId())) {
                    changedListOfProducts.set(i, productToChange);
                    break;
                } else {
                    System.out.println("It's not the same id");
                }
            }
        }
        searchedCustomerToChange.setProducts(changedListOfProducts);
        return searchedCustomerToChange;
    }
    @Override
    public  Customer removeProductsFromCustomer(Long customerId, List<Product> productsToRemoval){
        Customer searchedCustomerToChange = repository.findById(customerId)
                .orElseThrow(()-> new CustomerNotFoundException("Customer with id: " + customerId + "not found in database"));

        List<Product> changedListOfProducts = new ArrayList<>(searchedCustomerToChange.getProducts());
        for (Product prod: productsToRemoval){
            if ( searchedCustomerToChange.getProducts().contains(prod))
            {
                changedListOfProducts.remove(prod);
            }
            else{
                System.out.println("Product: " +  prod + " not found in customer products");
            }
        }
        searchedCustomerToChange.setProducts(changedListOfProducts);
        return searchedCustomerToChange;
    }
}
