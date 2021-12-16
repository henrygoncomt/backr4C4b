/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.service;

/**
 *
 * @author hgc68
 */
import co.edu.usa.ciclo3.modelo.Order;
import co.edu.usa.ciclo3.repository.OrderRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    public List<Order> getAll(){
        return orderRepository.getAll();
    }
    
    public Optional<Order> getOrder(Integer id){
        return orderRepository.getOrder(id);
    }
    
    public Order create(Order order){
        if (order.getId() == null){
            return order;
        }else{
            return orderRepository.create(order);
        }
    }
    
    public Order update(Order order){
        if (order.getId() != null){
            Optional<Order> dbOrder = orderRepository.getOrder(order.getId());
            if (dbOrder.isPresent()){
                
                if (order.getId() != null){
                    dbOrder.get().setId(order.getId());
                }
                
                if (order.getRegisterDay() != null){
                    dbOrder.get().setRegisterDay(order.getRegisterDay());
                }
                
                if (order.getStatus() != null){
                    dbOrder.get().setStatus(order.getStatus());
                }
                
                if (order.getSalesMan() != null) {
                    dbOrder.get().setStatus(order.getStatus());
                }
                
                if (order.getSalesMan() != null){
                    dbOrder.get().setSalesMan(order.getSalesMan());
                }
                
                if (order.getProducts() != null){
                    dbOrder.get().setProducts(order.getProducts());
                }
                
                if (order.getQuantities() != null){
                    dbOrder.get().setQuantities(order.getQuantities());
                }
                orderRepository.update(dbOrder.get());
                return dbOrder.get();
            }else{
                return order;
            }
        }else{
            return order;
        }
    }
    
    public boolean delete(Integer id){
        return getOrder(id).map(order -> {
            orderRepository.delete(order);
            return true;
        }).orElse(false);
    }
    
    public List<Order> getOrdersByZone(String zone){
        return orderRepository.getOrdersByZone(zone);
    }
    
        public List<Order> getBySalesManId(Integer id){
        return orderRepository.getBySalesManId(id);
    }

    public List<Order> getBySalesManIdAndStatus(Integer id, String status){
        return orderRepository.getBySalesManIdAndStatus(id, status);
    }

    public List<Order> getByRegisterDayAndSalesManId(String registerDay, Integer id){
        return orderRepository.getByRegisterDayAndSalesManId(registerDay,id);
    }
}