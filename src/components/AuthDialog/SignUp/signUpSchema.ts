import { z } from 'zod'
export const signUpSchema = z.object({
  name: z.string().max(10, 'Maximum of 10 characters').min(1, 'Username is required'),
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  confirm: z.string().min(1, 'Password confirmation is required')
}).refine(data => data.password === data.confirm, {
  path: ['confirm'],
  message: 'Passwords do not match'
})