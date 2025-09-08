package com.todoapp.controller;

import com.todoapp.Entity.Task;
import com.todoapp.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public List<Task> getAllTask(){
        return taskService.getAllTasks();
    }
    @GetMapping("{id}")
    public Task getTask(@PathVariable Long id){
        return taskService.getTaskById(id);
    }
    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id , @RequestBody Task task){
        return taskService.updateTask(id,task);
    }
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }
}
