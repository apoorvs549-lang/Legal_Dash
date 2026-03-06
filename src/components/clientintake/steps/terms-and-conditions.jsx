import { COLORS } from "@/constants/colors";
import Field from "@/components/ui/field";

function Step3_TermsConditions({ agreed, onToggle, error }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2
          className="text-[28px] font-semibold mb-[6px] text-slate-900"
          style={{ fontFamily: "'Cormorant Garamond', serif" }} // font unchanged
        >
          Terms & Conditions
        </h2>

        <p className="text-sm text-slate-600">
          Please review and accept the terms to complete your intake.
        </p>
      </div>

      <div className="terms-scroll">
        <p className="font-semibold text-slate-900 mb-3">
          Engagement Agreement — Legal Services
        </p>

        <p className="mb-3">
          <strong className="text-slate-900">1. Attorney-Client Relationship.</strong>{" "}
          By submitting this intake form, you acknowledge that no attorney-client
          relationship is established until a formal retainer agreement has been
          signed by both parties. This intake is for evaluation purposes only.
        </p>

        <p className="mb-3">
          <strong className="text-slate-900">2. Confidentiality.</strong>{" "}
          All information provided in this form will be held in strict confidence
          in accordance with applicable professional responsibility rules. We are
          committed to protecting your privacy and will not share your information
          with third parties without your written consent, except as required by law.
        </p>

        <p className="mb-3">
          <strong className="text-slate-900">3. No Guarantee of Outcome.</strong>{" "}
          Our firm makes no representations or warranties regarding the outcome of
          any legal matter. Past results do not guarantee future outcomes. Every
          case is unique and evaluated on its individual merits.
        </p>

        <p className="mb-3">
          <strong className="text-slate-900">4. Accuracy of Information.</strong>{" "}
          You represent that all information provided in this intake form is
          truthful, accurate, and complete to the best of your knowledge. Providing
          false or misleading information may result in disqualification from
          representation.
        </p>

        <p className="mb-3">
          <strong className="text-slate-900">5. Conflict of Interest.</strong>{" "}
          Our firm reserves the right to decline representation if a conflict of
          interest is identified during our intake review process. You will be
          notified promptly should a conflict arise.
        </p>

        <p className="mb-3">
          <strong className="text-slate-900">6. Fee Structure.</strong>{" "}
          Our fee arrangements vary by matter type and will be discussed in detail
          during your consultation. No fees are due at the time of completing this
          intake form.
        </p>

        <p className="mb-3">
          <strong className="text-slate-900">7. Statute of Limitations.</strong>{" "}
          You acknowledge that legal claims are subject to time limits. Completing
          this form does not toll or extend any applicable statute of limitations.
          Please consult with an attorney immediately if you believe your claim may
          be time-sensitive.
        </p>

        <p>
          <strong className="text-slate-900">8. Governing Law.</strong>{" "}
          This agreement shall be governed by and construed in accordance with the
          laws of the applicable jurisdiction in which the services are rendered.
        </p>
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <div
            onClick={onToggle}
            className={`w-5 h-5 min-w-[20px] rounded border-2 flex items-center justify-center transition-all mt-[2px]
            ${error
                ? "border-red-600"
                : agreed
                  ? "border-blue-600 bg-blue-600"
                  : "border-slate-300"
              }`}
          >
            {agreed && (
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                className="stroke-white"
              >
                <path
                  d="M1.5 5.5L4.5 8.5L9.5 2.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <span className="text-sm text-slate-600 leading-[1.6]">
            I have read, understood, and agree to the Terms & Conditions. I
            confirm that all information provided is accurate and I consent to
            its use for the purpose of legal consultation.
          </span>
        </label>

        {error && (
          <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="stroke-blue-500"
            >
              <circle cx="6" cy="6" r="5.5" />
              <path d="M6 3.5v3M6 8h.01" strokeLinecap="round" />
            </svg>
            You must agree to the terms to submit.
          </p>
        )}
      </div>
    </div>
  );
}

export default Step3_TermsConditions;