# To-Do List with Filter Options

## Project Overview
This is a fully functional To-Do List application built with HTML, Tailwind CSS, and JavaScript. It allows users to add, edit, delete, and mark tasks as complete, with filtering options to view all, active, or completed tasks. The application includes a responsive design, local storage for persistence, due date functionality, priority levels, drag-and-drop task reordering, and smooth animations for task addition and deletion.

## Instructions to Run the Project
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Open the Application**:
   - Navigate to the project directory.
   - Open `index.html` in a web browser (no server required as it uses CDNs for Tailwind CSS and SortableJS).
3. **Live Deployment**:
   - Deploy the `index.html` file to a static hosting service like GitHub Pages or Netlify.
   - Example deployment link: [To-Do List Demo](https://<your-deployment-link>)

## Technologies Used
- **HTML5**: Structure of the application.
- **Tailwind CSS**: Styling and responsive design via CDN.
- **JavaScript**: Core logic, interactivity, and local storage.
- **SortableJS**: Drag-and-drop functionality for task reordering via CDN.
- **Local Storage**: Persists tasks across page reloads.

## Features Implemented
- **CRUD Operations**:
  - Create: Add tasks with optional due dates and priority levels (Low, Medium, High, None).
  - Read: Display tasks with filtering options (All, Active, Completed).
  - Update: Edit tasks and their priority inline using prompts.
  - Delete: Remove individual tasks with animation.
- **Filtering**: View tasks by status (All, Active, Completed).
- **User Experience**:
  - Task counters for each filter view.
  - Clear all completed tasks.
  - Visual indicators (strikethrough for completed tasks, color-coded badges for priority).
  - Smooth animations for adding/deleting tasks.
  - Drag-and-drop functionality to reorder tasks.
- **Features**:
  - Local Storage for task persistence.
  - Due date input for tasks.
  - Priority levels (Low, Medium, High, None) with visual indicators.
  - Drag-and-drop task reordering using SortableJS.
- **Responsive Design**: Mobile-first layout, adaptable to desktop, tablet, and mobile.

## Notes
- The application uses Tailwind CSS and SortableJS via CDNs for simplicity, but you can integrate them via npm for production.
- Priority levels are displayed as color-coded badges (Green for Low, Yellow for Medium, Red for High, Gray for None).
- Drag-and-drop reordering works within the current filter view and updates the task order in the full task list.
- The project is optimized for modern browsers.

## Future Improvements
- Enhance edit functionality with a modal instead of prompts.
- Add sorting options by due date or priority.
- Implement categories or tags for tasks.