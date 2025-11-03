import { useState, useEffect } from 'react'
import Form from '../components/Form'
import PlanCard from '../components/PlanCard'

export default function Home() {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const s = document.createElement('script')
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
    s.async = true
    document.body.appendChild(s)
    return () => { document.body.removeChild(s) }
  }, [])

  async function handleGenerate(data) {
    setLoading(true)
    const generated = generatePlan(data)
    await new Promise(r => setTimeout(r, 700)) 
    setPlan(generated)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">💪 AI Fitness Coach</h1>
        <Form onGenerate={handleGenerate} loading={loading} />
        {plan && <PlanCard plan={plan} />}
        <footer className="mt-8 text-sm opacity-80">
          This app currently uses a mocked generator. Replace <code>generatePlan</code> with your LLM API call.
        </footer>
      </div>
    </div>
  )
}

function bmiCategory(heightCm, weightKg) {
  const h = heightCm / 100
  const bmi = weightKg / (h * h)
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

function generatePlan(data) {
  const { name, age, gender, height, weight, goal, level, location, diet } = data
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1)
  const category = bmiCategory(Number(height), Number(weight))

  const workouts = {
    Beginner: [
      { day: 'Day 1', items: ['Bodyweight Squat - 3x12', 'Incline Push-up - 3x10', 'Plank - 3x30s'] },
      { day: 'Day 2', items: ['Rest / Light Walk 20 min'] },
      { day: 'Day 3', items: ['Lunges - 3x10 each', 'Bent-over Row (band) - 3x12', 'Glute Bridge - 3x15'] },
      { day: 'Day 4', items: ['Rest / Mobility'] },
      { day: 'Day 5', items: ['Chair Dips - 3x10', 'Step-ups - 3x12', 'Side Plank - 3x20s each'] },
    ],
    Intermediate: [
      { day: 'Day 1', items: ['Barbell Squat - 4x8', 'Bench Press - 4x8', 'Deadlift (light) - 3x5'] },
      { day: 'Day 2', items: ['Cardio 25-30 min'] },
      { day: 'Day 3', items: ['Overhead Press - 4x8', 'Pull-ups - 4x6', 'Core Circuit'] },
      { day: 'Day 4', items: ['Cardio or Active Recovery'] },
      { day: 'Day 5', items: ['Leg Accessory & Conditioning'] },
    ],
    Advanced: [
      { day: 'Day 1', items: ['Heavy Squat - 5x5', 'Accessory Quad Work', 'Core'] },
      { day: 'Day 2', items: ['Speed Work / Conditioning'] },
      { day: 'Day 3', items: ['Heavy Bench - 5x5', 'Upper Back Work'] },
      { day: 'Day 4', items: ['Conditioning'] },
      { day: 'Day 5', items: ['Olympic Lift Practice / Power'] },
    ],
  }

  const mealTemplates = {
    Veg: ['Oats + Fruit', 'Chickpea Salad + Quinoa', 'Paneer Stir-fry + Brown Rice', 'Greek Yogurt + Nuts'],
    'Non-Veg': ['Egg-white Omelette + Toast', 'Grilled Chicken Salad', 'Fish + Veggies + Brown Rice', 'Cottage Cheese + Fruit'],
    Vegan: ['Smoothie Bowl', 'Tofu Stir-fry + Quinoa', 'Lentil Curry + Rice', 'Fruit & Nuts'],
    Keto: ['Eggs + Avocado', 'Salad + Grilled Chicken', 'Cheese + Veggies', 'Keto Shake'],
  }

  const workoutsForLevel = workouts[level] || workouts['Beginner']
  const meals = mealTemplates[diet] || mealTemplates['Veg']

  const tips = [
    "Stay consistent — small steps compound.",
    "Prioritize protein and sleep for recovery.",
    "Hydrate well: aim for 2–3L daily.",
    "Warm up 5–7 minutes before workouts.",
  ]

  return {
    meta: { name, age, gender, height, weight, bmi, category, goal, level, location, diet },
    workouts: workoutsForLevel,
    meals: {
      breakfast: meals[0],
      lunch: meals[1],
      dinner: meals[2],
      snacks: meals[3],
    },
    tips,
    generatedAt: new Date().toISOString(),
  }
}
