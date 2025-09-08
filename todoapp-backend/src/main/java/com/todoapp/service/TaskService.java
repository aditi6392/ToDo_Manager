package com.todoapp.service;

import com.todoapp.Entity.Task;
import com.todoapp.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }
    public Task getTaskById(Long id){
        return taskRepository.findById(id).orElse(null);

    }
    public Task createTask(Task task){
        return taskRepository.save(task);
    }
    public Task updateTask(Long id , Task task){
        return taskRepository.findById(id)
                .map(existing->{
                    existing.setTitle(task.getTitle());
                    existing.setDescription(task.getDescription());
                    existing.setCompleted(task.isCompleted());
                    return taskRepository.save(existing);
                })
                .orElse(null);
    }
    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }

}
