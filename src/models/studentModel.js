import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const RELATIONSHIPS = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Spouse",
  "Grandfather",
  "Grandmother",
  "Guardian",
  "Friend",
  "Cousin",
  "Uncle",
  "Aunt",
  "Other",
];

const STATUS_TYPE = ["Guardian", "Contact"];

const GENDER = ["Male", "Female"];

const EDUCATION_LEVEL = [
  "Nursery",
  "Preschool",
  "Primary School",
  "Elementary School",
  "High School",
  "Technical School",
  "Diploma",
  "National Diploma",
  "High National Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
];

const relativeSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    relationship: {
      type: String,
      enum: RELATIONSHIPS,
      required: true,
    },
    status: { type: String, enum: STATUS_TYPE, required: true },
  },
  // Mongoose option for automatic timestamp tracking (adds createdAt and updatedAt fields)
  { timestamps: true }
);
const noteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  // Mongoose option for automatic timestamp tracking (adds createdAt and updatedAt fields)
  { timestamps: true }
);

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "❗️ Student first name is required"],
      minlength: [
        3,
        "❗️ Student first name shoulld at lease have three characters",
      ],
    },
    secondName: {
      type: String,
      required: [true, "❗️ Student second name is required"],
      minlength: [
        3,
        "❗️ Student second name shoulld at lease have three characters",
      ],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "❗️ Date of birth is required"],
      validate: {
        validator: function (value) {
          const today = new Date();
          return value <= today;
        },
        message: (props) =>
          `Date of birth ${props.value.toDateString()} is not valid.`,
      },
    },
    identityNumber: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: [true, "❗️ Student should have a contact number"],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "❗️ Student should have a gender"],
      enum: GENDER,
    },
    email: {
      type: String,
      required: [true, "❗️ Student email is required"],
    },
    address: String,
    currentSchool: String,
    currentClass: String,
    workPlace: String,
    educationalLevel: {
      type: String,
      enum: EDUCATION_LEVEL,
    },
    relatives: [relativeSchema],
    notes: [noteSchema],
  },
  // Mongoose option for automatic timestamp tracking (adds createdAt and updatedAt fields)
  { timestamps: true }
);

studentSchema.plugin(AutoIncrement, { inc_field: "studentId", unique: true });
const Student = mongoose.model("Student", studentSchema);
module.exports = {
  Student,
  RELATIONSHIPS,
  STATUS_TYPE,
  GENDER,
  EDUCATION_LEVEL,
};
