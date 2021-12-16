/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.repository;

import co.edu.usa.ciclo3.modelo.Footwear;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import co.edu.usa.ciclo3.repository.crud.FootwearCrudRepository;

/**
 *
 * @author hgc68
 */
@Repository
public class FootwearRepository {
    @Autowired
    private FootwearCrudRepository repository;

    public List<Footwear> getAll() {
        return repository.findAll();
    }

    public Optional<Footwear> getClothe(String reference) {
        return repository.findById(reference);
    }
    
    public Footwear create(Footwear clothe) {
        return repository.save(clothe);
    }

    public void update(Footwear clothe) {
        repository.save(clothe);
    }
    
    public void delete(Footwear clothe) {
        repository.delete(clothe);
    }
}
