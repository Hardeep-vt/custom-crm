import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { Link } from "react-router";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-7">
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
          Sales workspace
        </p>
        <h1 className="text-[30px] font-semibold tracking-[-0.045em] text-[#14211f] sm:text-[36px]">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
      </div>

      <section className="flex min-h-[380px] flex-col items-center justify-center rounded-[26px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-[26px] bg-emerald-50 text-emerald-700">
          <Compass size={30} strokeWidth={1.5} />
          <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-xl border-2 border-white bg-[#b8ed79] text-[#203a2f]">
            <Sparkles size={13} />
          </span>
        </div>
        <span className="mt-6 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Coming soon
        </span>
        <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-800">
          {title} will take shape here
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          This section is ready for its first feature. Return to the dashboard to check the backend connection.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
        >
          Back to dashboard <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}