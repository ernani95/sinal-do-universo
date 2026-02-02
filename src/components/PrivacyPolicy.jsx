import React from 'react';
import { Lock, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = ({ onBack }) => {
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
                        <Lock className="text-mystic-gold" size={48} />
                    </div>

                    <h1 className="text-2xl md:text-4xl font-display text-center mb-8 uppercase tracking-[0.1em] md:tracking-[0.2em] break-words">Política de Privacidade</h1>

                    <div className="space-y-6 text-mystic-muted leading-relaxed font-body text-sm md:text-base">
                        <p className="text-center italic mb-8">
                            Sua privacidade e a segurança de seus dados são sagradas para nós. Esta política descreve como tratamos suas informações seguindo os princípios da LGPD.
                        </p>

                        <hr className="border-white/10" />

                        <section>
                            <h2 className="text-lg md:text-xl font-display text-white mb-3 break-words">1. Dados Coletados</h2>
                            <p>Para oferecer uma experiência completa e personalizada, coletamos as seguintes informações:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li><strong>Informações de Identificação:</strong> Nome e e-mail;</li>
                                <li><strong>Informações de Comunicação:</strong> Número de telefone/WhatsApp;</li>
                                <li><strong>Contexto Espiritual:</strong> A pergunta realizada durante a tiragem;</li>
                                <li><strong>Dados Técnicos:</strong> Endereço IP e cookies de navegação;</li>
                                <li><strong>Dados de Pagamento:</strong> Processados exclusivamente pelos parceiros (Amplopay), não armazenamos dados de cartão ou detalhes bancários sensíveis em nossos servidores.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-display text-white mb-3 break-words">2. Como Usamos Seus Dados</h2>
                            <p>Seus dados são utilizados exclusivamente para:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Gerar a interpretação personalizada das cartas;</li>
                                <li>Enviar o resultado da sua leitura para o seu e-mail ou WhatsApp;</li>
                                <li>Melhorar a performance técnica do site;</li>
                                <li>Entrar em contato para suporte ou novidades sobre o mundo do Tarot (sempre com sua permissão).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-display text-white mb-3 break-words">3. Compartilhamento de Dados</h2>
                            <p>
                                O Sinal do Universo <strong>NUNCA vende seus dados</strong>. Compartilhamos informações apenas com serviços essenciais para o funcionamento do site, como o gateway de pagamento (Amplopay) e serviços de entrega de e-mail, garantindo que esses parceiros também sigam normas rígidas de segurança.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-display text-white mb-3 text-mystic-gold break-words">4. Direitos do Usuário (LGPD)</h2>
                            <p>Como titular dos dados, você tem o direito de, a qualquer momento:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Solicitar acesso aos dados que possuímos sobre você;</li>
                                <li>Solicitar a correção de dados incompletos ou inexatos;</li>
                                <li>Solicitar a exclusão definitiva de seus dados de nossa base.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-display text-white mb-3 break-words">5. Segurança</h2>
                            <p>
                                Utilizamos protocolos de criptografia SSL e camadas de proteção em nossos servidores para garantir que sua jornada espiritual permaneça confidencial e segura contra acessos não autorizados.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-display text-white mb-3 break-words">6. Cookies</h2>
                            <p>
                                Utilizamos cookies apenas para lembrar de sua sessão atual e para análises anônimas de tráfego que nos ajudam a entender como o público brasileiro utiliza nossa plataforma, visando sempre a melhoria do serviço.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-display text-white mb-3 break-words">7. Contato</h2>
                            <p>
                                Para qualquer dúvida sobre seus dados ou para exercer seus direitos, entre em contato através do nosso canal de suporte via WhatsApp mencionado na nossa página de Contato.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
