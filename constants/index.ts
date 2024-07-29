export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "Male" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryPhysician: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "Birth Certificate",
    identificationNumber: "",
    identificationDocument: [],
    treatmentConsent: false,
    disclosureConsent: false,
    privacyConsent: false,
};

export const IdentificationTypes = [
    "Birth Certificate",
    "Driver's License",
    "Medical Insurance Card/Policy",
    "Military ID Card",
    "National Identity Card",
    "Passport",
    "Resident Alien Card (Green Card)",
    "Social Security Card",
    "State ID Card",
    "Student ID Card",
    "Voter ID Card",
];

export const Doctors = [
    {
        image: "/assets/images/default.jpg",
        name: "Veronica idorenyin",
    },
    {
        image: "/assets/images/default.jpg",
        name: "Babajide Odunayo",
    },
    {
        image: "/assets/images/default.jpg",
        name: "Umar Khadijah ",
    },
    {
        image: "/assets/images/default.jpg",
        name: "Ann ifeloluwa",
    },
    {
        image: "/assets/images/default.jpg",
        name: "Isaac John",
    },
    {
        image: "/assets/images/default.jpg",
        name: "Matthew Ezekiel",
    },
    {
        image: "/assets/images/default.jpg",
        name: "Aminu kano",
    },
    {
        image: "/assets/images/default.jpg",
        name: "Obinna Chinedu",
    },
    {
        image: "/assets/images/default.jpg",
        name: "Oghenekaro Isoken",
    },
];

export const StatusIcon = {
    scheduled: "/assets/icons/check.svg",
    pending: "/assets/icons/pending.svg",
    cancelled: "/assets/icons/cancelled.svg",
};