const modules = [
  {
    title: 'Первые строки', icon: '⌘', color: 'cyan', description: 'Познакомься с программой и научись выводить текст.',
    lesson: 'Любая простая программа C++ начинается с функции main(). Для вывода текста используй std::cout. Инструкция обычно заканчивается точкой с запятой.',
    example: '#include <iostream>\n\nint main() {\n    std::cout << "Привет!";\n    return 0;\n}',
    tasks: [
      {type:'quiz',title:'Что делает cout?',prompt:'Для чего используют std::cout?',options:['Выводит данные на экран','Считывает данные с клавиатуры','Создаёт переменную','Завершает программу'],answer:0,explanation:'std::cout отправляет текст и значения в стандартный поток вывода.'},
      {type:'quiz',title:'Подключи библиотеку',prompt:'Какая строка нужна для работы с std::cout?',options:['#include <iostream>','#include <vector>','using int main','#include <string>'],answer:0,explanation:'Потоки ввода и вывода объявлены в заголовке <iostream>.'},
      {type:'code',title:'Привет, мир!',prompt:'Напиши программу, которая выводит ровно: Привет, мир!',sample:'Привет, мир!',hint:'Внутри main() используй std::cout << "Привет, мир!";',starter:'#include <iostream>\n\nint main() {\n    // Выведи приветствие\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    std::cout << "Привет, мир!";\n    return 0;\n}'},
      {type:'code',title:'Две строки',prompt:'Выведи слова «Учусь» и «C++» на разных строках.',sample:'Учусь\nC++',hint:'После первого слова добавь std::endl.',starter:'#include <iostream>\n\nint main() {\n    // Две строки вывода\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    std::cout << "Учусь" << std::endl;\n    std::cout << "C++";\n    return 0;\n}'},
      {type:'quiz',title:'Точка входа',prompt:'С какой функции обычно начинается выполнение программы C++?',options:['main()','start()','print()','first()'],answer:0,explanation:'Операционная система запускает программу с функции main().'},
      {type:'code',title:'Твой девиз',prompt:'Выведи строку «Я могу писать код!»',sample:'Я могу писать код!',hint:'Текст в C++ записывают в двойных кавычках.',starter:'#include <iostream>\n\nint main() {\n    // Твой девиз\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    std::cout << "Я могу писать код!";\n    return 0;\n}'}
    ]
  },
  {
    title: 'Переменные и числа', icon: '◆', color: 'violet', description: 'Храни значения и выполняй вычисления.',
    lesson: 'Переменная хранит значение. Тип int подходит для целых чисел, double — для дробных. Знак = присваивает значение, а +, -, * и / помогают считать.',
    example: '#include <iostream>\n\nint main() {\n    int apples = 3;\n    std::cout << apples + 2;\n    return 0;\n}',
    tasks: [
      {type:'quiz',title:'Целое число',prompt:'Какой тип обычно используют для целого числа?',options:['int','double','string','bool'],answer:0,explanation:'int хранит целые числа, например 5 или -12.'},
      {type:'code',title:'Мой возраст',prompt:'Создай переменную age со значением 18 и выведи её.',sample:'18',hint:'Напиши int age = 18; затем std::cout << age;',starter:'#include <iostream>\n\nint main() {\n    // Создай age и выведи значение\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int age = 18;\n    std::cout << age;\n    return 0;\n}'},
      {type:'quiz',title:'Дробное число',prompt:'Какой тип удобен для числа 3.14?',options:['double','int','char','bool'],answer:0,explanation:'double хранит числа с дробной частью.'},
      {type:'code',title:'Сумма двух чисел',prompt:'Создай a = 7 и b = 5. Выведи их сумму.',sample:'12',hint:'Можно написать std::cout << a + b;',starter:'#include <iostream>\n\nint main() {\n    // a, b и их сумма\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int a = 7;\n    int b = 5;\n    std::cout << a + b;\n    return 0;\n}'},
      {type:'quiz',title:'Присваивание',prompt:'Что означает запись x = 10;?',options:['Присвоить x значение 10','Сравнить x с 10','Умножить x на 10','Вывести 10'],answer:0,explanation:'Один знак = присваивает значение. Для сравнения используют ==.'},
      {type:'code',title:'Площадь прямоугольника',prompt:'Ширина 4, высота 6. Сохрани их в переменные и выведи площадь.',sample:'24',hint:'Площадь равна ширина * высота.',starter:'#include <iostream>\n\nint main() {\n    // Ширина, высота и площадь\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int width = 4;\n    int height = 6;\n    std::cout << width * height;\n    return 0;\n}'}
    ]
  },
  {
    title: 'Ввод данных', icon: '↳', color: 'blue', description: 'Пусть программа отвечает на данные пользователя.',
    lesson: 'std::cin считывает значение с клавиатуры. Сначала объяви переменную, потом используй std::cin >> имя_переменной. Для строки без пробелов подойдёт std::string.',
    example: '#include <iostream>\n\nint main() {\n    int number;\n    std::cin >> number;\n    std::cout << number * 2;\n    return 0;\n}',
    tasks: [
      {type:'quiz',title:'Чтение с клавиатуры',prompt:'Какая команда считывает число в переменную n?',options:['std::cin >> n;','std::cout << n;','int >> n;','read(n);'],answer:0,explanation:'std::cin считывает ввод, а оператор >> направляет его в переменную.'},
      {type:'code',title:'Удвоение',prompt:'Считай целое число и выведи число, умноженное на 2.',sample:'Ввод: 7\nВывод: 14',hint:'Создай int n; считай n; выведи n * 2.',starter:'#include <iostream>\n\nint main() {\n    int n;\n    // Считай и удвой\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::cout << n * 2;\n    return 0;\n}'},
      {type:'quiz',title:'Что получится?',prompt:'Пользователь ввёл 5. Что выведет программа после std::cin >> x; std::cout << x + 3;?',options:['8','5','3','53'],answer:0,explanation:'Считанное значение 5 увеличивается на 3.'},
      {type:'code',title:'Сложи ввод',prompt:'Считай два целых числа и выведи их сумму.',sample:'Ввод: 4 9\nВывод: 13',hint:'std::cin >> a >> b; затем std::cout << a + b;',starter:'#include <iostream>\n\nint main() {\n    int a, b;\n    // Считай и сложи\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int a, b;\n    std::cin >> a >> b;\n    std::cout << a + b;\n    return 0;\n}'},
      {type:'quiz',title:'Строка с пробелами',prompt:'Что лучше использовать, чтобы считать целую строку с пробелами?',options:['std::getline(std::cin, text);','std::cin >> text;','std::cout << text;','int text;'],answer:0,explanation:'std::getline читает строку целиком. Обычный std::cin >> останавливается на пробеле.'},
      {type:'code',title:'Минуты в секунды',prompt:'Считай количество минут и выведи число секунд.',sample:'Ввод: 3\nВывод: 180',hint:'Умножь минуты на 60.',starter:'#include <iostream>\n\nint main() {\n    int minutes;\n    // Считай минуты и выведи секунды\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int minutes;\n    std::cin >> minutes;\n    std::cout << minutes * 60;\n    return 0;\n}'}
    ]
  },
  {
    title: 'Условия', icon: '◇', color: 'pink', description: 'Научи программу выбирать действие.',
    lesson: 'if выполняет блок кода, когда условие истинно. else срабатывает в остальных случаях. Для сравнения используй ==, >, <, >= и <=.',
    example: '#include <iostream>\n\nint main() {\n    int age = 18;\n    if (age >= 18) {\n        std::cout << "Можно";\n    } else {\n        std::cout << "Пока нет";\n    }\n}',
    tasks: [
      {type:'quiz',title:'Сравнение',prompt:'Как записать «a больше b»?',options:['a > b','a < b','a = b','a == b'],answer:0,explanation:'Знак > проверяет, что левое число больше правого.'},
      {type:'code',title:'Чётное или нечётное',prompt:'Считай число. Выведи «Чётное», если оно делится на 2, иначе «Нечётное».',sample:'Ввод: 8\nВывод: Чётное',hint:'Остаток от деления: n % 2. Чётное число даёт остаток 0.',starter:'#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    // Добавь if и else\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    if (n % 2 == 0) {\n        std::cout << "Чётное";\n    } else {\n        std::cout << "Нечётное";\n    }\n    return 0;\n}'},
      {type:'quiz',title:'Когда работает else?',prompt:'Когда выполняется блок else?',options:['Когда условие if ложно','Всегда','Когда условие if истинно','Только при ошибке'],answer:0,explanation:'else означает «иначе»: блок выполняется, если условие if не прошло.'},
      {type:'code',title:'Знак числа',prompt:'Считай число. Выведи «Плюс», «Минус» или «Ноль».',sample:'Ввод: -3\nВывод: Минус',hint:'Проверь n > 0, затем n < 0, иначе число равно нулю.',starter:'#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    // Три возможных ответа\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    if (n > 0) {\n        std::cout << "Плюс";\n    } else if (n < 0) {\n        std::cout << "Минус";\n    } else {\n        std::cout << "Ноль";\n    }\n    return 0;\n}'},
      {type:'quiz',title:'Два условия сразу',prompt:'Какой оператор означает логическое «И»?',options:['&&','||','==','!='],answer:0,explanation:'&& требует, чтобы обе части условия были истинными.'},
      {type:'code',title:'Проверка возраста',prompt:'Считай возраст. Если он не меньше 18, выведи «Доступно», иначе «Недоступно».',sample:'Ввод: 17\nВывод: Недоступно',hint:'Условие age >= 18.',starter:'#include <iostream>\n\nint main() {\n    int age;\n    std::cin >> age;\n    // Проверь возраст\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int age;\n    std::cin >> age;\n    if (age >= 18) {\n        std::cout << "Доступно";\n    } else {\n        std::cout << "Недоступно";\n    }\n    return 0;\n}'}
    ]
  },
  {
    title: 'Циклы', icon: '↻', color: 'orange', description: 'Повторяй действия без копирования строк.',
    lesson: 'Цикл for удобен, когда известно количество повторений. while повторяется, пока условие истинно. Важно менять счётчик, иначе цикл может не закончиться.',
    example: '#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        std::cout << i << " ";\n    }\n}',
    tasks: [
      {type:'quiz',title:'Сколько повторений?',prompt:'Сколько раз выполнится тело цикла for (int i = 0; i < 3; i++)?',options:['3','2','4','Бесконечно'],answer:0,explanation:'i принимает значения 0, 1 и 2 — всего три раза.'},
      {type:'code',title:'Числа от 1 до 5',prompt:'Выведи числа от 1 до 5 через пробел с помощью for.',sample:'1 2 3 4 5',hint:'Начни i с 1 и повторяй, пока i <= 5.',starter:'#include <iostream>\n\nint main() {\n    // Цикл от 1 до 5\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        if (i > 1) std::cout << " ";\n        std::cout << i;\n    }\n    return 0;\n}'},
      {type:'quiz',title:'Цикл while',prompt:'Когда завершится цикл while (n > 0)?',options:['Когда n станет 0 или меньше','После одного повтора','Никогда','Когда n станет 100'],answer:0,explanation:'Цикл работает только пока условие n > 0 истинно.'},
      {type:'code',title:'Сумма от 1 до n',prompt:'Считай n и выведи сумму чисел от 1 до n.',sample:'Ввод: 4\nВывод: 10',hint:'Создай sum = 0 и добавляй i в цикле от 1 до n.',starter:'#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    // Найди сумму\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    int sum = 0;\n    for (int i = 1; i <= n; i++) sum += i;\n    std::cout << sum;\n    return 0;\n}'},
      {type:'quiz',title:'Бесконечный цикл',prompt:'Почему while (true) может работать бесконечно?',options:['Его условие всегда истинно','true равно нулю','while запускается один раз','Компилятор пропускает условие'],answer:0,explanation:'Если внутри нет break или другого выхода, истинное условие не меняется.'},
      {type:'code',title:'Обратный отсчёт',prompt:'Считай n и выведи n, n-1, ..., 1 через пробел.',sample:'Ввод: 4\nВывод: 4 3 2 1',hint:'В цикле начни с i = n и уменьши i после каждого повтора.',starter:'#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    // Обратный отсчёт\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    for (int i = n; i >= 1; i--) {\n        if (i < n) std::cout << " ";\n        std::cout << i;\n    }\n    return 0;\n}'}
    ]
  },
  {
    title: 'Массивы и функции', icon: '▦', color: 'green', description: 'Собирай данные и выноси действия в функции.',
    lesson: 'Массив хранит несколько значений одного типа. Индексы начинаются с 0. Функция помогает использовать один алгоритм несколько раз и может вернуть результат через return.',
    example: '#include <iostream>\n\nint square(int x) {\n    return x * x;\n}\n\nint main() {\n    int values[3] = {2, 4, 6};\n    std::cout << square(values[0]);\n}',
    tasks: [
      {type:'quiz',title:'Первый элемент',prompt:'Какой индекс у первого элемента массива в C++?',options:['0','1','-1','Зависит от типа'],answer:0,explanation:'Индексация массива начинается с нуля.'},
      {type:'code',title:'Сумма массива',prompt:'Дан массив {2, 4, 6}. Выведи сумму всех трёх элементов.',sample:'12',hint:'Обратись к a[0], a[1] и a[2].',starter:'#include <iostream>\n\nint main() {\n    int a[3] = {2, 4, 6};\n    // Выведи сумму\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int a[3] = {2, 4, 6};\n    std::cout << a[0] + a[1] + a[2];\n    return 0;\n}'},
      {type:'quiz',title:'Возврат значения',prompt:'Какое слово возвращает результат из функции?',options:['return','cout','include','break'],answer:0,explanation:'return передаёт значение из функции вызывающему коду.'},
      {type:'code',title:'Функция square',prompt:'Напиши функцию square(int x), которая возвращает квадрат числа. В main() выведи square(5).',sample:'25',hint:'До main(): int square(int x) { return x * x; }',starter:'#include <iostream>\n\n// Добавь функцию square\n\nint main() {\n    // Выведи square(5)\n    return 0;\n}',solution:'#include <iostream>\n\nint square(int x) {\n    return x * x;\n}\n\nint main() {\n    std::cout << square(5);\n    return 0;\n}'},
      {type:'quiz',title:'Динамический список',prompt:'Какой заголовок подключают для std::vector?',options:['<vector>','<iostream>','<arraylist>','<list>'],answer:0,explanation:'Для std::vector нужен #include <vector>.'},
      {type:'code',title:'Найди максимум',prompt:'Дан массив {3, 9, 2, 7, 5}. Найди и выведи максимальное значение циклом.',sample:'9',hint:'Создай maxValue = a[0], сравни остальные элементы и обновляй максимум.',starter:'#include <iostream>\n\nint main() {\n    int a[5] = {3, 9, 2, 7, 5};\n    // Найди максимум циклом\n    return 0;\n}',solution:'#include <iostream>\n\nint main() {\n    int a[5] = {3, 9, 2, 7, 5};\n    int maxValue = a[0];\n    for (int i = 1; i < 5; i++) {\n        if (a[i] > maxValue) maxValue = a[i];\n    }\n    std::cout << maxValue;\n    return 0;\n}'}
    ]
  }
];

const tasks = modules.flatMap((module, moduleIndex) => module.tasks.map((task, taskIndex) => ({...task, id: moduleIndex * 6 + taskIndex + 1, moduleIndex})));
