// MVVM Pattern - Model Layer
// Handles data structure and business logic for leads

export class LeadModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.name = data.name || ""
    this.email = data.email || ""
    this.whatsapp = data.whatsapp || ""
    this.qualification = data.qualification || ""
    this.jobPreferences = data.jobPreferences || ""
    this.cvUrl = data.cvUrl || null
    this.registrationType = data.registrationType || "free" // 'free' or 'pro'
    this.source = data.source || "website" // 'social', 'google', 'direct', 'walkin'
    this.status = data.status || "new" // 'new', 'followup', 'converted'
    this.assignedTo = data.assignedTo || null
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  // Validation methods
  isValid() {
    return this.name && this.email && this.whatsapp
  }

  isProLead() {
    return this.registrationType === "pro"
  }

  // Business logic methods
  canConvert() {
    return this.status !== "converted"
  }

  markAsConverted() {
    this.status = "converted"
    this.updatedAt = new Date().toISOString()
  }

  // Serialization
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      whatsapp: this.whatsapp,
      qualification: this.qualification,
      jobPreferences: this.jobPreferences,
      cvUrl: this.cvUrl,
      registrationType: this.registrationType,
      source: this.source,
      status: this.status,
      assignedTo: this.assignedTo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
