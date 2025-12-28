// Menu Toggle para móviles
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animación del icono hamburguesa
    menuToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Altura del navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de scroll en navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validación simple
    if (!name || !phone || !email || !message) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    // Simulación de envío (aquí conectarías con tu backend)
    showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
    
    // Limpiar formulario
    contactForm.reset();
});

// Función para mostrar notificaciones
function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Eliminar después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Contador animado para estadísticas (opcional - puedes agregar una sección de estadísticas)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Galería con lightbox simple
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-image');
        if (img && img.src) {
            openLightbox(img.src, img.alt);
        }
    });
});

function openLightbox(src, alt) {
    // Crear lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    // Cerrar al hacer clic
    lightbox.addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    });
}

// Agregar animaciones CSS al documento
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Botón "Solicitar Servicio" con acción
const solicitarBtn = document.querySelector('.hero .btn-primary');
if (solicitarBtn) {
    solicitarBtn.addEventListener('click', () => {
        // Scroll a la sección de contacto
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            const offset = 80;
            const targetPosition = contactSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Enfocar el primer campo del formulario
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 800);
        }
    });
}

// Manejo de imágenes no encontradas
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        // Crear un placeholder si la imagen no carga
        this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.alt = 'Imagen próximamente';
    });
});

console.log('🚛 Página de Grúas cargada exitosamente!');

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animar
const animateElements = document.querySelectorAll('.service-card, .feature-item, .gallery-item, .section-title, .info-item');
animateElements.forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// Catálogo de servicios desplegable
const serviceCards = document.querySelectorAll('.service-card');
const serviceToggles = document.querySelectorAll('.service-toggle');

serviceToggles.forEach((toggle, index) => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = serviceCards[index];
        const isExpanded = card.classList.contains('expanded');
        
        // Cerrar todas las tarjetas
        serviceCards.forEach(c => {
            c.classList.remove('expanded');
            const btn = c.querySelector('.service-toggle');
            if (btn) btn.textContent = 'Ver más +';
        });
        
        // Si no estaba expandida, expandirla
        if (!isExpanded) {
            card.classList.add('expanded');
            toggle.textContent = 'Ver menos';
            
            // Scroll suave a la tarjeta expandida
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    });
});

// Cerrar tarjeta al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card')) {
        serviceCards.forEach(card => {
            card.classList.remove('expanded');
            const btn = card.querySelector('.service-toggle');
            if (btn) btn.textContent = 'Ver más +';
        });
    }
});
