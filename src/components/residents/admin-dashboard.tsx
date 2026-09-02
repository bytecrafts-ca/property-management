"use client";

import { useEffect, useState } from "react";
import type { TenantPublic } from "@/lib/tenant-types";
import { PageHero } from "@/components/page-hero";
import { TenantForm, emptyTenantForm, type TenantFormValues } from "@/components/residents/tenant-form";
import { createTenant, deleteTenant, listTenants, updateTenant } from "@/lib/firebase/tenants";

type AdminDashboardProps = {
  onLogout: () => void;
};

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [tenants, setTenants] = useState<TenantPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<TenantFormValues>(emptyTenantForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadTenants() {
    setLoading(true);
    try {
      setTenants(await listTenants());
    } catch {
      setError("Unable to load tenants.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTenants();
  }, []);

  function startCreate() {
    setCreating(true);
    setSelectedId(null);
    setForm(emptyTenantForm);
    setError("");
    setMessage("");
  }

  function startEdit(tenant: TenantPublic) {
    setCreating(false);
    setSelectedId(tenant.id);
    setForm({
      email: tenant.email,
      password: "",
      name: tenant.name,
      phone: tenant.phone,
      unit: tenant.unit,
      address: tenant.address,
      neighbourhood: tenant.neighbourhood,
      rent: tenant.rent?.toString() ?? "",
      leaseStart: tenant.leaseStart,
      emergencyContact: tenant.emergencyContact,
      notes: tenant.notes,
    });
    setError("");
    setMessage("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        email: form.email,
        password: form.password || undefined,
        name: form.name,
        phone: form.phone,
        unit: form.unit,
        address: form.address,
        neighbourhood: form.neighbourhood,
        rent: form.rent ? Number(form.rent) : null,
        leaseStart: form.leaseStart,
        emergencyContact: form.emergencyContact,
        notes: form.notes,
      };

      const tenant = selectedId && !creating
        ? await updateTenant(selectedId, payload)
        : await createTenant({ ...payload, password: form.password });

      setMessage(
        selectedId && !creating
          ? form.password
            ? "Tenant updated. Password reset email sent."
            : "Tenant updated."
          : "Tenant account created."
      );
      setCreating(false);
      setSelectedId(tenant.id);
      await loadTenants();
      startEdit(tenant);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save tenant.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this tenant account?")) return;
    try {
      await deleteTenant(id);
      setMessage("Tenant deleted.");
      setSelectedId(null);
      setCreating(false);
      setForm(emptyTenantForm);
      await loadTenants();
    } catch {
      setError("Unable to delete tenant.");
    }
  }

  const selected = tenants.find((t) => t.id === selectedId) ?? null;

  return (
    <>
      <PageHero
        badge="Admin"
        title="Tenant accounts"
        description="Create login accounts for tenants, store their unit details, and pull everything up when a request comes in."
      >
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={startCreate}
            className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:bg-white/90 sm:px-8"
          >
            New tenant
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full border border-white/40 px-6 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10 sm:px-8"
          >
            Sign out
          </button>
        </div>
      </PageHero>

      <div className="bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
        <div className="mx-auto max-w-7xl">
          {(message || error) && (
            <div className={`mb-6 rounded-xl px-4 py-3 text-sm ${error ? "bg-red-50 text-red-800" : "bg-soft text-ink"}`}>
              {error || message}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.25rem] border border-line bg-surface">
              <div className="border-b border-line px-5 py-4 sm:px-6">
                <h2 className="text-sm font-medium">All tenants ({tenants.length})</h2>
              </div>
              <div className="max-h-[560px] overflow-y-auto">
                {loading ? (
                  <p className="px-5 py-6 text-sm text-muted sm:px-6">Loading...</p>
                ) : tenants.length === 0 ? (
                  <p className="px-5 py-6 text-sm text-muted sm:px-6">No tenant accounts yet.</p>
                ) : (
                  tenants.map((tenant) => (
                    <button
                      key={tenant.id}
                      type="button"
                      onClick={() => startEdit(tenant)}
                      className={`block w-full border-b border-line px-5 py-4 text-left transition-colors hover:bg-soft sm:px-6 ${
                        selectedId === tenant.id ? "bg-soft" : ""
                      }`}
                    >
                      <p className="font-medium">{tenant.name}</p>
                      <p className="mt-1 text-sm text-muted">{tenant.email}</p>
                      <p className="mt-1 text-xs text-muted">
                        {tenant.unit} · {tenant.address}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </section>

            <section className="rounded-[1.25rem] border border-line bg-surface p-5 sm:p-7">
              <h2 className="text-display-sm mb-6 text-2xl">
                {creating ? "Create tenant account" : selected ? "Edit tenant" : "Select a tenant"}
              </h2>

              {creating || selected ? (
                <form onSubmit={handleSave} className="space-y-5">
                  <TenantForm values={form} onChange={setForm} isEdit={!!selected && !creating} />
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface hover:bg-ink/90 disabled:opacity-60"
                    >
                      {saving ? "Saving..." : creating ? "Create account" : "Save changes"}
                    </button>
                    {selected && !creating && (
                      <button
                        type="button"
                        onClick={() => handleDelete(selected.id)}
                        className="rounded-full border border-line px-6 py-3 text-sm text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <p className="text-sm text-muted">Choose a tenant from the list or create a new account.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
