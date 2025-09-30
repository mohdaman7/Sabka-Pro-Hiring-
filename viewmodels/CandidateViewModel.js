// MVVM Pattern - Candidate ViewModel

"use client"

import { useState, useCallback } from "react"
import { CandidateModel } from "@/models/CandidateModel"

export function useCandidateViewModel() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCandidates = useCallback(async (filters = {}) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const mockCandidates = [
        new CandidateModel({
          id: 1,
          name: "Amit Sharma",
          email: "amit.sharma@email.com",
          phone: "+91 98765 43210",
          qualification: "B.Tech",
          experience: 3,
          skills: ["React", "Node.js"],
          isPro: true,
        }),
      ]

      setCandidates(mockCandidates)
      return { success: true, candidates: mockCandidates }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  const updateCandidateStatus = useCallback(async (candidateId, newStatus) => {
    setLoading(true)
    setError(null)

    try {
      setCandidates((prev) =>
        prev.map((candidate) => {
          if (candidate.id === candidateId) {
            candidate.status = newStatus
            candidate.updatedAt = new Date().toISOString()
          }
          return candidate
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

  const convertToPro = useCallback(async (candidateId) => {
    setLoading(true)
    setError(null)

    try {
      setCandidates((prev) =>
        prev.map((candidate) => {
          if (candidate.id === candidateId) {
            candidate.isPro = true
            candidate.updatedAt = new Date().toISOString()
          }
          return candidate
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
    candidates,
    loading,
    error,
    fetchCandidates,
    updateCandidateStatus,
    convertToPro,
  }
}
