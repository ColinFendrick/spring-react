package com.okta.developer.jugtours.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

import org.springframework.beans.factory.annotation.Value;

import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_employee", uniqueConstraints={@UniqueConstraint(columnNames={"name"})})
public class Employee {

  @Id
  @GeneratedValue
  private Long id;

  @NonNull
  private String name;

  @Value("${relationship:}")
  private String relationship;

  @Value("${isContractor:false}")
  private Boolean isContractor;

  @ManyToOne(cascade=CascadeType.PERSIST)
  private User user;

  @OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
  private Set<Event> events;
}
