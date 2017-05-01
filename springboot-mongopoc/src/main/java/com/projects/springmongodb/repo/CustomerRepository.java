package com.projects.springmongodb.repo;

import java.util.List;

import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.projects.springmongodb.domain.Customer;

public interface CustomerRepository extends MongoRepository<Customer, String> {
	
	public Customer findByFirstName(String firstName);
	
	public List<Customer> findByLastName(String lastName);
	
    List<Customer> findAllBy(TextCriteria criteria);

}
