import { COLORS } from "@/constants/colors";
import Field from "@/components/ui/field";

function Step2_CaseDetails({ data, onChange, errors }) {
  const caseTypes = [
    "Personal Injury", "Family Law", "Criminal Defense", "Employment Law",
    "Real Estate", "Estate Planning", "Business Litigation", "Immigration", "Other",
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2
          className="text-[28px] font-semibold mb-[6px]"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.text }} // font unchanged
        >
          Case Details
        </h2>

        <p
          className="text-sm"
          style={{ color: COLORS.textMuted }}
        >
          Tell us about the matter you need legal assistance with.
        </p>
      </div>

      <Field label="Case Type" error={errors.caseType} required>
        <select
          className={`legal-input${errors.caseType ? " error" : ""}`}
          value={data.caseType || ""}
          onChange={(e) => onChange("caseType", e.target.value)}
        >
          <option value="">Select case type...</option>
          {caseTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Case Description" error={errors.caseDescription} required>
        <textarea
          className={`legal-input${errors.caseDescription ? " error" : ""}`}
          placeholder="Describe the circumstances and key facts of your case..."
          value={data.caseDescription || ""}
          onChange={(e) => onChange("caseDescription", e.target.value)}
        />
      </Field>

      <Field label="Incident Date" error={errors.incidentDate} required>
        <input
          type="date"
          className={`legal-input${errors.incidentDate ? " error" : ""}`}
          value={data.incidentDate || ""}
          onChange={(e) => onChange("incidentDate", e.target.value)}
        />
      </Field>

      <Field label="Opposing Party" error={errors.opposingParty} required>
        <input
          type="text"
          className={`legal-input${errors.opposingParty ? " error" : ""}`}
          placeholder="Name of individual, company, or entity"
          value={data.opposingParty || ""}
          onChange={(e) => onChange("opposingParty", e.target.value)}
        />
      </Field>
    </div>
  );
}

export default Step2_CaseDetails;