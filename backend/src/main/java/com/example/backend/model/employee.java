package com.example.backend.model;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (nullable = false, updatable = false)
    private Long id ;
    private String Name;
    private String email;
    private String phone;
    private String jobTitle;
    private String Departement;
    private String imageUrl;

    public employee() {}

    public employee(String name, String email, String phone, String jobTitle, String departement, String imageUrl) {
        this.Name = name;
        this.email = email;
        this.phone = phone;
        this.jobTitle = jobTitle;
        this.Departement = departement;
        this.imageUrl = imageUrl;
        this.id = 0L;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return Name;
    }
    public void setName(String name) {
        Name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getJobTitle() {
        return jobTitle;
    }
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }
    public String getDepartement() {
        return Departement;
    }
    public void setDepartement(String departement) {
        Departement = departement;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "employee{"+
                "id="+ id +
                ", name=" + Name +
                ", email=" + email +
                ", phone=" + phone +
                ", jobTitle=" + jobTitle +
                ", imageUrl=" + imageUrl +
                ", departement=" + Departement
                +"}";
                }
    }

