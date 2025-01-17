// backend/routes/classes.ts
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Class, Student } from '../types/models';

const router = express.Router();

// In-memory storage (replace with your database)
let classes: Class[] = [];
let students: Student[] = [];

// Get all classes
router.get('/classes', (req, res) => {
  res.json(classes.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ));
});

// Get single class
router.get('/classes/:classId', (req, res) => {
  const classItem = classes.find(c => c.uid === req.params.classId);
  if (!classItem) {
    return res.status(404).json({ message: 'Class not found' });
  }
  res.json(classItem);
});

// Create class
router.post('/classes', (req, res) => {
  const newClass: Class = {
    uid: uuidv4(),
    title: req.body.title,
    subtitle: req.body.subtitle,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy
  };
  
  classes.push(newClass);
  res.status(201).json(newClass);
});

// Update class
router.put('/classes/:classId', (req, res) => {
  const index = classes.findIndex(c => c.uid === req.params.classId);
  if (index === -1) {
    return res.status(404).json({ message: 'Class not found' });
  }

  classes[index] = {
    ...classes[index],
    title: req.body.title,
    subtitle: req.body.subtitle,
    updatedAt: new Date(),
    updatedBy: req.body.updatedBy
  };

  res.json(classes[index]);
});

// Delete class
router.delete('/classes/:classId', (req, res) => {
  const index = classes.findIndex(c => c.uid === req.params.classId);
  if (index === -1) {
    return res.status(404).json({ message: 'Class not found' });
  }

  // Delete all students in the class
  students = students.filter(s => s.classId !== req.params.classId);
  
  // Delete the class
  classes = classes.filter(c => c.uid !== req.params.classId);
  
  res.status(204).send();
});

// Get all students in a class
router.get('/classes/:classId/students', (req, res) => {
  const classStudents = students.filter(s => s.classId === req.params.classId);
  res.json(classStudents);
});

// Get single student
router.get('/classes/:classId/students/:studentId', (req, res) => {
  const student = students.find(s => 
    s.classId === req.params.classId && s.uid === req.params.studentId
  );
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  res.json(student);
});

// Create student
router.post('/classes/:classId/students', (req, res) => {
  const newStudent: Student = {
    uid: uuidv4(),
    classId: req.params.classId,
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy
  };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
router.put('/classes/:classId/students/:studentId', (req, res) => {
  const index = students.findIndex(s => 
    s.classId === req.params.classId && s.uid === req.params.studentId
  );
  
  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  students[index] = {
    ...students[index],
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    updatedAt: new Date(),
    updatedBy: req.body.updatedBy
  };

  res.json(students[index]);
});

// Delete student
router.delete('/classes/:classId/students/:studentId', (req, res) => {
  const index = students.findIndex(s => 
    s.classId === req.params.classId && s.uid === req.params.studentId
  );
  
  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  students = students.filter(s => s.uid !== req.params.studentId);
  res.status(204).send();
});

export default router;