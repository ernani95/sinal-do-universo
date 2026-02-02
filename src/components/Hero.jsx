import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = ({ onStart }) => {
    return (
        <section className="relative pt-12 pb-20 md:pt-32 md:pb-40 overflow-hidden flex items-center justify-center min-h-[80vh]">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-mystic-gold mb-8 animate-fade-in-up uppercase tracking-widest">
                    <Sparkles size={16} />
                    <span>Sua intuição trouxe você até aqui</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 leading-[1.15] animate-fade-in-up delay-100 max-w-5xl tracking-tight">
                    Existe um <span className="text-mystic-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]">sinal</span> que você<br className="hidden md:block" />
                    precisa receber agora.
                </h1>

                <div className="space-y-6 mb-12 animate-fade-in-up delay-200">
                    <p className="text-lg md:text-2xl text-mystic-muted max-w-3xl mx-auto leading-relaxed">
                        Sente angústia, dúvida ou insegurança sobre amor, trabalho ou propósito?
                    </p>
                    <p className="text-xl md:text-3xl text-white max-w-4xl mx-auto leading-relaxed font-semibold">
                        O Tarot revela o que seus olhos não veem e traz a <span className="text-mystic-gold">clareza emocional</span> que seu coração busca.
                    </p>
                </div>

                <button
                    onClick={onStart}
                    className="btn-primary animate-fade-in-up delay-300 w-full md:w-auto min-w-[280px]"
                >
                    Receber Meu Sinal Agora
                    <ArrowRight size={20} />
                </button>

                <p className="text-sm text-mystic-muted mt-6 animate-fade-in-up delay-300">
                    ✨ Gratuito • Privado • Instantâneo
                </p>
            </div>
        </section>
    );
};

export default Hero;
