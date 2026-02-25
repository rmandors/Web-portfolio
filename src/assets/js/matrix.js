// Matrix Rain Effect

   const canvas = document.getElementById('matrix-canvas');
   const ctx    = canvas.getContext('2d');
   
   const CHARS =
     'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789#*=+-<>[]{}';
   
   let W, H, cols, drops;
   
   function resize() {
     W     = canvas.width  = window.innerWidth;
     H     = canvas.height = window.innerHeight;
     cols  = Math.floor(W / 18);
     drops = Array(cols).fill(1).map(() => Math.random() * -50);
   }
   
   function drawMatrix() {
     ctx.fillStyle = 'rgba(6,12,6,0.06)';
     ctx.fillRect(0, 0, W, H);
   
     for (let i = 0; i < cols; i++) {
       const brightness =
         Math.random() > 0.96 ? 255 :
         Math.random() > 0.5  ? 180 : 100;
   
       ctx.fillStyle = `rgb(0,${brightness},${Math.floor(brightness * 0.25)})`;
       ctx.font      = `${13 + Math.floor(Math.random() * 5)}px monospace`;
   
       const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
       ctx.fillText(ch, i * 18, drops[i] * 18);
   
       if (drops[i] * 18 > H && Math.random() > 0.975) drops[i] = 0;
       drops[i] += 0.5 + Math.random() * 0.5;
     }
   }
   
   resize();
   window.addEventListener('resize', resize);
   setInterval(drawMatrix, 45);