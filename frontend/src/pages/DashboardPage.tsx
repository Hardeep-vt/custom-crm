import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  CircleAlert,
  Clock3,
  Database,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router";

import { fetchHealth } from "../api/client";

const metrics = [
  { label: "Open deals", value: "--", note: "Your opportunities at a glance", Icon: BriefcaseBusiness },
  { label: "Companies", value: "--", note: "Accounts in your workspace", Icon: Building2 },
  { label: "Contacts", value: "--", note: "People behind the relationships", Icon: UsersRound },
];

const workspaceModules = [
  { label: "Companies", description: "Organize the accounts you work with", Icon: Building2, to: "/companies" },
  { label: "Contacts", description: "Keep people and relationships connected", Icon: UsersRound, to: "/contacts" },
  { label: "Deals & pipeline", description: "Follow opportunities through each stage", Icon: Activity, to: "/pipeline" },
];

export function DashboardPage() {
  const health = useQuery({
    queryKey: ["api", "health"],
    queryFn: ({ signal }) => fetchHealth(signal),
    refetchInterval: 30_000,
  });

  const isHealthy = health.data?.status === "ok";
  const lastChecked = health.dataUpdatedAt
    ? new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(
        health.dataUpdatedAt,
      )
    : null;

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
            Your workspace
          </p>
          <h1 className="text-[30px] font-semibold tracking-[-0.045em] text-[#14211f] sm:text-[36px]">
            Good morning
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Your sales workspace, ready for the conversations that move things forward.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock3 size={14} />
          <span>Live workspace overview</span>
        </div>
      </div>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.86fr)]">
        <div className="hero-panel relative min-h-[252px] overflow-hidden rounded-[26px] bg-[#18342d] p-7 text-white sm:p-9">
          <div className="hero-orb absolute -right-16 -top-28 h-80 w-80 rounded-full border border-white/[0.08]" />
          <div className="hero-orb absolute -right-2 -top-12 h-52 w-52 rounded-full border border-white/[0.08]" />
          <div className="relative z-[1] max-w-[560px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-100/80">
              <Sparkles size={12} />
              Sales workspace
            </div>
            <h2 className="max-w-[520px] text-[27px] font-semibold leading-[1.13] tracking-[-0.04em] sm:text-[33px]">
              Make every customer conversation count.
            </h2>
            <p className="mt-3 max-w-[470px] text-[13px] leading-6 text-emerald-50/65">
              Customer records, opportunities, and next steps will come together here as the CRM takes shape.
            </p>
            <Link
              to="/companies"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#b8ed79] px-4 py-2.5 text-xs font-semibold text-[#17251f] transition hover:bg-[#c9f79a]"
            >
              Explore companies <ArrowRight size={14} />
            </Link>
          </div>
          <div className="hero-decoration absolute bottom-7 right-8 hidden h-[116px] w-[116px] items-center justify-center rounded-[30px] border border-white/[0.12] bg-white/[0.04] lg:flex">
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-[24px] border border-white/[0.12] bg-[#b8ed79] text-[#18342d] shadow-xl shadow-black/10">
              <Activity size={34} strokeWidth={1.8} />
            </div>
          </div>
        </div>

        <HealthCard
          isHealthy={isHealthy}
          isPending={health.isPending}
          isError={health.isError}
          errorMessage={health.error instanceof Error ? health.error.message : undefined}
          lastChecked={lastChecked}
          onRefresh={() => void health.refetch()}
          isFetching={health.isFetching}
        />
      </section>

      <section aria-label="Workspace metrics" className="grid gap-4 md:grid-cols-3">
        {metrics.map(({ label, value, note, Icon }) => (
          <div key={label} className="metric-card rounded-2xl border border-slate-200/80 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-4 text-[30px] font-semibold tracking-[-0.05em] text-slate-800">{value}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon size={17} strokeWidth={1.8} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-[11px] text-slate-400">{note}</span>
              <ArrowUpRight className="text-slate-300" size={14} />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-slate-800">Workspace modules</h2>
              <p className="mt-1 text-xs text-slate-400">Your CRM foundations are ready to grow.</p>
            </div>
            <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-medium text-slate-500">
              6 areas
            </span>
          </div>
          <div className="mt-5 divide-y divide-slate-100">
            {workspaceModules.map(({ label, description, Icon, to }) => (
              <Link
                key={label}
                to={to}
                className="group flex items-center gap-3 py-3.5 first:pt-1 last:pb-1"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-slate-700">{label}</span>
                  <span className="mt-1 block truncate text-[11px] text-slate-400">{description}</span>
                </span>
                <ArrowRight className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-700" size={15} />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Database size={16} />
            </span>
            <h2 className="text-sm font-semibold tracking-tight text-slate-800">Getting started</h2>
          </div>
          <p className="mt-4 text-[13px] leading-6 text-slate-500">
            This is your CRM foundation. As the workspace grows, you will be able to manage customer records,
            log activity, and plan follow-ups from one place.
          </p>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-3 text-[11px] leading-5 text-slate-500">
            <Check className="shrink-0 text-emerald-600" size={15} />
            API connection check is active
          </div>
        </div>
      </section>
    </div>
  );
}

interface HealthCardProps {
  isHealthy: boolean;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  lastChecked: string | null;
  onRefresh: () => void;
  isFetching: boolean;
}

function HealthCard({
  isHealthy,
  isPending,
  isError,
  errorMessage,
  lastChecked,
  onRefresh,
  isFetching,
}: HealthCardProps) {
  const title = isPending
    ? "Checking connection"
    : isHealthy
      ? "Backend connected"
      : "Backend unavailable";
  const description = isPending
    ? "Checking the API health endpoint."
    : isHealthy
      ? "The API is responding and ready for requests."
      : isError
        ? errorMessage || "Could not reach the API. Check that the backend is running."
        : "The health endpoint returned an unexpected status.";

  return (
    <div className="health-card flex min-h-[252px] flex-col rounded-[26px] border border-slate-200/80 bg-white p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          <Activity size={14} className="text-emerald-600" />
          API health
        </div>
        <button
          aria-label="Refresh API status"
          onClick={onRefresh}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="mt-7 flex items-center gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            isPending
              ? "bg-slate-100 text-slate-500"
              : isHealthy
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-600"
          }`}
        >
          {isPending ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : isHealthy ? (
            <Check size={20} />
          ) : (
            <CircleAlert size={20} />
          )}
        </span>
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-slate-800">{title}</p>
          <p className="mt-1 text-[11px] text-slate-400">
            {lastChecked ? `Last checked at ${lastChecked}` : "Waiting for first response"}
          </p>
        </div>
      </div>

      <p className="mt-4 min-h-10 text-xs leading-5 text-slate-500">{description}</p>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            isPending
              ? "bg-slate-100 text-slate-500"
              : isHealthy
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isPending ? "bg-slate-400" : isHealthy ? "bg-emerald-500" : "bg-rose-500"
            }`}
          />
          {isPending ? "Checking" : isHealthy ? "Operational" : "Offline"}
        </span>
        <span className="text-[10px] text-slate-400">GET /api/health</span>
      </div>
    </div>
  );
}