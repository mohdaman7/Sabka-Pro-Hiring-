// MVVM Pattern - Employer Model

export class EmployerModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.companyName = data.companyName || ""
    this.contactPerson = data.contactPerson || ""
    this.email = data.email || ""
    this.phone = data.phone || ""
    this.companySize = data.companySize || ""
    this.industry = data.industry || ""
    this.isVerified = data.isVerified || false
    this.isPremium = data.isPremium || false
    this.jobPostsCount = data.jobPostsCount || 0
    this.hiresCount = data.hiresCount || 0
    this.assignedTo = data.assignedTo || null
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  isValid() {
    return this.companyName && this.email && this.phone
  }

  canPostJobs() {
    return this.isVerified
  }

  hasReachedJobLimit() {
    if (this.isPremium) return false
    return this.jobPostsCount >= 3 // Free tier limit
  }

  toJSON() {
    return {
      id: this.id,
      companyName: this.companyName,
      contactPerson: this.contactPerson,
      email: this.email,
      phone: this.phone,
      companySize: this.companySize,
      industry: this.industry,
      isVerified: this.isVerified,
      isPremium: this.isPremium,
      jobPostsCount: this.jobPostsCount,
      hiresCount: this.hiresCount,
      assignedTo: this.assignedTo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
