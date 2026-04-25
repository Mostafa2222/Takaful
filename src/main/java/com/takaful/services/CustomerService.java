package com.takaful.services;

import com.takaful.entities.Customer;
import com.takaful.repositories.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private final CustomerRepository repo;

    public CustomerService(CustomerRepository repo) {
        this.repo = repo;
    }

    public Customer create(Customer customer) {

//        if (repo.existsByPhoneNumber(customer.getPhoneNumber())) {
//            throw new DuplicatePhoneException("رقم الهاتف مستخدم بالفعل");
//        }
        return repo.save(customer);
    }
}

