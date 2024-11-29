document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Load saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        html.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener('change', () => {
        html.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', html.classList.contains('dark-mode'));
    });

    // Bottom Navigation
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const sections = document.querySelectorAll('.section');

    bottomNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSectionId = item.getAttribute('data-target');

            // Remove active from all nav items and sections
            bottomNavItems.forEach(navItem => navItem.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active to clicked nav item and corresponding section
            item.classList.add('active');
            document.getElementById(targetSectionId).classList.add('active');
        });
    });

    // Mood Tracking
    const moodCards = document.querySelectorAll('.mood-card');
    const moodHistory = document.getElementById('moodHistory');

    moodCards.forEach(card => {
        card.addEventListener('click', () => {
            const mood = card.textContent.trim();
            const moodEntry = document.createElement('div');
            moodEntry.textContent = `${new Date().toLocaleDateString()} - ${mood}`;
            moodHistory.appendChild(moodEntry);
        });
    });

    // Font Size Control
    const fontSizeButtons = document.querySelectorAll('.font-size-btn');

    // Load saved font size preference
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    html.classList.add(`font-${savedFontSize}`);
    
    fontSizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.getAttribute('data-size');
            
            // Remove existing font classes
            html.classList.remove('font-small', 'font-medium', 'font-large');
            html.classList.add(`font-${size}`);

            // Update active button
            fontSizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Save preference
            localStorage.setItem('fontSize', size);
        });
    });

    // Notification Toggle
    const notificationToggle = document.getElementById('notificationsToggle');
    const savedNotificationPreference = localStorage.getItem('notifications') === 'true';
    
    notificationToggle.checked = savedNotificationPreference;

    notificationToggle.addEventListener('change', () => {
        localStorage.setItem('notifications', notificationToggle.checked);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos
    const glucoseInput = document.getElementById('glucoseLevel');
    const checkMenuButton = document.getElementById('checkMenu');
    const menuMessage = document.getElementById('menuMessage');
    const progressChartCanvas = document.getElementById('progressChart');

    // Recomendaciones basadas en glucosa
    checkMenuButton.addEventListener('click', () => {
        const glucoseLevel = parseInt(glucoseInput.value);
        let menu = "";

        if (glucoseLevel < 70) {
            menu = "Desayuno: Jugo de naranja. Almuerzo: Arroz integral con pollo. Cena: Yogur con frutas.";
        } else if (glucoseLevel <= 140) {
            menu = "Desayuno: Avena con fresas. Almuerzo: Pescado a la parrilla con verduras. Cena: Ensalada César.";
        } else {
            menu = "Desayuno: Té verde y nueces. Almuerzo: Pollo al vapor con brócoli. Cena: Caldo de verduras.";
        }

        menuMessage.textContent = menu;
    });

    // Gráfico de progreso
    const progressData = {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
        datasets: [{
            label: 'Nivel de Glucosa',
            data: [120, 110, 105, 100],
            backgroundColor: 'rgba(71, 183, 132, 0.5)',
            borderColor: 'rgba(71, 183, 132, 1)',
            borderWidth: 2
        }]
    };

    const progressChart = new Chart(progressChartCanvas, {
        type: 'line',
        data: progressData,
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const forgotPasswordSection = document.getElementById('forgotPasswordSection');
    const moodSection = document.getElementById('moodSection');

    const loginButton = document.getElementById('loginButton');
    const registerLink = document.getElementById('registerLink');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const registerButton = document.getElementById('registerButton');
    const forgotPasswordButton = document.getElementById('forgotPasswordButton');

    // Navegación entre secciones
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.remove('active');
        registerSection.classList.add('active');
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.remove('active');
        forgotPasswordSection.classList.add('active');
    });

    // Simulación de registro
    registerButton.addEventListener('click', () => {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        if (name && email && password) {
            alert('Cuenta creada con éxito. Inicia sesión.');
            registerSection.classList.remove('active');
            loginSection.classList.add('active');
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    // Recuperación de contraseña
    forgotPasswordButton.addEventListener('click', () => {
        const email = document.getElementById('forgotEmail').value;
        if (email) {
            alert(`Se ha enviado un correo de recuperación a ${email}.`);
            forgotPasswordSection.classList.remove('active');
            loginSection.classList.add('active');
        } else {
            alert('Por favor, introduce tu correo.');
        }
    });

    // Simulación de inicio de sesión
    loginButton.addEventListener('click', () => {
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        if (email && password) {
            alert('Inicio de sesión exitoso.');
            loginSection.classList.remove('active');
            moodSection.classList.add('active');
        } else {
            alert('Por favor, introduce tus credenciales.');
        }
    });
});
// Selecciona las secciones y el menú
const loginSection = document.getElementById('loginSection');
const bottomNav = document.querySelector('.bottom-nav');

// Función para mostrar/ocultar el menú
function toggleMenuVisibility() {
    if (loginSection.classList.contains('active')) {
        bottomNav.style.display = 'none'; // Oculta el menú
    } else {
        bottomNav.style.display = 'flex'; // Muestra el menú
    }
}

// Llama a la función cuando se cambie de sección
document.addEventListener('DOMContentLoaded', toggleMenuVisibility);
document.addEventListener('sectionChange', toggleMenuVisibility); // Ejemplo si tienes un evento para cambiar secciones
// Selecciona el encabezado y la sección de inicio de sesión
const appHeader = document.querySelector('.app-header');

// Función para mostrar/ocultar el encabezado
function toggleHeaderVisibility() {
    if (loginSection.classList.contains('active')) {
        appHeader.style.display = 'none'; // Oculta el encabezado
    } else {
        appHeader.style.display = 'flex'; // Muestra el encabezado
    }
}
// Detectar si la sección de inicio de sesión está activa
document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById("loginSection");
    const appHeader = document.getElementById("appHeader");

    if (loginSection.classList.contains("active")) {
        // Ocultar el encabezado
        appHeader.style.display = "none";
    } else {
        // Mostrar el encabezado si es necesario
        appHeader.style.display = "flex";
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const messageBox = document.getElementById("messageBox");

    loginButton.addEventListener("click", (e) => {
        e.preventDefault(); // Evitar el envío del formulario por defecto
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validar que los campos no estén vacíos
        if (!email || !password) {
            showMessage("Por favor, ingresa tu correo y contraseña.");
            return;
        }

        // Mostrar mensaje de éxito y redirigir a otra sección
        showMessage("Bienvenido a VitaCare.");
        setTimeout(() => {
            // Simulación de inicio de sesión exitoso
    // Aquí podrías validar los datos antes de redirigir
    window.location.href = 'inicio.html'; // Cambia a la página deseada
            // Cambiar de sección después de 2 segundos
            document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
            document.getElementById("moodSection").classList.add("active");
        }, 2000);
    });

    // Función para mostrar el mensaje en el cuadro
    function showMessage(text) {
        messageBox.textContent = text;
        messageBox.classList.add("visible");

        // Ocultar mensaje automáticamente después de 3 segundos
        setTimeout(() => {
            messageBox.classList.add("hidden"); // Añade la clase para desaparecer
            setTimeout(() => {
                messageBox.classList.remove("visible", "hidden");
            }, 500); // Espera que termine la animación de desaparecer
        }, 3000);
    }
      
});
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line', // Tipo de gráfico
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
        datasets: [{
            label: 'Ventas',
            data: [12, 19, 3, 5, 2], // Datos de la gráfica
            borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
