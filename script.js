// Contador de puntos inicial
let availablePoints = 21;

// Función para ajustar puntos
function adjustPoints(attributeId, change) {
  const input = document.getElementById(attributeId);
  let currentValue = parseInt(input.value);

  // Validar límites
  if (currentValue + change < 1 || currentValue + change > 5) return;

  // Actualizar puntos disponibles
  if ((availablePoints - change >= 0 && change > 0) || (change < 0)) {
    availablePoints -= change;
    input.value = currentValue + change;
    document.getElementById("points").textContent = availablePoints;
  }
}

// Función para generar el personaje
function generateCharacter() {
  // Verificar si quedan puntos disponibles
  if (availablePoints > 0) {
    alert("Aún tienes puntos disponibles. Asigna todos los puntos antes de generar el personaje.");
    return;
  }

  // Obtener valores del formulario
  const clan = document.getElementById("clan").value;
  const generation = document.getElementById("generation").value;

  const strength = document.getElementById("strength").value;
  const dexterity = document.getElementById("dexterity").value;
  const stamina = document.getElementById("stamina").value;

  const charisma = document.getElementById("charisma").value;
  const manipulation = document.getElementById("manipulation").value;
  const appearance = document.getElementById("appearance").value;

  const perception = document.getElementById("perception").value;
  const intelligence = document.getElementById("intelligence").value;
  const wits = document.getElementById("wits").value;

  const skill1 = document.getElementById("skill1").value;
  const skill2 = document.getElementById("skill2").value;
  const skill3 = document.getElementById("skill3").value;

  // Mostrar resultados
  document.getElementById("resultClan").textContent = clan;
  document.getElementById("resultGeneration").textContent = generation;

  document.getElementById("resultStrength").textContent = strength;
  document.getElementById("resultDexterity").textContent = dexterity;
  document.getElementById("resultStamina").textContent = stamina;

  document.getElementById("resultCharisma").textContent = charisma;
  document.getElementById("resultManipulation").textContent = manipulation;
  document.getElementById("resultAppearance").textContent = appearance;

  document.getElementById("resultPerception").textContent = perception;
  document.getElementById("resultIntelligence").textContent = intelligence;
  document.getElementById("resultWits").textContent = wits;

  document.getElementById("resultSkill1").textContent = skill1;
  document.getElementById("resultSkill2").textContent = skill2;
  document.getElementById("resultSkill3").textContent = skill3;

  // Mostrar la sección de resultados
  document.getElementById("result").classList.remove("hidden");
}

// Función para sugerir Disciplinas usando IA
async function suggestDisciplines(clan) {
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TU_API_KEY'
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Sugiere Disciplinas adecuadas para un vampiro del clan ${clan} en Vampiro: La Mascarada.`,
        max_tokens: 50
      })
    });

    const data = await response.json();
    const disciplines = data.choices[0].text.trim();
    alert(`Disciplinas sugeridas para el clan ${clan}: ${disciplines}`);
  } catch (error) {
    console.error("Error al conectar con la API de OpenAI:", error);
    alert("No se pudieron obtener sugerencias de Disciplinas. Inténtalo más tarde.");
  }
}

// Llamar a suggestDisciplines cuando se selecciona un clan
document.getElementById("clan").addEventListener("change", function () {
  const selectedClan = this.value;
  if (selectedClan) {
    suggestDisciplines(selectedClan);
  }
}); 
// Función para sugerir Disciplinas usando IA
async function suggestDisciplines(clan) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer TU_API_KEY' // Reemplaza "TU_API_KEY" con tu clave válida
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Modelo de OpenAI
          messages: [
            {
              role: "user",
              content: `Sugiere Disciplinas adecuadas para un vampiro del clan ${clan} en Vampiro: La Mascarada. Proporciona una breve descripción de cada Disciplina.`
            }
          ]
        })
      });
  
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const disciplines = data.choices[0].message.content.trim();
        alert(`Disciplinas sugeridas para el clan ${clan}:\n\n${disciplines}`);
      } else {
        alert("No se pudieron obtener sugerencias de Disciplinas. Inténtalo más tarde.");
      }
    } catch (error) {
      console.error("Error al conectar con la API de OpenAI:", error);
      alert("No se pudieron obtener sugerencias de Disciplinas. Inténtalo más tarde.");
    }
  }
  
  // Llamar a suggestDisciplines cuando se selecciona un clan
  document.getElementById("clan").addEventListener("change", function () {
    const selectedClan = this.value;
    if (selectedClan) {
      suggestDisciplines(selectedClan);
    }
  });