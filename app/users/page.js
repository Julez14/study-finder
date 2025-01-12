// app/users/page.js
'use client'

import { useState, useEffect } from 'react'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch users')
      setLoading(false)
    }
  }

  const addUser = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
        }),
      })
      
      if (!res.ok) throw new Error('Failed to add user')
      
      fetchUsers() // Refresh the list
      e.target.reset() // Reset form
    } catch (err) {
      setError('Failed to add user')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    // Use ISO string to ensure consistent formatting
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      
      <form onSubmit={addUser} className="mb-8 space-y-4">
        <div>
          <input 
            name="name" 
            placeholder="Name" 
            required 
            className="border p-2 rounded mr-2"
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            className="border p-2 rounded mr-2"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {users.map(user => (
          <div key={user._id} className="border p-4 rounded">
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            {user.createdAt && (
              <p className="text-sm text-gray-500">
                Added: {formatDate(user.createdAt)}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}