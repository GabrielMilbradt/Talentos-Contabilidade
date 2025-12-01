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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.fade-up, .service-card, .contact-form, .contact-info, .about-content, .faq-item');
    
    elementsToAnimate.forEach(el => {
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
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
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
    
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// 5. Envio do formulário para o WhatsApp
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    const numeroDestino = "5566984327100";

    const textoMensagem = `*Olá, vim pelo site e gostaria de solicitar uma proposta!*\n\n` +
                          `*Nome:* ${nome}\n` +
                          `*E-mail:* ${email}\n` +
                          `*Telefone:* ${telefone}\n` +
                          `*Mensagem:* ${mensagem}`;

    const textoCodificado = encodeURIComponent(textoMensagem);

    const linkWhatsApp = `https://wa.me/${numeroDestino}?text=${textoCodificado}`;

    window.open(linkWhatsApp, '_blank');

    this.reset();
});

// 6. Animação de Contagem dos Números (Counter Up)
const statsSection = document.querySelector('#estatisticas');
const statsNumbers = document.querySelectorAll('.stat-number');
let started = false;

function startCount(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = 20;
    const increment = target / (duration / step);
    
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.innerText = target;
            if(target === 98) el.innerText += "%";
            else el.innerText += "+";
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
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// 7. Menu Mobile (hamburguer) - MODIFICADO PARA LADO DIREITO
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuExpanded = document.getElementById('mobileMenuExpanded');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    function openMobileMenu() {
        mobileMenuExpanded.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede scroll do body
    }
    
    function closeMobileMenu() {
        mobileMenuExpanded.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura scroll do body
    }
    
    if (mobileMenuBtn && mobileMenuExpanded && mobileMenuClose) {
        // Abrir menu mobile
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        
        // Fechar menu com botão X
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        
        // Fechar menu ao clicar em um link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Fechar menu ao clicar no overlay
        overlay.addEventListener('click', closeMobileMenu);
        
        // Fechar menu com tecla ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenuExpanded.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuExpanded.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});