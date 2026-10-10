import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    imageLink: {
        type: String,
    },
    sex: {
        type: String,
        enum: ['M', 'F'],
    },
    age: {
        type: Number,
    },
    currentCondition: {
        type: String,
        trim: true,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    absoluteSummary: {
        type: String,
        trim: true,
        default: "",
    },
    lastAbsoluteSummary: {
        type: String,
        trim: true,
        default: "",
    },
    medicalHistorySummary: {
        type: String,
        trim: true,
    },
    currentSymptomsSummary: {
        type: String,
        trim: true,
    },
    assistiveDiagnosis: {
        type: String,
        trim: true,
    },
    reportsList: [
        {
            reportName: {
                type: String,
            },
            reportDate: {
                type: String,
            },
            location: {
                type: String,
            },
            reportPDFLink: {
                type: String,
            },
            url:{
                type: String,
            },
            reportPDFText: {
                type: String,
            },
            reportSummary: {
                type: String,
            },
            cid: {
                type: String,
            }
        }
    ],
    medicinesList: [
        {
          medicine: { type: String },
          dosage: { type: String },
        //   doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
          status: { type: String, enum: ["taken", "pending"] },
        }
      ],
    medicineStatusDate: {
        type: Date,
        default: () => new Date().setHours(0, 0, 0, 0), // Default to the start of the current day
        set: (value) => new Date(value).setHours(0, 0, 0, 0), // Ensure only the date part is stored
    },
}, { timestamps: true });

export const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
