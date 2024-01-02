package com.kli.kli_shop_pr.Customer.Repositories;

import com.kli.kli_shop_pr.Customer.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String customerEmail);
}
