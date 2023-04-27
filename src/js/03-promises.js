


import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayEle = document.querySelector('input[name="delay"]');
const stepEle = document.querySelector('input[name="step"]');
const amountEle = document.querySelector('input[name="amount"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {

      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);

  });
}


form.addEventListener('submit', () => {
  event.preventDefault();

  let delay = Number(delayEle.value);
  let step = Number(stepEle.value);
  let amount = Number(amountEle.value);
  let position = 0;

  if (delay < 0 || step < 0 || amount <= 0) {

    Notiflix.Notify.failure(`porfavor escriba el valor correcto`);

  }

  for (let i = 1; i <= amount; i += 1) {
    position = i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Promesa cumplida ${position} en ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Promesa rechazada ${position} en ${delay}ms`);
      });
    delay += step;
  }
  form.reset();
});
