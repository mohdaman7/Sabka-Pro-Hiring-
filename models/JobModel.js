// MVVM Pattern - Job Model

export class JobModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.title = data.title || ""
    this.description = data.description || ""
    this.company = data.company || ""
    this.location = data.location || ""
    this.type = data.type || "Full-time" // 'Full-time', 'Part-time', 'Contract', 'Remote'
    this.salary = data.salary || ""
    this.experience = data.experience || ""
    this.skills = data.skills || []
    this.requirements = data.requirements || []
    this.benefits = data.benefits || []
    this.status = data.status || "active" // 'active', 'closed', 'draft'
    this.applications = data.applications || 0
    this.views = data.views || 0
    this.employerId = data.employerId || null
    this.assignedTo = data.assignedTo || null
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  isValid() {
    return this.title && this.company && this.location && this.type
  }

  isActive() {
    return this.status === "active"
  }

  canReceiveApplications() {
    return this.status === "active"
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      company: this.company,
      location: this.location,
      type: this.type,
      salary: this.salary,
      experience: this.experience,
      skills: this.skills,
      requirements: this.requirements,
      benefits: this.benefits,
      status: this.status,
      applications: this.applications,
      views: this.views,
      employerId: this.employerId,
      assignedTo: this.assignedTo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
