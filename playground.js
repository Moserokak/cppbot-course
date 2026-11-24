const playgroundText={
  ru:{skip:'К компилятору',back:'Вернуться к заданиям',kicker:'ТВОЯ ЛАБОРАТОРИЯ C++',title:'Пиши код. Запускай. Смотри результат.',lead:'Нажми Run в редакторе. Если программа ждёт данные через cin, добавь их в поле Stdin. Ответ и ошибки появятся в Output.',powered:'Настоящий C++ компилятор',creditLead:'Редактор и запуск кода:',tip:'Код из задания откроется здесь автоматически. Изменения в компиляторе остаются в этой песочнице; черновик задания хранится в C++ Bot.'},
  en:{skip:'Skip to compiler',back:'Back to exercises',kicker:'YOUR C++ LAB',title:'Write code. Run it. See what happens.',lead:'Click Run in the editor. If your program uses cin, enter the input in Stdin. The result and errors appear in Output.',powered:'Real C++ compiler',creditLead:'Editor and code execution:',tip:'Code from an exercise opens here automatically. Changes in the compiler stay in this playground; your exercise draft stays in C++ Bot.'}
};
let playgroundLanguage='ru';
let playgroundTheme='light';
try{playgroundLanguage=localStorage.getItem('cppbot-language')==='en'?'en':'ru';playgroundTheme=localStorage.getItem('cppbot-theme')==='dark'?'dark':'light'}catch(_){}
document.documentElement.dataset.theme=playgroundTheme;
const sampleCode='#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++ Bot!" << std::endl;\n    return 0;\n}\n';
function base64url(text){let binary='';new TextEncoder().encode(text).forEach(byte=>{binary+=String.fromCharCode(byte)});return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
const hashCode=new URLSearchParams(location.hash.slice(1)).get('code');
const initialCode=hashCode&&/^[A-Za-z0-9_-]{1,20000}$/.test(hashCode)?hashCode:base64url(sampleCode);
const params=new URLSearchParams({lang:'cpp',theme:playgroundTheme,layout:innerWidth<720?'stacked':'side',code:initialCode,credit:'0'});
document.querySelector('#compilerFrame').src=`https://coddy.tech/embed-editor?${params}`;
function translatePlayground(){
  document.documentElement.lang=playgroundLanguage;
  document.querySelectorAll('[data-i18n]').forEach(node=>{node.textContent=playgroundText[playgroundLanguage][node.dataset.i18n]});
  document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===playgroundLanguage)));
  document.title=playgroundLanguage==='ru'?'Компилятор C++ — C++ Bot':'C++ compiler — C++ Bot';
}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{playgroundLanguage=button.dataset.lang;try{localStorage.setItem('cppbot-language',playgroundLanguage)}catch(_){}translatePlayground()}));
translatePlayground();
