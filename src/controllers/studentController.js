import {
  getAllStudentsService,
  createStudentService,
  getStudentByIdService,
  updateStudentByIdService,
  deleteStudentByIdService,
} from "../services/studentServices.js";

const getAllStudents = async (req, res) => {
  try {
    const allStudents = await getAllStudentsService();
    return res.status(200).json(allStudents);
  } catch (error) {
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
    const createdStudent = await createStudentService(req.body);
    return res.status(201).json(createdStudent);
  } catch (error) {
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
    const student = await getStudentByIdService(req.params.studentId);
    if (student) return res.status(200).json(student);
    else
      return res.status(404).json({
        success: false,
        message: "Requested student does not exist",
      });
  } catch (error) {
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
    const student = await getStudentByIdService(req.params.studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Requested student does not exist",
      });
    }
    const updatedStudent = await updateStudentByIdService(
      Number(req.params.studentId),
      req.body
    );
    return res.status(200).json(updatedStudent);
  } catch (error) {
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
    const student = await getStudentByIdService(req.params.studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Requested student does not exist",
      });
    }
    await deleteStudentByIdService(req.params.studentId);
    return res
      .status(202)
      .json({ message: "Student was deleted successfully" });
  } catch (error) {
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
