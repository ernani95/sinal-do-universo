import React from 'react';
import { Sun, CheckCircle2 } from 'lucide-react';

const Benefits = () => {
    const benefits = [
        "Clareza para tomar decisões difíceis agora (amor ou carreira)",
        "Alívio imediato da ansiedade e incerteza",
        "Confirmação do que sua intuição já está tentando dizer",
        "Direcionamento seguro sobre o próximo passo"
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 relative flex justify-center">
                    {/* Visual Element */}
                    <div className="w-full max-w-sm aspect-square rounded-full border border-white/10 relative flex items-center justify-center bg-white/5 backdrop-blur-sm animate-pulse-slow shadow-[0_0_50px_rgba(67,24,255,0.1)]">
                        <div className="absolute inset-0 bg-mystic-accent opacity-10 rounded-full blur-2xl"></div>
                        <Sun size={120} className="text-mystic-gold opacity-80 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]" />
                    </div>
                </div>

                <div className="order-1 md:order-2">
                    <h2 className="text-3xl md:text-5xl mb-8 font-bold leading-tight">
                        Mais que cartas.<br />
                        Uma <span className="text-mystic-gold">cura emocional</span>.
                    </h2>
                    <p className="text-lg md:text-xl text-mystic-muted mb-10 leading-relaxed">
                        Você não precisa carregar o peso da dúvida sozinho(a). Receber um sinal é permitir que o Universo tire esse fardo das suas costas e ilumine o caminho.
                    </p>

                    <ul className="space-y-6">
                        {benefits.map((item, index) => (
                            <li key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <CheckCircle2 className="text-mystic-gold mt-1 flex-shrink-0 drop-shadow-md" size={24} />
                                <span className="text-lg text-white font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
