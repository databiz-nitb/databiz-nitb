import type { ReactNode } from "react";
import authImage from "../../assets/images/8.png";

const AuthShell = ({ children }: { children: ReactNode }) => (
  <main className="flex min-h-screen items-center justify-center bg-[#080c11] px-4 py-8 font-sans text-slate-100 sm:px-6">
    <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#101820] shadow-2xl shadow-black/30 md:min-h-[640px] md:grid-cols-[0.95fr_1.05fr]">
      <aside className="relative hidden min-h-[640px] overflow-hidden md:block">
        <img src={authImage} alt="Students collaborating around a laptop in a campus workspace" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c11]/95 via-[#080c11]/40 to-[#080c11]/10" aria-hidden="true" />
        <div className="relative flex h-full min-h-[640px] flex-col justify-end p-8 lg:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sky-200">DataBiz / NIT Bhopal</p>
          <h2 className="text-3xl font-semibold leading-tight text-white lg:text-4xl">Learn together.<br />Build what matters.</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-200">Join a student community exploring data science, machine learning, and AI through shared practice.</p>
        </div>
      </aside>
      <section className="flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 md:px-10">
        {children}
      </section>
    </div>
  </main>
);

export default AuthShell;
