const enModules = [
  {title:'First steps',description:'Meet a C++ program and print your first message.',lesson:'A simple C++ program starts in main(). Use std::cout to print text. Most statements end with a semicolon.',tasks:[
    {title:'What does cout do?',prompt:'What is std::cout used for?',options:['Prints data to the screen','Reads keyboard input','Creates a variable','Ends the program'],explanation:'std::cout sends text and values to standard output.'},
    {title:'Include a library',prompt:'Which line do you need to use std::cout?',options:['#include <iostream>','#include <vector>','using int main','#include <string>'],explanation:'Input and output streams are declared in <iostream>.'},
    {title:'Hello, world!',prompt:'Write a program that prints exactly: Hello, world!',sample:'Hello, world!',hint:'Inside main(), use std::cout << "Hello, world!";'},
    {title:'Two lines',prompt:'Print “Learning” and “C++” on separate lines.',sample:'Learning\nC++',hint:'Add std::endl after the first word.'},
    {title:'Entry point',prompt:'Which function does a C++ program usually start in?',options:['main()','start()','print()','first()'],explanation:'Execution starts in main().'},
    {title:'Your motto',prompt:'Print the line “I can code!”',sample:'I can code!',hint:'Put text between double quotation marks.'}
  ]},
  {title:'Variables & numbers',description:'Store values and do simple calculations.',lesson:'A variable stores a value. int holds whole numbers and double holds decimals. = assigns a value; +, -, * and / let you calculate.',tasks:[
    {title:'Whole number',prompt:'Which type is commonly used for whole numbers?',options:['int','double','string','bool'],explanation:'int stores whole numbers such as 5 or -12.'},
    {title:'My age',prompt:'Create a variable age with value 18 and print it.',sample:'18',hint:'Write int age = 18; then std::cout << age;'},
    {title:'Decimal number',prompt:'Which type is useful for the value 3.14?',options:['double','int','char','bool'],explanation:'double stores numbers with a fractional part.'},
    {title:'Add two numbers',prompt:'Create a = 7 and b = 5, then print their sum.',sample:'12',hint:'You can write std::cout << a + b;'},
    {title:'Assignment',prompt:'What does x = 10; mean?',options:['Assign 10 to x','Compare x with 10','Multiply x by 10','Print 10'],explanation:'A single = assigns a value. Use == for comparison.'},
    {title:'Rectangle area',prompt:'Width is 4 and height is 6. Store them in variables and print the area.',sample:'24',hint:'Area equals width * height.'}
  ]},
  {title:'Input',description:'Make programs respond to the user.',lesson:'std::cin reads values from the keyboard. Declare a variable, then use std::cin >> variableName. Use std::string for a word.',tasks:[
    {title:'Read from keyboard',prompt:'Which statement reads a number into n?',options:['std::cin >> n;','std::cout << n;','int >> n;','read(n);'],explanation:'std::cin reads input; >> puts it into the variable.'},
    {title:'Double it',prompt:'Read a whole number and print twice its value.',sample:'Input: 7\nOutput: 14',hint:'Declare int n, read n, then print n * 2.'},
    {title:'What gets printed?',prompt:'The user enters 5. What does std::cin >> x; std::cout << x + 3; print?',options:['8','5','3','53'],explanation:'The input 5 is increased by 3.'},
    {title:'Add the input',prompt:'Read two whole numbers and print their sum.',sample:'Input: 4 9\nOutput: 13',hint:'Use std::cin >> a >> b; then std::cout << a + b;'},
    {title:'A line with spaces',prompt:'How do you read a full line containing spaces?',options:['std::getline(std::cin, text);','std::cin >> text;','std::cout << text;','int text;'],explanation:'std::getline reads a full line; std::cin >> stops at a space.'},
    {title:'Minutes to seconds',prompt:'Read a number of minutes and print the number of seconds.',sample:'Input: 3\nOutput: 180',hint:'Multiply minutes by 60.'}
  ]},
  {title:'Decisions',description:'Teach your program to choose what to do.',lesson:'if runs a block when its condition is true. else runs otherwise. Compare values with ==, >, <, >= and <=.',tasks:[
    {title:'Comparison',prompt:'How do you write “a is greater than b”?',options:['a > b','a < b','a = b','a == b'],explanation:'> checks whether the left value is greater.'},
    {title:'Even or odd',prompt:'Read a number. Print “Even” if it is divisible by 2; otherwise print “Odd”.',sample:'Input: 8\nOutput: Even',hint:'Use n % 2. An even number has remainder 0.'},
    {title:'When does else run?',prompt:'When does the else block run?',options:['When the if condition is false','Always','When the if condition is true','Only on an error'],explanation:'else runs when the if condition is false.'},
    {title:'Number sign',prompt:'Read a number. Print “Positive”, “Negative”, or “Zero”.',sample:'Input: -3\nOutput: Negative',hint:'Check n > 0, then n < 0; otherwise it is zero.'},
    {title:'Two conditions',prompt:'Which operator means logical AND?',options:['&&','||','==','!='],explanation:'&& requires both conditions to be true.'},
    {title:'Age check',prompt:'Read an age. Print “Allowed” if it is at least 18; otherwise print “Not allowed”.',sample:'Input: 17\nOutput: Not allowed',hint:'Use age >= 18.'}
  ]},
  {title:'Loops',description:'Repeat actions without copying code.',lesson:'Use for when you know how many repetitions you need. while repeats while its condition is true. Update the counter so the loop can end.',tasks:[
    {title:'How many times?',prompt:'How many times does for (int i = 0; i < 3; i++) run?',options:['3','2','4','Forever'],explanation:'i takes the values 0, 1 and 2: three iterations.'},
    {title:'Numbers 1 to 5',prompt:'Print 1 through 5 separated by spaces using for.',sample:'1 2 3 4 5',hint:'Start i at 1 and continue while i <= 5.'},
    {title:'The while loop',prompt:'When will while (n > 0) stop?',options:['When n becomes 0 or less','After one iteration','Never','When n becomes 100'],explanation:'The loop continues only while n > 0 is true.'},
    {title:'Sum from 1 to n',prompt:'Read n and print the sum of the numbers from 1 to n.',sample:'Input: 4\nOutput: 10',hint:'Start sum at 0 and add each i from 1 through n.'},
    {title:'Infinite loop',prompt:'Why can while (true) run forever?',options:['Its condition is always true','true equals zero','while runs once','The compiler skips the condition'],explanation:'Without break or another exit, the condition stays true.'},
    {title:'Countdown',prompt:'Read n and print n, n-1, ..., 1 separated by spaces.',sample:'Input: 4\nOutput: 4 3 2 1',hint:'Start i at n and decrease it each time.'}
  ]},
  {title:'Arrays & functions',description:'Organize data and reuse code.',lesson:'An array stores several values of one type. Indexes begin at 0. A function packages an action and can return a result.',tasks:[
    {title:'First element',prompt:'What is the index of the first array element in C++?',options:['0','1','-1','It depends on the type'],explanation:'Array indexing starts at zero.'},
    {title:'Array sum',prompt:'Given {2, 4, 6}, print the sum of all three elements.',sample:'12',hint:'Use a[0], a[1] and a[2].'},
    {title:'Return a value',prompt:'Which keyword returns a result from a function?',options:['return','cout','include','break'],explanation:'return sends a value back to the calling code.'},
    {title:'The square function',prompt:'Write square(int x) to return the square of x. In main(), print square(5).',sample:'25',hint:'Before main(): int square(int x) { return x * x; }'},
    {title:'Dynamic list',prompt:'Which header do you include for std::vector?',options:['<vector>','<iostream>','<arraylist>','<list>'],explanation:'std::vector needs #include <vector>.'},
    {title:'Find the maximum',prompt:'Given {3, 9, 2, 7, 5}, find and print the largest value using a loop.',sample:'9',hint:'Start maxValue at a[0], compare the other elements, and update it.'}
  ]}
];

const codeEnglish = [
  ['Привет, мир!','Hello, world!'],['Привет!','Hello!'],['Учусь','Learning'],['Я могу писать код!','I can code!'],
  ['Чётное','Even'],['Нечётное','Odd'],['Плюс','Positive'],['Минус','Negative'],['Ноль','Zero'],
  ['Доступно','Allowed'],['Недоступно','Not allowed'],['Можно','Allowed'],['Пока нет','Not yet'],
  ['Выведи приветствие','Print the greeting'],['Две строки вывода','Print two lines'],['Твой девиз','Your motto'],
  ['Создай age и выведи значение','Create age and print it'],['a, b и их сумма','a, b and their sum'],['Ширина, высота и площадь','Width, height and area'],
  ['Считай и удвой','Read and double'],['Считай и сложи','Read and add'],['Считай минуты и выведи секунды','Read minutes and print seconds'],
  ['Добавь if и else','Add if and else'],['Три возможных ответа','Three possible answers'],['Проверь возраст','Check the age'],
  ['Цикл от 1 до 5','Loop from 1 to 5'],['Найди сумму','Find the sum'],['Обратный отсчёт','Countdown'],
  ['Выведи сумму','Print the sum'],['Добавь функцию square','Add the square function'],['Выведи square(5)','Print square(5)'],['Найди максимум циклом','Find the maximum with a loop']
];
function translateCode(value) {
  if (!value) return value;
  return codeEnglish.reduce((result, [ru, en]) => result.replaceAll(ru, en), value);
}
