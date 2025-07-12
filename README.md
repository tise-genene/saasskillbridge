# 🦅 Eagle Tutorials Services

A comprehensive tutoring platform connecting students, parents, and qualified tutors in Addis Ababa, Ethiopia.

## 🚀 Features

### For Parents

- **Child Management**: Add and manage multiple children's profiles
- **Smart Matching**: Find tutors based on subject, grade level, and location
- **Session Booking**: Schedule online or in-person tutoring sessions
- **Progress Tracking**: Monitor your child's learning progress
- **Payment Integration**: Pay securely using Ethiopian mobile money

### For Students

- **Personalized Learning**: Get matched with tutors based on learning style
- **Flexible Sessions**: Choose between online and in-person tutoring
- **Progress Reports**: Track your academic improvement
- **Interactive Dashboard**: Manage your learning journey

### For Tutors

- **Profile Creation**: Showcase your qualifications and expertise
- **Flexible Scheduling**: Set your availability and preferred session types
- **Earnings Management**: Track your income and payment history
- **Student Matching**: Get matched with students based on your expertise

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Forms**: React Hook Form, Zod validation
- **Testing**: Jest, React Testing Library, Playwright
- **Code Quality**: ESLint, Prettier, TypeScript strict mode
- **Development**: Storybook, Husky pre-commit hooks

## 🏗️ Project Structure

```
skillbridge/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   └── ...
│   ├── components/         # React components
│   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   ├── common/        # Reusable components
│   │   ├── forms/         # Form components
│   │   └── layouts/       # Layout components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   ├── constants/         # Application constants
│   ├── utils/             # Utility functions
│   ├── __tests__/         # Test files
│   └── stories/           # Storybook stories
├── public/                # Static assets
├── docs/                  # Documentation
└── ...config files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd skillbridge
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Update `.env.local` with your actual values:
   - Supabase URL and keys
   - Payment provider credentials
   - Email service configuration

4. **Set up the database**

   ```bash
   # Run database migrations
   npm run db:reset

   # Seed with sample data (optional)
   npm run db:seed
   ```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript compiler

### Testing

- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:e2e:ui` - Run E2E tests with UI

### Database

- `npm run db:generate-types` - Generate TypeScript types from Supabase
- `npm run db:reset` - Reset database
- `npm run db:seed` - Seed database with sample data

### Development Tools

- `npm run storybook` - Start Storybook
- `npm run analyze` - Analyze bundle size

## 🏛️ Architecture

### Frontend Architecture

- **App Router**: Next.js 15 app router for file-based routing
- **Component Architecture**: Atomic design principles
- **State Management**: React Context + custom hooks
- **Type Safety**: Comprehensive TypeScript coverage

### Backend Architecture

- **Database**: PostgreSQL with Supabase
- **Authentication**: Supabase Auth with role-based access
- **Real-time**: Supabase real-time subscriptions
- **API**: Next.js API routes + Supabase client

### Key Design Patterns

- **Error Boundaries**: Comprehensive error handling
- **Custom Hooks**: Reusable business logic
- **Service Layer**: Abstracted API calls
- **Type-First**: TypeScript-first development

## 🔧 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Write comprehensive JSDoc comments

### Component Guidelines

- Use functional components with hooks
- Implement proper prop types
- Follow atomic design principles
- Include Storybook stories for UI components

### Testing Strategy

- Unit tests for utilities and hooks
- Integration tests for API endpoints
- E2E tests for critical user flows
- Aim for 80%+ code coverage

### Git Workflow

- Use conventional commits
- Create feature branches from `main`
- Require PR reviews for `main` branch
- Use pre-commit hooks for code quality

## 🌍 Ethiopian Context

### Education System

- Supports Ethiopian curriculum (Pre-K to Grade 12)
- Includes local subjects (Amharic, Ethiopian History)
- Grade-level appropriate subject mapping

### Location Support

- Addis Ababa subcities integration
- Kebele-level addressing
- Home tutoring location matching

### Payment Integration

- Telebirr mobile money
- CBE Birr digital payments
- Bank transfer options

### Language Support

- Primary: English interface
- Future: Amharic localization planned

## 📊 Database Schema

### Core Tables

- `profiles` - User profiles (parents, students, tutors)
- `children` - Child profiles managed by parents
- `subjects` - Ethiopian curriculum subjects
- `tutor_requests` - Tutoring service requests
- `sessions` - Tutoring sessions
- `payments` - Payment transactions

### Key Relationships

- Parents → Children (one-to-many)
- Children → Tutor Requests (one-to-many)
- Tutors → Sessions (one-to-many)
- Sessions → Payments (one-to-one)

## 🔐 Security

### Authentication

- Supabase Auth with email/password
- Role-based access control (RLS)
- Session management with refresh tokens

### Data Protection

- Row-level security policies
- Input validation with Zod schemas
- XSS protection with proper sanitization
- CSRF protection with SameSite cookies

### Privacy

- GDPR-compliant data handling
- User consent management
- Data retention policies
- Secure file uploads

## 🚀 Deployment

### Environment Setup

1. **Production Environment Variables**
   - Database credentials
   - Payment provider keys
   - Email service configuration
   - Analytics tracking IDs

2. **Database Migration**

   ```bash
   # Run migrations on production
   npm run db:migrate
   ```

3. **Build and Deploy**

   ```bash
   # Build for production
   npm run build

   # Deploy to your hosting platform
   npm run deploy
   ```

### Monitoring

- Error tracking with Sentry
- Performance monitoring
- User analytics
- Database performance metrics

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Pull Request Process

1. Update documentation if needed
2. Add/update tests for changes
3. Ensure code passes all quality checks
4. Get approval from code reviewers
5. Merge to main branch

## 📚 Additional Resources

### Documentation

- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)
- [Database Schema](./docs/database.md)
- [Deployment Guide](./docs/deployment.md)

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Email: support@eagletutorials.et
- Phone: +251-911-123456
- Documentation: [docs.eagletutorials.et](https://docs.eagletutorials.et)

## 🎯 Roadmap

### Phase 1 (Current)

- ✅ Core platform functionality
- ✅ Parent and child management
- ✅ Basic tutor matching
- 🔄 Tutor verification system
- 🔄 Payment integration

### Phase 2 (Q2 2024)

- 📅 Advanced matching algorithm
- 📅 Mobile app development
- 📅 Amharic localization
- 📅 Analytics dashboard

### Phase 3 (Q3 2024)

- 📅 Group tutoring sessions
- 📅 Learning resource library
- 📅 Parent-teacher communication
- 📅 Progress tracking tools

---

**Built with ❤️ for Ethiopian education**
