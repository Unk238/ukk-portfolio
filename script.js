// Handle current year in footer automatically.
const yearElement = document.getElementById("year");
yearElement.textContent = new Date().getFullYear();

// Mobile menu toggle.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after selecting a nav link for better UX.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Scroll reveal animation for sections/cards.
const revealElements = document.querySelectorAll(".reveal, .card");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Skills progress animation when the skills section enters viewport.
const skillCards = document.querySelectorAll(".skill-card");
const skillsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const level = entry.target.dataset.level;
      const bar = entry.target.querySelector(".skill-bar");
      bar.style.width = `${level}%`;

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.45,
  }
);

skillCards.forEach((card) => skillsObserver.observe(card));

// Scroll progress indicator
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  // Active section highlight
  document.querySelectorAll('.nav-links a').forEach((link) => link.classList.remove('active'));
  const sections = document.querySelectorAll('main section[id]');
  let currentId = 'top';
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.32 && rect.bottom >= window.innerHeight * 0.32) {
      currentId = section.id;
    }
  });
  const activeLink = document.querySelector(`.nav-links a[href="#${currentId}"]`);
  if (activeLink) activeLink.classList.add('active');
});

// Smooth scrolling for anchored nav
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Login modal functionality
const loginOpenBtn = document.getElementById('loginOpenBtn');
const loginModal = document.getElementById('loginModal');
const loginCloseBtn = document.getElementById('loginCloseBtn');
const loginForm = document.getElementById('loginForm');
const loginFeedback = document.getElementById('loginFeedback');

const hardcodedUser = 'user123';
const hardcodedPass = 'pass123';

const closeLoginModal = () => {
  loginModal.classList.remove('active');
  loginModal.setAttribute('aria-hidden', 'true');
  loginFeedback.textContent = '';
  loginForm.reset();
};

loginOpenBtn.addEventListener('click', () => {
  loginModal.classList.add('active');
  loginModal.setAttribute('aria-hidden', 'false');
  document.getElementById('loginUser').focus();
});

loginCloseBtn.addEventListener('click', closeLoginModal);
loginModal.addEventListener('click', (event) => {
  if (event.target === loginModal) closeLoginModal();
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (username === hardcodedUser && password === hardcodedPass) {
    loginFeedback.textContent = 'Login successful!';
    loginFeedback.classList.remove('error');
    loginFeedback.classList.add('success');
    setTimeout(closeLoginModal, 1000);
  } else {
    loginFeedback.textContent = 'Invalid credentials. Try user123 / pass123';
    loginFeedback.classList.remove('success');
    loginFeedback.classList.add('error');
  }
});

// Chatbot widget (dummy responses)
const chatToggle = document.getElementById('chatToggle');
const chatBox = document.getElementById('chatBox');
const chatClose = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');
const chatMessages = document.getElementById('chatMessages');

const toggleChat = () => {
  const isOpen = chatBox.classList.contains('active');

  if (isOpen) {
    chatBox.classList.remove('active');
    chatBox.setAttribute('aria-hidden', 'true');
    chatToggle.setAttribute('aria-expanded', 'false');
  } else {
    chatBox.classList.add('active');
    chatBox.setAttribute('aria-hidden', 'false');
    chatToggle.setAttribute('aria-expanded', 'true');

    if (chatMessages.children.length === 0) {
      addChatBubble('Hi! I am your portfolio AI helper. Ask me about your projects, skills, or website features.');
    }
  }
};

chatToggle.addEventListener('click', toggleChat);
chatClose.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleChat();
});

const addChatBubble = (text, isUser = false) => {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${isUser ? 'user' : 'bot'}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const messageInput = document.getElementById('chatInput');
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  addChatBubble(userMessage, true);
  messageInput.value = '';

  setTimeout(() => {
    const lower = userMessage.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) {
      addChatBubble('Hello! How can I help you today?');
    } else if (lower.includes('project')) {
      addChatBubble('Your portfolio has a Personal Portfolio Website and Basic Frontend Practice Project with dark-themed styling and smooth animations.');
    } else if (lower.includes('skills')) {
      addChatBubble('You showcase HTML, CSS, JavaScript, Git, Node.js (basic), and responsive design with animated progress bars.');
    } else if (lower.includes('about') || lower.includes('you') || lower.includes('portfolio')) {
      addChatBubble('This site is a modern dark portfolio with navbar, hero section, about, skills, projects, contact, animations and interactive widgets.');
    } else {
      addChatBubble('Great question! I can describe the site, your projects, or your skills—just ask about any section.');
    }
  }, 600);
});

// Contact form frontend handling
const contactForm = document.getElementById('contactForm');
const contactFeedback = document.getElementById('contactFeedback');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !message) {
    contactFeedback.textContent = 'Please complete all fields.';
    contactFeedback.classList.remove('success');
    contactFeedback.classList.add('error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const res = await fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (res.ok) {
      submitBtn.textContent = 'Your message was sent successfully!';
      submitBtn.classList.add('btn-success');
      contactFeedback.textContent = '';
      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.classList.remove('btn-success');
        submitBtn.disabled = false;
      }, 3000);
    } else {
      contactFeedback.textContent = data.message;
      contactFeedback.classList.remove('success');
      contactFeedback.classList.add('error');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  } catch (err) {
    contactFeedback.textContent = "Error sending message. Please try again.";
    contactFeedback.classList.remove('success');
    contactFeedback.classList.add('error');
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});

// Animated custom cursor behavior
const cursorOuter = document.getElementById('cursorOuter');
const cursorInner = document.getElementById('cursorInner');

window.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  cursorOuter.style.left = `${x}px`;
  cursorOuter.style.top = `${y}px`;
  cursorInner.style.left = `${x}px`;
  cursorInner.style.top = `${y}px`;
});

const interactiveElems = document.querySelectorAll('a, button, .project-card');
interactiveElems.forEach((elem) => {
  elem.addEventListener('mouseenter', () => {
    cursorOuter.style.transform = 'translate(-50%, -50%) scale(1.8)';
    cursorInner.style.transform = 'translate(-50%, -50%) scale(1.2)';
  });
  elem.addEventListener('mouseleave', () => {
    cursorOuter.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorInner.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});