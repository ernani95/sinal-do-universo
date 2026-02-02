import React from 'react';
import { ArrowRight } from 'lucide-react';

const UrgencyBlock = ({ onAction }) => {
    return (
        <section className="py-32 bg-mystic-gold text-mystic-deep relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_#fff_0%,_transparent_70%)] opacity-20 pointer-events-none" />

            <div className="container-custom text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 max-w-4xl mx-auto leading-tight text-mystic-deep tracking-tight">
                    Antes de sair...
                </h2>
                <p className="text-xl md:text-3xl mb-6 max-w-3xl mx-auto text-mystic-deep/90 font-bold leading-snug">
                    Muitas pessoas fecham esta página e continuam carregando a dúvida.
                </p>
                <p className="text-lg md:text-2xl mb-12 max-w-4xl mx-auto text-mystic-deep/80 leading-relaxed font-medium">
                    A indecisão rouba sua energia. Uma única tiragem pode mudar a forma como você vê este momento. <br className="hidden md:block" />
                    <span className="text-mystic-deep font-black underline decoration-mystic-deep/30 underline-offset-8">O sinal que você procura está a um clique de distância.</span>
                </p>

                <button
                    onClick={onAction}
                    className="bg-mystic-deep text-mystic-gold px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto uppercase tracking-wider"
                >
                    Receber Meu Sinal do Universo Agora
                    <ArrowRight size={24} />
                </button>
            </div>
        </section>
    );
};

export default UrgencyBlock;
