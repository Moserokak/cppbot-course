const storageKey = 'cppbot-course-v1';
const languageKey = 'cppbot-language';
const themeKey = 'cppbot-theme';
const totalTasks = tasks.length;
let state = {completed: [], drafts: {}};
let accountClient = null;
let accountUser = null;
let accountMode = 'signin';
let cloudTimer = null;
let loadingUserId = null;
let loadingUserPromise = null;
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  state.completed = Array.isArray(saved.completed) ? saved.completed.filter(id => Number.isInteger(id) && id >= 1 && id <= totalTasks) : [];
  state.drafts = saved.drafts && typeof saved.drafts === 'object' ? saved.drafts : {};
} catch (_) {}
let language = localStorage.getItem(languageKey) === 'en' ? 'en' : 'ru';
let theme = localStorage.getItem(themeKey) === 'dark' ? 'dark' : 'light';
let selectedModule = -1;
let selectedFilter = 'all';
let currentTask = null;
const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const ui = {
  ru: {
    skip:'Перейти к заданиям',nav:'Основная навигация',navTopics:'Темы',navTasks:'Задания',navHow:'Как учиться',language:'Язык сайта',darkTheme:'Включить тёмную тему',lightTheme:'Включить светлую тему',
    accountKicker:'ЛИЧНЫЙ ПРОГРЕСС',accountTitle:'Учись с любого устройства',accountLead:'Создай аккаунт, чтобы задания и черновики сохранялись между устройствами.',accountTabs:'Вход или регистрация',signIn:'Войти',signUp:'Регистрация',email:'Электронная почта',password:'Пароль',accountNote:'После регистрации может понадобиться подтвердить почту.',accountReady:'Прогресс сохранён',accountSync:'Задания и черновики синхронизируются с аккаунтом.',signOut:'Выйти',accountWait:'Проверяем аккаунт…',checkEmail:'Проверь почту и перейди по ссылке подтверждения, затем войди.',authError:'Не удалось войти. Проверь почту и пароль.',signupError:'Не удалось создать аккаунт. Проверь данные и попробуй ещё.',syncError:'Не удалось сохранить прогресс в аккаунте. Проверь интернет и попробуй ещё.',
    heroKicker:'ТВОЙ СПОКОЙНЫЙ СТАРТ В C++',heroTitle:'Учиться программировать проще, когда есть план.',
    heroLead:'36 небольших заданий, 6 понятных тем и робот, который подскажет, если застрянешь. Проходи в удобном темпе.',
    start:'Начать обучение',viewTopics:'Посмотреть темы',point1:'✓ Короткие объяснения',point2:'✓ Мгновенная проверка вопросов',point3:'✓ Прогресс сохранится',robotAlt:'Робот помощник C++ Bot',
    progressLabel:'Твой прогресс',progressTitle:'Твой прогресс',progressBar:'Пройденные задания',
    roadKicker:'МАРШРУТ',roadTitle:'Шесть тем. Шаг за шагом.',roadLead:'Начни с первых строк и постепенно дойди до массивов и функций.',
    practiceKicker:'ПРАКТИКА',practiceTitle:'Выбери задание',practiceLead:'Можно идти по порядку или выбрать интересную тему. Вернись к заданию в любой момент.',
    topicHeading:'Темы курса',topicsTip:'Совет: прочитай мини-урок перед первым заданием каждой темы.',taskHeading:'Задания',typeHeading:'Тип заданий',all:'Все',questions:'Вопросы',code:'Код',todo:'Остались',empty:'Здесь пока нет заданий. Выбери другой фильтр.',
    howKicker:'КАК ЭТО РАБОТАЕТ',howTitle:'Маленькие шаги дают результат.',step1Title:'Прочитай',step1Text:'К каждой теме есть короткий урок и пример C++.',step2Title:'Попробуй',step2Text:'Ответь на вопрос или напиши код. Подсказка рядом.',step3Title:'Проверь',step3Text:'Вопросы сайт проверит сразу. Код запусти в своём компиляторе или сравни с образцом.',
    footer:'Учись в своём темпе. Возвращайся когда удобно.',close:'Закрыть задание',miniLesson:'МИНИ-УРОК',yourTask:'ТВОЯ ЗАДАЧА',yourCode:'Твой C++ код',
    codeNote:'Черновик сохраняется в браузере. Сайт не запускает C++: проверь код в компиляторе или сравни с образцом.',selfCheck:'Я проверил решение в компиляторе или сверил с образцом',
    first:'Начать первое задание',continue:n=>`Продолжить: задание ${n}`,repeat:'Повторить задания',doneCount:n=>`${n} из 36 заданий`,
    progress0:'Первое задание уже ждёт.',progressAll:'Миссия выполнена! Все 36 заданий пройдены.',progressHalf:'Ты прошёл больше половины маршрута!',progress6:'Отличный темп. Продолжай!',progressSome:'Хорошее начало. Продолжай!',
    robot0:'Начнём вместе!',robotAll:'Все 36 сделаны!',robotHalf:'Уже половина пути!',robotSome:'Отлично идёшь!',
    module:n=>`Тема ${n}`,ready:n=>`${n} / 6 готово`,done:'ГОТОВО',question:'ВОПРОС',codeBadge:'КОД',questionLong:'Быстрый вопрос',codeLong:'Пишем C++ код',miniTopic:n=>`МИНИ-УРОК · ТЕМА ${n}`,task:n=>`ЗАДАНИЕ ${String(n).padStart(2,'0')} / 36`,sample:'Пример:',hintShow:'Показать подсказку',hintHide:'Скрыть подсказку',solutionShow:'Показать образец решения',solutionHide:'Скрыть образец решения',previous:'Предыдущее',next:'Следующее',check:'Проверить ответ',complete:'Отметить выполненным',
    already:'Это задание уже выполнено. Можешь повторить его.',pick:'Выбери один из вариантов ответа.',wrong:'Пока неверно. Прочитай мини-урок или подсказку и попробуй ещё.',correct:x=>`Верно! ${x}`,write:'Сначала допиши своё решение в редакторе.',verify:'Проверь код в компиляторе или по образцу и поставь отметку.',completed:'Отлично! Задание выполнено. Можно идти дальше.'
  },
  en: {
    skip:'Skip to exercises',nav:'Main navigation',navTopics:'Topics',navTasks:'Exercises',navHow:'How it works',language:'Website language',darkTheme:'Switch to dark theme',lightTheme:'Switch to light theme',
    accountKicker:'PERSONAL PROGRESS',accountTitle:'Learn on any device',accountLead:'Create an account to keep your exercises and drafts in sync across devices.',accountTabs:'Sign in or create an account',signIn:'Sign in',signUp:'Create account',email:'Email address',password:'Password',accountNote:'You may need to confirm your email after signing up.',accountReady:'Progress saved',accountSync:'Exercises and drafts sync with your account.',signOut:'Sign out',accountWait:'Checking your account…',checkEmail:'Check your email and follow the confirmation link, then sign in.',authError:'Could not sign in. Check your email and password.',signupError:'Could not create an account. Check your details and try again.',syncError:'Could not sync progress. Check your connection and try again.',
    heroKicker:'A CALM START WITH C++',heroTitle:'Learning to code feels easier with a clear path.',
    heroLead:'36 bite-sized exercises, 6 friendly topics and a robot to help when you get stuck. Learn at your own pace.',
    start:'Start learning',viewTopics:'Explore topics',point1:'✓ Short explanations',point2:'✓ Instant quiz feedback',point3:'✓ Progress saved',robotAlt:'C++ Bot robot helper',
    progressLabel:'Your progress',progressTitle:'Your progress',progressBar:'Completed exercises',
    roadKicker:'YOUR PATH',roadTitle:'Six topics. One step at a time.',roadLead:'Start with your first line and work your way to arrays and functions.',
    practiceKicker:'PRACTICE',practiceTitle:'Choose an exercise',practiceLead:'Go in order or pick a topic you like. You can return to any exercise.',
    topicHeading:'Course topics',topicsTip:'Tip: read the mini lesson before the first exercise in each topic.',taskHeading:'Exercises',typeHeading:'Exercise type',all:'All',questions:'Quizzes',code:'Code',todo:'To do',empty:'No exercises here. Try another filter.',
    howKicker:'HOW IT WORKS',howTitle:'Small steps add up.',step1Title:'Read',step1Text:'Each topic has a short explanation and a C++ example.',step2Title:'Try',step2Text:'Answer a quiz or write code. A hint is nearby.',step3Title:'Check',step3Text:'Quizzes are checked instantly. Run code in your own compiler or compare it with the example.',
    footer:'Learn at your own pace. Come back anytime.',close:'Close exercise',miniLesson:'MINI LESSON',yourTask:'YOUR TASK',yourCode:'Your C++ code',
    codeNote:'Your draft is saved in this browser. This site does not run C++; use your compiler or compare with the sample solution.',selfCheck:'I checked my code in a compiler or compared it with the solution',
    first:'Start the first exercise',continue:n=>`Continue: exercise ${n}`,repeat:'Review exercises',doneCount:n=>`${n} of 36 exercises`,
    progress0:'Your first exercise is ready.',progressAll:'Mission complete! You finished all 36 exercises.',progressHalf:'You are more than halfway there!',progress6:'Great pace. Keep going!',progressSome:'A good start. Keep going!',
    robot0:'Let’s begin together!',robotAll:'All 36 complete!',robotHalf:'Halfway there!',robotSome:'You’ve got this!',
    module:n=>`Topic ${n}`,ready:n=>`${n} / 6 done`,done:'DONE',question:'QUIZ',codeBadge:'CODE',questionLong:'Quick quiz',codeLong:'Write C++ code',miniTopic:n=>`MINI LESSON · TOPIC ${n}`,task:n=>`EXERCISE ${String(n).padStart(2,'0')} / 36`,sample:'Example:',hintShow:'Show hint',hintHide:'Hide hint',solutionShow:'Show sample solution',solutionHide:'Hide sample solution',previous:'Previous',next:'Next',check:'Check answer',complete:'Mark as complete',
    already:'You completed this exercise. You can try it again.',pick:'Choose an answer first.',wrong:'Not quite. Read the mini lesson or hint and try again.',correct:x=>`Correct! ${x}`,write:'Add your solution to the editor first.',verify:'Check your code in a compiler or against the solution, then tick the box.',completed:'Nice work! Exercise complete. Move on when you are ready.'
  }
};
const t = () => ui[language];
const isDone = id => state.completed.includes(id);
function cleanState(input){
  return {
    completed:Array.isArray(input?.completed)?[...new Set(input.completed.filter(id=>Number.isInteger(id)&&id>=1&&id<=totalTasks))].sort((a,b)=>a-b):[],
    drafts:input?.drafts&&typeof input.drafts==='object'&&!Array.isArray(input.drafts)?input.drafts:{}
  };
}
function readStored(key){try{return cleanState(JSON.parse(localStorage.getItem(key)||'{}'))}catch(_){return cleanState({})}}
function userCacheKey(id){return `cppbot-course-user-${id}`}
function mergeStates(...items){return cleanState({completed:items.flatMap(item=>item?.completed||[]),drafts:Object.assign({},...items.map(item=>item?.drafts||{}))})}
function saveState(){
  try{localStorage.setItem(accountUser?userCacheKey(accountUser.id):storageKey,JSON.stringify(state))}catch(_){}
  if(accountUser){clearTimeout(cloudTimer);cloudTimer=setTimeout(syncProgress,500)}
}
async function syncProgress(){
  if(!accountClient||!accountUser)return true;
  clearTimeout(cloudTimer);
  const {data,error}=await accountClient.rpc('merge_progress',{p_completed:state.completed,p_drafts:state.drafts});
  if(error){$('#signOutFeedback').textContent=t().syncError;return false}
  const merged=mergeStates(state,data);
  if(merged.completed.length!==state.completed.length){state=merged;renderProgress();renderModules();renderTasks()}
  try{localStorage.setItem(userCacheKey(accountUser.id),JSON.stringify(merged))}catch(_){}
  $('#signOutFeedback').textContent='';
  return true;
}
function renderAccount(){
  $('#accountButton').textContent=accountUser?(accountUser.email||t().accountReady):t().signIn;
  $('#accountSignedOut').hidden=Boolean(accountUser);
  $('#accountSignedIn').hidden=!accountUser;
  $('#accountDialog').setAttribute('aria-labelledby',accountUser?'accountReadyTitle':'accountTitle');
  $('#accountEmailLabel').textContent=accountUser?.email||'';
  $('#accountSubmit').textContent=accountMode==='signin'?t().signIn:t().signUp;
  document.querySelectorAll('[data-auth-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.authMode===accountMode)));
  $('#accountPassword').autocomplete=accountMode==='signin'?'current-password':'new-password';
}
async function activateAccount(user){
  if(!user){accountUser=null;state=readStored(storageKey);renderAccount();renderProgress();renderModules();renderTasks();return}
  if(accountUser?.id===user.id)return;
  if(loadingUserId===user.id)return loadingUserPromise;
  loadingUserId=user.id;
  loadingUserPromise=(async()=>{
    const {data,error}=await accountClient.from('user_progress').select('completed,drafts').eq('user_id',user.id).maybeSingle();
    if(error)throw error;
    const merged=mergeStates(data,readStored(userCacheKey(user.id)),readStored(storageKey));
    const result=await accountClient.rpc('merge_progress',{p_completed:merged.completed,p_drafts:merged.drafts});
    if(result.error)throw result.error;
    state=mergeStates(merged,result.data);
    accountUser=user;
    try{localStorage.removeItem(storageKey);localStorage.setItem(userCacheKey(user.id),JSON.stringify(state))}catch(_){}
    renderAccount();renderProgress();renderModules();renderTasks();
  })();
  try{return await loadingUserPromise}finally{loadingUserId=null;loadingUserPromise=null}
}
async function initializeAccount(){
  try{
    accountClient=await window.cppbotAuthReady;
    if(!accountClient)return;
    $('#accountButton').hidden=false;
    renderAccount();
    accountClient.auth.onAuthStateChange((event,session)=>{
      if(event==='SIGNED_IN'||event==='SIGNED_OUT'||event==='INITIAL_SESSION'){
        setTimeout(()=>activateAccount(session?.user||null).catch(()=>{$('#accountFeedback').textContent=t().syncError}),0);
      }
    });
    const {data,error}=await accountClient.auth.getUser();
    if(error)throw error;
    await activateAccount(data.user||null);
  }catch(_){$('#accountFeedback').textContent=t().syncError}
}
function setDone(id){if(!isDone(id)){state.completed.push(id);state.completed.sort((a,b)=>a-b);saveState()}renderProgress();renderModules();renderTasks()}
function moduleAt(index){const base=modules[index];return language==='en'?{...base,...enModules[index],example:translateCode(base.example)}:base}
function taskAt(id){const base=tasks[id-1];if(!base)return null;if(language==='ru')return base;const translated=enModules[base.moduleIndex].tasks[(id-1)%6];return {...base,...translated,starter:translateCode(base.starter),solution:translateCode(base.solution)}}
function feedback(message,kind=''){const node=$('#dialogFeedback');node.textContent=message;node.className=`dialog-feedback ${kind}`}
function applyTheme(){
  document.documentElement.dataset.theme=theme;
  $('#themeIcon').textContent=theme==='dark'?'☀':'☾';
  const label=theme==='dark'?t().lightTheme:t().darkTheme;
  $('#themeToggle').setAttribute('aria-label',label);
  $('#themeToggle').title=label;
}
function applyTranslations(){
  document.documentElement.lang=language;
  document.title=language==='en'?'C++ Bot — learn by doing':'C++ Bot — учись на практике';
  document.querySelector('meta[name="description"]').content=language==='en'?'C++ Bot: 36 clear exercises, short lessons and hands-on practice in English and Russian.':'C++ Bot: 36 понятных заданий, короткие уроки и практика на русском и английском.';
  document.querySelectorAll('[data-i18n]').forEach(node=>{node.textContent=t()[node.dataset.i18n]});
  document.querySelectorAll('[data-i18n-aria]').forEach(node=>{node.setAttribute('aria-label',t()[node.dataset.i18nAria])});
  document.querySelectorAll('[data-i18n-alt]').forEach(node=>{node.alt=t()[node.dataset.i18nAlt]});
  document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));
  applyTheme();
  renderAccount();
}
function renderProgress(){
  const count=state.completed.length,percent=Math.round(count/totalTasks*100),next=tasks.find(task=>!isDone(task.id))?.id||1;
  $('#headerCount').textContent=`${count} / ${totalTasks}`;
  $('#progressCount').textContent=t().doneCount(count);
  $('#progressPercent').textContent=`${percent}%`;
  $('#progressFill').style.width=`${percent}%`;
  $('.progress-track').setAttribute('aria-valuenow',String(count));
  $('#progressMessage').textContent=count===0?t().progress0:count===totalTasks?t().progressAll:count>=18?t().progressHalf:count>=6?t().progress6:t().progressSome;
  $('#progressStart').textContent=count===totalTasks?t().repeat:count===0?t().first:t().continue(next);
  $('#robotMessage').textContent=count===0?t().robot0:count===totalTasks?t().robotAll:count>=18?t().robotHalf:t().robotSome;
}
function renderModules(){
  $('#moduleGrid').innerHTML=modules.map((_,index)=>{const module=moduleAt(index),count=module.tasks.filter((_,j)=>isDone(index*6+j+1)).length;return `<button class="module-card ${selectedModule===index?'is-selected':''}" type="button" data-module="${index}" aria-label="${escapeHtml(t().module(index+1)+': '+module.title+', '+t().ready(count))}"><span class="module-card-top"><span class="module-icon ${module.color}" aria-hidden="true">${escapeHtml(module.icon)}</span><span class="module-status">${t().ready(count)}</span></span><h3>${escapeHtml(module.title)}</h3><p>${escapeHtml(module.description)}</p><span class="module-card-meter"><span style="width:${Math.round(count/6*100)}%"></span></span></button>`}).join('');
  $('#moduleFilter').innerHTML=`<button type="button" data-module="-1" class="${selectedModule===-1?'is-active':''}" aria-pressed="${selectedModule===-1}">${t().all}</button>`+modules.map((_,index)=>`<button type="button" data-module="${index}" class="${selectedModule===index?'is-active':''}" aria-pressed="${selectedModule===index}">${String(index+1).padStart(2,'0')} · ${escapeHtml(moduleAt(index).title)}</button>`).join('');
}
function renderLesson(){
  const index=selectedModule<0?Math.min(Math.floor(((tasks.find(task=>!isDone(task.id))?.id||36)-1)/6),5):selectedModule;
  const module=moduleAt(index);
  $('#lessonPanel').innerHTML=`<div><div class="mini-label">${t().miniTopic(index+1)}</div><h3>${escapeHtml(module.title)}</h3><p>${escapeHtml(module.lesson)}</p></div><pre><code>${escapeHtml(module.example)}</code></pre>`;
}
function renderTasks(){
  const visible=tasks.filter(task=>(selectedModule===-1||task.moduleIndex===selectedModule)&&(selectedFilter==='all'||(selectedFilter==='todo'?!isDone(task.id):task.type===selectedFilter)));
  $('#taskList').innerHTML=visible.map(base=>{const task=taskAt(base.id),done=isDone(task.id);return `<button class="task-card ${done?'is-done':''}" type="button" data-task="${task.id}" aria-label="${escapeHtml(t().task(task.id)+': '+task.title+(done?', '+t().done:''))}"><span class="task-card-number">${done?'✓':String(task.id).padStart(2,'0')}</span><span class="task-card-body"><strong>${escapeHtml(task.title)}</strong><small>${escapeHtml(moduleAt(task.moduleIndex).title)} · ${task.type==='quiz'?t().questionLong:t().codeLong}</small></span><span class="task-card-type">${done?t().done:task.type==='quiz'?t().question:t().codeBadge}</span></button>`}).join('');
  $('#emptyState').hidden=visible.length>0;
  renderLesson();
}
function openTask(id){
  const task=taskAt(id);if(!task)return;currentTask=task;
  $('#dialogNumber').textContent=t().task(id);
  $('#dialogType').textContent=task.type==='quiz'?t().questionLong:t().codeLong;
  $('#dialogTitle').textContent=task.title;
  $('#dialogTopic').textContent=`${t().module(task.moduleIndex+1)}: ${moduleAt(task.moduleIndex).title}`;
  $('#dialogLesson').textContent=moduleAt(task.moduleIndex).lesson;
  $('#dialogExample').textContent=moduleAt(task.moduleIndex).example;
  $('#dialogPrompt').textContent=task.prompt;
  $('#dialogSample').textContent=task.sample?`${t().sample}\n${task.sample}`:'';
  $('#quizArea').hidden=task.type!=='quiz';$('#codeArea').hidden=task.type!=='code';
  $('#checkTask').hidden=task.type!=='quiz';$('#completeTask').hidden=task.type!=='code';
  $('#hintText').hidden=true;$('#hintText').textContent=task.type==='quiz'?task.explanation:task.hint;$('#hintButton').textContent=t().hintShow;
  $('#solutionButton').hidden=task.type!=='code';$('#solutionButton').textContent=t().solutionShow;$('#solutionBox').hidden=true;$('#solutionCode').textContent=task.solution||'';
  $('#selfCheck').checked=false;$('#prevTask').disabled=id===1;$('#nextTask').disabled=id===totalTasks;
  $('#prevTask').textContent=t().previous;$('#nextTask').textContent=t().next;$('#checkTask').textContent=t().check;$('#completeTask').textContent=t().complete;
  feedback(isDone(id)?t().already:'');
  if(task.type==='quiz'){
    const order=task.options.map((_,index)=>index);order.push(...order.splice(0,id%order.length));
    $('#quizArea').innerHTML=order.map(index=>`<label class="quiz-option"><input type="radio" name="quizAnswer" value="${index}"><span>${escapeHtml(task.options[index])}</span></label>`).join('');
  }else{$('#codeEditor').value=typeof state.drafts[id]==='string'?state.drafts[id]:task.starter}
  if(!$('#taskDialog').open)$('#taskDialog').showModal();
  $('.dialog-shell').scrollTop=0;
}
function startCourse(){openTask(tasks.find(task=>!isDone(task.id))?.id||1)}
$('#moduleGrid').addEventListener('click',event=>{const button=event.target.closest('[data-module]');if(!button)return;selectedModule=Number(button.dataset.module);selectedFilter='all';document.querySelectorAll('.filter-button').forEach(item=>{item.classList.toggle('is-active',item.dataset.filter==='all');item.setAttribute('aria-pressed',String(item.dataset.filter==='all'))});renderModules();renderTasks();$('#workspace').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});
$('#moduleFilter').addEventListener('click',event=>{const button=event.target.closest('[data-module]');if(!button)return;selectedModule=Number(button.dataset.module);renderModules();renderTasks()});
document.querySelectorAll('.filter-button').forEach(button=>button.addEventListener('click',()=>{selectedFilter=button.dataset.filter;document.querySelectorAll('.filter-button').forEach(item=>{item.classList.toggle('is-active',item===button);item.setAttribute('aria-pressed',String(item===button))});renderTasks()}));
$('#taskList').addEventListener('click',event=>{const button=event.target.closest('[data-task]');if(button)openTask(Number(button.dataset.task))});
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.lang===language)return;const openId=$('#taskDialog').open?currentTask?.id:null;language=button.dataset.lang;try{localStorage.setItem(languageKey,language)}catch(_){}applyTranslations();renderProgress();renderModules();renderTasks();if(openId)openTask(openId)}));
$('#themeToggle').addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';try{localStorage.setItem(themeKey,theme)}catch(_){}applyTheme()});
$('#accountButton').addEventListener('click',()=>{$('#accountFeedback').textContent='';$('#signOutFeedback').textContent='';renderAccount();$('#accountDialog').showModal()});
$('#accountClose').addEventListener('click',()=>$('#accountDialog').close());
document.querySelectorAll('[data-auth-mode]').forEach(button=>button.addEventListener('click',()=>{accountMode=button.dataset.authMode;$('#accountFeedback').textContent='';renderAccount()}));
$('#accountForm').addEventListener('submit',async event=>{
  event.preventDefault();
  if(!accountClient)return;
  const email=$('#accountEmail').value.trim();
  const password=$('#accountPassword').value;
  const submit=$('#accountSubmit');
  submit.disabled=true;$('#accountFeedback').textContent=t().accountWait;
  try{
    const result=accountMode==='signup'
      ?await accountClient.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}})
      :await accountClient.auth.signInWithPassword({email,password});
    if(result.error)throw result.error;
    if(accountMode==='signup'&&!result.data.session){$('#accountFeedback').textContent=t().checkEmail;return}
    if(result.data.user)await activateAccount(result.data.user);
    $('#accountDialog').close();$('#accountPassword').value='';
  }catch(_){$('#accountFeedback').textContent=accountMode==='signup'?t().signupError:t().authError}
  finally{submit.disabled=false}
});
$('#signOutButton').addEventListener('click',async()=>{
  if(!accountClient||!accountUser)return;
  $('#signOutButton').disabled=true;
  try{
    if(!await syncProgress())return;
    const {error}=await accountClient.auth.signOut();
    if(error)throw error;
    await activateAccount(null);
    $('#accountDialog').close();
  }catch(_){$('#signOutFeedback').textContent=t().syncError}
  finally{$('#signOutButton').disabled=false}
});
$('#heroStart').addEventListener('click',startCourse);$('#progressStart').addEventListener('click',startCourse);
$('#dialogClose').addEventListener('click',()=>$('#taskDialog').close());
$('#prevTask').addEventListener('click',()=>openTask(currentTask.id-1));$('#nextTask').addEventListener('click',()=>openTask(currentTask.id+1));
$('#hintButton').addEventListener('click',()=>{const node=$('#hintText');node.hidden=!node.hidden;$('#hintButton').textContent=node.hidden?t().hintShow:t().hintHide});
$('#solutionButton').addEventListener('click',()=>{const node=$('#solutionBox');node.hidden=!node.hidden;$('#solutionButton').textContent=node.hidden?t().solutionShow:t().solutionHide});
$('#codeEditor').addEventListener('input',()=>{if(!currentTask||currentTask.type!=='code')return;state.drafts[currentTask.id]=$('#codeEditor').value;saveState()});
$('#quizArea').addEventListener('change',()=>{$('#quizArea').querySelectorAll('.quiz-option').forEach(option=>option.classList.remove('is-correct','is-incorrect'));feedback('')});
$('#checkTask').addEventListener('click',()=>{
  if(!currentTask||currentTask.type!=='quiz')return;const selected=$('#quizArea input:checked');if(!selected){feedback(t().pick,'error');return}
  const option=selected.closest('.quiz-option');$('#quizArea').querySelectorAll('.quiz-option').forEach(item=>item.classList.remove('is-correct','is-incorrect'));
  if(Number(selected.value)!==currentTask.answer){option.classList.add('is-incorrect');feedback(t().wrong,'error');return}
  option.classList.add('is-correct');setDone(currentTask.id);feedback(t().correct(currentTask.explanation),'success');
});
$('#completeTask').addEventListener('click',()=>{
  if(!currentTask||currentTask.type!=='code')return;
  if($('#codeEditor').value.trim()===currentTask.starter.trim()){feedback(t().write,'error');return}
  if(!$('#selfCheck').checked){feedback(t().verify,'error');return}
  setDone(currentTask.id);feedback(t().completed,'success');
});
$('#year').textContent=new Date().getFullYear();
applyTranslations();renderProgress();renderModules();renderTasks();
initializeAccount();
