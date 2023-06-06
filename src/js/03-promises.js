import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onButtonSubmit);

function onButtonSubmit(e) {
  e.preventDefault();
  createPromises(
    Number(refs.form.elements.delay.value),
    Number(refs.form.elements.step.value)
  );
}

function createPromises(delay, step) {
  for (let i = 1; i <= Number(refs.form.elements.amount.value); i += 1) {
    delay += i === 1 ? 0 : step;
    createPromise(i, delay).then(onSuccess).catch(onError);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
