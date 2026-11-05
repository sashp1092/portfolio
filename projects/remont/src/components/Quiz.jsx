import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CircleCheck } from 'lucide-react'
import { data } from '../data'
import OptionCard from './OptionCard'
import ResultForm from './ResultForm'

export default function Quiz({ onPrivacy }) {
  const { quiz } = data
  const total = quiz.steps.length
  const areaStep = quiz.steps.find((s) => s.type === 'range')
  const initial = { housing: null, repair: null, area: areaStep.defaultValue, start: null, gift: null }

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(initial)
  const [submitted, setSubmitted] = useState(false)
  const cardRef = useRef(null)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const top = cardRef.current?.getBoundingClientRect().top ?? 0
    if (top < 0) cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step, submitted])

  const isResult = step >= total
  const current = quiz.steps[step]
  const canNext = current && (current.type === 'range' || answers[current.key] !== null)
  const progress = submitted ? 100 : Math.round(((isResult ? total : step) / total) * 100)

  const setAnswer = (key, value) => setAnswers((a) => ({ ...a, [key]: value }))

  const restart = () => {
    setAnswers(initial)
    setStep(0)
    setSubmitted(false)
  }

  const areaPercent = current?.type === 'range' ? ((answers.area - current.min) / (current.max - current.min)) * 100 : 0

  return (
    <section id="quiz" aria-labelledby="quiz-title" className="scroll-mt-20 bg-paper pb-16 md:scroll-mt-24 md:pb-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div
          ref={cardRef}
          className="scroll-mt-24 rounded-3xl bg-white p-5 shadow-[0_20px_60px_-30px_rgba(26,26,26,0.25)] md:p-10"
        >
          <div className="mb-6 md:mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand">{quiz.eyebrow}</p>
            <h2 id="quiz-title" className="font-heading text-2xl font-semibold leading-tight text-balance md:text-3xl">
              {quiz.title}
            </h2>
            <p className="mt-2 text-ink/70">{quiz.subtitle}</p>
          </div>

          {!submitted && (
            <div className="mb-6">
              <div className="mb-2 flex justify-between text-sm font-medium">
                <span>{isResult ? quiz.result.title : quiz.stepLabel(step + 1, total)}</span>
                <span className="text-ink/50">{progress}%</span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-paper"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label={isResult ? quiz.result.title : quiz.stepLabel(step + 1, total)}
              >
                <div className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {submitted ? (
            <div className="animate-fade-zoom flex flex-col items-center py-10 text-center" role="status">
              <span className="flex size-20 items-center justify-center rounded-full bg-brand/10 text-brand">
                <CircleCheck className="size-10" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-heading text-2xl font-semibold md:text-3xl">{quiz.success.title}</h3>
              <p className="mt-2 text-lg text-ink/70">{quiz.success.text}</p>
              <button type="button" onClick={restart} className={`btn-secondary mt-8`}>
                {quiz.success.restart}
              </button>
            </div>
          ) : isResult ? (
            <div key="result" className="animate-slide-in">
              <ResultForm answers={answers} onSubmitted={() => setSubmitted(true)} onPrivacy={onPrivacy} />
              <button type="button" onClick={() => setStep(total - 1)} className={`btn-secondary mt-6`}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                {quiz.back}
              </button>
            </div>
          ) : (
            <>
              <fieldset key={current.key} className="animate-slide-in">
                <legend className="mb-5 font-heading text-lg font-semibold md:text-xl">{current.title}</legend>

                {current.type === 'cards' ? (
                  <div className={`grid gap-3 md:gap-4 ${current.options.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
                    {current.options.map((opt) => (
                      <OptionCard
                        key={opt.value}
                        name={current.key}
                        option={opt}
                        selected={answers[current.key] === opt.value}
                        onSelect={(v) => setAnswer(current.key, v)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-paper p-5 md:p-8">
                    <p className="text-center font-heading text-5xl font-semibold md:text-6xl" aria-hidden="true">
                      {answers.area}
                      <span className="ml-2 text-2xl text-ink/50 md:text-3xl">{quiz.areaUnit}</span>
                    </p>
                    <label htmlFor="area-range" className="sr-only">
                      {current.title}
                    </label>
                    <input
                      id="area-range"
                      type="range"
                      min={current.min}
                      max={current.max}
                      step={current.step}
                      value={answers.area}
                      onChange={(e) => setAnswer('area', Number(e.target.value))}
                      aria-valuetext={`${answers.area} ${quiz.areaUnit}`}
                      className="range-brand mt-8 h-11 w-full cursor-pointer"
                      style={{ '--fill': `${areaPercent}%` }}
                    />
                    <div className="mt-1 flex justify-between text-sm text-ink/50">
                      <span>
                        {current.min} {quiz.areaUnit}
                      </span>
                      <span>
                        {current.max} {quiz.areaUnit}
                      </span>
                    </div>
                    <p className="mt-4 text-center text-sm text-ink/60">{current.hint}</p>
                  </div>
                )}
              </fieldset>

              <div className="mt-6 flex gap-3 md:mt-8">
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 0}
                  className={`btn-secondary disabled:pointer-events-none disabled:opacity-40`}
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {quiz.back}
                </button>
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext}
                  className={`btn-primary flex-1 sm:flex-none sm:px-10`}
                >
                  {step === total - 1 ? quiz.toResult : quiz.next}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
