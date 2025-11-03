import { useState } from 'react'

const initial = {
  name: '',
  age: 25,
  gender: 'Female',
  height: 160,
  weight: 55,
  goal: 'Weight Loss',
  level: 'Beginner',
  location: 'Home',
  diet: 'Veg'
}

export default function Form({ onGenerate, loading }) {
  const [form, setForm] = useState(initial)

  function update(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function submit(e) {
    e.preventDefault()
    onGenerate(form)
  }

  return (
    <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col">
          Name
          <input name="name" value={form.name} onChange={update} className="mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700" />
        </label>
        <label className="flex flex-col">
          Age
          <input name="age" type="number" value={form.age} onChange={update} className="mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700" />
        </label>
        <label className="flex flex-col">
          Gender
          <select name="gender" value={form.gender} onChange={update} className="mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700">
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </label>
        <label className="flex flex-col">
          Fitness Level
          <select name="level" value={form.level} onChange={update} className="mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>
        <label className="flex flex-col">
          Height (cm)
          <input name="height" type="number" value={form.height} onChange={update} className="mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700" />
        </label>
        <label className="flex flex-col">
          Weight (kg)
          <input name="weight" type="number" value={form.weight} onChange={update} className="mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700" />
        </label>
        <label className="flex flex-col">
          Goal
          <select name="goal" value={form.goal} onChange={update} className="mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700">
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Maintenance</option>
          </select>
        </label>
        <label className="flex flex-col">
          Diet Preference
          <select name="diet" value={form.diet} onChange={update} className="mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700">
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Vegan</option>
            <option>Keto</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
        <button type="button" onClick={() => { setForm(initial) }} className="px-4 py-2 bg-gray-200 rounded">
          Reset
        </button>
      </div>
    </form>
  )
}
