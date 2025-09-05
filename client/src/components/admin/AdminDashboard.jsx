import SEO from '../../components/ui/SEO'
import Dashboard from '../../components/admin/Dashboard'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const AdminDashboard = () => {
  useDocumentTitle('Admin Dashboard')

  return (
    <>
      <SEO title="Admin Dashboard" noIndex />
      <Dashboard />
    </>
  )
}

export default AdminDashboard
