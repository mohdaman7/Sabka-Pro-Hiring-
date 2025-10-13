// hooks/useApi.js
import { useState, useCallback } from "react";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (apiCall, options = {}) => {
    const {
      onSuccess,
      onError,
      showLoading = true,
      resetError = true,
    } = options;

    try {
      if (showLoading) setLoading(true);
      if (resetError) setError(null);

      const result = await apiCall();

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(errorMessage);

      if (onError) {
        onError(err);
      }

      throw err;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    callApi,
    resetError,
  };
};
