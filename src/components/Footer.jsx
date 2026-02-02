import React from 'react';

const Footer = ({ onNavigate }) => {
    return (
        <footer className="py-12 bg-black text-center border-t border-white/5">
            <div className="container-custom">
                <div className="font-display text-2xl text-mystic-gold font-bold tracking-[0.2em] mb-8 opacity-80">
                    SINAL DO UNIVERSO
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8 text-sm text-mystic-muted">
                    <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors cursor-pointer">Termos de Uso</button>
                    <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors cursor-pointer">Política de Privacidade</button>
                    <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">Contato</button>
                </div>

                <p className="text-xs text-white/20 max-w-2xl mx-auto leading-relaxed">
                    &copy; 2024 Sinal do Universo. Todos os direitos reservados. <br />
                    Este site oferece entretenimento e aconselhamento baseados em Tarot. As decisões tomadas são de inteira responsabilidade do usuário.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
