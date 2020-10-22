package com.okta.developer.jugtours.web;

import com.okta.developer.jugtours.model.EmployeeRepository;
import com.okta.developer.jugtours.model.Employee;
import com.okta.developer.jugtours.model.User;
import com.okta.developer.jugtours.model.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class EmployeeController {
  private EmployeeRepository employeeRepository;
  private UserRepository userRepository;
  
  public EmployeeController(EmployeeRepository employeeRepository, UserRepository userRepository) {
    this.employeeRepository = employeeRepository;
    this.userRepository = userRepository;
  }

  @GetMapping("/employees")
  Collection<Employee> employees(Principal principal) {
    return employeeRepository.findAllByUserId(principal.getName());
  }

  @GetMapping("/employee/{id}")
  ResponseEntity<?> getEmployee(@PathVariable Long id) {
    Optional<Employee> employee = employeeRepository.findById(id);
    return employee.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping("/employee")
  ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee, 
      @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
    Map<String, Object> details = principal.getAttributes();
    String userId = details.get("sub").toString();

    Optional<User> user = userRepository.findById(userId);
    employee.setUser(user.orElse(new User(userId, details.get("name").toString(), details.get("email").toString())));

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
    return ResponseEntity.ok().body(id);
  }
}
