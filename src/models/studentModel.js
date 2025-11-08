import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const relativeSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    relationship: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    status: { type: String, enum: ["Guardian", "Contact"], required: true },
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
    },
    address: String,
    currentSchool: String,
    workPlace: String,
    educationalLevel: String,
    relatives: [relativeSchema],
    notes: [noteSchema],
  },
  // Mongoose option for automatic timestamp tracking (adds createdAt and updatedAt fields)
  { timestamps: true }
);

studentSchema.plugin(AutoIncrement, { inc_field: "studentId", unique: true });
const Student = mongoose.model("Student", studentSchema);

export default Student;
