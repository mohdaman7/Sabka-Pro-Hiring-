import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks for API calls
export const sendOTP = createAsyncThunk(
  "employer/sendOTP",
  async ({ phone, email }, { rejectWithValue }) => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const response = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email }),
      });

      if (response.status === 404) {
        // Mock response for development
        return { success: true, message: "OTP sent successfully" };
      }

      const data = await response.json();

      if (!response.ok || !data?.success) {
        return rejectWithValue(data?.message || "Failed to send OTP");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to send OTP");
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "employer/verifyOTP",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      if (response.status === 404) {
        // Mock response for development
        return { success: true, message: "OTP verified successfully" };
      }

      const data = await response.json();

      if (!response.ok || !data?.success) {
        return rejectWithValue(data?.message || "Invalid OTP");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to verify OTP");
    }
  }
);

export const registerEmployer = createAsyncThunk(
  "employer/register",
  async (formData, { rejectWithValue }) => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const tempPassword = `Temp@${Math.random().toString(36).slice(-8)}`;

      // Registration request
      const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: tempPassword,
          role: "employer",
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          position: formData.position,
          company: {
            name: formData.companyName,
            description: formData.companyDescription,
            industry: formData.companyIndustry,
            size: formData.companySize,
            website: formData.companyWebsite,
          },
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok || !registerData?.success) {
        return rejectWithValue(registerData?.message || "Registration failed");
      }

      // Update profile after registration
      if (registerData.token) {
        const profileResponse = await fetch(`${API_URL}/api/employer/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${registerData.token}`,
          },
          body: JSON.stringify({
            contact: {
              phone: formData.phone,
              address: {
                city: formData.location,
                country: "India",
              },
            },
            verificationDocuments: [
              {
                type: "other",
                filename: formData.kycDocument?.name || "kyc_document",
                url: "pending_upload",
              },
            ],
            hiringNeeds: {
              typesOfRoles: [],
              locations: [formData.location],
            },
            bio: formData.companyDescription || `Registered via lead form`,
            hiringGoals: "Looking to hire talented professionals",
          }),
        });

        const profileData = await profileResponse.json();

        if (!profileResponse.ok || !profileData?.success) {
          console.warn("Profile update warning:", profileData?.message);
        }
      }

      return {
        ...registerData,
        formData: {
          ...formData,
          userId: registerData.data?.id || registerData.data?._id,
          token: registerData.token,
        },
      };
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

const employerSlice = createSlice({
  name: "employer",
  initialState: {
    // Form data
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      otp: "",
      termsAccepted: false,
      position: "",
      companyName: "",
      companyIndustry: "",
      companySize: "",
      companyWebsite: "",
      companyDescription: "",
      hiringType: "company",
      location: "",
      kycDocument: null,
      kycType: "aadhar",
      kycNumber: "",
    },

    // UI state
    step: 1,
    loading: false,
    serverError: "",
    otpSent: false,
    timer: 0,

    // Validation errors
    errors: {},

    // Registration result
    registrationResult: null,
    isRegistered: false,
  },
  reducers: {
    // Update form field
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;

      // Clear field error when user types
      if (state.errors[field]) {
        state.errors[field] = "";
      }

      // Clear server error on any change
      if (state.serverError) {
        state.serverError = "";
      }
    },

    // Update file field
    updateFileField: (state, action) => {
      const { field, file } = action.payload;
      state.formData[field] = file;

      if (state.errors[field]) {
        state.errors[field] = "";
      }
    },

    // Set validation errors
    setErrors: (state, action) => {
      state.errors = action.payload;
    },

    // Clear specific error
    clearError: (state, action) => {
      const field = action.payload;
      if (state.errors[field]) {
        delete state.errors[field];
      }
    },

    // Navigation
    setStep: (state, action) => {
      state.step = action.payload;
    },

    // Timer management
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    decrementTimer: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
      }
    },

    // Reset form
    resetForm: (state) => {
      state.formData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        otp: "",
        termsAccepted: false,
        position: "",
        companyName: "",
        companyIndustry: "",
        companySize: "",
        companyWebsite: "",
        companyDescription: "",
        hiringType: "company",
        location: "",
        kycDocument: null,
        kycType: "aadhar",
        kycNumber: "",
      };
      state.step = 1;
      state.loading = false;
      state.serverError = "";
      state.otpSent = false;
      state.timer = 0;
      state.errors = {};
      state.registrationResult = null;
      state.isRegistered = false;
    },

    // Clear server error
    clearServerError: (state) => {
      state.serverError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.serverError = "";
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.step = 2;
        state.timer = 60;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload || "Failed to send OTP";
      })

      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.serverError = "";
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
        state.step = 3;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload || "Invalid OTP";
      })

      // Register Employer
      .addCase(registerEmployer.pending, (state) => {
        state.loading = true;
        state.serverError = "";
      })
      .addCase(registerEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationResult = action.payload;
        state.isRegistered = true;

        // Store token and user data in localStorage
        if (action.payload.token) {
          try {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.data));
          } catch (error) {
            console.error("Failed to store in localStorage:", error);
          }
        }
      })
      .addCase(registerEmployer.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload || "Registration failed";
      });
  },
});

export const {
  updateField,
  updateFileField,
  setErrors,
  clearError,
  setStep,
  setTimer,
  decrementTimer,
  resetForm,
  clearServerError,
} = employerSlice.actions;

export default employerSlice.reducer;
