// Import the Supabase client
import { createClient } from "@supabase/supabase-js"

// Initialize the Supabase client
const supabaseUrl = "https://cnungyarrswqtxelrnkb.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNudW5neWFycnN3cXR4ZWxybmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMDUyMjAsImV4cCI6MjA1Mzc4MTIyMH0.NsqTvA_orQnXYWYuB0ZjTurLcQsL3tltKjvmnio9mwg"
const supabase = createClient(supabaseUrl, supabaseKey)

// Login
async function login() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    showError(error.message)
  } else {
    window.location.href = "dashboard.html" // Redirect to dashboard
  }
}

// Sign Up
async function signup() {
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: name },
    },
  })

  if (error) {
    showError(error.message)
  } else {
    showMessage("Check your email for confirmation!")
  }
}

// Logout
async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    showError(error.message)
  } else {
    window.location.href = "index.html" // Redirect to landing page
  }
}

function showError(message) {
  const errorElement = document.getElementById("error-message")
  errorElement.textContent = message
  errorElement.classList.remove("hidden")
}

function showMessage(message) {
  const messageElement = document.getElementById("message")
  messageElement.textContent = message
  messageElement.classList.remove("hidden")
}

// Make functions available globally
window.login = login
window.signup = signup
window.logout = logout

