/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.service;

import co.edu.usa.ciclo3.modelo.Footwear;
import co.edu.usa.ciclo3.repository.FootwearRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hgc68
 */
@Service
public class FootwearService {
    @Autowired
    private FootwearRepository footwearRepository;

    public List<Footwear> getAll() {
        return footwearRepository.getAll();
    }

    public Optional<Footwear> getClothe(String reference) {
        return footwearRepository.getClothe(reference);
    }
    
    public Footwear create(Footwear footwear) {
        if (footwear.getReference() == null) {
            return footwear;
        } else {
            return footwearRepository.create(footwear);
        }
    }

    public Footwear update(Footwear footwear) {

        if (footwear.getReference() != null) {
            Optional<Footwear> accesoryDb = footwearRepository.getClothe(footwear.getReference());
            if (accesoryDb.isPresent()) {
                
                if (footwear.getBrand()!= null) {
                    accesoryDb.get().setBrand(footwear.getBrand());
                }
                if (footwear.getCategory() != null) {
                    accesoryDb.get().setCategory(footwear.getCategory());
                }
                if (footwear.getMaterial() != null) {
                    accesoryDb.get().setMaterial(footwear.getMaterial());
                }
                if (footwear.getGender() != null) {
                    accesoryDb.get().setGender(footwear.getGender());
                }
                if (footwear.getSize() != null) {
                    accesoryDb.get().setSize(footwear.getSize());
                }
                if (footwear.getDescription() != null) {
                    accesoryDb.get().setDescription(footwear.getDescription());
                }
                if (footwear.getPrice() != 0.0) {
                    accesoryDb.get().setPrice(footwear.getPrice());
                }
                if (footwear.getQuantity() != 0) {
                    accesoryDb.get().setQuantity(footwear.getQuantity());
                }
                if (footwear.getPhotography() != null) {
                    accesoryDb.get().setPhotography(footwear.getPhotography());
                }
                accesoryDb.get().setAvailability(footwear.isAvailability());
                footwearRepository.update(accesoryDb.get());
                return accesoryDb.get();
            } else {
                return footwear;
            }
        } else {
            return footwear;
        }
    }

    public boolean delete(String reference) {
        Boolean aBoolean = getClothe(reference).map(footwear -> {
            footwearRepository.delete(footwear);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
