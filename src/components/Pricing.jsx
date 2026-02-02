import React from 'react';
import { Star, Check, Sparkles, ArrowRight } from 'lucide-react';

const Pricing = () => {
    const handleFree = () => {
        const element = document.getElementById('reading');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handlePaid = () => {
        const element = document.getElementById('reading');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-mystic-deep to-black relative">
            <div className="container-custom">
                <div className="text-center mb-16 px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mystic-gold/10 border border-mystic-gold/20 text-mystic-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">
                        <Sparkles size={14} /> Oferta Especial de Lançamento
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Escolha seu <span className="text-mystic-gold">Caminho</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Invista em sua clareza emocional e tome as decisões certas com a guia do Universo.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto items-stretch">

                    {/* Free Plan */}
                    <div className="p-8 md:p-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm relative flex flex-col justify-between hover:border-white/20 transition-colors">
                        <div>
                            <h3 className="text-2xl font-display font-bold mb-2 text-white">Primeiro Sinal</h3>
                            <p className="text-mystic-muted text-sm mb-8 h-10">Para quem precisa de uma resposta rápida e direta.</p>

                            <div className="text-4xl font-bold mb-8 text-white">Grátis</div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 text-base items-center">
                                    <div className="bg-white/10 p-1 rounded-full flex-shrink-0"><Check size={14} className="text-white" /></div>
                                    <span className="text-gray-300">1 Tiragem simples</span>
                                </li>
                                <li className="flex gap-3 text-base items-center">
                                    <div className="bg-white/10 p-1 rounded-full flex-shrink-0"><Check size={14} className="text-white" /></div>
                                    <span className="text-gray-300">Até 3 cartas</span>
                                </li>
                                <li className="flex gap-3 text-base items-center">
                                    <div className="bg-white/10 p-1 rounded-full flex-shrink-0"><Check size={14} className="text-white" /></div>
                                    <span className="text-gray-300">Interpretação básica</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={handleFree}
                            className="w-full py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all text-white font-bold tracking-wider uppercase text-sm mt-auto"
                        >
                            Testar Agora
                        </button>
                    </div>

                    {/* Paid Plan */}
                    <div className="p-8 md:p-10 rounded-[2rem] border-2 border-mystic-gold bg-mystic-deep/80 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(234,179,8,0.2)] flex flex-col justify-between">
                        <div className="absolute top-0 right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 -mt-5">
                            <span className="bg-mystic-gold text-mystic-deep text-xs font-bold uppercase tracking-widest py-2 px-6 rounded-full flex items-center gap-2 shadow-lg whitespace-nowrap">
                                ⭐ RECOMENDADO
                            </span>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Sinal Completo</h3>
                                <Sparkles size={20} className="text-mystic-gold animate-pulse" />
                            </div>
                            <p className="text-mystic-gold/80 italic text-sm mb-8 h-10 font-bold">A resposta que você sente que precisa — revelada agora</p>

                            <div className="flex items-end gap-3 mb-8">
                                <div className="text-5xl font-bold text-white">R$ 14,90</div>
                                <div className="text-gray-500 text-xl line-through mb-1 decoration-1">R$ 97,00</div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 text-sm items-start">
                                    <div className="bg-mystic-gold/20 p-1 rounded-full flex-shrink-0 mt-0.5"><Check size={14} className="text-mystic-gold" /></div>
                                    <span className="text-gray-200">Interpretação profunda e personalizada para a sua pergunta</span>
                                </li>
                                <li className="flex gap-3 text-sm items-start">
                                    <div className="bg-mystic-gold/20 p-1 rounded-full flex-shrink-0 mt-0.5"><Check size={14} className="text-mystic-gold" /></div>
                                    <span className="text-gray-200">Leitura emocional + energética + prática</span>
                                </li>
                                <li className="flex gap-3 text-sm items-start">
                                    <div className="bg-mystic-gold/20 p-1 rounded-full flex-shrink-0 mt-0.5"><Check size={14} className="text-mystic-gold" /></div>
                                    <span className="text-gray-200">O que está acontecendo nos bastidores da situação</span>
                                </li>
                                <li className="flex gap-3 text-sm items-start">
                                    <div className="bg-mystic-gold/20 p-1 rounded-full flex-shrink-0 mt-0.5"><Check size={14} className="text-mystic-gold" /></div>
                                    <span className="text-gray-200">Qual atitude tomar para evitar arrependimento</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <button
                                onClick={handlePaid}
                                className="btn-primary w-full shadow-xl hover:shadow-2xl text-lg py-5"
                            >
                                👉 DESBLOQUEAR MEU SINAL AGORA
                            </button>
                            <p className="text-center text-xs text-mystic-muted mt-6 italic font-medium">
                                Menos que um lanche. Mais clareza do que semanas de dúvida.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Pricing;
