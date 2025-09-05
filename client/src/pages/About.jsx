import SEO from '../components/ui/SEO'
import Card from '../components/ui/Card'
import useDocumentTitle from '../hooks/useDocumentTitle'

const About = () => {
  useDocumentTitle('About')

  return (
    <>
      <SEO 
        title="About" 
        description="Learn more about my background, experience, and passion for web development."
      />
      
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              About Me
            </h1>
            
            <Card className="mb-8">
              <p className="text-lg text-gray-600 mb-6">
                Welcome to my portfolio! I'm a passionate full-stack developer with over 3 years 
                of experience creating modern web applications. My journey in web development 
                started with a curiosity about how websites work, and it has evolved into a 
                career focused on building user-centric solutions.
              </p>
              
              <p className="text-lg text-gray-600 mb-6">
                I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) and enjoy 
                working on both frontend and backend development. My goal is to create applications 
                that not only look great but also provide excellent user experiences and perform 
                efficiently at scale.
              </p>
              
              <p className="text-lg text-gray-600">
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing my knowledge through technical writing and 
                mentoring fellow developers.
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <h3 className="text-xl font-semibold mb-4">What I Do</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Full-stack web development</li>
                  <li>• React & Next.js applications</li>
                  <li>• Node.js & Express API development</li>
                  <li>• MongoDB & database design</li>
                  <li>• UI/UX implementation</li>
                  <li>• Performance optimization</li>
                </ul>
              </Card>
              
              <Card>
                <h3 className="text-xl font-semibold mb-4">My Values</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Clean, maintainable code</li>
                  <li>• User-centered design</li>
                  <li>• Continuous learning</li>
                  <li>• Collaborative teamwork</li>
                  <li>• Attention to detail</li>
                  <li>• Delivering quality solutions</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
