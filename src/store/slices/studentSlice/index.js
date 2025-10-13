import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks for API calls
export const sendCandidateOTP = createAsyncThunk(
  "candidate/sendOTP",
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

export const verifyCandidateOTP = createAsyncThunk(
  "candidate/verifyOTP",
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

export const registerCandidate = createAsyncThunk(
  "candidate/register",
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
          role: "student",
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok || !registerData?.success) {
        return rejectWithValue(registerData?.message || "Registration failed");
      }

      // Update profile after registration
      if (registerData.token) {
        const profileResponse = await fetch(`${API_URL}/api/student/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${registerData.token}`,
          },
          body: JSON.stringify({
            phone: formData.phone,
            address: {
              city: formData.location,
            },
            bio: `${
              formData.experienceType === "fresher" ? "Fresher" : "Experienced"
            } candidate`,
            kycInfo: {
              type: formData.kycType,
              number: formData.kycNumber,
              verified: false,
            },
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

const candidateSlice = createSlice({
  name: "candidate",
  initialState: {
    // Form data
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      otp: "",
      termsAccepted: false,
      experienceType: "fresher",
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
    updateCandidateField: (state, action) => {
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
    updateCandidateFileField: (state, action) => {
      const { field, file } = action.payload;
      state.formData[field] = file;

      if (state.errors[field]) {
        state.errors[field] = "";
      }
    },

    // Set validation errors
    setCandidateErrors: (state, action) => {
      state.errors = action.payload;
    },

    // Clear specific error
    clearCandidateError: (state, action) => {
      const field = action.payload;
      if (state.errors[field]) {
        delete state.errors[field];
      }
    },

    // Navigation
    setCandidateStep: (state, action) => {
      state.step = action.payload;
    },

    // Timer management
    setCandidateTimer: (state, action) => {
      state.timer = action.payload;
    },
    decrementCandidateTimer: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
      }
    },

    // Reset form
    resetCandidateForm: (state) => {
      state.formData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        otp: "",
        termsAccepted: false,
        experienceType: "fresher",
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
    clearCandidateServerError: (state) => {
      state.serverError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendCandidateOTP.pending, (state) => {
        state.loading = true;
        state.serverError = "";
      })
      .addCase(sendCandidateOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.step = 2;
        state.timer = 60;
      })
      .addCase(sendCandidateOTP.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload || "Failed to send OTP";
      })

      // Verify OTP
      .addCase(verifyCandidateOTP.pending, (state) => {
        state.loading = true;
        state.serverError = "";
      })
      .addCase(verifyCandidateOTP.fulfilled, (state) => {
        state.loading = false;
        state.step = 3;
      })
      .addCase(verifyCandidateOTP.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload || "Invalid OTP";
      })

      // Register Candidate
      .addCase(registerCandidate.pending, (state) => {
        state.loading = true;
        state.serverError = "";
      })
      .addCase(registerCandidate.fulfilled, (state, action) => {
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
      .addCase(registerCandidate.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload || "Registration failed";
      });
  },
});

export const {
  updateCandidateField,
  updateCandidateFileField,
  setCandidateErrors,
  clearCandidateError,
  setCandidateStep,
  setCandidateTimer,
  decrementCandidateTimer,
  resetCandidateForm,
  clearCandidateServerError,
} = candidateSlice.actions;

export default candidateSlice.reducer;
