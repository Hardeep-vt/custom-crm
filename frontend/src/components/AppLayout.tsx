import {
  Activity,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  Command,
  ContactRound,
  LayoutDashboard,
  ListChecks,
  PanelsTopLeft,
  Search,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router";

const navigation = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/companies", label: "Companies", Icon: Building2 },
  { to: "/contacts", label: "Contacts", Icon: ContactRound },
  { to: "/deals", label: "Deals", Icon: BriefcaseBusiness },
  { to: "/pipeline", label: "Pipeline", Icon: PanelsTopLeft },
  { to: "/tasks", label: "Tasks", Icon: ListChecks },
];

export function AppLayout() {
  const location = useLocation();
  const currentPage = navigation.find((item) => location.pathname.startsWith(item.to))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-[#f5f7f6] text-slate-900 lg:flex">
      <aside className="sidebar-shell flex w-full flex-col bg-[#12201d] text-white lg:sticky lg:top-0 lg:h-screen lg:w-[252px] lg:shrink-0">
        <div className="flex items-center gap-3 px-5 py-5 lg:px-6 lg:py-7">
          <div className="brand-mark flex h-10 w-10 items-center justify-center rounded-2xl bg-[#b8ed79] text-[#12201d]">
            <Activity size={21} strokeWidth={2.6} />
          </div>
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.03em]">Custom CRM</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-100/50">
              Sales workspace
            </p>
          </div>
        </div>

        <div className="px-4 pb-2 pt-1 lg:px-4 lg:pt-5">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400/70">
            Workspace
          </p>
          <nav aria-label="Main navigation" className="flex gap-1 overflow-x-auto lg:flex-col">
            {navigation.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `nav-link group flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${
                    isActive
                      ? "bg-white/10 text-white shadow-inner shadow-white/[0.02]"
                      : "text-slate-300/75 hover:bg-white/[0.06] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={isActive ? "text-[#b8ed79]" : "text-slate-400 group-hover:text-white"}
                    />
                    <span>{label}</span>
                    {label === "Tasks" && (
                      <span className="ml-auto hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70 lg:inline-flex">
                        0
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto hidden px-4 pb-5 lg:block">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b8ed79]" />
              Your workspace
            </div>
            <p className="text-xs leading-5 text-slate-400">
              A focused space for better customer conversations.
            </p>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/3 rounded-full bg-[#b8ed79]" />
            </div>
            <p className="mt-2 text-[10px] text-slate-500">Sales team | v1</p>
          </div>
          <p className="px-2 pt-5 text-[10px] text-slate-500">CUSTOM CRM | PRIVATE WORKSPACE</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="topbar sticky top-0 z-10 flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-[#f8faf9]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center gap-3 text-[13px]">
            <span className="hidden text-slate-400 sm:inline">Workspace</span>
            <span className="hidden text-slate-300 sm:inline">/</span>
            <span className="font-semibold text-slate-700">{currentPage}</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="search-box hidden h-10 w-[230px] items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 text-slate-400 md:flex xl:w-[270px]">
              <Search size={15} />
              <span className="flex-1 text-xs">Search your workspace</span>
              <span className="flex items-center gap-0.5 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-1 text-[9px] text-slate-400">
                <Command size={10} /> K
              </span>
            </label>
            <div className="hidden h-9 items-center gap-2 rounded-xl border border-slate-200/80 bg-white/75 px-3 text-[11px] font-medium text-slate-500 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Sales workspace
            </div>
            <CircleHelp className="text-slate-400" size={18} strokeWidth={1.8} aria-label="Help" />
          </div>
        </header>

        <main className="w-full flex-1 px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-[1240px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}