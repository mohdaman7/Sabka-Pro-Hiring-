// MVVM Pattern - ViewModel Layer
// Handles presentation logic and state management for leads

"use client"

import { useState, useCallback } from "react"
import { LeadModel } from "@/models/LeadModel"

export function useLeadViewModel() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Create new lead
  const createLead = useCallback(async (leadData) => {
    setLoading(true)
    setError(null)

    try {
      const newLead = new LeadModel(leadData)

      if (!newLead.isValid()) {
        throw new Error("Invalid lead data. Name, email, and WhatsApp are required.")
      }

      // In a real app, this would be an API call
      // const response = await fetch('/api/leads', {
      //   method: 'POST',
      //   body: JSON.stringify(newLead.toJSON())
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setLeads((prev) => [...prev, newLead])
      return { success: true, lead: newLead }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // Get all leads
  const fetchLeads = useCallback(async (filters = {}) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/leads?' + new URLSearchParams(filters))
      // const data = await response.json()

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // For now, return empty array
      setLeads([])
      return { success: true, leads: [] }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // Update lead status
  const updateLeadStatus = useCallback(async (leadId, newStatus) => {
    setLoading(true)
    setError(null)

    try {
      setLeads((prev) =>
        prev.map((lead) => {
          if (lead.id === leadId) {
            lead.status = newStatus
            lead.updatedAt = new Date().toISOString()
          }
          return lead
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
    leads,
    loading,
    error,
    createLead,
    fetchLeads,
    updateLeadStatus,
  }
}
