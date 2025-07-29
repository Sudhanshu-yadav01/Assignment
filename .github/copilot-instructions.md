# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React TypeScript application built with Vite that displays artwork data from the Art Institute of Chicago API using PrimeReact components.

## Project Structure

- Uses React 18+ with TypeScript
- Built with Vite for fast development and builds
- Uses PrimeReact for UI components (DataTable, TriStateCheckbox)
- Fetches data from https://api.artic.edu/api/v1/artworks API
- Implements server-side pagination and filtering

## Key Components

- DataTable with columns: title, place_of_origin, artist_display, inscriptions, date_start, date_end
- TriStateCheckbox for row selection with advanced selection features
- FontAwesome chevron-down icon for accessing selection overlay
- OverlayPanel for selecting specific number of rows across pages
- Server-side data fetching with pagination
- Cross-page row selection functionality
- TypeScript interfaces for type safety

## Development Guidelines

- Always use TypeScript for type safety
- Follow React functional component patterns with hooks
- Use PrimeReact components and styling
- Implement proper error handling for API calls
- Use async/await for API operations
