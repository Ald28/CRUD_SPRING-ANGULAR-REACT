package com.sanchez.demo.controller;

import com.sanchez.demo.Exception.ResourceNotFoundException;
import com.sanchez.demo.model.Cliente;
import com.sanchez.demo.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/v1")

public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("clientes")
    public List<Cliente> ListarClientes(){return clienteRepository.findAll();}

    @PostMapping("/clientes")
    public Cliente guardarCliente(@RequestBody Cliente cliente){return clienteRepository.save(cliente);}

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> ListarClientePorId(@PathVariable long id){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("El cliente no existe"+id));
        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> ActualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteUpdate){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("El cliente no existe"+id));
        cliente.setNombre(clienteUpdate.getNombre());
        cliente.setApellidos(clienteUpdate.getApellidos());
        cliente.setEmail(clienteUpdate.getEmail());

        Cliente clienteActualizado = clienteRepository.save(cliente);
        return ResponseEntity.ok(clienteActualizado);
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Void> EliminarCliente(@PathVariable Long id){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("El cliente no existe"+id));
        clienteRepository.delete(cliente);
        return ResponseEntity.noContent().build();
    }

}
