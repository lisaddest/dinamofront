import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Actividades.css';

function Actividades() {
  const { id } = useParams();
  const navigate = useNavigate();

  const activities = [
    // Nivel 1: Introducción al ahorro (Respuesta libre)
    {
      title: "Introducción al ahorro",
      difficulty: 1,
      question: "¿Qué es el ahorro y por qué es importante?",
      type: 'input', // tipo de actividad
      correctAnswer: 'El ahorro es reservar una parte de tus ingresos para necesidades futuras o emergencias.',
    },
    // Nivel 2: Crear un presupuesto (Emparejar)
    {
      title: "Crear un presupuesto",
      difficulty: 2,
      question: "Empareja las categorías de un presupuesto con sus descripciones:",
      type: 'matching',
      options: {
        categories: ['Ingresos', 'Ahorro', 'Gastos', 'Deudas'],
        descriptions: [
          'El dinero que ingresas mensualmente.',
          'El dinero que se guarda para emergencias o metas.',
          'El dinero que gastas en cosas como comida, servicios y entretenimiento.',
          'El dinero que debes pagar a otras personas o entidades.',
        ],
      },
      correctAnswer: {
        'Ingresos': 'El dinero que ingresas mensualmente.',
        'Ahorro': 'El dinero que se guarda para emergencias o metas.',
        'Gastos': 'El dinero que gastas en cosas como comida, servicios y entretenimiento.',
        'Deudas': 'El dinero que debes pagar a otras personas o entidades.',
      },
    },
    // Nivel 3: Control de ingresos y gastos (Llenar espacios en blanco)
    {
      title: "Control de ingresos y gastos",
      difficulty: 3,
      question: "Completa la frase: El control de ___________ y ___________ es esencial para mantener una buena salud financiera.",
      type: 'fill-in-the-blank',
      correctAnswer: ['ingresos', 'gastos'],
    },
    // Nivel 4: Fondo de emergencia (Selección múltiple)
    {
      title: "Fondo de emergencia",
      difficulty: 4,
      question: "¿Cuánto deberías tener en tu fondo de emergencia?",
      type: 'multiple-choice',
      options: [
        'Tres meses de tus ingresos.',
        'Seis meses de tus ingresos.',
        'Un año de tus ingresos.',
        'Solo lo que puedas ahorrar en el mes.',
      ],
      correctAnswer: 'Seis meses de tus ingresos.',
    },
    // Nivel 5: Crédito y deudas (Pregunta abierta)
    {
      title: "Crédito y deudas",
      difficulty: 5,
      question: "Explica brevemente cómo puedes manejar una deuda de manera responsable.",
      type: 'input',
      correctAnswer: 'Puedes manejar una deuda de manera responsable pagando más del mínimo, evitando acumular más deudas y manteniendo un presupuesto adecuado.',
    },
    // Nivel 6: Inversiones básicas (Emparejar)
    {
      title: "Inversiones básicas",
      difficulty: 6,
      question: "Empareja los tipos de inversiones con sus características:",
      type: 'matching',
      options: {
        investments: ['Acciones', 'Bonos', 'Bienes raíces', 'Fondos mutuos'],
        descriptions: [
          'Inversión en propiedades físicas como casas o terrenos.',
          'Inversión en instrumentos financieros emitidos por gobiernos o empresas.',
          'Inversión en un conjunto de activos gestionados por expertos.',
          'Inversión en la compra de participaciones en empresas.',
        ],
      },
      correctAnswer: {
        'Acciones': 'Inversión en la compra de participaciones en empresas.',
        'Bonos': 'Inversión en instrumentos financieros emitidos por gobiernos o empresas.',
        'Bienes raíces': 'Inversión en propiedades físicas como casas o terrenos.',
        'Fondos mutuos': 'Inversión en un conjunto de activos gestionados por expertos.',
      },
    },
  ];

  const activity = activities[parseInt(id) - 1];

  const [answer, setAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filledAnswers, setFilledAnswers] = useState(['', '']);

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (activity.type) {
      case 'input':
        if (answer.toLowerCase() === activity.correctAnswer.toLowerCase()) {
          setIsCompleted(true);
        } else {
          alert('Respuesta incorrecta, intenta de nuevo.');
        }
        break;
      case 'matching':
        if (JSON.stringify(selectedOptions) === JSON.stringify(Object.entries(activity.correctAnswer))) {
          setIsCompleted(true);
        } else {
          alert('Respuestas incorrectas, intenta de nuevo.');
        }
        break;
      case 'fill-in-the-blank':
        if (filledAnswers.every((ans, i) => ans.toLowerCase() === activity.correctAnswer[i].toLowerCase())) {
          setIsCompleted(true);
        } else {
          alert('Respuestas incorrectas, intenta de nuevo.');
        }
        break;
      case 'multiple-choice':
        if (selectedOptions === activity.correctAnswer) {
          setIsCompleted(true);
        } else {
          alert('Respuesta incorrecta, intenta de nuevo.');
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="actividad-container">
      <h1>{activity.title}</h1>
      <p>¡Nivel {activity.difficulty}! Responde correctamente para avanzar.</p>
      <p>{activity.question}</p>

      <form onSubmit={handleSubmit}>
        {activity.type === 'input' && (
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Escribe tu respuesta aquí"
          />
        )}

        {activity.type === 'matching' && (
          <div className="matching-game">
            {activity.options.categories.map((category, idx) => (
              <div key={idx} className="matching-item">
                <select
                  onChange={(e) => {
                    const newOptions = [...selectedOptions];
                    newOptions[idx] = { category, description: e.target.value };
                    setSelectedOptions(newOptions);
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {activity.options.descriptions.map((desc, i) => (
                    <option key={i} value={desc}>
                      {desc}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {activity.type === 'fill-in-the-blank' && (
          <div className="fill-in-blank">
            <input
              type="text"
              value={filledAnswers[0]}
              onChange={(e) => setFilledAnswers([e.target.value, filledAnswers[1]])}
              placeholder="Primer espacio"
            />
            <input
              type="text"
              value={filledAnswers[1]}
              onChange={(e) => setFilledAnswers([filledAnswers[0], e.target.value])}
              placeholder="Segundo espacio"
            />
          </div>
        )}

        {activity.type === 'multiple-choice' && (
          <div className="multiple-choice">
            {activity.options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name="answer"
                  value={option}
                  onChange={(e) => setSelectedOptions(e.target.value)}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        )}

        <button type="submit">Enviar Respuesta</button>
      </form>

      {isCompleted && (
        <div className="completion-message">
          ¡Has completado el nivel! ¡Bien hecho!
          <button onClick={() => navigate(`/actividad/${parseInt(id) + 1}`)}>
            Ir al siguiente nivel
          </button>
        </div>
      )}
    </div>
  );
}

export default Actividades;
