import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import App from "./App"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock axios
jest.mock("axios")
const mockedAxios = axios

// Mock file for testing
const createMockFile = (name, type, size = 1024) => {
  const file = new File(["mock content"], name, { type, size })
  return file
}

describe("DeepFake Radar App", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  // Basic Rendering Tests
  describe("Component Rendering", () => {
    test("renders app title and tagline", () => {
      render(<App />)
      expect(screen.getByText("DeepFake Radar")).toBeInTheDocument()
      expect(screen.getByText("Ensuring Authenticity with AI")).toBeInTheDocument()
    })

    test("renders welcome section", () => {
      render(<App />)
      expect(screen.getByText("Welcome to DeepFake Detection")).toBeInTheDocument()
      expect(screen.getByText(/Upload your audio or video files/)).toBeInTheDocument()
    })

    test("renders audio and video detection cards", () => {
      render(<App />)
      expect(screen.getByText("Audio Analysis")).toBeInTheDocument()
      expect(screen.getByText("Video Analysis")).toBeInTheDocument()
      expect(screen.getByText("Detect AI-generated voices and speech")).toBeInTheDocument()
      expect(screen.getByText("Detect deepfake videos and face swaps")).toBeInTheDocument()
    })

    test("renders info section", () => {
      render(<App />)
      expect(screen.getByText("Secure & Private")).toBeInTheDocument()
      expect(screen.getByText("Fast Analysis")).toBeInTheDocument()
      expect(screen.getByText("AI Powered")).toBeInTheDocument()
    })

    test("starts in dark mode by default", () => {
      render(<App />)
      const appContainer = document.querySelector(".modern-app")
      expect(appContainer).toHaveClass("dark")
    })
  })

  // Theme Toggle Tests
  describe("Theme Toggle", () => {
    test("toggles between dark and light mode", async () => {
      const user = userEvent.setup()
      render(<App />)

      const appContainer = document.querySelector(".modern-app")
      const themeToggle = screen.getByRole("checkbox")

      // Should start in dark mode
      expect(appContainer).toHaveClass("dark")
      expect(themeToggle).toBeChecked()

      // Toggle to light mode
      await user.click(themeToggle)
      expect(appContainer).toHaveClass("light")
      expect(themeToggle).not.toBeChecked()

      // Toggle back to dark mode
      await user.click(themeToggle)
      expect(appContainer).toHaveClass("dark")
      expect(themeToggle).toBeChecked()
    })
  })

  // File Upload Tests
  describe("File Upload Functionality", () => {
    test("handles audio file selection", async () => {
      const user = userEvent.setup()
      render(<App />)

      const audioFile = createMockFile("test-audio.mp3", "audio/mp3")
      const audioInput = document.querySelector("#audio-upload")

      await user.upload(audioInput, audioFile)

      expect(screen.getByText("test-audio.mp3")).toBeInTheDocument()
      expect(screen.getByText("✓ Ready")).toBeInTheDocument()
    })

    test("handles video file selection", async () => {
      const user = userEvent.setup()
      render(<App />)

      const videoFile = createMockFile("test-video.mp4", "video/mp4")
      const videoInput = document.querySelector("#video-upload")

      await user.upload(videoInput, videoFile)

      expect(screen.getByText("test-video.mp4")).toBeInTheDocument()
      expect(screen.getByText("✓ Ready")).toBeInTheDocument()
    })

    test("rejects invalid audio file types", async () => {
      const user = userEvent.setup()
      render(<App />)

      const invalidFile = createMockFile("test.txt", "text/plain")
      const audioInput = document.querySelector("#audio-upload")

      await user.upload(audioInput, invalidFile)

      await waitFor(() => {
        expect(screen.getByText("Please upload a valid audio file.")).toBeInTheDocument()
      })
    })
  })

  // API Integration Tests
  describe("API Integration", () => {
    test("successfully analyzes audio file", async () => {
      const user = userEvent.setup()
      mockedAxios.post.mockResolvedValueOnce({
        data: {
          prediction: "Real",
          confidence: 0.95,
        },
      })

      render(<App />)

      const audioFile = createMockFile("test-audio.mp3", "audio/mp3")
      const audioInput = document.querySelector("#audio-upload")
      await user.upload(audioInput, audioFile)

      const analyzeButton = screen.getByText("Start Audio Analysis")
      await user.click(analyzeButton)

      await waitFor(() => {
        expect(screen.getByText("✓ AUTHENTIC")).toBeInTheDocument()
        expect(screen.getByText("95.0%")).toBeInTheDocument()
      })
    })

    test("handles API errors gracefully", async () => {
      const user = userEvent.setup()
      mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"))

      render(<App />)

      const audioFile = createMockFile("test-audio.mp3", "audio/mp3")
      const audioInput = document.querySelector("#audio-upload")
      await user.upload(audioInput, audioFile)

      const analyzeButton = screen.getByText("Start Audio Analysis")
      await user.click(analyzeButton)

      await waitFor(() => {
        expect(screen.getByText("Prediction failed. Check your backend connection.")).toBeInTheDocument()
      })
    })
  })

  // Loading States Tests
  describe("Loading States", () => {
    test("shows loading state during analysis", async () => {
      const user = userEvent.setup()
      mockedAxios.post.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)))

      render(<App />)

      const audioFile = createMockFile("test-audio.mp3", "audio/mp3")
      const audioInput = document.querySelector("#audio-upload")
      await user.upload(audioInput, audioFile)

      const analyzeButton = screen.getByText("Start Audio Analysis")
      await user.click(analyzeButton)

      expect(screen.getByText("Analyzing Audio...")).toBeInTheDocument()
      expect(analyzeButton).toBeDisabled()
    })
  })
})
