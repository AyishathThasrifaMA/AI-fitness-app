export default function PlanCard({ plan }) {
  const { meta, workouts, meals, tips, generatedAt } = plan

  function exportPDF() {
    // use html2pdf (loaded from CDN in index) to export the plan element
    const el = document.getElementById('plan-to-export')
    if (!el) return alert('Export element not found')
    // html2pdf usage
    // global html2pdf available via script tag in index
    // options can be adjusted in real app
    window.html2pdf().from(el).save(`${meta.name || 'plan'}-fitness-plan.pdf`)
  }

  function speak(text) {
    // placeholder - integrate ElevenLabs or other TTS via server-side API
    alert('TTS placeholder:\n' + text.slice(0, 200) + '... (Replace with ElevenLabs integration)')
  }

  function generateImagePrompt(item) {
    const prompt = `${item} exercise demonstration, realistic photo`
    alert('Image gen placeholder. Prompt:\n' + prompt + '\n(Replace with Gemini/Replicate API call)')
  }

  return (
    <div id="plan-to-export" className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold">Plan for {meta.name || 'User'}</h2>
      <p className="text-sm opacity-80">Generated: {new Date(generatedAt).toLocaleString()}</p>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">Profile</h3>
          <ul className="text-sm mt-2">
            <li>Age: {meta.age}</li>
            <li>Gender: {meta.gender}</li>
            <li>Height: {meta.height} cm</li>
            <li>Weight: {meta.weight} kg</li>
            <li>BMI: {meta.bmi} ({meta.category})</li>
            <li>Goal: {meta.goal}</li>
            <li>Level: {meta.level}</li>
            <li>Diet: {meta.diet}</li>
          </ul>

          <div className="mt-4">
            <h4 className="font-medium">Tips & Motivation</h4>
            <ul className="mt-2 text-sm">
              {tips.map((t,i) => <li key={i}>• {t}</li>)}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-medium">Diet Summary</h3>
          <ul className="text-sm mt-2">
            <li>Breakfast: {meals.breakfast}</li>
            <li>Lunch: {meals.lunch}</li>
            <li>Dinner: {meals.dinner}</li>
            <li>Snack: {meals.snacks}</li>
          </ul>

          <div className="mt-4">
            <h4 className="font-medium">Actions</h4>
            <div className="flex gap-2 mt-2">
              <button onClick={() => speak('Workout plan: ' + JSON.stringify(workouts))} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Read Workout</button>
              <button onClick={() => speak('Diet plan: ' + JSON.stringify(meals))} className="px-3 py-1 bg-yellow-600 text-white rounded text-sm">Read Diet</button>
              <button onClick={exportPDF} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Export PDF</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium">Workout Plan (sample days)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          {workouts.map((w, idx) => (
            <div key={idx} className="p-3 border rounded">
              <strong>{w.day}</strong>
              <ul className="mt-2 text-sm">
                {w.items.map((it,i) => (
                  <li key={i} className="flex justify-between">
                    <span>{it}</span>
                    <div className="flex gap-1">
                      <button onClick={() => generateImagePrompt(it)} className="text-xs px-2 py-1 bg-gray-200 rounded">Image</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
