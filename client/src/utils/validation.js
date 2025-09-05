import * as yup from 'yup'

// Login validation schema
export const loginSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
})

// Project validation schema
export const projectSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title cannot exceed 100 characters'),
  description: yup
    .string()
    .required('Description is required')
    .max(500, 'Description cannot exceed 500 characters'),
  content: yup
    .string()
    .required('Content is required'),
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['web', 'mobile', 'desktop', 'api', 'other']),
  technologies: yup
    .array()
    .of(yup.string()),
  status: yup
    .string()
    .oneOf(['planning', 'in-progress', 'completed', 'on-hold']),
  featured: yup.boolean(),
  published: yup.boolean(),
  links: yup.object({
    live: yup.string().url('Must be a valid URL'),
    github: yup.string().url('Must be a valid URL'),
    demo: yup.string().url('Must be a valid URL')
  })
})

// Skill validation schema
export const skillSchema = yup.object({
  name: yup
    .string()
    .required('Skill name is required')
    .max(50, 'Name cannot exceed 50 characters'),
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['frontend', 'backend', 'database', 'devops', 'design', 'other']),
  proficiency: yup
    .number()
    .required('Proficiency is required')
    .min(1, 'Proficiency must be at least 1')
    .max(10, 'Proficiency cannot exceed 10'),
  experience: yup
    .string()
    .oneOf(['beginner', 'intermediate', 'advanced', 'expert']),
  yearsOfExperience: yup
    .number()
    .min(0, 'Years of experience cannot be negative'),
  featured: yup.boolean(),
  published: yup.boolean()
})

// Timeline validation schema
export const timelineSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title cannot exceed 100 characters'),
  company: yup
    .string()
    .max(80, 'Company name cannot exceed 80 characters'),
  description: yup
    .string()
    .required('Description is required')
    .max(1000, 'Description cannot exceed 1000 characters'),
  type: yup
    .string()
    .required('Type is required')
    .oneOf(['education', 'experience', 'project', 'achievement', 'certification', 'other']),
  startDate: yup
    .date()
    .required('Start date is required'),
  endDate: yup
    .date()
    .nullable(),
  current: yup.boolean(),
  featured: yup.boolean(),
  published: yup.boolean()
})
