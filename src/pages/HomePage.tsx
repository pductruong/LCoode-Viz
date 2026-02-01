import { Link } from 'react-router-dom';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '🎬',
    title: 'Step-by-Step Animations',
    description:
      'Watch algorithms execute in real-time with smooth, interactive visualizations.',
  },
  {
    icon: '💡',
    title: 'Clear Explanations',
    description:
      'Understand the why behind each step with detailed explanations and insights.',
  },
  {
    icon: '🎯',
    title: 'Interview Ready',
    description:
      'Practice with curated LeetCode problems commonly asked in tech interviews.',
  },
];

function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Learn Algorithms Visually
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Master LeetCode problems with interactive step-by-step visualizations.
            See how algorithms work in real-time.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/problems"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Problems
            </Link>
            <a
              href="https://github.com/yourusername/lcode-viz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why LCode-Viz?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Explore our growing collection of visualized problems
          </p>
          <Link
            to="/problems"
            className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-3 rounded-lg font-semibold inline-block transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
