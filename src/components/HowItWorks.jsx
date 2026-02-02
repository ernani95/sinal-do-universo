import React from 'react';
import { MessageCircle, Sparkles, Unlock } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <MessageCircle size={32} />,
            title: "1. Mentalize sua dúvida",
            desc: "Concentre-se na questão que está tirando sua paz. O Tarot responde à sua energia."
        },
        {
            icon: <Sparkles size={32} />,
            title: "2. O Universo escolhe",
            desc: "Nossa tecnologia seleciona as cartas baseada em sincronicidade, como uma tiragem real."
        },
        {
            icon: <Unlock size={32} />,
            title: "3. Revelação imediata",
            desc: "Receba uma interpretação profunda e acolhedora sobre seu momento e futuro."
        }
    ];

    return (
        <section className="py-24 bg-mystic-dark relative">
            <div className="container-custom">
                <h2 className="text-3xl md:text-5xl text-center mb-16 font-bold leading-tight">
                    Como o <span className="text-gradient">Sinal do Universo</span> funciona?
                </h2>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-mystic-gold/50 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 group">
                            <div className="w-20 h-20 rounded-full bg-mystic-deep border border-mystic-gold flex items-center justify-center text-mystic-gold mb-6 shadow-[0_0_15px_rgba(255,215,0,0.2)] group-hover:scale-110 transition-transform duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4 font-display text-white">{step.title}</h3>
                            <p className="text-mystic-muted leading-relaxed text-lg">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
