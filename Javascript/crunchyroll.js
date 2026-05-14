/**
 * SISTEMA DE LOGIN Y REGISTRO - Crunchyroll Trucho
 * 
 * Este archivo maneja toda la lógica de autenticación de usuarios
 * Características:
 * - Login con usuario y contraseña
 * - Registro de nuevos usuarios
 * - Validación de datos
 * - Almacenamiento seguro en localStorage
 * - Alternancia entre formularios de login y registro
 * 
 * Estructura del código:
 * 1. Declaración de variables (elementos HTML)
 * 2. Event listeners principales (botones de login/registro)
 * 3. Funciones helper (lógica de validación y navegación)
 * 
 * Usuario por defecto: apa / apa
 */

// LOGIN & REGISTER SYSTEM
document.addEventListener('DOMContentLoaded', function() {
    // ============ DECLARACIÓN DE VARIABLES ============
    
    // Elementos principales de la página
    const loginScreen = document.getElementById('login-screen');      // Pantalla de login/registro
    const header = document.querySelector('header');                   // Header principal
    const main = document.querySelector('main');                       // Contenido principal (banners)
    const bannerModules = document.querySelectorAll('.banner-module'); // Banners de anime
    const heroWatchBtn = document.querySelector('.watch-btn');
    const heroDetailsBtn = document.querySelector('.details-btn');
    
    // Elementos del formulario de LOGIN
    const loginForm = document.getElementById('login-form');          // Contenedor del formulario de login
    const errorMessage = document.getElementById('error-message');    // Mensaje de error de login
    const usernameInput = document.getElementById('username');        // Input de usuario
    const passwordInput = document.getElementById('password');        // Input de contraseña
    const loginBtn = document.getElementById('login-btn');            // Botón \"Iniciar Sesión\"
    const goToRegisterBtn = document.getElementById('go-to-register-btn');  // Botón \"Registrarse\"
    
    // Elementos del formulario de REGISTRO
    const registerForm = document.getElementById('register-form');                    // Contenedor del formulario de registro
    const registerErrorMessage = document.getElementById('register-error-message');  // Mensaje de error de registro
    const newUsernameInput = document.getElementById('new-username');                // Input de nuevo usuario
    const newPasswordInput = document.getElementById('new-password');                // Input de nueva contraseña
    const newPasswordConfirmInput = document.getElementById('new-password-confirm'); // Input de confirmación
    const registerBtn = document.getElementById('register-btn');                      // Botón \"Crear Cuenta\"
    const goToLoginBtn = document.getElementById('go-to-login-btn');                 // Botón \"Iniciar Sesión\" (en registro)

    // Elementos de la ventana modal de informacion
    const animeModal = document.getElementById('anime-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalVideo = document.getElementById('modal-video');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDate = document.getElementById('modal-date');
    const modalGenre = document.getElementById('modal-genre');
    const modalRating = document.getElementById('modal-rating');
    const modalEpisodes = document.getElementById('modal-episodes');
    const videosBasePath = 'imagenes/Videos/';
    const crunchyrollVideosPath = videosBasePath + 'videos-crunchyroll/';
    const animeVideos = {
        'Bungo Stray Dogs': crunchyrollVideosPath + 'bungo-stray-dogs.mp4',
        'Cells at Work!': crunchyrollVideosPath + 'cells-at-work.mp4',
        'Chainsaw Man': crunchyrollVideosPath + 'chainsaw-man.mp4',
        'Dan Da Dan': crunchyrollVideosPath + 'dan-da-dan.mp4',
        'Dr. Stone': crunchyrollVideosPath + 'dr-stone.mp4',
        'El Héroe del Escudo': crunchyrollVideosPath + 'el-heroe-del-escudo.mp4',
        'Fire Force': crunchyrollVideosPath + 'fire-force.mp4',
        'Frieren': videosBasePath + 'frieren-trailer.mp4',
        "Hell's Paradise": crunchyrollVideosPath + 'hells-paradise.mp4',
        'Hunter x Hunter': crunchyrollVideosPath + 'hunter-x-hunter.mp4',
        'Jujutsu Kaisen': crunchyrollVideosPath + 'jujutsu-kaisen.mp4',
        'Los Diarios de la Boticaria': crunchyrollVideosPath + 'los-diarios-de-la-boticaria.mp4',
        'Mashle': crunchyrollVideosPath + 'mashle.mp4',
        'My Hero Academia': crunchyrollVideosPath + 'my-hero-academia.mp4',
        'Naruto Shippuden': crunchyrollVideosPath + 'naruto.mp4',
        'One Piece': crunchyrollVideosPath + 'one-piece.mp4',
        'Solo Leveling': crunchyrollVideosPath + 'solo-leveling.mp4',
        'Spy x Family': crunchyrollVideosPath + 'spy-family.mp4',
        'Tanya the Evil': crunchyrollVideosPath + 'tanya-the-evil.mp4',
        'To Be Hero X': crunchyrollVideosPath + 'to-be-hero-x.mp4',
        'Hunter x Hunter 1999': crunchyrollVideosPath + 'hunter-x-hunter.mp4',
        'Frieren Especial': videosBasePath + 'frieren-trailer.mp4',
        'Saga of Tanya the Evil': crunchyrollVideosPath + 'tanya-the-evil.mp4'
    };
    const fallbackVideo = videosBasePath + 'frieren-trailer.mp4';

    // ============ INICIALIZACIÓN ============
    
    // Crea la lista de usuarios si no existe (localStorage)
    initializeUsers();

    if (!loginScreen) {
        header.style.display = 'flex';
        main.style.display = 'block';
        initializeAnimeModal();
        return;
    }

    // Muestra la pantalla de login al cargar la página
    showLoginScreen();

    // ============ EVENT LISTENERS ============
    // Evento: cuando el usuario hace clic en "Iniciar Sesión"
    // - Obtiene el usuario y contraseña ingresados
    // - Valida las credenciales usando validateLogin()
    // - Si son correctas, muestra el contenido principal
    // - Si son incorrectas, muestra el mensaje de error
    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (validateLogin(username, password)) {
            errorMessage.style.display = 'none';
            showMainContent();
        } else {
            errorMessage.style.display = 'block';
        }
    });

    // Hide login error on input
    // Cuando el usuario escribe en los campos de login, oculta el mensaje de error anterior
    usernameInput.addEventListener('input', () => errorMessage.style.display = 'none');
    passwordInput.addEventListener('input', () => errorMessage.style.display = 'none');

    // REGISTER FUNCTIONALITY
    // Evento: cuando el usuario hace clic en "Crear Cuenta"
    // - Obtiene los datos: usuario, contraseña y confirmación
    // - Valida los datos usando registerUser()
    // - Si es exitoso: limpia el formulario, muestra mensaje y vuelve al login
    // - Si hay error: muestra el mensaje de error específico
    registerBtn.addEventListener('click', function() {
        const username = newUsernameInput.value.trim();
        const password = newPasswordInput.value.trim();
        const passwordConfirm = newPasswordConfirmInput.value.trim();

        const result = registerUser(username, password, passwordConfirm);
        
        if (result.success) {
            registerErrorMessage.style.display = 'none';
            // Clear form
            newUsernameInput.value = '';
            newPasswordInput.value = '';
            newPasswordConfirmInput.value = '';
            // Show success message and go back to login
            alert('¡Cuenta creada exitosamente! Ahora inicia sesión.');
            showLoginForm();
        } else {
            registerErrorMessage.textContent = result.message;
            registerErrorMessage.style.display = 'block';
        }
    });

    // Hide register error on input
    // Cuando el usuario escribe en los campos de registro, oculta el mensaje de error anterior
    newUsernameInput.addEventListener('input', () => registerErrorMessage.style.display = 'none');
    newPasswordInput.addEventListener('input', () => registerErrorMessage.style.display = 'none');
    newPasswordConfirmInput.addEventListener('input', () => registerErrorMessage.style.display = 'none');

    // Toggle between login and register forms
    // Botón "Registrarse" en login: muestra el formulario de registro
    goToRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterForm();
    });

    // Botón "Iniciar Sesión" en registro: vuelve al formulario de login
    goToLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginForm();
    });

    initializeAnimeModal();

    // ============ FUNCIONES HELPER ============
    // Estas funciones realizan toda la lógica del sistema:
    // - Gestión de usuarios en localStorage
    // - Validación de credenciales
    // - Validación de registros
    // - Control de visibilidad de formularios

    /**
     * initializeUsers()
     * Inicializa el almacenamiento de usuarios en localStorage si no existe
     * Crea un objeto con el usuario por defecto 'apa' con contraseña 'apa'
     * Se ejecuta una sola vez cuando carga la página
     */
    function initializeUsers() {
        if (!localStorage.getItem('users')) {
            const defaultUsers = {
                'apa': 'apa'
            };
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    }

    /**
     * validateLogin(username, password)
     * Valida si las credenciales del usuario son correctas
     * @param {string} username - El nombre de usuario a validar
     * @param {string} password - La contraseña a validar
     * @return {boolean} - true si son válidas, false si no
     * Busca el usuario en localStorage y compara su contraseña
     */
    function validateLogin(username, password) {
        const users = JSON.parse(localStorage.getItem('users'));
        return users[username] === password;
    }

    /**
     * registerUser(username, password, passwordConfirm)
     * Registra un nuevo usuario en el sistema
     * @param {string} username - El nombre de usuario a registrar
     * @param {string} password - La contraseña del nuevo usuario
     * @param {string} passwordConfirm - Confirmación de la contraseña
     * @return {object} - Objeto con propiedades 'success' (boolean) y 'message' (string)
     * 
     * Realiza validaciones:
     * - Comprueba que todos los campos estén rellenos
     * - Usuario mínimo 3 caracteres
     * - Contraseña mínimo 4 caracteres
     * - Las contraseñas deben coincidir
     * - El usuario no debe existir ya
     * Si todo es válido, guarda el nuevo usuario en localStorage
     */
    function registerUser(username, password, passwordConfirm) {
        // Validate inputs
        if (!username || !password || !passwordConfirm) {
            return { success: false, message: 'Todos los campos son obligatorios' };
        }

        if (username.length < 3) {
            return { success: false, message: 'El usuario debe tener al menos 3 caracteres' };
        }

        if (password.length < 4) {
            return { success: false, message: 'La contraseña debe tener al menos 4 caracteres' };
        }

        if (password !== passwordConfirm) {
            return { success: false, message: 'Las contraseñas no coinciden' };
        }

        const users = JSON.parse(localStorage.getItem('users'));

        if (users[username]) {
            return { success: false, message: 'El usuario ya existe' };
        }

        // Add new user
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true, message: 'Usuario creado' };
    }

    /**
     * showLoginForm()
     * Muestra el formulario de login y oculta el de registro
     * Limpia los campos de entrada y oculta los mensajes de error
     */
    function showLoginForm() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        // Clear login form
        usernameInput.value = '';
        passwordInput.value = '';
        errorMessage.style.display = 'none';
    }

    /**
     * showRegisterForm()
     * Muestra el formulario de registro y oculta el de login
     * Limpia los campos de entrada y oculta los mensajes de error
     */
    function showRegisterForm() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        // Clear register form
        newUsernameInput.value = '';
        newPasswordInput.value = '';
        newPasswordConfirmInput.value = '';
        registerErrorMessage.style.display = 'none';
    }

    /**
     * showLoginScreen()
     * Muestra la pantalla de login completa
     * Oculta el header y el contenido principal
     * Muestra el formulario de login por defecto
     */
    function showLoginScreen() {
        loginScreen.style.display = 'flex';
        loginScreen.classList.remove('login-exit');
        header.style.display = 'none';
        main.style.display = 'none';
        header.classList.remove('site-enter', 'site-enter-active');
        main.classList.remove('site-enter', 'site-enter-active');
        showLoginForm();
    }

    /**
     * showMainContent()
     * Muestra el contenido principal de la página (header + main)
     * Oculta la pantalla de login
     * Se ejecuta cuando el usuario inicia sesión correctamente
     */
    function showMainContent() {
        header.style.display = 'flex';
        main.style.display = 'block';
        header.classList.add('site-enter');
        main.classList.add('site-enter');

        requestAnimationFrame(() => {
            loginScreen.classList.add('login-exit');
            header.classList.add('site-enter-active');
            main.classList.add('site-enter-active');
        });

        setTimeout(() => {
            loginScreen.style.display = 'none';
            header.classList.remove('site-enter', 'site-enter-active');
            main.classList.remove('site-enter', 'site-enter-active');
        }, 1000);
    }

    /**
     * initializeAnimeModal()
     * Prepara los clicks de banners y los eventos para cerrar la modal
     */
    function initializeAnimeModal() {
        bannerModules.forEach(function(banner) {
            banner.addEventListener('click', function() {
                openAnimeModal(banner);
            });
        });

        if (heroWatchBtn) {
            heroWatchBtn.addEventListener('click', function() {
                openHeroAnimeModal();
            });
        }

        if (heroDetailsBtn) {
            heroDetailsBtn.addEventListener('click', function() {
                focusHeroAnimeBanner();
            });
        }

        modalCloseBtn.addEventListener('click', closeAnimeModal);

        animeModal.addEventListener('click', function(e) {
            if (e.target === animeModal) {
                closeAnimeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && animeModal.classList.contains('modal-open')) {
                closeAnimeModal();
            }
        });

        modalVideo.addEventListener('error', function() {
            if (!modalVideo.dataset.usingFallback) {
                modalVideo.dataset.usingFallback = 'true';
                modalVideo.src = fallbackVideo;
                modalVideo.load();
                modalVideo.play();
            }
        });
    }

    /**
     * getHeroAnimeBanner()
     * Busca el banner que corresponde al anime destacado del hero
     */
    function getHeroAnimeBanner() {
        return Array.from(bannerModules).find(function(banner) {
            return banner.dataset.titulo === 'Tensura';
        });
    }

    /**
     * openHeroAnimeModal()
     * Abre la modal del anime destacado en el hero
     */
    function openHeroAnimeModal() {
        const heroBanner = getHeroAnimeBanner();

        if (heroBanner) {
            openAnimeModal(heroBanner);
        }
    }

    /**
     * focusHeroAnimeBanner()
     * Lleva al usuario hasta el banner destacado del hero
     */
    function focusHeroAnimeBanner() {
        const heroBanner = getHeroAnimeBanner();

        if (!heroBanner) {
            return;
        }

        heroBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        heroBanner.classList.add('banner-highlight');

        setTimeout(() => {
            heroBanner.classList.remove('banner-highlight');
        }, 1400);
    }

    /**
     * openAnimeModal(banner)
     * Rellena la modal con los data-* del banner elegido y la muestra
     */
    function openAnimeModal(banner) {
        const animeTitle = banner.dataset.titulo;

        modalTitle.textContent = animeTitle;
        modalDescription.textContent = banner.dataset.descripcion;
        modalDate.textContent = banner.dataset.fechaDeCreacion;
        modalGenre.textContent = banner.dataset.genero;
        modalRating.textContent = banner.dataset.clasificacion;
        modalEpisodes.textContent = banner.dataset.capitulos;
        modalVideo.dataset.usingFallback = '';
        modalVideo.src = animeVideos[animeTitle] || fallbackVideo;
        modalVideo.muted = true;
        modalVideo.load();

        animeModal.classList.add('modal-open');
        animeModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-is-open');

        requestAnimationFrame(() => {
            animeModal.classList.add('modal-visible');
            modalVideo.play();
        });
    }

    /**
     * closeAnimeModal()
     * Cierra la modal y pausa el video
     */
    function closeAnimeModal() {
        animeModal.classList.remove('modal-visible');
        animeModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-is-open');
        modalVideo.pause();
        modalVideo.currentTime = 0;

        setTimeout(() => {
            animeModal.classList.remove('modal-open');
        }, 300);
    }

    // ============ FIN DEL SISTEMA ============
    // El código de arriba espera eventos del usuario
    // Cuando el usuario inicia sesión correctamente, la página muestra el contenido principal
    // Cuando el usuario recarga, vuelve a aparecer la pantalla de login
});
