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
gsap.from(".timeline-item", { duration: 1, x: (index) => (index % 2 === 0 ? -100 : 100), opacity: 0, ease: "power3.out", stagger: 0.3, scrollTrigger: { trigger: ".timeline", start: "top 70%" } });

// --- NOVA LÓGICA PARA O FAQ (ACCORDION) ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Fecha todos os outros itens
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = 0;
        });

        // Abre ou fecha o item clicado
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
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
            alert('Obrigado pelo seu contato! Mensagem enviada com sucesso.'); // Pode trocar por uma notificação mais elegante se quiser
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