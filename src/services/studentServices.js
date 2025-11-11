import { Student } from "../models/studentModel.js";

const getAllStudentsService = async () => {
  try {
    const allStudents = await Student.find();
    return allStudents;
  } catch (error) {
    console.error("###  Error - getting all students", error);
    throw new Error("Could not retrieve all students");
  }
};
const createStudentService = async (studentData) => {
  try {
    const student = new Student(studentData);
    await student.save();
    return student;
  } catch (error) {
    console.error(
      `###  Error - not save student ${JSON.stringify(studentData)} due to`,
      error
    );
    throw new Error("Could not save the new student");
  }
};
const getStudentByIdService = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    return student;
  } catch (error) {
    console.error(
      `###  Error - not find student with id ${studentId} due to`,
      error
    );
    throw new Error("Could not find the student");
  }
};
const updateStudentByIdService = async (studentId, updatedData) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedStudent;
  } catch (error) {
    console.error(
      `###  Error - not find update student ${studentId} with following data ${JSON.stringify(
        updatedData
      )} due to`,
      error
    );
    throw new Error("Could not update the student");
  }
};
const deleteStudentByIdService = async (studentId) => {
  try {
    await Student.findByIdAndDelete(studentId);
  } catch (error) {
    console.error(
      `###  Error - not delete the student with id ${studentId} due to`,
      error
    );
    throw new Error("Could not delete the student");
  }
};

export {
  getAllStudentsService,
  createStudentService,
  getStudentByIdService,
  updateStudentByIdService,
  deleteStudentByIdService,
};
