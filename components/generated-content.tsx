"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FileText, Download, CheckCircle, RefreshCw, ExternalLink, 
  BookOpen, ListChecks, Headphones, ChevronLeft, ChevronRight,
  ChevronUp, ChevronDown 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Different types of generated content
export type ContentType = "study-guide" | "flashcards" | "quiz" | "audio"

// Study guide content
const SAMPLE_STUDY_GUIDE_CONTENT = `
<h2>Introduction to Derivatives</h2>
<p>In calculus, a derivative measures the sensitivity to change of a function's output with respect to its input.</p>

<h3>The Concept of a Derivative</h3>
<p>The derivative of a function represents the rate of change of the function with respect to its variable. It is denoted by:</p>
<ul>
  <li>f'(x)</li>
  <li>dy/dx</li>
  <li>d/dx [f(x)]</li>
</ul>

<h3>Basic Derivative Rules</h3>
<p>Some fundamental derivative rules include:</p>

<h4>1. Constant Rule</h4>
<p>The derivative of a constant is zero: d/dx [c] = 0</p>

<h4>2. Power Rule</h4>
<p>For any real number n: d/dx [x^n] = n·x^(n-1)</p>

<h4>3. Sum Rule</h4>
<p>The derivative of a sum is the sum of derivatives: d/dx [f(x) + g(x)] = f'(x) + g'(x)</p>

<h4>4. Product Rule</h4>
<p>For two functions f(x) and g(x): d/dx [f(x)·g(x)] = f'(x)·g(x) + f(x)·g'(x)</p>

<h3>Applications of Derivatives</h3>
<p>Derivatives have numerous applications in mathematics and other fields:</p>
<ul>
  <li>Finding the slope of a curve at a specific point</li>
  <li>Determining rates of change in physical processes</li>
  <li>Optimization problems (finding maxima and minima)</li>
  <li>Approximation using linear functions (tangent lines)</li>
</ul>
`

// Flashcards sample data
const SAMPLE_FLASHCARDS_CONTENT = JSON.stringify([
  {
    term: "Derivative",
    definition: "A measure of the rate of change of a function with respect to its variable"
  },
  {
    term: "Power Rule",
    definition: "If f(x) = x^n, then f'(x) = n·x^(n-1)"
  },
  {
    term: "Chain Rule",
    definition: "If f(x) = g(h(x)), then f'(x) = g'(h(x)) · h'(x)"
  },
  {
    term: "Product Rule",
    definition: "If f(x) = g(x) · h(x), then f'(x) = g'(x) · h(x) + g(x) · h'(x)"
  },
  {
    term: "Quotient Rule",
    definition: "If f(x) = g(x)/h(x), then f'(x) = [g'(x) · h(x) - g(x) · h'(x)]/[h(x)]²"
  }
])

// Quiz sample data
const SAMPLE_QUIZ_CONTENT = JSON.stringify({
  title: "Derivatives Quiz",
  questions: [
    {
      question: "What is the derivative of f(x) = 5x³?",
      answers: ["f'(x) = 15x²", "f'(x) = 5x²", "f'(x) = 3x²", "f'(x) = 5x⁴"],
      correctAnswerIndex: 0
    },
    {
      question: "Which rule would you use to find the derivative of f(x) = sin(x²)?",
      answers: ["Power Rule", "Chain Rule", "Product Rule", "Quotient Rule"],
      correctAnswerIndex: 1
    },
    {
      question: "What is the derivative of a constant?",
      answers: ["1", "The constant itself", "0", "Undefined"],
      correctAnswerIndex: 2
    },
    {
      question: "If f(x) = 3x² + 2x, what is f'(2)?",
      answers: ["12 + 2 = 14", "6 + 2 = 8", "6 · 2 + 2 = 14", "6 · 2 + 1 = 13"],
      correctAnswerIndex: 2
    },
    {
      question: "What does the derivative represent geometrically at a point on a curve?",
      answers: [
        "The area under the curve", 
        "The slope of the tangent line", 
        "The curvature", 
        "The average rate of change"
      ],
      correctAnswerIndex: 1
    }
  ]
})

// Audio sample data
const SAMPLE_AUDIO_CONTENT = JSON.stringify({
  audioUrl: "https://example.com/audio/derivatives-explanation.mp3", // In a real app, this would be a real URL
  transcript: `
  <h3>Derivatives Explained</h3>
  <p>Welcome to this audio explanation about derivatives in calculus.</p>
  <p>A derivative is essentially a way to measure how one quantity changes with respect to another. In mathematical terms, we're looking at the rate of change of a function.</p>
  <p>Let's take a simple example: velocity. If you know the position of an object as a function of time, the derivative of that position function gives you the velocity. So derivatives have real, practical applications.</p>
  <p>The basic notation for a derivative is:</p>
  <p>- f'(x) which we read as "f prime of x"</p>
  <p>- Or dy/dx which emphasizes that we're finding the rate of change of y with respect to x.</p>
  <p>The most fundamental derivative rules include:</p>
  <p>1. The derivative of a constant is zero.</p>
  <p>2. For power functions, the power rule: the derivative of x^n is n times x^(n-1).</p>
  <p>3. For combined functions, we use the sum rule, product rule, quotient rule, and chain rule.</p>
  <p>These rules form the foundation of differential calculus and allow us to analyze rates of change in many different contexts.</p>
  `
})

interface GeneratedContentProps {
  type: ContentType
  title: string
  content: string | React.ReactNode
  onSave?: () => void
  onExport?: () => void
  onRegenerateRequest?: () => void
}

// Flashcard Component
const FlashcardComponent = ({ content }: { content: string }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  
  // Parse flashcards from content string
  // In real app, this would be properly structured data
  const flashcards = JSON.parse(content)
  
  const nextCard = () => {
    setFlipped(false)
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length)
  }
  
  const prevCard = () => {
    setFlipped(false)
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-muted-foreground mb-2">Card {currentCardIndex + 1} of {flashcards.length}</div>
      
      <div 
        className={`w-full h-60 bg-card rounded-lg border-2 cursor-pointer transition-all duration-300 transform ${flipped ? 'rotate-y-180' : ''} relative`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-lg font-medium gradient-text">{flashcards[currentCardIndex].term}</div>
          <div className="text-xs text-muted-foreground mt-2">Click to reveal answer</div>
        </div>
        
        <div className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-lg">{flashcards[currentCardIndex].definition}</div>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4">
        <Button variant="outline" size="sm" onClick={prevCard}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={nextCard}>
          Next
        </Button>
      </div>
    </div>
  )
}

// Quiz Component
const QuizComponent = ({ content }: { content: string }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({}) // questionIndex -> answerIndex
  const [quizComplete, setQuizComplete] = useState(false)
  
  // Parse quiz from content string
  const quiz = JSON.parse(content)
  
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }))
  }
  
  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setQuizComplete(true)
    }
  }
  
  const prevQuestion = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1))
  }
  
  const calculateScore = () => {
    let correct = 0
    Object.entries(selectedAnswers).forEach(([questionIdx, answerIdx]) => {
      const question = quiz.questions[parseInt(questionIdx)]
      if (question.correctAnswerIndex === answerIdx) {
        correct++
      }
    })
    return {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100)
    }
  }
  
  const retakeQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizComplete(false)
  }
  
  // Render results if quiz is complete
  if (quizComplete) {
    const score = calculateScore()
    return (
      <div className="flex flex-col items-center p-4">
        <h3 className="text-xl font-bold mb-4">Quiz Results</h3>
        
        <div className="text-3xl font-bold mb-2">{score.percentage}%</div>
        <div className="text-sm text-muted-foreground mb-6">
          You got {score.correct} out of {score.total} questions correct
        </div>
        
        <Button onClick={retakeQuiz}>Retake Quiz</Button>
      </div>
    )
  }
  
  // Render current question
  const currentQuestion = quiz.questions[currentQuestionIndex]
  return (
    <div className="flex flex-col">
      <div className="text-sm text-muted-foreground mb-2">
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </div>
      
      <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
      
      <div className="space-y-2 mb-6">
        {currentQuestion.answers.map((answer: string, idx: number) => (
          <div 
            key={idx}
            className={`p-3 rounded-md border cursor-pointer ${selectedAnswers[currentQuestionIndex] === idx ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}
            onClick={() => handleAnswerSelect(idx)}
          >
            {answer}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={nextQuestion}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
        >
          {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

// Audio Component
const AudioComponent = ({ content }: { content: string }) => {
  const [showTranscript, setShowTranscript] = useState(false)
  const audioData = JSON.parse(content)
  
  return (
    <div className="flex flex-col">
      <div className="w-full rounded-md bg-muted p-3 mb-3">
        <audio className="w-full" controls>
          <source src={audioData.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="self-start mb-3"
        onClick={() => setShowTranscript(!showTranscript)}
      >
        {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
      </Button>
      
      {showTranscript && (
        <div className="prose prose-sm dark:prose-invert max-w-none p-3 border rounded-md bg-muted/30">
          <div dangerouslySetInnerHTML={{ __html: audioData.transcript }} />
        </div>
      )}
    </div>
  )
}

function GeneratedContent({
  type,
  title,
  content,
  onSave,
  onExport,
  onRegenerateRequest,
}: GeneratedContentProps) {
  const [saved, setSaved] = useState(false)
  
  // Styles and icons based on content type
  const getContentTypeInfo = () => {
    switch (type) {
      case "study-guide":
        return {
          cssClass: "cmd-tag-study-guide",
          icon: FileText,
          label: "Study Guide"
        }
      case "flashcards":
        return {
          cssClass: "cmd-tag-flashcards",
          icon: BookOpen,
          label: "Flashcards"
        }
      case "quiz":
        return {
          cssClass: "cmd-tag-quiz",
          icon: ListChecks,
          label: "Practice Quiz"
        }
      case "audio":
        return {
          cssClass: "cmd-tag-audio",
          icon: Headphones,
          label: "Audio Explanation"
        }
    }
  }
  
  const contentInfo = getContentTypeInfo()
  const Icon = contentInfo.icon
  
  const handleSave = () => {
    onSave?.()
    setSaved(true)
    
    // Reset saved status after showing confirmation
    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }
  
  // Content type specific rendering
  const renderContent = () => {
    if (typeof content === "string") {
      switch (type) {
        case "study-guide":
          return (
            <div className="prose prose-sm dark:prose-invert max-w-none study-guide-content">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          )
        case "flashcards":
          return <FlashcardComponent content={content} />
        case "quiz":
          return <QuizComponent content={content} />
        case "audio":
          return <AudioComponent content={content} />
        default:
          return <div>{content}</div>
      }
    }
    return content
  }
  
  // Get style variables based on content type
  const getTypeStyles = () => {
    switch (type) {
      case 'study-guide':
        return {
          border: 'border-primary/20',
          headerBg: 'bg-primary/5',
          iconColor: 'text-primary'
        }
      case 'flashcards':
        return {
          border: 'border-secondary/20',
          headerBg: 'bg-secondary/5',
          iconColor: 'text-secondary'
        }
      case 'quiz':
        return {
          border: 'border-accent/20',
          headerBg: 'bg-accent/5',
          iconColor: 'text-accent'
        }
      case 'audio':
        return {
          border: 'border-amber-500/20',
          headerBg: 'bg-amber-500/5',
          iconColor: 'text-amber-500'
        }
      default:
        return {
          border: '',
          headerBg: '',
          iconColor: ''
        }
    }
  }
  
  const styles = getTypeStyles()
  
  return (
    <Card className={`w-full border ${styles.border} overflow-hidden card-gradient`}>
      <CardHeader className={`py-3 flex flex-row items-center gap-2 ${styles.headerBg}`}>
        <Icon className={`h-5 w-5 ${styles.iconColor}`} />
        <CardTitle className="text-base">{title}</CardTitle>
        <Badge className={`ml-auto ${contentInfo.cssClass}`}>{contentInfo.label}</Badge>
      </CardHeader>
      <CardContent className="p-4 max-h-[400px] overflow-y-auto">
        {renderContent()}
      </CardContent>
      <CardFooter className="flex justify-between p-3 bg-muted/50 border-t">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 h-8"
            onClick={onRegenerateRequest}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Regenerate
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 h-8"
            onClick={onExport}
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
        <Button 
          size="sm" 
          className={`flex items-center gap-1 h-8 ${saved ? 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800' : 'btn-gradient'}`}
          onClick={handleSave}
          disabled={saved}
        >
          {saved ? (
            <>
              <CheckCircle className="h-3.5 w-3.5" />
              Saved to Content Hub
            </>
          ) : (
            <>
              <ExternalLink className="h-3.5 w-3.5" />
              Save to Content Hub
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export {
  GeneratedContent,
  SAMPLE_STUDY_GUIDE_CONTENT,
  SAMPLE_FLASHCARDS_CONTENT,
  SAMPLE_QUIZ_CONTENT,
  SAMPLE_AUDIO_CONTENT
}