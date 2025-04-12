import React from "react";
import { notFound } from "next/navigation";
import StudyGuideView from "@/components/content-views/study-guide/StudyGuideView";
import FlashcardView from "@/components/content-views/flashcards/FlashcardView";
import QuizView from "@/components/content-views/quiz/QuizView";
import AudioView from "@/components/content-views/audio/AudioView";
import SummaryView from "@/components/content-views/summary/SummaryView";

// In a real application, this would come from an API
// This is just mock data for demonstration purposes
const getContentById = (id: string) => {
  // Mock content database
  const contentItems = [
    {
      id: 1,
      type: "Study Guide",
      title: "Physics Study Guide",
      description: "Comprehensive notes on Newton's Laws of Motion",
      course: "Introduction to Physics",
      created: "2 days ago",
      sections: [
        {
          id: "section-1",
          title: "Newton's First Law of Motion",
          content: "<p>Newton's First Law of Motion states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force.</p><p>This property of objects to resist changes in their state of motion is called <strong>inertia</strong>. The mass of an object is a measure of its inertia.</p><h3>Examples:</h3><ul><li>A book resting on a table remains at rest.</li><li>A moving car tends to continue moving unless brakes are applied.</li><li>Passengers in a car feel pushed back when the car accelerates forward (due to inertia).</li></ul>"
        },
        {
          id: "section-2",
          title: "Newton's Second Law of Motion",
          content: "<p>Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p><p>This is expressed mathematically as: <strong>F = ma</strong>, where:</p><ul><li>F is the net force acting on the object (in Newtons, N)</li><li>m is the mass of the object (in kilograms, kg)</li><li>a is the acceleration of the object (in meters per second squared, m/s²)</li></ul><p>This law enables us to calculate the force needed to accelerate an object of known mass, or to determine the mass of an object experiencing a known force and acceleration.</p>"
        },
        {
          id: "section-3",
          title: "Newton's Third Law of Motion",
          content: "<p>Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction.</p><p>When one object exerts a force on another object, the second object exerts an equal and opposite force on the first object. These forces always:</p><ul><li>Act on different objects</li><li>Are equal in magnitude</li><li>Act in opposite directions</li></ul><h3>Examples:</h3><ol><li>When a bird flies, it pushes air downward (action), and the air pushes the bird upward (reaction).</li><li>When a swimmer pushes water backward (action), the water pushes the swimmer forward (reaction).</li><li>When a rocket expels gas downward (action), the gas pushes the rocket upward (reaction).</li></ol>"
        }
      ],
    },
    {
      id: 2,
      type: "Audio",
      title: "Math Concepts Podcast",
      description: "Audio explanation of differential equations",
      course: "Advanced Mathematics",
      created: "3 days ago",
      audioUrl: "https://example.com/sample-audio.mp3", // This would be a real URL in production
      duration: 1245, // 20:45 in seconds
      transcript: "Welcome to this podcast on differential equations. Today we'll explore the fundamental concepts behind these powerful mathematical tools.\n\nA differential equation is an equation that relates a function with its derivatives. In simpler terms, it describes how a quantity changes in relation to other variables.\n\nFor example, Newton's second law of motion, F = ma, can be written as a differential equation where the acceleration is the second derivative of position with respect to time.\n\nDifferential equations are categorized in several ways. They can be ordinary or partial, linear or non-linear, and first-order or higher-order.\n\nIn the next section, we'll work through some examples of solving first-order differential equations.",
      chapters: [
        {
          id: "chapter-1",
          title: "Introduction to Differential Equations",
          startTime: 0,
          endTime: 300
        },
        {
          id: "chapter-2",
          title: "Types of Differential Equations",
          startTime: 300,
          endTime: 720
        },
        {
          id: "chapter-3",
          title: "Solving First-Order Equations",
          startTime: 720,
          endTime: 1245
        }
      ]
    },
    {
      id: 3,
      type: "Flashcards",
      title: "Chemistry Flashcards",
      description: "Key terms and concepts for organic compounds",
      course: "Chemistry 101",
      created: "4 days ago",
      flashcards: [
        {
          id: "card-1",
          front: "<p>What is an alkane?</p>",
          back: "<p>Alkanes are saturated hydrocarbons with single bonds between carbon atoms. The general formula is C<sub>n</sub>H<sub>2n+2</sub>.</p><p>Examples include methane (CH<sub>4</sub>), ethane (C<sub>2</sub>H<sub>6</sub>), and propane (C<sub>3</sub>H<sub>8</sub>).</p>"
        },
        {
          id: "card-2",
          front: "<p>What is an alkene?</p>",
          back: "<p>Alkenes are unsaturated hydrocarbons containing at least one carbon-carbon double bond. The general formula is C<sub>n</sub>H<sub>2n</sub>.</p><p>Examples include ethene (C<sub>2</sub>H<sub>4</sub>) and propene (C<sub>3</sub>H<sub>6</sub>).</p>"
        },
        {
          id: "card-3",
          front: "<p>What is an alkyne?</p>",
          back: "<p>Alkynes are unsaturated hydrocarbons containing at least one carbon-carbon triple bond. The general formula is C<sub>n</sub>H<sub>2n-2</sub>.</p><p>Examples include ethyne (C<sub>2</sub>H<sub>2</sub>, also known as acetylene) and propyne (C<sub>3</sub>H<sub>4</sub>).</p>"
        },
        {
          id: "card-4",
          front: "<p>What is functional group isomerism?</p>",
          back: "<p>Functional group isomerism occurs when compounds have the same molecular formula but different functional groups.</p><p>Example: C<sub>3</sub>H<sub>6</sub>O could be propanol (containing -OH group) or propanal (containing -CHO group).</p>"
        }
      ]
    },
    {
      id: 4,
      type: "Quiz",
      title: "Physics Practice Quiz",
      description: "Test your knowledge of mechanics and forces",
      course: "Introduction to Physics",
      created: "1 week ago",
      questions: [
        {
          id: "q1",
          question: "Which of Newton's laws states that for every action, there is an equal and opposite reaction?",
          options: [
            { id: "q1a", text: "Newton's First Law", isCorrect: false },
            { id: "q1b", text: "Newton's Second Law", isCorrect: false },
            { id: "q1c", text: "Newton's Third Law", isCorrect: true },
            { id: "q1d", text: "Newton's Law of Gravitation", isCorrect: false }
          ],
          explanation: "Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction. This means that if object A exerts a force on object B, then object B exerts an equal force in the opposite direction on object A.",
          type: "multiple-choice"
        },
        {
          id: "q2",
          question: "A book is resting on a table. Which forces are acting on the book?",
          options: [
            { id: "q2a", text: "Only gravity", isCorrect: false },
            { id: "q2b", text: "Only the normal force from the table", isCorrect: false },
            { id: "q2c", text: "Both gravity and the normal force from the table", isCorrect: true },
            { id: "q2d", text: "No forces are acting on the book because it's at rest", isCorrect: false }
          ],
          explanation: "There are two forces acting on the book: the gravitational force pulling down, and the normal force from the table pushing up. These forces are equal in magnitude but opposite in direction, resulting in zero net force on the book, which is why it remains at rest.",
          type: "multiple-choice"
        },
        {
          id: "q3",
          question: "According to Newton's Second Law, how is force related to mass and acceleration?",
          options: [
            { id: "q3a", text: "F = m/a", isCorrect: false },
            { id: "q3b", text: "F = ma", isCorrect: true },
            { id: "q3c", text: "F = m+a", isCorrect: false },
            { id: "q3d", text: "F = m-a", isCorrect: false }
          ],
          explanation: "Newton's Second Law states that force equals mass multiplied by acceleration (F = ma). This means that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
          type: "multiple-choice"
        }
      ]
    },
    {
      id: 5,
      type: "Study Guide",
      title: "Math Problem Solutions",
      description: "Step-by-step solutions to complex problems",
      course: "Advanced Mathematics",
      created: "1 week ago",
      sections: [
        {
          id: "problem-1",
          title: "Solving Quadratic Equations",
          content: "<p>Problem: Solve the quadratic equation x² - 5x + 6 = 0</p><p>Solution: We can use the quadratic formula:</p><p>x = (-b ± √(b² - 4ac)) / 2a</p><p>Where a = 1, b = -5, and c = 6</p><p>x = (5 ± √(25 - 24)) / 2</p><p>x = (5 ± √1) / 2</p><p>x = (5 ± 1) / 2</p><p>x = 3 or x = 2</p><p>Therefore, the solutions are x = 2 and x = 3</p>"
        },
        {
          id: "problem-2",
          title: "Solving Systems of Linear Equations",
          content: "<p>Problem: Solve the system of equations:</p><p>2x + y = 7</p><p>x - y = 1</p><p>Solution: We can use the substitution method.</p><p>From the second equation, we get x - y = 1, so x = y + 1</p><p>Substituting this into the first equation:</p><p>2(y + 1) + y = 7</p><p>2y + 2 + y = 7</p><p>3y + 2 = 7</p><p>3y = 5</p><p>y = 5/3</p><p>Now we can find x by substituting y = 5/3 back into x = y + 1:</p><p>x = 5/3 + 1 = 5/3 + 3/3 = 8/3</p><p>Therefore, the solution is x = 8/3 and y = 5/3</p>"
        }
      ]
    },
    {
      id: 6,
      type: "Summary",
      title: "Chemistry Concepts Summary",
      description: "Concise overview of key chemistry principles",
      course: "Chemistry 101",
      created: "2 weeks ago",
      overview: "<p>This summary provides a concise overview of fundamental chemistry concepts that are essential for understanding chemical reactions, bonding, and properties of matter. Each key point highlights a critical aspect of chemistry that forms the foundation for more advanced studies.</p>",
      keyPoints: [
        {
          id: "kp1",
          title: "Atomic Structure",
          content: "<p>Atoms consist of a nucleus containing protons and neutrons, surrounded by electrons in energy levels or shells. The number of protons (atomic number) determines the element. Isotopes are atoms of the same element with different numbers of neutrons. Electrons occupy orbitals according to quantum mechanical principles, following the Aufbau principle, Pauli exclusion principle, and Hund's rule.</p>"
        },
        {
          id: "kp2",
          title: "Chemical Bonding",
          content: "<p>Chemical bonds form to achieve a more stable electron configuration. Ionic bonds result from electron transfer between elements with large electronegativity differences. Covalent bonds involve electron sharing between elements with similar electronegativity. Polar covalent bonds form when shared electrons are unequally distributed. Metallic bonds consist of metal cations in a 'sea' of delocalized electrons.</p>"
        },
        {
          id: "kp3",
          title: "Stoichiometry",
          content: "<p>Stoichiometry is the calculation of reactants and products in chemical reactions based on the law of conservation of mass. It involves using balanced chemical equations to determine mole ratios, which can then be converted to mass or volume relationships. Limiting reactants determine the maximum amount of product that can be formed in a reaction.</p>"
        },
        {
          id: "kp4",
          title: "Thermodynamics",
          content: "<p>Chemical thermodynamics deals with energy transfers in chemical reactions. Enthalpy (H) represents the heat content of a system. Entropy (S) measures molecular disorder. Gibbs free energy (G) combines enthalpy and entropy to determine reaction spontaneity. Exothermic reactions release energy (negative ΔH), while endothermic reactions absorb energy (positive ΔH).</p>"
        }
      ]
    }
  ];

  const content = contentItems.find(item => item.id === parseInt(id));
  if (!content) return null;
  
  // Add related content
  const relatedContent = contentItems
    .filter(item => item.id !== parseInt(id) && item.course === content.course)
    .map(({ id, title, description, type, course, created }) => ({
      id, title, description, type, course, created
    }));
  
  return { ...content, relatedContent };
};

interface ContentPageProps {
  params: {
    id: string;
  };
}

export default function ContentPage({ params }: ContentPageProps) {
  const content = getContentById(params.id);
  
  if (!content) {
    return notFound();
  }
  
  // Render the appropriate view based on content type
  switch (content.type) {
    case "Study Guide":
      return <StudyGuideView {...content} id={content.id} />;
    case "Flashcards":
      return <FlashcardView {...content} id={content.id} />;
    case "Quiz":
      return <QuizView {...content} id={content.id} />;
    case "Audio":
      return <AudioView {...content} id={content.id} />;
    case "Summary":
      return <SummaryView {...content} id={content.id} />;
    default:
      return notFound();
  }
}
