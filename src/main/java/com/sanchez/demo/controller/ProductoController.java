package com.sanchez.demo.controller;

import com.sanchez.demo.model.Producto;
import com.sanchez.demo.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v2")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping("productos")
    public List<Producto> ListarProductos(){
        return productoRepository.findAll();
    }

    @PostMapping("/productos")
    public Producto CrearProducto(@RequestBody Producto producto){
        return productoRepository.save(producto);
    }

    @GetMapping("/productos/{id}")
    public Producto ObtenerProductoPorId(@PathVariable Long id){
        return productoRepository.findById(id).orElse(null);
    }

    @PutMapping("/productos/{id}")
    public Producto ActualizarProducto(@PathVariable Long id, @RequestBody Producto productoUpdate){
        Producto producto = productoRepository.findById(id).orElse(null);
        if(producto != null){
            producto.setNombre(productoUpdate.getNombre());
            producto.setDescripcion(productoUpdate.getDescripcion());
            producto.setPrecio(productoUpdate.getPrecio());
            return productoRepository.save(producto);
        }
        return null;
    }

    @DeleteMapping("/productos/{id}")
    public void EliminarProducto(@PathVariable Long id){
        productoRepository.deleteById(id);
    }

}
