const counters = document.querySelectorAll('.count');
let started = false;

window.addEventListener('scroll', () => {
  const section = document.querySelector('.stats-section');
  const sectionTop = section.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight && !started) {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        let count = +counter.innerText.replace('%','');
        const increment = target / 150;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          if (counter.dataset.target == "87") {
            counter.innerText = target + "%";
          } else {
            counter.innerText = target;
          }
        }
      };
      updateCount();
    });

    started = true;
  }
});
