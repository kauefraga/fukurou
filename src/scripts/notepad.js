/* Duplicated code (set note values)
  line 19: if (!json)
  line 30: return {}
  line 42: at function renderNote
  line 76: at click event listener (deleteButton)
*/

function prettifyDate(date) {
  const rawDate = new Date(date);

  const day = rawDate.getDate().toString().padStart(2, '0');
  const month = (rawDate.getMonth() + 1).toString().padStart(2, '0');
  const year = rawDate.getFullYear();

  return `${day}/${month}/${year}`;
}

function loadNote(id) {
  const json = localStorage.getItem(id);

  if (!json) {
    return {
      title: '',
      text: '',
      createdAt: new Date(),
    }
  }

  const data = JSON.parse(json);

  return {
    title: data.title,
    text: data.text,
    createdAt: data.createdAt,
  };
}

function renderNote(note) {
  const title = document.getElementById('title');          // título da nota
  const text = document.getElementById('text');            // conteúdo da nota
  const createdAt = document.getElementById('created-at'); // data de criação

  title.value = note.title;
  text.value = note.text;
  createdAt.innerText = prettifyDate(note.createdAt);
}

renderNote(loadNote(1));

const saveButton = document.getElementById('save');

// Stores note in the local storage
saveButton.addEventListener('click', (event) => {
  localStorage.setItem(1, JSON.stringify({
    title: title.value,
    text: text.value,
    createdAt: new Date(),
  }));

  saveButton.innerText = 'Salvo!';
  saveButton.style.color = 'red';

  setTimeout(() => {
    saveButton.removeAttribute('style');
    saveButton.innerText = 'Salvar';
  }, 1000 * 5);
});


const deleteButton = document.getElementById('delete');

deleteButton.addEventListener('click', (event) => {
  const title = document.getElementById('title');
  const text = document.getElementById('text');
  const createdAt = document.getElementById('created-at');

  title.value = '';
  text.value = '';
  createdAt.innerText = prettifyDate(new Date());

  localStorage.removeItem(1);

  deleteButton.innerText = 'Apagado!';
  deleteButton.style.color = 'red';

  setTimeout(() => {
    deleteButton.removeAttribute('style');
    deleteButton.innerText = 'Apagar';
  }, 1000 * 5);
});

const downloadButton = document.getElementById('download');

function download(data, filename, type) {
  const file = new Blob(
    [data],
    { type: type },
  );

  if (window.navigator.msSaveOrOpenBlob) { // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else { // Others
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

downloadButton.addEventListener('click', (event) => {
  const title = document.getElementById('title');
  const text = document.getElementById('text');
  const createdAt = document.getElementById('created-at');

  if (!title.value || !text.value) {
    alert('Escreva um título e/ou um texto para fazer o download.');
    return;
  }

  const formattedText = `${title.value} (${createdAt.innerText})\n\n${text.value}`;

  download(formattedText, 'note.txt', 'text/plain');
});
