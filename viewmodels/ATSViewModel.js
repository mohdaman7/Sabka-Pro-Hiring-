// MVVM Pattern - ATS ViewModel

"use client"

import { useState, useCallback } from "react"

export function useATSViewModel() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchApplications = useCallback(async (filters = {}) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const mockApplications = []

      setApplications(mockApplications)
      return { success: true, applications: mockApplications }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  const moveToStage = useCallback(async (applicationId, newStage) => {
    setLoading(true)
    setError(null)

    try {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id === applicationId) {
            app.stage = newStage
            app.updatedAt = new Date().toISOString()
          }
          return app
        }),
      )

      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  const rateApplication = useCallback(async (applicationId, rating) => {
    setLoading(true)
    setError(null)

    try {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id === applicationId) {
            app.rating = rating
            app.updatedAt = new Date().toISOString()
          }
          return app
        }),
      )

      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  const scheduleInterview = useCallback(async (applicationId, interviewData) => {
    setLoading(true)
    setError(null)

    try {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id === applicationId) {
            app.interviews.push(interviewData)
            app.stage = "interview"
            app.updatedAt = new Date().toISOString()
          }
          return app
        }),
      )

      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    applications,
    loading,
    error,
    fetchApplications,
    moveToStage,
    rateApplication,
    scheduleInterview,
  }
}
