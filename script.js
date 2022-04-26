// Używamy let, a nie const, żeby zmienne stworzyć globalnie i móc przypisać do nich wartość w innej funkcji / mieć do nich dostęp w całym kodzie

let todoInput // Miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo // Info o braku zadań/ konieczności wpisania tekstu
let addBtn // Przycisk ADD — dodaje nowe elementy do listy
let ulList // Lista zadań, tagi UL
let taskToEdit // zadanie do edycji

    // Popups
let popup // popup
let popupInfo // tekst w popupie, który wyskoczy jak się doda pusty tekst
let popupInput // input w popupie
let popupAcceptBtn // przycisk "zatwierdź" w popupie
let popupCloseBtn // przycisk "anuluj" w popupie

// FUNKCJE
// Wywołuje inne funkcje
const main = () => {
    prepareDomElements()
    prepareDomEvents()
    getFromLocalStorage()
}
// Pobieramy wszystkie elementy
const prepareDomElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todo-ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAcceptBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

// Tworzymy nowe zadanie
const addNewTask = () => {
    if (todoInput.value !== '') {

        const newTaskLi = document.createElement('li')
        // Zmienne i paragrafy mają textContent, a inputy mają value
        newTaskLi.textContent = todoInput.value
        // Wywołujemy funkcję tworzącą 'panel narzędziowy'.
        createToolsArea(newTaskLi)
        // Gotowe zadanie dodajemy do listy
        ulList.append(newTaskLi)
        // Czyścimy input area
        clearData()
    } else {
       errorInfo.textContent = 'Wpisz treść zadania.'
    }
}
// Zatwierdzanie przez Enter
const enterAdd = e => {
    if(e.key === 'Enter') {
        addNewTask()
    }
}

// Tworzymy pasek zadania z 'narzędziami'
const createToolsArea = (newTask) => {
    const toolDiv = document.createElement('div')
    toolDiv.classList.add('tools')
    newTask.append(toolDiv)

    const completeBtn = document.createElement('button')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    completeBtn.classList.add('complete')
    editBtn.classList.add('edit')
    deleteBtn.classList.add('delete')

    completeBtn.innerHTML = '<i class="fas fa-check"></i>'
    editBtn.textContent = 'EDIT'
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolDiv.append(completeBtn, editBtn, deleteBtn)
}
// Wykrywamy, który przycisk został kliknięty (e.target wskazuje na to, na co kliknęliśmy)
const checkClick = e => {
    //Wykorzystujemy metodę matches — jako parametr podajemy klasę
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
} else if (e.target.matches('.edit')) {
        editTarget(e)
} else if (e.target.matches('.delete')) {
        deleteTask(e)
    }
}
// Usuwamy zadanie
const deleteTask = e => {
    e.target.closest('li').remove()
    const allTasks = document.querySelectorAll('li')
    if (allTasks.length === 0) {
        errorInfo.textContent = 'Hurray! Nie masz żadnych zadań do wykonania  🏖'
    }
}

// Funkcja, która będzie otwierała popup
const editTarget = e => {
    taskToEdit = e.target.closest('li')
    popupInput.value = taskToEdit.firstChild.textContent
    popup.style.display = 'flex'
   // popupInfo.textContent = 'Podaj nową treść zadania.'
}

const acceptChanges = () => {
    if (popupInput.value !== '') {
        taskToEdit.firstChild.textContent = popupInput.value
        closePopup()
    } else {
        popupInfo.textContent = 'Nie odchodź bez zostawienia jakiegoś znaku ✍️️'
    }
}
// Zamykamy popup
const closePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

// Nadajemy nasłuchiwanie
const prepareDomEvents = () => {
    addBtn.addEventListener('click', addNewTask)
    todoInput.addEventListener('keyup', enterAdd)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAcceptBtn.addEventListener('click', acceptChanges)
    popupInput.addEventListener('change', acceptChanges)
}
const clearData = () => {
     todoInput.value = ''
    errorInfo.textContent = ''
}
// Event DOMContentLoaded odpowiada za wczytanie strony; takie zabezpieczenie, bo nasze skrypty nie uruchomią się, dopóki cała str. nie zostanie wczytana. Funkcje prepareDOMElements i prepareDOMEvents są wywoływane przez funkcję main, a funkcja main odpalana jest dopiero wtedy, kiedy cały kod nam się wczyta.
document.addEventListener('DOMContentLoaded', main)


//@TODO -> localStorage
