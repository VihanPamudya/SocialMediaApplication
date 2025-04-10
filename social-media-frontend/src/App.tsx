import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import Navbar from './components/common/Navbar';
import { PostProvider } from './context/PostContext';

function App() {
  return (
    <Router>
      <PostProvider>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
            </Routes>
          </div>
        </div>
      </PostProvider>
    </Router>
  );
}

export default App;