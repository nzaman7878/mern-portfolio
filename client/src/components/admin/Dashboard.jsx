import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FolderOpen, 
  Zap, 
  Timeline, 
  MessageSquare,
  Plus,
  TrendingUp
} from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Loading from '../ui/Loading'
import { dashboardAdmin } from '../../services/adminService'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardAdmin.getStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loading text="Loading dashboard..." />
      </div>
    )
  }

  const statCards = [
    {
      title: 'Projects',
      value: stats?.projects?.total || 0,
      subtitle: `${stats?.projects?.published || 0} published`,
      icon: FolderOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      link: '/admin/projects'
    },
    {
      title: 'Skills',
      value: stats?.skills?.total || 0,
      subtitle: `${stats?.skills?.featured || 0} featured`,
      icon: Zap,
      color: 'text-green-600',
      bg: 'bg-green-100',
      link: '/admin/skills'
    },
    {
      title: 'Timeline',
      value: stats?.timeline?.total || 0,
      subtitle: `${stats?.timeline?.current || 0} current`,
      icon: Timeline,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      link: '/admin/timeline'
    },
    {
      title: 'Messages',
      value: stats?.messages?.total || 0,
      subtitle: `${stats?.messages?.unread || 0} unread`,
      icon: MessageSquare,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      link: '/admin/messages'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
        <Button
          as={Link}
          to="/admin/projects/new"
          className="inline-flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <Link to={stat.link} className="block">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {stat.subtitle}
                    </p>
                  </div>
                  <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </Link>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              as={Link}
              to="/admin/projects/new"
              variant="outline"
              className="w-full justify-start"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Project
            </Button>
            <Button
              as={Link}
              to="/admin/skills/new"
              variant="outline"
              className="w-full justify-start"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Skill
            </Button>
            <Button
              as={Link}
              to="/admin/timeline/new"
              variant="outline"
              className="w-full justify-start"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Timeline Entry
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center text-gray-600">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              <span>Portfolio views increased by 15% this week</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
              <span>3 new contact messages received</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FolderOpen className="h-4 w-4 mr-2 text-purple-500" />
              <span>Last project updated 2 days ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
