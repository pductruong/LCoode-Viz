import { useParams } from 'react-router-dom';

function VisualizationPage() {
  const { problemId } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Visualization: {problemId}
      </h1>

      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">🎨</div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Visualization Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Interactive visualizations for problem "{problemId}" will be
          implemented in the next phase of development.
        </p>
      </div>
    </div>
  );
}

export default VisualizationPage;
