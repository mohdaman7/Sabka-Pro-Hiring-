export const validateStep1 = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
    errors.phone = "Invalid phone number (10 digits required)";
  }

  if (!formData.termsAccepted) {
    errors.termsAccepted = "You must accept the terms and conditions";
  }

  return errors;
};

export const validateStep3 = (formData) => {
  const errors = {};

  // Company Information Validation
  if (!formData.position || !formData.position.trim()) {
    errors.position = "Your job position/title is required";
  }

  if (!formData.companyName || !formData.companyName.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!formData.companyIndustry || !formData.companyIndustry.trim()) {
    errors.companyIndustry = "Please select your company's industry";
  }

  if (!formData.companySize) {
    errors.companySize = "Company size is required";
  }

  // Location
  if (!formData.location.trim()) {
    errors.location = "Location is required";
  }

  // KYC Information
  if (!formData.kycNumber.trim()) {
    errors.kycNumber = "KYC document number is required";
  }

  if (!formData.kycDocument) {
    errors.kycDocument = "KYC document upload is required";
  }

  return errors;
};

export const validateFile = (file) => {
  if (!file) {
    return "File is required";
  }

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  if (!allowedTypes.includes(file.type)) {
    return "Please upload JPG, PNG, or PDF file";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "File size must be less than 5MB";
  }

  return null;
};
