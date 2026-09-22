// EFECTO DE GLITTER E BRILHO CAINDO NO CANVAS
const canvas = document.getElementById('glitterCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 70;

// Ajusta o tamanho do canvas para a tela
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Cores do Glitter (Neon e Azul Bebê)
const colors = ['#ff007f', '#39ff14', '#ccff00', '#89cff0', '#ffffff'];

// Classe de Partícula de Glitter
class GlitterParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = Math.random();
    this.fade = Math.random() * 0.02 + 0.005;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    // Efeito de piscar (glitter)
    this.opacity += this.fade;
    if (this.opacity > 1 || this.opacity < 0) {
      this.fade = -this.fade;
    }

    // Se sair da tela, reseta no topo
    if (this.y > canvas.height) {
      this.reset();
      this.y = 0;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.abs(this.opacity);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Inicializa as partículas
for (let i = 0; i < particleCount; i++) {
  particles.push(new GlitterParticle());
}

// Loop de animação
function animateGlitter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateGlitter);
}

animateGlitter();

// Função interativa ao clicar no botão
function celebrar() {
  // Adiciona temporariamente mais glitter intenso
  for (let i = 0; i < 30; i++) {
    particles.push(new GlitterParticle());
  }
  
  alert("✨ As andorinhas voltaram trazendo todas as cores do orgulho! ✨");
}
