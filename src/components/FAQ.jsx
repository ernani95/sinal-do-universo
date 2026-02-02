import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`font-medium text-lg pr-8 transition-colors ${isOpen ? 'text-mystic-gold' : 'text-white group-hover:text-mystic-gold'}`}>
                    {question}
                </span>
                <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-mystic-gold text-mystic-deep' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                <p className="text-mystic-muted leading-relaxed text-base">{answer}</p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "É seguro? Meus dados são guardados?",
            answer: "Sua privacidade é nossa prioridade absoluta. Suas perguntas e tiragens são criptografadas e totalmente confidenciais. Nem nós temos acesso ao que você pergunta ao Universo."
        },
        {
            question: "Como funciona a leitura por Inteligência Artificial?",
            answer: "Utilizamos um modelo avançado treinado nos significados clássicos do Tarot (Marselha, Rider-Waite) e psicologia junguiana. Ele analisa a sincronicidade das cartas que você tirou e gera uma interpretação personalizada."
        },
        {
            question: "Posso confiar na resposta?",
            answer: "O Tarot funciona através da sincronicidade. As cartas refletem a energia do momento. Nossa interpretação ajuda a traduzir esses símbolos em conselhos práticos e emocionais para sua vida."
        },
        {
            question: "Tenho garantia?",
            answer: "Sim. Se você sentir que a leitura não fez sentido para o seu momento, devolvemos seu investimento em até 7 dias, sem perguntas."
        }
    ];

    return (
        <section className="py-24 bg-mystic-dark">
            <div className="container-custom max-w-3xl">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Dúvidas <span className="text-mystic-gold">Frequentes</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Tudo o que você precisa saber antes de iniciar sua jornada de clareza.
                    </p>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/5">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
