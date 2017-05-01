package com.projects.springmongodb.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projects.springmongodb.domain.Customer;
import com.projects.springmongodb.domain.EmailAddress;
import com.projects.springmongodb.repo.CustomerRepository;
import com.projects.springmongodb.repo.EmailAddressRepository;

@RestController
public class CustomerController {

	@Autowired
	private CustomerRepository repo;

	@Autowired
	private EmailAddressRepository repoEmail;

	@GetMapping("/")
	public List<Customer> index() {
		repo.deleteAll();
		EmailAddress email = new EmailAddress("zouhairireda@gmail.com");
		email.setId("id1");
		repoEmail.save(email);

		repo.save(new Customer("Dounia", "Zouhairireda", email));
		System.out.println(repoEmail.findAll().get(0));

		TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(String.valueOf("Zouhairi"));
		TextCriteria criteria2 = TextCriteria.forDefaultLanguage().matching(String.valueOf("Zouhairi"));

		return repo.findAll();
	}
}
