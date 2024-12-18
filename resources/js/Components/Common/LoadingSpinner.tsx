export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-purple-600 sm:h-16 sm:w-16" />
        </div>
    );
}
