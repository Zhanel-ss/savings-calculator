// синхронизация ввода с ползунками
const fields = ['income', 'expenses', 'savingsGoal', 'months'];

fields.forEach(field => {
  const input = document.getElementById(field);
  const range = document.getElementById(field + 'Range');

  input.addEventListener('input', () => {
    range.value = input.value;
  });

  range.addEventListener('input', () => {
    input.value = range.value;
  });
});

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
    resultText = `🎉 Ура! Вы можете накопить на мечту — откладывайте по ${requiredMonthlySaving.toFixed(0)} ₸ в месяц.`;
  } else {
    resultText = `😞 Вам не хватает средств. Нужно откладывать ${requiredMonthlySaving.toFixed(0)} ₸ в месяц, но вы можете только ${possibleMonthlySaving.toFixed(0)} ₸.`;
  }

  document.getElementById('result').textContent = resultText;
  updateDreamComments();
}

function updateDreamComments() {
  const dream = document.getElementById('dream').value.toLowerCase();
  const commentsList = document.getElementById('commentsList');
  commentsList.innerHTML = '';

  let comments = [];

  if (dream.includes('дом')) {
    comments = [
      "🏡 Дом — это круто! Начни с подушки безопасности.",
      "Рассмотри ипотеку или стройку поэтапно."
    ];
  } else if (dream.includes('путешеств')) {
    comments = [
      "✈ Путешествие — мотивация огонь!",
      "Сохраняй бонусы и акции — путешествуй дешевле."
    ];
  } else if (dream.includes('машин')) {
    comments = [
      "🚗 Удачи в покупке авто! Подумай и про обслуживание.",
      "Сравни разные модели заранее — это сэкономит много."
    ];
  } else if (dream.length > 3) {
    comments = [
      "✨ Мечта вдохновляет! Двигайся к ней шаг за шагом.",
      "Каждый тенге, который ты откладываешь — это кирпичик к цели!"
    ];
  }

  comments.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    commentsList.appendChild(li);
  });
}
