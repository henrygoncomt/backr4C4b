/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.repository.crud;

import co.edu.usa.ciclo3.modelo.Footwear;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author hgc68
 */
public interface FootwearCrudRepository extends MongoRepository<Footwear, String>{
    Optional<Footwear> findByReference(String reference);
    
}
