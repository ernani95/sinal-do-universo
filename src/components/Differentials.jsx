import React from 'react';
import { Shield, Clock, HeartHandshake, Cpu } from 'lucide-react';

const Differentials = () => {
    const items = [
        {
            icon: <Shield size={32} />,
            title: "Privacidade Total",
            desc: "Ninguém lerá suas questões. É entre você e o Universo."
        },
        {
            icon: <Clock size={32} />,
            title: "Disponível 24/7",
            desc: "A angústia não tem hora. Sua resposta também não precisa ter."
        },
        {
            icon: <Cpu size={32} />,
            title: "Tecnologia + Magia",
            desc: "IA treinada nos fundamentos do Tarot de Marselha e Rider-Waite."
        },
        {
            icon: <HeartHandshake size={32} />,
            title: "Acolhimento Real",
            desc: "Interpretações que não apenas preveem, mas aconselham e acalmam."
        }
    ];

    return (
        <section className="py-20 bg-mystic-dark border-y border-white/5">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-mystic-accent mb-6 shadow-inner">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-display">{item.title}</h3>
                            <p className="text-sm text-mystic-muted leading-relaxed max-w-[250px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Differentials;
