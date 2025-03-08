// HTML структура
<div class="parallax-container">
  <div class="parallax-layer bg-layer" data-rellax-speed="-2"></div>
  <div class="parallax-layer middle-layer" data-rellax-speed="-4"></div>
  <div class="parallax-layer foreground-layer" data-rellax-speed="-6"></div>
</div>

// CSS для слоев
.parallax-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.parallax-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.bg-layer {
  background-image: url('assets/background.jpg');
  z-index: 1;
}

.middle-layer {
  background-image: url('assets/middle-layer.png');
  z-index: 2;
}

.foreground-layer {
  background-image: url('assets/foreground.png');
  z-index: 3;
}

// Инициализация Rellax.js
document.addEventListener('DOMContentLoaded', function() {
  var rellax = new Rellax('.parallax-layer');
});
