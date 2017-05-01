package com.projects.springmongodb.repo;

import java.util.List;

import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.projects.springmongodb.domain.Customer;
import com.projects.springmongodb.domain.EmailAddress;

public interface EmailAddressRepository extends MongoRepository<EmailAddress, String> {

    List<EmailAddress> findAllBy(TextCriteria criteria);

}
