package com.okta.developer.jugtours.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_employee")
public class Employee {
  @Id
  @GeneratedValue
  private Long id;
  @NonNull
  private String name;
  @ManyToOne(cascade=CascadeType.PERSIST)
  private User user;

  @OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
  private Set<Event> events;
}
