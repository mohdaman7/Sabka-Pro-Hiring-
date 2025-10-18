// MVVM Pattern - Model Layer
// Handles data structure and business logic for leads

export class LeadModel {
  constructor(data = {}) {
    this.id = data.id || data._id || null
    this.firstName = data.firstName || ""
    this.lastName = data.lastName || ""
    this.email = data.email || ""
    this.phone = data.phone || ""
    this.whatsapp = data.whatsapp || ""
    this.qualification = data.qualification || ""
    this.jobPreferences = data.jobPreferences || ""
    this.experience = data.experience || ""
    this.location = data.location || ""
    this.notes = data.notes || ""
    this.cvUrl = data.cvUrl || null
    this.documents = data.documents || []
    
    // Lead Source and Type
    this.source = data.source || "website" // 'website', 'social_media', 'google_ads', 'facebook_ads', 'referral', 'walk_in', 'phone_call', 'email_campaign', 'event', 'partnership', 'other'
    this.sourceDetails = data.sourceDetails || ""
    
    // Lead Status and Priority
    this.status = data.status || "new" // 'new', 'contacted', 'follow_up', 'qualified', 'converted', 'lost', 'unqualified'
    this.priority = data.priority || "medium" // 'low', 'medium', 'high', 'urgent'
    
    // Assignment and Ownership
    this.assignedTo = data.assignedTo || null
    this.assignedAt = data.assignedAt || null
    this.assignedBy = data.assignedBy || null
    
    // Conversion Details
    this.convertedTo = data.convertedTo || null
    this.convertedAt = data.convertedAt || null
    this.conversionValue = data.conversionValue || 0
    
    // Follow-up Management
    this.followUps = data.followUps || []
    this.lastFollowUpDate = data.lastFollowUpDate || null
    this.nextFollowUpDate = data.nextFollowUpDate || null
    
    // Lead Scoring
    this.score = data.score || 0
    
    // Tags and Lifecycle
    this.tags = data.tags || []
    this.lifecycleStage = data.lifecycleStage || "awareness"
    
    // Communication Preferences
    this.preferredContactMethod = data.preferredContactMethod || "email"
    this.bestTimeToContact = data.bestTimeToContact || ""
    
    // Campaign Tracking
    this.campaignId = data.campaignId || ""
    this.campaignName = data.campaignName || ""
    this.utmSource = data.utmSource || ""
    this.utmMedium = data.utmMedium || ""
    this.utmCampaign = data.utmCampaign || ""
    
    // Status History
    this.statusHistory = data.statusHistory || []
    
    // Timestamps
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  // Validation methods
  isValid() {
    return this.firstName && this.lastName && this.email
  }

  isHighPriority() {
    return this.priority === "high" || this.priority === "urgent"
  }

  isAssigned() {
    return this.assignedTo !== null
  }

  // Business logic methods
  canConvert() {
    return this.status !== "converted" && this.status !== "lost"
  }

  markAsConverted(convertedTo = "student", conversionValue = 0) {
    this.status = "converted"
    this.convertedTo = convertedTo
    this.convertedAt = new Date().toISOString()
    this.conversionValue = conversionValue
    this.updatedAt = new Date().toISOString()
  }

  assignTo(userId, assignedBy) {
    this.assignedTo = userId
    this.assignedBy = assignedBy
    this.assignedAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }

  unassign() {
    this.assignedTo = null
    this.assignedBy = null
    this.assignedAt = null
    this.updatedAt = new Date().toISOString()
  }

  addFollowUp(followUpData) {
    this.followUps.push({
      ...followUpData,
      date: new Date().toISOString()
    })
    this.lastFollowUpDate = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }

  getAgeInDays() {
    const now = new Date()
    const created = new Date(this.createdAt)
    return Math.floor((now - created) / (1000 * 60 * 60 * 24))
  }

  // Serialization
  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      whatsapp: this.whatsapp,
      qualification: this.qualification,
      jobPreferences: this.jobPreferences,
      experience: this.experience,
      location: this.location,
      notes: this.notes,
      cvUrl: this.cvUrl,
      documents: this.documents,
      source: this.source,
      sourceDetails: this.sourceDetails,
      status: this.status,
      priority: this.priority,
      assignedTo: this.assignedTo,
      assignedAt: this.assignedAt,
      assignedBy: this.assignedBy,
      convertedTo: this.convertedTo,
      convertedAt: this.convertedAt,
      conversionValue: this.conversionValue,
      followUps: this.followUps,
      lastFollowUpDate: this.lastFollowUpDate,
      nextFollowUpDate: this.nextFollowUpDate,
      score: this.score,
      tags: this.tags,
      lifecycleStage: this.lifecycleStage,
      preferredContactMethod: this.preferredContactMethod,
      bestTimeToContact: this.bestTimeToContact,
      campaignId: this.campaignId,
      campaignName: this.campaignName,
      utmSource: this.utmSource,
      utmMedium: this.utmMedium,
      utmCampaign: this.utmCampaign,
      statusHistory: this.statusHistory,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
