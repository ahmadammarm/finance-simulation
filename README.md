# Financial Simulation

A web-based financial simulation and planning platform for Indonesian users. This application helps individuals make better financial decisions through interactive simulations for various investment scenarios and Islamic financial calculations (Zakat).

## Main Features

### 1. Zakat Mal Calculator
Zakat calculator (wealth zakat) with 2.5% rate for various asset types.
- Adjustable gold price input for accurate nisab calculation
- Flexible input: Add various asset types dynamically
- Two input modes: Direct value or Price × Quantity
- Nisab Threshold: 85 grams of gold (rupiah value adjusted to gold price)
- Dynamic asset list management (add/remove items)
- Automatic calculation and Zakat status determination

### 2. Zakat from Income Calculator
Zakat calculator for income with 2.5% rate.
- Input: Monthly income, additional income sources, monthly expenses
- Calculation: Annual income - annual expenses to determine Zakatable amount
- Nisab Threshold: 85 grams of gold (rupiah value adjusted to gold price)
- Output: Zakat amount if applicable, otherwise indicates no Zakat due

### 3. KPR Syariah Calculator
Islamic mortgage calculator based on Murabaha and Ijarah principles with tenor and margin support.
- Input: Property price, down payment, margin rate, loan tenor (years)
- Calculation: Monthly installment based on Murabaha (cost-plus financing) or Ijarah (leasing) methods
- Output: Monthly installment amount, total payment over loan period

### 4. Emergency Fund Calculator
Calculator to determine the ideal emergency fund needed.
- Input: Monthly expenses, employment type (Permanent/Freelance/Self-employed), number of dependents, current emergency fund (optional)
- Calculation:
  - Permanent Employee: 3-6 months of expenses
  - Freelance/Self-employed: 6-12 months of expenses
  - Adjustment: +1 month per dependent
- Output: 3 level recommendations (Minimum, Ideal, Maximum)
- Progress tracker: Visual progress bar of current fund vs ideal target
- Time simulation: How many months to reach target with specific monthly savings
- Educational content: Explanation of emergency fund importance and tips for building it



## Tech Stack

- **Library:** React 19.2.0, React Router 7.11.0
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.18
- **Code Quality:** ESLint 9.39.1
- **Package Manager:** Node Package Manager with pnpm
- **Runtime:** Nodejs (JavaScript runtime)

## Prerequisites

- [Node.js](https://nodejs.org) v20 or higher
## Installation

```sh
# Clone repository
git clone https://github.com/ahmadammarm/finance-simulation.git
cd finance-simulation

# Install dependencies with pnpm
pnpm install
```

## Development

Run development server:

```sh
pnpm dev

# or open application directly in browser
pnpm dev -- --open
```

Server will run at `http://localhost:5173`

## Building

To create a production build:

```sh
pnpm build
```

Preview production build:

```sh
pnpm start
```

## Code Quality

```sh
# Check code formatting and linting
pnpm lint
```

## Project Structure

```
finance-simulation/
├── src/
│   ├── assets/                     # Static assets (images, icons)
│   ├── components/                 # Reusable React components
│   │   ├── homepage/               # Homepage components
│   │   ├── layout                  # Root layout components
│   │   ├── ui/                     # UI components from shadcn(buttons, inputs modals)
│   │   ├── DanaDarurat.tsx         # Emergency Fund Calculator components
│   │   ├── ZakatMal.tsx            # Zakat Mal Calculator components
│   │   ├── ZakatPenghasilan.tsx    # Zakat from Income Calculator components
│   │   ├── KPRSyariah.tsx          # Islamic Mortgage Calculator components
│   ├── lib/                        # Shared libraries and utilities
│   ├── App.tsx                     # Root application component
│   └── index.css                   # Global styles (Tailwind)
│   ├── main.tsx                    # Application entry point
├── index.html                      # HTML template
└── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite configuration
```

## Key Features

- **Indonesian-Focused:** Indonesian tax rules (10%), Zakat calculation (2.5%), IDR currency
- **Privacy-Friendly:** All calculations performed client-side, no data collection
- **Client-Side Only:** No backend or database required
- **Responsive Design:** Mobile-first with Tailwind CSS
- **Accessible:** ARIA labels, semantic HTML, responsive design

## Architecture Highlights

- File-based routing (React Router)
- React reactivity with `useState` and `useEffect`
- Pure client-side calculations
- No external state management (pure React reactivity)
- Each simulation self-contained in its own route

## Scripts Available

```sh
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Preview production build
pnpm lint         # Check code quality
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.