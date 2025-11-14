import {
  getAllStudentsService,
  createStudentService,
  getStudentByIdService,
  updateStudentByIdService,
  deleteStudentByIdService,
} from "../services/studentServices.js";

const getAllStudents = async (req, res) => {
  try {
    // Get all students from the service and return as response
    const allStudents = await getAllStudentsService();
    // Flag response as successful and return data
    return res.status(200).json(allStudents);
  } catch (error) {
    // Report unexpected error and return 500
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(",");
    return res.status(500).json({
      success: false,
      message: `Technical unexpected error: ${errorMessage}`,
      details: error.details,
    });
  }
};

const createStudent = async (req, res) => {
  try {
    // Create a new student using the service and return as response
    const createdStudent = await createStudentService(req.body);
    // Flag response as successful and return data
    return res.status(201).json(createdStudent);
  } catch (error) {
    // Report unexpected error and return 500
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(",");
    return res.status(500).json({
      success: false,
      message: `Technical unexpected error: ${errorMessage}`,
      details: error.details,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    // Get student by ID using the service
    const student = await getStudentByIdService(req.params.studentId);
    // Return student if found, otherwise 404
    if (student) return res.status(200).json(student);
    else
      return res.status(404).json({
        success: false,
        message: "Requested student does not exist",
      });
  } catch (error) {
    // Report unexpected error and return 500
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(",");
    return res.status(500).json({
      success: false,
      message: `Technical unexpected error: ${errorMessage}`,
      details: error.details,
    });
  }
};

const updateStudentById = async (req, res) => {
  try {
    // Check if the student exists and return 404 if not found
    const student = await getStudentByIdService(req.params.studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Requested student does not exist",
      });
    }
    // Update the student using the service and return updated student
    const updatedStudent = await updateStudentByIdService(
      Number(req.params.studentId),
      req.body
    );
    // Return the updated student and success status
    return res.status(200).json(updatedStudent);
  } catch (error) {
    // Report unexpected error and return 500
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(",");
    return res.status(500).json({
      success: false,
      message: `Technical unexpected error: ${errorMessage}`,
      details: error.details,
    });
  }
};

const deleteStudentById = async (req, res) => {
  try {
    // Check if the student exists and return 404 if not found
    const student = await getStudentByIdService(req.params.studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Requested student does not exist",
      });
    }
    // Delete the student using the service
    await deleteStudentByIdService(req.params.studentId);
    // Return success status
    return res
      .status(202)
      .json({ message: "Student was deleted successfully" });
  } catch (error) {
    // Report unexpected error and return 500
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(",");
    return res.status(500).json({
      success: false,
      message: `Technical unexpected error: ${errorMessage}`,
      details: error.details,
    });
  }
};

export {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
