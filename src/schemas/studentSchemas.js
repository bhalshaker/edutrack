import Joi from "joi";
import {
  RELATIONSHIPS,
  STATUS_TYPE,
  GENDER,
  EDUCATION_LEVEL,
} from "../models/studentModel.js";

const noteJoiSchema = Joi.object({
  text: Joi.string().required(),
});

const relativeJoiSchema = Joi.object({
  name: Joi.string().required().min(3),
  mobile: Joi.string().pattern(/^\d+$/).required(),
  relationship: Joi.string()
    .valid(...RELATIONSHIPS)
    .required(),
  status: Joi.string()
    .valid(...STATUS_TYPE)
    .required(),
});

const createStudentSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  secondName: Joi.string().min(3).required(),
  dateOfBirth: Joi.date().max("now").required().messages({
    "date.max": "Date of birth cannot be in the future",
  }),
  identityNumber: Joi.string().alphanum().pattern(/^\S+$/).optional().messages({
    "string.patter.base": "identityNumber should not contain any spaces",
  }),
  contactNumber: Joi.string().pattern(/^\d+$/).required().messages({
    "string.pattern.base": "Contact number must contain only numbers.",
  }),
  gender: Joi.string()
    .valid(...GENDER)
    .required(),
  email: Joi.string().email().required(),
  address: Joi.string().optional(),
  currentSchool: Joi.string().optional(),
  currentClass: Joi.string().optional(),
  workPlace: Joi.string().optional(),
  educationalLevel: Joi.string()
    .valid(...EDUCATION_LEVEL)
    .optional(),
  relatives: Joi.array().items(relativeJoiSchema).optional(),
  notes: Joi.array().items(noteJoiSchema).optional(),
});

const updateStudentSchema = Joi.object({
  firstName: Joi.string().min(3),
  secondName: Joi.string().min(3),
  dateOfBirth: Joi.date().max("now").required().messages({
    "date.max": "Date of birth cannot be in the future",
  }),
  identityNumber: Joi.string().alphanum().pattern(/^\S+$/).messages({
    "string.patter.base": "identityNumber should not contain any spaces",
  }),
  contactNumber: Joi.string().pattern(/^\d+$/).messages({
    "string.pattern.base": "Contact number must contain only numbers.",
  }),
  gender: Joi.string().valid(...GENDER),
  email: Joi.string().email(),
  address: Joi.string(),
  currentSchool: Joi.string(),
  currentClass: Joi.string(),
  workPlace: Joi.string(),
  educationalLevel: Joi.string().valid(...EDUCATION_LEVEL),
  relatives: Joi.array().items(relativeJoiSchema),
  notes: Joi.array().items(noteJoiSchema),
})
  .min(1)
  .messages({
    "object.min":
      "At least one field must be provided to update student record",
  });

const studentIdSchema = Joi.object({
  studentId: Joi.number().integer().positive().required(),
});

export { createStudentSchema, updateStudentSchema, studentIdSchema };
