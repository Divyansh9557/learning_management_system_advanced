import { Download, Share2, Award, Calendar } from 'lucide-react';

const CertificatePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Certificates</h1>
          <p className="text-gray-400">Download and share your achievements</p>
        </div>

        {/* Certificate Preview */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8">
            <div className="bg-gray-900 rounded-lg p-8 mx-4 shadow-lg">
              <div className="text-center">
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto" />
                </div>

                {/* Body */}
                <div className="mb-8">
                  <p className="text-gray-400 mb-4">This is to certify that</p>
                  <h3 className="text-3xl font-bold mb-4">John Doe</h3>
                  <p className="text-gray-400 mb-2">has successfully completed</p>
                  <h4 className="text-xl font-semibold text-blue-400 mb-6">
                    Advanced React Development
                  </h4>

                  <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                    <div className="text-center">
                      <p className="font-medium">Course Duration</p>
                      <p>8 Hours</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Completion Date</p>
                      <p>March 10, 2024</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Grade</p>
                      <p>95%</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                  <div className="text-left">
                    <div className="w-32 h-0.5 bg-gray-600 mb-2"></div>
                    <p className="text-sm text-gray-400">Sarah Johnson</p>
                    <p className="text-xs text-gray-500">Instructor</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold text-lg">L</span>
                    </div>
                    <p className="text-xs text-gray-500">LearnHub</p>
                  </div>

                  <div className="text-right">
                    <div className="w-32 h-0.5 bg-gray-600 mb-2"></div>
                    <p className="text-sm text-gray-400">Certificate ID</p>
                    <p className="text-xs text-gray-500">#LH-2024-001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
          <button className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Share2 className="w-5 h-5 mr-2" />
            Share on LinkedIn
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            <Award className="w-5 h-5 mr-2" />
            View All Certificates
          </button>
        </div>

        {/* Certificate History */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold mb-6">Certificate History</h3>

          <div className="space-y-4">
            {[
              {
                course: 'Advanced React Development',
                instructor: 'Sarah Johnson',
                date: 'March 10, 2024',
                grade: '95%',
                status: 'Completed',
              },
              {
                course: 'JavaScript Fundamentals',
                instructor: 'Mike Chen',
                date: 'February 28, 2024',
                grade: '88%',
                status: 'Completed',
              },
              {
                course: 'UI/UX Design Principles',
                instructor: 'Emily Davis',
                date: 'February 15, 2024',
                grade: '92%',
                status: 'Completed',
              },
            ].map((cert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{cert.course}</h4>
                    <p className="text-sm text-gray-400">by {cert.instructor}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {cert.date}
                      </div>
                      <span>Grade: {cert.grade}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200">
                    {cert.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-300">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
