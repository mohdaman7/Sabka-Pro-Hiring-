/**
 * ATS Service - Comprehensive Resume Parsing, Scoring & Template APIs
 * Integrates multiple AI services for resume optimization
 */

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// API Keys (Store in .env)
const AFFINDA_API_KEY = process.env.NEXT_PUBLIC_AFFINDA_API_KEY;
const RCHILLI_API_KEY = process.env.NEXT_PUBLIC_RCHILLI_API_KEY;
const JOBSCAN_API_KEY = process.env.NEXT_PUBLIC_JOBSCAN_API_KEY;
const RESUMEWORDED_API_KEY = process.env.NEXT_PUBLIC_RESUMEWORDED_API_KEY;
const CANVA_API_KEY = process.env.NEXT_PUBLIC_CANVA_API_KEY;

class ATSService {
  // ========== RESUME PARSING APIs ==========
  
  /**
   * Parse resume using Affinda API (Primary)
   * https://www.affinda.com/
   */
  async parseWithAffinda(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await axios.post(
        "https://api.affinda.com/v3/resume_parser",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${AFFINDA_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      return {
        success: true,
        data: {
          personalInfo: {
            name: response.data.name?.value,
            email: response.data.emails?.[0],
            phone: response.data.phones?.[0],
            location: response.data.location?.formatted,
          },
          summary: response.data.summary,
          education: response.data.education?.map(edu => ({
            degree: edu.degree,
            institution: edu.organization,
            dates: `${edu.dates?.start_date} - ${edu.dates?.end_date}`,
          })),
          experience: response.data.work_experience?.map(exp => ({
            title: exp.job_title,
            company: exp.organization,
            dates: `${exp.dates?.start_date} - ${exp.dates?.end_date}`,
            description: exp.job_description,
          })),
          skills: response.data.skills?.map(s => s.name),
        },
      };
    } catch (error) {
      console.error("Affinda parsing error:", error);
      throw error;
    }
  }

  /**
   * Parse resume using RChilli API (Fallback)
   * https://www.rchilli.com/
   */
  async parseWithRChilli(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userkey", RCHILLI_API_KEY);
      formData.append("version", "7.0.0");
      formData.append("subuserid", "default");
      
      const response = await axios.post(
        "https://rest.rchilli.com/RChilliParser/Rchilli/parseResumeBinary",
        formData
      );
      
      const parsed = response.data.ResumeParserData;
      
      return {
        success: true,
        data: {
          personalInfo: {
            name: parsed.Name?.FormattedName,
            email: parsed.Email?.[0]?.EmailAddress,
            phone: parsed.PhoneNumber?.[0]?.FormattedNumber,
            location: parsed.Address?.[0]?.City,
          },
          summary: parsed.ExecutiveSummary,
          education: parsed.EducationDetails?.map(edu => ({
            degree: edu.Degree?.DegreeName,
            institution: edu.Institution?.Name,
            dates: `${edu.StartDate} - ${edu.EndDate}`,
          })),
          experience: parsed.WorkHistory?.map(exp => ({
            title: exp.JobProfile?.Title,
            company: exp.Employer?.EmployerName,
            dates: `${exp.StartDate} - ${exp.EndDate}`,
            description: exp.JobDescription,
          })),
          skills: parsed.SkillKeywords?.map(s => s.Skill),
        },
      };
    } catch (error) {
      console.error("RChilli parsing error:", error);
      throw error;
    }
  }

  /**
   * Parse resume using Sovren API (Alternative)
   * https://www.sovren.com/
   */
  async parseWithSovren(file) {
    try {
      const base64 = await this.fileToBase64(file);
      
      const response = await axios.post(
        "https://rest.resumeparsing.com/v10/parser/resume",
        {
          DocumentAsBase64String: base64,
        },
        {
          headers: {
            "Sovren-AccountId": process.env.NEXT_PUBLIC_SOVREN_ACCOUNT_ID,
            "Sovren-ServiceKey": process.env.NEXT_PUBLIC_SOVREN_API_KEY,
          },
        }
      );
      
      const parsed = response.data.Value.ResumeData;
      
      return {
        success: true,
        data: {
          personalInfo: {
            name: parsed.ContactInformation?.CandidateName?.FormattedName,
            email: parsed.ContactInformation?.EmailAddresses?.[0],
            phone: parsed.ContactInformation?.Telephones?.[0],
          },
          education: parsed.Education?.EducationDetails,
          experience: parsed.EmploymentHistory?.Positions,
          skills: parsed.Skills?.Raw,
        },
      };
    } catch (error) {
      console.error("Sovren parsing error:", error);
      throw error;
    }
  }

  // ========== ATS SCORING APIs ==========
  
  /**
   * Score resume using Jobscan API (Primary)
   * https://www.jobscan.co/
   */
  async scoreWithJobscan(resumeText, jobDescription = "") {
    try {
      const response = await axios.post(
        "https://api.jobscan.co/v1/scan",
        {
          resume: resumeText,
          job_description: jobDescription,
        },
        {
          headers: {
            "Authorization": `Bearer ${JOBSCAN_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      return {
        success: true,
        data: {
          atsScore: response.data.match_rate,
          matchedKeywords: response.data.matched_keywords,
          missingKeywords: response.data.missing_keywords,
          suggestions: response.data.recommendations,
          hardSkills: response.data.hard_skills,
          softSkills: response.data.soft_skills,
        },
      };
    } catch (error) {
      console.error("Jobscan scoring error:", error);
      throw error;
    }
  }

  /**
   * Score resume using ResumeWorded API (Fallback)
   * https://resumeworded.com/
   */
  async scoreWithResumeWorded(resumeText) {
    try {
      const response = await axios.post(
        "https://api.resumeworded.com/v1/analyze",
        {
          resume_text: resumeText,
        },
        {
          headers: {
            "X-API-Key": RESUMEWORDED_API_KEY,
          },
        }
      );
      
      return {
        success: true,
        data: {
          atsScore: response.data.score,
          improvements: response.data.suggestions,
          strengths: response.data.strengths,
          weaknesses: response.data.weaknesses,
        },
      };
    } catch (error) {
      console.error("ResumeWorded scoring error:", error);
      throw error;
    }
  }

  /**
   * Score resume using VMock API
   * https://www.vmock.com/
   */
  async scoreWithVMock(resumeFile) {
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      
      const response = await axios.post(
        "https://api.vmock.com/v1/smart-resume",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_VMOCK_API_KEY}`,
          },
        }
      );
      
      return {
        success: true,
        data: {
          overallScore: response.data.overall_score,
          presentation: response.data.presentation_score,
          impact: response.data.impact_score,
          competencies: response.data.competencies_score,
          detailedFeedback: response.data.feedback,
        },
      };
    } catch (error) {
      console.error("VMock scoring error:", error);
      throw error;
    }
  }

  // ========== TEMPLATE APIs ==========
  
  /**
   * Get templates from Canva API
   * https://www.canva.com/developers/
   */
  async getCanvaTemplates() {
    try {
      const response = await axios.get(
        "https://api.canva.com/rest/v1/designs/templates",
        {
          headers: {
            "Authorization": `Bearer ${CANVA_API_KEY}`,
          },
          params: {
            query: "ats resume",
            limit: 20,
          },
        }
      );
      
      return {
        success: true,
        data: response.data.items.map(template => ({
          id: template.id,
          name: template.name,
          preview: template.thumbnail,
          source: "Canva",
          category: template.category,
        })),
      };
    } catch (error) {
      console.error("Canva templates error:", error);
      return { success: false, data: [] };
    }
  }

  /**
   * Get templates from Novoresume API
   * https://novoresume.com/
   */
  async getNovoresumeTemplates() {
    try {
      const response = await axios.get(
        "https://api.novoresume.com/v1/templates",
        {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_NOVORESUME_API_KEY,
          },
        }
      );
      
      return {
        success: true,
        data: response.data.templates.map(template => ({
          id: template.id,
          name: template.name,
          preview: template.preview_url,
          source: "Novoresume",
          atsScore: template.ats_compatibility,
        })),
      };
    } catch (error) {
      console.error("Novoresume templates error:", error);
      return { success: false, data: [] };
    }
  }

  /**
   * Get templates from FlowCV API
   * https://flowcv.com/
   */
  async getFlowCVTemplates() {
    try {
      const response = await axios.get(
        "https://api.flowcv.com/v1/templates",
        {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_FLOWCV_API_KEY}`,
          },
        }
      );
      
      return {
        success: true,
        data: response.data.map(template => ({
          id: template.id,
          name: template.title,
          preview: template.thumbnail,
          source: "FlowCV",
          isPro: template.premium,
        })),
      };
    } catch (error) {
      console.error("FlowCV templates error:", error);
      return { success: false, data: [] };
    }
  }

  /**
   * Get JSON Resume templates (Open Source)
   * https://jsonresume.org/
   */
  async getJSONResumeTemplates() {
    try {
      const themes = [
        "elegant", "kendall", "autumn", "macchiato", "papirus",
        "stackoverflow", "short", "class", "even", "spartan"
      ];
      
      return {
        success: true,
        data: themes.map((theme, idx) => ({
          id: `json-${idx}`,
          name: theme.charAt(0).toUpperCase() + theme.slice(1),
          preview: `https://themes.jsonresume.org/theme/${theme}`,
          source: "JSONResume",
          free: true,
          atsScore: 95,
        })),
      };
    } catch (error) {
      console.error("JSONResume templates error:", error);
      return { success: false, data: [] };
    }
  }

  // ========== UTILITY FUNCTIONS ==========
  
  /**
   * Convert file to base64
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }

  /**
   * Get all templates from all sources
   */
  async getAllTemplates() {
    try {
      const [canva, novoresume, flowcv, jsonresume] = await Promise.all([
        this.getCanvaTemplates(),
        this.getNovoresumeTemplates(),
        this.getFlowCVTemplates(),
        this.getJSONResumeTemplates(),
      ]);
      
      return {
        success: true,
        data: [
          ...(canva.data || []),
          ...(novoresume.data || []),
          ...(flowcv.data || []),
          ...(jsonresume.data || []),
        ],
      };
    } catch (error) {
      console.error("Get all templates error:", error);
      return { success: false, data: [] };
    }
  }

  /**
   * Comprehensive resume analysis (Parse + Score + Suggest)
   */
  async analyzeResume(file, jobDescription = "") {
    try {
      // Step 1: Parse resume
      let parsedData;
      try {
        parsedData = await this.parseWithAffinda(file);
      } catch (e) {
        parsedData = await this.parseWithRChilli(file);
      }
      
      // Step 2: Score against ATS
      const resumeText = JSON.stringify(parsedData.data);
      let scoreData;
      try {
        scoreData = await this.scoreWithJobscan(resumeText, jobDescription);
      } catch (e) {
        scoreData = await this.scoreWithResumeWorded(resumeText);
      }
      
      return {
        success: true,
        data: {
          parsed: parsedData.data,
          score: scoreData.data,
        },
      };
    } catch (error) {
      console.error("Analyze resume error:", error);
      throw error;
    }
  }
}

export const atsService = new ATSService();
