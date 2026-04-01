'use client';

import {
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
  WandSparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type Mode = 'login' | 'recovery';
type StatusType = 'idle' | 'success' | 'error' | 'info';
type FieldErrors = {
  identifier?: string;
  password?: string;
  recoveryEmail?: string;
};
type StatusState = {
  type: StatusType;
  message: string;
};

const STORAGE_KEY = 'calm-access-identifier';
const DEMO_ACCOUNT = {
  identifier: 'demo@aurora.app',
  password: 'CalmLogin123',
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getModeStatus(mode: Mode): StatusState {
  if (mode === 'recovery') {
    return {
      type: 'info',
      message: 'Informe um email valido para receber o link de recuperacao.',
    };
  }

  return {
    type: 'info',
    message: 'Dica: use a conta demo para testar a experiencia completa do formulario.',
  };
}

function getPasswordStrength(password: string) {
  if (!password) {
    return {
      score: 0,
      label: 'Aguardando senha',
      hint: 'Use 8 ou mais caracteres para um acesso mais estavel.',
      barTone: 'bg-[#ead2c1]',
      textTone: 'text-[#876857]',
    };
  }

  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }

  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
    score += 1;
  }

  if (/\d/.test(password)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) {
    score += 1;
  }

  if (score <= 1) {
    return {
      score,
      label: 'Senha fraca',
      hint: 'Misture letras, numeros e aumente o tamanho da senha.',
      barTone: 'bg-[#d79a83]',
      textTone: 'text-[#9c5b42]',
    };
  }

  if (score === 2) {
    return {
      score,
      label: 'Senha razoavel',
      hint: 'Adicionar mais variedade deixa sua senha mais confiavel.',
      barTone: 'bg-[#e2b372]',
      textTone: 'text-[#9f6b22]',
    };
  }

  if (score === 3) {
    return {
      score,
      label: 'Senha boa',
      hint: 'Voce ja tem uma base segura para seguir.',
      barTone: 'bg-[#9ec78d]',
      textTone: 'text-[#55784a]',
    };
  }

  return {
    score,
    label: 'Senha forte',
    hint: 'Otimo equilibrio entre tamanho e variedade.',
    barTone: 'bg-[#6fb08c]',
    textTone: 'text-[#356450]',
  };
}

const statusStyles: Record<StatusType, string> = {
  idle: 'border-transparent bg-transparent text-[var(--muted)]',
  info: 'border-[#eedacc] bg-[#fff8f2] text-[#7b5f4c]',
  success: 'border-[#cfe5d7] bg-[#f1fbf5] text-[#446b55]',
  error: 'border-[#efc9c0] bg-[#fff4f1] text-[#9a4d43]',
};

const inputBaseClass =
  'h-14 w-full rounded-2xl border bg-white/85 pl-12 pr-4 text-[15px] text-[var(--ink)] shadow-[0_18px_45px_-38px_rgba(60,43,31,0.65)] outline-none transition placeholder:text-[#a38776] focus:border-[var(--accent)] focus:bg-white';

export default function LoginForm() {
  const [mode, setMode] = useState<Mode>('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<StatusState>(getModeStatus('login'));
  const [welcomeName, setWelcomeName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isBusy = isSubmitting || isPending;
  const passwordStrength = getPasswordStrength(password);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedIdentifier = window.localStorage.getItem(STORAGE_KEY);

    if (savedIdentifier) {
      const frame = window.requestAnimationFrame(() => {
        setIdentifier(savedIdentifier);
        setRecoveryEmail(savedIdentifier.includes('@') ? savedIdentifier : '');
        setStatus({
          type: 'info',
          message: 'Encontramos um acesso salvo neste navegador. Voce pode continuar de onde parou.',
        });
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setErrors({});
    setCapsLockOn(false);
    setShowPassword(false);
    setWelcomeName(null);
    setStatus(getModeStatus(nextMode));
  }

  function updateStatus(nextStatus?: StatusState) {
    setStatus(nextStatus ?? { type: 'idle', message: '' });
  }

  function clearFieldError(field: keyof FieldErrors) {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      return {
        ...current,
        [field]: undefined,
      };
    });
  }

  function handleIdentifierChange(event: ChangeEvent<HTMLInputElement>) {
    setIdentifier(event.target.value);
    clearFieldError('identifier');

    if (status.type !== 'success') {
      updateStatus();
    }
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    clearFieldError('password');

    if (status.type !== 'success') {
      updateStatus();
    }
  }

  function handleRecoveryEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setRecoveryEmail(event.target.value);
    clearFieldError('recoveryEmail');

    if (status.type !== 'success') {
      updateStatus();
    }
  }

  function validateLoginFields() {
    const nextErrors: FieldErrors = {};
    const trimmedIdentifier = identifier.trim();

    if (!trimmedIdentifier) {
      nextErrors.identifier = 'Informe seu email ou usuario.';
    } else if (trimmedIdentifier.includes('@') && !isValidEmail(trimmedIdentifier)) {
      nextErrors.identifier = 'Digite um email valido.';
    } else if (!trimmedIdentifier.includes('@') && trimmedIdentifier.length < 3) {
      nextErrors.identifier = 'Use ao menos 3 caracteres.';
    }

    if (!password) {
      nextErrors.password = 'Informe sua senha.';
    } else if (password.length < 6) {
      nextErrors.password = 'Use ao menos 6 caracteres.';
    }

    return nextErrors;
  }

  function persistIdentifier(nextIdentifier: string) {
    if (typeof window === 'undefined') {
      return;
    }

    if (rememberMe && nextIdentifier) {
      window.localStorage.setItem(STORAGE_KEY, nextIdentifier);
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }

  function getDisplayName(value: string) {
    const baseName = value.includes('@') ? value.split('@')[0] : value;
    return baseName.charAt(0).toUpperCase() + baseName.slice(1);
  }

  function finishWithStatus(nextStatus: StatusState, nextWelcomeName: string | null = null) {
    startTransition(() => {
      setWelcomeName(nextWelcomeName);
      setStatus(nextStatus);
    });
  }

  function submitLogin() {
    const nextErrors = validateLoginFields();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setWelcomeName(null);
      setStatus({
        type: 'error',
        message: 'Revise os campos destacados antes de continuar.',
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    window.setTimeout(() => {
      const trimmedIdentifier = identifier.trim();
      const name = getDisplayName(trimmedIdentifier);
      const isDemoLogin =
        trimmedIdentifier.toLowerCase() === DEMO_ACCOUNT.identifier.toLowerCase() &&
        password === DEMO_ACCOUNT.password;

      persistIdentifier(trimmedIdentifier);
      setIsSubmitting(false);

      finishWithStatus(
        {
          type: 'success',
          message: isDemoLogin
            ? `Login concluido com a conta demo. Bem-vindo, ${name}.`
            : `Login validado localmente. Bem-vindo, ${name}.`,
        },
        name,
      );
    }, 900);
  }

  function submitRecovery() {
    const trimmedEmail = recoveryEmail.trim();

    if (!trimmedEmail) {
      setErrors({ recoveryEmail: 'Informe o email da conta.' });
      setStatus({
        type: 'error',
        message: 'Precisamos de um email valido para iniciar a recuperacao.',
      });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrors({ recoveryEmail: 'Digite um email valido.' });
      setStatus({
        type: 'error',
        message: 'O email informado nao parece valido.',
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);

      finishWithStatus({
        type: 'success',
        message: `Link de recuperacao preparado para ${trimmedEmail}.`,
      });
    }, 850);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode === 'recovery') {
      submitRecovery();
      return;
    }

    submitLogin();
  }

  function handlePasswordKeyboard(event: KeyboardEvent<HTMLInputElement>) {
    setCapsLockOn(event.getModifierState('CapsLock'));
  }

  function handleDemoFill() {
    setMode('login');
    setIdentifier(DEMO_ACCOUNT.identifier);
    setPassword(DEMO_ACCOUNT.password);
    setRecoveryEmail(DEMO_ACCOUNT.identifier);
    setRememberMe(true);
    setErrors({});
    setCapsLockOn(false);
    setShowPassword(false);
    setWelcomeName(null);
    setStatus({
      type: 'info',
      message: 'Credenciais demo preenchidas. Agora voce pode testar o fluxo completo.',
    });
  }

  function handleClearForm() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    setIdentifier('');
    setPassword('');
    setRecoveryEmail('');
    setRememberMe(true);
    setShowPassword(false);
    setCapsLockOn(false);
    setErrors({});
    setWelcomeName(null);
    setStatus(getModeStatus(mode));
  }

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[520px]"
    >
      <div className="soft-card relative overflow-hidden rounded-[2.2rem] border border-white/70 bg-white/78 p-6 shadow-[0_35px_100px_-52px_rgba(70,45,29,0.7)] backdrop-blur-2xl sm:p-8">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/75 to-transparent" />

        <div className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                <ShieldCheck className="size-4" />
                acesso seguro
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--ink)]">Entre na sua conta</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
                Um fluxo mais claro para entrar, lembrar sua sessao ou recuperar o acesso com rapidez.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDemoFill}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/85 px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--accent)] hover:bg-white"
            >
              Conta demo
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-full bg-[var(--surface-muted)] p-1.5">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                mode === 'login'
                  ? 'bg-white text-[var(--ink)] shadow-[0_12px_30px_-22px_rgba(70,48,31,0.8)]'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => switchMode('recovery')}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                mode === 'recovery'
                  ? 'bg-white text-[var(--ink)] shadow-[0_12px_30px_-22px_rgba(70,48,31,0.8)]'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              Recuperar acesso
            </button>
          </div>

          <AnimatePresence initial={false}>
            {status.message ? (
              <motion.div
                key={`${mode}-${status.type}-${status.message}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${statusStyles[status.type]}`}
                aria-live="polite"
              >
                {status.message}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {mode === 'login' ? (
              <>
                <div>
                  <label htmlFor="identifier" className="mb-2 block text-sm font-medium text-[var(--ink)]">
                    Email ou usuario
                  </label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#a38877]" />
                    <input
                      id="identifier"
                      name="identifier"
                      type="text"
                      autoComplete="username"
                      value={identifier}
                      onChange={handleIdentifierChange}
                      placeholder="voce@empresa.com"
                      aria-invalid={Boolean(errors.identifier)}
                      aria-describedby={errors.identifier ? 'identifier-error' : undefined}
                      className={`${inputBaseClass} ${
                        errors.identifier
                          ? 'border-[#e5b3ab] focus:border-[#d48176]'
                          : 'border-transparent'
                      }`}
                    />
                  </div>
                  {errors.identifier ? (
                    <p id="identifier-error" className="mt-2 text-sm text-[#a0584c]">
                      {errors.identifier}
                    </p>
                  ) : null}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label htmlFor="password" className="block text-sm font-medium text-[var(--ink)]">
                      Senha
                    </label>
                    <button
                      type="button"
                      onClick={() => switchMode('recovery')}
                      className="text-sm font-medium text-[var(--accent-strong)] transition hover:text-[var(--ink)]"
                    >
                      Esqueci minha senha
                    </button>
                  </div>

                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#a38877]" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={handlePasswordChange}
                      onKeyDown={handlePasswordKeyboard}
                      onKeyUp={handlePasswordKeyboard}
                      onBlur={() => setCapsLockOn(false)}
                      placeholder="Digite sua senha"
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                      className={`${inputBaseClass} pr-24 ${
                        errors.password
                          ? 'border-[#e5b3ab] focus:border-[#d48176]'
                          : 'border-transparent'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e7160] transition hover:text-[var(--ink)]"
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>

                  <div className="mt-3 rounded-2xl border border-[var(--line)] bg-white/55 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-[var(--ink)]">Forca da senha</span>
                      <span className={`text-sm font-medium ${passwordStrength.textTone}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f1dfd3]">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${passwordStrength.barTone}`}
                        style={{ width: `${Math.max(passwordStrength.score, 1) * 25}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-[var(--muted)]">{passwordStrength.hint}</p>
                  </div>

                  <AnimatePresence initial={false}>
                    {capsLockOn ? (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-2 text-sm text-[#a0584c]"
                      >
                        Caps Lock esta ativado.
                      </motion.p>
                    ) : null}
                  </AnimatePresence>

                  {errors.password ? (
                    <p id="password-error" className="mt-2 text-sm text-[#a0584c]">
                      {errors.password}
                    </p>
                  ) : null}
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="recoveryEmail" className="mb-2 block text-sm font-medium text-[var(--ink)]">
                  Email para recuperacao
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#a38877]" />
                  <input
                    id="recoveryEmail"
                    name="recoveryEmail"
                    type="email"
                    autoComplete="email"
                    value={recoveryEmail}
                    onChange={handleRecoveryEmailChange}
                    placeholder="voce@empresa.com"
                    aria-invalid={Boolean(errors.recoveryEmail)}
                    aria-describedby={errors.recoveryEmail ? 'recovery-error' : undefined}
                    className={`${inputBaseClass} ${
                      errors.recoveryEmail
                        ? 'border-[#e5b3ab] focus:border-[#d48176]'
                        : 'border-transparent'
                    }`}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Assim que o email for validado, o fluxo mostra a confirmacao de envio do link.
                </p>
                {errors.recoveryEmail ? (
                  <p id="recovery-error" className="mt-2 text-sm text-[#a0584c]">
                    {errors.recoveryEmail}
                  </p>
                ) : null}
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <label className="inline-flex items-center gap-3 text-sm text-[var(--muted)]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-[#cda993] accent-[var(--accent-strong)]"
                />
                Lembrar meu acesso neste navegador
              </label>

              {mode === 'login' ? (
                <span className="text-sm text-[var(--muted)]">Validacao local pronta para API</span>
              ) : (
                <span className="text-sm text-[var(--muted)]">Recuperacao simulada</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isBusy}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--ink)] px-6 text-base font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#473228] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isBusy ? <LoaderCircle className="size-5 animate-spin" /> : <KeyRound className="size-5" />}
              {isBusy
                ? mode === 'login'
                  ? 'Verificando acesso...'
                  : 'Preparando recuperacao...'
                : mode === 'login'
                  ? 'Entrar'
                  : 'Enviar link de recuperacao'}
            </button>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleDemoFill}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--line)] bg-white/70 px-4 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--accent)] hover:bg-white"
              >
                <WandSparkles className="size-4" />
                Preencher demo
              </button>
              <button
                type="button"
                onClick={handleClearForm}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-[var(--line)] bg-white/50 px-4 text-sm font-medium text-[var(--muted)] transition hover:bg-white/80 hover:text-[var(--ink)]"
              >
                Limpar campos
              </button>
            </div>
          </form>

          <AnimatePresence initial={false}>
            {status.type === 'success' && welcomeName ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-5 rounded-[1.75rem] border border-[#cfe5d7] bg-[#f3fbf6] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dff1e5] text-[#3d7053]">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-[#355844]">Sessao pronta para {welcomeName}</p>
                    <p className="mt-1 text-sm leading-6 text-[#537360]">
                      O comportamento visual do login ja esta preparado para ser conectado a uma autenticacao real.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-5 rounded-[1.75rem] border border-[var(--line)] bg-[#fffaf6] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                <WandSparkles className="size-5" />
              </div>
              <div>
                <p className="font-medium text-[var(--ink)]">Conta de demonstracao</p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                  Use <span className="font-medium text-[var(--ink)]">{DEMO_ACCOUNT.identifier}</span> e{' '}
                  <span className="font-medium text-[var(--ink)]">{DEMO_ACCOUNT.password}</span> para testar a tela.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
