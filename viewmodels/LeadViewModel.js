// MVVM Pattern - ViewModel Layer
// Handles presentation logic and state management for leads

"use client"

import { useState, useCallback } from "react"
import { LeadModel } from "@/models/LeadModel"
import api from "@/lib/axios"

export function useLeadViewModel() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLeads: 0,
    hasNext: false,
    hasPrev: false,
  })

  // Create new lead
  const createLead = useCallback(async (leadData) => {
    setLoading(true)
    setError(null)

    try {
      const newLead = new LeadModel(leadData)

      if (!newLead.isValid()) {
        throw new Error("Invalid lead data. First name, last name, and email are required.")
      }

      const response = await api.post('/api/leads', newLead.toJSON())
      const data = response.data

      if (data.success) {
        const createdLead = new LeadModel(data.data)
        setLeads((prev) => [createdLead, ...prev])
        return { success: true, lead: createdLead }
      } else {
        throw new Error(data.message || "Failed to create lead")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create lead"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Get all leads with filtering and pagination
  const fetchLeads = useCallback(async (filters = {}) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      
      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value)
        }
      })

      const response = await api.get(`/api/leads?${params}`)
      const data = response.data

      if (data.success) {
        const leadsData = data.data.map(lead => new LeadModel(lead))
        setLeads(leadsData)
        setPagination(data.pagination || {})
        return { success: true, leads: leadsData, pagination: data.pagination }
      } else {
        throw new Error(data.message || "Failed to fetch leads")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch leads"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Get lead by ID
  const fetchLeadById = useCallback(async (leadId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get(`/api/leads/${leadId}`)
      const data = response.data

      if (data.success) {
        const lead = new LeadModel(data.data)
        return { success: true, lead }
      } else {
        throw new Error(data.message || "Failed to fetch lead")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch lead"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Update lead
  const updateLead = useCallback(async (leadId, updateData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.put(`/api/leads/${leadId}`, updateData)
      const data = response.data

      if (data.success) {
        const updatedLead = new LeadModel(data.data)
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? updatedLead : lead))
        )
        return { success: true, lead: updatedLead }
      } else {
        throw new Error(data.message || "Failed to update lead")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update lead"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Update lead status
  const updateLeadStatus = useCallback(async (leadId, newStatus, reason = "") => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.patch(`/api/leads/${leadId}/status`, {
        status: newStatus,
        reason
      })
      const data = response.data

      if (data.success) {
        const updatedLead = new LeadModel(data.data)
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? updatedLead : lead))
        )
        return { success: true, lead: updatedLead }
      } else {
        throw new Error(data.message || "Failed to update lead status")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update lead status"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Assign lead to staff
  const assignLead = useCallback(async (leadId, assignedTo, reason = "") => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.post(`/api/leads/${leadId}/assign`, {
        assignedTo,
        reason
      })
      const data = response.data

      if (data.success) {
        const updatedLead = new LeadModel(data.data)
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? updatedLead : lead))
        )
        return { success: true, lead: updatedLead }
      } else {
        throw new Error(data.message || "Failed to assign lead")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to assign lead"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Unassign lead
  const unassignLead = useCallback(async (leadId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.post(`/api/leads/${leadId}/unassign`)
      const data = response.data

      if (data.success) {
        const updatedLead = new LeadModel(data.data)
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? updatedLead : lead))
        )
        return { success: true, lead: updatedLead }
      } else {
        throw new Error(data.message || "Failed to unassign lead")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to unassign lead"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Add follow-up
  const addFollowUp = useCallback(async (leadId, followUpData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.post(`/api/leads/${leadId}/follow-ups`, followUpData)
      const data = response.data

      if (data.success) {
        const updatedLead = new LeadModel(data.data)
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? updatedLead : lead))
        )
        return { success: true, lead: updatedLead }
      } else {
        throw new Error(data.message || "Failed to add follow-up")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to add follow-up"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Convert lead
  const convertLead = useCallback(async (leadId, convertedTo = "student", conversionValue = 0) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.post(`/api/leads/${leadId}/convert`, {
        convertedTo,
        conversionValue
      })
      const data = response.data

      if (data.success) {
        const updatedLead = new LeadModel(data.data)
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? updatedLead : lead))
        )
        return { success: true, lead: updatedLead }
      } else {
        throw new Error(data.message || "Failed to convert lead")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to convert lead"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Delete lead
  const deleteLead = useCallback(async (leadId, reason = "") => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.delete(`/api/leads/${leadId}`, {
        data: { reason }
      })
      const data = response.data

      if (data.success) {
        setLeads((prev) => prev.filter((lead) => lead.id !== leadId))
        return { success: true }
      } else {
        throw new Error(data.message || "Failed to delete lead")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete lead"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Get lead statistics
  const fetchLeadStats = useCallback(async (filters = {}) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value)
        }
      })

      const response = await api.get(`/api/leads/stats?${params}`)
      const data = response.data

      if (data.success) {
        return { success: true, stats: data.data }
      } else {
        throw new Error(data.message || "Failed to fetch lead statistics")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch lead statistics"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    leads,
    loading,
    error,
    pagination,
    createLead,
    fetchLeads,
    fetchLeadById,
    updateLead,
    updateLeadStatus,
    assignLead,
    unassignLead,
    addFollowUp,
    convertLead,
    deleteLead,
    fetchLeadStats,
  }
}
