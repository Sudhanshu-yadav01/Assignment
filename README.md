# Art Institute of Chicago - Artwork DataTable

A React TypeScript application built with Vite that displays artwork data from the Art Institute of Chicago API using PrimeReact DataTable components.

## Features

- **Server-side Pagination**: Efficiently loads artwork data with pagination support
- **Interactive DataTable**: Built with PrimeReact DataTable component
- **Row Selection**: TriStateCheckbox for selecting individual rows or all rows
- **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes
- **TypeScript Support**: Full type safety throughout the application
- **Error Handling**: Proper error handling for API calls with user feedback

## Data Fields

The table displays the following artwork information:

- **Title**: The artwork's title
- **Place of Origin**: Where the artwork was created
- **Artist**: Artist information and display name
- **Inscriptions**: Any inscriptions on the artwork
- **Date Start**: Starting date of creation
- **Date End**: Ending date of creation

## Technology Stack

- **React 18+** - Modern React with functional components and hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast development build tool
- **PrimeReact** - UI component library for professional interfaces
- **Art Institute of Chicago API** - Real artwork data source

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code linting

## API Integration

The application fetches data from the Art Institute of Chicago API:

- **Endpoint**: `https://api.artic.edu/api/v1/artworks`
- **Features**: Server-side pagination, field selection for performance
- **Error Handling**: Graceful handling of API failures with user notifications

## Component Structure

```
src/
├── components/
│   └── ArtworkDataTable.tsx    # Main DataTable component
├── services/
│   └── artworkService.ts       # API service layer
├── types/
│   └── artwork.ts              # TypeScript interfaces
├── App.tsx                     # Main application component
└── main.tsx                    # Application entry point
```

## PrimeReact Components Used

- **DataTable**: Main table component with lazy loading
- **Column**: Table column definitions
- **TriStateCheckbox**: Header checkbox for select all functionality
- **Toast**: User notifications for errors and feedback

## Development Guidelines

- Follow React functional component patterns with hooks
- Use TypeScript for type safety
- Implement proper error handling for all API calls
- Follow PrimeReact component patterns and styling
- Use async/await for asynchronous operations
  languageOptions: {
  parserOptions: {
  project: ['./tsconfig.node.json', './tsconfig.app.json'],
  tsconfigRootDir: import.meta.dirname,
  },
  // other options...
  },
  },
  ])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
