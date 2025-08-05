import React, { useState } from 'react';

// Main App component for the blog page
function App() {
  // Sample blog post data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      author: 'Jane Doe',
      date: 'July 28, 2025',
      excerpt: 'React is a powerful JavaScript library for building user interfaces. This post covers the basics of setting up your first React project and understanding its core concepts like components and props.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrls: [{ url: 'https://placehold.co/600x400/87CEEB/FFFFFF?text=React+Basics', caption: 'A foundational image for React concepts.' }], // Main/featured image
      contentImageUrls: [ // Images within content with captions
        { url: 'https://placehold.co/400x300/ADD8E6/000000?text=React+Component', caption: 'Visualizing a React component structure.' },
        { url: 'https://placehold.co/400x300/B0E0E6/000000?text=React+State', caption: 'Understanding state management in React.' }
      ]
    },
    {
      id: 2,
      title: 'Tailwind CSS for Rapid UI Development',
      author: 'John Smith',
      date: 'August 1, 2025',
      excerpt: 'Tailwind CSS is a utility-first CSS framework that allows you to build custom designs directly in your HTML. Learn how it can speed up your UI development process.',
      content: 'Curabitur pretium tincidunt lacus, eget pretium massa. Cras ut erat sed massa pulvinar tristique. Integer quis purus eu nunc tincidunt tincidunt. Nulla facilisi. Sed euismod, nisl sit amet consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod nisi. Curabitur pretium tincidunt lacus, eget pretium massa. Cras ut erat sed massa pulvinar tristique. Integer quis purus eu nunc tincidunt tincidunt. Nulla facilisi. Sed euismod, nisl sit amet consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod nisi.',
      imageUrls: [{ url: 'https://placehold.co/600x400/90EE90/FFFFFF?text=Tailwind+CSS', caption: 'The power of utility-first CSS.' }],
      contentImageUrls: [
        { url: 'https://placehold.co/400x300/32CD32/FFFFFF?text=Utility+Classes', caption: 'Building blocks for modern UIs.' },
        { url: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Responsive+Design', caption: 'Designing for all screen sizes.' }
      ]
    },
    {
      id: 3,
      title: 'The Future of Web Development',
      author: 'Alice Johnson',
      date: 'August 5, 2025',
      excerpt: 'Explore the exciting trends shaping the web development landscape, from server-side rendering to WebAssembly and beyond.',
      content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
      imageUrls: [{ url: 'https://placehold.co/600x400/FFD700/FFFFFF?text=Web+Future', caption: 'Glimpse into the next generation of web.' }],
      contentImageUrls: [
        { url: 'https://placehold.co/400x300/FFA500/FFFFFF?text=New+Tech', caption: 'Innovations driving the web forward.' },
        { url: 'https://placehold.co/400x300/FF8C00/FFFFFF?text=Innovation', caption: 'Exploring cutting-edge web technologies.' }
      ]
    },
  ]);

  // State to manage the current "page" view: 'home', 'about', 'contact', 'add-blog', or 'post'
  const [currentPage, setCurrentPage] = useState('home');
  // State to manage which post is currently selected for full view
  const [selectedPostId, setSelectedPostId] = useState(null);
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  // State to hold data of the post being edited
  const [editingPostData, setEditingPostData] = useState(null);

  // Function to handle adding or updating a new post
  const handleSavePost = (postData) => {
    console.log('handleSavePost called with:', postData); // Debugging log
    setLoading(true);
    setTimeout(() => {
      if (postData.id) {
        // Update existing post
        setPosts(prevPosts =>
          prevPosts.map(post => (post.id === postData.id ? postData : post))
        );
        alert('Blog post updated successfully!');
      } else {
        // Add new post
        setPosts(prevPosts => [
          {
            ...postData,
            id: prevPosts.length > 0 ? Math.max(...prevPosts.map(p => p.id)) + 1 : 1, // Simple ID generation
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) // Auto-generate date
          },
          ...prevPosts
        ]);
        alert('Blog post added successfully!');
      }
      setEditingPostData(null); // Clear editing state
      setCurrentPage('home'); // Go back to home page after saving
      setLoading(false);
    }, 500);
  };

  // Function to handle "Read More" click
  const handleReadMore = (id) => {
    setLoading(true); // Set loading to true
    // Simulate a network request delay
    setTimeout(() => {
      setSelectedPostId(id);
      setCurrentPage('post'); // Change page to 'post' view
      setLoading(false); // Set loading to false after delay
    }, 500); // 500ms delay
  };

  // Function to handle "Edit" button click
  const handleEditPost = (post) => {
    console.log('handleEditPost called with:', post); // Debugging log
    setLoading(true);
    setTimeout(() => {
      // Convert image arrays back to newline-separated strings for textarea
      const postDataForForm = {
        ...post,
        imageUrls: post.imageUrls ? post.imageUrls.map(img => `${img.url} | ${img.caption || ''}`).join('\n') : '',
        contentImageUrls: post.contentImageUrls ? post.contentImageUrls.map(img => `${img.url} | ${img.caption || ''}`).join('\n') : ''
      };
      console.log('postDataForForm for editing:', postDataForForm); // Debugging log
      setEditingPostData(postDataForForm); // Set the post data for editing
      setCurrentPage('add-blog'); // Navigate to the add/edit form
      setLoading(false);
    }, 300);
  };

  // Function to handle "Back to All Posts" click or cancel edit
  const handleBackToPosts = () => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      setSelectedPostId(null);
      setEditingPostData(null); // Clear editing state
      setCurrentPage('home'); // Change page back to 'home'
      setLoading(false); // Set loading to false after delay
    }, 300); // Shorter delay for returning
  };

  // Function to handle navigation clicks
  const handleNavLinkClick = (page) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setSelectedPostId(null); // Clear selected post when navigating to other pages
      setEditingPostData(null); // Clear editing state
      setLoading(false);
    }, 300);
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find the selected post
  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    // Added w-screen to ensure the outermost div always takes 100vw
    <div className="min-h-screen w-screen bg-gray-100 font-inter flex flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 shadow-xl rounded-b-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Increased header font size and weight */}
          <h1 className="text-5xl md:text-6xl font-black mb-2 md:mb-0 tracking-tight">My Awesome Blog 🚀</h1>
          <nav>
            <ul className="flex space-x-6 text-lg font-medium">
              <li>
                <button
                  onClick={() => handleNavLinkClick('home')}
                  className={`hover:text-blue-200 transition duration-300 ${currentPage === 'home' ? 'text-blue-200 underline' : ''}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavLinkClick('add-blog')}
                  className={`hover:text-blue-200 transition duration-300 ${currentPage === 'add-blog' ? 'text-blue-200 underline' : ''}`}
                >
                  Add New Post
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavLinkClick('about')}
                  className={`hover:text-blue-200 transition duration-300 ${currentPage === 'about' ? 'text-blue-200 underline' : ''}`}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavLinkClick('contact')}
                  className={`hover:text-blue-200 transition duration-300 ${currentPage === 'contact' ? 'text-blue-200 underline' : ''}`}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-grow">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>
            <p className="mt-4 text-2xl font-semibold text-gray-700">Loading content...</p>
          </div>
        ) : (
          <>
            {currentPage === 'home' && (
              <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search Bar */}
                <div className="mb-8 p-4 bg-white rounded-xl shadow-lg flex items-center space-x-4 border border-gray-200 focus-within:ring-2 focus-within:ring-purple-400 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search posts by title or author..."
                    className="flex-grow p-2 text-lg border-none focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <BlogPost
                        key={post.id}
                        post={post}
                        onReadMore={handleReadMore}
                        onEdit={handleEditPost} // Pass handleEditPost to BlogPost
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-600 text-xl col-span-full py-10">No posts found matching your search. 😔</p>
                  )}
                </section>
              </div>
            )}

            {currentPage === 'post' && selectedPost && (
              <div className="max-w-7xl mx-auto px-6 py-8">
                <FullBlogPost post={selectedPost} onBack={handleBackToPosts} />
              </div>
            )}

            {currentPage === 'add-blog' && (
              <div className="max-w-7xl mx-auto px-6 py-8">
                <AddBlogPage
                  // Added a key prop to force re-mount when editing different posts or switching from new post to edit
                  key={editingPostData ? editingPostData.id : 'new-post'}
                  onSavePost={handleSavePost} // Renamed prop to reflect add/edit
                  initialPostData={editingPostData} // Pass data for editing
                  onCancel={handleBackToPosts} // Pass a cancel handler
                />
              </div>
            )}

            {currentPage === 'about' && (
              <div className="max-w-7xl mx-auto px-6 py-8">
                <AboutPage />
              </div>
            )}
            {currentPage === 'contact' && (
              <div className="max-w-7xl mx-auto px-6 py-8">
                <ContactPage />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white p-6 mt-8 rounded-t-3xl">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} My Awesome Blog. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Built with ❤️ and React</p>
        </div>
      </footer>
    </div>
  );
}

// BlogPost component to display individual blog posts in the list view
function BlogPost({ post, onReadMore, onEdit }) {
  return (
    <article className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300 transform border border-gray-200">
      {/* Display only the first main image for the card preview */}
      {post.imageUrls && post.imageUrls.length > 0 && (
        <figure className="mb-4">
          <img
            src={post.imageUrls[0].url} // Access url from the object
            alt={post.imageUrls[0].caption || post.title} // Use caption as alt text
            className="w-full h-48 object-cover rounded-lg shadow-sm"
            // Fallback for broken images
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found'; }}
          />
          {post.imageUrls[0].caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
              {post.imageUrls[0].caption}
            </figcaption>
          )}
        </figure>
      )}
      {/* Increased blog post title font size */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h2>
      {/* Increased paragraph font size */}
      <p className="text-xl text-gray-600 mb-4">
        By <span className="font-semibold">{post.author}</span> on {post.date}
      </p>
      <p className="text-gray-700 leading-relaxed text-xl mb-4">{post.excerpt}</p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onReadMore(post.id)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-5 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Read More
        </button>
        {/* Removed the Edit button as requested */}
        {/* <button
          onClick={() => onEdit(post)} // Pass the whole post object for editing
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Edit
        </button> */}
      </div>
    </article>
  );
}

// New component to display the full content of a selected blog post
function FullBlogPost({ post, onBack }) {
  return (
    <article className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to All Posts
      </button>
      {/* Display main/featured images with captions */}
      {post.imageUrls && post.imageUrls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {post.imageUrls.map((img, index) => (
            <figure key={`main-img-${index}`} className="flex flex-col items-center">
              <img
                src={img.url}
                alt={img.caption || `Main image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
                // Fallback for broken images
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/CCCCCC/333333?text=Image+Error'; }}
              />
              {img.caption && (
                <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
      {/* Increased full post title font size */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
      {/* Increased paragraph font size */}
      <p className="text-xl text-gray-600 mb-6">
        By <span className="font-semibold">{post.author}</span> on {post.date}
      </p>
      <div className="prose max-w-none text-gray-800 leading-relaxed text-2xl"> {/* Increased content font size */}
        <p>{post.content}</p>
        {/* Display content images with captions */}
        {post.contentImageUrls && post.contentImageUrls.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {post.contentImageUrls.map((img, index) => (
              <figure key={`content-img-${index}`} className="flex flex-col items-center">
                <img
                  src={img.url}
                  alt={img.caption || `Content image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/CCCCCC/333333?text=Content+Image+Error'; }}
                />
                {img.caption && (
                  <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

// Placeholder component for the About page
function AboutPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center">
      {/* Increased About page header font size */}
      <h2 className="text-4xl font-bold text-gray-800 mb-4">About Our Blog 📚</h2>
      {/* Increased paragraph font size */}
      <p className="text-xl text-gray-700 leading-relaxed">
        Welcome to My Awesome Blog! We're passionate about sharing insights and knowledge on various topics, from web development to everyday life. Our goal is to provide valuable content that inspires and educates our readers.
      </p>
      <p className="mt-4 text-gray-600 text-xl">
        Stay tuned for more exciting articles!
      </p>
    </div>
  );
}

// Updated Contact page component with a more user-friendly form layout and enhanced styling
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    console.log('Form submitted:', formData);
    // Using a simple alert for demonstration. In a real app, use a custom modal.
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' }); // Clear form
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200">
      {/* Increased Contact page header font size */}
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Contact Us 📧</h2>
      {/* Increased paragraph font size */}
      <p className="text-xl text-gray-700 leading-relaxed mb-6 text-center">
        Have a question or feedback? Fill out the form below and we'll get back to you!
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            // Set text color to white and background to dark gray
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-white bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            // Set text color to white and background to dark gray
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-white bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="your@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            // Set text color to white and background to dark gray
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-white bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="Your message here..."
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

// New component for adding or editing a blog post
function AddBlogPage({ onSavePost, initialPostData, onCancel }) {
  // Use initialPostData for editing, or an empty object for new posts
  const [postForm, setPostForm] = useState(initialPostData || {
    title: '',
    author: '',
    excerpt: '',
    content: '',
    imageUrls: '', // String for textarea input for main images
    contentImageUrls: '' // String for textarea input for content images
  });

  // Effect to reset form when initialPostData changes (e.g., switching from one edit to another)
  React.useEffect(() => {
    console.log('AddBlogPage useEffect - initialPostData:', initialPostData); // Debugging log
    if (initialPostData) {
      setPostForm({
        ...initialPostData,
        imageUrls: initialPostData.imageUrls?.map(img => `${img.url} | ${img.caption || ''}`).join('\n') || '',
        contentImageUrls: initialPostData.contentImageUrls?.map(img => `${img.url} | ${img.caption || ''}`).join('\n') || ''
      });
    } else {
      setPostForm({ // Reset for new post
        title: '',
        author: '',
        excerpt: '',
        content: '',
        imageUrls: '',
        contentImageUrls: ''
      });
    }
  }, [initialPostData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postForm.title || !postForm.author || !postForm.content) {
      alert('Please fill in all required fields (Title, Author, Content).');
      return;
    }

    // Helper function to parse URL | Caption strings
    const parseImageUrls = (urlInput) => {
      return urlInput
        .split('\n')
        .map(line => {
          const parts = line.split('|').map(part => part.trim());
          return {
            url: parts[0] || '',
            caption: parts[1] || ''
          };
        })
        .filter(img => img.url !== ''); // Filter out lines without a URL
    };

    const processedImageUrls = parseImageUrls(postForm.imageUrls);
    const processedContentImageUrls = parseImageUrls(postForm.contentImageUrls);

    onSavePost({
      ...postForm,
      imageUrls: processedImageUrls,
      contentImageUrls: processedContentImageUrls
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200">
      {/* Increased Add Blog Post header font size */}
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        {initialPostData ? 'Edit Blog Post ✏️' : 'Add New Blog Post ✍️'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="post-title" className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="post-title"
            name="title"
            value={postForm.title}
            onChange={handleChange}
            // Set text color to white and background to dark gray
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-white bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="Enter post title"
            required
          />
        </div>
        <div>
          <label htmlFor="post-author" className="block text-gray-700 text-sm font-bold mb-2">
            Author:
          </label>
          <input
            type="text"
            id="post-author"
            name="author"
            value={postForm.author}
            onChange={handleChange}
            // Set text color to white and background to dark gray
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-white bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="Enter author name"
            required
          />
        </div>
        <div>
          <label htmlFor="post-image-urls" className="block text-gray-700 text-sm font-bold mb-2">
            Main Image URLs (Optional, one per line: URL | Caption):
          </label>
          <textarea
            id="post-image-urls"
            name="imageUrls"
            value={postForm.imageUrls}
            onChange={handleChange}
            rows="3" // Increased rows for more space
            // Set text color to white and background to dark gray
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-white bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="Paste main image URLs here, one per line (e.g., https://example.com/img.jpg | My Caption)"
          ></textarea>
        </div>
        <div>
          <label htmlFor="post-content-image-urls" className="block text-gray-700 text-sm font-bold mb-2">
            Content Image URLs (Optional, one per line: URL | Caption):
          </label>
          <textarea
            id="post-content-image-urls"
            name="contentImageUrls"
            value={postForm.contentImageUrls}
            onChange={handleChange}
            rows="5" // Increased rows for more space
            // Set text color to white and background to dark gray
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-white bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="Paste content image URLs here, one per line (e.g., https://example.com/img.jpg | Image Description)"
          ></textarea>
        </div>
        <div>
          <label htmlFor="post-excerpt" className="block text-gray-700 text-sm font-bold mb-2">
            Excerpt (Short Summary):
          </label>
          <textarea
            id="post-excerpt"
            name="excerpt"
            value={postForm.excerpt}
            onChange={handleChange}
            rows="3"
            // Set text color to white and background to dark gray
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-white bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="A brief summary of the post"
          ></textarea>
        </div>
        <div>
          <label htmlFor="post-content" className="block text-gray-700 text-sm font-bold mb-2">
            Content:
          </label>
          <textarea
            id="post-content"
            name="content"
            value={postForm.content}
            onChange={handleChange}
            rows="10"
            // Set text color to white and background to dark gray
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-white bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="Write your full blog post content here..."
            required
          ></textarea>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {initialPostData ? 'Update Post' : 'Publish Post'}
          </button>
          {initialPostData && ( // Show cancel button only when editing
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
