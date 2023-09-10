package com.example.userloginbackend.controller;

import com.example.userloginbackend.exception.UserNotFoundException;
import com.example.userloginbackend.model.User;
import com.example.userloginbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    /* need to inject the UserRepository Interface */
    @Autowired
    private UserRepository userRepository;

/* to POST the data use @PostMapping
 - pass in the body/JSON body
 - return the saved data/the data posted*/
    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

/* to GET all users data from the database use @GetMapping
 - return List of users
 - use .findAll() method from jpa
 */
    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }

/* get the specific user with the specific user id.
* - throw custom error if not found
* */
    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(()-> new UserNotFoundException(id));
    }

/* set up edit user
 - use @RequestBody since we are passing in the JSON - newUser is passed by the client
 - .map will create a new array from calling a function for every array element.
 */

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id){
        return userRepository.findById(id)
                .map(user /*existing user*/ -> {
                    user.setUsername(newUser.getUsername());
                    user.setEmail(newUser.getEmail());
                    user.setName(newUser.getName());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    /* delete a user*/
    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if(!userRepository.existsById(id)) {//if there is no user with this id
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);

        return "User with id " + id + " has been deleted successfully";
    }
}
