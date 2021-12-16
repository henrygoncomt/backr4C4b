/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.repository.crud;

/**
 *
 * @author hgc68
 */

import co.edu.usa.ciclo3.modelo.Order;
import java.util.Date;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface OrderCrudRepository extends MongoRepository<Order, Integer>{
    List<Order> findBySalesManZone(String zone);
    List<Order> findBySalesManId(Integer id);
    List<Order> findBySalesManIdAndStatus(Integer id, String status);
    List<Order> findByRegisterDayAndSalesManId(Date registerDay, Integer id);
    
}
