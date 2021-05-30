const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));
const clearLS = document.querySelector('.clear');

if(notes) {
    notes.forEach(note => addNewNote(note))
}


addBtn.addEventListener('click' , () => addNewNote('Welcome to NotesApp'));

function addNewNote( text = '')
{
    const note =document.createElement('div');
    note.classList.add('note');

    note.innerHTML = ` 
    <div class="tools">
    <button class="edit">
        <i class="fas fa-edit"></i>
    </button>
    <button class="delete">
        <i class="fas fa-trash-alt"></i>
    </button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class ="${text ? "hidden" :""}"></textarea>
    <div class="btm">
    <button class="save"><i class="fas fa-save"></i>  Save Changes</button></div>`;

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');
    const saveNote = note.querySelector('.save');

    textArea.value = text
    main.innerHTML = marked(text)


     deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
     });

     editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
     });

     textArea.addEventListener('input',(e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        
     })

     saveNote.addEventListener('click' , () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
        updateLS();
     });

    document.body.appendChild(note);
}


clearLS.addEventListener('click' , () => {
    localStorage.clear();
    window.location.reload();
});



function updateLS()
{
    const notesText = document.querySelectorAll('textArea');

    const notes = [];

    notesText.forEach(note  => notes.push(note.value));

    localStorage.setItem('notes', JSON.stringify(notes))
}