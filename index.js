
    
    const startupIdeas = [
 {
    id: 1,
    title: "AI Campus Assistant",
    description: "An AI-powered virtual assistant for university students that helps with scheduling, assignment tracking, and campus navigation.",
    category: "technology",
    tags: ["AI", "education", "productivity"],
    author: "Jane Doe",
    date: "2023-10-15",
    likes: 42,
    detailPage: "aicampusassistant.html" 
  },
  {
    id: 2,
    title: "Eco-Friendly Packaging",
    description: "Sustainable packaging solution made from agricultural waste that decomposes within 30 days.",
    category: "social",
    tags: ["sustainability", "environment", "commerce"],
    author: "John Smith",
    date: "2023-09-28",
    likes: 35,
    detailPage: "ecofriendlypackaging.html"
  },
      {
        id: 3,
        title: "Campus Food Sharing",
        description: "An app connecting students with leftover food from campus events to reduce food waste.",
        category: "social",
        tags: ["food", "sharing", "sustainability"],
        author: "Alex Johnson",
        date: "2023-11-02",
        likes: 28,
        detailPage: "campusfoodsharing.html"
      },
      {
        id: 4,
        title: "Virtual Study Groups",
        description: "Platform for creating virtual study groups with collaborative tools and resource sharing.",
        category: "technology",
        tags: ["education", "collaboration", "remote"],
        author: "Sarah Williams",
        date: "2023-10-20",
        likes: 31,
        detailPage: "virtualstudygrps.html"
      },
      {
        id: 5,
        title: "Mental Health Chatbot",
        description: "AI chatbot providing mental health support and resources for college students.",
        category: "health",
        tags: ["mental health", "AI", "wellness"],
        author: "Michael Brown",
        date: "2023-11-05",
        likes: 39,
        detailPage: "mentalhealthchatbot.html"
      },
      {
        id: 6,
        title: "Local Artisan Marketplace",
        description: "Online marketplace connecting local artisans with students looking for unique handmade products.",
        category: "business",
        tags: ["e-commerce", "local", "artisans"],
        author: "Emily Davis",
        date: "2023-09-15",
        likes: 24,
        detailPage: "localartisan.html"
      }
    ];

   
    const ideasContainer = document.getElementById('ideasContainer');
    const searchInput = document.getElementById('searchInput');
    const filterOptions = document.querySelectorAll('.filter-option');
    const searchButton = document.getElementById('searchButton');
    const searchDropdown = document.getElementById('searchDropdown');

    
    let currentCategory = 'all';
    let currentSearchTerm = '';

   
    document.addEventListener('DOMContentLoaded', function() {
      renderIdeas(startupIdeas);
      
     
      searchInput.addEventListener('input', function(e) {
        currentSearchTerm = e.target.value.toLowerCase();
        filterIdeas();
      });
      
      filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
          e.preventDefault();
          currentCategory = this.dataset.category;
          updateActiveFilter();
          filterIdeas();
        });
      });
      
      
      searchButton.addEventListener('click', function() {
        searchDropdown.classList.toggle('show');
      });
    });

    
    window.addEventListener('click', function(event) {
      if (!event.target.matches('#searchButton') && !event.target.matches('#searchInput')) {
        searchDropdown.classList.remove('show');
      }
    });

    
    function renderIdeas(ideas) {
  if (ideas.length === 0) {
    ideasContainer.innerHTML = '<div class="no-results"><h3>No ideas found matching your criteria</h3><p>Try adjusting your search or filter</p></div>';
    return;
  }
  
  ideasContainer.innerHTML = '';
  ideas.forEach(idea => {
    const ideaCard = document.createElement('a'); // Changed to anchor tag
    ideaCard.className = 'idea-card';
    ideaCard.href = idea.detailPage; // Set href to the detail page URL
    ideaCard.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <h4>${idea.title}</h4>
        <span class="idea-category ${getCategoryClass(idea.category)}">${formatCategory(idea.category)}</span>
      </div>
      <p class="text-muted">${idea.description}</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">By ${idea.author}</small>
        <div>
          <span class="badge bg-light text-dark">${idea.likes} ♥</span>
        </div>
      </div>
      <div class="mt-2">
        ${idea.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
      </div>
    `;
    ideasContainer.appendChild(ideaCard);
  });
}



    function filterIdeas() {
      let filteredIdeas = startupIdeas;
      
      
      if (currentCategory !== 'all') {
        filteredIdeas = filteredIdeas.filter(idea => idea.category === currentCategory);
      }
      
     
      if (currentSearchTerm) {
        filteredIdeas = filteredIdeas.filter(idea => 
          idea.title.toLowerCase().includes(currentSearchTerm) ||
          idea.description.toLowerCase().includes(currentSearchTerm) ||
          idea.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm)) ||
          idea.author.toLowerCase().includes(currentSearchTerm)
        );
      }
      
      renderIdeas(filteredIdeas);
    }

    
    function updateActiveFilter() {
      filterOptions.forEach(option => {
        if (option.dataset.category === currentCategory) {
          option.classList.add('active');
        } else {
          option.classList.remove('active');
        }
      });
    }

    
    function formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }

    
    function getCategoryClass(category) {
      const classes = {
        technology: 'bg-info bg-opacity-10 text-info',
        social: 'bg-primary bg-opacity-10 text-primary',
        business: 'bg-danger bg-opacity-10 text-danger',
        health: 'bg-success bg-opacity-10 text-success'
      };
      return classes[category] || 'bg-secondary bg-opacity-10 text-secondary';
    }
  