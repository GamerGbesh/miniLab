package com.lab.JavaLab;

import com.lab.JavaLab.dtos.StudentDto;
import com.lab.JavaLab.models.Student;
import com.lab.JavaLab.repositories.StudentRepository;
import com.lab.JavaLab.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    private final StudentRepository studentRepository;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllStudents(){
        try {
            return ResponseEntity.ok(new ApiResponse("Success", studentRepository.findAll()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(e.getMessage(), null));
        }
    }


    @PostMapping
    public ResponseEntity<ApiResponse> addStudent(@RequestBody StudentDto studentDto){
        if (studentDto.getName() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Student name is empty", studentDto));
        }

        if (studentDto.getEmail() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Student email is empty", studentDto));
        }

        Student student = new Student(studentDto.getName(), studentDto.getEmail());
        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.ok(new ApiResponse("Student saved", savedStudent));
    }
}
