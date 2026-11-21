[
  {
    "name": "",
    "age": 0,
    "photo": "url"
  },
  {
    "name": "",
    "age": 0,
    "photo": "url"
  },
  {
    "name": "",
    "age": 0,
    "photo": "url"
  }
]
function validateEmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}
function moveBlock(position = 0) {
    const smallBlock = document.querySelector(".small-block"); 
    
    if (!smallBlock) return; 

    
    position += 2;
    smallBlock.style.left = `${position}px`;

    
    if (position < 300) {
        
        setTimeout(() => {
            moveBlock(position);
        }, 20); 
    }
}







function validateEmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}

const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

if (gmailButton && gmailInput && gmailResult) {
    gmailButton.addEventListener('click', () => {
        const value = gmailInput.value.trim();

        if (validateEmail(value)) {
            gmailResult.textContent = 'Почта валидна';
            gmailResult.style.color = 'green';
        } else {
            gmailResult.textContent = 'Некорректный адрес Gmail';
            gmailResult.style.color = 'red';
        }
    });
}


function moveBlock(position = 0) {
    const smallBlock = document.querySelector('.small-block');
    const parentBlock = smallBlock ? smallBlock.parentElement : null;

    if (!smallBlock || !parentBlock) return;

    const maxPosition = parentBlock.clientWidth - smallBlock.clientWidth;

    if (position < maxPosition) {
        position += 2;
        if (position > maxPosition) {
            position = maxPosition;
        }
        smallBlock.style.left = `${position}px`;

        setTimeout(() => {
            moveBlock(position);
        }, 20);
    }
}

moveBlock();



function delay(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            shouldFail
                ? reject(new Error(`Ошибка при обработке: ${value}`))
                : resolve(value);
        }, ms);
    });
}




console.log('--- Задание 1: .then / .catch / .finally ---');

delay(1, 500, false)
    .then((val) => {
        console.log('Шаг 1 успешен, значение:', val);
        return delay(val + 1, 500, true); // второй шаг падает
    })
    .then((val) => {
        // Этот блок НЕ выполнится, так как предыдущий промис упал
        console.log('Шаг 2 успешен (не должен выполниться), значение:', val);
        return delay(val + 1, 500, false);
    })
    .then((val) => {
        console.log('Шаг 3 успешен (не должен выполниться), значение:', val);
    })
    .catch((error) => {
        console.warn('Перехвачено в .catch:', error.message);
    })
    .finally(() => {
        console.log('Блок .finally сработал в любом случае');
    });



async function runTaskTwo() {
    console.log('--- Задание 2: async/await и массив ---');

    // Часть A: цепочка из 3 шагов через async/await
    try {
        const v1 = await delay(1, 500, false);
        console.log('async шаг 1:', v1);

        const v2 = await delay(v1 + 1, 500, true); // упадёт
        console.log('async шаг 2 (не выполнится):', v2);

        const v3 = await delay(v2 + 1, 500, false);
        console.log('async шаг 3 (не выполнится):', v3);
    } catch (error) {
        console.warn('async/await поймал ошибку:', error.message);
    } finally {
        console.log('async/await блок finally выполнен');
    }

    
    const items = [10, 20, 30, 40];
    const results = [];

    for (const item of items) {
        const shouldFail = Math.random() > 0.7;
        try {
            const value = await delay(item, 300, shouldFail);
            results.push({ value, error: null });
        } catch (error) {
            results.push({ value: item, error: error.message });
        }
    }

    console.log('Итоговый массив [{ value, error }]:', results);
}

runTaskTwo();




async function runTaskThree() {
    console.log('--- Задание 3: Promise.all / allSettled / race ---');

    const createFourPromises = () => [
        delay('A', 300, false),
        delay('B', 600, true),  // один из промисов падает
        delay('C', 900, false),
        delay('D', 1200, false),
    ];


    try {
        const allRes = await Promise.all(createFourPromises());
        console.log('Promise.all успех:', allRes);
    } catch (error) {
        console.warn('Promise.all упал при первой ошибке:', error.message);
    }

    // 3.2 Promise.allSettled — разделяем на succeeded и failed
    const settledRes = await Promise.allSettled(createFourPromises());
    const succeeded = settledRes
        .filter((item) => item.status === 'fulfilled')
        .map((item) => item.value);
    const failed = settledRes
        .filter((item) => item.status === 'rejected')
        .map((item) => item.reason.message);

    console.log('Promise.allSettled succeeded:', succeeded);
    console.log('Promise.allSettled failed:', failed);


    try {
        const winner = await Promise.race([
            delay('Полезные данные', 2000, false),
            delay('Таймаут запроса', 500, true),
        ]);
        console.log('Promise.race выиграл:', winner);
    } catch (error) {
        console.warn('Promise.race проиграл/упал первым:', error.message);
    }
}

runTaskThree();