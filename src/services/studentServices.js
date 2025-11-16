import { Student } from "../models/studentModel.js";
import mongoose from "mongoose";

const getAllStudentsService = async () => {
  try {
    // Retrieve all students from the database
    const allStudents = await Student.find();
    // Return the list of all students
    return allStudents;
  } catch (error) {
    console.error("###  Error - getting all students", error);
    // Rethrow a generic error to be handled by the controller
    throw new Error("Could not retrieve all students");
  }
};
const createStudentService = async (studentData) => {
  try {
    // Create a new student document and save it to the database
    const student = new Student(studentData);
    await student.save();
    // Return the newly created student
    return student;
  } catch (error) {
    console.error(
      `###  Error - not save student ${JSON.stringify(studentData)} due to`,
      error
    );
    // Rethrow a generic error to be handled by the controller
    throw new Error("Could not save the new student");
  }
};
const getStudentByIdService = async (studentId) => {
  try {
    // Support both numeric auto-increment studentId and ObjectId _id
    if (/^\d+$/.test(String(studentId))) {
      // find by the studentId field
      const student = await Student.findOne({ studentId: Number(studentId) });
      // Return found student
      return student;
    }
    // If the studentId looks like an auto-increment numeric id (e.g. "1"),
    // search by the studentId field. Otherwise, if it's a valid ObjectId,
    else if (mongoose.Types.ObjectId.isValid(String(studentId))) {
      // find by the studentId field
      const student = await Student.findById(studentId);
      // Return found student
      return student;
    }
    // Not a numeric id nor a valid ObjectId -> no result
    return null;
  } catch (error) {
    console.error(
      `###  Error - not find student with id ${studentId} due to`,
      error
    );
    // Rethrow a generic error to be handled by the controller
    throw new Error("Could not find the student");
  }
};
const updateStudentByIdService = async (studentId, updatedData) => {
  try {
    // Support both numeric auto-increment studentId and ObjectId _id
    if (/^\d+$/.test(String(studentId))) {
      // find by the studentId field and update
      const updatedStudent = await Student.findOneAndUpdate(
        { studentId: Number(studentId) },
        updatedData,
        {
          new: true, // return the updated document
          runValidators: true,
        }
      );
      // Return updated student
      return updatedStudent;
    }
    // If the studentId looks like an auto-increment numeric id (e.g. "1"),
    // search by the studentId field.
    else if (mongoose.Types.ObjectId.isValid(String(studentId))) {
      // find by the _id field and update
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        updatedData,
        {
          new: true, // return the updated document
          runValidators: true,
        }
      );
      // Return updated student
      return updatedStudent;
    }

    // Not a numeric id nor a valid ObjectId -> no result
    return null;
  } catch (error) {
    console.error(
      `###  Error - not find update student ${studentId} with following data ${JSON.stringify(
        updatedData
      )} due to`,
      error
    );
    // Rethrow a generic error to be handled by the controller
    throw new Error("Could not update the student");
  }
};
const deleteStudentByIdService = async (studentId) => {
  try {
    // Support both numeric auto-increment studentId and ObjectId _id
    if (/^\d+$/.test(String(studentId))) {
      // delete by the studentId field
      await Student.findOneAndDelete({ studentId: Number(studentId) });
    } else if (mongoose.Types.ObjectId.isValid(String(studentId))) {
      // delete by the _id field
      await Student.findByIdAndDelete(studentId);
    }
  } catch (error) {
    console.error(
      `###  Error - not delete the student with id ${studentId} due to`,
      error
    );
    // Rethrow a generic error to be handled by the controller
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
