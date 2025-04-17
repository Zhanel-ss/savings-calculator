const fields = ['income', 'expenses', 'savingsGoal', 'months'];

// Синхронизация полей и ползунков
fields.forEach(field => {
  const input = document.getElementById(field);
  const range = document.getElementById(field + 'Range');

  input.addEventListener('input', () => {
    range.value = input.value;
  });

  range.addEventListener('input', () => {
    input.value = range.value;
  });

  // Начальная синхронизация
  range.value = input.value || 0;
});

let chart; // переменная для графика

function calculate() {
  const income = parseFloat(document.getElementById('income').value);
  const expenses = parseFloat(document.getElementById('expenses').value);
  const goal = parseFloat(document.getElementById('savingsGoal').value);
  const months = parseInt(document.getElementById('months').value);
  const dream = document.getElementById('dream').value;

  if (isNaN(income) || isNaN(expenses) || isNaN(goal) || isNaN(months)) {
    document.getElementById('result').textContent = "Пожалуйста, заполните все поля.";
    return;
  }

  const possibleMonthlySaving = income - expenses;
  const requiredMonthlySaving = goal / months;
  const totalIncome = income * months;
  const totalPossibleSavings = possibleMonthlySaving * months;
  const remainingToGoal = goal - totalPossibleSavings;

  let resultText = '';

  if (possibleMonthlySaving >= requiredMonthlySaving) {
    resultText += `🎉 Ура! Вы можете накопить на мечту — откладывайте по ${requiredMonthlySaving.toFixed(0)} ₸ в месяц.\n\n`;
  } else {
    resultText += `😞 Вам не хватает средств. Нужно откладывать ${requiredMonthlySaving.toFixed(0)} ₸ в месяц, но вы можете только ${possibleMonthlySaving.toFixed(0)} ₸.\n\n`;
  }

  resultText += `💸 Общий доход за ${months} мес: ${totalIncome.toLocaleString()} ₸\n`;
  resultText += `💰 Накопится: ${totalPossibleSavings.toLocaleString()} ₸\n`;

  if (remainingToGoal > 0) {
    resultText += `🚧 До цели не хватает: ${remainingToGoal.toLocaleString()} ₸`;
  } else {
    resultText += `🌟 Вы даже превысите цель на ${(totalPossibleSavings - goal).toLocaleString()} ₸!`;
  }

  document.getElementById('result').textContent = resultText;

  updateDreamComments(dream);
  updateChart(months, possibleMonthlySaving);
}

function updateDreamComments(dreamRaw) {
  const dream = dreamRaw.toLowerCase();
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

function updateChart(months, monthlySaving) {
  const ctx = document.getElementById('savingsChart').getContext('2d');

  const labels = Array.from({ length: months }, (_, i) => `${i + 1} мес`);
  const data = labels.map((_, i) => monthlySaving * (i + 1));

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Накопления по месяцам',
        data,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: '#4CAF50'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => value.toLocaleString() + ' ₸'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}
