// 1. Efeito de scroll na navbar (diminui ao rolar)
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 2. Animação de entrada para elementos ao rolar a página (Fade-Up)
const observerOptions = {
    // A animação dispara quando 10% do elemento se torna visível
    threshold: 0.1, 
    // Garante que a animação dispare um pouco antes de entrar totalmente na tela
    rootMargin: '0px 0px -50px 0px' 
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Opcional: Para que a animação não se repita ao rolar para cima e para baixo
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos que devem ter a animação, INCLUINDO O NOVO .faq-item
    const elementsToAnimate = document.querySelectorAll('.fade-up, .service-card, .testimonial-card, .contact-form, .contact-info, .about-content, .faq-item');
    
    elementsToAnimate.forEach(el => {
        // Garante que o elemento tenha a classe inicial de animação
        if (!el.classList.contains('fade-up')) {
            el.classList.add('fade-up');
        }
        observer.observe(el);
    });
});

// 3. Adicionar CSS para animações de entrada diretamente via JS (Inclui Delay do FAQ)
const style = document.createElement('style');
style.textContent = `
    .fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Delay para animação em cascata dos cards */
    .services-grid .service-card:nth-child(1) { transition-delay: 0.1s; }
    .services-grid .service-card:nth-child(2) { transition-delay: 0.2s; }
    .services-grid .service-card:nth-child(3) { transition-delay: 0.3s; }
    .services-grid .service-card:nth-child(4) { transition-delay: 0.4s; }
    .services-grid .service-card:nth-child(5) { transition-delay: 0.5s; }
    .services-grid .service-card:nth-child(6) { transition-delay: 0.6s; }
    
    .testimonials-grid .testimonial-card:nth-child(1) { transition-delay: 0.1s; }
    .testimonials-grid .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
    .testimonials-grid .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
    
    /* Delay para animação em cascata dos itens do FAQ (NOVO) */
    .faq-grid .faq-item:nth-child(1) { transition-delay: 0.1s; }
    .faq-grid .faq-item:nth-child(2) { transition-delay: 0.2s; }
    .faq-grid .faq-item:nth-child(3) { transition-delay: 0.3s; }
    .faq-grid .faq-item:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);

// 4. Ativação do menu ativo baseado na rolagem
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// 5. Envio do formulário para o WhatsApp
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o recarregamento da página

    // Captura os dados dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    // Número de telefone de destino (apenas números)
    const numeroDestino = "5566984327100"; // (66) 98432-7100

    // Cria a mensagem formatada
    const textoMensagem = `*Olá, vim pelo site e gostaria de solicitar uma proposta!*\n\n` +
                          `*Nome:* ${nome}\n` +
                          `*E-mail:* ${email}\n` +
                          `*Telefone:* ${telefone}\n` +
                          `*Mensagem:* ${mensagem}`;

    // Codifica a mensagem para URL
    const textoCodificado = encodeURIComponent(textoMensagem);

    // Cria o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroDestino}?text=${textoCodificado}`;

    // Abre o WhatsApp em uma nova aba
    window.open(linkWhatsApp, '_blank');

    // Opcional: Limpa o formulário após o envio
    this.reset();
});

// 6. Animação de Contagem dos Números (Counter Up)
const statsSection = document.querySelector('#estatisticas');
const statsNumbers = document.querySelectorAll('.stat-number');
let started = false; // Garante que a animação só rode uma vez

function startCount(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000; // Duração da animação em ms (2 segundos)
    const step = 20; // Atualiza a cada 20ms
    const increment = target / (duration / step);
    
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.innerText = target;
            if(target === 98) el.innerText += "%"; // Adiciona % no 98
            else el.innerText += "+"; // Adiciona + nos outros
            clearInterval(timer);
        } else {
            el.innerText = Math.ceil(current);
        }
    }, step);
}

// Observador específico para disparar a contagem
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            statsNumbers.forEach(num => startCount(num));
            started = true;
        }
    }, { threshold: 0.5 }); // Dispara quando 50% da seção estiver visível

    statsObserver.observe(statsSection);
}