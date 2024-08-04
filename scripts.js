document.addEventListener('DOMContentLoaded', () => {
  const storyForm = document.getElementById('storyForm')
  const storiesContainer = document.getElementById('stories')

  // Initialize stories array from local storage or as an empty array
  let stories = JSON.parse(localStorage.getItem('stories')) || []

  // Function to render stories to the DOM
  const renderStories = () => {
    storiesContainer.innerHTML = ''
    stories.forEach((story, index) => {
      const storyDiv = document.createElement('div')
      storyDiv.className = 'story'
      storyDiv.innerHTML = `
        <h3>${story.title}</h3>
        <p><em>by ${story.name}</em></p>
        <p>${story.story}</p>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `
      storiesContainer.appendChild(storyDiv)
    })
  }

  // Event listener for form submission
  storyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = document.getElementById('name').value
    const title = document.getElementById('title').value
    const story = document.getElementById('story').value

    // Add new story to the array
    stories.push({ name, title, story })

    // Save stories to local storage
    localStorage.setItem('stories', JSON.stringify(stories))

    // Clear form
    storyForm.reset()

    // Re-render stories
    renderStories()
  })

  // Event listener for deleting a story
  storiesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const index = event.target.getAttribute('data-index')
      stories.splice(index, 1)
      localStorage.setItem('stories', JSON.stringify(stories))
      renderStories()
    }
  })

  // Initial render
  renderStories()
})
