import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingMic from "./FloatingMic";

const VoiceCommandController = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      console.log("🎤 Voice command started");
    };

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript
        .toLowerCase()
        .trim();

      console.log("🗣 Command:", command);
      runCommand(command);
    };

    recognition.onerror = (event: any) => {
      console.warn("Voice recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("🎤 Voice command stopped");
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const runCommand = (command: string) => {
    if (command.includes("home") || command.includes("go home")) {
      navigate("/");
      return;
    }

    if (command.includes("ai") || command.includes("teacher") || command.includes("ziara")) {
      // Logic for ZIARA or AI Tutor page
      navigate("/ai-tutor");
      return;
    }

    if (command.includes("exam")) {
      navigate("/exam-hub");
      return;
    }

    if (command.includes("study") || command.includes("learning")) {
      navigate("/learning-hub");
      return;
    }

    if (command.includes("skill") || command.includes("coding")) {
      navigate("/master-skill-hub");
      return;
    }

    if (command.includes("education")) {
      navigate("/education-hub");
      return;
    }

    if (command.includes("login")) {
      navigate("/login");
      return;
    }

    if (command.includes("scroll down")) {
      window.scrollBy({ top: 500, behavior: "smooth" });
      return;
    }

    if (command.includes("scroll up")) {
      window.scrollBy({ top: -500, behavior: "smooth" });
      return;
    }

    if (command.includes("dark mode")) {
      document.documentElement.classList.toggle("dark");
      return;
    }

    console.log("No matching voice command found.");
  };

  const toggleListening = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (error) {
        console.warn("Voice recognition already started:", error);
      }
    }
  };

  return (
    <FloatingMic
      isListening={isListening}
      toggleListening={toggleListening}
    />
  );
};

export default VoiceCommandController;
