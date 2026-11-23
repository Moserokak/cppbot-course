const storageKey = 'cppbot-course-v1';
const totalTasks = tasks.length;
let state = {completed: [], drafts: {}};
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  state.completed = Array.isArray(saved.completed) ? saved.completed.filter((id) => Number.isInteger(id) && id >= 1 && id <= totalTasks) : [];
  state.drafts = saved.drafts && typeof saved.drafts === 'object' ? saved.drafts : {};
} catch (_) {}

let selectedModule = -1;
let selectedFilter = 'all';
let currentTask = null;
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

function saveState() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch (_) {}
}

function isDone(id) { return state.completed.includes(id); }

function setDone(id) {
  if (!isDone(id)) {
    state.completed.push(id);
    state.completed.sort((a, b) => a - b);
    saveState();
  }
  renderProgress();
  renderModules();
  renderTasks();
}

function renderProgress() {
  const count = state.completed.length;
  const percent = Math.round(count / totalTasks * 100);
  $('#headerCount').textContent = `${count} / ${totalTasks} выполнено`;
  $('#progressPercent').textContent = `${percent}%`;
  $('#progressCount').textContent = `${count} из ${totalTasks} заданий`;
  $('#progressFill').style.width = `${percent}%`;
  $('.progress-track').setAttribute('aria-valuenow', String(count));
  const message = count === 0 ? 'Первое задание уже ждёт тебя.' : count === totalTasks ? 'Миссия выполнена! Ты прошёл все 36 заданий.' : count >= 18 ? 'Ты прошёл больше половины маршрута!' : count >= 6 ? 'Отличный темп. Продолжай!' : 'Хорошее начало. Ещё немного практики!';
  $('#progressMessage').textContent = message;
  $('#progressStart').textContent = count === totalTasks ? 'Повторить задания' : count === 0 ? 'Начать первое задание' : `Продолжить: задание ${tasks.find((task) => !isDone(task.id)).id}`;
  $('#robotMessage').textContent = count === 0 ? 'Привет! Начнём с простого.' : count === totalTasks ? 'Ты сделал это! 36 из 36!' : count >= 18 ? 'Половина пути позади!' : 'Отлично! Продолжаем?';
}

function renderModules() {
  $('#moduleGrid').innerHTML = modules.map((module, index) => {
    const count = module.tasks.filter((_, taskIndex) => isDone(index * 6 + taskIndex + 1)).length;
    return `<button class="module-card ${selectedModule === index ? 'is-selected' : ''}" type="button" data-module="${index}" aria-label="Тема ${index + 1}: ${escapeHtml(module.title)}, выполнено ${count} из 6"><span class="module-card-top"><span class="module-icon ${module.color}" aria-hidden="true">${escapeHtml(module.icon)}</span><span class="module-status">${count} / 6 готово</span></span><h3>${escapeHtml(module.title)}</h3><p>${escapeHtml(module.description)}</p><span class="module-card-meter"><span style="width:${Math.round(count / 6 * 100)}%"></span></span></button>`;
  }).join('');
  $('#moduleFilter').innerHTML = `<button type="button" data-module="-1" class="${selectedModule === -1 ? 'is-active' : ''}" aria-pressed="${selectedModule === -1}">Все темы</button>` + modules.map((module, index) => `<button type="button" data-module="${index}" class="${selectedModule === index ? 'is-active' : ''}" aria-pressed="${selectedModule === index}">${String(index + 1).padStart(2, '0')} · ${escapeHtml(module.title)}</button>`).join('');
}

function renderLesson() {
  const index = selectedModule < 0 ? Math.min(Math.floor(((tasks.find((task) => !isDone(task.id))?.id || 36) - 1) / 6), 5) : selectedModule;
  const module = modules[index];
  $('#lessonPanel').innerHTML = `<div><div class="mini-label">МИНИ-УРОК · ТЕМА ${index + 1}</div><h3>${escapeHtml(module.title)}</h3><p>${escapeHtml(module.lesson)}</p></div><pre><code>${escapeHtml(module.example)}</code></pre>`;
}

function renderTasks() {
  const visible = tasks.filter((task) => (selectedModule === -1 || task.moduleIndex === selectedModule) && (selectedFilter === 'all' || (selectedFilter === 'todo' ? !isDone(task.id) : task.type === selectedFilter)));
  $('#taskList').innerHTML = visible.map((task) => `<button class="task-card ${isDone(task.id) ? 'is-done' : ''}" type="button" data-task="${task.id}" aria-label="Задание ${task.id}: ${escapeHtml(task.title)}${isDone(task.id) ? ', выполнено' : ''}"><span class="task-card-number">${isDone(task.id) ? '✓' : String(task.id).padStart(2, '0')}</span><span class="task-card-body"><strong>${escapeHtml(task.title)}</strong><small>${escapeHtml(modules[task.moduleIndex].title)} · ${task.type === 'quiz' ? 'быстрый вопрос' : 'пишем код'}</small></span><span class="task-card-type">${isDone(task.id) ? 'ГОТОВО' : task.type === 'quiz' ? 'ВОПРОС' : 'КОД'}</span></button>`).join('');
  $('#emptyState').hidden = visible.length > 0;
  renderLesson();
}

function feedback(text, kind = '') {
  const target = $('#dialogFeedback');
  target.textContent = text;
  target.className = `dialog-feedback ${kind}`;
}

function openTask(id) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;
  currentTask = task;
  const module = modules[task.moduleIndex];
  $('#dialogNumber').textContent = `ЗАДАНИЕ ${String(task.id).padStart(2, '0')} / 36`;
  $('#dialogType').textContent = task.type === 'quiz' ? 'Быстрый вопрос' : 'Пишем C++ код';
  $('#dialogTitle').textContent = task.title;
  $('#dialogTopic').textContent = `Тема ${task.moduleIndex + 1}: ${module.title}`;
  $('#dialogLesson').textContent = module.lesson;
  $('#dialogExample').textContent = module.example;
  $('#dialogPrompt').textContent = task.prompt;
  $('#dialogSample').textContent = task.sample ? `Пример:\n${task.sample}` : '';
  $('#quizArea').hidden = task.type !== 'quiz';
  $('#codeArea').hidden = task.type !== 'code';
  $('#checkTask').hidden = task.type !== 'quiz';
  $('#completeTask').hidden = task.type !== 'code';
  $('#hintButton').textContent = 'Показать подсказку';
  $('#hintText').hidden = true;
  $('#hintText').textContent = task.type === 'quiz' ? task.explanation : task.hint;
  $('#solutionButton').hidden = task.type !== 'code';
  $('#solutionButton').textContent = 'Показать образец решения';
  $('#solutionBox').hidden = true;
  $('#solutionCode').textContent = task.solution || '';
  $('#selfCheck').checked = false;
  $('#prevTask').disabled = task.id === 1;
  $('#nextTask').disabled = task.id === totalTasks;
  feedback(isDone(task.id) ? 'Это задание уже выполнено. Можешь повторить его ещё раз.' : '');
  if (task.type === 'quiz') {
    const order = task.options.map((_, index) => index);
    order.push(...order.splice(0, task.id % order.length));
    $('#quizArea').innerHTML = order.map((index) => `<label class="quiz-option"><input type="radio" name="quizAnswer" value="${index}" /><span>${escapeHtml(task.options[index])}</span></label>`).join('');
  } else {
    $('#codeEditor').value = typeof state.drafts[task.id] === 'string' ? state.drafts[task.id] : task.starter;
  }
  if (!$('#taskDialog').open) $('#taskDialog').showModal();
  $('.dialog-shell').scrollTop = 0;
}

$('#moduleGrid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-module]');
  if (!button) return;
  selectedModule = Number(button.dataset.module);
  selectedFilter = 'all';
  document.querySelectorAll('.filter-button').forEach((item) => { item.classList.toggle('is-active', item.dataset.filter === 'all'); item.setAttribute('aria-pressed', String(item.dataset.filter === 'all')); });
  renderModules(); renderTasks();
  $('#workspace').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
});
$('#moduleFilter').addEventListener('click', (event) => { const button = event.target.closest('[data-module]'); if (!button) return; selectedModule = Number(button.dataset.module); renderModules(); renderTasks(); });
document.querySelectorAll('.filter-button').forEach((button) => button.addEventListener('click', () => { selectedFilter = button.dataset.filter; document.querySelectorAll('.filter-button').forEach((item) => { item.classList.toggle('is-active', item === button); item.setAttribute('aria-pressed', String(item === button)); }); renderTasks(); }));
$('#taskList').addEventListener('click', (event) => { const button = event.target.closest('[data-task]'); if (button) openTask(Number(button.dataset.task)); });
$('#dialogClose').addEventListener('click', () => $('#taskDialog').close());
function startCourse() { openTask(tasks.find((task) => !isDone(task.id))?.id || 1); }
$('#heroStart').addEventListener('click', startCourse);
$('#progressStart').addEventListener('click', startCourse);
$('#prevTask').addEventListener('click', () => openTask(currentTask.id - 1));
$('#nextTask').addEventListener('click', () => openTask(currentTask.id + 1));
$('#hintButton').addEventListener('click', () => { const target = $('#hintText'); target.hidden = !target.hidden; $('#hintButton').textContent = target.hidden ? 'Показать подсказку' : 'Скрыть подсказку'; });
$('#solutionButton').addEventListener('click', () => { const target = $('#solutionBox'); target.hidden = !target.hidden; $('#solutionButton').textContent = target.hidden ? 'Показать образец решения' : 'Скрыть образец'; });
$('#codeEditor').addEventListener('input', () => { if (!currentTask || currentTask.type !== 'code') return; state.drafts[currentTask.id] = $('#codeEditor').value; saveState(); });
$('#quizArea').addEventListener('change', () => {
  $('#quizArea').querySelectorAll('.quiz-option').forEach((option) => option.classList.remove('is-correct', 'is-incorrect'));
  feedback('');
});
$('#checkTask').addEventListener('click', () => {
  if (!currentTask || currentTask.type !== 'quiz') return;
  const selected = $('#quizArea input:checked');
  if (!selected) { feedback('Выбери один из вариантов ответа.', 'error'); return; }
  const selectedOption = selected.closest('.quiz-option');
  $('#quizArea').querySelectorAll('.quiz-option').forEach((option) => option.classList.remove('is-correct', 'is-incorrect'));
  if (Number(selected.value) !== currentTask.answer) {
    selectedOption.classList.add('is-incorrect');
    feedback('Пока неверно. Прочитай мини-урок или открой подсказку и попробуй ещё.', 'error');
    return;
  }
  selectedOption.classList.add('is-correct');
  setDone(currentTask.id);
  feedback(`Верно! ${currentTask.explanation}`, 'success');
});
$('#completeTask').addEventListener('click', () => {
  if (!currentTask || currentTask.type !== 'code') return;
  if ($('#codeEditor').value.trim() === currentTask.starter.trim()) { feedback('Сначала допиши своё решение в редакторе.', 'error'); return; }
  if (!$('#selfCheck').checked) { feedback('Проверь код в компиляторе или по образцу и поставь отметку.', 'error'); return; }
  setDone(currentTask.id);
  feedback('Отлично! Задание отмечено выполненным. Можно идти дальше.', 'success');
});

$('#year').textContent = new Date().getFullYear();
renderProgress(); renderModules(); renderTasks();
