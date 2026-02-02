import React, { useState } from 'react';
import { Play, HelpCircle, Eye, Lock, Sparkles, X, User, Mail, Phone, Check } from 'lucide-react';
import axios from 'axios';
import tarotBack from '../assets/tarot-back.png';
import { majorArcana } from '../data/tarotCards';

const getApiBaseUrl = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    url = url.replace(/\/+$/, ''); // Remove trailing slashes
    if (url.endsWith('/api')) {
        url = url.slice(0, -4); // Remove /api suffix if user added it by mistake
    }
    return url;
};

const API_BASE_URL = getApiBaseUrl();

const TarotForm = () => {
    const [question, setQuestion] = useState('');
    const [selectedCards, setSelectedCards] = useState(1);
    const [step, setStep] = useState(1);
    const [loadingText, setLoadingText] = useState('Conectando com sua energia...');
    const [progress, setProgress] = useState(0);
    const [showLeadModal, setShowLeadModal] = useState(false);

    // Initial Debug
    React.useEffect(() => {
        console.log("🔍 Astral Service URL:", API_BASE_URL);
        if (API_BASE_URL === 'http://localhost:3000' && window.location.hostname !== 'localhost') {
            console.warn("⚠️ API_BASE_URL está usando o padrão localhost em produção!");
        }
    }, []);

    // Reading State
    const [readingCards, setReadingCards] = useState([]);

    // Lead Form State
    const [leadName, setLeadName] = useState('');
    const [leadEmail, setLeadEmail] = useState('');
    const [leadPhone, setLeadPhone] = useState('');
    const [readingId, setReadingId] = useState(null);
    const [aiInterpretation, setAiInterpretation] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Payment States
    const [pixData, setPixData] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleStart = () => {
        if (!question.trim()) return;
        setStep(2);
    };

    const handleCardSelection = (num) => {
        setSelectedCards(num);
    };

    const handleRevealClick = () => {
        setShowLeadModal(true);
    };

    const submitLeadAndStart = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!leadName || !leadEmail || !leadPhone) return;

        // Select random unique cards based on selectedCards count
        const shuffled = [...majorArcana].sort(() => 0.5 - Math.random());
        const cardsForReading = shuffled.slice(0, selectedCards);
        setReadingCards(cardsForReading);

        try {
            // Send data to backend -> Supabase
            const response = await axios.post(`${API_BASE_URL}/api/readings/init`, {
                leadData: {
                    name: leadName,
                    email: leadEmail,
                    phone: leadPhone
                },
                question: question,
                cards: cardsForReading.map(c => c.number) // Send card IDs/Numbers
            });

            if (response.data.success) {
                console.log('✅ Lead saved, ID:', response.data.readingId);
                setReadingId(response.data.readingId);

                setShowLeadModal(false);
                startReadingRitual();
            } else {
                alert("Erro ao salvar dados. Tente novamente.");
            }
        } catch (error) {
            console.error("❌ Erro na API (init):", error);
            const errorMessage = error.response?.data?.error || error.message;
            const fullUrl = `${API_BASE_URL}/api/readings/init`;
            alert(`Erro ao conectar com o serviço astral: ${errorMessage}\n\nURL tentada: ${fullUrl}\n\nPor favor, verifique se a VITE_API_URL está correta no Netlify.`);
        }
    };

    const handleCreatePix = async () => {
        if (!readingId) {
            console.error("Erro: readingId não encontrado. O lead pode não ter sido salvo.");
            alert("Houve um problema de conexão com o servidor. Por favor, recarregue a página e tente novamente.");
            return;
        }
        setIsGenerating(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/payments/create-pix`, { readingId });
            if (response.data.success) {
                setPixData({
                    code: response.data.pixCode,
                    qrCode: response.data.qrCode
                });
                setShowPaymentModal(true);
                startPolling(readingId);
            }
        } catch (error) {
            console.error("Erro ao criar PIX:", error);
            alert("Erro ao gerar pagamento. Tente novamente.");
        } finally {
            setIsGenerating(false);
        }
    };

    const startPolling = (rid) => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/payments/status/${rid}`);
                if (response.data.status === 'PAID') {
                    clearInterval(interval);
                    // setPaymentStatus('PAID'); // Removed as per instruction
                    setShowPaymentModal(false);
                    // Automatically trigger interpretation once paid
                    handleFetchResult(rid);
                }
            } catch (error) {
                console.error("Polling error:", error);
            }
        }, 3000);

        // Stop polling after 10 minutes to avoid infinite loops
        setTimeout(() => clearInterval(interval), 600000);
    };

    const handleFetchResult = async (rid) => {
        setIsGenerating(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/readings/${rid}/result`);
            if (response.data.success) {
                setAiInterpretation(response.data.interpretation);
                setStep(5);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            console.error("Erro ao carregar resultado:", error);
            alert("Erro ao receber sua mensagem. Recarregue a página.");
        } finally {
            setIsGenerating(false);
        }
    };

    const startReadingRitual = () => {
        setStep(3);
        // Ensure focus on the reading section after modal closes
        setTimeout(() => {
            const element = document.getElementById('reading');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
        const messages = [
            "Conectando com sua energia...",
            "Sintonizando a vibração da sua pergunta...",
            "Embaralhando os Arcanos Maiores...",
            "Selecionando as cartas por sincronicidade...",
            "Gerando interpretação personalizada..."
        ];

        let msgIndex = 0;

        const textInterval = setInterval(() => {
            msgIndex++;
            if (msgIndex < messages.length) {
                setLoadingText(messages[msgIndex]);
            }
        }, 1500);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(textInterval);
                    setTimeout(() => setStep(4), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 80);
    };

    return (
        <section id="reading" className="py-20 relative min-h-[800px] flex items-center">
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            <div className="container-custom max-w-5xl relative z-10 w-full">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-14 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col justify-center">
                    {/* Decorative glow */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-mystic-gold opacity-5 blur-[100px] rounded-full pointer-events-none" />

                    {step === 1 && (
                        <div className="animate-fade-in flex flex-col items-center w-full">
                            <div className="text-center mb-8">
                                <p className="text-mystic-gold text-sm uppercase tracking-widest mb-3">Passo 1 de 3</p>
                                <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
                                    O que tira sua paz neste momento?
                                </h2>
                                <p className="text-mystic-muted text-base md:text-lg">
                                    Compartilhe sua dúvida. O Universo está pronto para responder.
                                </p>
                            </div>
                            <div className="w-full max-w-2xl mb-10">
                                <textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Ex: Devo investir nesse relacionamento? Vou conseguir aquele emprego? Qual é o meu propósito? Devo aceitar essa proposta?"
                                    className="w-full bg-black/40 border border-white/20 rounded-2xl p-6 text-lg text-white placeholder-white/30 focus:outline-none focus:border-mystic-gold focus:ring-1 focus:ring-mystic-gold transition-colors h-48 resize-none shadow-inner"
                                />
                            </div>
                            <div className="w-full md:w-auto text-center">
                                <button
                                    onClick={handleStart}
                                    disabled={!question.trim()}
                                    className="btn-primary w-full md:min-w-[300px] opacity-90 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    Continuar
                                </button>
                            </div>
                            <p className="text-center text-sm text-mystic-muted mt-8 flex items-center justify-center gap-2 bg-white/5 px-4 py-2 rounded-full inline-flex">
                                <Lock size={14} />
                                100% confidencial. Ninguém verá sua pergunta.
                            </p>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in w-full">
                            <div className="text-center mb-12">
                                <p className="text-mystic-gold text-sm uppercase tracking-widest mb-3">Passo 2 de 3</p>
                                <h2 className="text-3xl md:text-4xl mb-4 font-bold">
                                    Quantas cartas você precisa?
                                </h2>
                                <p className="text-lg text-mystic-muted">
                                    Escolha a profundidade da sua resposta.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 mb-12">
                                {/* 1 Card */}
                                <div
                                    onClick={() => handleCardSelection(1)}
                                    className={`cursor - pointer group p - 6 rounded - 2xl border bg - gradient - to - b from - white / 5 to - transparent transition - all duration - 300 hover: border - mystic - gold hover: -translate - y - 2 ${selectedCards === 1 ? 'border-mystic-gold ring-1 ring-mystic-gold bg-white/10' : 'border-white/10'} `}
                                >
                                    <div className="w-full aspect-[2/3] mb-6 relative rounded-xl overflow-hidden shadow-2xl group-hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all">
                                        <img src={tarotBack} alt="Tarot Card" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <div className={`w - 14 h - 14 rounded - full flex items - center justify - center text - mystic - gold backdrop - blur - md transition - colors ${selectedCards === 1 ? 'bg-mystic-gold text-mystic-deep' : 'bg-black/50'} `}>
                                                <Play size={24} fill="currentColor" />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-3 text-center text-mystic-gold">1 Carta</h3>
                                    <p className="text-sm text-mystic-muted text-center leading-relaxed">Resposta direta e urgente.</p>
                                </div>

                                {/* 2 Cards */}
                                <div
                                    onClick={() => handleCardSelection(2)}
                                    className={`cursor - pointer group p - 6 rounded - 2xl border bg - gradient - to - b from - white / 5 to - transparent transition - all duration - 300 hover: border - blue - 400 hover: -translate - y - 2 ${selectedCards === 2 ? 'border-blue-400 ring-1 ring-blue-400 bg-white/10' : 'border-white/10'} `}
                                >
                                    <div className="w-full aspect-[2/3] mb-6 relative rounded-xl overflow-hidden shadow-2xl group-hover:shadow-[0_0_20px_rgba(60,100,255,0.2)] transition-all">
                                        <div className="absolute inset-0 flex justify-center translate-x-3 rotate-6">
                                            <img src={tarotBack} alt="Tarot Card" className="w-full h-full object-cover rounded-lg border border-white/10" />
                                        </div>
                                        <div className="absolute inset-0 flex justify-center -translate-x-3 -rotate-6">
                                            <img src={tarotBack} alt="Tarot Card" className="w-full h-full object-cover rounded-lg border border-white/10" />
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                                            <div className={`w - 14 h - 14 rounded - full flex items - center justify - center text - blue - 300 backdrop - blur - md transition - colors ${selectedCards === 2 ? 'bg-blue-500 text-white' : 'bg-black/50'} `}>
                                                <HelpCircle size={28} />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-3 text-center text-blue-300">2 Cartas</h3>
                                    <p className="text-sm text-mystic-muted text-center leading-relaxed">Situação + Conselho.</p>
                                </div>

                                {/* 3 Cards */}
                                <div
                                    onClick={() => handleCardSelection(3)}
                                    className={`cursor - pointer group p - 6 rounded - 2xl border bg - gradient - to - b from - white / 5 to - transparent transition - all duration - 300 hover: border - amber - 500 hover: -translate - y - 2 ${selectedCards === 3 ? 'border-amber-500 ring-1 ring-amber-500 bg-white/10' : 'border-white/10'} `}
                                >
                                    <div className="w-full aspect-[2/3] mb-6 relative rounded-xl overflow-hidden shadow-2xl group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all">
                                        <div className="absolute inset-0 flex justify-center translate-x-6 rotate-12 opacity-80">
                                            <img src={tarotBack} alt="Tarot Card" className="w-full h-full object-cover rounded-lg border border-white/10" />
                                        </div>
                                        <div className="absolute inset-0 flex justify-center opacity-90">
                                            <img src={tarotBack} alt="Tarot Card" className="w-full h-full object-cover rounded-lg border border-white/10" />
                                        </div>
                                        <div className="absolute inset-0 flex justify-center -translate-x-6 -rotate-12 opacity-80">
                                            <img src={tarotBack} alt="Tarot Card" className="w-full h-full object-cover rounded-lg border border-white/10" />
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                                            <div className={`w - 14 h - 14 rounded - full flex items - center justify - center text - amber - 300 backdrop - blur - md transition - colors ${selectedCards === 3 ? 'bg-amber-500 text-white' : 'bg-black/50'} `}>
                                                <Eye size={28} />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-3 text-center text-amber-500">3 Cartas</h3>
                                    <p className="text-sm text-mystic-muted text-center leading-relaxed">Passado, Presente e Futuro.</p>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={handleRevealClick}
                                    className="btn-primary w-full md:w-auto md:min-w-[320px] mx-auto text-xl py-5"
                                >
                                    Revelar Meu Sinal Agora
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in flex flex-col items-center justify-center w-full h-full py-12">
                            <div className="relative w-32 h-32 mb-8">
                                <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                                <div className="absolute inset-0 border-t-4 border-mystic-gold rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="text-mystic-gold animate-pulse" size={40} />
                                </div>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center animate-pulse-slow">
                                {loadingText}
                            </h3>

                            <div className="w-full max-w-md bg-white/10 rounded-full h-2 mt-4 overflow-hidden">
                                <div
                                    className="bg-mystic-gold h-full rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${progress}% ` }}
                                ></div>
                            </div>
                            <p className="mt-4 text-mystic-muted text-sm">{progress}% concluído</p>
                        </div>
                    )}

                    {/* Step 4: Result & Paywall - High Conversion Optimization */}
                    {step === 4 && readingCards.length > 0 && (
                        <div className="animate-fade-in flex flex-col items-center w-full">
                            <div className="text-center mb-8">
                                <div className="inline-block bg-red-500/20 border border-red-500/40 rounded-full px-4 py-1 mb-4 animate-pulse">
                                    <p className="text-red-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                        Mensagem Urgente do Universo
                                    </p>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white leading-tight">
                                    O Universo enviou um <span className="text-mystic-gold">aviso claro</span> sobre sua situação.
                                </h2>
                                <p className="text-lg text-mystic-muted max-w-2xl mx-auto">
                                    A energia em torno da sua pergunta <span className="text-white italic">"{question}"</span> é intensa e revela algo que você não estava vendo.
                                </p>
                            </div>

                            {/* Cards Grid - 1 Truth / 2 Hidden */}
                            <div className="grid md:grid-cols-3 gap-6 w-full mb-10">
                                {/* Card 1: The Partial Reveal (Hook) */}
                                <div className="col-span-1 bg-white/5 border border-mystic-gold/30 rounded-xl p-4 flex flex-col items-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-mystic-gold shadow-[0_0_10px_#ffd700]"></div>
                                    <h4 className="text-mystic-gold font-bold uppercase tracking-widest text-sm mb-3">O Momento Atual</h4>
                                    <div className="w-full aspect-[2/3] rounded-lg overflow-hidden mb-4 shadow-lg">
                                        <img
                                            src={readingCards[0].image}
                                            alt={readingCards[0].name}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            onError={(e) => { e.target.onerror = null; e.target.src = tarotBack }}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{readingCards[0].name}</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed text-center mb-4">
                                        {readingCards[0].meaning}. {readingCards[0].description} <span className="text-white font-bold">Isso confirma sua intuição</span>, mas há um alerta crucial nas próximas cartas...
                                    </p>
                                    <div className="mt-auto w-full pt-3 border-t border-white/10">
                                        <p className="text-xs text-mystic-gold text-center flex items-center justify-center gap-1">
                                            <Eye size={12} /> Leitura Gratuita Parcial
                                        </p>
                                    </div>
                                </div>

                                {/* Card 2: Locked (Teaser) */}
                                <div className="col-span-1 bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col items-center relative grayscale opacity-90">
                                    <h4 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-3">O Bloqueio Oculto</h4>
                                    <div className="w-full aspect-[2/3] rounded-lg overflow-hidden mb-4 relative">
                                        {/* Image Visible but Blurred/Dimmed */}
                                        <img
                                            src={readingCards[1].image}
                                            alt="Carta Bloqueada"
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.onerror = null; e.target.src = tarotBack }}
                                        />
                                        {/* Lock Overlay Stronger */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                                            <Lock className="text-white/80" size={32} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-400 mb-2">{readingCards[1].name}</h3>
                                    <div className="w-full relative h-24 overflow-hidden">
                                        <p className="text-sm text-gray-500 text-center blur-[4px] select-none">
                                            {readingCards[1].description} Essa carta aparece para alertar sobre um perigo iminente que você está ignorando por medo de enfrentar a verdade.
                                        </p>
                                    </div>
                                </div>

                                {/* Card 3: Locked (The Outcome) */}
                                <div className="col-span-1 bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col items-center relative grayscale opacity-90">
                                    <h4 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-3">Destino Final</h4>
                                    <div className="w-full aspect-[2/3] rounded-lg overflow-hidden mb-4 relative">
                                        {/* Image Visible but Blurred/Dimmed */}
                                        <img
                                            src={readingCards[2].image}
                                            alt="Carta Bloqueada"
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.onerror = null; e.target.src = tarotBack }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                                            <Lock className="text-white/80" size={32} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-400 mb-2">{readingCards[2].name}</h3>
                                    <div className="w-full relative h-24 overflow-hidden">
                                        <p className="text-sm text-gray-500 text-center blur-[4px] select-none">
                                            {readingCards[2].description} O resultado final depende de uma única ação que você deve tomar agora. O Universo está abrindo uma porta...
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Paywall Action Block */}
                            <div className="bg-gradient-to-br from-mystic-deep to-black border border-mystic-gold/30 rounded-2xl p-6 md:p-8 w-full max-w-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                    <div className="flex-shrink-0 bg-mystic-gold/10 p-4 rounded-full border border-mystic-gold/20 animate-pulse-slow">
                                        <Lock className="text-mystic-gold" size={32} />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                                            Não tome nenhuma decisão ainda.
                                        </h3>
                                        <p className="text-gray-300 text-base md:text-lg mb-0">
                                            O Universo mostrou que <span className="text-mystic-gold font-bold">{readingCards[1]?.name || "uma força oculta"}</span> está bloqueando seu caminho. Apenas a leitura completa revela como usar a energia de <span className="text-mystic-gold font-bold">{readingCards[2]?.name || "seu destino"}</span> para resolver isso definitivamente.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col items-center">
                                    <button
                                        onClick={() => {
                                            console.log("PIX Button clicked, readingId:", readingId);
                                            handleCreatePix();
                                        }}
                                        disabled={isGenerating}
                                        id="unlock-btn"
                                        className="btn-primary w-full md:w-auto text-xl px-12 py-5 shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transform transition-transform hover:scale-105 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <Sparkles size={24} className={isGenerating ? "animate-spin" : "hidden group-hover:block animate-spin"} />
                                        {isGenerating ? "Processando..." : "👉 DESBLOQUEAR MEU SINAL AGORA"}
                                    </button >
                                    <div className="mt-4 flex flex-col items-center gap-2">
                                        <div className="text-2xl font-bold text-white">R$ 14,90</div>
                                        <p className="text-xs text-mystic-muted flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            Acesso imediato e vitalício à sua resposta
                                        </p>
                                    </div>
                                </div >

                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-mystic-gold opacity-5 blur-[80px] rounded-full pointer-events-none"></div>
                            </div>
                        </div >
                    )}

                    {/* Step 5: Final Unlocked Interpretation */}
                    {
                        step === 5 && aiInterpretation && (
                            <div className="animate-fade-in flex flex-col w-full max-w-4xl mx-auto">

                                {/* Header */}
                                <div className="text-center mb-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-bold uppercase tracking-widest mb-4">
                                        <Sparkles size={12} /> Acesso Liberado
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display">
                                        Sua Leitura Completa
                                    </h2>
                                    <p className="text-mystic-muted text-lg">
                                        Aquilo que estava oculto, agora foi revelado.
                                    </p>
                                </div>

                                {/* 1. Validação Emocional */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-sm">
                                    <h3 className="text-xl font-bold text-mystic-gold mb-4 flex items-center gap-2">
                                        <User size={20} /> O que sua alma está gritando
                                    </h3>
                                    <div className="text-gray-300 leading-relaxed text-lg italic whitespace-pre-wrap">
                                        {aiInterpretation.validation_text}
                                    </div>
                                </div>

                                {/* 2. Leitura Energética Direta */}
                                <div className="mb-10 text-center md:text-left bg-mystic-gold/5 p-8 rounded-2xl border border-mystic-gold/20">
                                    <p className="text-xl text-white font-medium leading-relaxed mb-0">
                                        {aiInterpretation.direct_reading}
                                    </p>
                                </div>

                                {/* 3. Interpretação Carta por Carta */}
                                <div className="space-y-6 mb-12">
                                    {aiInterpretation.cards_analysis.map((card, index) => (
                                        <div key={index} className={`flex flex-col md:flex-row gap-6 items-start bg-black/20 p-6 rounded-xl border border-white/5 ${index === 1 ? 'border-l-4 border-red-500/50' : index === 2 ? 'border-l-4 border-mystic-gold/50' : ''}`}>
                                            <div className="w-24 h-36 flex-shrink-0 relative overflow-hidden rounded-lg shadow-lg">
                                                <img src={readingCards[index]?.image} alt={card.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-white mb-2">{card.name} — {index === 0 ? 'O Momento' : index === 1 ? 'O Desafio' : 'O Futuro'}</h4>
                                                <p className="text-gray-300 leading-relaxed">
                                                    {card.meaning}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* 4. O Ponto Crítico (Alerta) */}
                                <div className="bg-red-900/10 border border-red-500/30 rounded-2xl p-8 mb-10 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_#ef4444]"></div>
                                    <h3 className="text-2xl font-bold text-red-100 mb-4 flex items-center justify-center gap-2">
                                        <HelpCircle size={24} className="text-red-400" /> Alerta Crítico
                                    </h3>
                                    <p className="text-lg text-red-100/80 max-w-2xl mx-auto whitespace-pre-wrap">
                                        {aiInterpretation.critical_alert}
                                    </p>
                                </div>

                                {/* 5. Direcionamento Prático */}
                                <div className="bg-gradient-to-r from-mystic-gold/10 to-transparent border border-mystic-gold/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                                    <h3 className="text-2xl font-bold text-mystic-gold mb-6 flex items-center gap-2 font-display uppercase tracking-widest">
                                        <Sparkles size={24} /> O Caminho da Vitória
                                    </h3>
                                    <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                                        {aiInterpretation.actionable_advice}
                                    </div>
                                </div>

                                <div className="mt-12 text-center">
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="text-mystic-muted hover:text-white transition-colors underline text-sm"
                                    >
                                        Fazer nova leitura
                                    </button>
                                </div>

                            </div>
                        )
                    }
                </div >
            </div >

            {showLeadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-mystic-deep border border-mystic-gold/30 rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
                        <button
                            onClick={() => setShowLeadModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center mb-6">
                            <Sparkles className="mx-auto text-mystic-gold mb-4" size={32} />
                            <h3 className="text-2xl font-bold text-white mb-2 font-display">Complete seus dados</h3>
                            <p className="text-mystic-muted text-sm">
                                Para gerar sua tiragem gratuita e enviar a cópia para seu e-mail.
                            </p>
                        </div>

                        <form onSubmit={submitLeadAndStart} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1 ml-1">Nome Completo</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={leadName}
                                        onChange={(e) => setLeadName(e.target.value)}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-mystic-gold focus:outline-none transition-colors"
                                        placeholder="Seu nome"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1 ml-1">E-mail Principal</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={leadEmail}
                                        onChange={(e) => setLeadEmail(e.target.value)}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-mystic-gold focus:outline-none transition-colors"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1 ml-1">WhatsApp</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="tel"
                                        required
                                        value={leadPhone}
                                        onChange={(e) => setLeadPhone(e.target.value)}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-mystic-gold focus:outline-none transition-colors"
                                        placeholder="(11) 99999-9999"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full mt-6"
                            >
                                Fazer Tiragem Grátis Agora
                            </button>

                            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1 mt-4">
                                <Lock size={10} /> Seus dados estão 100% seguros
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {/* PIX Payment Modal */}
            {showPaymentModal && pixData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
                    <div className="bg-mystic-deep border border-mystic-gold/30 rounded-3xl p-6 md:p-10 w-full max-w-md text-center relative shadow-[0_0_100px_rgba(255,215,0,0.2)]">
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-6 flex flex-col items-center">
                            <div className="bg-mystic-gold/10 p-3 rounded-full mb-4">
                                <Sparkles className="text-mystic-gold" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2 font-display uppercase tracking-widest">Conexão em Processo</h2>
                            <p className="text-mystic-muted text-sm px-4">Escaneie o QR code ou use o codigo copie e cole pix abaixo para revelar seu sinal divino agora mesmo</p>
                        </div>

                        <div className="bg-white p-4 rounded-2xl mb-6 inline-block shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <img src={pixData.qrCode} alt="PIX QR Code" className="w-52 h-52 md:w-64 md:h-64" />
                        </div>

                        <div className="space-y-4 px-2">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(pixData.code);
                                    alert("Código PIX copiado!");
                                }}
                                className="w-full bg-mystic-gold/10 border border-mystic-gold/30 text-mystic-gold py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-mystic-gold/20 transition-all uppercase tracking-widest text-xs"
                            >
                                Copiar Código Copia e Cola
                            </button>

                            <div className="flex items-center justify-center gap-3 text-mystic-gold animate-pulse text-xs font-medium bg-mystic-gold/5 py-3 rounded-lg border border-mystic-gold/10">
                                <div className="w-2 h-2 rounded-full bg-mystic-gold"></div>
                                Aguardando confirmação do Universo...
                            </div>
                        </div>

                        <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-widest">
                            Ambiente Criptografado • Acesso Imediato
                        </p>
                    </div>
                </div>
            )}
        </section >
    );
};

export default TarotForm;
