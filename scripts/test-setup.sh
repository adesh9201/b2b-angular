#!/bin/bash

# Test Setup Script for FabHub
# This script sets up the testing environment and runs all tests

set -e

echo "🧪 Setting up test environment for FabHub..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm and try again."
    exit 1
fi

print_status "npm version: $(npm -v)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
else
    print_status "Dependencies already installed"
fi

# Create test directories if they don't exist
mkdir -p cypress/screenshots
mkdir -p cypress/videos
mkdir -p coverage

# Set up environment variables for testing
export NODE_ENV=test
export CYPRESS_baseUrl=http://localhost:4200

print_status "Environment variables set for testing"

# Function to run unit tests
run_unit_tests() {
    print_status "Running unit tests..."
    
    if npm run test:ci; then
        print_status "✅ Unit tests passed"
        return 0
    else
        print_error "❌ Unit tests failed"
        return 1
    fi
}

# Function to run e2e tests
run_e2e_tests() {
    print_status "Running e2e tests..."
    
    # Start the application in background
    print_status "Starting application for e2e tests..."
    npm start &
    APP_PID=$!
    
    # Wait for application to start
    print_status "Waiting for application to start..."
    sleep 30
    
    # Check if application is running
    if curl -f http://localhost:4200 > /dev/null 2>&1; then
        print_status "Application is running"
        
        # Run e2e tests
        if npm run e2e; then
            print_status "✅ E2e tests passed"
            E2E_RESULT=0
        else
            print_error "❌ E2e tests failed"
            E2E_RESULT=1
        fi
    else
        print_error "Application failed to start"
        E2E_RESULT=1
    fi
    
    # Stop the application
    print_status "Stopping application..."
    kill $APP_PID 2>/dev/null || true
    
    return $E2E_RESULT
}

# Function to run linting
run_linting() {
    print_status "Running linting..."
    
    if npm run lint; then
        print_status "✅ Linting passed"
        return 0
    else
        print_error "❌ Linting failed"
        return 1
    fi
}

# Function to generate coverage report
generate_coverage() {
    print_status "Generating coverage report..."
    
    if npm run test:coverage; then
        print_status "✅ Coverage report generated"
        
        # Check coverage thresholds
        COVERAGE_FILE="coverage/lcov-report/index.html"
        if [ -f "$COVERAGE_FILE" ]; then
            print_status "Coverage report available at: $COVERAGE_FILE"
        fi
        
        return 0
    else
        print_error "❌ Coverage report generation failed"
        return 1
    fi
}

# Main test execution
main() {
    print_status "Starting comprehensive test suite..."
    
    # Initialize result variables
    UNIT_TEST_RESULT=0
    E2E_TEST_RESULT=0
    LINT_RESULT=0
    COVERAGE_RESULT=0
    
    # Run linting first
    if ! run_linting; then
        LINT_RESULT=1
    fi
    
    # Run unit tests
    if ! run_unit_tests; then
        UNIT_TEST_RESULT=1
    fi
    
    # Generate coverage report
    if ! generate_coverage; then
        COVERAGE_RESULT=1
    fi
    
    # Run e2e tests (optional, can be skipped if headless browser issues)
    if [ "$1" != "--skip-e2e" ]; then
        if ! run_e2e_tests; then
            E2E_TEST_RESULT=1
        fi
    else
        print_warning "Skipping e2e tests as requested"
    fi
    
    # Print summary
    echo ""
    print_status "Test Summary:"
    echo "=============="
    
    if [ $LINT_RESULT -eq 0 ]; then
        print_status "✅ Linting: PASSED"
    else
        print_error "❌ Linting: FAILED"
    fi
    
    if [ $UNIT_TEST_RESULT -eq 0 ]; then
        print_status "✅ Unit Tests: PASSED"
    else
        print_error "❌ Unit Tests: FAILED"
    fi
    
    if [ $COVERAGE_RESULT -eq 0 ]; then
        print_status "✅ Coverage: PASSED"
    else
        print_error "❌ Coverage: FAILED"
    fi
    
    if [ "$1" != "--skip-e2e" ]; then
        if [ $E2E_TEST_RESULT -eq 0 ]; then
            print_status "✅ E2E Tests: PASSED"
        else
            print_error "❌ E2E Tests: FAILED"
        fi
    fi
    
    # Calculate overall result
    TOTAL_FAILURES=$((LINT_RESULT + UNIT_TEST_RESULT + COVERAGE_RESULT + E2E_TEST_RESULT))
    
    if [ $TOTAL_FAILURES -eq 0 ]; then
        print_status "🎉 All tests passed!"
        exit 0
    else
        print_error "💥 $TOTAL_FAILURES test suite(s) failed"
        exit 1
    fi
}

# Handle command line arguments
case "${1:-}" in
    --unit-only)
        print_status "Running unit tests only..."
        run_linting && run_unit_tests && generate_coverage
        ;;
    --e2e-only)
        print_status "Running e2e tests only..."
        run_e2e_tests
        ;;
    --lint-only)
        print_status "Running linting only..."
        run_linting
        ;;
    --coverage-only)
        print_status "Generating coverage only..."
        generate_coverage
        ;;
    --help)
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --unit-only     Run only unit tests"
        echo "  --e2e-only      Run only e2e tests"
        echo "  --lint-only     Run only linting"
        echo "  --coverage-only Generate only coverage report"
        echo "  --skip-e2e      Skip e2e tests"
        echo "  --help          Show this help message"
        echo ""
        echo "Default: Run all tests"
        ;;
    *)
        main "$@"
        ;;
esac