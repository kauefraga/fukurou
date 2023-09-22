const clock = document.getElementById('clock');
const hello = document.getElementById('hello');

function renderHello() {
  const date = new Date();
  const hours = date.getHours();

  if (hours <= 12) {
    hello.innerText = 'Bom dia.';
  }

  if (hours > 12 && hours <= 18) {
    hello.innerText = 'Boa tarde.';
  }

  if (hours > 18) {
    hello.innerText = 'Boa noite.';
  }
}

function renderHoursAndMinutes() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  clock.innerText = `${hours}:${minutes}`;
}

renderHoursAndMinutes();
renderHello();

setInterval(() => {
  renderHoursAndMinutes();
}, 1000 * 60); // 1000ms (1s) * 60 = 1min (60s)

setInterval(() => {
  renderHello();
}, 1000 * 60 * 60 * 6); // 1000ms (1s) * 60 * 60 * 6 = 6h (60min)
