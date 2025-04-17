function syncSlider(field) {
  document.getElementById(field + 'Range').value = document.getElementById(field).value;
}

function syncInput(field) {
  document.getElementById(field).value = document.getElementById(field + 'Range').value;
}

function calculate() {
  const income = parseFloat(document.getElementById('income').value);
  const expenses = parseFloat(document.getElementById('expenses').value);
  const goal = parseFloat(document.getElementById('savingsGoal').value);
  const months = parseInt(document.getElementById('months').value);

  if (isNaN(income) || isNaN(expenses) || isNaN(goal) || isNaN(months)) {
    document.getElementById('result').textContent = "Пожалуйста, заполните все поля.";
    return;
  }

  const possibleMonthlySaving = income - expenses;
  const requiredMonthlySaving = goal / months;

  let resultText = '';

  if (possibleMonthlySaving >= requiredMonthlySaving) {
    resultText = `🎉 Вы можете достичь цели! Откладывайте по ${requiredMonthlySaving.toFixed(0)} ₸ в месяц.`;
  } else {
    resultText = `⚠ Недостаточно средств. Нужно откладывать ${requiredMonthlySaving.toFixed(0)} ₸, но вы можете только ${possibleMonthlySaving.toFixed(0)} ₸.`;
  }

  document.getElementById('result').textContent = resultText;
}

function updateDreamComments() {
  const dream = document.getElementById('dream').value.toLowerCase();
  const commentsList = document.getElementById('commentsList');
  commentsList.innerHTML = '';

  let comments = [];

  if (dream.includes('дом')) {
    comments = [
      "🏡 Дом — это серьезная цель. Начните с подушки безопасности.",
      "Не забудьте про возможные ипотечные проценты и ремонт."
    ];
  } else if (dream.includes('путешеств')) {
    comments = [
      "✈ Путешествие — отличная мотивация!",
      "Заранее ищите акции на билеты и жилье — можно много сэкономить."
    ];
  } else if (dream.includes('машин')) {
    comments = [
      "🚗 Крутая цель! Учитывайте также расходы на страховку и обслуживание.",
      "Машина — это не только покупка, но и регулярные расходы."
    ];
  } else if (dream.length > 3) {
    comments = [
      "✨ Ваша мечта вдохновляет!",
      "Начните уже сегодня — шаг за шагом, и вы дойдете."
    ];
  }

  comments.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    commentsList.appendChild(li);
  });
}
