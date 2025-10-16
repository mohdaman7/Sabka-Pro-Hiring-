"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Send,
  Download,
  User,
  GraduationCap,
  DollarSign,
  Calendar,
} from "lucide-react";

export default function CreateProposalPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    studentId: "",
    course: "",
    baseFees: "",
    discount: "",
    finalFees: "",
    validity: "30",
    paymentTerms: "50% advance, 50% on completion",
    notes: "",
  });

  const courses = [
    "Full Stack Development",
    "Data Science Pro",
    "Digital Marketing",
    "UI/UX Design",
    "Cloud Computing",
    "Cyber Security",
  ];

  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      education: "B.Tech Computer Science",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@example.com",
      education: "M.Sc Statistics",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@example.com",
      education: "MBA Marketing",
    },
  ];

  const calculateFinalFees = () => {
    const base = parseFloat(formData.baseFees) || 0;
    const discount = parseFloat(formData.discount) || 0;
    return base - (base * discount) / 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle proposal submission
    console.log("Proposal data:", formData);
    router.push("/crm/deals");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">Create Proposal</h1>
          <p className="text-white/70">Send course proposal to student</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">
              Proposal Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Selection */}
              <div>
                <label className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-[#b87bd1]" />
                  Select Student
                </label>
                <select
                  value={formData.studentId}
                  onChange={(e) =>
                    setFormData({ ...formData, studentId: e.target.value })
                  }
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#b87bd1]"
                >
                  <option value="">Choose a student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.education}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course Selection */}
              <div>
                <label className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-[#b87bd1]" />
                  Course
                </label>
                <select
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#b87bd1]"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-white/80 mb-2 block">
                    Base Fees (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.baseFees}
                    onChange={(e) =>
                      setFormData({ ...formData, baseFees: e.target.value })
                    }
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#b87bd1]"
                    placeholder="15000"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-white/80 mb-2 block">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({ ...formData, discount: e.target.value })
                    }
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#b87bd1]"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-white/80 mb-2 block">
                    Final Fees (₹)
                  </label>
                  <input
                    type="number"
                    value={calculateFinalFees()}
                    readOnly
                    className="w-full p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-semibold"
                  />
                </div>
              </div>

              {/* Validity */}
              <div>
                <label className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#b87bd1]" />
                  Proposal Validity (Days)
                </label>
                <input
                  type="number"
                  value={formData.validity}
                  onChange={(e) =>
                    setFormData({ ...formData, validity: e.target.value })
                  }
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#b87bd1]"
                />
              </div>

              {/* Payment Terms */}
              <div>
                <label className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-[#b87bd1]" />
                  Payment Terms
                </label>
                <textarea
                  value={formData.paymentTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentTerms: e.target.value })
                  }
                  rows="3"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#b87bd1] resize-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="4"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#b87bd1] resize-none"
                  placeholder="Any special instructions or course details..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg hover:shadow-lg transition-all flex-1 justify-center"
                >
                  <Send className="w-4 h-4" />
                  Send Proposal
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">
            Proposal Preview
          </h2>

          <div className="bg-white rounded-lg p-6 text-gray-800 space-y-4">
            <div className="text-center border-b pb-4">
              <h3 className="text-2xl font-bold text-[#803791]">Sabka Pro</h3>
              <p className="text-gray-600">Course Proposal</p>
            </div>

            {formData.studentId && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Student:</span>
                  <span>
                    {students.find((s) => s.id == formData.studentId)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Course:</span>
                  <span>{formData.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Base Fees:</span>
                  <span>₹{formData.baseFees}</span>
                </div>
                {formData.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="font-semibold">Discount:</span>
                    <span className="text-green-600">{formData.discount}%</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Final Fees:</span>
                  <span className="text-lg font-bold text-[#803791]">
                    ₹{calculateFinalFees().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Validity:</span>
                  <span>{formData.validity} days</span>
                </div>
                {formData.notes && (
                  <div className="border-t pt-3">
                    <p className="font-semibold mb-1">Notes:</p>
                    <p className="text-sm text-gray-600">{formData.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
