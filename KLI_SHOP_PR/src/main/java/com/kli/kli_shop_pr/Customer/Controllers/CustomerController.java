package com.kli.kli_shop_pr.Customer.Controllers;

import com.kli.kli_shop_pr.Customer.Model.Customer;
import com.kli.kli_shop_pr.Customer.Services.CustomerService;
import com.kli.kli_shop_pr.Customer.Services.CustomerService;
import com.kli.kli_shop_pr.Products.Model.Product;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/customers")
@Tag(name = "CustomerController", description = "To perform operations on customers")
public class CustomerController {

    private final CustomerService service;

    @Autowired
    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @Operation(
            summary = "Get List of all customers",
            description = "Used to collect all customers bodies in List"
    )
    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getCustomers() {
        return new ResponseEntity<>(service.getAllCustomers(), HttpStatus.FOUND);
    }

    @Operation(
            summary = "Get Customer By Its Id",
            description = "Used to collect singular customer model based on its id"
    )
    @GetMapping("/get/{customerId}")
    public Customer getCustomerById(@PathVariable Long customerId) {
        return service.getCustomerById(customerId);
    }

    @Operation(
            summary = "Post New Customer",
            description = "Used to pass customer body in order to create new customer in database"
    )
    @PostMapping("/addNewCustomer")
    public Customer addCustomer(@RequestBody Customer newCustomer) {
        return service.addNewCustomer(newCustomer);
    }

    @Operation(
            summary = "Put Request- Change one existing customer taken by it id",
            description = "Change existing customer fields and set it to database"
    )
    @PutMapping("/update/{customerId}")
    public Customer updateCustomer(@RequestBody Customer newCustomer, @PathVariable Long customerId) {
        return service.updateExistingCustomer(newCustomer, customerId);
    }

    @Operation(
            summary = "Delete existing customer by its id",
            description = "Remove existing customer by its id, cannot undo this operation"
    )
    @DeleteMapping("/delete/{customerId}")
    public void deleteCustomer(@PathVariable Long customerId) {
        service.removeExistingCustomer(customerId);
    }

    @Operation(
            summary = "Post request which add list of products to customer",
            description = "Request which add products into a specific customer by its id"
    )
    //    Products Mapping
    @PostMapping("/addProducts/{customerId}")
    public Customer addNewProductsToCustomer(@PathVariable Long customerId, @RequestBody List<Product> newProducts) {
        return service.addNewProductsToCustomer(customerId, newProducts);
    }
    @Operation(
            summary = "Put request- which update list of customer products",
            description = "Request which update list of products for a specific customer taken by its id"
    )
    @PutMapping("/changeProducts/{customerId}")
    public Customer changeCustomerProducts(@PathVariable Long customerId, @RequestBody List<Product> changedProducts) {
        return service.changeCustomerProducts(customerId, changedProducts);
    }

    @Operation(
            summary = "Put Request- which update customer list by removing its products",
            description = "Request which remove all products from customer products list"
    )
    @PutMapping("/removeProducts/{customerId}")
    public Customer removeCustomerProducts(@PathVariable Long customerId, @RequestBody List<Product> productsToRemoval) {
        return service.removeProductsFromCustomer(customerId, productsToRemoval);
    }

}
