import SEO from '../components/ui/SEO'
import Card from '../components/ui/Card'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Skills = () => {
  useDocumentTitle('Skills')

  // Placeholder data - will be replaced with API data later
  const skillCategories = {
    Frontend: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 88 },
    ],
    Backend: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 85 },
      { name: 'Python', level: 75 },
      { name: 'RESTful APIs', level: 90 },
    ],
    Database: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Redis', level: 70 },
    ],
    DevOps: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Vercel/Netlify', level: 85 },
    ],
  }

  return (
    <>
      <SEO 
        title="Skills" 
        description="My technical skills and proficiency levels in various technologies including React, Node.js, MongoDB, and more."
      />
      
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Skills & Technologies
            </h1>
            
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Here are the technologies and tools I work with regularly. I'm always 
              learning and expanding my skill set to stay current with industry trends.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <Card key={category}>
                  <h3 className="text-xl font-semibold mb-6">{category}</h3>
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Skills
