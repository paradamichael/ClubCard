import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Courses() {
  return (
    <div className="app-container">
      <h2 className="page-title">Courses</h2>
      <Card>
        <p className="muted">Placeholder for courses list. Connect to CourseService to fetch courses and holes.</p>
        <div style={{marginTop:12}}>
          <Button>Create Course</Button>
        </div>
      </Card>
    </div>
  )
}
