"use client";

export type TenantFormValues = {
  email: string;
  password: string;
  name: string;
  phone: string;
  unit: string;
  address: string;
  neighbourhood: string;
  rent: string;
  leaseStart: string;
  emergencyContact: string;
  notes: string;
};

export const emptyTenantForm: TenantFormValues = {
  email: "",
  password: "",
  name: "",
  phone: "",
  unit: "",
  address: "",
  neighbourhood: "",
  rent: "",
  leaseStart: "",
  emergencyContact: "",
  notes: "",
};

type TenantFormProps = {
  values: TenantFormValues;
  onChange: (values: TenantFormValues) => void;
  isEdit?: boolean;
};

const fields: { key: keyof TenantFormValues; label: string; type?: string; span?: 2 }[] = [
  { key: "name", label: "Full name" },
  { key: "email", label: "Login email", type: "email" },
  { key: "password", label: "Password", type: "password" },
  { key: "phone", label: "Phone" },
  { key: "unit", label: "Unit" },
  { key: "address", label: "Address", span: 2 },
  { key: "neighbourhood", label: "Neighbourhood" },
  { key: "rent", label: "Rent (monthly)", type: "number" },
  { key: "leaseStart", label: "Lease start", type: "date" },
  { key: "emergencyContact", label: "Emergency contact", span: 2 },
  { key: "notes", label: "Internal notes", span: 2 },
];

export function TenantForm({ values, onChange, isEdit }: TenantFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map(({ key, label, type, span }) => {
        if (key === "password" && isEdit) {
          return (
            <label key={key} className={span === 2 ? "sm:col-span-2" : ""}>
              <span className="text-label text-muted mb-2 block">New password (optional)</span>
              <input
                type="password"
                value={values.password}
                onChange={(e) => onChange({ ...values, password: e.target.value })}
                placeholder="Leave blank to keep current"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
              />
            </label>
          );
        }

        if (key === "notes") {
          return (
            <label key={key} className="sm:col-span-2">
              <span className="text-label text-muted mb-2 block">{label}</span>
              <textarea
                value={values.notes}
                onChange={(e) => onChange({ ...values, notes: e.target.value })}
                rows={4}
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
              />
            </label>
          );
        }

        return (
          <label key={key} className={span === 2 ? "sm:col-span-2" : ""}>
            <span className="text-label text-muted mb-2 block">
              {label}
              {key === "password" && !isEdit ? " (required)" : ""}
            </span>
            <input
              type={type ?? "text"}
              value={values[key]}
              onChange={(e) => onChange({ ...values, [key]: e.target.value })}
              required={key === "password" ? !isEdit : ["email", "name"].includes(key)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </label>
        );
      })}
    </div>
  );
}
