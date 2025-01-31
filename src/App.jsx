import { useEffect, useState } from 'react'
import './App.css'
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { EyeIcon, } from '@heroicons/react/24/outline';




function App() {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [length] = useState(25);

  //Theme
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    console.log("Tema satt till:", theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  //Generate password
  const generatePassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setPassword(password)
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };


  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className='copyBoard'>
        <input
          type={isPasswordVisible ? "text" : "password"} // Toggle mellan text och password
          value={password}
          readOnly
          id="password"
          className="input-field"
        />
        <button onClick={() => generatePassword(length)} aria-label="Generate new password" className="generate-button">
          <ArrowPathIcon className="generate-icon" />
        </button>
        <button onClick={copyToClipboard} aria-label="Copy to clipboard" className="copy-button">
          <ClipboardDocumentIcon className="icon" />
        </button>
        <button
          onClick={togglePasswordVisibility}
          aria-label="Toggle password visibility"
          className="visibility-button"
        >
          {isPasswordVisible ? (
            <EyeIcon className="icon" />
          ) : (
            <EyeIcon className="icon" />
          )}
        </button>
        <button className="theme-button" onClick={toggleTheme}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App
