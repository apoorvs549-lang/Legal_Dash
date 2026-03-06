import { COLORS } from "@/constants/colors";
import Field from "@/components/ui/field";

function Step1_PersonalDetails({ data, onChange, errors }) {
  const fields = [
    { key: "fullName", label: "Full Name", type: "text", placeholder: "e.g. Alexandra Thornton" },
    { key: "email", label: "Email Address", type: "email", placeholder: "alex@example.com" },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" },
    { key: "dob", label: "Date of Birth", type: "date" },
    { key: "address", label: "Full Address", type: "text", placeholder: "123 Main St, City, State, ZIP" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2
          className="text-[28px] font-semibold mb-[6px] font-serif text-slate-900 dark:text-slate-100 "
        // style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.text }} // font unchanged
        >
          Personal Details
        </h2>

        <p
          className="text-sm text-slate-600 dark:text-slate-400"
        >
          Please provide your personal information to begin the intake process.
        </p>
      </div>

      {fields.map((f) => (
        <Field key={f.key} label={f.label} error={errors[f.key]} required>
          <input
            type={f.type}
            className={`legal-input${errors[f.key] ? " error" : ""}`}
            placeholder={f.placeholder}
            value={data[f.key] || ""}
            onChange={(e) => onChange(f.key, e.target.value)}
          />
        </Field>
      ))}
    </div>
  );
}

export default Step1_PersonalDetails;