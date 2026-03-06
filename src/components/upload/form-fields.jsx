import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import NotesIcon from "@mui/icons-material/Notes";
import TagIcon from "@mui/icons-material/Tag";

const CASE_TYPES = [
  "Civil Litigation",
  "Criminal Defense",
  "Corporate Law",
  "Family Law",
  "Immigration",
  "Intellectual Property",
  "Real Estate",
  "Tax Law",
  "Employment Law",
  "Other",
];

const FieldWrapper = ({ label, required, icon, children }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
      {icon && <span className="text-gray-400">{icon}</span>}
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const FormFields = ({ form, setForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-5">
      <FieldWrapper
        label="Client Name"
        required
        icon={<PersonIcon fontSize="small" />}
      >
        <input
          name="clientName"
          value={form.clientName}
          onChange={handleChange}
          placeholder="Enter client name"
          className={inputCls}
        />
      </FieldWrapper>

      <FieldWrapper
        label="Case Type"
        required
        icon={<CategoryIcon fontSize="small" />}
      >
        <select
          name="caseType"
          value={form.caseType}
          onChange={handleChange}
          className={`${inputCls} appearance-none cursor-pointer`}
        >
          <option value="">Select a case type</option>
          {CASE_TYPES.map((ct) => (
            <option key={ct} value={ct}>
              {ct}
            </option>
          ))}
        </select>
      </FieldWrapper>

      <FieldWrapper label="Description" icon={<NotesIcon fontSize="small" />}>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Enter case description or additional notes..."
          className={`${inputCls} resize-none`}
        />
      </FieldWrapper>

      <FieldWrapper
        label="Current Version"
        required
        icon={<TagIcon fontSize="small" />}
      >
        <input
          name="version"
          value={form.version}
          onChange={handleChange}
          placeholder="e.g., 1.0.0 or v2.3"
          className={inputCls}
        />
      </FieldWrapper>
    </div>
  );
};

export default FormFields;