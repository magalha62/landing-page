// Efeito de encolher a navbar ao rolar a página
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Inicializa o GSAP e as animações de scroll
gsap.registerPlugin(ScrollTrigger);
gsap.from(".hero-title", { duration: 1, y: 50, opacity: 0, ease: "power3.out", delay: 0.2 });
gsap.from(".feature-card", { duration: 0.8, y: 100, opacity: 0, ease: "power3.out", stagger: 0.2, scrollTrigger: { trigger: ".features-grid", start: "top 80%" } });

// Animação do Caminho de Pegadas
gsap.from(".footprints-step", {
    duration: 1,
    opacity: 0,
    y: 50,
    scale: 0.9,
    ease: "power3.out",
    stagger: 0.4, // Anima um de cada vez com um intervalo maior
    scrollTrigger: {
        trigger: ".footprints-path-container",
        start: "top 70%",
    }
});

// --- LÓGICA PARA O MENU HAMBÚRGUER ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// --- LÓGICA PARA O FAQ (ACCORDION) ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = 0;
            otherItem.querySelector('.faq-answer').style.padding = '0 1.5rem';
        });
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
            answer.style.padding = '0 1.5rem 1.5rem';
        }
    });
});

// Lógica do formulário de contato para o Formspree
const contactForm = document.getElementById('contact-form');
const formButton = contactForm.querySelector('button');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const originalButtonText = formButton.innerHTML;
    
    formButton.disabled = true;
    formButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            form.reset();
            alert('Obrigado pelo seu contato! Mensagem enviada com sucesso.');
            formButton.innerHTML = originalButtonText;
            formButton.disabled = false;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.errors.map(err => err.message).join(', '));
        }
    } catch (error) {
        alert(`Ocorreu um erro: ${error.message}`);
        formButton.innerHTML = originalButtonText;
        formButton.disabled = false;
    }
});