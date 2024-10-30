import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
const Image = require("../assets/logo2.png")
function Dashboard() {
  const [userStats, setuserStats] = useState({ totalNotes: 0, updatedNotes: 0, deletedNotes: 0 }) 
  const context = useContext(NoteContext)
  const {downloadAllNotes} = context
  const fetchUserStats = async () => {
    let email = localStorage.getItem("email")
    let response = await fetch("http://localhost:7000/api/userStats/fetchStats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({ email })
    })
    let json = await response.json()
    let stats = {
      totalNotes: json.userStats.totalNotes, updatedNotes: json.userStats.updatedNotes, deletedNotes: json.userStats.deletedNotes
    }
    setuserStats(stats)
  }
  useEffect(() => {
    fetchUserStats()
  }, [])
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar  text-white p-4" style={{ width: '250px', height: '100vh' }}>
        <div className="text-center mb-4">
          <img src={Image} alt="iNotebook Logo" className="sidebar-logo" /> {/* Replace with your local path */}
          <h2 className="mt-3">iNotebook</h2>
          <p className="text-muted">Your notes, organized and accessible.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content p-4" style={{ marginLeft: '250px', width: '100%' }}>
        <h2 className="mb-4">Dashboard</h2>

        {/* Stats Section */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Total Notes</Card.Title>
                <Card.Text className="display-5">{userStats.totalNotes}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Updated Notes</Card.Title>
                <Card.Text className="display-5">{userStats.updatedNotes}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Deleted Notes</Card.Title>
                <Card.Text className="display-5">{userStats.deletedNotes}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <button type="button" class="btn btn-primary" onClick={()=>downloadAllNotes()}>
          <i class="fas fa-download"></i> Download All
        </button>
        <br />
        <br />
        {/* Notes Section */}
        <h4>Recents</h4>
      </div>
    </div>
  )
}

export default Dashboard