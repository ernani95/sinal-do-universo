import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const TermsOfUse = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-mystic-dark text-white pt-24 pb-12 px-6">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-mystic-gold mb-8 hover:text-white transition-colors border border-mystic-gold/30 px-4 py-2 rounded-full text-sm uppercase tracking-widest"
                >
                    <ArrowLeft size={16} /> Voltar para o Início
                </button>

                <div className="bg-mystic-purple/20 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="flex justify-center mb-6">
                        <ShieldCheck className="text-mystic-gold" size={48} />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-display text-center mb-8 uppercase tracking-[0.2em]">Termos de Uso</h1>

                    <div className="space-y-6 text-mystic-muted leading-relaxed font-body">
                        <section>
                            <h2 className="text-xl font-display text-white mb-3">1. Apresentação do Serviço</h2>
                            <p>
                                O site Sinal do Universo é uma plataforma digital dedicada à prática do Tarot e ferramentas de autoconhecimento. Nosso objetivo é oferecer uma experiência de conexão ancestral e clareza divina através de interpretações geradas por inteligência artificial baseadas na tradição dos Arcanos.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-white mb-3">2. Aceitação dos Termos</h2>
                            <p>
                                Ao acessar e utilizar este site, você declara estar ciente e de acordo com as condições aqui estabelecidas. Caso não concorde com qualquer parte destes termos, recomendamos que não utilize nossos serviços.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-white mb-3">3. Natureza do Serviço</h2>
                            <p>
                                As consultas e interpretações oferecidas pelo Sinal do Universo destinam-se exclusivamente a fins de <strong>entretenimento, autoconhecimento e reflexão espiritual</strong>. As mensagens entregues não devem ser interpretadas como verdades absolutas ou previsões deterministas.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-white mb-3 text-mystic-gold">4. Isenção de Responsabilidade</h2>
                            <p>
                                O portal Sinal do Universo não se responsabiliza por decisões tomadas pelo usuário após a leitura. Nossas interpretações <strong>NÃO substituem</strong> aconselhamento profissional especializado, incluindo, mas não se limitando a:
                            </p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Decisões financeiras e investimentos;</li>
                                <li>Questões amorosas ou relacionamentos;</li>
                                <li>Aconselhamento jurídico;</li>
                                <li>Diagnósticos ou tratamentos médicos e psicológicos.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-white mb-3">5. Uso Adequado da Plataforma</h2>
                            <p>
                                O usuário compromete-se a utilizar a plataforma de forma lícita e respeitosa. É expressamente proibido:
                            </p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Utilizar ferramentas automatizadas para coletar dados;</li>
                                <li>Tentar burlar sistemas de pagamento;</li>
                                <li>Copiar, reproduzir ou explorar o conteúdo visual e intelectual do site sem autorização prévia.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-white mb-3">6. Direitos Autorais</h2>
                            <p>
                                Todo o conteúdo visual, textos, logotipos e o sistema de interpretação são de propriedade exclusiva do Sinal do Universo e estão protegidos pelas leis de propriedade intelectual vigentes no Brasil.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-white mb-3">7. Alterações de Termos</h2>
                            <p>
                                Reservamo-nos o direito de atualizar estes Termos de Uso periodicamente para refletir melhorias no serviço ou mudanças na legislação. O uso continuado do site após tais alterações constitui sua aceitação dos novos termos.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-white mb-3">8. Foro e Legislação</h2>
                            <p>
                                Estes termos são regidos pelas leis da República Federativa do Brasil. Para dirimir quaisquer dúvidas ou litígios decorrentes deste documento, fica eleito o foro da comarca de residência do usuário ou, na impossibilidade, o foro central do Brasil.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;
