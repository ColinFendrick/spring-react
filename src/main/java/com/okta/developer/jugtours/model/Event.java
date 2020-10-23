package com.okta.developer.jugtours.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Event {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String date;

    @NonNull
    private String title;

    private String description;

    @ManyToMany
    private Set<User> attendees;
}
