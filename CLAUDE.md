# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a UniApp wallpaper application built with Vue 3 and TypeScript. The app allows users to browse, preview, and download wallpapers. It has a tab-based navigation structure with Home, Category, and User pages.

## Project Structure

- `src/` - Main source code directory
  - `pages/` - Page components (home, category, preview, user)
  - `components/` - Reusable UI components
  - `api/` - API service functions
  - `utils/` - Utility functions (request handler)
  - `type/` - TypeScript type definitions
  - `static/` - Static assets (images, icons)

## Common Development Commands

- Start development server (H5): `npm run dev:h5`
- Build for production (H5): `npm run build:h5`
- Type checking: `npm run type-check`

## Code Architecture

### Core Technologies
- UniApp framework for cross-platform development
- Vue 3 Composition API with TypeScript
- SCSS for styling
- UniApp UI components (@dcloudio/uni-ui)

### Data Flow
1. API requests are handled through `src/utils/request.ts`
2. API endpoints are defined in `src/api/api.ts`
3. Data is fetched in page components and passed to child components
4. TypeScript types are defined in `src/type/index.ts`

### Component Structure
- Reusable components in `src/components/` (CommonBar, CommonTitle, CommontList)
- Page-specific components in respective page directories
- User page has nested components (Line.vue)

### Navigation
- Tab-based navigation defined in `src/pages.json`
- Programmatic navigation using `uni.navigateTo()` and `uni.navigateBack()`
- Custom tab bar with icons

### Key Features
- Wallpaper browsing with category filtering
- Wallpaper preview with swipe functionality
- Download functionality using `uni.downloadFile()` and `uni.saveImageToPhotosAlbum()`
- User profile and settings
- Responsive design with SCSS