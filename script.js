// Функция для обработки изменений в поле "Мечта" и отображения комментариев
function updateDreamComments() {
  const dream = document.getElementById('dream').value;
  const commentsList = document.getElementById('commentsList');
  
  // Очистим текущие комментарии
  commentsList.innerHTML = '';
  
  // Комментарии в зависимости от мечты
  let comments = [];

  if (dream.toLowerCase().includes('дом')) {
    comments.push("О, дом — это отличная мечта! Не забывайте учитывать дополнительные расходы, такие как налоги и содержание.");
    comments.push("Мечта о доме требует стабильных накоплений. Главное — не отступать от намеченной цели!");
  } else if (dream.toLowerCase().includes('путешествие')) {
    comments.push("Путешествия — это замечательно! Не забудьте про расходы на визы и билеты.");
    comments.push("Для путешествий можно откладывать небольшие суммы, и каждый раз, когда вы планируете новое место, откладывайте заранее!");
  } else {
    comments.push("Какая бы ни была ваша мечта, главное — идти к ней шаг за шагом!");
  }
  
  // Добавляем комментарии в список
  comments.forEach(comment => {
    const li = document.createElement('li');
    li.textContent = comment;
    commentsList.appendChild(li);
  });
}

// Функция для расчета накоплений (пример)
function calculate() {
  const income = parseFloat(document.getElementById('income').value);
  const expenses = parseFloat(document.getElementById('expenses').value);
  const savingsGoal = parseFloat(document.getElementById('savingsGoal').value);
  const months = parseInt(document.getElementById('months').value);

  // Пример расчета: сколько нужно откладывать в месяц
  const monthlySavings = (savingsGoal - (income - expenses) * months) / months;

  // Выводим результат с увеличенным шрифтом и цветом
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `Чтобы достичь своей цели, нужно откладывать ${monthlySavings.toFixed(2)} тенге в месяц.`;
  
  // Делаем результат более эмоциональным и ярким
  resultDiv.style.fontSize = '30px';
  resultDiv.style.fontWeight = 'bold';
  resultDiv.style.color = '#FF4500';  // Ярко-оранжевый цвет
}

