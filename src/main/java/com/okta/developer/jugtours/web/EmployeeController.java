package com.okta.developer.jugtours.web;

import com.okta.developer.jugtours.model.EmployeeRepository;
import com.okta.developer.jugtours.model.Employee;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
// import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class EmployeeController {
  private EmployeeRepository employeeRepository;
  
  public EmployeeController(EmployeeRepository employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  @GetMapping("/employees")
  Collection<Employee> employees() {
    return employeeRepository.findAll();
  }

  @GetMapping("/employee/{id}")
  ResponseEntity<?> getEmployee(@PathVariable Long id) {
    Optional<Employee> employee = employeeRepository.findById(id);
    return employee.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping("/employee")
  ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee) throws URISyntaxException {
    Employee result = employeeRepository.save(employee);
    return ResponseEntity.created(new URI("/api/employee/" + result.getId())).body(result);
  }

  @PutMapping("/employee/{id}")
  ResponseEntity<Employee> updateEmployee(@Valid @RequestBody Employee employee) {
    Employee result = employeeRepository.save(employee);
    return ResponseEntity.ok().body(result);
  }

  @DeleteMapping("/employee/{id}")
  public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
    employeeRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }
}
