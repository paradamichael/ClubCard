import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

interface Course {
  id: number
  courseName: string
  location: string
  holesCount: number
}

export default function CourseSelector() {
  const [courses, setCourses] = useState<Course[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/courses')
      .then(res => setCourses(res.data))
      .catch(err => {
        console.error('Error fetching courses:', err)
        setCourses([])
      })
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', padding: '0' }}>
      <div style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Select a Course</h1>
      </div>
      
      <div style={{ padding: '20px' }}>
        {courses.map(course => (
          <div
            key={course.id}
            onClick={() => navigate(`/tee-selector/${course.id}`)}
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: 'var(--card-shadow)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>
              {course.courseName}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
              {course.location} • {course.holesCount} holes
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
