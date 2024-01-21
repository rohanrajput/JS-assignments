import './App.css'
import BusinessCard from './components/BusinessCard';

interface UserProps {
  name: string, 
  description: string, 
  interests: string[],
  linkedIn: string,
  twitter: string
};

function App() {

  const user: UserProps = {
    name: "Rohan Rajput",
    description: "This is my business card",
    interests: ["Cricket", "Music", "Netflix"],
    linkedIn: "https://www.linkedin.com",
    twitter: "https://www.twitter.com"
  };

  return (
    <>
      <BusinessCard {...user} />
    </>
  )
}

export default App

// {name: String, description: String, interests: String[]}
