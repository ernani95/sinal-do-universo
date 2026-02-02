import React from 'react';
import { MessageCircle, Clock, ArrowLeft, Heart } from 'lucide-react';

const Contact = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-mystic-dark text-white pt-24 pb-12 px-6">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-mystic-gold mb-8 hover:text-white transition-colors border border-mystic-gold/30 px-4 py-2 rounded-full text-sm uppercase tracking-widest"
                >
                    <ArrowLeft size={16} /> Voltar para o Início
                </button>

                <div className="bg-mystic-purple/20 border border-white/10 p-10 rounded-3xl backdrop-blur-sm text-center">
                    <div className="flex justify-center mb-8">
                        <div className="bg-mystic-gold/10 p-4 rounded-full">
                            <MessageCircle className="text-mystic-gold" size={48} />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-display mb-6 uppercase tracking-[0.2em]">Contato</h1>

                    <p className="text-mystic-muted mb-10 font-body text-lg max-w-lg mx-auto leading-relaxed">
                        Seja para tirar dúvidas sobre sua leitura, questões técnicas ou apenas para compartilhar sua experiência, estamos de braços abertos para te ouvir.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <Clock className="text-mystic-gold mx-auto mb-3" size={24} />
                            <h3 className="font-display text-white mb-1 uppercase tracking-wider text-sm">Horário de Atendimento</h3>
                            <p className="text-mystic-muted text-sm">Segunda a Sexta<br />09h às 18h</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <MessageCircle className="text-mystic-gold mx-auto mb-3" size={24} />
                            <h3 className="font-display text-white mb-1 uppercase tracking-wider text-sm">Forma de Contato</h3>
                            <p className="text-mystic-muted text-sm">Principalmente via<br />WhatsApp</p>
                        </div>
                    </div>

                    <a
                        href="https://wa.me/5511961850780"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-mystic-gold text-mystic-dark font-bold px-8 py-4 rounded-2xl hover:bg-white transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(234,179,8,0.3)] mb-8"
                    >
                        <MessageCircle size={24} />
                        Falar no WhatsApp
                    </a>

                    <div className="flex items-center justify-center gap-2 text-mystic-gold font-display italic">
                        <Heart size={16} className="fill-mystic-gold" />
                        <span>Estamos aqui para te ajudar em sua jornada.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
