// MVVM Pattern - Candidate Model

export class CandidateModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.name = data.name || ""
    this.email = data.email || ""
    this.phone = data.phone || ""
    this.qualification = data.qualification || ""
    this.experience = data.experience || 0
    this.skills = data.skills || []
    this.cvUrl = data.cvUrl || null
    this.videoResumeUrl = data.videoResumeUrl || null
    this.isPro = data.isPro || false
    this.status = data.status || "active" // 'active', 'placed', 'inactive'
    this.assignedTo = data.assignedTo || null
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  isValid() {
    return this.name && this.email && this.phone
  }

  canApplyToJobs() {
    return this.status === "active"
  }

  hasVideoResume() {
    return !!this.videoResumeUrl
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      qualification: this.qualification,
      experience: this.experience,
      skills: this.skills,
      cvUrl: this.cvUrl,
      videoResumeUrl: this.videoResumeUrl,
      isPro: this.isPro,
      status: this.status,
      assignedTo: this.assignedTo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
