// MVVM Pattern - Application Model

export class ApplicationModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.candidateId = data.candidateId || null
    this.candidateName = data.candidateName || ""
    this.jobId = data.jobId || null
    this.jobTitle = data.jobTitle || ""
    this.resumeUrl = data.resumeUrl || null
    this.coverLetter = data.coverLetter || ""
    this.matchScore = data.matchScore || 0
    this.stage = data.stage || "new" // 'new', 'screening', 'interview', 'offer', 'hired', 'rejected'
    this.rating = data.rating || 0
    this.notes = data.notes || []
    this.interviews = data.interviews || []
    this.appliedDate = data.appliedDate || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  isValid() {
    return this.candidateId && this.jobId
  }

  canMoveToNextStage() {
    const stageOrder = ["new", "screening", "interview", "offer", "hired"]
    return stageOrder.includes(this.stage) && this.stage !== "hired" && this.stage !== "rejected"
  }

  getNextStage() {
    const stageOrder = ["new", "screening", "interview", "offer", "hired"]
    const currentIndex = stageOrder.indexOf(this.stage)
    return currentIndex < stageOrder.length - 1 ? stageOrder[currentIndex + 1] : this.stage
  }

  toJSON() {
    return {
      id: this.id,
      candidateId: this.candidateId,
      candidateName: this.candidateName,
      jobId: this.jobId,
      jobTitle: this.jobTitle,
      resumeUrl: this.resumeUrl,
      coverLetter: this.coverLetter,
      matchScore: this.matchScore,
      stage: this.stage,
      rating: this.rating,
      notes: this.notes,
      interviews: this.interviews,
      appliedDate: this.appliedDate,
      updatedAt: this.updatedAt,
    }
  }
}
