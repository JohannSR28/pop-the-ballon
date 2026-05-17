'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { OnboardingShell } from '../../components/layout/OnboardingShell';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useOnboardingStore } from '../../store/onboarding';
import { FAKE_DELAY_MS, RECONNECT_TOKEN_MIN_LENGTH } from '../../lib/constants';
import { fakeDelay, isValidEmail } from '../../lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const { setUser, role } = useOnboardingStore();

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [pseudoError, setPseudoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showReconnect, setShowReconnect] = useState(false);
  const [reconnectToken, setReconnectToken] = useState('');
  const [isReconnecting, setIsReconnecting] = useState(false);

  function validatePseudo(v: string): string {
    const t = v.trim();
    if (t.length < 2) return 'Minimum 2 caractères';
    if (t.length > 20) return 'Maximum 20 caractères';
    return '';
  }

  function validateEmail(v: string): string {
    if (!v.trim()) return 'Email requis';
    if (!isValidEmail(v.trim())) return 'Adresse email invalide';
    return '';
  }

  const isFormValid =
    pseudo.trim().length >= 2 && pseudo.trim().length <= 20 && isValidEmail(email.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pErr = validatePseudo(pseudo);
    const eErr = validateEmail(email);
    setPseudoError(pErr);
    setEmailError(eErr);
    if (pErr || eErr) return;

    setIsSubmitting(true);
    await fakeDelay(FAKE_DELAY_MS);
    setUser(pseudo.trim(), email.trim());
    setIsSubmitting(false);
    setSuccess(true);

    await fakeDelay(1400);
    router.push(role === 'host' ? '/session/setup' : '/session/lobby?role=pending');
  }

  async function handleReconnect() {
    if (reconnectToken.trim().length < RECONNECT_TOKEN_MIN_LENGTH) return;
    setIsReconnecting(true);
    await fakeDelay(1000);
    router.push('/session/lobby?role=pending');
  }

  if (success) {
    return (
      <OnboardingShell currentStep={3}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 18 }}
            className="w-16 h-16 rounded-full bg-success/10 border border-success/25 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={32} className="text-success" strokeWidth={1.5} />
          </motion.div>
          <h2 className="font-display font-extrabold text-[28px] text-t1 tracking-[-0.02em] mb-2">
            Bienvenue, {pseudo.trim()} !
          </h2>
          <p className="font-display font-medium text-[15px] text-t2">
            Chargement de la session...
          </p>
          <div className="mt-6 flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot"
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            ))}
          </div>
        </motion.div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell currentStep={3}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Step label */}
        <p className="font-display font-semibold text-[11px] text-accent tracking-[0.1em] uppercase mb-5">
          Étape 3 — Profil
        </p>

        <h2 className="font-display font-extrabold text-[36px] sm:text-[42px] text-t1 tracking-[-0.03em] leading-[1.05] mb-3">
          Qui es-tu ?
        </h2>
        <p className="font-display font-medium text-[15px] text-t2 mb-10 leading-[1.6]">
          Un pseudo et un email, rien de plus — pour te retrouver si tu te déconnectes.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 mb-8">
            <Input
              label="Pseudo"
              placeholder="Ex : Flamingo99"
              value={pseudo}
              onChange={(e) => { setPseudo(e.target.value); setPseudoError(''); }}
              onBlur={() => setPseudoError(validatePseudo(pseudo))}
              error={pseudoError}
              helperText="Visible par tous les participants"
              autoComplete="nickname"
              maxLength={20}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Ex : toi@mail.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              onBlur={() => setEmailError(validateEmail(email))}
              error={emailError}
              helperText="Uniquement pour la reconnexion — jamais partagé"
              autoComplete="email"
            />
          </div>

          {/* Privacy note */}
          <p className="font-display font-medium text-[13px] text-t3 mb-8 leading-[1.6]">
            Pas de mot de passe. Pas de compte permanent.
            On t&apos;envoie un lien magique par email si besoin.
          </p>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/25 border-t-white animate-spin" />
                Connexion...
              </span>
            ) : (
              "Entrer dans l'arène"
            )}
          </Button>
        </form>

        {/* Reconnect */}
        <div className="mt-8 border-t border-border pt-6">
          <button
            type="button"
            onClick={() => setShowReconnect((v) => !v)}
            className="flex items-center gap-1.5 font-display font-medium text-[13px] text-t3 hover:text-t2 transition-colors"
          >
            <ChevronDown
              size={14}
              strokeWidth={2.5}
              className={`transition-transform duration-200 ${showReconnect ? 'rotate-180' : ''}`}
            />
            J&apos;ai déjà un lien de reconnexion
          </button>

          <AnimatePresence>
            {showReconnect && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3 mt-4">
                  <Input
                    label="Lien de reconnexion"
                    placeholder="Colle ton token ici"
                    value={reconnectToken}
                    onChange={(e) => setReconnectToken(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    fullWidth
                    disabled={
                      reconnectToken.trim().length < RECONNECT_TOKEN_MIN_LENGTH || isReconnecting
                    }
                    onClick={handleReconnect}
                  >
                    {isReconnecting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-t2/25 border-t-t2 animate-spin" />
                        Vérification...
                      </span>
                    ) : (
                      'Se reconnecter'
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </OnboardingShell>
  );
}
