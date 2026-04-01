import LoginForm from '@/components/LoginForm';
import { ArrowRight, KeyRound, ShieldCheck, Sparkles } from 'lucide-react';

const highlightCards = [
  {
    icon: ShieldCheck,
    title: 'Validacao imediata',
    description: 'Os campos respondem com feedback claro e deixam o acesso mais confiante.',
  },
  {
    icon: KeyRound,
    title: 'Recuperacao rapida',
    description: 'O usuario pode alternar para o modo de recuperacao sem sair da tela.',
  },
  {
    icon: Sparkles,
    title: 'Memoria local',
    description: 'O login lembra o ultimo identificador quando a opcao estiver ativa.',
  },
] as const;

const detailRows = [
  {
    title: 'Fundo mais suave',
    description: 'Troquei a foto pesada por um ambiente com gradientes quentes, leves e mais confortaveis.',
  },
  {
    title: 'Layout melhor organizado',
    description: 'A pagina agora separa contexto visual e formulario, ajudando a leitura em desktop e mobile.',
  },
  {
    title: 'Mais utilidade no formulario',
    description: 'Entrar, recuperar acesso, preencher conta demo e lembrar sessao ficaram dentro do mesmo fluxo.',
  },
] as const;

export default function Page() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div className="soft-grid absolute inset-0 opacity-40" />
      <div className="float-slow absolute -left-20 top-8 h-72 w-72 rounded-full bg-[var(--accent-soft)] blur-3xl" />
      <div className="float-slower absolute right-[-4rem] top-1/4 h-80 w-80 rounded-full bg-[#f7dcc8] blur-3xl" />
      <div className="float-slow absolute bottom-[-4rem] left-1/3 h-64 w-64 rounded-full bg-[#f3e4d6] blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/35 to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <section className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-white/75 px-4 py-2 text-sm font-medium text-[var(--muted)] shadow-[0_20px_45px_-35px_rgba(60,43,31,0.55)] backdrop-blur">
              <Sparkles className="size-4 text-[var(--accent-strong)]" />
              Login redesenhado para uma experiencia mais calma
            </span>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.02] text-[var(--ink)] sm:text-6xl">
              Um acesso mais leve, claro e funcional para o seu app.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              A tela agora combina um visual mais suave com um fluxo de login mais util. O usuario recebe
              validacao, estado de envio, lembranca local e recuperacao de acesso sem perder contexto.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlightCards.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-[1.75rem] border border-[var(--line)] bg-white/65 p-5 shadow-[0_24px_60px_-45px_rgba(70,48,31,0.5)] backdrop-blur-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-[var(--ink)]">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-[var(--line)] bg-white/65 p-6 shadow-[0_26px_80px_-50px_rgba(63,43,28,0.45)] backdrop-blur-xl sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                O que mudou
              </p>

              <div className="mt-6 space-y-4">
                {detailRows.map(({ title, description }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                      <ArrowRight className="size-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-[var(--ink)]">{title}</h2>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute inset-12 rounded-full bg-white/60 blur-3xl" />
            <LoginForm />
          </section>
        </div>
      </div>
    </main>
  );
}
