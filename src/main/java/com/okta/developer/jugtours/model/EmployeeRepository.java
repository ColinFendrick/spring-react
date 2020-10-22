package com.okta.developer.jugtours.model;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
  List<Employee> findAllByUserId(String id);
}
