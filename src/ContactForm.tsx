import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

const domains = ['Développement', 'Design', 'Multimédia', 'Pilotage de projet', 'Formation', 'Marketing & communication', 'Application e-commerce', 'Projet à définir ensemble'];

export default function ContactForm({ investor = false }: { investor?: boolean }) {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [fallback, setFallback] = useState('');
  const sending = useRef(false);
  const subject = investor ? 'Investissement Amonarc' : 'Mon projet avec Amonarc';
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('website')) return;
    sending.current = true;
    setStatus('sending');
    const text = `Nom : ${data.get('name')}\nEmail : ${data.get('email')}\nOrganisation : ${data.get('organization') || 'Non précisée'}\nProfil : ${data.get('profile')}\nSujet : ${data.get('service')}\n\n${data.get('message')}`;
    setFallback(`mailto:jeanpkokora@gmail.com?cc=konanalain94@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('/api/contact', { method:'POST', body:JSON.stringify(Object.fromEntries(data)), headers:{Accept:'application/json','Content-Type':'application/json'}, signal:controller.signal });
      if (!response.ok) throw new Error('Service unavailable');
      const result = await response.json();
      if (result.ok !== true) throw new Error('Submission not confirmed');
      setStatus('sent'); form.reset(); setFallback('');
    } catch { setStatus('error'); }
    finally { window.clearTimeout(timeout); sending.current = false; }
  }
  return <form className="contact-form" action="/api/contact" method="POST" onSubmit={submit} onChange={() => { if (!sending.current) { setStatus('idle'); setFallback(''); } }}>
    <fieldset className="form-fields" disabled={status === 'sending'} aria-label={investor ? 'Contacter Amonarc comme investisseur' : 'Présenter votre projet'}>
    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="form-trap" aria-hidden="true" aria-label="Laisser ce champ vide" />
    <div className="form-row">
      <label htmlFor="name">Votre nom<input id="name" name="name" autoComplete="name" maxLength={120} required placeholder="Nom et prénom" /></label>
      <label htmlFor="email">Votre email<input id="email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder="vous@entreprise.com" /></label>
    </div>
    <div className="form-row">
      <label htmlFor="organization"><span>Organisation <span className="optional">(facultatif)</span></span><input id="organization" name="organization" autoComplete="organization" maxLength={160} placeholder="Votre entreprise ou fonds" /></label>
      <label htmlFor="profile">Vous êtes<select id="profile" name="profile" required defaultValue="">
        <option value="" disabled>Choisir un profil</option>
        {(investor ? ['Business angel', 'Fonds d’investissement', 'Partenaire stratégique', 'Autre investisseur'] : ['Entreprise / Institution', 'Entrepreneur / Association', 'Particulier', 'Investisseur']).map(x => <option key={x}>{x}</option>)}
      </select></label>
    </div>
    {investor ? <input type="hidden" name="service" value="Investissement — Application Amonarc" /> : <label htmlFor="service">Votre besoin<select id="service" name="service" required defaultValue=""><option value="" disabled>Choisir un domaine</option>{domains.map(x => <option key={x}>{x}</option>)}</select></label>}
    <label htmlFor="message">{investor ? 'Commençons la conversation' : 'Quelques mots sur votre projet'}<textarea id="message" name="message" rows={4} minLength={10} maxLength={3000} required placeholder={investor ? 'Votre intérêt pour le projet, votre thèse d’investissement, vos disponibilités…' : 'Votre objectif, votre besoin, votre idée…'} /></label>
    <p className="form-note">Vos coordonnées et votre message sont utilisés par l’équipe Amonarc pour répondre à votre demande. Ne joignez aucune information confidentielle.</p>
    <button className="button primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Envoi en cours…' : investor ? 'Rencontrer l’équipe' : 'Envoyer ma demande'} <FiArrowUpRight aria-hidden /></button>
    </fieldset>
    <div aria-live="polite" aria-atomic="true">
      {status === 'sent' && <p className="form-feedback">Votre demande a été transmise. Merci de votre intérêt pour Amonarc.</p>}
      {status === 'error' && <p className="form-feedback form-error" role="alert">L’envoi n’a pas pu être confirmé. Vos informations sont conservées dans le formulaire. Réessayez ou ouvrez votre messagerie ci-dessous pour nous envoyer votre demande.</p>}
    </div>
    <p className="form-alternative">Vous préférez votre messagerie ? <a href={fallback || `mailto:jeanpkokora@gmail.com?cc=konanalain94@gmail.com&subject=${encodeURIComponent(subject)}`}>{fallback ? 'Ouvrir mon message prérempli ↗' : 'Écrivez-nous directement ↗'}</a></p>
  </form>;
}
