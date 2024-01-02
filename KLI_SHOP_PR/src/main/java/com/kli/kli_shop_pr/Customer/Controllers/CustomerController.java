package com.kli.kli_shop_pr.Customer.Controllers;

import com.kli.kli_shop_pr.Customer.Model.Customer;
import com.kli.kli_shop_pr.Customer.Services.CustomerService;
import com.kli.kli_shop_pr.Customer.Services.CustomerService;
import com.kli.kli_shop_pr.Products.Model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService service;

    @Autowired
    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getCustomers() {
        return new ResponseEntity<>(service.getAllCustomers(), HttpStatus.FOUND);
    }

    @GetMapping("/get/{customerId}")
    public Customer getCustomerById(@PathVariable Long customerId) {
        return service.getCustomerById(customerId);
    }

    @PostMapping("/addNewCustomer")
    public Customer addCustomer(@RequestBody Customer newCustomer) {
        return service.addNewCustomer(newCustomer);
    }

    @PutMapping("/update/{customerId}")
    public Customer updateCustomer(@RequestBody Customer newCustomer, @PathVariable Long customerId) {
        return service.updateExistingCustomer(newCustomer, customerId);
    }
    @DeleteMapping("/delete/{customerId}")
    public void deleteCustomer(@PathVariable Long customerId) {
        service.removeExistingCustomer(customerId);
    }

//    Products Mapping
    @PostMapping("/addProducts/{customerId}")
    public Customer addNewProductsToCustomer(@PathVariable Long customerId, @RequestBody List<Product> newProducts) {
        return service.addNewProductsToCustomer(customerId, newProducts);
    }
    @PutMapping("/changeProducts/{customerId}")
    public Customer changeCustomerProducts(@PathVariable Long customerId, @RequestBody List<Product> changedProducts) {
        return service.changeCustomerProducts(customerId, changedProducts);
    }
    @PutMapping("/removeProducts/{customerId}")
    public Customer removeCustomerProducts(@PathVariable Long customerId, @RequestBody List<Product> productsToRemoval) {
        return service.removeProductsFromCustomer(customerId, productsToRemoval);
    }

}
